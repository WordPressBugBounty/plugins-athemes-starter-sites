/**
 * Pages step component.
 *
 * @package Athemes Starter Sites
 */

import { useState, useEffect, useRef, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Footer, PageCard, Spinner } from '../Layout';
import { useWizard } from '../../context/WizardContext';
import { getDemoPages } from '../../utils/api';
import { getStarterSiteById, getThemeName } from '../../data/starter-sites';
import { getColorSchemesForSite } from '../../data/color-schemes';
import { getTypographyPairsForSite } from '../../data/typography-pairs';
import { addPreconnectHints } from '../../utils/preload-helpers';
import previewBridge from '../../utils/preview-bridge';
import { usePreviewBridgeInit } from '../../utils/use-preview-sync';

/**
 * Transform color scheme data to preview-compatible format.
 *
 * @param {string} schemeId       The selected color scheme ID.
 * @param {Array}  colorSchemes   Array of available color schemes.
 * @param {Object} customColors   Custom generated colors (if scheme is 'custom').
 * @return {Object|null} Color data ready for preview, or null if not available.
 */
const transformColors = ( schemeId, colorSchemes, customColors ) => {
	if ( ! schemeId ) {
		return null;
	}

	// Handle custom colors
	if ( schemeId === 'custom' ) {
		if ( ! customColors || typeof customColors !== 'object' || Object.keys( customColors ).length === 0 ) {
			return null;
		}
		return customColors;
	}

	// Find the selected scheme
	const selectedScheme = colorSchemes.find( ( scheme ) => scheme.id === schemeId );
	if ( ! selectedScheme || ! selectedScheme.colors ) {
		return null;
	}

	return selectedScheme.colors;
};

/**
 * Pages step component.
 *
 * @param {Object}   props                  Component props.
 * @param {Function} props.onBack           Callback to go to previous step.
 * @param {Function} props.onContinue       Callback to proceed to next step.
 * @param {boolean}  props.navigationLoading Whether navigation is in loading state.
 * @param {string}   props.navigationError   Navigation error message.
 * @return {JSX.Element} Pages component.
 */
