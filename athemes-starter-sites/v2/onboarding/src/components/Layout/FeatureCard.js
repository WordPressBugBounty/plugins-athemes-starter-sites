/**
 * FeatureCard component for displaying individual plugins in the Features step.
 *
 * @package Athemes Starter Sites
 */

import { __ } from '@wordpress/i18n';
import pluginInfo, { DEFAULT_ICON, DEFAULT_DESCRIPTION } from '../../data/plugin-info';

const PLUGIN_INFO = pluginInfo;

function getPluginIcon( slug ) {
	return PLUGIN_INFO[ slug ]?.icon || DEFAULT_ICON;
}

function getPluginName( slug ) {
	return PLUGIN_INFO[ slug ]?.name || slug;
}

function getDescription( slug ) {
	return PLUGIN_INFO[ slug ]?.description || DEFAULT_DESCRIPTION;
}

/**
 * FeatureCard component.
 *
 * @param {Object}   props             Component props.
 * @param {Object}   props.plugin      Plugin object with name, slug, required, etc.
 * @param {boolean}  props.isSelected  Whether this plugin is selected.
 * @param {Function} props.onToggle    Callback when checkbox is toggled.
 * @return {JSX.Element} FeatureCard component.
 */
function FeatureCard( { plugin, isSelected = false, onToggle } ) {
	// Handle toggle (used by both card and checkbox).
	const handleToggle = ( e ) => {
		if ( e ) {
			e.stopPropagation();
		}
		if ( onToggle ) {
			onToggle();
		}
	};

	// Determine the badge type based on the required property.
	const getBadgeType = () => {
		if ( plugin.required === true ) {
			return 'required';
		}
		// Consider plugins without explicit required: false as recommended.
		if ( plugin.recommended === true ) {
			return 'recommended';
		}
		return 'none';
	};

	const badgeType = getBadgeType();

	// Render badge based on type.
	const renderBadge = () => {
		if ( badgeType === 'recommended' ) {
			return (
				<span className="atss-feature-card__badge atss-feature-card__badge--recommended">
					{ __( 'Recommended', 'athemes-starter-sites' ) }
				</span>
			);
		}
		if ( badgeType === 'required' ) {
			return (
				<span className="atss-feature-card__badge atss-feature-card__badge--required">
					{ __( 'Required', 'athemes-starter-sites' ) }
				</span>
			);
		}
		return null;
	};

	const isDisabled = plugin.required === true;

	return (
		<div
			className={ `atss-feature-card ${ isSelected ? 'atss-feature-card--selected' : '' } ${ isDisabled ? 'atss-feature-card--disabled' : '' }` }
			onClick={ ! isDisabled ? handleToggle : undefined }
			role="button"
			tabIndex={ isDisabled ? -1 : 0 }
			onKeyDown={ ( e ) => {
				if ( ! isDisabled && ( e.key === 'Enter' || e.key === ' ' ) ) {
					handleToggle();
				}
			} }
		>
			<div className="atss-feature-card__content">
				<div className="atss-feature-card__icon" dangerouslySetInnerHTML={ { __html: getPluginIcon( plugin.slug ) } } />

				<div className="atss-feature-card__text">
					<div className="atss-feature-card__title-wrapper">
						<h3 className="atss-feature-card__title">
							{ getPluginName( plugin.slug ) }
						</h3>
						{ renderBadge() }
					</div>

					<p className="atss-feature-card__description">
						{ getDescription( plugin.slug ) }
					</p>
				</div>
			</div>

			<button
				type="button"
				className={ `atss-feature-card__checkbox ${ isSelected ? 'atss-feature-card__checkbox--checked' : '' }` }
				onClick={ handleToggle }
				disabled={ isDisabled }
				aria-checked={ isSelected }
				aria-label={ isSelected ? __( 'Deselect plugin', 'athemes-starter-sites' ) : __( 'Select plugin', 'athemes-starter-sites' ) }
			>
				{ isSelected && (
					<svg
						width="12"
						height="10"
						viewBox="0 0 12 10"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="atss-feature-card__checkmark"
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
	);
}

export default FeatureCard;
