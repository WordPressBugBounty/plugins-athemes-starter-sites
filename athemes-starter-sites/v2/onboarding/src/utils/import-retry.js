/**
 * Retry and Wait policy for the import steps.
 *
 * A Retry repeats an import step after a transient failure, with a growing
 * delay and a bounded budget per step. A Wait re-asks an import step while
 * the server reports that an earlier request still holds the import lock: it
 * is not a failure and does not use up the step's Retries.
 *
 * @package Athemes Starter Sites
 */

/**
 * Delay before each Retry, in milliseconds. The last delay repeats.
 *
 * @type {number[]}
 */
export const RETRY_DELAYS_MS = [ 5000, 15000, 30000 ];

/**
 * HTTP statuses that mean the request may succeed when repeated: timeouts,
 * rate limits, and gateway or origin errors (including Cloudflare's 52x).
 *
 * @type {number[]}
 */
export const TRANSIENT_HTTP_STATUSES = [ 408, 429, 500, 502, 503, 504, 520, 521, 522, 523, 524 ];

/**
 * Interval between Wait polls, in milliseconds.
 *
 * @type {number}
 */
export const WAIT_POLL_MS = 10000;

/**
 * Wait time after which one Wait counts as a transient failure, in milliseconds.
 *
 * @type {number}
 */
export const WAIT_CAP_MS = 240000;

/**
 * What every writing import handler answers while another import request
 * holds the lock. Never translated, never shown to the user.
 *
 * @type {string}
 */
const LOCKED_RESPONSE_DATA = 'import_step_in_progress';

/**
 * Error names that are transient whatever their status: the request timed
 * out, a plugin redirected it to its own screen, or stray output corrupted
 * the JSON body.
 *
 * @type {string[]}
 */
const TRANSIENT_ERROR_NAMES = [ 'AbortError', 'RedirectError', 'SyntaxError' ];

/**
 * Retry budget per import step. Widgets and the customizer get one Retry
 * because repeating them is not free. A repeat never overlaps the first
 * request: it waits behind the import lock, and a repeat that arrives after
 * the first request completed is answered from that step's done marker. A
 * repeat after a first request that did not complete runs the step again: a
 * repeated widgets import leaves copies in Inactive Widgets, and a repeated
 * customizer import calls remove_theme_mods() again before re-importing the
 * same mods.
 *
 * @type {Object<string, number>}
 */
const MAX_RETRIES = {
	atss_import_start: 3,
	atss_import_clean: 3,
	atss_import_plugin: 3,
	atss_import_contents: 3,
	atss_apply_wizard_customizations: 3,
	atss_import_finish: 3,
	atss_import_widgets: 1,
	atss_import_customizer: 1,
};

/**
 * Whether a failed import request may succeed when repeated.
 *
 * A TypeError is transient only without a status: fetch() rejects with a
 * status-less TypeError when the request never completed, while a TypeError
 * carrying a status came out of response handling and is a code bug.
 *
 * @param {Error} err The error the import request threw.
 * @return {boolean} True when the failure is transient.
 */
export function isTransientError( err ) {
	if ( ! err ) {
		return false;
	}

	if ( 'TypeError' === err.name ) {
		return undefined === err.status;
	}

	if ( TRANSIENT_ERROR_NAMES.includes( err.name ) ) {
		return true;
	}

	return TRANSIENT_HTTP_STATUSES.includes( err.status );
}

/**
 * Whether the server answered that another import request holds the lock.
 *
 * @param {Object} response The parsed import response.
 * @return {boolean} True for a locked response, for any action.
 */
export function isLockedResponse( response ) {
	return !! response && false === response.success && LOCKED_RESPONSE_DATA === response.data;
}

/**
 * Number of Retries an import step gets after transient failures.
 *
 * @param {string} action The import step's AJAX action.
 * @return {number} Retry budget, 0 for unknown actions.
 */
export function getMaxRetries( action ) {
	return Object.prototype.hasOwnProperty.call( MAX_RETRIES, action ) ? MAX_RETRIES[ action ] : 0;
}

/**
 * Delay before a Retry.
 *
 * @param {number} retryNumber The 1-based Retry number.
 * @return {number} Delay in milliseconds. The last delay repeats.
 */
export function getRetryDelay( retryNumber ) {
	const index = Math.min( Math.max( retryNumber, 1 ), RETRY_DELAYS_MS.length ) - 1;

	return RETRY_DELAYS_MS[ index ];
}
