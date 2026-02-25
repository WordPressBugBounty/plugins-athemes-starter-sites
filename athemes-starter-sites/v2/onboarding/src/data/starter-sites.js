/**
 * Starter sites data getter.
 *
 * @package Athemes Starter Sites
 */

/**
 * Get the raw demos object from the localized data.
 *
 * @return {Object} The demos object.
 */
export const getRawDemos = () => {
	return window.atssOnboarding?.demos || {};
};

/**
 * Get all available starter sites as an array.
 *
 * @return {Array} Array of demo objects.
 */
export const getStarterSites = () => {
	const demos = getRawDemos();
	return Object.entries( demos ).map( ([ id, data ]) => ({
		id,
		...data
	}) );
};

/**
 * Get a single starter site by its ID.
 *
 * @param {string} id The demo ID.
 * @return {Object|null} The demo object or null if not found.
 */
export const getStarterSiteById = ( id ) => {
	const demos = getRawDemos();
	return demos[ id ] ? { id, ...demos[ id ] } : null;
};

/**
 * Get the onboarding settings.
 *
 * @return {Object} The settings object.
 */
export const getOnboardingSettings = () => {
	return window.atssOnboarding?.settings || {};
};

/**
 * Get the current theme name.
 *
 * @return {string} The theme name (e.g., 'sydney', 'botiga').
 */
export const getThemeName = () => {
	return window.atssOnboarding?.themeName || 'sydney';
};

