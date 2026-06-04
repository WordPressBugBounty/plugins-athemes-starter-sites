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
];

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

		sanitizedMetadata[ key ] = metadata[ key ];

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
