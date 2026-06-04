<?php
/**
 * Onboarding metrics handler.
 *
 * @package Athemes Starter Sites
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'ATSS_Onboarding_Metrics' ) ) {

	/**
	 * Handles onboarding metrics events.
	 */
	class ATSS_Onboarding_Metrics {

		/**
		 * AJAX action name.
		 *
		 * @var string
		 */
		private $ajax_action = 'atss_track_onboarding_event';

		/**
		 * Register hooks.
		 *
		 * @return void
		 */
		public function init() {
			add_action( 'wp_ajax_' . $this->ajax_action, array( $this, 'ajax_track_event' ) );
		}

		/**
		 * Track onboarding event via AJAX.
		 *
		 * @return void
		 */
		public function ajax_track_event() {
			$this->verify_request();

			$event_name = isset( $_POST['event_name'] ) ? sanitize_key( wp_unslash( $_POST['event_name'] ) ) : '';
			$session_id = isset( $_POST['session_id'] ) ? sanitize_text_field( wp_unslash( $_POST['session_id'] ) ) : '';

			if ( ! $this->is_allowed_event( $event_name ) ) {
				wp_send_json_success(
					array(
						'status' => 'ignored',
					)
				);
			}

			$metadata = $this->get_request_metadata();

			$payload = array(
				'event_name'     => $event_name,
				'session_id'     => $session_id,
				'metadata'       => $this->sanitize_metadata( $metadata ),
				'plugin_version' => $this->get_plugin_version(),
				'theme'          => $this->get_theme_data(),
				'created_at'     => gmdate( 'Y-m-d H:i:s' ),
			);

			$status = $this->send_event( $payload );

			wp_send_json_success(
				array(
					'status' => $status,
				)
			);
		}

		/**
		 * Verify AJAX request.
		 *
		 * @return void
		 */
		private function verify_request() {
			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error( esc_html__( 'Insufficient permissions.', 'athemes-starter-sites' ), 403 );
			}

			$nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : '';

			if ( ! wp_verify_nonce( $nonce, 'atss_onboarding_nonce' ) ) {
				wp_send_json_error( esc_html__( 'Invalid nonce.', 'athemes-starter-sites' ), 403 );
			}
		}

		/**
		 * Check whether the event is allowed.
		 *
		 * @param string $event_name Event name.
		 * @return bool
		 */
		private function is_allowed_event( $event_name ) {
			$allowed_events = array(
				'onboarding_started',
				'onboarding_step_viewed',
				'onboarding_step_completed',
				'onboarding_step_skipped',
				'onboarding_design_selected',
				'onboarding_pages_selected',
				'onboarding_features_selected',
				'onboarding_optin_completed',
				'onboarding_import_started',
				'onboarding_import_step_completed',
				'onboarding_import_failed',
				'onboarding_import_completed',
			);

			return in_array( $event_name, $allowed_events, true );
		}

		/**
		 * Get metadata from the AJAX request.
		 *
		 * @return array
		 */
		private function get_request_metadata() {
			if ( empty( $_POST['metadata'] ) || ! is_string( $_POST['metadata'] ) ) {
				return array();
			}

			$metadata = json_decode( wp_unslash( $_POST['metadata'] ), true );

			if ( ! is_array( $metadata ) ) {
				return array();
			}

			return $metadata;
		}

		/**
		 * Sanitize allowed metadata only.
		 *
		 * @param array $metadata Event metadata.
		 * @return array
		 */
		private function sanitize_metadata( $metadata ) {
			$allowed_metadata = array(
				'product',
				'builder',
				'step',
				'demo_id',
				'has_selected_starter',
				'selected_pages_count',
				'selected_plugins_count',
				'optin_checked',
				'import_step',
				'error_code',
			);

			$sanitized_metadata = array();

			foreach ( $metadata as $key => $value ) {
				$key = sanitize_key( $key );

				if ( ! in_array( $key, $allowed_metadata, true ) ) {
					continue;
				}

				switch ( $key ) {
					case 'has_selected_starter':
					case 'optin_checked':
						$sanitized_metadata[ $key ] = rest_sanitize_boolean( $value );
						break;

					case 'selected_pages_count':
					case 'selected_plugins_count':
						$sanitized_metadata[ $key ] = absint( $value );
						break;

					default:
						$sanitized_metadata[ $key ] = sanitize_text_field( (string) $value );
						break;
				}
			}

			return $sanitized_metadata;
		}

		/**
		 * Get active theme data.
		 *
		 * @return array
		 */
		private function get_theme_data() {
			$theme  = wp_get_theme();
			$parent = ( get_template_directory() !== get_stylesheet_directory() && $theme->parent() ) ? $theme->parent() : $theme;

			return array(
				'name'    => $parent->get( 'Name' ),
				'version' => $parent->get( 'Version' ),
			);
		}

		/**
		 * Get the central metrics endpoint.
		 *
		 * @return string
		 */
		private function get_endpoint() {
			$endpoint = defined( 'ATSS_ONBOARDING_METRICS_ENDPOINT' )
					? ATSS_ONBOARDING_METRICS_ENDPOINT
					: 'https://athemesusage.com/athemes/v1/onboarding-event';

			/**
			 * Filters the onboarding metrics collection endpoint.
			 *
			 * @param string $endpoint Metrics endpoint URL.
			 */
			$endpoint = apply_filters( 'atss_onboarding_metrics_endpoint', $endpoint );

			return esc_url_raw( $endpoint );
		}

		/**
		 * Send event to the central metrics endpoint.
		 *
		 * @param array $payload Event payload.
		 * @return string
		 */
		private function send_event( $payload ) {
			$endpoint = $this->get_endpoint();

			if ( empty( $endpoint ) ) {
				return 'skipped';
			}

			$request_args = array(
				'timeout'    => 5,
				'blocking'   => false,
				'user-agent' => 'aThemes Starter Sites/' . $this->get_plugin_version() . '; aThemes',
				'headers'    => array(
					'Content-Type' => 'application/json',
				),
				'body'       => wp_json_encode( $payload ),
			);

			/**
			 * Filters the onboarding metrics request arguments.
			 *
			 * @param array $request_args Request arguments.
			 * @param array $payload      Event payload.
			 */
			$request_args = apply_filters( 'atss_onboarding_metrics_request_args', $request_args, $payload );

			wp_remote_post( $endpoint, $request_args );

			return 'queued';
		}

		/**
		 * Get plugin version.
		 *
		 * @return string
		 */
		private function get_plugin_version() {
			if ( defined( 'ATSS_VERSION' ) && ATSS_VERSION ) {
				return ATSS_VERSION;
			}

			if ( function_exists( 'atss_raw_setting' ) ) {
				$version = atss_raw_setting( 'version' );

				if ( ! empty( $version ) && is_string( $version ) ) {
					return $version;
				}
			}

			if ( ! defined( 'ATSS_PATH' ) ) {
				return '';
			}

			if ( ! function_exists( 'get_plugin_data' ) ) {
				require_once ABSPATH . 'wp-admin/includes/plugin.php';
			}

			$plugin_data = get_plugin_data( ATSS_PATH . '/athemes-starter-sites.php' );

			return ! empty( $plugin_data['Version'] ) ? $plugin_data['Version'] : '';
		}
	}
}
