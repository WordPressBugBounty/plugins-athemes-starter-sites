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
import { importAjaxRequest } from '../../utils/api';
import Complete from '../Layout/Complete';

/**
 * Send email to Drip if user opted in.
 * Mirrors the legacy behavior from v2/assets/js/src/script.js
 *
 * @param {Object} wizardData The wizard state data.
 */
const sendEmailToDrip = ( wizardData ) => {
	const optinData = wizardData.optin || {};
	const email = optinData.email;

	// Only send if user provided email and opted in.
	if ( ! email ) {
		return;
	}

	// Ensure Drip is loaded (same account ID as legacy: 5598225).
	if ( typeof window._dcq === 'undefined' ) {
		window._dcq = window._dcq || [];
		window._dcs = window._dcs || {};
		window._dcs.account = 5598225;

		const dc = document.createElement( 'script' );
		dc.type = 'text/javascript';
		dc.async = true;
		dc.src = '//tag.getdrip.com/' + window._dcs.account + '.js';
		document.head.appendChild( dc );
	}

	// Send to Drip with theme name tag (e.g., "Sydney", "Botiga").
	const themeName = window.atssOnboarding && window.atssOnboarding.themeName ? window.atssOnboarding.themeName : 'Unknown';
	window._dcq.push( [ 'identify', {
		email: email,
		tags: [ themeName ],
	} ] );
};

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

	// 1. Start import.
	steps.push( {
		action: 'atss_import_start',
		log: __( 'Starting import...', 'athemes-starter-sites' ),
		priority: 1,
	} );

	// 2. Clean previous import (conditional).
	if ( cleanInstall ) {
		steps.push( {
			action: 'atss_import_clean',
			log: __( 'Cleaning previous import...', 'athemes-starter-sites' ),
			priority: 2,
		} );
	}

	// 3. Install plugins (one step per plugin).
	const demo = demos[ demoId ];
	if ( demo && demo.plugins && selectedPlugins.length > 0 ) {
		// Fallback plugins that may be dynamically added (e.g., Elementor when selected as builder).
		const fallbackPlugins = {
			'elementor': {
				slug: 'elementor',
				path: 'elementor/elementor.php',
				name: 'Elementor',
			},
		};

		selectedPlugins.forEach( ( slug ) => {
			let plugin = demo.plugins.find( ( p ) => p.slug === slug );

			// Handle dynamically added plugins not defined in demo.plugins.
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

	// 4. Import content.
	steps.push( {
		action: 'atss_import_contents',
		log: __( 'Importing content...', 'athemes-starter-sites' ),
		priority: 4,
	} );

	// 5. Import widgets.
	steps.push( {
		action: 'atss_import_widgets',
		log: __( 'Importing widgets...', 'athemes-starter-sites' ),
		priority: 5,
	} );

	// 6. Import customizer settings.
	steps.push( {
		action: 'atss_import_customizer',
		log: __( 'Importing customizer settings...', 'athemes-starter-sites' ),
		priority: 6,
	} );

	// 7. Apply wizard customizations (logo, colors, typography, site title).
	steps.push( {
		action: 'atss_apply_wizard_customizations',
		log: __( 'Applying your customizations...', 'athemes-starter-sites' ),
		priority: 7,
	} );

	// 8. Finish import.
	steps.push( {
		action: 'atss_import_finish',
		log: __( 'Finishing import...', 'athemes-starter-sites' ),
		priority: 8,
	} );

	return steps;
};

/**
 * Import step component.
 *
 * @param {Object}   props            Component props.
 * @param {Function} props.onContinue Callback when import is complete.
 * @return {JSX.Element} Import component.
 */
function Import( { onContinue } ) {
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
		// Send email to Drip first (non-blocking).
		sendEmailToDrip( wizardData );

		const steps = getImportSteps( wizardData, selectedBuilder );

		if ( steps.length === 0 ) {
			setError( __( 'No import steps configured.', 'athemes-starter-sites' ) );
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
				return;
			}
		}

		// Import complete.
		setProgress( 100 );
		setStatus( __( 'Import complete!', 'athemes-starter-sites' ) );
		setIsComplete( true );
		setIsImportComplete( true );
	}, [ wizardData, demoId, selectedBuilder, setIsImportComplete ] );

	// Start import on component mount.
	useEffect( () => {
		if ( ! importStarted && demoId ) {
			setImportStarted( true );
			executeImport();
		}
	}, [ importStarted, demoId, executeImport ] );

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

	// Progress state (default).
	return (
		<div className="atss-onboarding-wizard__step atss-onboarding-wizard__step--import">
			<main className="atss-onboarding-wizard__step-body">
				<div className="atss-onboarding-wizard__step-body-content">
					<div className="atss-onboarding-wizard__spinner-circle">
						<Spinner />
					</div>
					<h2 className="atss-onboarding-wizard__step-body-title text-xl font-medium">
						{ __( 'We are building your website...', 'athemes-starter-sites' ) }
					</h2>
					<p className="atss-onboarding-wizard__step-body-description text-sm text-secondary w100">
						{ __( 'Please be patient and don\'t refresh this page, the import process may take a while', 'athemes-starter-sites' ) }
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
