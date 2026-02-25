/**
 * Customize step component.
 *
 * @package Athemes Starter Sites
 */

import { useMemo, useState, useRef, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl, ToggleControl, RangeControl } from '@wordpress/components';
import { Footer, Spinner } from '../Layout';
import { useWizard } from '../../context/WizardContext';
import { getStarterSiteById, getThemeName } from '../../data/starter-sites';
import { getColorSchemesForSite } from '../../data/color-schemes';
import { getTypographyPairsForSite, getTypographyPairById } from '../../data/typography-pairs';
import MediaUploadControl from '../Controls/MediaUploadControl';
import CustomColorsControl from '../Controls/CustomColorsControl';
import TypographyControl from '../Controls/TypographyControl';
import DevicePreviewControl from '../Controls/DevicePreviewControl';
import CustomizeUpsell from '../Controls/CustomizeUpsell';
import { addPreconnectHints, removePreconnectHints, addPagePreconnectHints } from '../../utils/preload-helpers';
import { getDemoPages } from '../../utils/api';
import {
	usePreviewBridgeInit,
	useColorPreviewSync,
	useLogoPreviewSync,
	useLogoHeightPreviewSync,
	useSiteTitlePreviewSync,
	useTypographyPreviewSync,
} from '../../utils/use-preview-sync';

/**
 * Customize step component.
 *
 * @param {Object}   props                  Component props.
 * @param {Function} props.onBack           Callback to go to previous step.
 * @param {Function} props.onContinue       Callback to proceed to next step.
 * @param {boolean}  props.navigationLoading Whether navigation is in loading state.
 * @param {string}   props.navigationError   Navigation error message.
 * @return {JSX.Element} Customize component.
 */
