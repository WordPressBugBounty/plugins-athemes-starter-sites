/**
 * Features step component.
 *
 * @package Athemes Starter Sites
 */

import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useWizard } from '../../context/WizardContext';
import { Footer } from '../Layout';
import FeatureCard from '../Layout/FeatureCard';
import PluginSummary from '../Controls/PluginSummary';
import pluginInfo from '../../data/plugin-info';

/**
 * Features step component.
 *
 * @param {Object}   props                  Component props.
 * @param {Function} props.onBack           Callback to go to previous step.
 * @param {Function} props.onSkip           Callback to skip this step.
 * @param {Function} props.onContinue       Callback to proceed to next step.
 * @param {boolean}  props.navigationLoading Whether navigation is in loading state.
 * @param {string}   props.navigationError   Navigation error message.
 * @return {JSX.Element} Features component.
 */
function Features( { onBack, onSkip, onContinue, navigationLoading, navigationError } ) {
	const { wizardData, builder } = useWizard();
	const [plugins, setPlugins] = useState( [] );
	const [selectedPlugins, setSelectedPlugins] = useState( [] );
	const [loading, setLoading] = useState( true );
	const [previousBuilder, setPreviousBuilder] = useState( builder );

	// Get the currently selected demo from wizard context.
	const selectedSiteId = wizardData?.design?.selectedSiteId;

	// Get the selected builder from context
	const selectedBuilder = builder || 'gutenberg';

	// Detect if builder has changed
	const hasBuilderChanged = previousBuilder !== selectedBuilder;

	useEffect( () => {
		// Get plugins for the selected demo.
		if ( selectedSiteId && window.atssOnboarding?.demos ) {
			const demo = window.atssOnboarding.demos[ selectedSiteId ];

			if ( demo && demo.plugins && Array.isArray( demo.plugins ) && demo.plugins.length > 0 ) {
				// Filter plugins by builder if they have a 'builder' property.
				const availablePlugins = demo.plugins.filter( plugin => {
					// If plugin doesn't specify a builder, include it for all builders.
					if ( ! plugin.builder ) {
						return true;
					}
					// If plugin specifies a builder, only include if it matches.
					return plugin.builder === selectedBuilder;
				} );

				// If builder is Elementor and Elementor not already in plugins, add it as required.
				if ( selectedBuilder === 'elementor' && ! availablePlugins.some( p => p.slug === 'elementor' ) ) {
					availablePlugins.unshift( {
						slug: 'elementor',
						name: 'Elementor',
						description: 'The Elementor Website Builder.',
						required: true,
						builder: 'elementor'
					} );
				}

				setPlugins( availablePlugins );

				// Initialize selected plugins - select all required plugins and plugins with default: true in plugin-info.js.
				const initialSelection = availablePlugins
					.filter( plugin => {
						// Include if explicitly required.
						if ( plugin.required === true ) {
							return true;
						}
						// Include if default: true in plugin-info.js.
						if ( pluginInfo[ plugin.slug ]?.default === true ) {
							return true;
						}
						// Exclude if explicitly not required and not default.
						return false;
					} )
					.map( plugin => plugin.slug );

				// If builder has changed, clear saved selection and use fresh initial selection.
				// Otherwise, use saved selection if available.
				const savedSelection = wizardData?.features?.selectedPlugins;
				if ( hasBuilderChanged ) {
					// Builder changed - use fresh initial selection for new builder
					setSelectedPlugins( initialSelection );
					setPreviousBuilder( selectedBuilder );
				} else {
					// Builder hasn't changed - use saved selection or initial selection
					setSelectedPlugins( savedSelection || initialSelection );
				}
			} else {
				// No plugins for this demo.
				setPlugins( [] );
				setSelectedPlugins( [] );
			}
		}

		setLoading( false );
	}, [ selectedSiteId, selectedBuilder, hasBuilderChanged ] );

	/**
	 * Handle plugin selection toggle.
	 *
	 * @param {string} pluginSlug The plugin slug to toggle.
	 */
	const handlePluginToggle = ( pluginSlug ) => {
		setSelectedPlugins( prev => {
			if ( prev.includes( pluginSlug ) ) {
				return prev.filter( slug => slug !== pluginSlug );
			}
			return [ ...prev, pluginSlug ];
		} );
	};

	/**
	 * Handle continue button click.
	 * Saves selected plugins to wizard context and proceeds to Optin step.
	 */
	const handleContinue = () => {
		onContinue( {
			selectedPlugins,
		} );
	};

	/**
	 * Handle skip button click.
	 * Keeps required plugins but skips optional ones.
	 */
	const handleSkip = () => {
		const requiredPlugins = plugins
			.filter( plugin => plugin.required === true )
			.map( plugin => plugin.slug );
		onContinue( {
			selectedPlugins: requiredPlugins,
		} );
	};

	if ( loading ) {
		return (
			<div className="atss-onboarding-wizard__step atss-onboarding-wizard__step--features">
				<main className="atss-onboarding-wizard__step-body">
					<div className="atss-onboarding-wizard__step-body-content w100">
						<div className="atss-onboarding-wizard__loading">
							{ __( 'Loading recommended features...', 'athemes-starter-sites' ) }
						</div>
					</div>
				</main>
			</div>
		);
	}

	return (
		<div className="atss-onboarding-wizard__step atss-onboarding-wizard__step--features">
			<main className="atss-onboarding-wizard__step-body">
				<div className="atss-onboarding-wizard__step-body-content w100">
					<h2 className="atss-onboarding-wizard__step-body-title text-xl font-medium">
						{ __( 'Recommended Features', 'athemes-starter-sites' ) }
					</h2>
					<p className="atss-onboarding-wizard__step-body-description text-sm text-secondary">
						{ plugins.length > 0
							? __( 'We have selected some recommended plugins to help take your site to the next level.', 'athemes-starter-sites' )
							: __( 'No additional plugins are required for this starter site.', 'athemes-starter-sites' )
						}
					</p>

					{ plugins.length > 0 && (
						<div className="atss-features-grid">
							{ plugins.map( ( plugin ) => (
								<FeatureCard
									key={ plugin.slug }
									plugin={ plugin }
									isSelected={ selectedPlugins.includes( plugin.slug ) }
									onToggle={ () => handlePluginToggle( plugin.slug ) }
								/>
							) ) }
						</div>
					) }

					<PluginSummary
						selectedPlugins={ selectedPlugins }
						availablePlugins={ plugins }
					/>
				</div>
			</main>

			<Footer
				showBack={ true }
				showSkip={ true }
				continueText={ __( 'Continue', 'athemes-starter-sites' ) }
				onBack={ onBack }
				onSkip={ handleSkip }
				onContinue={ handleContinue }
				continueLoading={ navigationLoading }
				continueError={ navigationError }
			/>
		</div>
	);
}

export default Features;
