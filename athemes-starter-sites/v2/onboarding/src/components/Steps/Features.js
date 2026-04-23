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
import isBotiga from '../../utils/is-botiga';
import getBotigaAvailablePlugins from '../../utils/get-botiga-available-plugins';

/**
 * Fallback plugins shown when no starter site is selected.
 *
 * @param {string} selectedBuilder The selected builder.
 * @return {Array} Fallback plugins list.
 */
const getFallbackPlugins = ( selectedBuilder ) => {
	const fallbackPlugins = [
		{ slug: 'wpforms-lite', name: 'WPForms Lite' },
		{ slug: 'wp-mail-smtp', name: 'WP Mail SMTP' },
		{ slug: 'all-in-one-seo-pack', name: 'All in One SEO' },
		{ slug: 'sugar-calendar-lite', name: 'Sugar Calendar Lite' },
		{ slug: 'merchant', name: 'Merchant' },
	];

	if ( ! isBotiga ) {
		return fallbackPlugins;
	}

	if ( selectedBuilder === 'elementor' ) {
		fallbackPlugins.splice( 1, 0, {
			slug: 'athemes-addons-for-elementor-lite',
			name: 'aThemes Addons for Elementor',
			required: true,
			builder: 'elementor',
		} );

		return fallbackPlugins;
	}

	fallbackPlugins.splice( 1, 0, {
		slug: 'athemes-blocks',
		name: 'aThemes Blocks',
		required: true,
	} );

	return fallbackPlugins;
};

/**
 * Filter plugins by selected builder.
 *
 * @param {Array}  plugins         Plugin list.
 * @param {string} selectedBuilder The selected builder.
 * @return {Array} Filtered plugins.
 */
const filterPluginsByBuilder = ( plugins, selectedBuilder ) => {
	if ( ! Array.isArray( plugins ) ) {
		return [];
	}

	return plugins.filter( ( plugin ) => {
		if ( ! plugin.builder ) {
			return true;
		}

		return plugin.builder === selectedBuilder;
	} );
};

/**
 * Ensure Elementor exists when Elementor is selected.
 *
 * @param {Array}  plugins         Plugin list.
 * @param {string} selectedBuilder The selected builder.
 * @return {Array} Normalized plugins.
 */
const ensureElementorPlugin = ( plugins, selectedBuilder ) => {
	if ( selectedBuilder !== 'elementor' ) {
		return plugins;
	}

	if ( plugins.some( ( plugin ) => plugin.slug === 'elementor' ) ) {
		return plugins;
	}

	return [
		{
			slug: 'elementor',
			name: 'Elementor',
			description: 'The Elementor Website Builder.',
			required: true,
			builder: 'elementor',
		},
		...plugins,
	];
};

/**
 * Ensure the correct Botiga builder addon is present.
 *
 * Limited to Botiga only.
 *
 * @param {Array}  plugins         Plugin list.
 * @param {string} selectedBuilder The selected builder.
 * @return {Array} Normalized plugins.
 */
const ensureBotigaBuilderAddonPlugin = ( plugins, selectedBuilder ) => {
	if ( ! isBotiga ) {
		return plugins;
	}

	const addonSlug = selectedBuilder === 'elementor'
		? 'athemes-addons-for-elementor-lite'
		: 'athemes-blocks';

	const excludedSlug = selectedBuilder === 'elementor'
		? 'athemes-blocks'
		: 'athemes-addons-for-elementor-lite';

	const normalizedPlugins = plugins.filter(
		( plugin ) => plugin.slug !== excludedSlug
	);

	if ( normalizedPlugins.some( ( plugin ) => plugin.slug === addonSlug ) ) {
		return normalizedPlugins;
	}

	return [
		{
			slug: addonSlug,
			name: addonSlug === 'athemes-addons-for-elementor-lite'
				? 'aThemes Addons for Elementor'
				: 'aThemes Blocks',
			required: true,
			builder: selectedBuilder === 'elementor' ? 'elementor' : undefined,
		},
		...normalizedPlugins,
	];
};

