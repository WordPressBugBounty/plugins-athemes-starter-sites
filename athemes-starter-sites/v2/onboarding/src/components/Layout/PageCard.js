/**
 * PageCard component for displaying individual pages in the Pages step.
 *
 * @package Athemes Starter Sites
 */

import { useState, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { search } from '@wordpress/icons';
import { Spinner } from './index';

/**
 * PageCard component.
 *
 * @param {Object}   props           Component props.
 * @param {string}   props.id        Page ID.
 * @param {string}   props.title     Page title/name.
 * @param {string}   props.url       Preview URL for iframe.
 * @param {string}   props.thumbnail Fallback thumbnail image (optional).
 * @param {boolean}  props.isSelected Whether this page is selected.
 * @param {Function} props.onToggle  Callback when checkbox is toggled.
 * @param {Function} props.onClick   Callback when card is clicked (for preview).
 * @return {JSX.Element} PageCard component.
 */
function PageCard( { id, title, url, thumbnail, isSelected = false, onToggle, onClick } ) {
	const [ hasIframeError, setHasIframeError ] = useState( false );
	const [ isIframeLoading, setIsIframeLoading ] = useState( true );

	// Process URL for front page/home - remove page_id query parameter and add atss_preview=1
	const processedUrl = useMemo( () => {
		if ( ! url ) {
			return url;
		}

		let processedUrl = url;
		const normalizedTitle = title?.toLowerCase().trim();
		if ( normalizedTitle === 'my front page' || normalizedTitle === 'home' ) {
			processedUrl = url.replace( /\?page_id=\d+/, '' );
		}

		// Add atss_preview=1 parameter
		processedUrl = `${ processedUrl }${ processedUrl.includes( '?' ) ? '&' : '?' }atss_preview=1`;

		return processedUrl;
	}, [ url, title ] );

	// Handle iframe load
	const handleIframeLoad = () => {
		setIsIframeLoading( false );
	};

	// Handle iframe load error
	const handleIframeError = () => {
		setHasIframeError( true );
		setIsIframeLoading( false );
	};

	// Handle checkbox toggle
	const handleToggle = ( e ) => {
		e.stopPropagation();
		if ( onToggle ) {
			onToggle( id );
		}
	};

	// Handle card click
	const handleCardClick = () => {
		if ( onClick ) {
			onClick();
		}
	};

	// Only show the thumbnail if the iframe is not loading (missing preview or error)
	const shouldShowThumbnail = ! processedUrl || hasIframeError;

	return (
		<div
			className={ `atss-page-card ${ isSelected ? 'atss-page-card--selected' : '' }` }
			onClick={ handleCardClick }
			style={ { cursor: onClick ? 'pointer' : 'default' } }
		>
			<div className="atss-page-card__preview">
				{ /* Loading spinner */ }
				{ processedUrl && ! hasIframeError && isIframeLoading && (
					<div className="atss-page-card__loading">
						<Spinner />
					</div>
				) }

				{ /* Iframe - shown if preview URL exists and no error */ }
				{ processedUrl && ! hasIframeError && (
					<iframe
						src={ processedUrl }
						className="atss-page-card__iframe"
						title={ title }
						onLoad={ handleIframeLoad }
						onError={ handleIframeError }
						sandbox="allow-scripts allow-same-origin"
						loading="lazy"
						style={ { opacity: isIframeLoading ? 0 : 1 } }
					/>
				) }

				{ /* Thumbnail - shown if iframe is missing or has error */ }
				{ shouldShowThumbnail && thumbnail && (
					<img
						src={ thumbnail }
						alt={ title }
						className="atss-page-card__thumbnail"
						loading="lazy"
					/>
				) }

				{ /* Dark overlay on hover */ }
				<div className="atss-page-card__dark-overlay"></div>

				{ /* Hover overlay with magnifying glass */ }
				<div className="atss-page-card__hover-overlay">
					<Icon icon={ search } />
				</div>

				{ /* Checkbox overlay */ }
				<button
					type="button"
					className={ `atss-page-card__checkbox ${ isSelected ? 'atss-page-card__checkbox--checked' : '' }` }
					onClick={ handleToggle }
					aria-checked={ isSelected }
					aria-label={ isSelected ? __( 'Deselect page', 'athemes-starter-sites' ) : __( 'Select page', 'athemes-starter-sites' ) }
				>
					{ isSelected && (
						<svg
							width="12"
							height="10"
							viewBox="0 0 12 10"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="atss-page-card__checkmark"
						>
							<path
								d="M1 5L4.5 8.5L11 1"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					) }
				</button>
			</div>

			<div className="atss-page-card__info">
				<span className="atss-page-card__title text-xs">
					{ title || __( 'Untitled Page', 'athemes-starter-sites' ) }
				</span>
			</div>
		</div>
	);
}

export default PageCard;
