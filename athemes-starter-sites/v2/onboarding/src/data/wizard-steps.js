/**
 * Wizard steps configuration.
 *
 * @package Athemes Starter Sites
 */

import { lazy } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import GettingStarted from '../components/Steps/GettingStarted';

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
 * Wizard steps configuration.
 */
const wizardSteps = [
	{
		id: 1,
		slug: 'getting-started',
		title: __( 'Getting Started', 'athemes-starter-sites' ),
		component: GettingStarted
	},
	{
		id: 2,
		slug: 'design',
		title: __( 'Design', 'athemes-starter-sites' ),
		component: Design
	},
	{
		id: 3,
		slug: 'customize',
		title: __( 'Customize', 'athemes-starter-sites' ),
		component: Customize
	},
	{
		id: 4,
		slug: 'pages',
		title: __( 'Pages', 'athemes-starter-sites' ),
		component: Pages
	},
	{
		id: 5,
		slug: 'contact',
		title: __( 'Contact', 'athemes-starter-sites' ),
		component: Contact
	},
	{
		id: 6,
		slug: 'features',
		title: __( 'Features', 'athemes-starter-sites' ),
		component: Features
	},
	{
		id: 7,
		slug: 'optin',
		title: __( 'Optin', 'athemes-starter-sites' ),
		component: Optin,
		hidden: true
	},
	{
		id: 8,
		slug: 'import',
		title: __( 'Import', 'athemes-starter-sites' ),
		component: Import,
		hidden: true
	}
];

export default wizardSteps;