function Pages( { onBack, onContinue, navigationLoading, navigationError } ) {
	const { wizardData, prefetchedPages, siteTitle, builder } = useWizard();
	const iframeRef = useRef( null );
	const [ pages, setPages ] = useState( [] );
	const [ selectedPages, setSelectedPages ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( false );
	const [ error, setError ] = useState( null );
	const [ currentPreviewPage, setCurrentPreviewPage ] = useState( null );
	const [ isIframeLoading, setIsIframeLoading ] = useState( true );

	// Get customization data from the Customize step
	const customizeData = wizardData.customize || {};
	const designData = wizardData.design || {};
	const selectedSiteId = designData.selectedSiteId;

	// Get theme data for color schemes and typography pairs
	const themeName = getThemeName();
	const selectedSite = getStarterSiteById( selectedSiteId );
	const colorSchemes = getColorSchemesForSite( selectedSite, themeName );
	const typographyPairs = getTypographyPairsForSite( selectedSite, themeName );

	// Initialize preview bridge for this iframe
	usePreviewBridgeInit( iframeRef );

	/**
	 * Build customizations object from wizard data.
	 */
	const getCustomizations = useCallback( () => {
		const updates = {};

		// Get colors
		const colors = transformColors(
			customizeData.selectedColorScheme || '',
			colorSchemes,
			customizeData.customColors || {}
		);
		if ( colors ) {
			updates.colors = colors;
		}

		// Get logo
		const siteLogo = customizeData.siteLogo || { url: '', id: 0 };
		const logoHeight = customizeData.logoHeight ?? 100;
		if ( siteLogo.url ) {
			updates.logo = { ...siteLogo, height: logoHeight };
			updates.logoHeight = logoHeight;
		}

		// Get site title
		updates.title = siteTitle;
		updates.showTitle = customizeData.showSiteTitle ?? true;

		// Get typography
		const selectedTypographyId = customizeData.selectedTypographyPair || '';
		if ( selectedTypographyId ) {
			const selectedPair = typographyPairs.find( ( pair ) => pair.id === selectedTypographyId );
			if ( selectedPair ) {
				updates.typography = selectedPair;
			}
		}

		return updates;
	}, [ customizeData, colorSchemes, typographyPairs, siteTitle ] );

	// Set pending customizations when component mounts or customizations change
	useEffect( () => {
		const customizations = getCustomizations();
		if ( Object.keys( customizations ).length > 0 ) {
			previewBridge.setPendingCustomizations( customizations );
		}
	}, [ getCustomizations ] );

	useEffect( () => {
		const fetchPages = async () => {
			const designData = wizardData.design;

			// Check if we have a selected site.
			if ( ! designData?.selectedSiteId ) {
				return;
			}

			// Use prefetched pages if available (from Customize step)
			if ( prefetchedPages && prefetchedPages.length > 0 ) {
				setPages( prefetchedPages );

				// Load previously selected pages from wizard state if available,
				// otherwise select all pages by default.
				const previouslySelected = wizardData.pages?.selectedPages;
				if ( previouslySelected && Array.isArray( previouslySelected ) && previouslySelected.length > 0 ) {
					setSelectedPages( previouslySelected );
				} else {
					const allPageIds = prefetchedPages.map( ( page ) => page.id );
					setSelectedPages( allPageIds );
				}

				// Set the first page as the default preview page
				if ( prefetchedPages.length > 0 ) {
					setCurrentPreviewPage( prefetchedPages[ 0 ] );
				}

				return;
			}

			setIsLoading( true );
			setError( null );

			try {
				const pagesData = await getDemoPages( designData.selectedSiteId, builder );

				// Sort pages to ensure homepage appears first
				const sortedPages = [ ...pagesData ].sort( ( a, b ) => {
					const aIsHome = /^(home|my front page)$/i.test( a.title.trim() );
					const bIsHome = /^(home|my front page)$/i.test( b.title.trim() );

					if ( aIsHome && ! bIsHome ) {
						return -1;
					}
					if ( ! aIsHome && bIsHome ) {
						return 1;
					}
					return 0;
				} );

				// Filter out Sample Page and Test pages
				const filteredPages = sortedPages.filter( ( page ) => {
					const title = page.title.trim();
					return ! /^(sample page|test)$/i.test( title );
				} );

				setPages( filteredPages );

				// Load previously selected pages from wizard state if available,
				// otherwise select all pages by default.
				const previouslySelected = wizardData.pages?.selectedPages;
				if ( previouslySelected && Array.isArray( previouslySelected ) && previouslySelected.length > 0 ) {
					setSelectedPages( previouslySelected );
				} else {
					const allPageIds = filteredPages.map( ( page ) => page.id );
					setSelectedPages( allPageIds );
				}

				// Set the first page as the default preview page
				if ( filteredPages.length > 0 ) {
					setCurrentPreviewPage( filteredPages[ 0 ] );
				}

				// Log to console for debugging.
				// eslint-disable-next-line no-console
				console.log( 'Demo pages loaded:', sortedPages );
			} catch ( err ) {
				// eslint-disable-next-line no-console
				console.error( 'Failed to fetch pages:', err );
				setError( err.message || 'Failed to load pages' );
			} finally {
				setIsLoading( false );
			}
		};

		fetchPages();
	}, [ wizardData, prefetchedPages, builder ] );

	// Handle page selection toggle
	const handlePageToggle = ( pageId ) => {
		setSelectedPages( ( prevSelected ) => {
			if ( prevSelected.includes( pageId ) ) {
				return prevSelected.filter( ( id ) => id !== pageId );
			}
			return [ ...prevSelected, pageId ];
		} );
	};

	// Handle page click to update preview
	const handlePageClick = ( page ) => {
		if ( currentPreviewPage?.id !== page.id ) {
			// Reset ready state before changing page - the new page will send ATSS_PREVIEW_READY
			previewBridge.resetReadyState();
			setCurrentPreviewPage( page );
			setIsIframeLoading( true );
		}
	};

	// Add preconnect hints when pages are loaded for faster iframe loading
	useEffect( () => {
		if ( pages && pages.length > 0 ) {
			pages.forEach( ( page ) => {
				if ( page.url ) {
					addPreconnectHints( page.url, 'data-atss-page-preconnect' );
				}
			} );
		}
	}, [ pages ] );

	// Add preconnect hints when preview page changes for faster iframe loading
	useEffect( () => {
		if ( currentPreviewPage?.url ) {
			addPreconnectHints( currentPreviewPage.url );
		}
	}, [ currentPreviewPage?.url ] );

	// Handle iframe load - initialize bridge and apply customizations
	const handleIframeLoad = useCallback( () => {
		setIsIframeLoading( false );
		
		// Ensure the bridge has the iframe reference (needed for conditional rendering)
		if ( iframeRef.current ) {
			previewBridge.init( iframeRef.current );
		}
		// Customizations are applied automatically when ATSS_PREVIEW_READY is received
		// via the pendingCustomizations mechanism in preview-bridge.js
	}, [] );

	// Handle continue - pass selected pages to parent
	const handleContinue = () => {
		onContinue( {
			selectedPages,
		} );
	};

	return (
		<div className="atss-onboarding-wizard__step-wrapper flex">
			<div className="atss-onboarding-wizard__step atss-onboarding-wizard__step--pages">
				<main className="atss-onboarding-wizard__step-body">
					<div className="flex gap-md flex-col">
						<span className="atss-control__label text-sm font-medium">
							{ __( 'Select Pages to Import', 'athemes-starter-sites' ) } ({ selectedPages.length }):
						</span>
						<p className="text-xs" style={ { margin: '0' } }>
							{ selectedPages.length === 0 ? (
								<span style={ { color: 'var(--atss-color-text-error)' } }>
									{ __( 'Select Pages to Import', 'athemes-starter-sites' ) }
								</span>
							) : (
								<>
									<span className="text-secondary" style={ { display: 'block' } }>{ __( 'Selected: ', 'athemes-starter-sites' ) }</span>
									<span className="text-heading">
										{ pages
											.filter( ( page ) => selectedPages.includes( page.id ) )
											.map( ( page ) => page.title )
											.join( ', ' ) }
									</span>
								</>
							) }
						</p>

						{ error && (
							<p style={ { color: 'var(--atss-color-text-error)' } }>
								{ __( 'Error: ', 'athemes-starter-sites' ) }{ error }
							</p>
						) }

						{ ! isLoading && ! error && pages.length > 0 && (
							<div className="atss-pages-grid">
								{ pages.map( ( page ) => (
									<PageCard
										key={ page.id }
										id={ page.id }
										title={ page.title }
										url={ page.url }
										thumbnail={ page.thumbnail }
										isSelected={ selectedPages.includes( page.id ) }
										onToggle={ handlePageToggle }
										onClick={ () => handlePageClick( page ) }
									/>
								) ) }
							</div>
						) }

						{ ! isLoading && ! error && pages.length === 0 && (
							<p>{ __( 'No pages found.', 'athemes-starter-sites' ) }</p>
						) }
					</div>
				</main>

				<Footer
					showBack={ true }
					showSkip={ false }
					continueText={ __( 'Continue', 'athemes-starter-sites' ) }
					onBack={ onBack }
					onContinue={ handleContinue }
					continueDisabled={ selectedPages.length === 0 }
					continueLoading={ navigationLoading }
					continueError={ navigationError }
				/>
			</div>

		<div className="atss-onboarding-wizard__preview">
			<div className="atss-onboarding-wizard__preview-inner atss-onboarding-wizard__preview-iframe--desktop">
				{ isIframeLoading && currentPreviewPage && (
					<div className="atss-onboarding-wizard__preview-loading">
						<Spinner />
					</div>
				) }
				{ ! isLoading && currentPreviewPage && currentPreviewPage.url ? (
						<iframe
							ref={ iframeRef }
							id="page-preview"
							src={ (() => {
								let url = currentPreviewPage.url;
								if ( /^my front page$/i.test( currentPreviewPage.title?.trim() ) ) {
									url = url.replace('?page_id=5', '');
								}

							// If builder is Gutenberg, append -gb to the URL slug (if not already present)
							if ( builder === 'gutenberg' ) {
								// Clean up double dashes in URL
								if ( selectedSiteId !== 'resume' ) {
									url = url.replace( /--/g, '-' );
								}
								// Transform: https://demo.athemes.com/sydney-main/ → https://demo.athemes.com/sydney-main-gb/
								// Only add -gb if it's not already present
								if ( ! /-gb\/?(\?.*)?$/.test( url ) ) {
									url = url.replace( /\/([^\/\?]+)(\/)?(\?.*)?$/, '/$1-gb$2$3' );
								}

								if ( selectedSiteId === 'cafe' ) { // Special case for Cafe template
									url = 'https://demo.athemes.com/sp-cafe-gb/';
								}

								if ( selectedSiteId === 'author' ) { // Special case for Author template
									url = 'https://demo.athemes.com/sp-author-gb/';
								}
							}

								// Add atss_preview=1 parameter
								url = `${ url }${ url.includes( '?' ) ? '&' : '?' }atss_preview=1`;
								return url;
							})() }
							title={ currentPreviewPage.title || __( 'Page Preview', 'athemes-starter-sites' ) }
							onLoad={ handleIframeLoad }
							style={ { opacity: isIframeLoading ? 0 : 1 } }
							className="atss-onboarding-wizard__preview-iframe"
						></iframe>
					) : ! isLoading && (
						<div className="atss-onboarding-wizard__preview-placeholder">
							<p>{ __( 'Select a page to preview', 'athemes-starter-sites' ) }</p>
						</div>
					) }
				</div>
			</div>
		</div>
	);
}

export default Pages;
