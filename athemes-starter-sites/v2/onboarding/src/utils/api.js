/**
 * WordPress AJAX API utility functions.
 *
 * @package Athemes Starter Sites
 */

/**
 * Default timeout for a wizard AJAX request, in milliseconds.
 *
 * Every request needs an upper bound: a stalled connection (wedged PHP-FPM
 * worker, buffering proxy) neither resolves nor rejects, so without one the
 * awaiting caller hangs forever with no error and no telemetry.
 *
 * @type {number}
 */
const DEFAULT_AJAX_TIMEOUT_MS = 60000;

/**
 * Timeout for the sacrificial activation-redirect ping, in milliseconds.
 *
 * The ping hits a no-op handler, so it either answers quickly or is wedged.
 * Failing fast lets drainActivationRedirects move on to the next attempt.
 *
 * @type {number}
 */
const PING_TIMEOUT_MS = 15000;

/**
 * Timeout for parsing demo pages out of the demo XML, in milliseconds.
 *
 * @type {number}
 */
const DEMO_PAGES_TIMEOUT_MS = 120000;

/**
 * Make a WordPress AJAX request.
 *
 * @param {string} action            - The WordPress AJAX action name.
 * @param {Object} data              - Additional data to send.
 * @param {Object} options           - Request options.
 * @param {number} options.timeoutMs - Abort the request after this many ms.
 * @return {Promise} The response data.
 * @throws {Error} If the request fails, times out, or atssOnboarding is not defined.
 */
export const wpAjaxRequest = async( action, data = {}, { timeoutMs = DEFAULT_AJAX_TIMEOUT_MS } = {}) => {
	if ( 'undefined' === typeof atssOnboarding ) {
		throw new Error( 'atssOnboarding is not defined. Make sure the script is properly enqueued.' );
	}

	const controller = new AbortController();
	const timeoutId = setTimeout( () => controller.abort(), timeoutMs );

	try {
		const response = await fetch( atssOnboarding.ajaxUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				action,
				nonce: atssOnboarding.nonce,
				...data
			}),
			// Never follow redirects. A plugin installed during the import can
			// redirect any later admin-ajax.php request to its own screen, and
			// following that 302 returns a wp-admin HTML page with HTTP 200.
			redirect: 'manual',
			signal: controller.signal
		});

		// Hijacked request: 'opaqueredirect' in browsers (status 0), or a visible
		// 3xx where redirects are not opaque (tests, non-browser fetch).
		if ( 'opaqueredirect' === response.type || ( response.status >= 300 && response.status < 400 ) ) {
			const redirectError = new Error(
				`Request was redirected away from admin-ajax.php (HTTP ${ response.status }). A plugin installed during the import is redirecting to its own screen.`
			);
			redirectError.name = 'RedirectError';
			redirectError.status = response.status;
			throw redirectError;
		}

		if ( ! response.ok ) {
			throw new Error( `HTTP error! status: ${ response.status }` );
		}

		// Parse manually so a corrupted (non-JSON) body can be diagnosed.
		const rawBody = await response.text();
		let result;

		try {
			result = JSON.parse( rawBody );
		} catch ( parseError ) {
			const syntaxError = new Error(
				`Invalid JSON response (HTTP ${ response.status }): ${ sanitizeResponseSnippet( rawBody ) }`
			);
			syntaxError.name = 'SyntaxError';
			syntaxError.status = response.status;
			throw syntaxError;
		}

		if ( ! result.success ) {
			throw new Error( result.data?.message || 'Request failed' );
		}

		return result.data;
	} catch ( err ) {
		// Re-throw the abort with a message that names the real cause.
		if ( 'AbortError' === err.name ) {
			const timeoutError = new Error( `Request timed out after ${ timeoutMs / 1000 } seconds` );
			timeoutError.name = 'AbortError';
			throw timeoutError;
		}

		throw err;
	} finally {
		clearTimeout( timeoutId );
	}
};

/**
 * Absorb one-shot activation redirects before a real import step runs.
 *
 * Some plugins (e.g. WPConsent) arm a one-shot admin_init redirect on
 * activation and `exit;` without an wp_doing_ajax() guard, truncating
 * whichever admin-ajax.php request runs next. Each sacrificial ping here
 * either gets hijacked in its place, or comes back clean because nothing
 * was armed — either way the next real step is safe. A ping that fails IS
 * the success signal (one hijack consumed here); this must never throw or
 * reject.
 *
 * Each ping is time-boxed so a stalled connection aborts into the catch below
 * instead of blocking the import loop indefinitely.
 *
 * @param {number} maxPings Maximum number of sacrificial pings to attempt.
 * @return {Promise<void>}
 */
export const drainActivationRedirects = async( maxPings = 3 ) => {
	for ( let attempt = 0; attempt < maxPings; attempt++ ) {
		try {
			await wpAjaxRequest( 'atss_import_ping', {}, { timeoutMs: PING_TIMEOUT_MS });
			return;
		} catch ( err ) {
			// Failure consumed a hijacked redirect; try the next ping.
		}
	}
};

/**
 * Get the wizard state from the database.
 *
 * @return {Promise} The wizard state data.
 */
export const getWizardState = async() => {
	return await wpAjaxRequest( 'atss_get_wizard_state' );
};

/**
 * Save the wizard state to the database.
 *
 * @param {Object} state - The state object to save.
 * @return {Promise} The response data.
 */
