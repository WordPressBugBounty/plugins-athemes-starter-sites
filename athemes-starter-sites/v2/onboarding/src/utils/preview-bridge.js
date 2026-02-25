/**
 * Preview Bridge - Handles communication with the preview iframe.
 *
 * @package Athemes Starter Sites
 */

/**
 * PreviewBridge class manages all postMessage communication with preview iframe.
 */
class PreviewBridge {

	/**
	 * Constructor.
	 *
	 * @param {string} iframeId The ID of the iframe element.
	 */
	constructor( iframeId = 'demo-preview' ) {
		this.iframeId = iframeId;
		this.iframe = null;
		this.isReady = false;
		this.messageQueue = [];
		this.debug = window.atssOnboarding?.debug || false;
		this.messageHandler = null;
		this.pendingCustomizations = null;
		this.readyReceivedWithoutIframe = false;
	}

	/**
	 * Initialize the bridge with an iframe element.
	 *
	 * @param {HTMLIFrameElement} iframe The iframe element.
	 */
	init( iframe ) {
		this.log( 'info', 'init() called with iframe:', iframe ? ( iframe.id || 'unnamed' ) : 'null' );

		// If called with null, just set up the message handler but don't update iframe ref
		if ( ! iframe ) {

			// Only set up message handler if not already set
			if ( ! this.messageHandler ) {
				this.setupMessageHandler();
			}
			return;
		}

		// Skip if same iframe (avoid re-initialization)
		if ( this.iframe === iframe ) {
			this.log( 'info', 'init() called with same iframe, skipping' );
			return;
		}

		// Check if we previously received PREVIEW_READY but had no iframe to send to
		const hadPendingReady = this.readyReceivedWithoutIframe;

		this.log( 'info', 'Initializing bridge with new iframe' );
		this.iframe = iframe;
		this.readyReceivedWithoutIframe = false;

		// Set up message handler if not already set
		if ( ! this.messageHandler ) {
			this.setupMessageHandler();
		}

		// If we had received PREVIEW_READY but couldn't send (no iframe), send now
		if ( hadPendingReady && this.pendingCustomizations ) {
			this.log( 'info', 'Had pending ready state, applying customizations now' );
			this.isReady = true;
			this.batchUpdate( this.pendingCustomizations );
		}
	}

	/**
	 * Set up the message handler for PREVIEW_READY signals.
	 */
	setupMessageHandler() {

		// Remove previous handler if exists
		if ( this.messageHandler ) {
			window.removeEventListener( 'message', this.messageHandler );
		}

		// Create bound message handler
		this.messageHandler = ( event ) => {
			if ( 'ATSS_PREVIEW_READY' === event.data?.type ) {
				this.log( 'info', 'Received ATSS_PREVIEW_READY signal' );
				this.isReady = true;

				// If we don't have an iframe reference yet, remember that ready was received
				if ( ! this.iframe ) {
					this.log( 'info', 'No iframe reference yet, marking readyReceivedWithoutIframe' );
					this.readyReceivedWithoutIframe = true;
					return;
				}

				this.flushMessageQueue();

				// Apply pending customizations if any
				if ( this.pendingCustomizations ) {
					this.log( 'info', 'Applying pending customizations' );
					this.batchUpdate( this.pendingCustomizations );
				}
			}
		};

		// Listen for iframe ready message
		window.addEventListener( 'message', this.messageHandler );
		this.log( 'info', 'Message handler set up' );
	}

	/**
	 * Reset the ready state when iframe navigates to a new page.
	 * Call this before the iframe src changes.
	 */
	resetReadyState() {
		this.isReady = false;
		this.messageQueue = [];
		this.readyReceivedWithoutIframe = false;
		this.log( 'info', 'Ready state reset for new page load' );
	}

	/**
	 * Set pending customizations to be applied when iframe becomes ready.
	 *
	 * @param {Object} customizations The customizations to apply.
	 */
	setPendingCustomizations( customizations ) {
		this.pendingCustomizations = customizations;
		this.log( 'info', 'Pending customizations set', customizations );
	}

	/**
	 * Clear pending customizations.
	 */
	clearPendingCustomizations() {
		this.pendingCustomizations = null;
	}

	/**
	 * Store customizations to be re-applied when iframe navigates.
	 *
	 * @param {Object} updates Partial customization updates to merge.
	 */
	storePendingCustomizations( updates ) {
		if ( ! updates || 'object' !== typeof updates ) {
			return;
		}

		if ( ! this.pendingCustomizations ) {
			this.pendingCustomizations = {};
		}

		this.pendingCustomizations = {
			...this.pendingCustomizations,
			...updates
		};
	}

	/**
	 * Send a message to the iframe.
	 *
	 * @param {Object} message The message object to send.
	 * @return {boolean} Whether the message was sent successfully.
	 */
	send( message ) {
		if ( ! this.iframe?.contentWindow ) {
			this.log( 'error', 'Iframe not available', message );
			return false;
		}

		// If iframe is not ready, queue the message
		if ( ! this.isReady ) {
			this.messageQueue.push( message );
			this.log( 'info', 'Message queued (iframe not ready)', message );
			return false;
		}

		try {
			this.iframe.contentWindow.postMessage( message, '*' );
			this.log( 'info', 'Message sent', message );
			return true;
		} catch ( error ) {
			this.log( 'error', 'Failed to send message', { message, error });
			return false;
		}
	}

