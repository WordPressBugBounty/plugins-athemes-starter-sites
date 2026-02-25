/**
 * Starter categories configuration.
 *
 * @package Athemes Starter Sites
 */

import { __ } from '@wordpress/i18n';

/**
 * Starter categories for the Industry dropdown.
 *
 * These categories match the category keys used in the demo definitions
 * (e.g., in v2/themes/sydney.php and v2/themes/botiga.php).
 */
const starterCategories = [
	{
		key: 'business',
		name: __( 'Business', 'athemes-starter-sites' )
	},
	{
		key: 'ecommerce',
		name: __( 'eCommerce', 'athemes-starter-sites' )
	},
	{
		key: 'portfolio',
		name: __( 'Portfolio', 'athemes-starter-sites' )
	},
	{
		key: 'blog',
		name: __( 'Blog', 'athemes-starter-sites' )
	},
	{
		key: 'magazine',
		name: __( 'Magazine', 'athemes-starter-sites' )
	},
	{
		key: 'other',
		name: __( 'Other', 'athemes-starter-sites' )
	}
];

export default starterCategories;

