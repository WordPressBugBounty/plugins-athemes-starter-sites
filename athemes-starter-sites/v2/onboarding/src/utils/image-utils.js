/**
 * Image utilities - Handle image conversion for preview sync.
 *
 * @package Athemes Starter Sites
 */

/**
 * Check if a URL is from a local/development environment.
 *
 * @param {string} url The URL to check.
 * @return {boolean} True if the URL is local.
 */
export const isLocalUrl = ( url ) => {
	if ( ! url ) {
		return false;
	}

	try {
		const urlObj = new URL( url );
		const hostname = urlObj.hostname.toLowerCase();

		// Check for localhost
		if ( hostname === 'localhost' ) {
			return true;
		}

		// Check for .local domains
		if ( hostname.endsWith( '.local' ) ) {
			return true;
		}

		// Check for .test domains
		if ( hostname.endsWith( '.test' ) ) {
			return true;
		}

		// Check for IP addresses (127.x.x.x, 192.168.x.x, 10.x.x.x, 172.16-31.x.x)
		const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
		if ( ipv4Regex.test( hostname ) ) {
			const parts = hostname.split( '.' ).map( Number );
			// 127.x.x.x (loopback)
			if ( parts[ 0 ] === 127 ) {
				return true;
			}
			// 192.168.x.x (private)
			if ( parts[ 0 ] === 192 && parts[ 1 ] === 168 ) {
				return true;
			}
			// 10.x.x.x (private)
			if ( parts[ 0 ] === 10 ) {
				return true;
			}
			// 172.16.x.x - 172.31.x.x (private)
			if ( parts[ 0 ] === 172 && parts[ 1 ] >= 16 && parts[ 1 ] <= 31 ) {
				return true;
			}
		}

		// Check for IPv6 localhost
		if ( hostname === '::1' || hostname === '[::1]' ) {
			return true;
		}

		return false;
	} catch ( e ) {
		// If URL parsing fails, assume it's not local
		return false;
	}
};

/**
 * Convert an image URL to a data URL.
 *
 * @param {string} imageUrl The image URL to convert.
 * @return {Promise<string>} Promise that resolves to a data URL.
 */
export const imageUrlToDataUrl = ( imageUrl ) => {
	return new Promise( ( resolve, reject ) => {
		const img = new Image();

		// Set crossOrigin to anonymous to allow CORS
		img.crossOrigin = 'anonymous';

		img.onload = () => {
			try {
				const canvas = document.createElement( 'canvas' );
				canvas.width = img.naturalWidth;
				canvas.height = img.naturalHeight;

				const ctx = canvas.getContext( '2d' );
				ctx.drawImage( img, 0, 0 );

				// Convert to data URL
				const dataUrl = canvas.toDataURL( 'image/png' );
				resolve( dataUrl );
			} catch ( error ) {
				reject( error );
			}
		};

		img.onerror = () => {
			reject( new Error( 'Failed to load image' ) );
		};

		img.src = imageUrl;
	} );
};

/**
 * Convert a logo object to preview-safe format.
 * If the logo URL is local, converts it to a data URL to avoid CORS issues.
 *
 * @param {Object} logo Logo object with url and id properties.
 * @return {Promise<Object>} Promise that resolves to a logo object safe for preview.
 */
export const convertLogoForPreview = async ( logo ) => {
	if ( ! logo || ! logo.url ) {
		return logo;
	}

	// If the logo URL is not local, return as-is
	if ( ! isLocalUrl( logo.url ) ) {
		return logo;
	}

	try {
		// Convert local image to data URL
		const dataUrl = await imageUrlToDataUrl( logo.url );
		return {
			...logo,
			url: dataUrl,
			originalUrl: logo.url, // Keep original URL for reference
		};
	} catch ( error ) {
		// If conversion fails, return original logo
		// The preview will fail to load, but the logo will still be imported correctly
		// eslint-disable-next-line no-console
		console.warn( '[Image Utils] Failed to convert logo to data URL:', error );
		return logo;
	}
};
