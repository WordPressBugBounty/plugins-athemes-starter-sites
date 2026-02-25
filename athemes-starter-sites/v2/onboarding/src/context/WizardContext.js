/**
 * Wizard context and provider.
 *
 * @package Athemes Starter Sites
 */

import { createContext, useContext, useState, useEffect, useCallback, useRef } from '@wordpress/element';
import wizardSteps from '../data/wizard-steps';
import { getWizardState, saveWizardState, deleteWizardState } from '../utils/api';

const WizardContext = createContext();

/**
 * Hook to use the wizard context.
 *
 * @return {Object} The context value.
 */
export const useWizard = () => {
	const context = useContext( WizardContext );
	if ( ! context ) {
		throw new Error( 'useWizard must be used within a WizardProvider' );
	}
	return context;
};

/**
 * Wizard provider component.
 *
 * @param {Object} props          Component props.
 * @param {Object} props.children Child components.
 * @return {JSX.Element} The provider component.
 */
export const WizardProvider = ( { children } ) => {
	const [ state, setState ] = useState( {
		builder: 'gutenberg',
		currentStep: 1,
		completedSteps: [],
		data: {},
	} );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ error, setError ] = useState( null );
	const [ prefetchedPages, setPrefetchedPages ] = useState( null );
	const [ isImportComplete, setIsImportComplete ] = useState( false );
	const [ isHistoryInitialized, setIsHistoryInitialized ] = useState( false );
	const isHandlingPopState = useRef( false );

	/**
	 * Load initial state from the database.
	 */
	useEffect( () => {
		const loadState = async () => {
			if ( typeof atssOnboarding === 'undefined' ) {
				setIsLoading( false );
				return;
			}

			try {
				const data = await getWizardState();

				if ( data && Object.keys( data ).length > 0 ) {
					setState( ( prev ) => ( {
						...prev,
						...data,
						builder: data.builder || 'gutenberg',
					} ) );
					setError( null ); // Clear any previous errors
				}
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( 'Failed to load wizard state:', error );
				setError( error.message );
			} finally {
				setIsLoading( false );
			}
		};

		loadState();
	}, [] );

	/**
	 * Initialize browser history with current step on mount.
	 */
	useEffect( () => {
		if ( ! isLoading && ! isHistoryInitialized ) {
			// Replace initial history state with wizard step
			window.history.replaceState(
				{ wizardStep: state.currentStep },
				'',
				window.location.href
			);
			setIsHistoryInitialized( true );
		}
	}, [ isLoading, isHistoryInitialized, state.currentStep ] );

	/**
	 * Push history state when step changes (after initialization).
	 */
	useEffect( () => {
		if ( ! isHistoryInitialized || isHandlingPopState.current ) {
			// Don't push history if we're handling a popstate event
			if ( isHandlingPopState.current ) {
				isHandlingPopState.current = false;
			}
			return;
		}

		// Push new history entry when step changes
		window.history.pushState(
			{ wizardStep: state.currentStep },
			'',
			window.location.href
		);
	}, [ state.currentStep, isHistoryInitialized ] );

	/**
	 * Listen for browser back/forward button.
	 */
	useEffect( () => {
		const handlePopState = ( event ) => {
			if ( event.state && typeof event.state.wizardStep === 'number' ) {
				// Set flag to prevent history push when we update state
				isHandlingPopState.current = true;

				// Navigate to the step from history
				const targetStep = event.state.wizardStep;

				// Update state without triggering history push
				setState( ( prev ) => ( {
					...prev,
					currentStep: targetStep,
				} ) );
			} else {
				// No wizard state in history, allow default navigation (exit wizard)
				// This happens when user goes back beyond the first step
			}
		};

		window.addEventListener( 'popstate', handlePopState );

		return () => {
			window.removeEventListener( 'popstate', handlePopState );
		};
	}, [] );

	/**
	 * Update step data.
	 *
	 * @param {string} stepSlug The step slug (e.g., 'getting-started').
	 * @param {Object} data     The data to save for this step.
	 */
	const updateStepData = useCallback( ( stepSlug, data ) => {
		setState( ( prev ) => ( {
			...prev,
			data: {
				...prev.data,
				[ stepSlug ]: data,
			},
		} ) );
	}, [] );

	/**
	 * Get the site title (single source of truth).
	 *
	 * @return {string} The site title.
	 */
	const siteTitle = state.data.siteTitle || '';

	/**
	 * Update the site title (single source of truth).
	 *
	 * @param {string} title The new site title.
	 */
	const setSiteTitle = useCallback( ( title ) => {
		setState( ( prev ) => ( {
			...prev,
			data: {
				...prev.data,
				siteTitle: title,
			},
		} ) );
	}, [] );

	/**
	 * Get the builder (single source of truth).
	 *
	 * @return {string} The builder.
	 */
	const builder = state.builder || 'gutenberg';

	/**
	 * Update the builder (single source of truth).
	 *
	 * @param {string} newBuilder The new builder.
	 */
	const setBuilder = useCallback( ( newBuilder ) => {
		const validBuilders = [ 'gutenberg', 'elementor', 'beaver-builder' ];
		if ( ! validBuilders.includes( newBuilder ) ) {
			// eslint-disable-next-line no-console
			console.warn( `Invalid builder: ${ newBuilder }. Defaulting to gutenberg.` );
			newBuilder = 'gutenberg';
		}

		setState( ( prev ) => ( {
			...prev,
			builder: newBuilder,
		} ) );
	}, [] );

	/**
	 * Save state to the database.
	 *
	 * @param {Object} newState Optional new state to save. If not provided, uses current state.
	 * @return {Promise} The save operation promise.
	 */
	const saveState = useCallback( async ( newState = null ) => {
		const stateToSave = newState || state;

		try {
			await saveWizardState( stateToSave );
			setError( null ); // Clear any previous errors
			return true;
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Failed to save wizard state:', error );
			setError( error.message );
			return false;
		}
	}, [ state ] );

	/**
	 * Mark a step as completed and optionally move to next step.
	 *
	 * @param {number} stepId     Step ID to mark as completed.
	 * @param {number} nextStepId Optional next step ID to move to.
	 * @param {Object} stepData   Optional data to save for the current step.
	 */
	const markStepCompleted = useCallback( async ( stepId, nextStepId = null, stepData = null ) => {
		// Build the new state outside of setState to ensure we save what we set
		const updatedState = {
			...state,
			completedSteps: state.completedSteps.includes( stepId )
				? state.completedSteps
				: [ ...state.completedSteps, stepId ],
			currentStep: nextStepId || state.currentStep,
		};

		// Extract builder from stepData if present and set it at root level
		if ( stepData && stepData.builder ) {
			updatedState.builder = stepData.builder;
		}

		if ( stepData ) {
			const stepSlug = wizardSteps.find( ( s ) => s.id === stepId )?.slug;
			if ( stepSlug ) {
				updatedState.data = {
					...state.data,
					[ stepSlug ]: stepData,
				};
			}
		}

		// Save to database first with the complete updated state
		await saveState( updatedState );

		// Then update React state
		setState( updatedState );
	}, [ state, saveState ] );

	const setCurrentStep = useCallback( ( stepId ) => {
		setState( ( prev ) => ( {
			...prev,
			currentStep: stepId,
		} ) );
	}, [] );

	/**
	 * Reset wizard state (delete from database and reset to initial state).
	 *
	 * @return {Promise<boolean>} True if successful, false otherwise.
	 */
	const resetWizard = useCallback( async () => {
		try {
			await deleteWizardState();
			setState( {
				currentStep: 1,
				completedSteps: [],
				data: {},
			} );
			setError( null );
			return true;
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Failed to reset wizard:', error );
			setError( error.message );
			return false;
		}
	}, [] );

	const value = {
		currentStep: state.currentStep,
		setCurrentStep,
		completedSteps: state.completedSteps,
		wizardData: state.data,
		updateStepData,
		saveState,
		markStepCompleted,
		isLoading,
		error,
		setError,
		prefetchedPages,
		setPrefetchedPages,
		siteTitle,
		setSiteTitle,
		builder,
		setBuilder,
		isImportComplete,
		setIsImportComplete,
		resetWizard,
	};

	return (
		<WizardContext.Provider value={ value }>
			{ children }
		</WizardContext.Provider>
	);
};
