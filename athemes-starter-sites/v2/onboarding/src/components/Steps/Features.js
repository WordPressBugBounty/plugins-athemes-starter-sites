/**
 * Features step component.
 *
 * @package Athemes Starter Sites
 */

import { __ } from '@wordpress/i18n';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useWizard } from '../../context/WizardContext';
import { Footer } from '../Layout';
import FeatureCard from '../Layout/FeatureCard';
import PluginSummary from '../Controls/PluginSummary';
import pluginInfo from '../../data/plugin-info';
import isBotiga from '../../utils/is-botiga';
import getBotigaAvailablePlugins from '../../utils/get-botiga-available-plugins';
import { trackOnboardingEvent } from '../../utils/metrics';

/**
 * Plugins that should always be shown in the onboarding Features step.
 *
 * These are injected at the onboarding layer so the change can apply across
 * Sydney, Botiga, starter-specific flows, and no-starter fallback flows.
 *
 * @type {Array}
 */
const onboardingRecommendedPlugins = [
	{
		slug: 'all-in-one-seo-pack',
		name: 'All in One SEO',
		recommended: true,
		isSelected: true,
	},
	{
		slug: 'wpconsent-cookies-banner-privacy-suite',
		name: 'WPConsent',
		recommended: true,
		isSelected: true,
		description: __(
			'Add privacy compliance tools and a cookie consent banner to your site.',
			'athemes-starter-sites'
		),
	},
	{
		slug: 'duplicator',
		name: 'Duplicator',
		description: __(
			'Create reliable website backups and migrate your site when needed.',
			'athemes-starter-sites'
		),
	},
];

/**
 * Demo-specific plugins that should be recommended when present in a starter.
 *
 * These plugins are not injected globally. They are only enhanced when the
 * selected starter already includes them in its plugin configuration.
 *
 * @type {Object}
 */
const demoSpecificRecommendedPlugins = {
	'dokan-lite': {
		name: 'Dokan',
		recommended: true,
		isSelected: true,
		description: __(
			'Create a multi-vendor marketplace for your online store.',
			'athemes-starter-sites'
		),
	},
};

/**
 * Normalize plugins shown in the Features step.
 *
 * @param {Array} plugins Plugin list.
 * @return {Array} Normalized plugin list.
 */
const normalizeFeaturePlugins = ( plugins ) => {
	if ( ! Array.isArray( plugins ) ) {
		return [];
	}

	const normalizedPlugins = plugins
		.map( ( plugin ) => {
			const recommendedPlugin =
				onboardingRecommendedPlugins.find(
					( item ) => item.slug === plugin.slug
				) || demoSpecificRecommendedPlugins[ plugin.slug ];

			if ( ! recommendedPlugin ) {
				return plugin;
			}

			return {
				...plugin,
				...recommendedPlugin,
			};
		} );

	const pluginSlugs = normalizedPlugins.map( ( plugin ) => plugin.slug );

	return [
		...normalizedPlugins,
		...onboardingRecommendedPlugins.filter(
			( plugin ) => ! pluginSlugs.includes( plugin.slug )
		),
	];
};

/**
 * Sanitize saved plugin selections.
 *
 * @param {Array} selectedPlugins Selected plugin slugs.
 * @param {Array} availablePlugins Available plugin list.
 * @return {Array|null} Sanitized selected plugin slugs.
 */
const sanitizeSelectedPlugins = ( selectedPlugins, availablePlugins ) => {
	if ( ! Array.isArray( selectedPlugins ) ) {
		return null;
	}

	const availablePluginSlugs = availablePlugins.map( ( plugin ) => plugin.slug );

	return selectedPlugins.filter(
		( slug ) =>
			availablePluginSlugs.includes( slug )
	);
};

/**
 * Fallback plugins shown when no starter site is selected.
 *
 * @param {string} selectedBuilder The selected builder.
 * @return {Array} Fallback plugins list.
 */
