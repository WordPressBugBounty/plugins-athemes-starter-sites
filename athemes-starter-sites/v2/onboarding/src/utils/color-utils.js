/**
 * Color utility functions for generating color schemes.
 *
 * @package Athemes Starter Sites
 */

/**
 * Convert hex color to HSL.
 *
 * @param {string} hex Hex color string (e.g., '#333333').
 * @return {Object} HSL object with h, s, l properties.
 */
export function hexToHSL( hex ) {

	// Remove the hash if present
	hex = hex.replace( /^#/, '' );

	// Parse hex to RGB
	const r = parseInt( hex.substring( 0, 2 ), 16 ) / 255;
	const g = parseInt( hex.substring( 2, 4 ), 16 ) / 255;
	const b = parseInt( hex.substring( 4, 6 ), 16 ) / 255;

	const max = Math.max( r, g, b );
	const min = Math.min( r, g, b );
	let h, s;
	const l = ( max + min ) / 2;

	if ( max === min ) {
		h = s = 0; // achromatic
	} else {
		const d = max - min;
		s = 0.5 < l ? d / ( 2 - max - min ) : d / ( max + min );

		switch ( max ) {
		case r:
			h = ( g - b ) / d + ( g < b ? 6 : 0 );
			break;
		case g:
			h = ( b - r ) / d + 2;
			break;
		case b:
			h = ( r - g ) / d + 4;
			break;
		}

		h /= 6;
	}

	return {
		h: Math.round( h * 360 ),
		s: Math.round( s * 100 ),
		l: Math.round( l * 100 )
	};
}

/**
 * Convert HSL to hex color.
 *
 * @param {number} h Hue (0-360).
 * @param {number} s Saturation (0-100).
 * @param {number} l Lightness (0-100).
 * @return {string} Hex color string.
 */
export function hslToHex( h, s, l ) {
	h = h / 360;
	s = s / 100;
	l = l / 100;

	let r, g, b;

	if ( 0 === s ) {
		r = g = b = l; // achromatic
	} else {
		const hue2rgb = ( p, q, t ) => {
			if ( 0 > t ) {
				t += 1;
			}
			if ( 1 < t ) {
				t -= 1;
			}
			if ( t < 1 / 6 ) {
				return p + ( q - p ) * 6 * t;
			}
			if ( t < 1 / 2 ) {
				return q;
			}
			if ( t < 2 / 3 ) {
				return p + ( q - p ) * ( 2 / 3 - t ) * 6;
			}
			return p;
		};

		const q = 0.5 > l ? l * ( 1 + s ) : l + s - l * s;
		const p = 2 * l - q;

		r = hue2rgb( p, q, h + 1 / 3 );
		g = hue2rgb( p, q, h );
		b = hue2rgb( p, q, h - 1 / 3 );
	}

	const toHex = ( x ) => {
		const hex = Math.round( x * 255 ).toString( 16 );
		return 1 === hex.length ? '0' + hex : hex;
	};

	return '#' + toHex( r ) + toHex( g ) + toHex( b );
}

/**
 * Lighten a color by increasing its lightness.
 *
 * @param {string} hex    Hex color string.
 * @param {number} amount Amount to lighten (0-100).
 * @return {string} Lightened hex color.
 */
export function lighten( hex, amount ) {
	const hsl = hexToHSL( hex );
	hsl.l = Math.min( 100, hsl.l + amount );
	return hslToHex( hsl.h, hsl.s, hsl.l );
}

/**
 * Darken a color by decreasing its lightness.
 *
 * @param {string} hex    Hex color string.
 * @param {number} amount Amount to darken (0-100).
 * @return {string} Darkened hex color.
 */
export function darken( hex, amount ) {
	const hsl = hexToHSL( hex );
	hsl.l = Math.max( 0, hsl.l - amount );
	return hslToHex( hsl.h, hsl.s, hsl.l );
}

/**
 * Calculate relative luminance for contrast ratio.
 *
 * @param {string} hex Hex color string.
 * @return {number} Relative luminance.
 */
function getRelativeLuminance( hex ) {
	hex = hex.replace( /^#/, '' );

	const r = parseInt( hex.substring( 0, 2 ), 16 ) / 255;
	const g = parseInt( hex.substring( 2, 4 ), 16 ) / 255;
	const b = parseInt( hex.substring( 4, 6 ), 16 ) / 255;

	const toLinear = ( c ) => {
		return 0.03928 >= c ? c / 12.92 : Math.pow( ( c + 0.055 ) / 1.055, 2.4 );
	};

	const rLinear = toLinear( r );
	const gLinear = toLinear( g );
	const bLinear = toLinear( b );

	return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculate contrast ratio between two colors.
 *
 * @param {string} color1 First hex color.
 * @param {string} color2 Second hex color.
 * @return {number} Contrast ratio.
 */
export function calculateContrastRatio( color1, color2 ) {
	const lum1 = getRelativeLuminance( color1 );
	const lum2 = getRelativeLuminance( color2 );

	const lighter = Math.max( lum1, lum2 );
	const darker = Math.min( lum1, lum2 );

	return ( lighter + 0.05 ) / ( darker + 0.05 );
}

/**
 * Generate a complete 9-color scheme from a primary color.
 *
 * @param {string} primaryColor Hex color for the primary color.
 * @param {string} themeName    Theme name (sydney, botiga, etc.) to generate proper CSS variable names.
 * @return {Object} Object containing colors array and contrast warnings.
 */
export function generateColorScheme( primaryColor, themeName = 'sydney' ) {
	const hsl = hexToHSL( primaryColor );
	const primaryHue = hsl.h;
	const primaryLightness = hsl.l;

	// Generate the color values
	const colorValues = {
		1: primaryColor, // Primary Color - as-is
		2: 20 > primaryLightness ?
			lighten( primaryColor, 15 ) :
			darken( primaryColor, 10 ), // Hover Color
		3: hslToHex( primaryHue, 15, 20 ), // Body Text Color
		4: hslToHex( primaryHue, 20, 12 ), // General Headings Color
		5: hslToHex( primaryHue, 10, 55 ), // Smaller Text/Meta
		6: hslToHex( primaryHue, 20, 10 ), // Dark Backgrounds
		7: hslToHex( primaryHue, 20, 97 ), // Light Backgrounds
		8: hslToHex( primaryHue, 12, 87 ), // Border Color
		9: '#ffffff' // Site Background
	};

	// Generate the 9 colors with proper CSS variable names for the theme
	// Ensure theme name is lowercase for CSS variables
	const themeSlug = themeName.toLowerCase();
	const colors = {};
	for ( let i = 1; 9 >= i; i++ ) {
		colors[ `--${ themeSlug }-global-color-${ i }` ] = colorValues[ i ];
	}

	// Calculate contrast ratios and generate warnings
	const warnings = [];
	const backgroundColor = colorValues[ 9 ];

	// Check primary color contrast (color 1)
	const primaryContrast = calculateContrastRatio( colorValues[ 1 ], backgroundColor );
	if ( 4.5 > primaryContrast ) {
		warnings.push({
			color: `--${ themeSlug }-global-color-1`,
			message: 'Primary color may not have sufficient contrast on light backgrounds. Consider choosing a darker color.',
			ratio: primaryContrast.toFixed( 2 )
		});
	}

	// Check body text contrast (color 3)
	const bodyTextContrast = calculateContrastRatio( colorValues[ 3 ], backgroundColor );
	if ( 4.5 > bodyTextContrast ) {
		warnings.push({
			color: `--${ themeSlug }-global-color-3`,
			message: 'Body text color may not have sufficient contrast on light backgrounds. Consider choosing a darker primary color.',
			ratio: bodyTextContrast.toFixed( 2 )
		});
	}

	// Check headings contrast (color 4)
	const headingsContrast = calculateContrastRatio( colorValues[ 4 ], backgroundColor );
	if ( 4.5 > headingsContrast ) {
		warnings.push({
			color: `--${ themeSlug }-global-color-4`,
			message: 'Heading color may not have sufficient contrast on light backgrounds. Consider choosing a darker primary color.',
			ratio: headingsContrast.toFixed( 2 )
		});
	}

	return {
		colors,
		warnings
	};
}