/**
 * Get initial selected plugins.
 *
 * @param {Array} plugins Plugin list.
 * @return {Array} Initial selected plugin slugs.
 */
const getInitialSelection = ( plugins ) => {
	return plugins
		.filter( ( plugin ) => {
			if ( plugin.required === true || plugin.isSelected === true ) {
				return true;
			}

			return pluginInfo[ plugin.slug ]?.default === true;
		} )
		.map( ( plugin ) => plugin.slug );
};

/**
 * Features step component.
 *
 * @param {Object}   props                   Component props.
 * @param {Function} props.onBack            Callback to go to previous step.
 * @param {Function} props.onSkip            Callback to skip this step.
 * @param {Function} props.onContinue        Callback to proceed to next step.
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

	const themeText = {
		wizardDescription: isBotiga
			? __( 'We have selected some recommended tools and features to help take your site to the next level.', 'athemes-starter-sites' )
			: __( 'We have selected some recommended plugins to help take your site to the next level.', 'athemes-starter-sites' ),
	};

	// Get the currently selected demo from wizard context.
	const selectedSiteId = wizardData?.design?.selectedSiteId;

	// Get the selected builder from context
	const selectedBuilder = builder || 'gutenberg';

	// Detect if builder has changed
	const hasBuilderChanged = previousBuilder !== selectedBuilder;

	useEffect( () => {
		const savedSelection = wizardData?.features?.selectedPlugins;
		let availablePlugins = [];

		if ( isBotiga ) {
			const demo = selectedSiteId && window.atssOnboarding?.demos
				? window.atssOnboarding.demos[ selectedSiteId ]
				: null;

			const demoPlugins = ensureElementorPlugin(
				filterPluginsByBuilder( demo?.plugins, selectedBuilder ),
				selectedBuilder
			);

			availablePlugins = getBotigaAvailablePlugins( demoPlugins, selectedBuilder );
			availablePlugins = ensureBotigaBuilderAddonPlugin(
				availablePlugins,
				selectedBuilder
			);

			setPlugins( availablePlugins );

			const initialSelection = getInitialSelection( availablePlugins );

			if ( hasBuilderChanged ) {
				setSelectedPlugins( initialSelection );
				setPreviousBuilder( selectedBuilder );
			} else {
				setSelectedPlugins( savedSelection || initialSelection );
			}

			setLoading( false );
			return;
		}

		if ( selectedSiteId && window.atssOnboarding?.demos ) {
			const demo = window.atssOnboarding.demos[ selectedSiteId ];

			if ( demo && demo.plugins && Array.isArray( demo.plugins ) && demo.plugins.length > 0 ) {
				availablePlugins = filterPluginsByBuilder( demo.plugins, selectedBuilder );
				availablePlugins = ensureElementorPlugin( availablePlugins, selectedBuilder );

				setPlugins( availablePlugins );

				const initialSelection = getInitialSelection( availablePlugins );

				if ( hasBuilderChanged ) {
					setSelectedPlugins( initialSelection );
					setPreviousBuilder( selectedBuilder );
				} else {
					setSelectedPlugins( savedSelection || initialSelection );
				}

				setLoading( false );
				return;
			}
		}

		availablePlugins = getFallbackPlugins( selectedBuilder );

		setPlugins( availablePlugins );

		const initialSelection = getInitialSelection( availablePlugins );

		if ( hasBuilderChanged ) {
			setSelectedPlugins( initialSelection );
			setPreviousBuilder( selectedBuilder );
		} else {
			setSelectedPlugins( savedSelection || initialSelection );
		}

		setLoading( false );
	}, [ selectedSiteId, selectedBuilder, hasBuilderChanged, wizardData?.features?.selectedPlugins ] );

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
							? themeText.wizardDescription
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
