<?php
/**
 * Onboarding wizard admin page.
 *
 * @package Athemes Starter Sites
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'ATSS_Onboarding_Admin_Page' ) ) {

	/**
	 * Registers and renders the onboarding wizard page.
	 */
	class ATSS_Onboarding_Admin_Page {

		/**
		 * Page slug used for the wizard screen.
		 *
		 * @var string
		 */
		private $page_slug;

		/**
		 * Base path to onboarding assets.
		 *
		 * @var string
		 */
		private $asset_path;

		/**
		 * Constructor.
		 *
		 * @param string $page_slug  Wizard page slug.
		 * @param string $asset_path Absolute path to onboarding assets.
		 */
		public function __construct( $page_slug, $asset_path ) {
			$this->page_slug = $page_slug;
			$this->asset_path = trailingslashit( $asset_path );
		}

		/**
		 * Hook into admin_menu to register the page.
		 */
		public function register_page() {
			// Determine parent menu based on active theme.
			$theme  = wp_get_theme();
			$parent = ( get_template_directory() !== get_stylesheet_directory() && $theme->parent() ) 
				? $theme->parent() 
				: $theme;

			// Define theme-specific parent menu slugs.
			$theme_menu_slugs = [
				'Sydney'     => 'sydney-dashboard',
				'Sydney Pro' => 'sydney-dashboard',
				'Botiga'     => 'botiga-dashboard',
			];

			$parent_menu_slug = $theme_menu_slugs[ $theme->name ] 
				?? $theme_menu_slugs[ $parent->name ] 
				?? 'themes.php';

			add_submenu_page(
				$parent_menu_slug,
				esc_html__( 'Starter Sites', 'athemes-starter-sites' ),
				esc_html__( 'Starter Sites', 'athemes-starter-sites' ),
				'manage_options',
				$this->page_slug,
				array( $this, 'render_page' ),
				2
			);

			//Remove the existing starter sites submenu item from the parent menu.
			remove_submenu_page( $parent_menu_slug, get_admin_url() . 'admin.php?page=' . $parent_menu_slug . '&tab=starter-sites' );
		}

		/**
		 * Render the wizard container and fallback notice.
		 */
		public function render_page() {
			if ( ! current_user_can( 'manage_options' ) ) {
				wp_die( esc_html__( 'You do not have sufficient permissions to access this page.', 'athemes-starter-sites' ) );
			}
			
			echo '<div id="atss-onboarding-wizard-root"></div>';

			if ( ! $this->assets_available() ) {
				printf(
					'<p class="notice notice-info"><span>%s</span></p>',
					esc_html__( 'Onboarding assets are not available yet. Build the wizard assets to load the interface.', 'athemes-starter-sites' )
				);
			}
		}

		/**
		 * Determine whether built assets are present.
		 *
		 * @return bool
		 */
		private function assets_available() {
			return file_exists( $this->asset_path . 'build/index.js' );
		}
	}
}

