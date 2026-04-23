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
import isBotiga from '../../utils/is-botiga';
import {
	buildBotigaNonVariableCss,
	buildBotigaScopedVariableOverrideCss,
} from '../../data/botiga-non-variable-color-rules';

/**
 * Transform color scheme data to preview-compatible format.
 *
 * @param {string} schemeId     The selected color scheme ID.
 * @param {Array}  colorSchemes Array of available color schemes.
 * @param {Object} customColors Custom generated colors when scheme is custom.
 * @return {Object|null} Color data ready for preview, or null if not available.
 */
const transformColors = ( schemeId, colorSchemes, customColors ) => {
	if ( ! schemeId ) {
		return null;
	}

	// Handle custom colors.
	if (
		schemeId === 'custom' &&
		customColors &&
		typeof customColors === 'object' &&
		Object.keys( customColors ).length > 0
	) {
		return customColors;
	}

	if ( schemeId === 'custom' ) {
		return null;
	}

	// Find the selected scheme.
	const selectedScheme = colorSchemes.find(
		( scheme ) => scheme.id === schemeId
	);

	if ( ! selectedScheme || ! selectedScheme.colors ) {
		return null;
	}

	return selectedScheme.colors;
};

/**
 * Normalize Botiga demo URL to use the correct preview base.
 *
 * Some demo page URLs returned from the API may point to an incorrect
 * base path, such as `/apparel/` instead of `/botiga-apparel/`.
 * This helper replaces the base with the selected site's preview URL
 * while preserving the rest of the path and query parameters.
 *
 * @param {string} url          Original page URL.
 * @param {Object} selectedSite Selected site object.
 * @return {string} Normalized demo URL.
 */
const normalizeBotigaDemoUrl = ( url, selectedSite ) => {
	if ( ! isBotiga || ! selectedSite?.preview || ! url ) {
		return url;
	}

	return url.replace(
		/^https:\/\/demo\.athemes\.com\/[^/]+\//,
		selectedSite.preview
	);
};

/**
 * Build a stable Botiga Elementor preview URL.
 *
 * Elementor demo page URLs may contain stale `page_id` query args from the XML export.
 * This helper rebuilds the preview URL from the selected site's preview base and the page slug.
 *
 * @param {Object} page         Current page object.
 * @param {Object} selectedSite Selected site object.
 * @param {string} builder      Active builder.
 * @return {string} Normalized preview URL.
 */
const normalizeBotigaElementorPreviewUrl = ( page, selectedSite, builder ) => {
	if (
		! isBotiga ||
		builder !== 'elementor' ||
		! selectedSite?.preview ||
		! page?.url
	) {
		return page?.url || '';
	}

	const normalizedBase = selectedSite.preview.endsWith( '/' )
		? selectedSite.preview
		: `${ selectedSite.preview }/`;

	const pageTitle = page.title?.trim()?.toLowerCase() || '';
	const pageSlug = page.slug?.trim()?.toLowerCase() || '';

	if (
		pageTitle === 'home' ||
		pageTitle === 'my front page' ||
		pageSlug === 'home' ||
		pageSlug === 'homepage'
	) {
		return normalizedBase;
	}

	if ( ! pageSlug ) {
		return page.url;
	}

	return `${ normalizedBase }${ pageSlug }/`;
};

/**
 * Get the effective preview URL for the current page.
 *
 * Keeps existing behavior intact for non-Botiga themes and Gutenberg,
 * while normalizing Botiga Elementor preview URLs.
 *
 * @param {Object} page         Current page object.
 * @param {Object} selectedSite Selected site object.
 * @param {string} builder      Active builder.
 * @return {string} Preview URL.
 */
const getPreviewUrl = ( page, selectedSite, builder ) =>
	normalizeBotigaElementorPreviewUrl(
		{
			...page,
			url: normalizeBotigaDemoUrl( page?.url, selectedSite ),
		},
		selectedSite,
		builder
	);