function Customize( { onBack, onContinue, navigationLoading, navigationError } ) {
	const { wizardData, prefetchedPages, setPrefetchedPages, siteTitle, setSiteTitle, builder } = useWizard();
	const iframeRef = useRef( null );
	const [ isIframeLoading, setIsIframeLoading ] = useState( true );

	// Get existing data from context if available
	const customizeData = wizardData[ 'customize' ] || {};
	const designData = wizardData[ 'design' ] || {};

	const [ siteLogo, setSiteLogo ] = useState( customizeData.siteLogo || { url: '', id: 0 } );
	const [ logoHeight, setLogoHeight ] = useState( customizeData.logoHeight ?? 80 );
	const [ showSiteTitle, setShowSiteTitle ] = useState( customizeData.showSiteTitle ?? true );
	const [ selectedColorScheme, setSelectedColorScheme ] = useState( customizeData.selectedColorScheme || '' );
	const [ customColors, setCustomColors ] = useState( customizeData.customColors || {} );
	const [ customPrimaryColor, setCustomPrimaryColor ] = useState( customizeData.customPrimaryColor || '' );
	const [ selectedTypographyPair, setSelectedTypographyPair ] = useState( customizeData.selectedTypographyPair || '' );
	const [ previewDevice, setPreviewDevice ] = useState( customizeData.previewDevice || 'desktop' );
	const [ cleanInstall, setCleanInstall ] = useState( customizeData.cleanInstall || false );

	// Get the selected site ID from the Design step
	const selectedSiteId = designData.selectedSiteId;

	// Get theme name, selected site, color schemes, and typography pairs
	const themeName = getThemeName();
	const selectedSite = getStarterSiteById( selectedSiteId );
	const colorSchemes = getColorSchemesForSite( selectedSite, themeName );
	const typographyPairs = getTypographyPairsForSite( selectedSite, themeName );

	// Check if there's an existing starter site installed
	const hasExistingStarter = window.atssOnboarding?.currentStarter && window.atssOnboarding.currentStarter !== '';

	// Check if the selected site is a Pro template
	// The 'type' property is set to 'pro' or 'free' in the starter sites data
	const isProTemplate = selectedSite?.type === 'pro';

	// Initialize preview bridge
	usePreviewBridgeInit( iframeRef );

	// Sync data with preview
	useColorPreviewSync( {
		selectedColorScheme,
		colorSchemes,
		customColors,
	} );

	// When a predefined color scheme is selected, populate customColors with its colors
	// so they can be applied via apply_color_customizations in PHP
	// When switching to custom, clear customColors so they can be regenerated from primary color
	useEffect( () => {
		if ( selectedColorScheme === 'custom' ) {
			// Clear customColors when switching to custom mode
			// CustomColorsControl will regenerate them from the primary color
			setCustomColors( {} );
		} else if ( selectedColorScheme && colorSchemes.length > 0 ) {
			const scheme = colorSchemes.find( ( s ) => s.id === selectedColorScheme );
			if ( scheme && scheme.colors ) {
				setCustomColors( scheme.colors );
			}
		}
	}, [ selectedColorScheme, colorSchemes ] );
	useLogoPreviewSync( siteLogo, logoHeight );
	useLogoHeightPreviewSync( logoHeight );
	useSiteTitlePreviewSync( siteTitle, showSiteTitle );
	useTypographyPreviewSync( selectedTypographyPair, typographyPairs );

	// Get the site data and preview URL
	const previewUrl = useMemo( () => {
		if ( selectedSiteId ) {
			const site = getStarterSiteById( selectedSiteId );
			if ( site && site.preview ) {
				let url = site.preview;

				// If builder is Gutenberg, append -gb to the URL slug
				if ( builder === 'gutenberg' ) {
					// Clean up double dashes in URL
					if ( selectedSiteId !== 'resume' ) {
						url = url.replace( /--/g, '-' );
					}
					// Transform: https://demo.athemes.com/sydney-main/ → https://demo.athemes.com/sydney-main-gb/
					url = url.replace( /\/([^\/\?]+)(\/)?(\?.*)?$/, '/$1-gb$2$3' );

					if ( selectedSiteId === 'cafe' ) { // Special case for Cafe template
						url = 'https://demo.athemes.com/sp-cafe-gb/';
					}

					if ( selectedSiteId === 'author' ) { // Special case for Author template
						url = 'https://demo.athemes.com/sp-author-gb/';
					}
				}

				return url;
			}
		}
		// Fallback to default preview URL
		return 'https://athemes.com/';
	}, [ selectedSiteId, builder ] );

	// Add preconnect hints for faster iframe loading
	useEffect( () => {
		addPreconnectHints( previewUrl );
	}, [ previewUrl ] );

	// Handle logo change
	const handleLogoChange = ( newLogo ) => {
		setSiteLogo( newLogo );

		// If a logo is set, deactivate site title by default (per requirements)
		if ( newLogo.url ) {
			setShowSiteTitle( false );
		} else {
			setShowSiteTitle( true );
		}
	};

	// Handle iframe load - also prefetch pages for the next step
	const handleIframeLoad = async () => {
		setIsIframeLoading( false );

		// Prefetch pages for the Pages step if not already fetched for this site
		// Note: prefetchedPages are cleared when design changes (in Design.js)
		if ( ! prefetchedPages && selectedSiteId ) {
			try {
				const pagesData = await getDemoPages( selectedSiteId, builder );

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

				// Store in context for Pages step
				setPrefetchedPages( filteredPages );

				// Add preconnect hints for faster iframe loading
				addPagePreconnectHints( filteredPages );
			} catch ( err ) {
				// Silently fail - Pages step will fetch if needed
				// eslint-disable-next-line no-console
				console.log( 'Prefetch pages failed (will retry on Pages step):', err );
			}
		}
	};

	// Handle continue - save customize data to wizard context
	const handleContinue = () => {
		// Get the selected typography pair to extract font names
		const selectedPair = typographyPairs.find( ( pair ) => pair.id === selectedTypographyPair );

		onContinue( {
			siteLogo,
			logoHeight,
			showSiteTitle,
			selectedColorScheme,
			customColors,
			customPrimaryColor,
			selectedTypographyPair,
			headingFont: selectedPair?.headingFont?.family || '',
			bodyFont: selectedPair?.bodyFont?.family || '',
			cleanInstall,
		} );
	};

	return (
		<div className="atss-onboarding-wizard__step-wrapper flex">
			<div className="atss-onboarding-wizard__step atss-onboarding-wizard__step--customize">
				<main className="atss-onboarding-wizard__step-body">
					<MediaUploadControl
						label={ __( 'Site Logo', 'athemes-starter-sites' ) }
						value={ siteLogo.url }
						id={ siteLogo.id }
						onChange={ handleLogoChange }
						buttonText={ __( 'Upload Logo', 'athemes-starter-sites' ) }
					/>

					{ siteLogo.url && (
						<RangeControl
							label={ __( 'Logo Height', 'athemes-starter-sites' ) }
							value={ logoHeight }
							onChange={ setLogoHeight }
							min={ 30 }
							max={ 125 }
							className="atss-control"
						/>
					) }

					<TextControl
						label={ __( 'Site Title', 'athemes-starter-sites' ) }
						className="atss-control atss-site-title-control"
						value={ siteTitle }
						onChange={ setSiteTitle }
						__next40pxDefaultSize={ true }
						__nextHasNoMarginBottom={ true }
					/>

					<ToggleControl
						label={ __( 'Show site title', 'athemes-starter-sites' ) }
						className="atss-control"
						checked={ showSiteTitle }
						onChange={ setShowSiteTitle }
						__nextHasNoMarginBottom={ true }
					/>

					<CustomColorsControl
						label={ __( 'Color Scheme', 'athemes-starter-sites' ) }
						colorSchemes={ colorSchemes }
						value={ selectedColorScheme }
						onChange={ setSelectedColorScheme }
						onCustomColors={ setCustomColors }
						customColors={ customColors }
						customPrimaryColor={ customPrimaryColor }
						onPrimaryColorChange={ setCustomPrimaryColor }
						themeName={ themeName }
					/>

					<TypographyControl
						label={ __( 'Fonts', 'athemes-starter-sites' ) }
						typographyPairs={ typographyPairs }
						value={ selectedTypographyPair }
						onChange={ setSelectedTypographyPair }
					/>

					{ hasExistingStarter && (
						<ToggleControl
							label={ __( 'Clean Install', 'athemes-starter-sites' ) }
							className="atss-control"
							checked={ cleanInstall }
							onChange={ setCleanInstall }
							help={ __( 'This option will remove the previous imported content and will perform a fresh and clean install.', 'athemes-starter-sites' ) }
							__nextHasNoMarginBottom={ true }
						/>
					) }

					<DevicePreviewControl
						label={ __( 'Preview', 'athemes-starter-sites' ) }
						value={ previewDevice }
						onChange={ setPreviewDevice }
					/>

					<CustomizeUpsell
						isVisible={ isProTemplate }
						upgradeUrl={ window.atssOnboarding?.upgradeUrl || undefined }
					/>
				</main>

				<Footer
					showBack={ true }
					showSkip={ false }
					continueText={ __( 'Continue', 'athemes-starter-sites' ) }
					onBack={ onBack }
					onContinue={ handleContinue }
					continueDisabled={ isProTemplate }
					continueLoading={ navigationLoading }
					continueError={ navigationError }
				/>
			</div>

		<div className="atss-onboarding-wizard__preview">
			<div className={ `atss-onboarding-wizard__preview-inner atss-onboarding-wizard__preview-iframe--${ previewDevice }` }>
				{ isIframeLoading && (
					<div className="atss-onboarding-wizard__preview-loading">
						<Spinner />
					</div>
				) }
				<iframe
						ref={ iframeRef }
						id="demo-preview"
						src={ `${ previewUrl }${ previewUrl.includes( '?' ) ? '&' : '?' }atss_preview=1` }
						title="Preview"
						onLoad={ handleIframeLoad }
						style={ { opacity: isIframeLoading ? 0 : 1 } }
						className={ `atss-onboarding-wizard__preview-iframe` }
					></iframe>
				</div>
			</div>
		</div>
	);
}

export default Customize;
