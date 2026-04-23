/**
 * Wizard steps configuration.
 *
 * @package Athemes Starter Sites
 */

import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import GettingStarted from '../components/Steps/GettingStarted';
import isBotiga from '../utils/is-botiga';

/**
 * Lazy load step components.
 */
const Design = lazy( () => import( '../components/Steps/Design' ) );
const Customize = lazy( () => import( '../components/Steps/Customize' ) );
const Pages = lazy( () => import( '../components/Steps/Pages' ) );
const Contact = lazy( () => import( '../components/Steps/Contact' ) );
const Features = lazy( () => import( '../components/Steps/Features' ) );
const Optin = lazy( () => import( '../components/Steps/Optin' ) );
const Import = lazy( () => import( '../components/Steps/Import' ) );

/**
 * Shared step definitions.
 */
const sharedSteps = {
	gettingStarted: {
		slug: 'getting-started',
		title: __( 'Getting Started', 'athemes-starter-sites' ),
		component: GettingStarted,
	},
	design: {
		slug: 'design',
		title: __( 'Design', 'athemes-starter-sites' ),
		component: Design,
	},
	botigaDesign: {
		slug: 'design',
		title: __( 'Template', 'athemes-starter-sites' ),
		component: Design,
	},
	customize: {
		slug: 'customize',
		title: __( 'Customize', 'athemes-starter-sites' ),
		component: Customize,
	},
	pages: {
		slug: 'pages',
		title: __( 'Pages', 'athemes-starter-sites' ),
		component: Pages,
		requiresStarter: true
	},
	contact: {
		slug: 'contact',
		title: __( 'Contact', 'athemes-starter-sites' ),
		component: Contact,
		requiresStarter: true
	},
	features: {
		slug: 'features',
		title: __( 'Features', 'athemes-starter-sites' ),
		component: Features,
	},
	optin: {
		slug: 'optin',
		title: __( 'Optin', 'athemes-starter-sites' ),
		component: Optin,
		hidden: true,
	},
	import: {
		slug: 'import',
		title: __( 'Import', 'athemes-starter-sites' ),
		component: Import,
		hidden: true,
	},
};

/**
 * Normalize steps with IDs.
 *
 * @param {Array} steps Steps array.
 * @return {Array} Steps with IDs.
 */
const createSteps = ( steps ) =>
	steps.map( ( step, index ) => ( {
		id: index + 1,
		...step,
	} ) );

/**
 * Wizard steps.
 */
const wizardSteps = isBotiga
	? createSteps( [
			sharedSteps.gettingStarted,
			sharedSteps.botigaDesign,
			sharedSteps.pages,
			sharedSteps.customize,
			sharedSteps.features,
			sharedSteps.contact,
			sharedSteps.optin,
			sharedSteps.import,
	  ] )
	: createSteps( [
			sharedSteps.gettingStarted,
			sharedSteps.design,
			sharedSteps.customize,
			sharedSteps.pages,
			sharedSteps.contact,
			sharedSteps.features,
			sharedSteps.optin,
			sharedSteps.import,
	  ] );

export default wizardSteps;
