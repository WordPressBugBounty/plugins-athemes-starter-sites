/**
 * Get Botiga available plugins for the Features step.
 *
 * @package Athemes Starter Sites
 */

import botigaPluginInfo from '../data/plugin-info';

/**
 * Get the builder slug for Botiga.
 *
 * @param {string} selectedBuilder Selected builder.
 * @return {string} Builder slug.
 */
const getBuilderSlug = ( selectedBuilder ) =>
	selectedBuilder === 'elementor' ? 'elementor' : 'gutenberg';

/**
 * Merge Botiga plugin info with matching demo plugin data.
 *
 * Demo plugin data is preserved for additional fields such as path, but
 * Botiga plugin info takes priority for curated presentation fields.
 *
 * @param {string} slug              Plugin slug.
 * @param {Object} matchedDemoPlugin Matching demo plugin object.
 * @param {Object} overrides         Additional override fields.
 * @return {Object} Merged plugin object.
 */
const mergeBotigaPluginData = (
	slug,
	matchedDemoPlugin = {},
	overrides = {}
) => ( {
	...( matchedDemoPlugin || {} ),
	...( botigaPluginInfo[ slug ] || {} ),
	slug,
	name: botigaPluginInfo[ slug ]?.name || matchedDemoPlugin?.name || slug,
	pillName:
		botigaPluginInfo[ slug ]?.pillName ||
		matchedDemoPlugin?.pillName ||
		botigaPluginInfo[ slug ]?.name ||
		matchedDemoPlugin?.name ||
		slug,
	description:
		botigaPluginInfo[ slug ]?.description ||
		matchedDemoPlugin?.description ||
		'',
	icon: botigaPluginInfo[ slug ]?.icon || matchedDemoPlugin?.icon || '',
	plugin_icon:
		botigaPluginInfo[ slug ]?.plugin_icon ||
		matchedDemoPlugin?.plugin_icon ||
		'',
	default:
		botigaPluginInfo[ slug ]?.default === true ||
		matchedDemoPlugin?.default === true,
	...overrides,
} );

/**
 * Get Botiga available plugins.
 *
 * @param {Array}  demoPlugins     Demo plugins.
 * @param {string} selectedBuilder Selected builder.
 * @return {Array} Available plugins list.
 */
const getBotigaAvailablePlugins = (
	demoPlugins = [],
	selectedBuilder = 'gutenberg'
) => {
	const builderSlug = getBuilderSlug( selectedBuilder );

	const orderedBotigaSlugs = Object.keys( botigaPluginInfo ).reduce(
		( slugs, slug ) => {
			if ( slug === 'gutenberg' || slug === 'elementor' ) {
				if ( ! slugs.includes( builderSlug ) ) {
					slugs.push( builderSlug );
				}

				return slugs;
			}

			slugs.push( slug );

			return slugs;
		},
		[]
	);

	const orderedBotigaPlugins = orderedBotigaSlugs.map( ( slug ) => {
		const matchedDemoPlugin = demoPlugins.find(
			( demoPlugin ) => demoPlugin.slug === slug
		);

		const overrides =
			slug === builderSlug
				? {
						required: true,
						builder: selectedBuilder,
				  }
				: {};

		return mergeBotigaPluginData( slug, matchedDemoPlugin, overrides );
	} );

	const extraDemoPlugins = demoPlugins.filter( ( plugin ) => {
		if ( ! plugin?.slug ) {
			return false;
		}

		return ! orderedBotigaSlugs.includes( plugin.slug );
	} );

	return [ ...orderedBotigaPlugins, ...extraDemoPlugins ];
};

export default getBotigaAvailablePlugins;