/**
 * Pages step component.
 *
 * @param {Object}   props                   Component props.
 * @param {Function} props.onBack            Callback to go to previous step.
 * @param {Function} props.onContinue        Callback to proceed to next step.
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

	// Get customization data from the Customize step.
	const customizeData = wizardData.customize || {};
	const designData = wizardData.design || {};
	const selectedSiteId = designData.selectedSiteId;

	// Get theme data for color schemes and typography pairs.
	const themeName = getThemeName();
	const selectedSite = getStarterSiteById( selectedSiteId );
	const colorSchemes = getColorSchemesForSite( selectedSite, themeName );
	const typographyPairs = getTypographyPairsForSite( selectedSite, themeName );

	// Initialize preview bridge for this iframe.
	previewBridge.setLocalPreview( ! selectedSiteId );
	usePreviewBridgeInit( iframeRef );

	/**
	 * Build customizations object from wizard data.
	 *
	 * @return {Object} Preview customization updates.
	 */
	const getCustomizations = useCallback( () => {
		const updates = {};

		// Get colors.
		const colors = transformColors(
			customizeData.selectedColorScheme || '',
			colorSchemes,
			customizeData.customColors || {}
		);

		if ( colors ) {
			updates.colors = colors;
		}

		// Get logo.
		const siteLogo = customizeData.siteLogo || { url: '', id: 0 };
		const logoHeight = customizeData.logoHeight ?? 100;

		if ( siteLogo.url ) {
			updates.logo = { ...siteLogo, height: logoHeight };
			updates.logoHeight = logoHeight;
		}

		// Get site title.
		updates.title = siteTitle;
		updates.showTitle = customizeData.showSiteTitle ?? true;

		// Get typography.
		const selectedTypographyId = customizeData.selectedTypographyPair || '';

		if ( selectedTypographyId ) {
			const selectedPair = typographyPairs.find(
				( pair ) => pair.id === selectedTypographyId
			);

			if ( selectedPair ) {
				updates.typography = selectedPair;
			}
		}

		return updates;
	}, [ customizeData, colorSchemes, typographyPairs, siteTitle ] );

	// Set pending customizations when component mounts or customizations change.
	useEffect( () => {
		const customizations = getCustomizations();

		if ( Object.keys( customizations ).length > 0 ) {
			previewBridge.storePendingCustomizations( customizations );
		}
	}, [ getCustomizations ] );

	useEffect( () => {
		const fetchPages = async () => {
			const currentDesignData = wizardData.design;

			// Check if a site is selected.
			if ( ! currentDesignData?.selectedSiteId ) {
				return;
			}

			// Use prefetched pages if available from the Customize step.
			if ( prefetchedPages && prefetchedPages.length > 0 ) {
				setPages( prefetchedPages );

				// Load previously selected pages from wizard state if available.
				const previouslySelected = wizardData.pages?.selectedPages;

				if (
					previouslySelected &&
					Array.isArray( previouslySelected ) &&
					previouslySelected.length > 0
				) {
					setSelectedPages( previouslySelected );
				} else {
					setSelectedPages(
						prefetchedPages.map( ( page ) => page.id )
					);
				}

				// Set the first page as the default preview page.
				setCurrentPreviewPage( prefetchedPages[ 0 ] || null );

				return;
			}

			setIsLoading( true );
			setError( null );

			try {
				const pagesData = await getDemoPages(
					currentDesignData.selectedSiteId,
					builder
				);

				// Sort pages to ensure homepage appears first.
				const sortedPages = [ ...pagesData ].sort( ( a, b ) => {
					const aIsHome = /^(home|my front page)$/i.test(
						a.title.trim()
					);
					const bIsHome = /^(home|my front page)$/i.test(
						b.title.trim()
					);

					if ( aIsHome && ! bIsHome ) {
						return -1;
					}

					if ( ! aIsHome && bIsHome ) {
						return 1;
					}

					return 0;
				} );

				// Filter out Sample Page and Test pages.
				const filteredPages = sortedPages.filter( ( page ) => {
					const title = page.title.trim();

					return ! /^(sample page|test)$/i.test( title );
				} );

				setPages( filteredPages );

				// Load previously selected pages from wizard state if available.
				const previouslySelected = wizardData.pages?.selectedPages;

				if (
					previouslySelected &&
					Array.isArray( previouslySelected ) &&
					previouslySelected.length > 0
				) {
					setSelectedPages( previouslySelected );
				} else {
					setSelectedPages(
						filteredPages.map( ( page ) => page.id )
					);
				}

				// Set the first page as the default preview page.
				setCurrentPreviewPage( filteredPages[ 0 ] || null );
			} catch ( fetchError ) {
				// eslint-disable-next-line no-console
				console.error( 'Failed to fetch pages:', fetchError );
				setError( fetchError.message || 'Failed to load pages' );
			} finally {
				setIsLoading( false );
			}
		};

		fetchPages();
	}, [ wizardData, prefetchedPages, builder ] );

	/**
	 * Handle page selection toggle.
	 *
	 * @param {number|string} pageId Page identifier.
	 */
	const handlePageToggle = ( pageId ) => {
		setSelectedPages( ( prevSelected ) => {
			if ( prevSelected.includes( pageId ) ) {
				return prevSelected.filter( ( id ) => id !== pageId );
			}

			return [ ...prevSelected, pageId ];
		} );
	};

	/**
	 * Handle page click to update preview.
	 *
	 * @param {Object} page Page data.
	 */
	const handlePageClick = ( page ) => {
		if ( currentPreviewPage?.id === page.id ) {
			return;
		}

		// Reset ready state before changing page.
		previewBridge.resetReadyState();
		setCurrentPreviewPage( page );
		setIsIframeLoading( true );
	};

	// Add preconnect hints when pages are loaded for faster iframe loading.
	useEffect( () => {
		if ( ! pages || pages.length === 0 ) {
			return;
		}

		pages.forEach( ( page ) => {
			const previewUrl = getPreviewUrl( page, selectedSite, builder );

			if ( previewUrl ) {
				addPreconnectHints( previewUrl, 'data-atss-page-preconnect' );
			}
		} );
	}, [ pages, selectedSite, builder ] );

	// Add preconnect hints when preview page changes for faster iframe loading.
	useEffect( () => {
		const previewUrl = getPreviewUrl(
			currentPreviewPage,
			selectedSite,
			builder
		);

		if ( previewUrl ) {
			addPreconnectHints( previewUrl );
		}
	}, [ currentPreviewPage, selectedSite, builder ] );

	/**
	 * Handle iframe load.
	 *
	 * Initializes bridge and applies pending customizations.
	 */
	const handleIframeLoad = useCallback( () => {
		setIsIframeLoading( false );

		if ( iframeRef.current ) {
			previewBridge.init( iframeRef.current );
		}
	}, [] );

	/**
	 * Handle continue.
	 */
	const handleContinue = () => {
		onContinue( {
			selectedPages,
		} );
	};

	useEffect( () => {
		if ( ! isBotiga ) {
			return;
		}

		const colors = transformColors(
			customizeData.selectedColorScheme || '',
			colorSchemes,
			customizeData.customColors || {}
		);

		if ( ! colors || Object.keys( colors ).length === 0 ) {
			previewBridge.resetCustomCss( 'atss-botiga-non-variable-colors' );
			return;
		}

		const nonVariableCss = buildBotigaNonVariableCss( colors );
		const scopedVariableCss =
			buildBotigaScopedVariableOverrideCss( colors );

		const css = [ scopedVariableCss, nonVariableCss ]
			.filter( Boolean )
			.join( '\n\n' );

		if ( ! css ) {
			previewBridge.resetCustomCss( 'atss-botiga-non-variable-colors' );
			return;
		}

		previewBridge.updateCustomCss(
			css,
			'atss-botiga-non-variable-colors'
		);
	}, [
		customizeData.selectedColorScheme,
		customizeData.customColors,
		colorSchemes,
	] );

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
								<span
									style={ {
										color: 'var(--atss-color-text-error)',
									} }
								>
									{ __( 'Select Pages to Import', 'athemes-starter-sites' ) }
								</span>
							) : (
								<>
									<span
										className="text-secondary"
										style={ { display: 'block' } }
									>
										{ __( 'Selected: ', 'athemes-starter-sites' ) }
									</span>

									<span className="text-heading">
										{ pages
											.filter( ( page ) =>
												selectedPages.includes( page.id )
											)
											.map( ( page ) => page.title )
											.join( ', ' ) }
									</span>
								</>
							) }
						</p>

						{ error && (
							<p
								style={ {
									color: 'var(--atss-color-text-error)',
								} }
							>
								{ __( 'Error: ', 'athemes-starter-sites' ) }
								{ error }
							</p>
						) }

						{ ! isLoading && ! error && pages.length > 0 && (
							<div className="atss-pages-grid">
								{ pages.map( ( page ) => (
									<PageCard
										key={ page.id }
										id={ page.id }
										title={ page.title }
										url={ getPreviewUrl(
											page,
											selectedSite,
											builder
										) }
										thumbnail={ page.thumbnail }
										isSelected={ selectedPages.includes(
											page.id
										) }
										onToggle={ handlePageToggle }
										onClick={ () =>
											handlePageClick( page )
										}
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
								let url = getPreviewUrl(
									currentPreviewPage,
									selectedSite,
									builder
								);

								if (
									! isBotiga &&
									/^my front page$/i.test(
										currentPreviewPage.title?.trim()
									)
								) {
									url = url.replace( '?page_id=5', '' );
								}

								// If builder is Gutenberg, append -gb to the URL slug if needed.
								if ( builder === 'gutenberg' ) {
									// Clean up double dashes in URL.
									if ( selectedSiteId !== 'resume' ) {
										url = url.replace( /--/g, '-' );
									}

									if ( isBotiga ) {
										url = `${ url }${ url.includes( '?' ) ? '&' : '?' }atss_preview=1`;
										return url;
									}

									// Transform:
									// https://demo.athemes.com/sydney-main/
									// to
									// https://demo.athemes.com/sydney-main-gb/
									if ( ! /-gb\/?(\?.*)?$/.test( url ) ) {
										url = url.replace(
											/\/([^/\?]+)(\/)?(\?.*)?$/,
											'/$1-gb$2$3'
										);
									}

									if ( selectedSiteId === 'cafe' ) {
										url = 'https://demo.athemes.com/sp-cafe-gb/';
									}

									if ( selectedSiteId === 'author' ) {
										url = 'https://demo.athemes.com/sp-author-gb/';
									}
								}

								url = `${ url }${ url.includes( '?' ) ? '&' : '?' }atss_preview=1`;

								return url;
							})() }
							title={
								currentPreviewPage.title ||
								__( 'Page Preview', 'athemes-starter-sites' )
							}
							onLoad={ handleIframeLoad }
							style={ { opacity: isIframeLoading ? 0 : 1 } }
							className="atss-onboarding-wizard__preview-iframe"
						></iframe>
					) : (
						! isLoading && (
							<div className="atss-onboarding-wizard__preview-placeholder">
								<p>{ __( 'Select a page to preview', 'athemes-starter-sites' ) }</p>
							</div>
						)
					) }
				</div>
			</div>
		</div>
	);
}

export default Pages;
