/**
 * Import step component.
 *
 * Orchestrates the entire import process including:
 * - Plugin installation
 * - Content import with page filtering
 * - Widget import
 * - Customizer import
 * - Wizard customizations application
 *
 * @package Athemes Starter Sites
 */

import { useState, useEffect, useCallback, useRef } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { Spinner } from '../Layout';
import { useWizard } from '../../context/WizardContext';
import { importAjaxRequest, deleteWizardState, drainActivationRedirects } from '../../utils/api';
import Complete from '../Layout/Complete';
import isBotiga from '../../utils/is-botiga';
import { trackOnboardingEvent, trackOnboardingEventBlocking, resetOnboardingMetricsSession } from '../../utils/metrics';
import {
	isTransientError,
	isLockedResponse,
	getMaxRetries,
	getRetryDelay,
	WAIT_POLL_MS,
	WAIT_CAP_MS,
} from '../../utils/import-retry';
import {
	getImportRunState,
	resetImportStepTracking,
	resetImportRunState,
	setImportRunning,
} from '../../utils/import-run-state';

/**
 * Upper bound for one wizard-state save before the import, in milliseconds.
 * A save that does not answer in time counts as failed.
 */
const STATE_SAVE_TIMEOUT_MS = 15000;

/**
 * Name of the error raised when a Wait reaches WAIT_CAP_MS. The loop handles
 * it as one transient failure. Its message is empty, so a step that fails on
 * it shows the generic import error, never the lock string.
 */
const WAIT_TIMEOUT_ERROR_NAME = 'WaitTimeoutError';

/**
 * Send email opt-in subscriber to Lindris through aThemes proxy.
 *
 * @param {Object} wizardData The wizard state data.
 * @return {Promise<void>}
 */
const sendEmailToLindris = async ( wizardData ) => {
	const optinData = wizardData.optin || {};
	const email = optinData.email;

	if ( ! email ) {
		return;
	}

	const theme =
		window.atssOnboarding?.themeName || 'Unknown';

	try {
		await fetch(
			'https://athemes.com/wp-json/wpf-api/v1/starter-sites/subscribe',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify( {
					email,
					theme,
				} ),
			}
		);
	} catch ( error ) {
		// eslint-disable-next-line no-console
		console.warn( 'Lindris opt-in failed:', error );
	}
};

/**
 * Plugin paths for the no-starter flow.
 * Used when installing fallback plugins without a demo config.
 */
const FALLBACK_PLUGIN_PATHS = {
	woocommerce: { path: 'woocommerce/woocommerce.php', name: 'WooCommerce' },
	'wpforms-lite': { path: 'wpforms-lite/wpforms.php', name: 'WPForms Lite' },
	'all-in-one-seo-pack': { path: 'all-in-one-seo-pack/all_in_one_seo_pack.php', name: 'All in One SEO' },
	'wpconsent-cookies-banner-privacy-suite': { path: 'wpconsent-cookies-banner-privacy-suite/wpconsent.php', name: 'WPConsent' },
	duplicator: { path: 'duplicator/duplicator.php', name: 'Duplicator' },
	'sugar-calendar-lite': { path: 'sugar-calendar-lite/sugar-calendar-lite.php', name: 'Sugar Calendar Lite' },
	merchant: { path: 'merchant/merchant.php', name: 'Merchant' },
};

const NON_INSTALLABLE_PLUGIN_SLUGS = [ 'gutenberg' ];

/**
 * Actions of the import steps besides plugins that Soft-fail: once their
 * Retries are used up, the import records an Issue and continues.
 */
const SOFT_FAILING_STEP_ACTIONS = [
	'atss_import_widgets',
	'atss_import_customizer',
	'atss_apply_wizard_customizations',
];

/**
 * Build the import steps array based on wizard data.
 *
 * @param {Object} wizardData The wizard state data.
 * @param {string} builder    The selected builder.
 * @return {Array} Array of import step objects.
 */
