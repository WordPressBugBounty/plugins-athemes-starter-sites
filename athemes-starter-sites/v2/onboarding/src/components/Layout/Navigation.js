/**
 * Navigation bar component for the onboarding wizard.
 *
 * @package Athemes Starter Sites
 */

import { useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { getThemeLogo } from '../../utils/helpers';
import CloseConfirmationModal from './CloseConfirmationModal';
import { useWizard } from '../../context/WizardContext';

/**
 * Navigation component displaying logo, steps, and close button.
 *
 * @param {Object}   props                 Component props.
 * @param {Array}    props.steps           Array of step objects.
 * @param {number}   props.currentStep     Current active step ID.
 * @param {Array}    props.completedSteps  Array of completed step IDs.
 * @param {Function} props.onStepChange    Callback when step is clicked.
 * @param {Function} props.onClose         Callback when close button is clicked.
 * @return {JSX.Element} Navigation component.
 */
function Navigation( {
	steps,
	currentStep,
	completedSteps = [],
	onStepChange,
	onClose,
} ) {
	// Get import completion status from context
	const { isImportComplete } = useWizard();

	// State for close confirmation modal
	const [ isCloseModalOpen, setIsCloseModalOpen ] = useState( false );

	/**
	 * Check if a step is accessible for navigation.
	 *
	 * @param {number} stepId Step ID to check.
	 * @return {boolean} Whether the step is accessible.
	 */
	const isStepAccessible = ( stepId ) => {
		// First step is always accessible.
		if ( stepId === 1 ) {
			return true;
		}

		// Current step and previous steps are accessible.
		if ( currentStep >= stepId ) {
			return true;
		}

		// Completed steps are accessible.
		if ( completedSteps.includes( stepId - 1 ) ) {
			return true;
		}

		return false;
	};

	/**
	 * Handle step button click.
	 *
	 * @param {number} stepId Step ID clicked.
	 */
	const handleStepClick = ( stepId ) => {
		if ( isStepAccessible( stepId ) && onStepChange ) {
			onStepChange( stepId );
		}
	};

	// Calculate theme logo once on mount since it depends on stable global variable
	const themeLogo = useMemo( () => {
		return getThemeLogo();
	}, [] );

	return (
		<nav className="atss-onboarding-wizard__nav flex justify-between items-center">
			{/* Logo */}
			<div className="atss-onboarding-wizard__logo flex items-center gap-md">
				{ themeLogo && (
					<img
						src={ themeLogo }
						alt={ __( 'Theme Logo', 'athemes-starter-sites' ) }
						className="atss-onboarding-wizard__logo-image"
					/>
				) }
				<span className="atss-onboarding-wizard__logo-title text-lg font-medium">
					{ __( 'Site Wizard', 'athemes-starter-sites' ) }
				</span>
			</div>

			{/* Steps */}
			<div className="atss-onboarding-wizard__steps flex items-center gap-xs">
				{ steps.filter( ( step ) => ! step.hidden ).map( ( step ) => {
					const isCompleted = completedSteps.includes( step.id );
					const isActive = currentStep === step.id;
					const isAccessible = isStepAccessible( step.id );
					// Only show checkmark if completed AND we're past this step.
					const showCheckmark = isCompleted && currentStep > step.id;

					return (
						<button
							key={ step.id }
						className={ [
							'atss-onboarding-wizard__step flex items-center gap-xs',
							isActive && 'is-active text-heading',
							showCheckmark && 'is-completed text-secondary',
							! isActive && ! showCheckmark && 'text-tertiary',
							! isAccessible && 'is-disabled',
						].filter( Boolean ).join( ' ' ) }
							onClick={ () => handleStepClick( step.id ) }
							disabled={ ! isAccessible }
							aria-label={ step.title }
							aria-current={ isActive ? 'step' : undefined }
						>
							<span className="atss-onboarding-wizard__step-number text-xs font-semibold text-icon">
								{ showCheckmark ? (
									<span className="atss-onboarding-wizard__step-checkmark" style={ { lineHeight: '1' } }>
										<svg
											width="12"
											height="10"
											viewBox="0 0 12 10"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											style={ { maxWidth: '11px', verticalAlign: 'middle' } }
										>
											<path
												d="M1 5L4.5 8.5L11 1"
												stroke="white"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</span>
								) : (
									step.id
								) }
							</span>
							<span className="atss-onboarding-wizard__step-label text-xs font-semibold">
								{ step.title }
							</span>
						</button>
					);
				} ) }
			</div>

			{/* Close Button */}
			<button
				type="button"
				className="atss-onboarding-wizard__close text-icon"
				onClick={ () => {
					// If import is complete, close directly without confirmation
					if ( isImportComplete ) {
						onClose();
					} else {
						setIsCloseModalOpen( true );
					}
				} }
				aria-label={ __( 'Close wizard', 'athemes-starter-sites' ) }
			>
				<span className="atss-onboarding-wizard__close-icon" aria-hidden="true">
					×
				</span>
				<span className="screen-reader-text">
					{ __( 'Close wizard', 'athemes-starter-sites' ) }
				</span>
			</button>

			{/* Close Confirmation Modal */}
			<CloseConfirmationModal
				isOpen={ isCloseModalOpen }
				onCancel={ () => setIsCloseModalOpen( false ) }
				onConfirm={ () => {
					setIsCloseModalOpen( false );
					onClose();
				} }
			/>
		</nav>
	);
}

Navigation.propTypes = {
	steps: PropTypes.arrayOf(
		PropTypes.shape( {
			id: PropTypes.number.isRequired,
			slug: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			component: PropTypes.elementType.isRequired,
		} )
	).isRequired,
	currentStep: PropTypes.number.isRequired,
	completedSteps: PropTypes.arrayOf( PropTypes.number ),
	onStepChange: PropTypes.func.isRequired,
	onClose: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
	completedSteps: [],
};

export default Navigation;
