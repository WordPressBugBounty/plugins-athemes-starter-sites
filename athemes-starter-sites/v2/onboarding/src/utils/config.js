/**
 * Configuration constants for the onboarding wizard.
 *
 * @package Athemes Starter Sites
 */

/**
 * Base URL for Athemes website.
 *
 * @type {string}
 */
export const ATHEMES_BASE_URL = 'https://athemes.com';

/**
 * Account dashboard URL.
 * This is the same for all products.
 *
 * @type {string}
 */
export const ACCOUNT_URL = `${ ATHEMES_BASE_URL }/account/`;

/**
 * Default upgrade URL.
 *
 * @type {string}
 */
export const DEFAULT_UPGRADE_URL = `${ ATHEMES_BASE_URL }/`;

/**
 * Documentation URL.
 * The theme name is passed as a parameter to the documentation URL.
 *
 * @type {string}
 */
export const DOCUMENTATION_URL = `https://docs.athemes.com/documentation/${ window.atssOnboarding?.themeName }`;

/**
 * Facebook Group URL.
 *
 * @type {string}
 */
export const FACEBOOK_GROUP_URL = 'https://www.facebook.com/groups/athemes/';