const getImportSteps = ( wizardData, builder ) => {
	const steps = [];
	const demos = window.atssOnboarding && window.atssOnboarding.demos ? window.atssOnboarding.demos : {};
	const demoId = wizardData.design && wizardData.design.selectedSiteId ? wizardData.design.selectedSiteId : '';
	const customize = wizardData.customize || {};
	const cleanInstall = customize.cleanInstall || false;
	const features = wizardData.features || {};
	const selectedPlugins = features.selectedPlugins || [];

	// 1. Start import (only when importing a starter — PHP validates demo_id).
	if ( demoId ) {
		steps.push( {
			action: 'atss_import_start',
			log: __( 'Starting import...', 'athemes-starter-sites' ),
			priority: 1,
		} );
	}

	// 2. Clean previous import (conditional — only when a starter is being imported).
	if ( cleanInstall && demoId ) {
		steps.push( {
			action: 'atss_import_clean',
			log: __( 'Cleaning previous import...', 'athemes-starter-sites' ),
			priority: 2,
		} );
	}

	// 3. Install plugins.
	if ( demoId ) {
		// Demo-based plugin install.
		const demo = demos[ demoId ];
		if ( demo && demo.plugins && selectedPlugins.length > 0 ) {
			const fallbackPlugins = {
				'elementor': {
					slug: 'elementor',
					path: 'elementor/elementor.php',
					name: 'Elementor',
				},
				'all-in-one-seo-pack': {
					slug: 'all-in-one-seo-pack',
					path: 'all-in-one-seo-pack/all_in_one_seo_pack.php',
					name: 'All in One SEO',
				},
				'athemes-blocks': {
					slug: 'athemes-blocks',
					path: 'athemes-blocks/athemes-blocks.php',
					name: 'aThemes Blocks',
				},
				'athemes-addons-for-elementor-lite': {
					slug: 'athemes-addons-for-elementor-lite',
					path: 'athemes-addons-for-elementor-lite/athemes-addons-elementor.php',
					name: 'aThemes Addons',
				},
				'wpconsent-cookies-banner-privacy-suite': {
					slug: 'wpconsent-cookies-banner-privacy-suite',
					path: 'wpconsent-cookies-banner-privacy-suite/wpconsent.php',
					name: 'WPConsent',
				},
				duplicator: {
					slug: 'duplicator',
					path: 'duplicator/duplicator.php',
					name: 'Duplicator',
				},
			};

			selectedPlugins.forEach( ( slug ) => {
				let plugin = demo.plugins.find( ( p ) => p.slug === slug );
				if ( ! plugin && fallbackPlugins[ slug ] ) {
					plugin = fallbackPlugins[ slug ];
				}
				if ( plugin ) {
					steps.push( {
						action: 'atss_import_plugin',
						slug: plugin.slug,
						path: plugin.path,
						name: plugin.name,
						log: __( 'Installing', 'athemes-starter-sites' ) + ' ' + plugin.name + '...',
						priority: 3,
					} );
				}
			} );
		}
	} else if ( selectedPlugins.length > 0 ) {
		// No-starter flow: install from fallback paths.
		selectedPlugins.forEach( ( slug ) => {
			if ( NON_INSTALLABLE_PLUGIN_SLUGS.includes( slug ) ) {
				return;
			}
			const info = FALLBACK_PLUGIN_PATHS[ slug ];
			if ( info ) {
				steps.push( {
					action: 'atss_import_plugin',
					slug: slug,
					path: info.path,
					name: info.name,
					log: __( 'Installing', 'athemes-starter-sites' ) + ' ' + info.name + '...',
					priority: 3,
				} );
			}
		} );
	}

	// 4-6. Content, widgets, customizer — only when importing a starter.
	if ( demoId ) {
		steps.push( {
			action: 'atss_import_contents',
			log: __( 'Importing content...', 'athemes-starter-sites' ),
			priority: 4,
		} );

		steps.push( {
			action: 'atss_import_widgets',
			log: __( 'Importing widgets...', 'athemes-starter-sites' ),
			priority: 5,
		} );

		steps.push( {
			action: 'atss_import_customizer',
			log: __( 'Importing customizer settings...', 'athemes-starter-sites' ),
			priority: 6,
		} );
	}

	// 7. Apply wizard customizations (logo, colors, typography, site title).
	steps.push( {
		action: 'atss_apply_wizard_customizations',
		log: __( 'Applying your customizations...', 'athemes-starter-sites' ),
		priority: 7,
	} );

	// 8. Finish import (only when importing a starter — PHP validates demo_id).
	if ( demoId ) {
		steps.push( {
			action: 'atss_import_finish',
			log: isBotiga ?
				__( 'Compiling Composer Elements', 'athemes-starter-sites' ) :
				__( 'Finishing import...', 'athemes-starter-sites' ),
			priority: 8,
		} );
	}

	return steps;
};

