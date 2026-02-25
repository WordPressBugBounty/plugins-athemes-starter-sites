/**
 * usePreviewSync hook - Syncs wizard data with preview iframe.
 *
 * @package Athemes Starter Sites
 */

import { useEffect, useRef } from '@wordpress/element';
import previewBridge from './preview-bridge';
import { convertLogoForPreview } from './image-utils';

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
	if ( 'custom' === schemeId ) {

		// Validate that customColors has actual color properties
		if ( ! customColors || 'object' !== typeof customColors || 0 === Object.keys( customColors ).length ) {
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
 * Hook to sync colors with the preview iframe.
 *
 * @param {Object} options Hook options.
 * @param {string} options.selectedColorScheme   The selected color scheme ID.
 * @param {Array}  options.colorSchemes         Array of available color schemes.
 * @param {Object} options.customColors         Custom generated colors.
 * @param {number} options.debounceMs           Debounce delay in milliseconds (default: 300).
 */
export const useColorPreviewSync = ({
	selectedColorScheme,
	colorSchemes = [],
	customColors = {},
	debounceMs = 300
}) => {
	const timeoutRef = useRef( null );

	useEffect( () => {

		// Clear any pending timeout
		if ( timeoutRef.current ) {
			clearTimeout( timeoutRef.current );
		}

		// Debounce the color update
		timeoutRef.current = setTimeout( () => {
			const colors = transformColors( selectedColorScheme, colorSchemes, customColors );

			if ( colors ) {
				previewBridge.updateColors( colors );
			}
		}, debounceMs );

		// Cleanup
		return () => {
			if ( timeoutRef.current ) {
				clearTimeout( timeoutRef.current );
			}
		};
	}, [ selectedColorScheme, colorSchemes, customColors, debounceMs ]);
};

/**
 * Hook to sync logo with the preview iframe.
 *
 * @param {Object} siteLogo Logo data object with url and id.
 * @param {number} logoHeight Optional logo height to include in the logo object.
 */
export const useLogoPreviewSync = ( siteLogo, logoHeight ) => {
	useEffect( () => {
		if ( ! siteLogo ) {
			return;
		}

		// Convert logo to preview-safe format (handles local URLs)
		const syncLogo = async () => {
			try {
				// Include height in logo object if provided
				const logoWithHeight = logoHeight !== undefined && null !== logoHeight ?
					{ ...siteLogo, height: logoHeight } :
					siteLogo;

				// Convert local URLs to data URLs to avoid CORS issues
				const previewSafeLogo = await convertLogoForPreview( logoWithHeight );

				previewBridge.updateLogo( previewSafeLogo );
			} catch ( error ) {
				// If conversion fails, send original logo anyway
				// eslint-disable-next-line no-console
				console.warn( '[useLogoPreviewSync] Failed to convert logo:', error );

				const logoWithHeight = logoHeight !== undefined && null !== logoHeight ?
					{ ...siteLogo, height: logoHeight } :
					siteLogo;

				previewBridge.updateLogo( logoWithHeight );
			}
		};

		syncLogo();
	}, [ siteLogo, logoHeight ]);
};

/**
 * Hook to sync logo height with the preview iframe.
 *
 * @param {number} logoHeight The logo height.
 */
export const useLogoHeightPreviewSync = ( logoHeight ) => {
	useEffect( () => {
		if ( logoHeight !== undefined && null !== logoHeight ) {
			previewBridge.updateLogoHeight( logoHeight );
		}
	}, [ logoHeight ]);
};

/**
 * Hook to sync site title with the preview iframe.
 *
 * @param {string}  siteTitle    The site title.
 * @param {boolean} showSiteTitle Whether to show the title.
 */
export const useSiteTitlePreviewSync = ( siteTitle, showSiteTitle ) => {
	const timeoutRef = useRef( null );

	useEffect( () => {

		// Clear any pending timeout
		if ( timeoutRef.current ) {
			clearTimeout( timeoutRef.current );
		}

		// Debounce the title update
		timeoutRef.current = setTimeout( () => {
			previewBridge.updateSiteTitle( siteTitle, showSiteTitle );
		}, 500 );

		// Cleanup
		return () => {
			if ( timeoutRef.current ) {
				clearTimeout( timeoutRef.current );
			}
		};
	}, [ siteTitle, showSiteTitle ]);
};

/**
 * Hook to sync typography with the preview iframe.
 *
 * @param {string} selectedTypographyPair The selected typography pair ID.
 * @param {Array}  typographyPairs       Array of available typography pairs.
 */
export const useTypographyPreviewSync = ( selectedTypographyPair, typographyPairs ) => {
	useEffect( () => {
		if ( ! selectedTypographyPair ) {
			return;
		}

		const selectedPair = typographyPairs.find( ( pair ) => pair.id === selectedTypographyPair );
		if ( selectedPair ) {
			previewBridge.updateTypography( selectedPair );
		}
	}, [ selectedTypographyPair, typographyPairs ]);
};

/**
 * Hook to initialize the preview bridge with an iframe.
 * This hook watches for the iframe element to become available and initializes the bridge.
 *
 * @param {Object} iframeRef React ref to the iframe element.
 */
export const usePreviewBridgeInit = ( iframeRef ) => {
	useEffect( () => {

		// Initialize immediately if iframe is available
		if ( iframeRef?.current ) {
			previewBridge.init( iframeRef.current );
		}
	}, [ iframeRef ]);

	// Also watch for when the iframe element becomes available (for conditional rendering)
	useEffect( () => {

		// If iframe ref exists and has a current value, and it's different from what bridge has
		if ( iframeRef?.current && previewBridge.iframe !== iframeRef.current ) {
			previewBridge.init( iframeRef.current );
		}
	});
};

