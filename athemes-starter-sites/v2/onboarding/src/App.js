/**
 * Main onboarding wizard app component.
 *
 * @package Athemes Starter Sites
 */

import { Suspense, useState, useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Navigation, Spinner } from './components/Layout';
import ResumeModal from './components/Layout/ResumeModal';
import wizardSteps from './data/wizard-steps';
import { useWizard } from './context/WizardContext';

/**
 * Main App component for the onboarding wizard.
 *
 * @return {JSX.Element} The app component.
 */
function App() {
	const {
		currentStep,
		setCurrentStep,
		completedSteps,
		markStepCompleted,
		isLoading,
		saveState,
		resetWizard,
	} = useWizard();

	// Navigation state for error handling
	const [ navigationState, setNavigationState ] = useState( {
		isLoading: false,
		error: null,
	} );

	// Resume modal state
	const [ showResumeModal, setShowResumeModal ] = useState( false );
	const hasCheckedResume = useRef( false );

	/**
	 * Show resume modal if user has saved progress (only on initial load).
	 */
	useEffect( () => {
		if ( ! isLoading && ! hasCheckedResume.current ) {
			// Check if coming from legacy wizard (skip resume modal)
			const urlParams = new URLSearchParams( window.location.search );
			const fromLegacy = urlParams.get( 'from-legacy' );

			// Check if there's saved progress to resume
			if ( completedSteps.length > 0 && ! fromLegacy ) {
				setShowResumeModal( true );
			}

			// Clean up URL parameter if present
			if ( fromLegacy ) {
				urlParams.delete( 'from-legacy' );
				const newUrl = window.location.pathname + ( urlParams.toString() ? '?' + urlParams.toString() : '' );
				window.history.replaceState( {}, '', newUrl );
			}

			// Mark as checked regardless of whether we showed the modal
			hasCheckedResume.current = true;
		}
	}, [ isLoading, completedSteps.length ] );

	/**
	 * Handle resuming the wizard session.
	 */
	const handleResume = () => {
		setShowResumeModal( false );
	};

	/**
	 * Handle restarting the wizard from scratch.
	 */
	const handleRestart = async () => {
		const success = await resetWizard();
		if ( success ) {
			setShowResumeModal( false );
			hasCheckedResume.current = false;
		}
	};

	/**
	 * Handle step navigation.
	 *
	 * @param {number} stepId Step ID to navigate to.
	 */
	const handleStepChange = ( stepId ) => {
		setCurrentStep( stepId );
	};

	/**
	 * Handle going to the next step.
	 *
	 * @param {Object} stepData Optional data from the step to save.
	 */
	const handleContinue = async ( stepData = null ) => {
		const nextStep = currentStep + 1;
		const isLastStep = nextStep > wizardSteps.length;

		// Set loading state and clear any previous errors
		setNavigationState( { isLoading: true, error: null } );

		try {
			await markStepCompleted( currentStep, isLastStep ? null : nextStep, stepData );
			// Clear loading state on success
			setNavigationState( { isLoading: false, error: null } );
		} catch ( error ) {
			// Set error state and don't navigate
			setNavigationState( { isLoading: false, error: error.message } );
			// eslint-disable-next-line no-console
			console.error( 'Failed to save wizard state:', error );
		}
	};

	/**
	 * Handle going to the previous step.
	 */
	const handleBack = () => {
		// Clear navigation errors when going back
		setNavigationState( { isLoading: false, error: null } );

		const prevStep = currentStep - 1;
		if ( prevStep >= 1 ) {
			setCurrentStep( prevStep );
		}
	};

	/**
	 * Handle skipping the current step.
	 */
	const handleSkip = () => {
		handleContinue();
	};

	/**
	 * Handle wizard close.
	 */
	const handleClose = () => {
		const dashboardUrl =
			atssOnboarding?.dashboardUrl || 'admin.php?page=themes.php';
		window.location.href = dashboardUrl;
	};

	/**
	 * Render the current step component.
	 *
	 * @return {JSX.Element|null} The step component or null.
	 */
	const renderCurrentStep = () => {
		const step = wizardSteps.find( ( s ) => s.id === currentStep );
		if ( ! step || ! step.component ) {
			return null;
		}

		const StepComponent = step.component;
		return (
			<StepComponent
				onBack={ handleBack }
				onSkip={ handleSkip }
				onContinue={ handleContinue }
				navigationLoading={ navigationState.isLoading }
				navigationError={ navigationState.error }
			/>
		);
	};

	if ( isLoading ) {
		return (
			<div className="atss-onboarding-wizard__loading-screen">
				<Spinner />
				<span className="atss-onboarding-wizard__loading-text text-lg">{ __( 'Loading wizard...', 'athemes-starter-sites' ) }</span>
			</div>
		);
	}

	return (
		<div className="atss-onboarding-wizard">
			<ResumeModal
				isOpen={ showResumeModal }
				onResume={ handleResume }
				onRestart={ handleRestart }
			/>
			<div className="atss-onboarding-wizard__container">
				<Navigation
					steps={ wizardSteps }
					currentStep={ currentStep }
					completedSteps={ completedSteps }
					onStepChange={ handleStepChange }
					onClose={ handleClose }
				/>

				<main key={ currentStep } className="atss-onboarding-wizard__content">
					<Suspense
						fallback={
							// Don't show loading spinner for Customize (3) and Pages (4) steps
							( currentStep === 3 || currentStep === 4 ) ? null : (
								<div className="atss-onboarding-wizard__step-loading" aria-label={ __( 'Loading step', 'athemes-starter-sites' ) }>
									<Spinner />
								</div>
							)
						}
					>
						{ renderCurrentStep() }
					</Suspense>
				</main>
			</div>
		</div>
	);
}

export default App;
