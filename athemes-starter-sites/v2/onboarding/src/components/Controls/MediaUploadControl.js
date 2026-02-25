/**
 * Media Upload Control component.
 *
 * @package Athemes Starter Sites
 */

import { __ } from '@wordpress/i18n';
import { Button, Icon } from '@wordpress/components';
import { trash } from '@wordpress/icons';
import PropTypes from 'prop-types';

/**
 * MediaUploadControl component for uploading images via WordPress media library.
 *
 * @param {Object}   props             Component props.
 * @param {string}   props.label       Label for the control.
 * @param {string}   props.value       Current image URL.
 * @param {number}   props.id          Current image ID.
 * @param {Function} props.onChange    Callback when image is selected/changed.
 * @param {Function} props.onRemove    Callback when image is removed.
 * @param {string}   props.buttonText  Text for the upload button.
 * @param {string}   props.allowedTypes Allowed media types (default: 'image').
 * @return {JSX.Element} MediaUploadControl component.
 */
function MediaUploadControl( {
	label = __( 'Upload Image', 'athemes-starter-sites' ),
	value = '',
	id = 0,
	onChange,
	onRemove,
	buttonText = __( 'Select Image', 'athemes-starter-sites' ),
	allowedTypes = 'image',
} ) {
	/**
	 * Open WordPress media library.
	 */
	const openMediaLibrary = () => {
		// Check if wp.media is available
		if ( ! window.wp || ! window.wp.media ) {
			console.error( 'WordPress media library is not available' );
			return;
		}

		// Create media frame
		const frame = window.wp.media( {
			frame: 'select',
			title: __( 'Select or Upload Image', 'athemes-starter-sites' ),
			button: {
				text: __( 'Select', 'athemes-starter-sites' ),
			},
			multiple: false,
			library: {
				type: allowedTypes,
			},
		} );

		// When an image is selected, run callback
		frame.on( 'select', () => {
			const attachment = frame.state().get( 'selection' ).first().toJSON();

			if ( onChange ) {
				onChange( {
					url: attachment.url,
					id: attachment.id,
					alt: attachment.alt || '',
					width: attachment.width || 0,
					height: attachment.height || 0,
				} );
			}
		} );

		// Open the modal
		frame.open();
	};

	/**
	 * Handle media removal.
	 */
	const handleRemove = () => {
		if ( onRemove ) {
			onRemove();
		} else if ( onChange ) {
			onChange( {
				url: '',
				id: 0,
				alt: '',
				width: 0,
				height: 0,
			} );
		}
	};

	const filename = value ? value.split( '/' ).pop() : '';

	return (
		<div className="atss-control atss-media-upload-control">
			{ label && (
				<label className="atss-control__label text-sm font-medium">
					{ label }
				</label>
			) }

			<div className="atss-media-upload-control__content">
				{ ! value ? (
					<div className="atss-media-upload-control__buttons flex gap-xs flex-col justify-center">
						<Button
							onClick={ openMediaLibrary }
							variant="secondary"
							className="atss-media-upload-control__button w100 text-sm font-medium justify-center"
						>
							{ buttonText }
						</Button>
					</div>
				) : (
					<div className="atss-media-upload-control__selected">
						<div className="atss-media-upload-control__file-info">
							<div className="atss-media-upload-control__thumbnail">
								<img
									src={ value }
									alt={ __( 'Preview', 'athemes-starter-sites' ) }
								/>
							</div>
							<span className="atss-media-upload-control__filename">
								{ filename }
							</span>
						</div>
						<div className="atss-media-upload-control__actions">
							<Button
								onClick={ openMediaLibrary }
								variant="link"
								className="atss-media-upload-control__button atss-media-upload-control__button--change"
							>
								{ __( 'Change', 'athemes-starter-sites' ) }
							</Button>
							<Button
								onClick={ handleRemove }
								variant="link"
								isDestructive
								className="atss-media-upload-control__button atss-media-upload-control__button--remove"
							>
								<Icon icon={ trash } size={ 12 } />
							</Button>
						</div>
					</div>
				) }
			</div>
		</div>
	);
}

MediaUploadControl.propTypes = {
	label: PropTypes.string,
	value: PropTypes.string,
	id: PropTypes.number,
	onChange: PropTypes.func.isRequired,
	onRemove: PropTypes.func,
	buttonText: PropTypes.string,
	allowedTypes: PropTypes.string,
};

MediaUploadControl.defaultProps = {
	label: __( 'Upload Image', 'athemes-starter-sites' ),
	value: '',
	id: 0,
	buttonText: __( 'Select Image', 'athemes-starter-sites' ),
	allowedTypes: 'image',
};

export default MediaUploadControl;