const getFallbackPlugins = ( selectedBuilder ) => {
	const fallbackPlugins = [
		{ slug: 'wpforms-lite', name: 'WPForms Lite' },
		{ slug: 'all-in-one-seo-pack', name: 'All in One SEO' },
		{ slug: 'wpconsent-cookies-banner-privacy-suite', name: 'WPConsent' },
		{ slug: 'duplicator', name: 'Duplicator' },
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
 * @param {Array}   plugins         Plugin list.
 * @param {boolean} contactSelected Whether the Contact page is selected.
 * @return {Array} Initial selected plugin slugs.
 */
const getInitialSelection = ( plugins, contactSelected = false ) => {
	return plugins
		.filter( ( plugin ) => {
			const info = pluginInfo[ plugin.slug ] || {};

			if ( plugin.slug === 'wpforms-lite' ) {
				return contactSelected;
			}

			if (
				plugin.required === true ||
				plugin.isSelected === true ||
				info.isSelected === true
			) {
				return true;
			}

			return plugin.default === true || info.default === true;
		} )
		.map( ( plugin ) => plugin.slug );
};

/**
 * Check if the selected pages include a contact page.
 *
 * @param {Array} pages Selected page data.
 * @return {boolean} Whether a contact page is selected.
 */
const hasSelectedContactPage = ( pages = [] ) => {
	return pages.some( ( page ) => {
		const slug = page.slug?.trim().toLowerCase() || '';

		return /\bcontact\b/.test( slug );
	} );
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

	// Get the currently selected demo from wizard context.
	const selectedSiteId = wizardData?.design?.selectedSiteId;

	// Get the selected builder from context.
	const selectedBuilder = builder || 'gutenberg';

	const [ plugins, setPlugins ] = useState( [] );
	const [ selectedPlugins, setSelectedPlugins ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const previousSelectionRef = useRef( {
		selectedBuilder,
		selectedSiteId,
	} );

	const themeText = {
		wizardDescription: isBotiga
			? __( 'We have selected some recommended tools and features to help take your site to the next level.', 'athemes-starter-sites' )
			: __( 'We have selected some recommended plugins to help take your site to the next level.', 'athemes-starter-sites' ),
	};

	useEffect( () => {
		const savedSelection = wizardData?.features?.selectedPlugins;
		let availablePlugins = [];

		const contactSelected = hasSelectedContactPage(
			wizardData?.pages?.selectedPageData
		);

		const hasBuilderChanged =
			previousSelectionRef.current.selectedBuilder !== selectedBuilder;
		const hasSelectedSiteChanged =
			previousSelectionRef.current.selectedSiteId !== selectedSiteId;
		const shouldResetSelection = hasBuilderChanged || hasSelectedSiteChanged;

		/**
		 * Get the selected plugins for the current feature list.
		 *
		 * @param {Array} initialSelection Initial selected plugin slugs.
		 * @return {Array} Selected plugin slugs.
		 */
		const getBaseSelection = ( initialSelection ) => {
			if ( shouldResetSelection ) {
				return initialSelection;
			}

			const savedPluginSelection = sanitizeSelectedPlugins(
				savedSelection,
				availablePlugins
			);

			return savedPluginSelection || initialSelection;
		};

		/**
		 * Store the current builder and starter for later comparison.
		 *
		 * @return {void}
		 */
		const syncPreviousSelection = () => {
			if ( ! shouldResetSelection ) {
				return;
			}

			previousSelectionRef.current = {
				selectedBuilder,
				selectedSiteId,
			};
		};

		if ( isBotiga ) {
			const demo = selectedSiteId && window.atssOnboarding?.demos
				? window.atssOnboarding.demos[ selectedSiteId ]
				: null;

			const demoPlugins = ensureElementorPlugin(
				filterPluginsByBuilder( demo?.plugins, selectedBuilder ),
				selectedBuilder
			);

			availablePlugins = getBotigaAvailablePlugins(
				demoPlugins,
				selectedBuilder
			);
			availablePlugins = ensureBotigaBuilderAddonPlugin(
				availablePlugins,
				selectedBuilder
			);
			availablePlugins = normalizeFeaturePlugins( availablePlugins );

			setPlugins( availablePlugins );

			const initialSelection = getInitialSelection(
				availablePlugins,
				contactSelected
			);

			setSelectedPlugins( getBaseSelection( initialSelection ) );
			syncPreviousSelection();
			setLoading( false );
			return;
		}

		if ( selectedSiteId && window.atssOnboarding?.demos ) {
			const demo = window.atssOnboarding.demos[ selectedSiteId ];

			if (
				demo &&
				demo.plugins &&
				Array.isArray( demo.plugins ) &&
				demo.plugins.length > 0
			) {
				availablePlugins = filterPluginsByBuilder(
					demo.plugins,
					selectedBuilder
				);
				availablePlugins = ensureElementorPlugin(
					availablePlugins,
					selectedBuilder
				);
				availablePlugins = normalizeFeaturePlugins( availablePlugins );

				setPlugins( availablePlugins );

				const initialSelection = getInitialSelection(
					availablePlugins,
					contactSelected
				);

				setSelectedPlugins( getBaseSelection( initialSelection ) );
				syncPreviousSelection();
				setLoading( false );
				return;
			}
		}

		availablePlugins = getFallbackPlugins( selectedBuilder );
		availablePlugins = normalizeFeaturePlugins( availablePlugins );

		setPlugins( availablePlugins );

		const initialSelection = getInitialSelection(
			availablePlugins,
			contactSelected
		);

		setSelectedPlugins( getBaseSelection( initialSelection ) );
		syncPreviousSelection();
		setLoading( false );
	}, [
		selectedSiteId,
		selectedBuilder,
		wizardData?.features?.selectedPlugins,
		wizardData?.pages?.selectedPageData,
	] );

	/**
	 * Handle plugin selection toggle.
	 *
	 * @param {string} pluginSlug The plugin slug to toggle.
	 */
	const handlePluginToggle = ( pluginSlug ) => {
		setSelectedPlugins( ( prev ) => {
			if ( prev.includes( pluginSlug ) ) {
				return prev.filter( ( slug ) => slug !== pluginSlug );
			}
			return [ ...prev, pluginSlug ];
		} );
	};

	/**
	 * Handle continue button click.
	 * Saves selected plugins to wizard context and proceeds to Optin step.
	 */
	const handleContinue = () => {
		trackOnboardingEvent( 'onboarding_features_selected', {
			builder: selectedBuilder,
			step: 'features',
			demo_id: selectedSiteId || '',
			has_selected_starter: !! selectedSiteId,
			selected_plugins_count: selectedPlugins.length,
		} );

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
			.filter( ( plugin ) => plugin.required === true )
			.map( ( plugin ) => plugin.slug );

		trackOnboardingEvent( 'onboarding_features_selected', {
			builder: selectedBuilder,
			step: 'features',
			demo_id: selectedSiteId || '',
			has_selected_starter: !! selectedSiteId,
			selected_plugins_count: requiredPlugins.length,
		} );

		onContinue( {
			selectedPlugins: requiredPlugins,
		}, true );
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
