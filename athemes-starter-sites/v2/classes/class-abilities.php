<?php
/**
 * Self-contained Abilities API registrar for the aThemes Starter Sites plugin.
 *
 * Registers the plugin's own ability category (athemes-starter-sites) and two
 * abilities — list-sites (read) and import-site (write) — so every aThemes theme
 * that ships this plugin gets starter-site discovery and import over the
 * WordPress Abilities API. Deliberately does NOT depend on any theme class
 * (e.g. Sydney_Ability): it calls wp_register_ability() directly on both the
 * pre-6.9 and 6.9+ core init hooks, with function_exists() guards in the
 * callbacks.
 *
 * Registration is gated default-off: list-sites registers only when
 * apply_filters( 'atss_abilities_enabled', false ) is true, and import-site
 * additionally requires apply_filters( 'atss_abilities_allow_writes', false ).
 * The plugin is multi-theme and cannot read any one theme's options, so each
 * theme wires these filters to its own gate.
 *
 * @package    Athemes Starter Sites
 * @subpackage Abilities
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'Athemes_Starter_Sites_Abilities' ) ) {

	/**
	 * Registers the plugin's abilities.
	 */
	class Athemes_Starter_Sites_Abilities {

		/**
		 * Ability category slug.
		 */
		const CATEGORY = 'athemes-starter-sites';

		/**
		 * Wire registration onto both the pre-6.9 and 6.9+ core hook pairs.
		 *
		 * Called once from the plugin core init, at plugin-load time. The hooks are
		 * added unconditionally — they only ever fire when an Abilities API
		 * implementation is present — so a polyfill plugin that loads after this one
		 * still works; the callbacks re-guard on function_exists as belt and braces.
		 */
		public static function init() {

			add_action( 'abilities_api_categories_init', array( __CLASS__, 'register_category' ) );
			add_action( 'wp_abilities_api_categories_init', array( __CLASS__, 'register_category' ) );

			add_action( 'abilities_api_init', array( __CLASS__, 'register_abilities' ) );
			add_action( 'wp_abilities_api_init', array( __CLASS__, 'register_abilities' ) );
		}

		/**
		 * Register the plugin's own ability category.
		 */
		public static function register_category() {
			if ( ! function_exists( 'wp_register_ability_category' ) ) {
				return;
			}

			wp_register_ability_category(
				self::CATEGORY,
				array(
					'label'       => __( 'aThemes Starter Sites', 'athemes-starter-sites' ),
					'description' => __( 'List and import aThemes starter sites.', 'athemes-starter-sites' ),
				)
			);
		}

		/**
		 * Register the list-sites (read) and import-site (write) abilities.
		 *
		 * Both are gated on default-off filters: list-sites (read) registers only
		 * when apply_filters( 'atss_abilities_enabled', false ) is true; import-site
		 * (write) registers only when that is true AND
		 * apply_filters( 'atss_abilities_allow_writes', false ) is true — otherwise
		 * it is not registered at all. The plugin is multi-theme, so each aThemes
		 * theme wires these filters to its own gate.
		 */
		public static function register_abilities() {

			if ( ! function_exists( 'wp_register_ability' ) ) {
				return;
			}

			if ( ! apply_filters( 'atss_abilities_enabled', false ) ) {
				return;
			}

			wp_register_ability(
				'athemes-starter-sites/list-sites',
				array(
					'label'               => __( 'List starter sites', 'athemes-starter-sites' ),
					'description'         => __( 'List the available aThemes starter sites with their builders and preview details.', 'athemes-starter-sites' ),
					'category'            => self::CATEGORY,
					'input_schema'        => array(
						'type'       => 'object',
						'properties' => new stdClass(),
					),
					'output_schema'       => array(
						'type'       => 'object',
						'required'   => array( 'success', 'message' ),
						'properties' => array(
							'success' => array( 'type' => 'boolean' ),
							'message' => array( 'type' => 'string' ),
							'data'    => array(
								'type'       => 'object',
								'properties' => array(
									'sites' => array(
										'type'  => 'array',
										'items' => array(
											'type'       => 'object',
											'properties' => array(
												'id'         => array( 'type' => 'string' ),
												'name'       => array( 'type' => 'string' ),
												'type'       => array( 'type' => 'string' ),
												'categories' => array(
													'type'  => 'array',
													'items' => array( 'type' => 'string' ),
												),
												'builders'   => array(
													'type'  => 'array',
													'items' => array( 'type' => 'string' ),
												),
												'preview'    => array( 'type' => 'string' ),
												'thumbnail'  => array( 'type' => 'string' ),
											),
										),
									),
								),
							),
						),
					),
					'execute_callback'    => array( __CLASS__, 'execute_list_sites' ),
					'permission_callback' => array( __CLASS__, 'check_permission' ),
					'meta'                => array(
						'show_in_rest' => true,
						'annotations'  => array(
							'readonly'    => true,
							'destructive' => false,
							'idempotent'  => true,
						),
						'mcp'          => array(
							'public' => true,
							'type'   => 'tool',
						),
					),
				)
			);

			// Write ability — registered only when the write gate is enabled.
			if ( ! apply_filters( 'atss_abilities_allow_writes', false ) ) {
				return;
			}

			wp_register_ability(
				'athemes-starter-sites/import-site',
				array(
					'label'               => __( 'Import starter site', 'athemes-starter-sites' ),
					'description'         => __( 'Import a starter site: installs required plugins, then imports content, widgets, and customizer settings for the chosen builder.', 'athemes-starter-sites' ),
					'category'            => self::CATEGORY,
					'input_schema'        => array(
						'type'       => 'object',
						'required'   => array( 'demo_id', 'builder_type' ),
						'properties' => array(
							'demo_id'      => array(
								'type'        => 'string',
								'description' => 'Demo id from list-sites (the "id" field), e.g. "main-free".',
							),
							'builder_type' => array(
								'type'        => 'string',
								'description' => 'Builder to import, must be one of the demo\'s builders, e.g. "elementor" or "gutenberg".',
							),
							'clean_previous' => array(
								'type'        => 'boolean',
								'description' => 'Optional. Delete the content, widgets and customizer settings created by a previous starter-site import before importing (same as the wizard\'s clean-install option). Defaults to false.',
							),
							'contact'      => array(
								'type'        => 'object',
								'description' => 'Optional contact details that replace the demo\'s placeholder contact info during import.',
								'properties'  => array(
									'businessEmail' => array( 'type' => 'string' ),
									'phoneNumber'   => array( 'type' => 'string' ),
									'address'       => array( 'type' => 'string' ),
									'socialLinks'   => array(
										'type'  => 'array',
										'items' => array(
											'type'       => 'object',
											'properties' => array(
												'platform' => array( 'type' => 'string' ),
												'url'      => array( 'type' => 'string' ),
											),
										),
									),
								),
							),
						),
					),
					'output_schema'       => array(
						'type'       => 'object',
						'required'   => array( 'success', 'message' ),
						'properties' => array(
							'success' => array( 'type' => 'boolean' ),
							'message' => array( 'type' => 'string' ),
							'data'    => array(
								'type'       => 'object',
								'properties' => array(
									'steps' => array( 'type' => 'object' ),
								),
							),
						),
					),
					'execute_callback'    => array( __CLASS__, 'execute_import_site' ),
					'permission_callback' => array( __CLASS__, 'check_permission' ),
					'meta'                => array(
						'show_in_rest' => true,
						'annotations'  => array(
							'readonly'    => false,
							'destructive' => true,
							'idempotent'  => false,
						),
						'mcp'          => array(
							'public' => true,
							'type'   => 'tool',
						),
					),
				)
			);
		}

		/**
		 * Shared capability floor — admins who can edit theme options.
		 *
		 * @return bool
		 */
		public static function check_permission() {
			return current_user_can( 'edit_theme_options' );
		}

		/**
		 * execute: list-sites. Returns the demos normalized to public fields.
		 * The 'id' of each site is the exact key to pass back as import-site's
		 * demo_id. The heavy import URLs and plugin specs are intentionally
		 * stripped.
		 *
		 * @param array $input Ability input (unused).
		 * @return array { success, message, data: { sites: [] } }
		 */
		public static function execute_list_sites( $input = array() ) {

			$demos = apply_filters( 'atss_register_demos_list', array() );

			$sites = array();

			if ( is_array( $demos ) ) {
				foreach ( $demos as $demo_id => $demo ) {
					$sites[] = array(
						'id'         => (string) $demo_id,
						'name'       => isset( $demo['name'] ) ? $demo['name'] : '',
						'type'       => isset( $demo['type'] ) ? $demo['type'] : '',
						'categories' => isset( $demo['categories'] ) && is_array( $demo['categories'] ) ? array_values( $demo['categories'] ) : array(),
						'builders'   => isset( $demo['builders'] ) && is_array( $demo['builders'] ) ? array_values( $demo['builders'] ) : array(),
						'preview'    => isset( $demo['preview'] ) ? $demo['preview'] : '',
						'thumbnail'  => isset( $demo['thumbnail'] ) ? $demo['thumbnail'] : '',
					);
				}
			}

			if ( empty( $sites ) ) {
				return array(
					'success' => true,
					'message' => __( 'No starter sites are available. Ensure the active theme registers demos.', 'athemes-starter-sites' ),
					'data'    => array( 'sites' => array() ),
				);
			}

			return array(
				'success' => true,
				'message' => sprintf(
					/* translators: %d: number of starter sites. */
					_n( '%d starter site available.', '%d starter sites available.', count( $sites ), 'athemes-starter-sites' ),
					count( $sites )
				),
				'data'    => array( 'sites' => $sites ),
			);
		}

		/**
		 * execute: import-site. Validates demo_id + builder_type against the
		 * demo's own builders, then runs the synchronous import orchestration.
		 *
		 * @param array $input { @type string $demo_id, @type string $builder_type }.
		 * @return array { success, message, data?: { steps } }
		 */
		public static function execute_import_site( $input = array() ) {

			$demo_id      = isset( $input['demo_id'] ) ? sanitize_text_field( (string) $input['demo_id'] ) : '';
			$builder_type = isset( $input['builder_type'] ) ? sanitize_text_field( (string) $input['builder_type'] ) : '';

			if ( '' === $demo_id || '' === $builder_type ) {
				return array(
					'success' => false,
					'message' => __( 'Both demo_id and builder_type are required.', 'athemes-starter-sites' ),
				);
			}

			$demos = apply_filters( 'atss_register_demos_list', array() );

			if ( ! is_array( $demos ) || ! isset( $demos[ $demo_id ] ) ) {
				return array(
					'success' => false,
					'message' => __( 'Unknown demo_id. Call list-sites to get valid ids.', 'athemes-starter-sites' ),
				);
			}

			$builders = isset( $demos[ $demo_id ]['builders'] ) && is_array( $demos[ $demo_id ]['builders'] )
				? $demos[ $demo_id ]['builders']
				: array();

			if ( ! in_array( $builder_type, $builders, true ) ) {
				return array(
					'success' => false,
					'message' => sprintf(
						/* translators: 1: builder type, 2: comma-separated allowed builders. */
						__( 'Invalid builder_type "%1$s". Allowed for this demo: %2$s.', 'athemes-starter-sites' ),
						$builder_type,
						implode( ', ', $builders )
					),
				);
			}

			if ( ! class_exists( 'Athemes_Starter_Sites_Importer' ) ) {
				return array(
					'success' => false,
					'message' => __( 'The starter sites importer is not available.', 'athemes-starter-sites' ),
				);
			}

			// Stale wizard state (an abandoned onboarding session's page selection
			// or contact info) must not silently shape a headless import: clear it,
			// then stash only what this call explicitly supplies.
			delete_option( 'atss_wizard_state' );

			if ( isset( $input['contact'] ) && is_array( $input['contact'] ) ) {
				self::stash_wizard_contact( $input['contact'] );
			}

			// The import installs/activates plugins (Plugin_Upgrader->fs_connect() ->
			// request_filesystem_credentials()) and sideloads attachments
			// (media_handle_sideload / image metadata). Those wp-admin/includes
			// functions are loaded automatically on admin-ajax but NOT in a REST/MCP
			// request, where the ability runs — so load them and prefer the direct
			// filesystem method, keeping the import headless and prompt-free. This
			// only conditions the ability's call path; the plugin's admin-ajax import
			// flow is untouched.
			self::prepare_headless_filesystem();

			$importer = Athemes_Starter_Sites_Importer::instance();
			$result   = $importer->import(
				$demo_id,
				$builder_type,
				array(
					'clean_previous' => ! empty( $input['clean_previous'] ),
				)
			);

			$message = isset( $result['message'] ) ? $result['message'] : '';
			$success = ! empty( $result['success'] );

			// The finish step deletes the wizard-state stash on success; make sure
			// a failed import does not leave agent-supplied contact behind either.
			if ( ! $success ) {
				delete_option( 'atss_wizard_state' );
			}

			$response = array(
				'success' => $success,
				'message' => $message,
			);

			if ( isset( $result['steps'] ) ) {
				$response['data'] = array( 'steps' => $result['steps'] );
			}

			return $response;
		}

		/**
		 * Load the wp-admin includes the import needs and prefer direct filesystem
		 * access, so import-site runs headlessly in a REST/MCP request.
		 *
		 * On admin-ajax these are pulled in by the admin bootstrap; in a REST request
		 * they are absent, which is why the plugin-install step fataled with
		 * "Call to undefined function request_filesystem_credentials()". Every
		 * require_once is idempotent (no-op if the admin context already loaded it),
		 * so this changes nothing about the plugin's normal admin flow.
		 *
		 * @return void
		 */
		protected static function prepare_headless_filesystem() {

			$includes = array(
				'wp-admin/includes/file.php',           // request_filesystem_credentials, WP_Filesystem, download_url, wp_handle_sideload.
				'wp-admin/includes/plugin.php',         // get_plugins, is_plugin_active.
				'wp-admin/includes/plugin-install.php', // plugins_api.
				'wp-admin/includes/class-wp-upgrader.php', // Plugin_Upgrader, WP_Ajax_Upgrader_Skin.
				'wp-admin/includes/media.php',          // media_handle_sideload (attachment import).
				'wp-admin/includes/image.php',          // wp_generate_attachment_metadata and image editors.
			);

			foreach ( $includes as $include ) {
				if ( file_exists( ABSPATH . $include ) ) {
					require_once ABSPATH . $include;
				}
			}

			// Prefer direct filesystem access so request_filesystem_credentials()
			// resolves without rendering/awaiting an FTP/SSH form in a headless run.
			// Respect an explicitly-configured FS_METHOD: if the site has set that
			// constant (e.g. 'ftp'/'ssh2' as a hardening choice), do NOT override it.
			if ( ! defined( 'FS_METHOD' ) ) {
				add_filter( 'filesystem_method', array( __CLASS__, 'force_direct_filesystem' ) );
			}
		}

		/**
		 * Force the direct filesystem method for headless ability imports.
		 *
		 * @return string
		 */
		public static function force_direct_filesystem() {
			return 'direct';
		}

		/**
		 * Merge agent-supplied contact details into the wizard-state option that the
		 * importer's contact replacer reads (data.contact). Sanitizes each field at
		 * the boundary. The importer deletes atss_wizard_state when it finishes.
		 *
		 * @param array $contact { businessEmail, phoneNumber, address, socialLinks[] }.
		 * @return void
		 */
		public static function stash_wizard_contact( $contact ) {

			if ( empty( $contact ) || ! is_array( $contact ) ) {
				return;
			}

			$clean = array();

			if ( ! empty( $contact['businessEmail'] ) && is_email( $contact['businessEmail'] ) ) {
				$clean['businessEmail'] = sanitize_email( $contact['businessEmail'] );
			}
			if ( ! empty( $contact['phoneNumber'] ) ) {
				$clean['phoneNumber'] = sanitize_text_field( $contact['phoneNumber'] );
			}
			if ( ! empty( $contact['address'] ) ) {
				$clean['address'] = sanitize_text_field( $contact['address'] );
			}
			if ( ! empty( $contact['socialLinks'] ) && is_array( $contact['socialLinks'] ) ) {
				$links = array();
				foreach ( $contact['socialLinks'] as $link ) {
					if ( empty( $link['platform'] ) || empty( $link['url'] ) ) {
						continue;
					}
					$links[] = array(
						'platform' => sanitize_text_field( $link['platform'] ),
						'url'      => esc_url_raw( $link['url'] ),
					);
				}
				if ( ! empty( $links ) ) {
					$clean['socialLinks'] = $links;
				}
			}

			if ( empty( $clean ) ) {
				return;
			}

			$state = get_option( 'atss_wizard_state', array() );
			if ( ! is_array( $state ) ) {
				$state = array();
			}
			if ( ! isset( $state['data'] ) || ! is_array( $state['data'] ) ) {
				$state['data'] = array();
			}

			$state['data']['contact'] = $clean;

			update_option( 'atss_wizard_state', $state, false );
		}
	}
}
