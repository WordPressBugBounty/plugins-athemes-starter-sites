/**
 * Typography pairs data for themes.
 *
 * @package aThemes Starter Sites
 */

/**
 * Universal typography pairs that work across all themes.
 * Each pair contains heading and body font families.
 * Font weights are hardcoded in the component (500 for headings, 400 for body).
 */
export const typographyPairs = [
	{
		id: 'system',
		name: 'System Default',
		label: 'System Default',
		headingFont: {
			family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
		},
		bodyFont: {
			family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
		},
		googleFontsUrl: '' // No Google Fonts needed for system fonts
	},
	{
		id: 'default',
		name: 'Default',
		label: 'Inter',
		headingFont: {
			family: 'Inter'
		},
		bodyFont: {
			family: 'Inter'
		},
		googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap'
	},
	{
		id: 'classic-elegant',
		name: 'Classic Elegant',
		label: 'Playfair Display & Source Sans Pro',
		headingFont: {
			family: 'Playfair Display'
		},
		bodyFont: {
			family: 'Source Sans Pro'
		},
		googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=Source+Sans+Pro:wght@400&display=swap'
	},
	{
		id: 'modern-clean',
		name: 'Modern Clean',
		label: 'Poppins',
		headingFont: {
			family: 'Poppins'
		},
		bodyFont: {
			family: 'Poppins'
		},
		googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap'
	},
	{
		id: 'professional',
		name: 'Professional',
		label: 'Roboto Slab & Roboto',
		headingFont: {
			family: 'Roboto Slab'
		},
		bodyFont: {
			family: 'Roboto'
		},
		googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&family=Roboto:wght@400&display=swap'
	},
	{
		id: 'creative-bold',
		name: 'Creative Bold',
		label: 'Montserrat & Open Sans',
		headingFont: {
			family: 'Montserrat'
		},
		bodyFont: {
			family: 'Open Sans'
		},
		googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Open+Sans:wght@400&display=swap'
	},
	{
		id: 'editorial',
		name: 'Editorial',
		label: 'Merriweather & Lato',
		headingFont: {
			family: 'Merriweather'
		},
		bodyFont: {
			family: 'Lato'
		},
		googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@500&family=Lato:wght@400&display=swap'
	},
	{
		id: 'minimal-sans',
		name: 'Minimal Sans',
		label: 'Work Sans',
		headingFont: {
			family: 'Work Sans'
		},
		bodyFont: {
			family: 'Work Sans'
		},
		googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap'
	}
];

/**
 * Get typography pairs for a starter site.
 * Currently returns the same universal pairs for all sites.
 *
 * @param {Object|null} siteData  The starter site data object (unused for now).
 * @param {string}      themeName The theme name (unused for now).
 * @return {Array} Array of typography pair objects.
 */
export const getTypographyPairsForSite = ( siteData, themeName ) => {

	// For now, return universal pairs for all themes
	// In the future, this could be extended to support site-specific or theme-specific pairs
	return typographyPairs;
};

/**
 * Get a single typography pair by ID from a list of pairs.
 *
 * @param {Array}  pairs  Array of typography pair objects.
 * @param {string} pairId The ID of the typography pair to find.
 * @return {Object|null} The typography pair object or null if not found.
 */
export const getTypographyPairById = ( pairs, pairId ) => {
	return pairs.find( ( pair ) => pair.id === pairId ) || null;
};

