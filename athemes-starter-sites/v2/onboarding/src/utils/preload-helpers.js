/**
 * Preload helpers for starter site previews.
 *
 * @package Athemes Starter Sites
 */

import { getStarterSites } from '../data/starter-sites';

/**
 * Add preconnect and DNS prefetch hints for a preview URL.
 * Optimizes iframe loading by establishing early connections to the origin.
 *
 * @param {string} previewUrl The preview URL to add hints for.
 * @param {string} dataAttr   Optional data attribute for tracking (default: 'data-atss-preconnect').
 */
export const addPreconnectHints = ( previewUrl, dataAttr = 'data-atss-preconnect' ) => {
	if ( ! previewUrl ) {
		return;
	}

	try {
		const url = new URL( previewUrl );
		const origin = url.origin;

		// Check if hints for this origin already exist
		const existingHint = document.querySelector( `link[${ dataAttr }="${ origin }"]` );
		if ( existingHint ) {
			return;
		}

		// DNS prefetch - resolves domain early
		const dnsPrefetch = document.createElement( 'link' );
		dnsPrefetch.rel = 'dns-prefetch';
		dnsPrefetch.href = origin;
		dnsPrefetch.setAttribute( dataAttr, origin );
		document.head.appendChild( dnsPrefetch );

		// Preconnect - establishes early connection (DNS + TCP + TLS)
		const preconnect = document.createElement( 'link' );
		preconnect.rel = 'preconnect';
		preconnect.href = origin;
		preconnect.setAttribute( dataAttr, origin );
		document.head.appendChild( preconnect );
	} catch ( e ) {

		// Invalid URL, skip silently
	}
};

/**
 * Remove preconnect hints for a specific origin or all hints.
 *
 * @param {string} origin     Optional origin to remove hints for. If not provided, removes all.
 * @param {string} dataAttr   Optional data attribute for tracking (default: 'data-atss-preconnect').
 */
export const removePreconnectHints = ( origin = null, dataAttr = 'data-atss-preconnect' ) => {
	let selector = `link[${ dataAttr }]`;
	if ( origin ) {
		selector = `link[${ dataAttr }="${ origin }"]`;
	}

	const links = document.querySelectorAll( selector );
	links.forEach( ( link ) => link.remove() );
};

/**
 * Add preconnect hints for an array of page URLs.
 * Used to optimize page iframe loading in the Pages step.
 *
 * @param {Array} pages Array of page objects with 'url' property.
 */
export const addPagePreconnectHints = ( pages ) => {
	if ( ! pages || ! Array.isArray( pages ) ) {
		return;
	}

	pages.forEach( ( page ) => {
		if ( page.url ) {
			addPreconnectHints( page.url, 'data-atss-page-preconnect' );
		}
	});
};

/**
 * Remove all page preconnect hints.
 */
export const removePagePreconnectHints = () => {
	removePreconnectHints( null, 'data-atss-page-preconnect' );
};
