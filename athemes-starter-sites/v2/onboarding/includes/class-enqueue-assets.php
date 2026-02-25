<?php
/**
 * Enqueue onboarding wizard assets.
 *
 * @package Athemes Starter Sites
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'ATSS_Onboarding_Enqueue_Assets' ) ) {

	/**
	 * Handles onboarding wizard scripts and styles.
	 */
	class ATSS_Onboarding_Enqueue_Assets {

		/**
		 * Base path to onboarding assets.
		 *
		 * @var string
		 */
		private $asset_path;

		/**
		 * Base URL to onboarding assets.
		 *
		 * @var string
		 */
		private $asset_url;

		/**
		 * Page slug to check against the admin hook.
		 *
		 * @var string
		 */
		private $page_slug;

		/**
		 * Script handle for the wizard app.
		 *
		 * @var string
		 */
		private $script_handle = 'atss-onboarding-wizard';

		/**
		 * Style handle for the wizard app.
		 *
		 * @var string
		 */
		private $style_handle = 'atss-onboarding-wizard-style';

		/**
		 * Callable that returns localization data.
		 *
		 * @var callable
		 */
		private $localize_callback;

		/**
		 * Constructor.
		 *
		 * @param string   $asset_path         Absolute path to onboarding assets.
		 * @param string   $asset_url          Base URL to onboarding assets.
		 * @param string   $page_slug          Wizard page slug.
		 * @param callable $localize_callback  Callback returning localization array.
		 */
		public function __construct( $asset_path, $asset_url, $page_slug, $localize_callback ) {
			$this->asset_path        = $asset_path;
			$this->asset_url         = $asset_url;
			$this->page_slug         = $page_slug;
			$this->localize_callback = $localize_callback;
		}

		/**
		 * Enqueue wizard assets when on the onboarding page.
		 *
		 * @param string $hook Current admin page hook.
		 */
		public function enqueue( $hook ) {
			// Check if we're on the wizard page.
			if ( false === strpos( $hook, $this->page_slug ) ) {
				return;
			}
			
			// Add preconnect hints for Google Fonts.
			add_filter( 'wp_resource_hints', array( $this, 'add_preconnect_hints' ), 10, 2 );

			// Enqueue WordPress media library.
			wp_enqueue_media();

			$asset_data  = $this->get_asset_data();
			$script_file = $this->asset_path . 'build/index.js';
			$style_file  = $this->asset_path . 'build/index.css';

			if ( file_exists( $script_file ) ) {
				wp_enqueue_script(
					$this->script_handle,
					$this->asset_url . 'build/index.js',
					array_merge( $asset_data['dependencies'], array( 'media-views' ) ),
					$asset_data['version'],
					true
				);

				if ( is_callable( $this->localize_callback ) ) {
					wp_localize_script(
						$this->script_handle,
						'atssOnboarding',
						call_user_func( $this->localize_callback )
					);
				}
			}

			if ( file_exists( $style_file ) ) {
				wp_enqueue_style(
					$this->style_handle,
					$this->asset_url . 'build/index.css',
					array(),
					$asset_data['version']
				);
			}

			// Enqueue Inter variable font from Google Fonts.
			wp_enqueue_style(
				'atss-onboarding-inter-font',
				'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
				array(),
				null
			);
		}

		/**
		 * Retrieve asset dependencies and version from the asset file when present.
		 *
		 * @return array
		 */
		private function get_asset_data() {
			$asset_file = $this->asset_path . 'build/index.asset.php';

			if ( file_exists( $asset_file ) ) {
				$data = include $asset_file;

				return array(
					'dependencies' => isset( $data['dependencies'] ) ? (array) $data['dependencies'] : array(),
					'version'      => isset( $data['version'] ) ? $data['version'] : false,
				);
			}

			return array(
				'dependencies' => array( 'wp-element', 'wp-components', 'wp-i18n' ),
				'version'      => file_exists( $this->asset_path . 'build/index.js' ) ? filemtime( $this->asset_path . 'build/index.js' ) : false,
			);
		}

	/**
	 * Add preconnect hints for Google Fonts and demo domains.
	 *
	 * @param array  $urls          URLs to print for resource hints.
	 * @param string $relation_type The relation type the URLs are printed for.
	 * @return array URLs to print for resource hints.
	 */
	public function add_preconnect_hints( $urls, $relation_type ) {
		if ( 'preconnect' === $relation_type ) {
			$urls[] = array(
				'href' => 'https://fonts.googleapis.com',
			);
			$urls[] = array(
				'href'        => 'https://fonts.gstatic.com',
				'crossorigin' => 'anonymous',
			);
			// Add preconnect hints for demo domains used in starter sites
			$urls[] = array(
				'href' => 'https://demo.athemes.com',
			);
			$urls[] = array(
				'href' => 'https://athemes.com',
			);
		} elseif ( 'dns-prefetch' === $relation_type ) {
			// Add DNS prefetch for demo domains as fallback
			$urls[] = array(
				'href' => 'https://demo.athemes.com',
			);
			$urls[] = array(
				'href' => 'https://athemes.com',
			);
		}

		return $urls;
	}

		/**
		 * Determine whether built assets are present.
		 *
		 * @return bool
		 */
		public function assets_available() {
			return file_exists( $this->asset_path . 'build/index.js' );
		}
	}
}

