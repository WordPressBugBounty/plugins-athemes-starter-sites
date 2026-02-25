/**
 * WordPress AJAX API utility functions.
 *
 * @package Athemes Starter Sites
 */

/**
 * Make a WordPress AJAX request.
 *
 * @param {string} action - The WordPress AJAX action name.
 * @param {Object} data   - Additional data to send.
 * @return {Promise} The response data.
 * @throws {Error} If the request fails or atssOnboarding is not defined.
 */
export const wpAjaxRequest = async( action, data = {}) => {
	if ( 'undefined' === typeof atssOnboarding ) {
		throw new Error( 'atssOnboarding is not defined. Make sure the script is properly enqueued.' );
	}

	const response = await fetch( atssOnboarding.ajaxUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			action,
			nonce: atssOnboarding.nonce,
			...data
		})
	});

	if ( ! response.ok ) {
		throw new Error( `HTTP error! status: ${ response.status }` );
	}

	const result = await response.json();

	if ( ! result.success ) {
		throw new Error( result.data?.message || 'Request failed' );
	}

	return result.data;
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
	return await wpAjaxRequest( 'atss_get_demo_pages', {
		demo_id: demoId,
		builder: builder
	});
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
			signal: controller.signal
		});

		clearTimeout( timeoutId );

		if ( ! response.ok ) {
			throw new Error( `HTTP error! status: ${ response.status }` );
		}

		// Return the full response for newAJAX handling.
		return await response.json();

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
