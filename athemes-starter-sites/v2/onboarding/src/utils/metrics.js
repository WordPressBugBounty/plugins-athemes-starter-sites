/**
 * Onboarding metrics utilities.
 *
 * @package Athemes Starter Sites
 */

import { wpAjaxRequest } from './api';
import themeName from './get-theme-name';

const allowedEvents = [
	'onboarding_started',
	'onboarding_step_viewed',
	'onboarding_step_completed',
	'onboarding_step_skipped',
	'onboarding_design_selected',
	'onboarding_pages_selected',
	'onboarding_features_selected',
	'onboarding_optin_completed',
	'onboarding_import_started',
	'onboarding_import_step_completed',
	'onboarding_import_failed',
	'onboarding_import_completed',
];

const allowedMetadataKeys = [
	'product',
	'builder',
	'step',
	'demo_id',
	'has_selected_starter',
	'selected_pages_count',
	'selected_plugins_count',
	'optin_checked',
	'import_step',
	'error_code',
	'error_message',
	'http_status',
	'plugin_slug',
	'response_snippet',
	'import_attempt',
	'retry_count',
	'failed_items_count',
	'beacon_attempt',
	'beacon_first_error',
];

const MAX_ERROR_MESSAGE_LENGTH = 200;

const sessionStorageKey = 'atss_onboarding_session_id';

const createSessionId = () => {
	if ( window.crypto?.randomUUID ) {
		return window.crypto.randomUUID();
	}

	return `atss-${ Date.now() }-${ Math.random().toString( 36 ).substring( 2, 12 ) }`;
};

const getSessionId = () => {
	try {
		const storedSessionId = window.sessionStorage.getItem( sessionStorageKey );

		if ( storedSessionId ) {
			return storedSessionId;
		}

		const sessionId = createSessionId();

		window.sessionStorage.setItem( sessionStorageKey, sessionId );

		return sessionId;
	} catch ( error ) {
		return createSessionId();
	}
};

const trackedEventsStorageKey = 'atss_onboarding_tracked_events';

const getTrackedEvents = () => {
	try {
		return JSON.parse(
			window.sessionStorage.getItem( trackedEventsStorageKey ) || '[]'
		);
	} catch ( error ) {
		return [];
	}
};

export const hasTrackedSessionEvent = ( eventName ) => {
	return getTrackedEvents().includes( eventName );
};

export const markSessionEventTracked = ( eventName ) => {
	try {
		const trackedEvents = getTrackedEvents();

		if ( trackedEvents.includes( eventName ) ) {
			return;
		}

		window.sessionStorage.setItem(
			trackedEventsStorageKey,
			JSON.stringify( [ ...trackedEvents, eventName ] )
		);
	} catch ( error ) {
		// Metrics should never block the onboarding flow.
	}
};

export const resetOnboardingMetricsSession = () => {
	try {
		window.sessionStorage.removeItem( sessionStorageKey );
		window.sessionStorage.removeItem( trackedEventsStorageKey );
	} catch ( error ) {
		// Metrics should never block the onboarding flow.
	}
};

const getProduct = () => {
	const normalizedThemeName = themeName.toLowerCase();

	if ( normalizedThemeName.includes( 'botiga' ) ) {
		return 'botiga';
	}

	if ( normalizedThemeName.includes( 'sydney' ) ) {
		return 'sydney';
	}

	return 'unknown';
};

const sanitizeMetadata = ( metadata = {} ) => {
	return Object.keys( metadata ).reduce( ( sanitizedMetadata, key ) => {
		if ( ! allowedMetadataKeys.includes( key ) ) {
			return sanitizedMetadata;
		}

		let value = metadata[ key ];

		// Keep error text privacy-safe: no URLs, paths or email addresses, bounded length.
		if ( 'error_message' === key || 'response_snippet' === key || 'beacon_first_error' === key ) {
			value = String( value )
				.replace( /https?:\/\/\S+/gi, '[url]' )
				.replace( /(?:[A-Za-z]:)?[\\/](?:[\w .@~-]+[\\/]){2,}[\w .@-]*/g, '[path]' )
				// Bounded parts keep the email match linear on long runs of word characters.
				.replace( /[\w.+-]{1,64}@[\w-]{1,63}(?:\.[\w-]{1,63})+/g, '[email]' )
				.replace( /\s+/g, ' ' )
				.trim()
				.slice( 0, MAX_ERROR_MESSAGE_LENGTH );
		}

		sanitizedMetadata[ key ] = value;

		return sanitizedMetadata;
	}, {} );
};

/**
 * Track an onboarding metrics event.
 *
 * @param {string} eventName Event name.
 * @param {Object} metadata  Event metadata.
 * @return {Promise<void>}
 */
export const trackOnboardingEvent = async ( eventName, metadata = {} ) => {
	if ( ! allowedEvents.includes( eventName ) ) {
		return;
	}

	try {
		await wpAjaxRequest( 'atss_track_onboarding_event', {
			event_name: eventName,
			session_id: getSessionId(),
			metadata: JSON.stringify( {
				product: getProduct(),
				...sanitizeMetadata( metadata ),
			} ),
		} );
	} catch ( error ) {
		// Metrics should never block the onboarding flow.
	}
};

const BEACON_TIMEOUT_MS = 4000;
const BEACON_RETRY_DELAY_MS = 1000;

/**
 * Track an onboarding event and confirm the server forwarded it.
 *
 * Sends once, and once more after a short delay when the first attempt did not
 * confirm, except after a client-side timeout: the server keeps running after
 * the browser gives up and most likely forwards the event anyway, so a second
 * send would record it twice. Never rejects, so it can never strand the
 * onboarding flow.
 *
 * @param {string} eventName Event name.
 * @param {Object} metadata  Event metadata.
 * @return {Promise<boolean>} True only when the server confirmed the forward.
 */
export const trackOnboardingEventBlocking = async ( eventName, metadata = {} ) => {
	if ( ! allowedEvents.includes( eventName ) ) {
		return false;
	}

	const send = async ( extraMetadata ) => {
		const result = await wpAjaxRequest(
			'atss_track_onboarding_event',
			{
				event_name: eventName,
				session_id: getSessionId(),
				metadata: JSON.stringify( {
					product: getProduct(),
					...sanitizeMetadata( { ...metadata, ...extraMetadata } ),
				} ),
			},
			{ timeoutMs: BEACON_TIMEOUT_MS }
		);

		return result?.forward;
	};

	let firstError;

	try {
		const forward = await send( { beacon_attempt: 1 } );

		if ( 'sent' === forward ) {
			return true;
		}

		firstError = `forward_${ forward }`;
	} catch ( error ) {
		if ( 'AbortError' === error?.name ) {
			return false;
		}

		firstError = `${ error?.name }: ${ error?.message }`;
	}

	await new Promise( ( resolve ) => setTimeout( resolve, BEACON_RETRY_DELAY_MS ) );

	try {
		const forward = await send( { beacon_attempt: 2, beacon_first_error: firstError } );

		return 'sent' === forward;
	} catch ( error ) {
		return false;
	}
};
