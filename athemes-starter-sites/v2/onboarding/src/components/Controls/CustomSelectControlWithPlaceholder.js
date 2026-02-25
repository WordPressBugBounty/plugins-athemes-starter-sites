/**
 * CustomSelectControl wrapper with placeholder support.
 *
 * @package Athemes Starter Sites
 */

import { CustomSelectControl } from '@wordpress/components';
import { useMemo } from '@wordpress/element';

/**
 * Placeholder option key used internally.
 */
const PLACEHOLDER_KEY = '__placeholder__';

/**
 * CustomSelectControl wrapper that adds placeholder functionality.
 *
 * @param {Object}   props                       Component props.
 * @param {string}   props.placeholder           Placeholder text to display when no value is selected.
 * @param {Array}    props.options               Available options (without placeholder).
 * @param {Object}   props.value                 Currently selected value.
 * @param {Function} props.onChange              Callback when selection changes.
 * @param {string}   props.label                 Control label.
 * @param {boolean}  props.__next40pxDefaultSize Size variant flag.
 * @param {Object}   ...restProps                All other CustomSelectControl props.
 * @return {JSX.Element} CustomSelectControl with placeholder support.
 */
function CustomSelectControlWithPlaceholder( {
	placeholder = '',
	options = [],
	value = null,
	onChange,
	...restProps
} ) {
	// Create placeholder option with special styling
	const placeholderOption = useMemo(
		() => ( {
			key: PLACEHOLDER_KEY,
			name: placeholder,
			style: {
				color: 'var(--atss-color-text-icon)',
				fontStyle: 'normal',
			},
		} ),
		[ placeholder ]
	);

	// Determine the actual value to pass to CustomSelectControl
	const controlValue = useMemo( () => {
		// If no value is selected or value is null/undefined, use placeholder
		if ( ! value || value.key === PLACEHOLDER_KEY ) {
			return placeholderOption;
		}
		return value;
	}, [ value, placeholderOption ] );

	// Check if placeholder is currently showing
	const isPlaceholderShowing = ! value || value.key === PLACEHOLDER_KEY;

	/**
	 * Handle selection changes.
	 * Filter out placeholder selections and pass null instead.
	 */
	const handleChange = ( changeObject ) => {
		const { selectedItem } = changeObject;

		// If placeholder is selected, pass null to parent
		if ( selectedItem.key === PLACEHOLDER_KEY ) {
			onChange( { ...changeObject, selectedItem: null } );
			return;
		}

		// Otherwise, pass through the selected item
		onChange( changeObject );
	};

	return (
		<div className={ isPlaceholderShowing ? 'atss-custom-select-placeholder-showing' : '' }>
			<CustomSelectControl
				{ ...restProps }
				options={ options }
				value={ controlValue }
				onChange={ handleChange }
			/>
		</div>
	);
}

export default CustomSelectControlWithPlaceholder;
