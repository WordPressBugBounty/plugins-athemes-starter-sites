/**
 * PluginSummary component for displaying selected plugins as a list of pills.
 *
 * @package Athemes Starter Sites
 */

import { __ } from '@wordpress/i18n';
import pluginInfo, { DEFAULT_ICON } from '../../data/plugin-info';

const PLUGIN_INFO = pluginInfo;

function getPluginIcon( slug ) {
	const info = PLUGIN_INFO[ slug ];
	if ( info?.plugin_icon ) {
		return info.plugin_icon;
	}
	return info?.icon || DEFAULT_ICON;
}

function getPluginName( slug, fallbackName ) {
	const info = PLUGIN_INFO[ slug ];
	if ( info?.plugin_icon ) {
		return info.plugin_icon;
	}
	return fallbackName;
}

/**
 * PluginSummary component.
 *
 * Displays a list of selected plugins as pill badges with icons.
 *
 * @param {Object}   props                    Component props.
 * @param {Array}    props.selectedPlugins    Array of selected plugin slugs.
 * @param {Array}    props.availablePlugins   Array of available plugin objects.
 * @return {JSX.Element} PluginSummary component.
 */
function PluginSummary( { selectedPlugins = [], availablePlugins = [] } ) {
	if ( selectedPlugins.length === 0 ) {
		return (
			<div className="atss-plugin-summary">
				<p className="atss-plugin-summary__empty text-sm text-secondary">
					{ __( 'No plugins selected.', 'athemes-starter-sites' ) }
				</p>
			</div>
		);
	}

	const selectedPluginObjects = availablePlugins.filter( plugin =>
		selectedPlugins.includes( plugin.slug )
	);

	return (
		<div className="atss-plugin-summary">
			<p className="atss-plugin-summary__description text-sm">
				{ __( 'The following plugins will be installed & activated:', 'athemes-starter-sites' ) }
			</p>
			<div className="atss-plugin-summary__list">
				{ selectedPluginObjects.map( ( plugin ) => (
					<div
						key={ plugin.slug }
						className="atss-plugin-summary__pill"
					>
						<span
							className="atss-plugin-summary__icon"
							dangerouslySetInnerHTML={ { __html: getPluginIcon( plugin.slug ) } }
						/>
						<span className="atss-plugin-summary__name">
							{ plugin.name }
						</span>
					</div>
				) ) }
			</div>
		</div>
	);
}

export default PluginSummary;
