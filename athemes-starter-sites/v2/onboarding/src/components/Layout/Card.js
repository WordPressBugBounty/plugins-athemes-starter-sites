/**
 * Card component for displaying starter site templates.
 *
 * @package Athemes Starter Sites
 */

import { useState, useRef, useCallback, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { getPreviewImageUrl } from '../../utils/helpers';

/**
 * Card component.
 *
 * @param {Object}   props             Component props.
 * @param {string}   props.id          Demo ID.
 * @param {string}   props.name        Demo name.
 * @param {string}   props.thumbnail   Thumbnail image URL.
 * @param {string}   props.preview     Preview URL (unused with image preview).
 * @param {string}   props.type        Type: 'free' or 'pro'.
 * @param {Function} props.onSelect    Callback when card is clicked.
 * @param {boolean}  props.isPreloaded Whether this card was preloaded.
 * @return {JSX.Element} Card component.
 */
function Card( { id, name, thumbnail, preview, type, onSelect, isPreloaded = false } ) {
	const [ isHovered, setIsHovered ] = useState( false );
	const [ isScrolling, setIsScrolling ] = useState( false );
	const imgRef = useRef( null );
	const previewRef = useRef( null );

	// Calculate scroll distance and duration when image loads
	const handleImageLoad = () => {
		if ( imgRef.current && previewRef.current ) {
			const displayedHeight = imgRef.current.offsetHeight;
			const containerHeight = previewRef.current.offsetHeight;
			const scrollDistance = displayedHeight - containerHeight;

			// Define scroll speeds in pixels per second
			const SCROLL_DOWN_SPEED = 200; // px/s - slower scroll down
			const SCROLL_UP_SPEED = 800;   // px/s - faster scroll back up

			// Calculate durations based on distance and speed
			const scrollDownDuration = scrollDistance / SCROLL_DOWN_SPEED;
			const scrollUpDuration = scrollDistance / SCROLL_UP_SPEED;

			// Set CSS variables with the calculated values
			previewRef.current.style.setProperty( '--scroll-distance', `-${ scrollDistance }px` );
			previewRef.current.style.setProperty( '--scroll-down-duration', `${ scrollDownDuration }s` );
			previewRef.current.style.setProperty( '--scroll-up-duration', `${ scrollUpDuration }s` );
		}
	};

	// Build preview image URL dynamically if thumbnail not provided
	const PREVIEW_IMAGE_URL = useMemo( () => {
		const themeName = window?.atssOnboarding?.themeName || 'sydney';
		return getPreviewImageUrl( id, themeName );
	}, [ id ] );

	// Handle card click
	const handleCardClick = useCallback( () => {
		if ( onSelect ) {
			onSelect( id );
		}
	}, [ onSelect, id ] );

	// Handle mouse enter
	const handleMouseEnter = useCallback( () => {
		setIsHovered( true );
		setIsScrolling( true );
	}, [] );

	// Handle mouse leave
	const handleMouseLeave = useCallback( () => {
		setIsHovered( false );
		setIsScrolling( false );
	}, [] );

	// Handle keyboard navigation
	const handleKeyDown = useCallback( ( e ) => {
		if ( e.key === 'Enter' || e.key === ' ' ) {
			e.preventDefault();
			handleCardClick();
		}
	}, [ handleCardClick ] );

	// Determine badge text and type
	const badgeText = type === 'pro' ? __( 'Pro', 'athemes-starter-sites' ) : __( 'Free', 'athemes-starter-sites' );
	const badgeClass = type === 'pro' ? 'atss-starter-card__badge--pro' : 'atss-starter-card__badge--free';

	return (
		<div
			className="atss-starter-card"
			onMouseEnter={ handleMouseEnter }
			onMouseLeave={ handleMouseLeave }
			onClick={ handleCardClick }
			role="button"
			tabIndex={ 0 }
			onKeyDown={ handleKeyDown }
		>
			<div className="atss-starter-card__preview" ref={ previewRef }>
				{ /* Preview image */ }
				<img
					ref={ imgRef }
					src={ PREVIEW_IMAGE_URL }
					alt={ name }
					className={ `atss-starter-card__thumbnail ${
						isScrolling ? 'atss-starter-card__thumbnail--scrolling' : ''
					}` }
					onLoad={ handleImageLoad }
					loading="lazy"
				/>
			</div>

			<div className="atss-starter-card__info flex items-center justify-between">
				<span className="atss-starter-card__name font-medium text-md">
					{ name || __( 'Unnamed Demo', 'athemes-starter-sites' ) }
				</span>
				<span className={ `atss-starter-card__badge ${ badgeClass } text-xs` }>
					{ badgeText }
				</span>
			</div>
		</div>
	);
}

export default Card;

