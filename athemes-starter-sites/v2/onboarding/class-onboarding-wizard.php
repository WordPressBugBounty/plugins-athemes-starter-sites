<?php
/**
 * Onboarding wizard bootstrap class.
 *
 * @package Athemes Starter Sites
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'ATSS_Onboarding_Wizard' ) ) {

	/**
	 * Main onboarding wizard class.
	 *
	 * Coordinates page registration and asset enqueueing for the wizard.
	 */
	class ATSS_Onboarding_Wizard {

		/**
		 * Page slug used for the wizard screen.
		 *
		 * @var string
		 */
		private $page_slug = 'atss-onboarding-wizard';

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
		 * Admin page handler.
		 *
		 * @var ATSS_Onboarding_Admin_Page
		 */
		private $admin_page;

		/**
		 * Asset enqueue handler.
		 *
		 * @var ATSS_Onboarding_Enqueue_Assets
		 */
		private $assets;

		/**
		 * State manager handler.
		 *
		 * @var ATSS_Onboarding_State_Manager
		 */
		private $state_manager;

		/**
		 * Customization handler.
		 *
		 * @var ATSS_Onboarding_Customization_Handler
		 */
		private $customization_handler;

		/**
		 * Constructor.
		 */
		public function __construct() {
			$this->asset_path = trailingslashit( ATSS_PATH . 'v2/onboarding' );
			$this->asset_url  = trailingslashit( ATSS_URL . 'v2/onboarding' );

			$this->load_dependencies();

			$this->admin_page            = new ATSS_Onboarding_Admin_Page( $this->page_slug, $this->asset_path );
			$this->state_manager         = new ATSS_Onboarding_State_Manager();
			$this->customization_handler = new ATSS_Onboarding_Customization_Handler();
			$this->assets                = new ATSS_Onboarding_Enqueue_Assets(
				$this->asset_path,
				$this->asset_url,
				$this->page_slug,
				array( $this, 'get_localized_data' )
			);
		}

		/**
		 * Load required classes.
		 * 
		 * @since 1.0.0
		 * @return void
		 */
		private function load_dependencies() {
			require_once ATSS_PATH . 'v2/onboarding/includes/class-admin-page.php';
			require_once ATSS_PATH . 'v2/onboarding/includes/class-enqueue-assets.php';
			require_once ATSS_PATH . 'v2/onboarding/includes/class-state-manager.php';
			require_once ATSS_PATH . 'v2/onboarding/includes/class-page-filter.php';
			require_once ATSS_PATH . 'v2/onboarding/includes/class-customization-handler.php';
		}

		/**
		 * Verify AJAX request has valid nonce and user permissions.
		 *
		 * Terminates execution with JSON error if verification fails.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		private function verify_ajax_request() {
			// Check user capabilities.
			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error( esc_html__( 'Insufficient permissions.', 'athemes-starter-sites' ), 403 );
			}

			// Verify nonce (accept both legacy and onboarding nonces).
			$nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : '';
			if ( ! wp_verify_nonce( $nonce, 'atss_onboarding_nonce' ) && ! wp_verify_nonce( $nonce, 'atss_legacy_import' ) ) {
				wp_send_json_error( esc_html__( 'Invalid nonce.', 'athemes-starter-sites' ), 403 );
			}
		}

		/**
		 * Register hooks.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function init() {
			add_action( 'admin_menu', array( $this->admin_page, 'register_page' ) );
			add_action( 'admin_enqueue_scripts', array( $this->assets, 'enqueue' ) );

			// AJAX handlers.
			add_action( 'wp_ajax_atss_get_wizard_state', array( $this, 'ajax_get_wizard_state' ) );
			add_action( 'wp_ajax_atss_save_wizard_state', array( $this, 'ajax_save_wizard_state' ) );
			add_action( 'wp_ajax_atss_delete_wizard_state', array( $this, 'ajax_delete_wizard_state' ) );
			add_action( 'wp_ajax_atss_get_demo_pages', array( $this, 'ajax_get_demo_pages' ) );
			add_action( 'wp_ajax_atss_apply_wizard_customizations', array( $this, 'ajax_apply_customizations' ) );
			add_action( 'wp_ajax_atss_init_wizard_from_legacy', array( $this, 'ajax_init_wizard_from_legacy' ) );

			// Initialize page filter when import starts (filters pages based on wizard selection).
			add_action( 'atss_import_start', array( $this, 'init_page_filter' ) );
		}

		/**
		 * Initialize the page filter for selective page import.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function init_page_filter() {
			// Only initialize if we have a wizard state with selected pages.
			$state = $this->state_manager->get_state();
			if ( ! empty( $state['data']['pages']['selectedPages'] ) ) {
				new ATSS_Onboarding_Page_Filter();
			}
		}

		/**
		 * Get wizard state via AJAX.
		 *
		 * @since 1.0.0
		 * @return void Outputs JSON response and terminates.
		 */
		public function ajax_get_wizard_state() {
			$this->verify_ajax_request();

			// Get wizard state from options.
			$wizard_state = $this->state_manager->get_state();

			wp_send_json_success( $wizard_state );
		}

		/**
		 * Save wizard state via AJAX.
		 *
		 * @since 1.0.0
		 * @return void Outputs JSON response and terminates.
		 */
		public function ajax_save_wizard_state() {
			$this->verify_ajax_request();

			// Get state from request.
			if ( ! isset( $_POST['state'] ) ) {
				wp_send_json_error( esc_html__( 'Missing state data.', 'athemes-starter-sites' ), 400 );
			}

			if ( ! isset( $_POST['state'] ) || ! is_string( $_POST['state'] ) ) {
				wp_send_json_error( esc_html__( 'Missing or invalid state data.', 'athemes-starter-sites' ), 400 );
			}
			
			// Sanitization happens in the state manager after decoding.
			$state_json = wp_unslash( $_POST['state'] );
			$state = json_decode( $state_json, true );
			
			if ( json_last_error() !== JSON_ERROR_NONE ) {
				wp_send_json_error( esc_html__( 'Invalid JSON data.', 'athemes-starter-sites' ), 400 );
			}

			// Save state.
			$result = $this->state_manager->save_state( $state );

			if ( $result ) {
				wp_send_json_success();
			} else {
				wp_send_json_error( esc_html__( 'Failed to save wizard state.', 'athemes-starter-sites' ) );
			}
		}

	/**
	 * Delete wizard state via AJAX.
	 *
	 * @since 1.0.0
	 * @return void Outputs JSON response and terminates.
	 */
	public function ajax_delete_wizard_state() {
		$this->verify_ajax_request();

		$result = $this->state_manager->delete_state();

		if ( $result ) {
			wp_send_json_success();
		} else {
			wp_send_json_error( esc_html__( 'Failed to delete wizard state.', 'athemes-starter-sites' ) );
		}
	}

	/**
	 * Get demo pages via AJAX.
	 *
	 * @since 1.0.0
	 * @return void Outputs JSON response and terminates.
	 */
	public function ajax_get_demo_pages() {
		$this->verify_ajax_request();

		// Validate demo_id parameter.
		if ( ! isset( $_POST['demo_id'] ) || empty( $_POST['demo_id'] ) ) {
			wp_send_json_error( esc_html__( 'Missing demo ID.', 'athemes-starter-sites' ), 400 );
		}

		// Validate builder parameter.
		if ( ! isset( $_POST['builder'] ) || empty( $_POST['builder'] ) ) {
			wp_send_json_error( esc_html__( 'Missing builder type.', 'athemes-starter-sites' ), 400 );
		}

		$demo_id = sanitize_text_field( wp_unslash( $_POST['demo_id'] ) );
		$builder = sanitize_text_field( wp_unslash( $_POST['builder'] ) );

		// Validate builder is one of the allowed values.
		if ( ! in_array( $builder, array( 'gutenberg', 'elementor' ), true ) ) {
			wp_send_json_error( esc_html__( 'Invalid builder type.', 'athemes-starter-sites' ), 400 );
		}

		// Parse demo pages.
		$pages = $this->parse_demo_pages( $demo_id, $builder );

		if ( is_wp_error( $pages ) ) {
			wp_send_json_error( $pages->get_error_message(), 500 );
		}

		wp_send_json_success( $pages );
	}

	/**
	 * Apply wizard customizations via AJAX.
	 *
	 * Applies logo, colors, typography, and site title from wizard state.
	 *
	 * @since 1.0.0
	 * @return void Outputs JSON response and terminates.
	 */
	public function ajax_apply_customizations() {
		$this->verify_ajax_request();

		// Get wizard state.
		$state = $this->state_manager->get_state();
		
		if ( empty( $state ) || ! isset( $state['data'] ) ) {
			wp_send_json_error( esc_html__( 'No wizard state found.', 'athemes-starter-sites' ), 400 );
		}

		$data = $state['data'];
		$customize_data = isset( $data['customize'] ) ? $data['customize'] : array();

		// Apply customizations via handler.
		$site_title = isset( $data['siteTitle'] ) ? $data['siteTitle'] : '';
		$this->customization_handler->apply_customizations( $customize_data, $site_title, $state );

		wp_send_json_success( array( 'message' => __( 'Customizations applied successfully.', 'athemes-starter-sites' ) ) );
	}

	/**
	 * Initialize wizard state from legacy import selection.
	 *
	 * Accepts demo ID and builder from legacy wizard and saves to atss_wizard_state
	 * with steps 1-2 completed and currentStep set to 3 (Customize).
	 *
	 * @since 1.0.0
	 * @return void Outputs JSON response and terminates.
	 */
	public function ajax_init_wizard_from_legacy() {
		// Verify nonce (accept legacy nonce since called from legacy context).
		if ( ! check_ajax_referer( 'atss_legacy_import', 'nonce', false ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid security token.', 'athemes-starter-sites' ) ) );
		}

		// Check capability.
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array( 'message' => __( 'Insufficient permissions.', 'athemes-starter-sites' ) ) );
		}

		// Get and validate inputs.
		$demo_id = isset( $_POST['demo_id'] ) ? sanitize_text_field( wp_unslash( $_POST['demo_id'] ) ) : '';
		$builder = isset( $_POST['builder'] ) ? sanitize_text_field( wp_unslash( $_POST['builder'] ) ) : '';

		if ( empty( $demo_id ) || empty( $builder ) ) {
			wp_send_json_error( array( 'message' => __( 'Missing demo ID or builder selection.', 'athemes-starter-sites' ) ) );
		}

		// Validate builder value.
		if ( ! in_array( $builder, array( 'elementor', 'gutenberg' ), true ) ) {
			wp_send_json_error( array( 'message' => __( 'Invalid builder type.', 'athemes-starter-sites' ) ) );
		}

		// Construct wizard state matching React context structure.
		$wizard_state = array(
			'builder'         => $builder,
			'currentStep'     => 3,
			'completedSteps'  => array( 1, 2 ),
			'data'            => array(
				'siteTitle'         => '',
				'getting-started'   => array(
					'siteCategory'      => null,
				),
				'design'            => array(
					'selectedSiteId'    => $demo_id,
				),
				'customize'         => array(
					'siteLogo'          => array( 'url' => '' ),
					'colors'            => array(),
					'typography'        => array(),
				),
				'pages'             => array(
					'selectedPages'     => array(),
				),
				'contact'           => array(
					'email'             => '',
					'phone'             => '',
					'address'           => '',
					'socialLinks'       => array(),
				),
			),
		);

		// Save state using state manager.
		$saved = $this->state_manager->save_state( $wizard_state );

		if ( $saved ) {
			wp_send_json_success(
				array(
					'message'     => __( 'Wizard state initialized successfully.', 'athemes-starter-sites' ),
					'redirectUrl' => admin_url( 'admin.php?page=atss-onboarding-wizard&from-legacy=1' ),
				)
			);
		} else {
			wp_send_json_error( array( 'message' => __( 'Failed to save wizard state.', 'athemes-starter-sites' ) ) );
		}
	}

	/**
	 * Get demos list with caching.
	 *
	 * @since 1.0.0
	 * @return array Array of registered demos.
	 */
	private function get_demos_list() {
		$cache_key = 'atss_demos_registry';
		$demos = wp_cache_get( $cache_key );

		if ( false === $demos ) {
			$demos = apply_filters( 'atss_register_demos_list', array() );
			wp_cache_set( $cache_key, $demos, '', HOUR_IN_SECONDS );
		}

		return $demos;
	}

	/**
	 * Parse demo pages from XML file.
	 *
	 * @since 1.0.0
	 * @param string $demo_id The demo site ID.
	 * @param string $builder The builder type (gutenberg/elementor).
	 * @return array|WP_Error Array of pages or WP_Error on failure.
	 */
	private function parse_demo_pages( $demo_id, $builder ) {
		// Check transient cache first.
		$cache_key = 'atss_demo_pages_' . $demo_id . '_' . $builder;
		$cached = get_transient( $cache_key );
		
		if ( false !== $cached ) {
			return $cached;
		}

		// Get demos list.
		$demos = $this->get_demos_list();

		// Validate demo exists.
		if ( ! isset( $demos[ $demo_id ] ) ) {
			return new WP_Error( 'invalid_demo', __( 'Invalid demo ID.', 'athemes-starter-sites' ) );
		}

		$demo = $demos[ $demo_id ];

		// Validate import data exists.
		if ( ! isset( $demo['import'][ $builder ]['content'] ) ) {
			return new WP_Error( 'missing_import', __( 'Import data not found for this demo and builder combination.', 'athemes-starter-sites' ) );
		}

		$xml_url = $demo['import'][ $builder ]['content'];

		// Validate URL is from trusted domain.
		$parsed_url = wp_parse_url( $xml_url );
		if ( ! isset( $parsed_url['host'] ) || 'athemes.com' !== $parsed_url['host'] ) {
			return new WP_Error( 'invalid_url', __( 'XML file must be from athemes.com domain.', 'athemes-starter-sites' ) );
		}

		// Download XML file.
		$response = wp_remote_get(
			$xml_url,
			array(
				'timeout' => 30,
				'sslverify' => true,
			)
		);

		if ( is_wp_error( $response ) ) {
			return new WP_Error( 'download_failed', __( 'Failed to download XML file.', 'athemes-starter-sites' ) . ' ' . $response->get_error_message() );
		}

		$response_code = wp_remote_retrieve_response_code( $response );
		if ( 200 !== $response_code ) {
			return new WP_Error( 'download_failed', sprintf( __( 'Failed to download XML file. HTTP status: %d', 'athemes-starter-sites' ), $response_code ) );
		}

		$xml_content = wp_remote_retrieve_body( $response );

		if ( empty( $xml_content ) ) {
			return new WP_Error( 'empty_file', __( 'Downloaded XML file is empty.', 'athemes-starter-sites' ) );
		}

		// Save to temporary file for XMLReader.
		$upload_dir = wp_upload_dir();
		$temp_file = trailingslashit( $upload_dir['basedir'] ) . 'atss_temp_' . md5( $demo_id . $builder ) . '.xml';

		// Initialize WP Filesystem.
		global $wp_filesystem;
		if ( empty( $wp_filesystem ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
			WP_Filesystem();
		}

		// Save file using WP Filesystem API.
		if ( ! $wp_filesystem->put_contents( $temp_file, $xml_content, FS_CHMOD_FILE ) ) {
			return new WP_Error( 'file_save_failed', __( 'Failed to save temporary XML file.', 'athemes-starter-sites' ) );
		}

		// Parse XML file.
		$pages = $this->extract_pages_from_xml( $temp_file );

		// Clean up temporary file.
		if ( $wp_filesystem->exists( $temp_file ) ) {
			$wp_filesystem->delete( $temp_file );
		}

		if ( is_wp_error( $pages ) ) {
			return $pages;
		}

		// Cache the results for 1 hour.
		set_transient( $cache_key, $pages, HOUR_IN_SECONDS );

		return $pages;
	}

	/**
	 * Extract pages from XML file using XMLReader.
	 *
	 * @since 1.0.0
	 * @param string $file_path Path to the XML file.
	 * @return array|WP_Error Array of pages or WP_Error on failure.
	 */
	private function extract_pages_from_xml( $file_path ) {
		// Disable entity loading for security.
		$old_value = null;
		if ( function_exists( 'libxml_disable_entity_loader' ) ) {
			// phpcs:ignore PHPCompatibility.FunctionUse.RemovedFunctions.libxml_disable_entity_loaderDeprecatedRemoved
			// $old_value = libxml_disable_entity_loader( true );
		}

		$reader = null;
		$pages = array();

		try {
			$reader = new XMLReader();
			$status = $reader->open( $file_path );

			if ( ! is_null( $old_value ) && function_exists( 'libxml_disable_entity_loader' ) ) {
				// phpcs:ignore PHPCompatibility.FunctionUse.RemovedFunctions.libxml_disable_entity_loaderDeprecatedRemoved
				// libxml_disable_entity_loader( $old_value );
			}

			if ( ! $status ) {
				return new WP_Error( 'xml_parse_error', __( 'Could not open XML file for parsing.', 'athemes-starter-sites' ) );
			}

			$current_item = array();
			$in_item = false;
			$current_element = '';

			// Parse XML stream.
			while ( $reader->read() ) {
				if ( XMLReader::ELEMENT === $reader->nodeType ) {
					$current_element = $reader->name;

				// Start of an item.
				if ( 'item' === $current_element ) {
					$in_item = true;
					$current_item = array(
						'id' => '',
						'title' => '',
						'slug' => '',
						'post_type' => '',
						'status' => '',
						'menu_order' => 0,
						'guid' => '',
					);
				}
				} elseif ( XMLReader::TEXT === $reader->nodeType || XMLReader::CDATA === $reader->nodeType ) {
					if ( $in_item ) {
						$value = $reader->value;

					switch ( $current_element ) {
						case 'title':
							$current_item['title'] = $value;
							break;
						case 'guid':
							$current_item['guid'] = $value;
							break;
						case 'wp:post_id':
							$current_item['id'] = $value;
							break;
						case 'wp:post_name':
							$current_item['slug'] = $value;
							break;
						case 'wp:post_type':
							$current_item['post_type'] = $value;
							break;
						case 'wp:status':
							$current_item['status'] = $value;
							break;
						case 'wp:menu_order':
							$current_item['menu_order'] = (int) $value;
							break;
					}
					}
				} elseif ( XMLReader::END_ELEMENT === $reader->nodeType ) {
				// End of an item.
				if ( 'item' === $reader->name && $in_item ) {
					// Only include published pages.
					if ( 'page' === $current_item['post_type'] && 'publish' === $current_item['status'] ) {
						$pages[] = array(
							'id' => $current_item['id'],
							'title' => $current_item['title'],
							'slug' => $current_item['slug'],
							'url' => ! empty( $current_item['guid'] ) ? $current_item['guid'] : home_url( '/' . $current_item['slug'] . '/' ),
							'menu_order' => $current_item['menu_order'],
						);
					}
					$in_item = false;
					$current_item = array();
				}
				}
			}
		} catch ( Exception $e ) {
			return new WP_Error( 'xml_parse_error', sprintf( __( 'XML parsing error: %s', 'athemes-starter-sites' ), $e->getMessage() ) );
		} finally {
			if ( $reader instanceof XMLReader ) {
				$reader->close();
			}
		}

		return $pages;
	}

	/**
	 * Check if the current user has a pro theme.
	 *
	 * @since 1.0.0
	 * @return bool True if user has a pro theme, false otherwise.
	 */
	private function is_pro_user() {
		// Check for pro version constants.
		$is_pro = defined( 'SYDNEY_PRO_VERSION' ) || defined( 'BOTIGA_PRO_VERSION' );
		
		/**
		 * Filter whether the current user has pro access.
		 *
		 * @since 1.0.0
		 * @param bool $is_pro Whether the user has pro access.
		 */
		return apply_filters( 'atss_is_pro_user', $is_pro );
	}

	/**
	 * Build the localization payload for the app.
	 *
	 * @return array
	 */
	public function get_localized_data() {
			// Determine dashboard URL based on theme.
			$theme  = wp_get_theme();
			$parent = ( get_template_directory() !== get_stylesheet_directory() && $theme->parent() ) 
				? $theme->parent() 
				: $theme;
			
			// Define theme-specific dashboard URLs.
			$theme_dashboards = [
				'Sydney'     => 'admin.php?page=sydney-dashboard',
				'Sydney Pro' => 'admin.php?page=sydney-dashboard',
				'Botiga'     => 'admin.php?page=botiga-dashboard',
			];
			
			// Check both child and parent theme names.
			$theme_name  = $theme->name;
			$parent_name = $parent->name;
			
			$dashboard_url = $theme_dashboards[ $theme_name ] 
				?? $theme_dashboards[ $parent_name ] 
				?? 'themes.php';

			$customize_url = admin_url( 'customize.php' );

			// Get demos list.
			$demos = $this->get_demos_list();

			// Process demos for frontend - remove heavy import data but keep plugin info.
			if ( ! empty( $demos ) ) {
				foreach ( $demos as $demo_id => $demo ) {
					// Remove import URLs (content, widgets, customizer) to keep payload light.
					// These are fetched server-side during import.
					unset( $demos[ $demo_id ]['import'] );
					
					// Keep plugins array as-is - we need slug, path, name for installation.
					// The plugins array structure is already correct for the import process.
				}
			}

			// Get settings.
			$settings = apply_filters( 'atss_register_demos_settings', array() );

			// Get current starter site option.
			$current_starter = get_option( 'atss_current_starter', '' );

			// Check if user has pro theme.
			$is_pro_user = $this->is_pro_user();

			// Build upgrade URL with UTM parameters based on theme.
			$upgrade_url = '';
			$theme_slug = strtolower( $parent->name );
			
			if ( 'sydney' === $theme_slug && function_exists( 'sydney_admin_upgrade_link' ) ) {
				$upgrade_url = sydney_admin_upgrade_link(
					'https://athemes.com/sydney-upgrade',
					array(
						'utm_source'   => 'onboarding_wizard',
						'utm_medium'   => 'link',
						'utm_campaign' => 'Sydney',
					),
					'onboarding-wizard-link'
				);
			} elseif ( 'botiga' === $theme_slug && function_exists( 'botiga_admin_upgrade_link' ) ) {
				$upgrade_url = botiga_admin_upgrade_link(
					'https://athemes.com/botiga-upgrade',
					array(
						'utm_source'   => 'onboarding_wizard',
						'utm_medium'   => 'link',
						'utm_campaign' => 'Botiga',
					),
					'onboarding-wizard-link'
				);
			}

			return array(
				'ajaxUrl'        => admin_url( 'admin-ajax.php' ),
				'nonce'          => wp_create_nonce( 'atss_onboarding_nonce' ),
				'dashboardUrl'   => esc_url( $dashboard_url ),
				'themeName'      => esc_html( $parent->name ),
				'pluginUrl'      => esc_url( ATSS_URL ),
				'demos'          => $demos,
				'settings'       => $settings,
				'currentStarter' => $current_starter,
				'isProUser'      => $is_pro_user,
				'upgradeUrl'     => $upgrade_url ? esc_url( $upgrade_url ) : '',
				'customizeUrl'   => $customize_url ? esc_url( $customize_url ) : '',
				'adminEmail'     => sanitize_email( get_option( 'admin_email' ) ),
			);
		}
	}
}