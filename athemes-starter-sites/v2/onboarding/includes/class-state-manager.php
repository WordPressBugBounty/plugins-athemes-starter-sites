<?php
/**
 * Onboarding wizard state manager.
 *
 * @package Athemes Starter Sites
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'ATSS_Onboarding_State_Manager' ) ) {

	/**
	 * Handles wizard state persistence.
	 */
	class ATSS_Onboarding_State_Manager {

		/**
		 * Option name for the wizard state.
		 *
		 * @var string
		 */
		private $option_name = 'atss_wizard_state';

		/**
		 * Get the current wizard state.
		 *
		 * @return array
		 */
		public function get_state() {
			return get_option( $this->option_name, array() );
		}

		/**
		 * Save the wizard state.
		 *
		 * @param array $state State data to save.
		 * @return bool
		 */
		public function save_state( $state ) {
			if ( ! current_user_can( 'manage_options' ) ) {
				return false;
			}

			if ( ! is_array( $state ) ) {
				return false;
			}

			// Sanitize the state data recursively.
			$sanitized_state = $this->sanitize_state_data( $state );
			$sanitized_state['lastUpdated'] = time();

			// Validate top-level builder
			if ( isset( $sanitized_state['builder'] ) ) {
				$valid_builders = array( 'gutenberg', 'elementor', 'beaver-builder' );
				if ( ! in_array( $sanitized_state['builder'], $valid_builders, true ) ) {
					$sanitized_state['builder'] = 'gutenberg';
				}
			} else {
				$sanitized_state['builder'] = 'gutenberg';
			}

			return update_option( $this->option_name, $sanitized_state, false );
		}

		/**
		 * Recursively sanitize state data.
		 *
		 * @param mixed $data Data to sanitize.
		 * @param string $key Current key being processed.
		 * @param int $depth Current recursion depth.
		 * @return mixed Sanitized data.
		 */
		private function sanitize_state_data( $data, $key = '', $depth = 0 ) {
			// Prevent excessive nesting to avoid DoS or stack overflow.
			if ( $depth > 10 ) {
				return null;
			}

			if ( is_array( $data ) ) {
				$sanitized = array();
				foreach ( $data as $data_key => $value ) {
					$sanitized_key = preg_replace( '/[^a-zA-Z0-9_\-]/', '', $data_key );
					$sanitized[ $sanitized_key ] = $this->sanitize_state_data( $value, $data_key, $depth + 1 );
				}
				return $sanitized;
			}

			// Value sanitization based on key context
			if ( is_string( $data ) ) {
				// URLs (for siteLogo.url, etc)
				if ( strpos( $key, 'url' ) !== false || strpos( $key, 'Logo' ) !== false ) {
					return esc_url_raw( $data );
				}

				// Color codes
				if ( strpos( strtolower( $key ), 'color' ) !== false ) {
					// Allow hex colors or named colors
					if ( preg_match( '/^#[0-9a-fA-F]{3,6}$/', $data ) ) {
						return sanitize_hex_color( $data );
					}
					return sanitize_text_field( $data );
				}

				// Default text
				return sanitize_text_field( $data );
			}

			if ( is_bool( $data ) || is_int( $data ) || is_float( $data ) || is_null( $data ) ) {
				return $data;
			}

			// Fallback
			return sanitize_text_field( (string) $data );
		}

		/**
		 * Delete the wizard state.
		 *
		 * @return bool
		 */
		public function delete_state() {
			if ( ! current_user_can( 'manage_options' ) ) {
				return false;
			}

			return delete_option( $this->option_name );
		}
	}
}
