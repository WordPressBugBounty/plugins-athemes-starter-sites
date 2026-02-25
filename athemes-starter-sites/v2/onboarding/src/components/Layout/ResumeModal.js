/**
 * Resume session modal component.
 *
 * @package Athemes Starter Sites
 */

import { Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

/**
 * ResumeModal component.
 *
 * Displays when user returns to an incomplete wizard session.
 *
 * @param {Object}   props          Component props.
 * @param {boolean}  props.isOpen   Whether the modal is open.
 * @param {Function} props.onResume Callback when user resumes session.
 * @param {Function} props.onRestart Callback when user restarts from scratch.
 * @return {JSX.Element|null} Modal component or null if not open.
 */
function ResumeModal( { isOpen, onResume, onRestart } ) {
	if ( ! isOpen ) {
		return null;
	}

	return (
		<Modal
			style={ { width: '500px', padding: '18px 30px' } }
			onRequestClose={ onResume }
			__experimentalHideHeader={ true }
		>
			<div className="flex flex-col items-center text-align-center">
				<h2 className="font-medium text-lg" style={ { margin: '0 0 10px' } }>
					{ __( 'Resume last session?', 'athemes-starter-sites' ) }
				</h2>
				<div className="text-md text-tertiary" style={ { maxWidth: '380px' } }>
					{ __( 'It appears that your previous website building session was interrupted. Would you like to pick up where you left off?', 'athemes-starter-sites' ) }
				</div>
				<div className="flex gap-xxl items-center justify-center" style={ { marginTop: '30px' } }>
					<button
						type="button"
						className="atss-onboarding-wizard__btn atss-onboarding-wizard__btn--continue text-lg"
						onClick={ onResume }
						style={ { height: '52px', padding: '15px 28px' } }
					>
						{ __( 'Resume', 'athemes-starter-sites' ) }
					</button>
					<button
						type="button"
						className="atss-onboarding-wizard__btn atss-onboarding-wizard__btn--skip text-lg"
						style={ { height: '52px', padding: '15px 20px' } }
						onClick={ onRestart }
					>
						{ __( 'Restart', 'athemes-starter-sites' ) }
					</button>
				</div>
			</div>
		</Modal>
	);
}

ResumeModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onResume: PropTypes.func.isRequired,
	onRestart: PropTypes.func.isRequired,
};

export default ResumeModal;
