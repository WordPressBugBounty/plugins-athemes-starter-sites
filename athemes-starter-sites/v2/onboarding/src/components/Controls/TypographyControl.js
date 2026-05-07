/**
 * Typography Control component.
 *
 * @package Athemes Starter Sites
 */

import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon, Tooltip } from '@wordpress/components';
import { rotateLeft } from '@wordpress/icons';
import previewBridge from '../../utils/preview-bridge';

/**
 * Returns the font names for a given typography pair.
 *
 * @param {Object} pair The typography pair object.
 * @return {string} The font names string.
 */
const getFontNames = ( pair ) => {
	if ( ! pair || pair.id === 'system' ) {
		return __( 'Default', 'athemes-starter-sites' );
	}

	const heading = pair.headingFont?.family || '';
	const body = pair.bodyFont?.family || '';

	if ( ! heading && ! body ) {
		return __( 'Default', 'athemes-starter-sites' );
	}

	if ( heading && body && heading !== body ) {
		return `${ heading } & ${ body }`;
	}

	return heading || body;
};

/**
 * Typography Control component.
 *
 * @param {Object}   props               Component props.
 * @param {string}   props.label         Label for the control.
 * @param {Array}    props.typographyPairs Array of typography pair objects.
 * @param {string}   props.value         Currently selected typography pair ID.
 * @param {Function} props.onChange      Callback when selection changes.
 * @return {JSX.Element} TypographyControl component.
 */
function TypographyControl( { label, typographyPairs = [], value, onChange } ) {
	const linkRef = useRef( null );

	const selectedPair = typographyPairs.find( ( pair ) => pair.id === value );
	const fontNames = selectedPair?.label || __( 'Default', 'athemes-starter-sites' );

	/**
	 * Load Google Fonts when component mounts.
	 */
	useEffect( () => {
		// Combine all Google Fonts URLs into a single request
		const fontFamilies = typographyPairs
			.filter( ( pair ) => pair.googleFontsUrl ) // Skip pairs without Google Fonts URLs (e.g., system fonts)
			.map( ( pair ) => {
				// Extract font families and weights from the URL
				const url = new URL( pair.googleFontsUrl );
				return url.searchParams.get( 'family' );
			} )
			.filter( Boolean );

		// Only create link if there are Google Fonts to load
		if ( fontFamilies.length > 0 ) {
			const link = document.createElement( 'link' );
			link.rel = 'stylesheet';
			link.id = 'atss-typography-control-fonts';

			// Create combined Google Fonts URL
			const combinedUrl = `https://fonts.googleapis.com/css2?${ fontFamilies.map( f => `family=${ f }` ).join( '&' ) }&display=swap`;
			link.href = combinedUrl;

			// Append to head
			document.head.appendChild( link );
			linkRef.current = link;
		}

		// Cleanup on unmount
		return () => {
			if ( linkRef.current && linkRef.current.parentNode ) {
				linkRef.current.parentNode.removeChild( linkRef.current );
			}
		};
	}, [ typographyPairs ] );

	/**
	 * Handle typography pair selection.
	 *
	 * @param {string} pairId The ID of the selected typography pair.
	 */
	const handleSelect = ( pairId ) => {
		if ( onChange ) {
			onChange( pairId );
		}
	};

	/**
	 * Handle reset action.
	 */
	const handleReset = () => {
		if ( onChange ) {
			onChange( '' );
		}
		// Reset typography in the preview iframe
		previewBridge.resetTypography();
	};

	return (
		<div className="atss-control atss-typography-control">
			{ label && (
				<div className="atss-control__label-wrapper flex items-center">
					<label className="atss-control__label text-sm font-medium">
						{ label }: <span className="atss-typography-control__font-names">{ fontNames }</span>
					</label>
					{ value && (
						<Tooltip placement="top" text={ __( 'Reset to default', 'athemes-starter-sites' ) }>
							<button
								type="button"
								className="atss-control__reset-button"
								onClick={ handleReset }
								aria-label={ __( 'Reset selection', 'athemes-starter-sites' ) }
							>
								<Icon icon={ rotateLeft } />
							</button>
						</Tooltip>
					) }
				</div>
			) }

			<div className="atss-typography-control__grid">
				{ typographyPairs.map( ( pair ) => {
					const isSelected = value === pair.id;

					return (
						<Tooltip placement="top" text={ getFontNames( pair ) }>
							<button
								key={ pair.id }
								type="button"
								className={ `atss-typography-control__option ${ isSelected ? 'atss-typography-control__option--selected' : '' }` }
								onClick={ () => handleSelect( pair.id ) }
								aria-label={ pair.label || pair.name }
								aria-pressed={ isSelected }
							>
								<div className="atss-typography-control__preview">
									<span
										style={ {
											fontFamily: pair.headingFont.family,
											fontWeight: 500,
											fontSize: '22px'
										} }
									>
										A
									</span>
									<span
										style={ {
											fontFamily: pair.bodyFont.family,
											fontWeight: 400,
											fontSize: '22px'
										} }
									>
										g
									</span>
								</div>
							</button>
						</Tooltip>
					);
				} ) }
			</div>
		</div>
	);
}

export default TypographyControl;
