/**
 * Social Control component for the onboarding wizard.
 *
 * @package Athemes Starter Sites
 */

import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import CustomSelectControlWithPlaceholder from './CustomSelectControlWithPlaceholder';

/**
 * Social platforms configuration.
 */
const socialPlatforms = [
	{ key: 'facebook', name: __( 'Facebook', 'athemes-starter-sites' ) },
	{ key: 'twitter', name: __( 'Twitter (X)', 'athemes-starter-sites' ) },
	{ key: 'instagram', name: __( 'Instagram', 'athemes-starter-sites' ) },
	{ key: 'linkedin', name: __( 'LinkedIn', 'athemes-starter-sites' ) },
	{ key: 'whatsapp', name: __( 'WhatsApp', 'athemes-starter-sites' ) },
	{ key: 'youtube', name: __( 'YouTube', 'athemes-starter-sites' ) },
	{ key: 'tiktok', name: __( 'TikTok', 'athemes-starter-sites' ) },
	{ key: 'pinterest', name: __( 'Pinterest', 'athemes-starter-sites' ) },
];

/**
 * Social Control component for managing social media links.
 *
 * @param {Object}   props          Component props.
 * @param {string}   props.label    Label for the control.
 * @param {Array}    props.value    Array of social link objects with platform and url.
 * @param {Function} props.onChange Callback when social links change.
 * @return {JSX.Element} Social Control component.
 */
function SocialControl( { label, value = [], onChange } ) {
	/**
	 * Add a new social link row.
	 */
	const addSocialLink = () => {
		onChange( [ ...value, { platform: '', url: '' } ] );
	};

	/**
	 * Remove a social link row.
	 *
	 * @param {number} index Index of the row to remove.
	 */
	const removeSocialLink = ( index ) => {
		const newValue = value.filter( ( _, i ) => i !== index );
		onChange( newValue );
	};

	/**
	 * Update a social link field.
	 *
	 * @param {number} index Index of the row to update.
	 * @param {string} field Field name (platform or url).
	 * @param {string} newValue New value for the field.
	 */
	const updateSocialLink = ( index, field, newValue ) => {
		const newLinks = [ ...value ];
		newLinks[ index ] = { ...newLinks[ index ], [ field ]: newValue };
		onChange( newLinks );
	};

	/**
	 * Get available platform options for a specific row.
	 * Excludes platforms already selected in other rows.
	 *
	 * @param {number} currentIndex Index of the current row.
	 * @return {Array} Filtered platform options.
	 */
	const getAvailablePlatforms = ( currentIndex ) => {
		// Get all platforms selected in other rows
		const selectedPlatforms = value
			.map( ( link, index ) => index !== currentIndex ? link.platform : null )
			.filter( ( platform ) => platform && platform !== '' );

		// Filter out selected platforms, but keep the current row's platform
		const currentPlatform = value[ currentIndex ]?.platform;
		return socialPlatforms.filter( ( option ) => {
			// Always include the current row's selected platform
			if ( option.key === currentPlatform ) {
				return true;
			}
			// Exclude platforms selected in other rows
			return ! selectedPlatforms.includes( option.key );
		} );
	};

	return (
		<div className="atss-social-control">
			{ label && (
				<label className="atss-social-control__label components-base-control__label">
					{ label }
				</label>
			) }

			<div className="atss-social-control__items">
				{ value.map( ( link, index ) => (
					<div key={ index } className="atss-social-control__item flex gap-xs">
						<div className="atss-social-control__platform atss-form-field">
							<CustomSelectControlWithPlaceholder
								placeholder={ __( 'Select platform...', 'athemes-starter-sites' ) }
								value={ link.platform ? socialPlatforms.find( ( option ) => option.key === link.platform ) : null }
								options={ getAvailablePlatforms( index ) }
								onChange={ ( { selectedItem } ) => updateSocialLink( index, 'platform', selectedItem?.key || '' ) }
								__next40pxDefaultSize={ true }
							/>
						</div>

						<div className="atss-social-control__url atss-form-field">
							<TextControl
								value={ link.url }
								onChange={ ( newUrl ) => updateSocialLink( index, 'url', newUrl ) }
								placeholder={ __( 'Enter URL...', 'athemes-starter-sites' ) }
								type="url"
								__next40pxDefaultSize={ true }
								__nextHasNoMarginBottom={ true }
							/>
						</div>

						<button
							type="button"
							className="atss-social-control__remove"
							onClick={ () => removeSocialLink( index ) }
							aria-label={ __( 'Remove social link', 'athemes-starter-sites' ) }
						>
							<span>×</span>
						</button>
					</div>
				) ) }
			</div>

			<button
				type="button"
				className="atss-onboarding-wizard__btn atss-onboarding-wizard__btn--skip"
				onClick={ addSocialLink }
			>
				{ __( 'Add social link', 'athemes-starter-sites' ) }
			</button>
		</div>
	);
}

export default SocialControl;