export const saveWizardState = async( state ) => {
	return await wpAjaxRequest( 'atss_save_wizard_state', {
		state: JSON.stringify( state )
	});
};

/**
 * Delete the wizard state from the database.
 *
 * @return {Promise} The response data.
 */
export const deleteWizardState = async() => {
	return await wpAjaxRequest( 'atss_delete_wizard_state' );
};

/**
 * Get demo pages from XML file.
 *
 * @param {string} demoId  - The demo site ID.
 * @param {string} builder - The builder type (gutenberg/elementor).
 * @return {Promise} Array of page objects.
 */
export const getDemoPages = async( demoId, builder ) => {
	// Parsing an uncached demo XML server-side can outrun the default budget.
	return await wpAjaxRequest( 'atss_get_demo_pages', {
		demo_id: demoId,
		builder: builder
	}, { timeoutMs: DEMO_PAGES_TIMEOUT_MS });
};

/**
 * Reduce a raw response body to a short, privacy-safe snippet for error
 * reporting: tags stripped, URLs redacted, whitespace collapsed, truncated.
 *
 * @param {string} body Raw response body.
 * @return {string} Sanitized snippet.
 */
const sanitizeResponseSnippet = ( body ) => {
	return String( body )
		.replace( /<[^>]*>/g, ' ' )
		.replace( /https?:\/\/\S+/gi, '[url]' )
		.replace( /(?:[A-Za-z]:)?[\\/](?:[\w .@~-]+[\\/]){2,}[\w .@-]*/g, '[path]' )
		.replace( /\s+/g, ' ' )
		.trim()
		.slice( 0, 160 );
};

/**
 * Make an import AJAX request with extended timeout support.
 *
 * This function is specifically designed for import operations:
 * - Supports longer timeouts for content import (3 minutes)
 * - Returns the full response object (needed for newAJAX status handling)
 * - Doesn't throw on success: false (caller handles that)
 *
 * @param {Object} stepData             - The import step data.
 * @param {string} stepData.action      - The WordPress AJAX action name.
 * @param {string} stepData.demo_id     - The demo site ID.
 * @param {string} stepData.builder_type - The builder type (gutenberg/elementor).
 * @return {Promise<Object>} The full AJAX response object.
 * @throws {Error} If the request fails or atssOnboarding is not defined.
 */
export const importAjaxRequest = async( stepData ) => {
	if ( 'undefined' === typeof atssOnboarding ) {
		throw new Error( 'atssOnboarding is not defined. Make sure the script is properly enqueued.' );
	}

	const { action, log, priority, ...params } = stepData;

	// Determine timeout based on action type.
	// Content import can take a long time, widgets and customizer need extended time too.
	let timeoutMs = 120000; // 2 minutes default.
	if ( 'atss_import_contents' === action ) {
		timeoutMs = 180000; // 3 minutes for content.
	} else if ( 'atss_import_widgets' === action || 'atss_import_customizer' === action ) {
		timeoutMs = 120000; // 2 minutes for widgets/customizer.
	} else if ( 'atss_import_plugin' === action ) {
		timeoutMs = 120000; // 2 minutes for plugin installation.
	}

	// Create AbortController for timeout.
	const controller = new AbortController();
	const timeoutId = setTimeout( () => controller.abort(), timeoutMs );

	try {
		const response = await fetch( atssOnboarding.ajaxUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				action,
				nonce: atssOnboarding.nonce,
				...params
			}),
			// Never follow redirects. admin-ajax.php fires admin_init, so a plugin
			// installed by a previous import step can redirect this request to its
			// own welcome screen. Following that 302 returns a wp-admin HTML page
			// with HTTP 200, which surfaces as an unreadable JSON parse error.
			redirect: 'manual',
			signal: controller.signal
		});

		clearTimeout( timeoutId );

		// Hijacked request: 'opaqueredirect' in browsers (status 0), or a visible
		// 3xx where redirects are not opaque (tests, non-browser fetch).
		if ( 'opaqueredirect' === response.type || ( response.status >= 300 && response.status < 400 ) ) {
			const redirectError = new Error(
				`Import request was redirected away from admin-ajax.php (HTTP ${ response.status }). A plugin installed during the import is redirecting to its own screen.`
			);
			redirectError.name = 'RedirectError';
			redirectError.status = response.status;
			throw redirectError;
		}

		if ( ! response.ok ) {
			const httpError = new Error( `HTTP error! status: ${ response.status }` );
			httpError.status = response.status;
			throw httpError;
		}

		// Parse manually so a corrupted (non-JSON) body can be diagnosed.
		// Return the full response for newAJAX handling.
		const rawBody = await response.text();

		try {
			return JSON.parse( rawBody );
		} catch ( parseError ) {
			const syntaxError = new Error(
				`Invalid JSON response (HTTP ${ response.status }): ${ sanitizeResponseSnippet( rawBody ) }`
			);
			syntaxError.name = 'SyntaxError';
			syntaxError.status = response.status;
			throw syntaxError;
		}

	} catch ( err ) {
		clearTimeout( timeoutId );

		// Re-throw abort errors with a cleaner name.
		if ( 'AbortError' === err.name ) {
			const timeoutError = new Error( `Request timed out after ${ timeoutMs / 1000 } seconds` );
			timeoutError.name = 'AbortError';
			throw timeoutError;
		}

		throw err;
	}
};
