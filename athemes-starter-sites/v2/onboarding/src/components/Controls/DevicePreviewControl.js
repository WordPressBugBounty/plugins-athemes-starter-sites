/**
 * Device Preview Control component for switching between device preview modes.
 *
 * @package Athemes Starter Sites
 */

import { __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon } from '@wordpress/components';
import { desktop, tablet, mobile } from '@wordpress/icons';

/**
 * Device Preview Control component.
 *
 * @param {Object}   props          Component props.
 * @param {string}   props.label    Label for the control.
 * @param {string}   props.value    Currently selected device ('desktop', 'tablet', or 'mobile').
 * @param {Function} props.onChange Callback when device selection changes.
 * @return {JSX.Element} Device Preview Control component.
 */
function DevicePreviewControl( { label, value = 'desktop', onChange } ) {
	return (
		<div className="atss-device-preview-control atss-control atss-device-preview-control">
			{ label && (
				<label className="atss-control__label text-sm font-medium">
					{ label }
				</label>
			) }
			<ToggleGroupControl value={ value } onChange={ onChange } isBlock __next40pxDefaultSize __nextHasNoMarginBottom>
				<ToggleGroupControlOptionIcon
					value="desktop"
					icon={ desktop }
					label="Desktop"
				/>
				<ToggleGroupControlOptionIcon
					value="tablet"
					icon={ tablet }
					label="Tablet"
				/>
				<ToggleGroupControlOptionIcon
					value="mobile"
					icon={ mobile }
					label="Mobile"
				/>
			</ToggleGroupControl>
		</div>
	);
}

export default DevicePreviewControl;