	/**
	 * Flush queued messages.
	 */
	flushMessageQueue() {
		if ( 0 === this.messageQueue.length ) {
			return;
		}

		this.log( 'info', `Flushing ${ this.messageQueue.length } queued messages` );

		while ( 0 < this.messageQueue.length ) {
			const message = this.messageQueue.shift();
			this.send( message );
		}
	}

	/**
	 * Update colors in the preview.
	 *
	 * @param {Object} colors Object with CSS variable names as keys and color values.
	 * @return {boolean} Whether the update was sent successfully.
	 */
	updateColors( colors ) {
		if ( ! colors || 'object' !== typeof colors ) {
			this.log( 'error', 'Invalid colors object', colors );
			return false;
		}

		// Store colors to re-apply on page navigation
		this.storePendingCustomizations( { colors } );

		return this.send({
			type: 'ATSS_COLOR_UPDATE',
			colors
		});
	}

	/**
	 * Reset colors in the preview to their original values.
	 *
	 * @return {boolean} Whether the reset was sent successfully.
	 */
	resetColors() {
		return this.send({
			type: 'ATSS_COLOR_RESET'
		});
	}

	/**
	 * Update logo in the preview.
	 *
	 * @param {Object} logo Logo data object with url and id.
	 * @return {boolean} Whether the update was sent successfully.
	 */
	updateLogo( logo ) {
		if ( ! logo ) {
			this.log( 'error', 'Invalid logo object', logo );
			return false;
		}

		// Store logo to re-apply on page navigation
		this.storePendingCustomizations( { logo } );

		return this.send({
			type: 'ATSS_LOGO_UPDATE',
			logo
		});
	}

	/**
	 * Update logo height in the preview.
	 *
	 * @param {number} height Logo height in pixels.
	 * @return {boolean} Whether the update was sent successfully.
	 */
	updateLogoHeight( height ) {
		// Store logo height to re-apply on page navigation
		this.storePendingCustomizations( { logoHeight: height } );

		return this.send({
			type: 'ATSS_LOGO_HEIGHT_UPDATE',
			height
		});
	}

	/**
	 * Update site title in the preview.
	 *
	 * @param {string}  title     The site title.
	 * @param {boolean} showTitle Whether to show the title.
	 * @return {boolean} Whether the update was sent successfully.
	 */
	updateSiteTitle( title, showTitle ) {
		// Store site title to re-apply on page navigation
		this.storePendingCustomizations( {
			title,
			showTitle
		} );

		return this.send({
			type: 'ATSS_SITE_TITLE_UPDATE',
			title,
			showTitle
		});
	}

	/**
	 * Update typography in the preview.
	 *
	 * @param {Object} typography Typography data object.
	 * @return {boolean} Whether the update was sent successfully.
	 */
	updateTypography( typography ) {
		if ( ! typography || 'object' !== typeof typography ) {
			this.log( 'error', 'Invalid typography object', typography );
			return false;
		}

		// Store typography to re-apply on page navigation
		this.storePendingCustomizations( { typography } );

		return this.send({
			type: 'ATSS_TYPOGRAPHY_UPDATE',
			typography
		});
	}

	/**
	 * Reset typography in the preview to their original values.
	 *
	 * @return {boolean} Whether the reset was sent successfully.
	 */
	resetTypography() {
		return this.send({
			type: 'ATSS_TYPOGRAPHY_RESET'
		});
	}

	/**
	 * Send batch updates to the preview.
	 *
	 * @param {Object} updates Object containing multiple update types.
	 * @return {boolean} Whether the update was sent successfully.
	 */
	batchUpdate( updates ) {
		return this.send({
			type: 'ATSS_BATCH_UPDATE',
			updates
		});
	}

	/**
	 * Mark iframe as ready (for testing or manual control).
	 */
	markReady() {
		this.isReady = true;
		this.flushMessageQueue();
	}

	/**
	 * Log messages if debug mode is enabled.
	 *
	 * @param {string} level   Log level (info, warn, error).
	 * @param {string} message Log message.
	 * @param {*}      data    Additional data to log.
	 */
	log( level, message, data ) {
		if ( ! this.debug ) {
			return;
		}

		const prefix = '[PreviewBridge]';
		/* eslint-disable no-console */
		switch ( level ) {
		case 'error':
			console.error( prefix, message, data );
			break;
		case 'warn':
			console.warn( prefix, message, data );
			break;
		default:
			console.log( prefix, message, data );
		}
		/* eslint-enable no-console */
	}

	/**
	 * Destroy the bridge and clean up.
	 */
	destroy() {
		if ( this.messageHandler ) {
			window.removeEventListener( 'message', this.messageHandler );
			this.messageHandler = null;
		}
		this.iframe = null;
		this.isReady = false;
		this.messageQueue = [];
		this.pendingCustomizations = null;
		this.readyReceivedWithoutIframe = false;
	}
}

// Create a singleton instance
const previewBridge = new PreviewBridge();

export default previewBridge;

