<?php
/**
 * Customization handler class.
 *
 * Handles application of wizard customizations (colors, typography, logo, site title).
 *
 * @package Athemes Starter Sites
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'ATSS_Onboarding_Customization_Handler' ) ) {

	/**
	 * Customization handler class.
	 *
	 * Applies logo, colors, typography, and site title from wizard state.
	 */
	class ATSS_Onboarding_Customization_Handler {

		/**
		 * Constructor.
		 */
		public function __construct() {
			// No dependencies needed.
		}

		/**
		 * Apply all customizations from wizard state.
		 *
		 * @since 1.0.0
		 * @param array  $customize_data The customize data from wizard state.
		 * @param string $site_title     Optional site title to set.
		 * @param array  $full_state     Optional full wizard state for extensibility.
		 * @return bool True on success.
		 */
		public function apply_customizations( $customize_data, $site_title = '', $full_state = array() ) {

			if ( ! current_user_can( 'manage_options' ) ) {
				return false;
			}

			// Apply site identity (title, logo, logo size).
			$this->apply_site_identity_customizations( $customize_data, $site_title );

			// Apply colors.
			$this->apply_color_customizations( $customize_data );

			// Apply typography.
			$this->apply_typography_customizations( $customize_data );

			// Apply usage tracking opt-in setting.
			$this->maybe_enable_usage_optin( $full_state );

			/**
			 * Action hook for additional customization application.
			 *
			 * @since 1.0.0
			 * @param array $customize_data The customize data from wizard state.
			 * @param array $full_state     The full wizard state.
			 */
			do_action( 'atss_apply_wizard_customizations', $customize_data, $full_state );

			return true;
		}

		/**
		 * Apply site identity customizations from wizard state.
		 *
		 * @since 1.0.0
		 * @param array  $customize_data The customize data.
		 * @param string $site_title     Optional site title to set.
		 * @return void
		 */
		private function apply_site_identity_customizations( $customize_data, $site_title = '' ) {
			// Apply site title.
			if ( ! empty( $site_title ) ) {
				update_option( 'blogname', sanitize_text_field( $site_title ) );
			}

			// Apply logo.
			if ( ! empty( $customize_data['siteLogo']['id'] ) ) {
				$logo_id = absint( $customize_data['siteLogo']['id'] );

				// Get the attachment URL from the ID to ensure it exists.
				$logo_url = wp_get_attachment_url( $logo_id );

				if ( $logo_url ) {
					set_theme_mod( 'site_logo', $logo_url );

					// Also set logo height if available.
					if ( isset( $customize_data['logoHeight'] ) ) {
						$logo_height = absint( $customize_data['logoHeight'] );
						set_theme_mod( 'site_logo_size_desktop', $logo_height );
						set_theme_mod( 'site_logo_size_tablet', $logo_height );
						set_theme_mod( 'site_logo_size_mobile', $logo_height );
					}
				}
			}

			// Apply show/hide site title.
			if ( isset( $customize_data['showSiteTitle'] ) ) {
				$show_title = (bool) $customize_data['showSiteTitle'];
				set_theme_mod( 'logo_site_title', $show_title ? 1 : 0 );
			}
		}

		/**
		* Apply opt-in customizations from wizard state.
		*
		* @since 1.0.0
		* @param array $full_state The full wizard state.
		* @return void
		*/
		private function maybe_enable_usage_optin( $full_state ) {
			// Check if optin data exists in the full state.
			if ( empty( $full_state['data']['optin'] ) || ! is_array( $full_state['data']['optin'] ) ) {
				return;
			}

			$optin_data = $full_state['data']['optin'];

			// Set usage tracking option based on opt-in checkbox.
			if ( isset( $optin_data['optinChecked'] ) && $optin_data['optinChecked'] ) {
				// Get theme info to determine the correct option name.
				$theme_info = $this->get_theme_info();
				$theme_slug = $theme_info['slug'];

				// Build theme-specific option name.
				$option_name = $theme_slug . '-usage-tracking-enabled';

				update_option( $option_name, 1 );
			}
		}

		/**
		 * Apply color customizations from wizard state.
		 *
		 * @since 1.0.0
		 * @param array $customize_data The customize data.
		 * @return void
		 */
		private function apply_color_customizations( $customize_data ) {
			$colors = array();

			// Check for custom colors (generated from color picker).
			if ( ! empty( $customize_data['customColors'] ) && is_array( $customize_data['customColors'] ) ) {
				$colors = $customize_data['customColors'];
			}

			if ( empty( $colors ) ) {
				return;
			}

			// Get theme info.
			$theme_info = $this->get_theme_info();
			$theme_slug = $theme_info['slug'];

			// Build mapping of global color names to new hex values.
			$global_color_values = array();

			// Apply colors based on theme.
			foreach ( $colors as $css_var => $value ) {
				// Sanitize color value.
				$sanitized_value = sanitize_hex_color( $value );
				if ( ! $sanitized_value ) {
					continue;
				}

				// Convert CSS variable to theme mod name.
				// e.g., '--sydney-global-color-1' -> 'global_color_1'.
				$mod_name = $this->css_var_to_theme_mod( $css_var, $theme_slug );

				if ( $mod_name ) {
					// Store the global color name and its new value.
					$global_color_values[ $mod_name ] = $sanitized_value;

					// Update the global color.
					set_theme_mod( $mod_name, $sanitized_value );
				}
			}

			// For Sydney theme, update all theme mods that reference global colors.
			if ( ! empty( $global_color_values ) && ( 'sydney' === $theme_slug || 'sydney pro' === $theme_slug ) ) {
				$this->update_sydney_global_color_references( $global_color_values );
			}
		}

		/**
		 * Update Sydney theme mods that reference global colors.
		 *
		 * Sydney uses a dual system for colors:
		 * 1. `global_sydney_footer_row__main_footer_row_background_color` = "global_color_6" (reference)
		 * 2. `sydney_footer_row__main_footer_row_background_color` = "#00102e" (actual hex value)
		 *
		 * When we update global_color_6, we need to find all theme mods that reference it
		 * and update their corresponding actual hex value theme mods.
		 *
		 * @since 1.0.0
		 * @param array $global_color_values Mapping of global color names to their new hex values.
		 * @return void
		 */
		private function update_sydney_global_color_references( $global_color_values ) {
			if ( empty( $global_color_values ) ) {
				return;
			}

			// Get all theme mods.
			$theme_mods = get_theme_mods();

			if ( empty( $theme_mods ) || ! is_array( $theme_mods ) ) {
				return;
			}

			// Iterate through all theme mods looking for global color references.
			foreach ( $theme_mods as $mod_key => $mod_value ) {
				// Look for theme mods that start with "global_sydney_" or "global_".
				// These store references to global colors like "global_color_6".
				if ( strpos( $mod_key, 'global_sydney_' ) === 0 || strpos( $mod_key, 'global_' ) === 0 ) {
					// Check if the value is a reference to a global color we're updating.
					if ( is_string( $mod_value ) && isset( $global_color_values[ $mod_value ] ) ) {
						// Extract the actual theme mod name by removing the "global_" prefix.
						// e.g., "global_sydney_footer_row__main_footer_row_background_color"
						//    -> "sydney_footer_row__main_footer_row_background_color"
						$actual_mod_key = preg_replace( '/^global_/', '', $mod_key );

						// Update the actual theme mod with the new hex value.
						set_theme_mod( $actual_mod_key, $global_color_values[ $mod_value ] );
					}
				}
			}
		}

		/**
		 * Convert CSS variable name to theme mod name.
		 *
		 * @since 1.0.0
		 * @param string $css_var    The CSS variable name.
		 * @param string $theme_slug The theme slug.
		 * @return string|false The theme mod name or false if not mappable.
		 */
		private function css_var_to_theme_mod( $css_var, $theme_slug ) {
			// Remove leading dashes and theme prefix.
			$var_name = ltrim( $css_var, '-' );

			// Sydney theme mapping.
			if ( 'sydney' === $theme_slug || 'sydney pro' === $theme_slug ) {
				// Convert '--sydney-global-color-1' to 'global_color_1'.
				if ( preg_match( '/^sydney-global-color-(\d+)$/', $var_name, $matches ) ) {
					return 'global_color_' . $matches[1];
				}
			}

			// Botiga theme mapping.
			if ( 'botiga' === $theme_slug || 'botiga pro' === $theme_slug ) {
				// Convert '--botiga-color-primary' to 'color_primary'.
				if ( preg_match( '/^botiga-(.+)$/', $var_name, $matches ) ) {
					return str_replace( '-', '_', $matches[1] );
				}
			}

			return false;
		}

		/**
		 * Apply typography customizations from wizard state.
		 *
		 * @since 1.0.0
		 * @param array $customize_data The customize data.
		 * @return void
		 */
		private function apply_typography_customizations( $customize_data ) {
			// Check if typography fonts are provided in the state.
			if ( empty( $customize_data['headingFont'] ) || empty( $customize_data['bodyFont'] ) ) {
				return;
			}

			$heading_font = sanitize_text_field( $customize_data['headingFont'] );
			$body_font = sanitize_text_field( $customize_data['bodyFont'] );

			// Get theme info.
			$theme_info = $this->get_theme_info();
			$theme_slug = $theme_info['slug'];

			// Apply fonts based on theme.
			// Both Sydney and Botiga expect JSON format: {"font":"Font Name","regularweight":"700","category":"sans-serif"}
			$heading_value = wp_json_encode( array(
				'font' => $heading_font,
				'regularweight' => '700',
				'category' => 'sans-serif',
			) );
			$body_value = wp_json_encode( array(
				'font' => $body_font,
				'regularweight' => '400',
				'category' => 'sans-serif',
			) );

			if ( 'sydney' === $theme_slug || 'sydney pro' === $theme_slug ) {
				set_theme_mod( 'sydney_headings_font', $heading_value );
				set_theme_mod( 'sydney_body_font', $body_value );
			} elseif ( 'botiga' === $theme_slug ) {
				set_theme_mod( 'botiga_headings_font', $heading_value );
				set_theme_mod( 'botiga_body_font', $body_value );
			}
		}

		/**
		 * Get theme information.
		 *
		 * @since 1.0.0
		 * @return array Theme info with 'theme', 'parent', and 'slug' keys.
		 */
		private function get_theme_info() {
			$theme = wp_get_theme();
			$parent = $theme->parent() ? $theme->parent() : $theme;
			$theme_slug = strtolower( $parent->get( 'Name' ) );

			return array(
				'theme' => $theme,
				'parent' => $parent,
				'slug' => $theme_slug,
			);
		}
	}
}
