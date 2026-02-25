/**
 * Close confirmation modal component.
 *
 * @package Athemes Starter Sites
 */

import { Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

/**
 * CloseConfirmationModal component.
 *
 * @param {Object}   props           Component props.
 * @param {boolean}  props.isOpen    Whether the modal is open.
 * @param {Function} props.onCancel  Callback when user cancels.
 * @param {Function} props.onConfirm Callback when user confirms close.
 * @return {JSX.Element|null} Modal component or null if not open.
 */
function CloseConfirmationModal( { isOpen, onCancel, onConfirm } ) {
	if ( ! isOpen ) {
		return null;
	}

	return (
		<Modal
			style={ { width: '500px', padding: '18px 30px' } }
			onRequestClose={ onCancel }
			__experimentalHideHeader={ true }
		>
			<div className="flex flex-col items-center text-align-center">
				<h2 className="font-medium text-lg" style={ { margin: '0 0 10px' } }>
					{ __( 'Are you sure you want to close?', 'athemes-starter-sites' ) }
				</h2>
				<div className="text-md text-tertiary" style={ { maxWidth: '320px' } }>
					{ __( 'You can access the setup wizard again from Theme Dashboard > Settings', 'athemes-starter-sites' ) }
				</div>
				<div className="flex gap-xxl items-center justify-center" style={ { marginTop: '30px' } }>
					<button
						type="button"
						className="atss-onboarding-wizard__btn atss-onboarding-wizard__btn--continue text-lg"
						onClick={ onCancel }
						style={ { height: '52px', padding: '15px 28px' } }
					>
						{ __( 'No', 'athemes-starter-sites' ) }
					</button>
					<button
						type="button"
						className="atss-onboarding-wizard__btn atss-onboarding-wizard__btn--skip text-lg"
						style={ { height: '52px', padding: '15px 20px' } }
						onClick={ onConfirm }
					>
						{ __( 'Yes', 'athemes-starter-sites' ) }
					</button>
				</div>
			</div>
		</Modal>
	);
}

CloseConfirmationModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onCancel: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
};

export default CloseConfirmationModal;
