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
import { importAjaxRequest, deleteWizardState } from '../../utils/api';
import Complete from '../Layout/Complete';
import isBotiga from '../../utils/is-botiga';

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
	'wp-mail-smtp': { path: 'wp-mail-smtp/wp_mail_smtp.php', name: 'WP Mail SMTP' },
	'all-in-one-seo-pack': { path: 'all-in-one-seo-pack/all_in_one_seo_pack.php', name: 'All in One SEO' },
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
	 * Execute the import steps sequentially.
	 */
	const executeImport = useCallback( async () => {
		onImportingChange?.( true );

		// Send email to Lindris first (non-blocking).
		sendEmailToLindris( wizardData );

		const steps = getImportSteps( wizardData, selectedBuilder );

		if ( steps.length === 0 ) {
			setError( __( 'No import steps configured.', 'athemes-starter-sites' ) );
			onImportingChange?.( false );
			return;
		}

		let currentStep = 0;

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
						// eslint-disable-next-line no-console
						console.warn( 'Non-critical import step failed:', step.action, response.data );
						currentStep++;
						continue;
					}

					// For plugin installs, log but continue.
					if ( step.action === 'atss_import_plugin' ) {
						// eslint-disable-next-line no-console
						console.warn( 'Plugin installation failed:', step.slug, response.data );
						currentStep++;
						continue;
					}

					// For other steps, show error.
					throw new Error( response.data || __( 'Import step failed.', 'athemes-starter-sites' ) );
				}

				// Handle newAJAX response (content import needs multiple calls).
				if ( response && response.status === 'newAJAX' ) {
					// Don't increment step, retry the same step.
					continue;
				}

				// Move to next step.
				currentStep++;

			} catch ( err ) {
				// eslint-disable-next-line no-console
				console.error( 'Import error:', err );

				// For content timeout, retry once.
				if ( step.action === 'atss_import_contents' && err.name === 'AbortError' ) {
					// eslint-disable-next-line no-console
					console.log( 'Content import timeout, retrying...' );
					continue;
				}

				// For widget timeouts, skip and continue.
				if ( step.action === 'atss_import_widgets' && err.name === 'AbortError' ) {
					// eslint-disable-next-line no-console
					console.warn( 'Widget import timed out, skipping...' );
					currentStep++;
					continue;
				}

				setError( err.message || __( 'An error occurred during import.', 'athemes-starter-sites' ) );
				onImportingChange?.( false );
				return;
			}
		}

		// No-starter flow: clear wizard state (atss_import_finish handles this for starter flow).
		if ( ! demoId ) {
			await deleteWizardState();
		}

		// Import complete.
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
