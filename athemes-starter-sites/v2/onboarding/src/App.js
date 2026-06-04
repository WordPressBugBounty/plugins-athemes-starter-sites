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
import themeName from './utils/get-theme-name';
import {
	trackOnboardingEvent,
	hasTrackedSessionEvent,
	markSessionEventTracked,
	resetOnboardingMetricsSession,
} from './utils/metrics';

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
		wizardData,
		builder,
	} = useWizard();

	const hasStarter = !! wizardData?.design?.selectedSiteId;

	const getNextStep = ( fromStep, starterSelected = hasStarter ) => {
		const currentIndex = wizardSteps.findIndex( ( s ) => s.id === fromStep );
		for ( let i = currentIndex + 1; i < wizardSteps.length; i++ ) {
			if ( wizardSteps[ i ].requiresStarter && ! starterSelected ) {
				continue;
			}
			return wizardSteps[ i ].id;
		}
		return null;
	};

	const getPrevStep = ( fromStep, starterSelected = hasStarter ) => {
		const currentIndex = wizardSteps.findIndex( ( s ) => s.id === fromStep );
		for ( let i = currentIndex - 1; i >= 0; i-- ) {
			if ( wizardSteps[ i ].requiresStarter && ! starterSelected ) {
				continue;
			}
			return wizardSteps[ i ].id;
		}
		return null;
	};

	// Navigation state for error handling
	const [ navigationState, setNavigationState ] = useState( {
		isLoading: false,
		error: null,
	} );

	// Resume modal state
	const [ showResumeModal, setShowResumeModal ] = useState( false );
	const hasCheckedResume = useRef( false );

	const [ isImporting, setIsImporting ] = useState( false );

	const trackedViewedSteps = useRef( new Set() );

	/**
	 * Get the current step slug.
	 *
	 * @param {number} stepId Step ID.
	 * @return {string} Step slug.
	 */
	const getStepSlug = ( stepId ) => {
		const step = wizardSteps.find( ( item ) => item.id === stepId );

		return step?.slug || '';
	};

	/**
	 * Get safe metrics metadata for the current wizard state.
	 *
	 * @param {number} stepId Step ID.
	 * @return {Object} Metrics metadata.
	 */
	const getMetricsMetadata = ( stepId = currentStep, stepData = null ) => {
		const stepSlug = getStepSlug( stepId );
		const data = {
			...wizardData,
			...( stepSlug && stepData
				? {
						[ stepSlug ]: stepData,
				  }
				: {} ),
		};

		const design = data?.design || {};
		const pages = data?.pages || {};
		const features = data?.features || {};
		const optin = data?.optin || {};
		const selectedPages = pages.selectedPages || [];
		const selectedPlugins = features.selectedPlugins || [];
		const demoId = design.selectedSiteId || '';

		return {
			builder: stepData?.builder || builder || 'gutenberg',
			step: stepSlug,
			demo_id: demoId,
			has_selected_starter: !! demoId,
			selected_pages_count: selectedPages.length,
			selected_plugins_count: selectedPlugins.length,
			optin_checked: !! optin.optinChecked,
		};
	};

	/**
	 * Get step data to save when skipping a step.
	 *
	 * @return {Object|null} Step data.
	 */
	const getSkipStepData = () => {
		const stepSlug = getStepSlug( currentStep );

		if ( stepSlug === 'design' ) {
			return {
				selectedSiteId: '',
			};
		}

		if ( stepSlug === 'pages' ) {
			return {
				selectedPages: [],
				selectedPageData: [],
			};
		}

		if ( stepSlug === 'features' ) {
			return {
				selectedPlugins: [],
			};
		}

		if ( stepSlug === 'optin' ) {
			return {
				email: '',
				optinChecked: false,
			};
		}

		return null;
	};

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
	 * Track wizard started and step viewed events.
	 */
	useEffect( () => {
		if ( isLoading ) {
			return;
		}

		if ( ! hasTrackedSessionEvent( 'onboarding_started' ) ) {
			trackOnboardingEvent( 'onboarding_started', getMetricsMetadata() );
			markSessionEventTracked( 'onboarding_started' );
		}

		if ( trackedViewedSteps.current.has( currentStep ) ) {
			return;
		}

		trackOnboardingEvent( 'onboarding_step_viewed', getMetricsMetadata() );
		trackedViewedSteps.current.add( currentStep );
	}, [ isLoading, currentStep ] );

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
			resetOnboardingMetricsSession();
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
	const handleContinue = async ( stepData = null, isSkipped = false ) => {
		const pendingHasStarter =
			currentStep === 2 ? !! stepData?.selectedSiteId : hasStarter;

		const nextStep = getNextStep( currentStep, pendingHasStarter );
		const isLastStep = ! nextStep || nextStep > wizardSteps.length;

		// Set loading state and clear any previous errors
		setNavigationState( { isLoading: true, error: null } );

		try {
			await markStepCompleted( currentStep, isLastStep ? null : nextStep, stepData );

			trackOnboardingEvent(
				isSkipped ? 'onboarding_step_skipped' : 'onboarding_step_completed',
				getMetricsMetadata( currentStep, stepData )
			);

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
		setNavigationState( { isLoading: false, error: null } );

		const prevStep = getPrevStep( currentStep );
		if ( prevStep && prevStep >= 1 ) {
			setCurrentStep( prevStep );
		}
	};

	/**
	 * Handle skipping the current step.
	 */
	const handleSkip = () => {
		handleContinue( getSkipStepData(), true );
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
				onImportingChange={ setIsImporting }
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
		<div className={`atss-onboarding-wizard ${ themeName ? `atss-onboarding-wizard--theme-${ themeName.toLowerCase() }` : '' }`}>
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
					isImporting={ isImporting }
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
