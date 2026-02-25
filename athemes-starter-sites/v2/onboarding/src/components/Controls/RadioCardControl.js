/**
 * Radio Card Control component for the onboarding wizard.
 *
 * @package Athemes Starter Sites
 */

import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { check } from '@wordpress/icons';

/**
 * Radio Card Control component displaying selectable card options.
 *
 * @param {Object}   props          Component props.
 * @param {string}   props.label    Label for the control.
 * @param {Array}    props.options  Array of options with value, label, and icon.
 * @param {string}   props.selected Currently selected value.
 * @param {string}   props.default  Default value to use when selected is null/undefined.
 * @param {Function} props.onChange Callback when selection changes.
 * @return {JSX.Element} Radio Card Control component.
 */
function RadioCardControl( {
	label,
	options = [],
	selected,
	default: defaultValue,
	onChange,
} ) {
	// Use default value if selected is null or undefined
	const currentValue = selected ?? defaultValue;

	return (
		<div 
			className="atss-onboarding-wizard__radio-card-control"
			role="radiogroup"
			aria-labelledby={ label ? 'radio-card-label' : undefined }
		>
			{ label && (
				<span 
					id="radio-card-label"
					className="atss-onboarding-wizard__radio-card-label components-base-control__label"
				>
					{ label }
				</span>
			) }

			<div className="atss-onboarding-wizard__radio-card-options">
				{ options.map( ( option ) => {
					const isSelected = currentValue === option.value;

					return (
						<button
							key={ option.value }
							type="button"
							className={ `atss-onboarding-wizard__radio-card atss-form-field flex items-center gap-sm ${ isSelected ? 'is-selected' : '' }` }
							onClick={ () => onChange( option.value ) }
							role="radio"
							aria-checked={ isSelected }
						>
							{ option.icon && (
								<span className="atss-onboarding-wizard__radio-card-icon flex align-center">
									{ option.icon }
								</span>
							) }

							<span className="atss-onboarding-wizard__radio-card-text text-sm">
								{ option.label }
							</span>

							<span className="atss-onboarding-wizard__radio-card-indicator">
								{ isSelected ? (
									<Icon icon={ check } />
								) : (
									<span className="atss-onboarding-wizard__radio-card-circle" />
								) }
							</span>
						</button>
					);
				} ) }
			</div>
		</div>
	);
}

export default RadioCardControl;