/**
 * Key that identifies an import step across attempts.
 *
 * @param {Object} step Import step from getImportSteps().
 * @return {string} The step's action, plus its slug for plugin steps.
 */
const getStepKey = ( step ) => (
	'atss_import_plugin' === step.action ? `${ step.action }:${ step.slug }` : step.action
);

/**
 * Issue recorded when an import step Soft-fails.
 *
 * @param {Object} step Import step from getImportSteps().
 * @return {Object} The plugin's slug, path and name for a plugin step, the action for any other step.
 */
const getStepIssue = ( step ) => (
	'atss_import_plugin' === step.action ?
		{ type: 'plugin', slug: step.slug, path: step.path, name: step.name } :
		{ type: 'step', action: step.action }
);

// Run state of the import for the life of the page (see import-run-state.js).
// Its identity never changes, so it can be held here.
const importRunState = getImportRunState();

/**
 * Import step component.
 *
 * @param {Object}   props            Component props.
 * @param {Function} props.onContinue Callback when import is complete.
 * @param {Function} props.onImportingChange Callback when import is started or stopped.
 * @return {JSX.Element} Import component.
 */
function Import( { onContinue, onImportingChange } ) {
	const { wizardData, setIsImportComplete, builder, saveState } = useWizard();
	const [ progress, setProgress ] = useState( 0 );
	const [ status, setStatus ] = useState( __( 'Preparing import...', 'athemes-starter-sites' ) );
	const [ isComplete, setIsComplete ] = useState( false );
	const [ error, setError ] = useState( null );
	const [ importStarted, setImportStarted ] = useState( false );

	// Issues of the completed import, shown on the completion screen.
	const [ completedIssues, setCompletedIssues ] = useState( [] );

	// Unmounting ends a pending Retry delay or Wait poll, and the loop stops.
	const isMountedRef = useRef( true );
	const cancelDelayRef = useRef( null );

	// The latest onImportingChange, so unmounting can clear the importing flag.
	const onImportingChangeRef = useRef( onImportingChange );

	useEffect( () => {
		onImportingChangeRef.current = onImportingChange;
	}, [ onImportingChange ] );

	useEffect( () => {
		isMountedRef.current = true;

		return () => {
			isMountedRef.current = false;

			if ( cancelDelayRef.current ) {
				cancelDelayRef.current();
			}

			// The loop returns without clearing the flags once unmounted.
			onImportingChangeRef.current?.( false );
			setImportRunning( false );
		};
	}, [] );

	/**
	 * Wait for a delay that ends early when the component unmounts.
	 * Callers check isMountedRef afterwards.
	 *
	 * @param {number} ms Delay in milliseconds.
	 * @return {Promise<void>}
	 */
	const delay = ( ms ) => new Promise( ( resolve ) => {
		if ( ! isMountedRef.current ) {
			resolve();
			return;
		}

		let timeoutId = null;
		const finish = () => {
			clearTimeout( timeoutId );
			cancelDelayRef.current = null;
			resolve();
		};

		timeoutId = setTimeout( finish, ms );
		cancelDelayRef.current = finish;
	} );

	// Get import configuration from wizard data.
	const design = wizardData.design || {};
	const demoId = design.selectedSiteId || '';
	const selectedBuilder = builder || 'gutenberg';

	/**
	 * Get safe import metrics metadata.
	 *
	 * @param {Object} extraMetadata Extra metadata.
	 * @return {Object} Import metrics metadata.
	 */
	const getImportMetricsMetadata = ( extraMetadata = {} ) => {
		const pages = wizardData.pages || {};
		const features = wizardData.features || {};
		const optin = wizardData.optin || {};
		const selectedPages = pages.selectedPages || [];
		const selectedPlugins = features.selectedPlugins || [];

		return {
			builder: selectedBuilder,
			step: 'import',
			demo_id: demoId,
			has_selected_starter: !! demoId,
			selected_pages_count: selectedPages.length,
			selected_plugins_count: selectedPlugins.length,
			optin_checked: !! optin.optinChecked,
			import_attempt: importRunState.attempt,
			...extraMetadata,
		};
	};

	/**
	 * Execute the import steps sequentially.
	 */
	const executeImport = useCallback( async () => {
		const allSteps = getImportSteps( wizardData, selectedBuilder );

		// The stored run state belongs to one set of choices. Changed choices
		// start a new import at attempt 1.
		const signature = JSON.stringify( [ demoId, selectedBuilder, allSteps.map( getStepKey ) ] );

		// This import already finished: show its completion screen again,
		// without requests or telemetry.
		if ( importRunState.finishedSignature === signature ) {
			setCompletedIssues( importRunState.finishedIssues );
			setIsComplete( true );
			setIsImportComplete( true );

			// Continuing through the wizard after the import saved the state
			// again. Delete it, so a later visit cannot resume and rerun this
			// import. A failed deletion leaves the completion screen as it is.
			try {
				await deleteWizardState();
			} catch ( err ) {
				// eslint-disable-next-line no-console
				console.warn( 'Could not clear the wizard state after import:', err.name );
			}

			return;
		}

		// Also forgets a finished import with other choices.
		if ( importRunState.signature !== signature ) {
			resetImportRunState();
			importRunState.signature = signature;
		}

		importRunState.attempt += 1;

		onImportingChange?.( true );
		setImportRunning( true );

		// First run only: a Try Again or a remount must not repeat the started
		// event or the opt-in, or rewrite the state.
		if ( 1 === importRunState.attempt ) {
			// Sent before the state save, so a save failure follows it in the session's events.
			trackOnboardingEvent(
				'onboarding_import_started',
				getImportMetricsMetadata()
			);

			// Send email to Lindris first (non-blocking).
			sendEmailToLindris( wizardData );

			// Persist the wizard state before the import: the contents step reads
			// the selected pages and the contact data from it. One retry, then
			// continue, since the import can still run on defaults. A save that
			// does not answer within STATE_SAVE_TIMEOUT_MS counts as failed.
			const saveStateInTime = () => {
				let timeoutId = null;
				const timeout = new Promise( ( resolve ) => {
					timeoutId = setTimeout( () => resolve( false ), STATE_SAVE_TIMEOUT_MS );
				} );

				return Promise.race( [ saveState(), timeout ] ).finally( () => clearTimeout( timeoutId ) );
			};

			let stateSaved = await saveStateInTime();

			if ( ! stateSaved ) {
				await delay( 2000 );

				if ( ! isMountedRef.current ) {
					return;
				}

				stateSaved = await saveStateInTime();
			}

			if ( ! isMountedRef.current ) {
				return;
			}

			if ( ! stateSaved ) {
				trackOnboardingEvent(
					'onboarding_import_failed',
					getImportMetricsMetadata( {
						import_step: 'atss_save_wizard_state',
						error_code: 'wizard_state_save_failed',
						retry_count: 1,
					} )
				);
			}
		}

		if ( allSteps.length === 0 ) {
			trackOnboardingEvent(
				'onboarding_import_failed',
				getImportMetricsMetadata( {
					import_step: '',
					error_code: 'no_import_steps_configured',
					retry_count: 0,
				} )
			);

			setError( __( 'No import steps configured.', 'athemes-starter-sites' ) );
			onImportingChange?.( false );
			setImportRunning( false );
			return;
		}

		let steps = allSteps;

		// Try Again, or a remount, resumes at the step the last run stopped at
		// (failed fatally, or was in flight when unmounted) and runs every step
		// after it. Of the earlier steps, only plugins that did not complete run
		// again: a Soft-failed widgets, customizer or customizations step keeps
		// its Issue, and a completed atss_import_clean never runs again.
		if ( importRunState.attempt > 1 ) {
			const completedKeys = importRunState.completedStepKeys;
			const resumeIndex = allSteps.findIndex( ( step ) => getStepKey( step ) === importRunState.resumeStepKey );

			steps = resumeIndex >= 0 ?
				allSteps.filter( ( step, index ) =>
					index >= resumeIndex ||
					( 'atss_import_plugin' === step.action && ! completedKeys.has( getStepKey( step ) ) )
				) :
				// The last run stopped before its first step: run every step
				// that did not complete.
				allSteps.filter( ( step ) => ! completedKeys.has( getStepKey( step ) ) );

			// A step that runs again drops its Issue, and records it again if it
			// fails again. When resuming, only plugin Issues can match: every
			// Soft-failed step lies before the resume point.
			const runKeys = steps.map( getStepKey );

			importRunState.issues = importRunState.issues.filter( ( issue ) => ! runKeys.includes(
				'plugin' === issue.type ?
					getStepKey( { action: 'atss_import_plugin', slug: issue.slug } ) :
					issue.action
			) );
		}

		let currentStep = 0;

		// Per step, both since its last successful response: the Retries used
		// (see import-retry.js for the budgets), and the time spent Waiting on
		// an import lock held by an earlier request.
		const retryCounts = {};
		const waitClocksMs = {};

		// True while the next request is a Wait poll: the Wait status stays up.
		let isWaiting = false;

		while ( currentStep < steps.length ) {
			const step = steps[ currentStep ];

			// A run that stops here, by a fatal failure or by an unmount,
			// resumes here. The resume point never moves back: an earlier plugin
			// that runs again before it leaves it where it is.
			const resumeIndex = allSteps.findIndex( ( listed ) => getStepKey( listed ) === importRunState.resumeStepKey );

			if ( allSteps.indexOf( step ) > resumeIndex ) {
				importRunState.resumeStepKey = getStepKey( step );
			}

			// Update UI. Progress counts against the full step list, so a
			// resumed run starts where the failed one stopped.
			if ( ! isWaiting ) {
				setStatus( step.log );
			}
			isWaiting = false;
			setProgress( Math.round( ( allSteps.indexOf( step ) / allSteps.length ) * 100 ) );

			try {
				// Execute the AJAX request.
				const response = await importAjaxRequest( {
					...step,
					demo_id: demoId,
					builder_type: selectedBuilder,
				} );

				if ( ! isMountedRef.current ) {
					return;
				}

				// An earlier request still holds the import lock: Wait, then ask
				// again. A Wait uses no Retry and sends no failure event.
				if ( isLockedResponse( response ) ) {
					const waitedMs = waitClocksMs[ currentStep ] || 0;

					if ( waitedMs < WAIT_CAP_MS ) {
						waitClocksMs[ currentStep ] = waitedMs + WAIT_POLL_MS;
						setStatus( __( 'Finishing the previous step…', 'athemes-starter-sites' ) );

						await delay( WAIT_POLL_MS );

						if ( ! isMountedRef.current ) {
							return;
						}

						isWaiting = true;
						continue;
					}

					// A Wait that reached its cap counts as one transient failure.
					waitClocksMs[ currentStep ] = 0;

					const waitTimeoutError = new Error();
					waitTimeoutError.name = WAIT_TIMEOUT_ERROR_NAME;
					waitTimeoutError.responseSnippet = response.data;
					throw waitTimeoutError;
				}

				const retryCount = retryCounts[ currentStep ] || 0;

				// Check for errors.
				if ( response && response.success === false ) {
					// Widgets, the customizer and the customizations must not abort
					// the import: record an Issue and continue.
					if ( SOFT_FAILING_STEP_ACTIONS.includes( step.action ) ) {
						trackOnboardingEvent(
							'onboarding_import_failed',
							getImportMetricsMetadata( {
								import_step: step.action,
								error_code: 'non_critical_import_step_failed',
								error_message:
									typeof response.data === 'string'
										? response.data
										: response.data?.message || '',
								retry_count: retryCount,
							} )
						);

						importRunState.issues.push( getStepIssue( step ) );

						// eslint-disable-next-line no-console
						console.warn( 'Non-critical import step failed:', step.action, response.data );
						currentStep++;
						continue;
					}

					// For plugin installs, record an Issue and continue.
					if ( step.action === 'atss_import_plugin' ) {
						trackOnboardingEvent(
							'onboarding_import_failed',
							getImportMetricsMetadata( {
								import_step: step.action,
								error_code: 'plugin_installation_failed',
								error_message: typeof response.data === 'string' ? response.data : '',
								plugin_slug: step.slug || '',
								retry_count: retryCount,
							} )
						);

						importRunState.issues.push( getStepIssue( step ) );

						// eslint-disable-next-line no-console
						console.warn( 'Plugin installation failed:', step.slug, response.data );
						currentStep++;
						continue;
					}

					// For other steps, show error.
					throw new Error( response.data || __( 'Import step failed.', 'athemes-starter-sites' ) );
				}

				// A successful response, including a newAJAX Chunk, resets the step's
				// Retry count and Wait clock, so both bound consecutive failures only.
				retryCounts[ currentStep ] = 0;
				waitClocksMs[ currentStep ] = 0;

				// A plugin that just activated may have armed a one-shot admin_init
				// redirect (WPConsent-class onboarding). Absorb it here, outside the
				// retry/error handling above, so it can never fail this step or
				// consume its retry budget, and the next real step isn't truncated.
				if ( step.action === 'atss_import_plugin' ) {
					await drainActivationRedirects();

					if ( ! isMountedRef.current ) {
						return;
					}
				}

				// Handle newAJAX response (content import needs multiple calls).
				if ( response && response.status === 'newAJAX' ) {
					// Don't increment step, retry the same step.
					continue;
				}

				importRunState.completedStepKeys.add( getStepKey( step ) );

				trackOnboardingEvent(
					'onboarding_import_step_completed',
					getImportMetricsMetadata( {
						import_step: step.action,
						plugin_slug: step.action === 'atss_import_plugin' ? step.slug || '' : undefined,
					} )
				);

				// Move to next step.
				currentStep++;

			} catch ( err ) {
				if ( ! isMountedRef.current ) {
					return;
				}

				// eslint-disable-next-line no-console
				console.error( 'Import error:', err );

				const isTransient = WAIT_TIMEOUT_ERROR_NAME === err.name || isTransientError( err );
				const maxRetries = getMaxRetries( step.action );
				const retryNumber = ( retryCounts[ currentStep ] || 0 ) + 1;

				// Retry a transient failure after a growing delay while the step's
				// budget lasts. No failure event is sent before it is used up.
				if ( isTransient && retryNumber <= maxRetries ) {
					retryCounts[ currentStep ] = retryNumber;

					setStatus(
						sprintf(
							/* translators: 1: Retry number, 2: number of Retries for this step. */
							__( 'Server busy. Retrying (%1$d of %2$d)…', 'athemes-starter-sites' ),
							retryNumber,
							maxRetries
						)
					);

					// eslint-disable-next-line no-console
					console.log( 'Import step failed transiently, retrying...', step.action, err.name );

					await delay( getRetryDelay( retryNumber ) );

					if ( ! isMountedRef.current ) {
						return;
					}

					continue;
				}

				// Retries used up, or a permanent failure: Soft-failed steps are
				// skipped below, every other step falls through to the fatal path.
				const retryCount = retryCounts[ currentStep ] || 0;

				// A single optional plugin must not abort the whole import, whatever
				// the request failed with: a plugin activated by an earlier step can
				// fatal and answer the next request with an HTTP 500.
				if ( step.action === 'atss_import_plugin' ) {
					trackOnboardingEvent(
						'onboarding_import_failed',
						getImportMetricsMetadata( {
							import_step: step.action,
							error_code: 'AbortError' === err.name ? 'plugin_installation_timeout' : 'plugin_installation_request_failed',
							error_message: err.message || '',
							http_status: err.status || 0,
							response_snippet: err.responseSnippet || '',
							plugin_slug: step.slug || '',
							retry_count: retryCount,
						} )
					);

					importRunState.issues.push( getStepIssue( step ) );

					// eslint-disable-next-line no-console
					console.warn( 'Plugin installation failed, skipping:', step.slug, err.name );
					currentStep++;
					continue;
				}

				// Widgets, the customizer and the customizations are skipped with an
				// Issue instead of aborting the whole import when the request failed.
				if ( SOFT_FAILING_STEP_ACTIONS.includes( step.action ) ) {
					trackOnboardingEvent(
						'onboarding_import_failed',
						getImportMetricsMetadata( {
							import_step: step.action,
							error_code: 'non_critical_import_step_failed',
							error_message: err.message || '',
							http_status: err.status || 0,
							response_snippet: err.responseSnippet || '',
							retry_count: retryCount,
						} )
					);

					importRunState.issues.push( getStepIssue( step ) );

					// eslint-disable-next-line no-console
					console.warn( 'Non-critical import step request failed, skipping:', step.action, err.name );
					currentStep++;
					continue;
				}

				trackOnboardingEvent(
					'onboarding_import_failed',
					getImportMetricsMetadata( {
						import_step: step.action,
						error_code: err.name || 'import_step_failed',
						error_message: err.message || '',
						http_status: err.status || 0,
						response_snippet: err.responseSnippet || '',
						plugin_slug: step.action === 'atss_import_plugin' ? step.slug || '' : undefined,
						retry_count: retryCount,
					} )
				);

				setError( err.message || __( 'An error occurred during import.', 'athemes-starter-sites' ) );
				onImportingChange?.( false );
				setImportRunning( false );
				return;
			}
		}

		// Every step ran: nothing resumes, and a remount from here on shows the
		// completion screen instead of importing again.
		const issues = importRunState.issues;

		importRunState.resumeStepKey = null;
		importRunState.finishedSignature = signature;
		importRunState.finishedIssues = issues;

		// No-starter flow: clear wizard state (atss_import_finish handles this for starter flow).
		// The import itself is already done by this point, so a failed cleanup
		// must never strand the wizard short of the completion screen.
		if ( ! demoId ) {
			try {
				await deleteWizardState();
			} catch ( err ) {
				// eslint-disable-next-line no-console
				console.warn( 'Could not clear the wizard state after import:', err.name );
			}
		}

		// Import complete.
		// Await the confirmed beacon (bounded, never rejects) before the session
		// id is reset, so a dropped request is retried under the same session.
		await trackOnboardingEventBlocking(
			'onboarding_import_completed',
			getImportMetricsMetadata( { failed_items_count: issues.length } )
		);

		resetOnboardingMetricsSession();

		// The step tracking is done with. A new import with other choices that
		// started meanwhile has already reset it, and owns it now.
		if ( importRunState.signature === signature ) {
			resetImportStepTracking();
		}

		// Unmounted while finishing: the cleanup cleared both flags, and a
		// remount shows the completion screen.
		if ( ! isMountedRef.current ) {
			return;
		}

		setProgress( 100 );
		setStatus( __( 'Import complete!', 'athemes-starter-sites' ) );
		onImportingChange?.( false );
		setImportRunning( false );
		setCompletedIssues( issues );
		setIsComplete( true );
		setIsImportComplete( true );
	}, [ wizardData, demoId, selectedBuilder, setIsImportComplete, onImportingChange, saveState ] );

	/**
	 * Install a plugin listed as an Issue on the completion screen again.
	 *
	 * One request, with no Retry and no Wait: a held import lock counts as a
	 * failed install. No telemetry: the metrics session ended with the import.
	 *
	 * @param {Object} issue Plugin Issue with the plugin's slug and path.
	 * @return {Promise<boolean>} True when the server installed and activated the plugin.
	 */
	const retryPlugin = useCallback( async ( issue ) => {
		const finishedSignature = importRunState.finishedSignature;
		let response = null;

		try {
			response = await importAjaxRequest( {
				action: 'atss_import_plugin',
				slug: issue.slug,
				path: issue.path,
				demo_id: demoId,
				builder_type: selectedBuilder,
			} );
		} catch ( err ) {
			// eslint-disable-next-line no-console
			console.warn( 'Plugin installation retry failed:', issue.slug, err.name );
		}

		// A plugin that just activated may have armed a one-shot redirect.
		await drainActivationRedirects();

		if ( ! response || true !== response.success ) {
			return false;
		}

		// A remount of this import's completion screen no longer lists the plugin.
		if ( importRunState.finishedSignature === finishedSignature ) {
			importRunState.finishedIssues = importRunState.finishedIssues.filter(
				( listed ) => ! ( 'plugin' === listed.type && listed.slug === issue.slug )
			);
		}

		return true;
	}, [ demoId, selectedBuilder ] );

	// Start import on component mount.
	useEffect( () => {
		if ( ! importStarted ) {
			setImportStarted( true );
			executeImport();
		}
	}, [ importStarted, executeImport ] );

	// Error state.
	if ( error ) {
		return (
			<div className="atss-onboarding-wizard__step atss-onboarding-wizard__step--import">
				<main className="atss-onboarding-wizard__step-body">
					<div className="atss-onboarding-wizard__step-body-content">
						<div className="atss-import-error">
							<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<circle cx="12" cy="12" r="10" stroke="#dc2626" strokeWidth="2" />
								<path d="M12 7v6" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
								<circle cx="12" cy="16" r="1" fill="#dc2626" />
							</svg>
							<h2 className="atss-onboarding-wizard__step-body-title text-xl font-medium">
								{ __( 'Import Failed', 'athemes-starter-sites' ) }
							</h2>
							<p className="atss-onboarding-wizard__step-body-description text-sm text-secondary">
								{ error }
							</p>
							<button
								type="button"
								className="atss-button atss-button--primary"
								onClick={ () => {
									onImportingChange?.( false );
									setError( null );
									setImportStarted( false );
								} }
							>
								{ __( 'Try Again', 'athemes-starter-sites' ) }
							</button>
						</div>
					</div>
				</main>
			</div>
		);
	}

	// Completion state.
	if ( isComplete ) {
		return <Complete issues={ completedIssues } onRetryPlugin={ retryPlugin } />;
	}

	const themeText = {
		wizardTitle: isBotiga
			? __( 'We’re Building Your Shop...', 'athemes-starter-sites' )
			: __( 'We Are Building Your Website...', 'athemes-starter-sites' ),
	};

	// Progress state (default).
	return (
		<div className="atss-onboarding-wizard__step atss-onboarding-wizard__step--import">
			<main className="atss-onboarding-wizard__step-body">
				<div className="atss-onboarding-wizard__step-body-content">
					<div className="atss-onboarding-wizard__spinner-circle">
						<Spinner />
					</div>
					<h2 className="atss-onboarding-wizard__step-body-title text-xl font-medium">
						{ themeText.wizardTitle }
					</h2>
					<p className="atss-onboarding-wizard__step-body-description text-sm text-secondary w100">
						{ __( 'Please be patient and don’t refresh this page, the import process may take a while.', 'athemes-starter-sites' ) }
					</p>
					<div className="atss-import-progress">
						<div className="atss-import-progress__header flex justify-between items-center gap-xs">
							<div className="atss-import-progress__status text-md font-medium text-primary">
								{ status }
							</div>
							<div className="atss-import-progress__percentage text-sm text-secondary">
								{ progress }%
							</div>
						</div>
						<div className="atss-import-progress__bar">
							<div
								className="atss-import-progress__fill"
								style={ { '--progress-width': `${ progress }%` } }
							></div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Import;
