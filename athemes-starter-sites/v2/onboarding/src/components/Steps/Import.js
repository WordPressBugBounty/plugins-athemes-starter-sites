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

import { useState, useEffect, useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Spinner } from '../Layout';
import { useWizard } from '../../context/WizardContext';
import { importAjaxRequest, deleteWizardState, drainActivationRedirects } from '../../utils/api';
import Complete from '../Layout/Complete';
import isBotiga from '../../utils/is-botiga';
import { trackOnboardingEvent, resetOnboardingMetricsSession } from '../../utils/metrics';

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
 * Import step component.
 *
 * @param {Object}   props            Component props.
 * @param {Function} props.onContinue Callback when import is complete.
 * @param {Function} props.onImportingChange Callback when import is started or stopped.
 * @return {JSX.Element} Import component.
 */
function Import( { onContinue, onImportingChange } ) {
	const { wizardData, setIsImportComplete, builder } = useWizard();
	const [ progress, setProgress ] = useState( 0 );
	const [ status, setStatus ] = useState( __( 'Preparing import...', 'athemes-starter-sites' ) );
	const [ isComplete, setIsComplete ] = useState( false );
	const [ error, setError ] = useState( null );
	const [ importStarted, setImportStarted ] = useState( false );

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
			...extraMetadata,
		};
	};

	/**
	 * Execute the import steps sequentially.
	 */
	const executeImport = useCallback( async () => {
		onImportingChange?.( true );

		// Send email to Lindris first (non-blocking).
		sendEmailToLindris( wizardData );

		const steps = getImportSteps( wizardData, selectedBuilder );

		trackOnboardingEvent(
			'onboarding_import_started',
			getImportMetricsMetadata()
		);

		if ( steps.length === 0 ) {
			trackOnboardingEvent(
				'onboarding_import_failed',
				getImportMetricsMetadata( {
					import_step: '',
					error_code: 'no_import_steps_configured',
				} )
			);

			setError( __( 'No import steps configured.', 'athemes-starter-sites' ) );
			onImportingChange?.( false );
			return;
		}

		let currentStep = 0;

		// Bounded retry budget for steps that fail transiently: the request timed
		// out (AbortError), a plugin installed by an earlier step redirected the
		// request to its own admin screen (RedirectError), stray output corrupted
		// the JSON body (SyntaxError), or the connection dropped before any
		// response arrived (TypeError, what fetch() rejects with per spec). All
		// are one-shot in practice, so a single repeat of the step usually
		// succeeds.
		const maxTransientRetries = {
			atss_import_contents: 2,
			atss_import_plugin: 1,
		};
		const transientErrorNames = [ 'AbortError', 'RedirectError', 'SyntaxError' ];
		const transientRetryCounts = {};

		// A TypeError only counts as transient when it came from the network
		// layer: fetch() rejects with a status-less TypeError when the request
		// never completed. A TypeError carrying a status came out of response
		// handling and is a code bug, which retrying cannot fix.
		const isTransientError = ( err ) =>
			transientErrorNames.includes( err.name ) ||
			( 'TypeError' === err.name && undefined === err.status );

		while ( currentStep < steps.length ) {
			const step = steps[ currentStep ];

			// Update UI.
			setStatus( step.log );
			setProgress( Math.round( ( currentStep / steps.length ) * 100 ) );

			try {
				// Execute the AJAX request.
				const response = await importAjaxRequest( {
					...step,
					demo_id: demoId,
					builder_type: selectedBuilder,
				} );

				// Check for errors.
				if ( response && response.success === false ) {
					// For widget and customizer imports, log but don't block.
					if ( step.action === 'atss_import_widgets' || step.action === 'atss_import_customizer' ) {
						trackOnboardingEvent(
							'onboarding_import_failed',
							getImportMetricsMetadata( {
								import_step: step.action,
								error_code: 'non_critical_import_step_failed',
								error_message:
									typeof response.data === 'string'
										? response.data
										: response.data?.message || '',
							} )
						);

						// eslint-disable-next-line no-console
						console.warn( 'Non-critical import step failed:', step.action, response.data );
						currentStep++;
						continue;
					}

					// For plugin installs, log but continue.
					if ( step.action === 'atss_import_plugin' ) {
						trackOnboardingEvent(
							'onboarding_import_failed',
							getImportMetricsMetadata( {
								import_step: step.action,
								error_code: 'plugin_installation_failed',
								error_message: typeof response.data === 'string' ? response.data : '',
								plugin_slug: step.slug || '',
							} )
						);

						// eslint-disable-next-line no-console
						console.warn( 'Plugin installation failed:', step.slug, response.data );
						currentStep++;
						continue;
					}

					// For other steps, show error.
					throw new Error( response.data || __( 'Import step failed.', 'athemes-starter-sites' ) );
				}

				// A successful request resets the step's retry budget, so the bound
				// applies to consecutive transient failures only.
				transientRetryCounts[ currentStep ] = 0;

				// A plugin that just activated may have armed a one-shot admin_init
				// redirect (WPConsent-class onboarding). Absorb it here, outside the
				// retry/error handling above, so it can never fail this step or
				// consume its retry budget, and the next real step isn't truncated.
				if ( step.action === 'atss_import_plugin' ) {
					await drainActivationRedirects();
				}

				// Handle newAJAX response (content import needs multiple calls).
				if ( response && response.status === 'newAJAX' ) {
					// Don't increment step, retry the same step.
					continue;
				}

				trackOnboardingEvent(
					'onboarding_import_step_completed',
					getImportMetricsMetadata( {
						import_step: step.action,
					} )
				);

				// Move to next step.
				currentStep++;

			} catch ( err ) {
				// eslint-disable-next-line no-console
				console.error( 'Import error:', err );

				const isTransient = isTransientError( err );

				// Bounded transient retries for content and plugin steps.
				if ( isTransient && maxTransientRetries[ step.action ] ) {
					transientRetryCounts[ currentStep ] = ( transientRetryCounts[ currentStep ] || 0 ) + 1;

					if ( transientRetryCounts[ currentStep ] <= maxTransientRetries[ step.action ] ) {
						// eslint-disable-next-line no-console
						console.log( 'Import step failed transiently, retrying...', step.action, err.name );
						continue;
					}

					// Retries exhausted: optional steps are skipped below, contents
					// falls through to the fatal path.
				}

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
							plugin_slug: step.slug || '',
						} )
					);

					// eslint-disable-next-line no-console
					console.warn( 'Plugin installation failed, skipping:', step.slug, err.name );
					currentStep++;
					continue;
				}

				// Widgets and the customizer are non-critical: skip them instead of
				// aborting the whole import when the request itself failed.
				if ( step.action === 'atss_import_widgets' || step.action === 'atss_import_customizer' ) {
					trackOnboardingEvent(
						'onboarding_import_failed',
						getImportMetricsMetadata( {
							import_step: step.action,
							error_code: 'non_critical_import_step_failed',
							error_message: err.message || '',
							http_status: err.status || 0,
						} )
					);

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
						plugin_slug: step.action === 'atss_import_plugin' ? step.slug || '' : undefined,
					} )
				);

				setError( err.message || __( 'An error occurred during import.', 'athemes-starter-sites' ) );
				onImportingChange?.( false );
				return;
			}
		}

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
		trackOnboardingEvent(
			'onboarding_import_completed',
			getImportMetricsMetadata()
		);

		resetOnboardingMetricsSession();

		setProgress( 100 );
		setStatus( __( 'Import complete!', 'athemes-starter-sites' ) );
		onImportingChange?.( false );
		setIsComplete( true );
		setIsImportComplete( true );
	}, [ wizardData, demoId, selectedBuilder, setIsImportComplete, onImportingChange ] );

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
									setProgress( 0 );
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
		return <Complete />;
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
