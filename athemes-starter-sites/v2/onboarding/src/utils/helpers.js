/**
 * Theme helper utilities.
 *
 * @package Athemes Starter Sites
 */

/**
 * Get the theme logo based on the current theme.
 *
 * @return {string|null} Logo URL or null if not found.
 */
export const getThemeLogo = () => {

	// Check if global variable exists
	if ( 'undefined' === typeof atssOnboarding ) {
		console.warn( 'atssOnboarding configuration not found' );
		return null;
	}

	const themeName = atssOnboarding?.themeName;
	const pluginUrl = atssOnboarding?.pluginUrl;

	if ( ! themeName || ! pluginUrl ) {
		return null;
	}

	// Normalize theme name to match logo filenames
	const normalizedTheme = themeName.toLowerCase().includes( 'sydney' ) ? 'sydney' : 'botiga';

	return `${ pluginUrl }v2/onboarding/src/assets/images/logo-${ normalizedTheme }.svg`;
};

/**
 * Build preview image URL for a demo/starter site.
 *
 * @param {string} id        Demo ID.
 * @param {string} themeName Optional theme name. Defaults to 'sydney' if not provided.
 * @return {string} Preview image URL.
 */
export const getPreviewImageUrl = ( id, themeName = 'sydney' ) => {
	const normalizedThemeName = ( themeName || 'sydney' ).toLowerCase();
	return `https://athemes.com/themes-demo-content/full-height-ss/${ normalizedThemeName }/${ id }.jpg`;
};

/**
 * Validate email address.
 *
 * @param {string} email Email address to validate.
 * @return {boolean} True if email is valid, false otherwise.
 */
export const validateEmail = ( email ) => {
	const regexp = /^(([^<>()[\]\\.,;:\s@"]+(.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regexp.test( email );
};

