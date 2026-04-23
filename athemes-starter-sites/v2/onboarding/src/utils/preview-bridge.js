/**
 * Preview Bridge - Handles communication with the preview iframe.
 *
 * @package Athemes Starter Sites
 */
import isBotiga from '../utils/is-botiga';

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
		this.isLocalPreview = false;
		this.messageQueue = [];
		this.debug = window.atssOnboarding?.debug || false;
		this.messageHandler = null;
		this.pendingCustomizations = null;
		this.readyReceivedWithoutIframe = false;
		this.appliedColors = [];
		this.appliedTypography = { elements: [], fontLink: null };
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

		const mergedUpdates = { ...updates };

		if ( mergedUpdates.customCss ) {
			const existingCustomCss = this.pendingCustomizations.customCss || {};

			if (
				mergedUpdates.customCss.styleId &&
				'string' === typeof mergedUpdates.customCss.css
			) {
				mergedUpdates.customCss = {
					...existingCustomCss,
					[ mergedUpdates.customCss.styleId ]: mergedUpdates.customCss,
				};
			} else {
				mergedUpdates.customCss = {
					...existingCustomCss,
					...mergedUpdates.customCss,
				};
			}
		}

		this.pendingCustomizations = {
			...this.pendingCustomizations,
			...mergedUpdates,
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

		// Local preview: apply directly to iframe DOM
		if ( this.isLocalPreview ) {
			return this.applyDirect( message );
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

		if ( isBotiga && logo.url ) {
			this.resetCustomCss( 'atss-preview-botiga-title-css' );
		}

		return this.send( {
			type: 'ATSS_LOGO_UPDATE',
			logo
		} );
	}

	/**
	 * Update logo height in the preview.
	 *
	 * @param {number} height Logo height in pixels.
	 * @return {boolean} Whether the update was sent successfully.
	 */
	updateLogoHeight( height ) {
		if ( isBotiga ) {
			this.storePendingCustomizations( {
				customCss: {
					css: `.site-branding img { width: ${ height }px !important; max-height: none !important; height: auto !important; }`,
					styleId: 'atss-preview-logo-width-css'
				}
			} );

			return this.send( {
				type: 'ATSS_CUSTOM_CSS_UPDATE',
				css: `.site-branding img { width: ${ height }px !important; max-height: none !important; height: auto !important; }`,
				styleId: 'atss-preview-logo-width-css'
			} );
		}

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
	 * @param {Object}  logo      Logo data object with url and id.
	 * @return {boolean} Whether the update was sent successfully.
	 */
	updateSiteTitle( title, showTitle, logo ) {
		const hasLogo = !! logo?.url;

		this.storePendingCustomizations( {
			title,
			showTitle
		} );

		const sent = this.send( {
			type: 'ATSS_SITE_TITLE_UPDATE',
			title,
			showTitle
		} );

		if ( ! isBotiga ) {
			return sent;
		}

		if ( ! showTitle ) {
			this.resetCustomCss( 'atss-preview-botiga-title-css' );
			return sent;
		}

		return this.updateCustomCss(
			`
			${ ! hasLogo ? '.custom-logo-link { display: none !important; }' : '' }
			.site-title, .site-description { position: relative !important; }
			${ hasLogo ? '.site-branding { gap: 0 !important; flex-direction: column !important; }' : '' }
			`,
			'atss-preview-botiga-title-css'
		);
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
	 * Update custom CSS in the preview.
	 *
	 * @param {string} css     The CSS string to inject.
	 * @param {string} styleId The ID of the style element.
	 * @return {boolean} Whether the update was sent successfully.
	 */
	updateCustomCss( css, styleId = 'atss-preview-custom-css' ) {
		if ( 'string' !== typeof css ) {
			this.log( 'error', 'Invalid CSS string', css );
			return false;
		}

		this.storePendingCustomizations( {
			customCss: {
				css,
				styleId
			}
		} );

		return this.send( {
			type: 'ATSS_CUSTOM_CSS_UPDATE',
			css,
			styleId
		} );
	}

	/**
	 * Reset custom CSS in the preview.
	 *
	 * @param {string} styleId The ID of the style element.
	 * @return {boolean} Whether the reset was sent successfully.
	 */
	resetCustomCss( styleId = 'atss-preview-custom-css' ) {
		if ( this.pendingCustomizations?.customCss?.[ styleId ] ) {
			delete this.pendingCustomizations.customCss[ styleId ];

			if ( 0 === Object.keys( this.pendingCustomizations.customCss ).length ) {
				delete this.pendingCustomizations.customCss;
			}

			if ( 0 === Object.keys( this.pendingCustomizations ).length ) {
				this.pendingCustomizations = null;
			}
		}

		return this.send( {
			type: 'ATSS_CUSTOM_CSS_RESET',
			styleId
		} );
	}

	/**
	 * Send batch updates to the preview.
	 *
	 * @param {Object} updates Object containing multiple update types.
	 * @return {boolean} Whether the update was sent successfully.
	 */
	batchUpdate( updates ) {
		const sentBatch = this.send( {
			type: 'ATSS_BATCH_UPDATE',
			updates: {
				...updates,
				customCss: undefined,
			}
		} );

		if ( updates?.customCss ) {
			Object.values( updates.customCss ).forEach( ( cssEntry ) => {
				this.send( {
					type: 'ATSS_CUSTOM_CSS_UPDATE',
					css: cssEntry.css,
					styleId: cssEntry.styleId
				} );
			} );
		}

		return sentBatch;
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
	 * Set whether this is a local (same-origin) preview.
	 * When true, changes are applied directly to the iframe DOM instead of using postMessage.
	 *
	 * @param {boolean} isLocal Whether the preview is local.
	 */
	setLocalPreview( isLocal ) {
		this.isLocalPreview = isLocal;
		this.log( 'info', `Local preview mode: ${ isLocal }` );
	}

	/**
	 * Get the iframe's document for direct DOM manipulation.
	 *
	 * @return {Document|null} The iframe document, or null if not accessible.
	 */
	getIframeDoc() {
		try {
			return this.iframe?.contentDocument || this.iframe?.contentWindow?.document || null;
		} catch ( e ) {
			return null;
		}
	}

	/**
	 * Apply a message directly to the iframe DOM (same-origin only).
	 *
	 * @param {Object} message The message to apply.
	 * @return {boolean} Whether the message was applied.
	 */
	applyDirect( message ) {
		const doc = this.getIframeDoc();
		if ( ! doc ) {
			this.log( 'error', 'Cannot access iframe document for direct apply', message );
			return false;
		}

		switch ( message.type ) {
		case 'ATSS_COLOR_UPDATE':
			this.directUpdateColors( doc, message.colors );
			break;
		case 'ATSS_COLOR_RESET':
			this.directResetColors( doc );
			break;
		case 'ATSS_LOGO_UPDATE':
			this.directUpdateLogo( doc, message.logo );
			break;
		case 'ATSS_LOGO_HEIGHT_UPDATE':
			this.directUpdateLogoHeight( doc, message.height );
			break;
		case 'ATSS_SITE_TITLE_UPDATE':
			this.directUpdateSiteTitle( doc, message.title, message.showTitle );
			break;
		case 'ATSS_TYPOGRAPHY_UPDATE':
			this.directUpdateTypography( doc, message.typography );
			break;
		case 'ATSS_TYPOGRAPHY_RESET':
			this.directResetTypography( doc );
			break;
		case 'ATSS_CUSTOM_CSS_UPDATE':
			this.directUpdateCustomCss( doc, message.css, message.styleId );
			break;
		case 'ATSS_CUSTOM_CSS_RESET':
			this.directResetCustomCss( doc, message.styleId );
			break;
		case 'ATSS_BATCH_UPDATE':
			if ( message.updates ) {
				const u = message.updates;
				if ( u.colors ) {
					this.directUpdateColors( doc, u.colors );
				}
				if ( u.logo ) {
					this.directUpdateLogo( doc, u.logo );
				}
				if ( undefined !== u.logoHeight ) {
					this.directUpdateLogoHeight( doc, u.logoHeight );
				}
				if ( undefined !== u.title ) {
					this.directUpdateSiteTitle( doc, u.title, u.showTitle );
				}
				if ( u.typography ) {
					this.directUpdateTypography( doc, u.typography );
				}
				if ( u.customCss ) {
					Object.values( u.customCss ).forEach( ( cssEntry ) => {
						this.directUpdateCustomCss( doc, cssEntry.css, cssEntry.styleId );
					} );
				}
			}
			break;
		default:
			return false;
		}

		this.log( 'info', 'Direct DOM apply', message.type );
		return true;
	}

	/**
	 * Apply color CSS custom properties directly.
	 */
	directUpdateColors( doc, colors ) {
		if ( ! colors || 'object' !== typeof colors ) {
			return;
		}
		const root = doc.documentElement;
		for ( const [ property, value ] of Object.entries( colors ) ) {
			const cleanValue = 'string' === typeof value ? value.replace( /^['"]|['"]$/g, '' ) : value;
			if ( property.startsWith( '--' ) ) {
				root.style.setProperty( property, cleanValue );
				if ( ! this.appliedColors.includes( property ) ) {
					this.appliedColors.push( property );
				}
			}
		}
	}

	/**
	 * Reset applied color CSS custom properties.
	 */
	directResetColors( doc ) {
		const root = doc.documentElement;
		for ( const property of this.appliedColors ) {
			root.style.removeProperty( property );
		}
		this.appliedColors = [];
	}

	/**
	 * Update logo directly in the iframe DOM.
	 */
	directUpdateLogo( doc, logo ) {
		const logoHeight = undefined !== logo?.height ? logo.height : 80;
		const branding = doc.querySelector( '.site-branding' );

		if ( ! logo || ! logo.url ) {
			// Remove logo link if we inserted one
			const insertedLink = branding?.querySelector( '.atss-preview-logo' );
			if ( insertedLink ) {
				insertedLink.remove();
			}
			// Also clear any existing logo images
			const imgs = branding?.querySelectorAll( '.site-logo, .custom-logo' );
			if ( imgs ) {
				imgs.forEach( ( img ) => img.remove() );
			}
			if ( branding ) {
				branding.style.display = '';
				branding.style.gap = '';
				branding.style.alignItems = '';
			}
			return;
		}

		// Try to update existing logo images first
		const existingLogos = branding?.querySelectorAll( '.site-logo, .custom-logo' );
		if ( existingLogos && existingLogos.length > 0 ) {
			existingLogos.forEach( ( img ) => {
				img.src = logo.url;
				img.style.maxHeight = logoHeight + 'px';
			} );
		} else if ( branding ) {
			// Check if we already inserted a preview logo
			let previewLink = branding.querySelector( '.atss-preview-logo' );
			if ( previewLink ) {
				const img = previewLink.querySelector( 'img' );
				if ( img ) {
					img.src = logo.url;
					img.style.maxHeight = logoHeight + 'px';
				}
			} else {
				// Create <a><img></a> matching Sydney's logo structure
				previewLink = doc.createElement( 'a' );
				previewLink.className = 'desktop-logo-link atss-preview-logo';
				previewLink.href = window.atssOnboarding?.homeUrl || '/';
				const img = doc.createElement( 'img' );
				img.className = 'site-logo';
				img.src = logo.url;
				img.style.maxHeight = logoHeight + 'px';
				previewLink.appendChild( img );
				branding.insertBefore( previewLink, branding.firstChild );
				branding.style.display = 'flex';
				branding.style.gap = '15px';
				branding.style.alignItems = 'center';
			}
		}
	}

	/**
	 * Update logo height directly in the iframe DOM.
	 */
	directUpdateLogoHeight( doc, height ) {
		const logoHeight = ( undefined !== height && null !== height && 'number' === typeof height ) ? height : 80;
		const logos = doc.querySelectorAll( '.site-branding .site-logo, .site-branding .custom-logo' );
		logos.forEach( ( img ) => {
			img.style.maxHeight = logoHeight + 'px';
		} );
	}

	/**
	 * Update site title directly in the iframe DOM.
	 */
	directUpdateSiteTitle( doc, title, showTitle ) {
		const show = undefined !== showTitle ? showTitle : true;
		const elements = doc.querySelectorAll( '.site-title' );
		elements.forEach( ( el ) => {
			if ( undefined !== title ) {
				let anchor = el.querySelector( 'a' );
				if ( 'A' === el.tagName ) {
					el.textContent = title;
				} else if ( anchor ) {
					anchor.textContent = title;
				} else {
					el.innerHTML = '';
					anchor = doc.createElement( 'a' );
					anchor.textContent = title;
					anchor.href = window.atssOnboarding?.homeUrl || '/';
					el.appendChild( anchor );
				}
			}
			el.style.display = show ? '' : 'none';
		} );
	}

	/**
	 * Update typography directly in the iframe DOM.
	 */
	directUpdateTypography( doc, typography ) {
		if ( ! typography || 'object' !== typeof typography ) {
			return;
		}

		// Load or remove Google Fonts
		if ( typography.googleFontsUrl && '' !== typography.googleFontsUrl.trim() ) {
			if ( this.appliedTypography.fontLink && this.appliedTypography.fontLink.parentNode ) {
				this.appliedTypography.fontLink.parentNode.removeChild( this.appliedTypography.fontLink );
			}
			const link = doc.createElement( 'link' );
			link.rel = 'stylesheet';
			link.href = typography.googleFontsUrl;
			link.id = 'atss-preview-typography-fonts';
			doc.head.appendChild( link );
			this.appliedTypography.fontLink = link;
		} else if ( this.appliedTypography.fontLink && this.appliedTypography.fontLink.parentNode ) {
			this.appliedTypography.fontLink.parentNode.removeChild( this.appliedTypography.fontLink );
			this.appliedTypography.fontLink = null;
		}

		// Apply heading font
		if ( typography.headingFont?.family ) {
			const headings = doc.querySelectorAll( 'h1, h2, h3, h4, h5, h6, .site-title' );
			headings.forEach( ( el ) => {
				if ( ! el.dataset.originalFontFamily ) {
					el.dataset.originalFontFamily = doc.defaultView.getComputedStyle( el ).fontFamily;
				}
				el.style.fontFamily = typography.headingFont.family;
				if ( ! this.appliedTypography.elements.includes( el ) ) {
					this.appliedTypography.elements.push( el );
				}
			} );
		}

		// Apply body font
		if ( typography.bodyFont?.family ) {
			const body = doc.body;
			if ( body ) {
				if ( ! body.dataset.originalFontFamily ) {
					body.dataset.originalFontFamily = doc.defaultView.getComputedStyle( body ).fontFamily;
				}
				body.style.fontFamily = typography.bodyFont.family;
				if ( ! this.appliedTypography.elements.includes( body ) ) {
					this.appliedTypography.elements.push( body );
				}
			}
		}
	}

	/**
	 * Reset typography directly in the iframe DOM.
	 */
	directResetTypography( doc ) {
		for ( const el of this.appliedTypography.elements ) {
			if ( el.dataset.originalFontFamily ) {
				el.style.fontFamily = el.dataset.originalFontFamily;
				delete el.dataset.originalFontFamily;
			} else {
				el.style.fontFamily = '';
			}
		}
		if ( this.appliedTypography.fontLink && this.appliedTypography.fontLink.parentNode ) {
			this.appliedTypography.fontLink.parentNode.removeChild( this.appliedTypography.fontLink );
		}
		this.appliedTypography = { elements: [], fontLink: null };
	}

	/**
	 * Update custom CSS directly in the iframe DOM.
	 *
	 * @param {Document} doc     The iframe document.
	 * @param {string}   css     The CSS string to inject.
	 * @param {string}   styleId The ID of the style element.
	 */
	directUpdateCustomCss( doc, css, styleId = 'atss-preview-custom-css' ) {
		if ( 'string' !== typeof css ) {
			return;
		}

		let styleEl = doc.getElementById( styleId );

		if ( ! styleEl ) {
			styleEl = doc.createElement( 'style' );
			styleEl.id = styleId;
			doc.head.appendChild( styleEl );
		}

		styleEl.textContent = css;
	}

	/**
	 * Reset custom CSS directly in the iframe DOM.
	 *
	 * @param {Document} doc     The iframe document.
	 * @param {string}   styleId The ID of the style element.
	 */
	directResetCustomCss( doc, styleId = 'atss-preview-custom-css' ) {
		const styleEl = doc.getElementById( styleId );

		if ( styleEl ) {
			styleEl.remove();
		}
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
