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
			$theme_info = $this->get_theme_info();
			$theme_slug = $theme_info['slug'];
			$is_botiga  = 'botiga' === $theme_slug || 'botiga pro' === $theme_slug;

			// Apply site title.
			if ( ! empty( $site_title ) ) {
				update_option( 'blogname', sanitize_text_field( $site_title ) );
			}

			$show_site_title = isset( $customize_data['showSiteTitle'] ) ? (bool) $customize_data['showSiteTitle'] : null;
			$has_site_logo   = ! empty( $customize_data['siteLogo']['id'] );

			// Apply logo.
			if ( $has_site_logo && ( $is_botiga || true !== $show_site_title ) ) {
				$logo_id  = absint( $customize_data['siteLogo']['id'] );
				$logo_url = wp_get_attachment_url( $logo_id );

				if ( $logo_url ) {
					set_theme_mod( 'custom_logo', $logo_id );

					if ( $is_botiga ) {
						set_theme_mod( 'site_logo', $logo_id );
					}

					// Also set logo size if available.
					if ( isset( $customize_data['logoHeight'] ) ) {
						$logo_size = absint( $customize_data['logoHeight'] );
						set_theme_mod( 'site_logo_size_desktop', $logo_size );
						set_theme_mod( 'site_logo_size_tablet', $logo_size );
						set_theme_mod( 'site_logo_size_mobile', $logo_size );
					}
				}
			} elseif ( ! $has_site_logo ) {
				// No logo was chosen in the wizard: clear the demo logo imported from
				// the Customizer so it does not persist, matching the standalone importer
				// experience.
				remove_theme_mod( 'custom_logo' );

				if ( $is_botiga ) {
					remove_theme_mod( 'site_logo' );
				}

				remove_theme_mod( 'site_logo_size_desktop' );
				remove_theme_mod( 'site_logo_size_tablet' );
				remove_theme_mod( 'site_logo_size_mobile' );
			}

			// Apply show/hide site title.
			if ( null !== $show_site_title ) {
				if ( $is_botiga ) {
					set_theme_mod( 'logo_site_title', $show_site_title ? 1 : 0 );
				}

				if ( $show_site_title ) {
					$current_header_textcolor = get_theme_mod( 'header_textcolor', '000000' );
					$header_textcolor         = 'blank' === $current_header_textcolor ? '000000' : $current_header_textcolor;

					set_theme_mod( 'header_textcolor', $header_textcolor );

					// When site title is enabled, remove saved logo image for non-Botiga themes only.
					if ( ! $is_botiga ) {
						remove_theme_mod( 'custom_logo' );
					}
				} else {
					set_theme_mod( 'header_textcolor', 'blank' );

					if ( $is_botiga ) {
						remove_theme_mod( 'site_logo' );
					}
				}
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

			if ( 'botiga' === $theme_slug || 'botiga pro' === $theme_slug ) {
				$this->apply_botiga_color_customizations( $customize_data, $colors );

				return;
			}

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
		 * Apply Botiga color customizations.
		 *
		 * @since 1.0.0
		 * @param array $customize_data The customize data.
		 * @param array $colors         The custom colors.
		 * @return void
		 */
		private function apply_botiga_color_customizations( $customize_data, $colors ) {
			$selected_color_scheme = '';

			if ( ! empty( $customize_data['selectedColorScheme'] ) ) {
				$selected_color_scheme = sanitize_text_field( $customize_data['selectedColorScheme'] );
			}

			$color_map = array(
				// General.
				'--bt-color-bg'                => 'background_color',
				'--bt-color-body-text'         => 'color_body_text',
				'--bt-color-content-cards-bg'  => 'content_cards_background',

				// Links.
				'--bt-color-link-default'      => 'color_link_default',
				'--bt-color-link-hover'        => 'color_link_hover',

				// Headings.
				'--bt-color-heading-1'         => 'color_heading_1',
				'--bt-color-heading-2'         => 'color_heading_2',
				'--bt-color-heading-3'         => 'color_heading_3',
				'--bt-color-heading-4'         => 'color_heading_4',
				'--bt-color-heading-5'         => 'color_heading_5',
				'--bt-color-heading-6'         => 'color_heading_6',

				// Forms.
				'--bt-color-forms-text'        => 'color_forms_text',
				'--bt-color-forms-background'  => 'color_forms_background',
				'--bt-color-forms-borders'     => 'color_forms_borders',
				'--bt-color-forms-placeholder' => 'color_forms_placeholder',

				// Buttons.
				'--bt-color-button-bg'           => 'button_background_color',
				'--bt-color-button-bg-hover'     => 'button_background_color_hover',
				'--bt-color-button-border'       => 'button_border_color',
				'--bt-color-button-border-hover' => 'button_border_color_hover',
				'--bt-color-button'              => 'button_color',
				'--bt-color-button-hover'        => 'button_color_hover',
			);

			foreach ( $color_map as $css_var => $theme_mod ) {
				if ( empty( $colors[ $css_var ] ) ) {
					continue;
				}

				$sanitized_value = sanitize_hex_color( $colors[ $css_var ] );

				if ( ! $sanitized_value ) {
					continue;
				}

				set_theme_mod( $theme_mod, $sanitized_value );
			}

			// Persist the non-variable-backed controls (header, footer, search
			// form, product titles) that mirror the onboarding preview rules in
			// v2/onboarding/src/data/botiga-non-variable-color-rules.js.
			$this->apply_botiga_non_variable_theme_mods( $colors );

			// Stash the resolved palette so the theme's finish-import routine can
			// recolor mega menus and menu-item badges after the menus have been
			// assigned to their locations and the mega-menu module is loaded. Doing
			// it here (mid-import) is too early: the menu isn't located yet, so the
			// mega-menu CSS cannot be regenerated. See botiga_setup_after_import().
			set_transient( 'atss_botiga_wizard_palette', $this->get_botiga_palette_map( $colors ), HOUR_IN_SECONDS );

			if ( empty( $selected_color_scheme ) ) {
				return;
			}

			if ( 'custom' !== $selected_color_scheme ) {
				set_theme_mod( 'color_palettes', $selected_color_scheme );
				set_theme_mod( 'custom_palette_toggle', false );
				return;
			}

			set_theme_mod( 'custom_palette_toggle', true );

			$custom_palette_map = array(
				1 => '--bt-color-button-bg',
				2 => '--bt-color-button-bg-hover',
				3 => '--bt-color-heading-1',
				4 => '--bt-color-body-text',
				5 => '--bt-color-forms-borders',
				6 => '--bt-color-content-cards-bg',
				7 => '--bt-color-bg',
				8 => '--bt-color-menu-bg',
			);

			foreach ( $custom_palette_map as $index => $css_var ) {
				if ( empty( $colors[ $css_var ] ) ) {
					continue;
				}

				$sanitized_value = sanitize_hex_color( $colors[ $css_var ] );

				if ( ! $sanitized_value ) {
					continue;
				}

				set_theme_mod( 'custom_color' . $index, $sanitized_value );
			}
		}

		/**
		 * Build the Botiga palette-slot color map from wizard custom colors.
		 *
		 * Mirrors getBotigaNonVariablePaletteMap() in
		 * v2/onboarding/src/data/botiga-non-variable-color-rules.js so the colors
		 * persisted after import match the onboarding preview.
		 *
		 * @since 1.4.1
		 * @param array $colors The custom colors keyed by CSS variable.
		 * @return array Palette slot ('color1'..'color8') to sanitized hex color.
		 */
		private function get_botiga_palette_map( $colors ) {
			$sources = array(
				'color1' => array( '--bt-color-button-bg' ),
				'color2' => array( '--bt-color-button-bg-hover' ),
				'color3' => array( '--bt-color-post-title' ),
				'color4' => array( '--bt-color-body-text' ),
				'color5' => array( '--bt-color-forms-borders' ),
				'color6' => array( '--bt-color-content-cards-bg' ),
				'color7' => array( '--bt-color-bg' ),
				'color8' => array( '--bt-color-menu-bg', '--bt-color-bg' ),
			);

			$palette = array();

			foreach ( $sources as $slot => $css_vars ) {
				$palette[ $slot ] = '';

				foreach ( $css_vars as $css_var ) {
					if ( empty( $colors[ $css_var ] ) ) {
						continue;
					}

					$sanitized = sanitize_hex_color( $colors[ $css_var ] );

					if ( ! $sanitized ) {
						continue;
					}

					$palette[ $slot ] = $sanitized;

					break;
				}
			}

			return $palette;
		}

		/**
		 * Apply Botiga non-variable-backed controls as theme mods.
		 *
		 * These controls are not tied to CSS custom properties, so Botiga sets
		 * them individually when a palette is chosen in the Customizer. The slot
		 * groups below mirror that engine exactly (the elements1..8 lists in the
		 * theme's assets/js/customizer-scripts.js color_palettes handler), so an
		 * imported site matches a native palette selection instead of leaving
		 * unset controls at the theme's dark #212121 default. The remaining
		 * variable-backed controls (button/heading/body/forms/background) are
		 * handled just above in apply_botiga_color_customizations(). A handful of
		 * extra controls Botiga's palette does not touch (comments, pagination,
		 * tags, block search, site-info, mobile off-canvas) are also painted here
		 * to match the onboarding preview rules.
		 *
		 * @since 1.4.1
		 * @param array $colors The custom colors keyed by CSS variable.
		 * @return void
		 */
		private function apply_botiga_non_variable_theme_mods( $colors ) {
			$palette = $this->get_botiga_palette_map( $colors );

			$theme_mods_by_slot = array(
				'color1' => array(
					'botiga_reading_progress_bar_background',
					'botiga_tabs_nav_link_border_color_active',
					'comments_comment_reply_link_background',
					'footer_credits_links_color',
					'pagination_background_active',
					'pagination_color_active',
					'ql_item_bg_hover',
					'scrolltop_bg_color',
					'shop_archive_header_button_border_color',
					'shop_archive_header_button_color',
					'single_product_tabs_border_color_active',
					'single_product_tabs_text_color',
					'single_product_tabs_text_color_active',
					'tags_links_border_color',
					'tags_links_color',
					'wp_block_search_button_background',
				),

				'color2' => array(
					'comments_comment_reply_link_background_hover',
					'footer_credits_links_color_hover',
					'footer_widgets_links_hover_color',
					'main_header_color_hover',
					'main_header_sticky_active_color_hover',
					'main_header_sticky_active_submenu_color_hover',
					'main_header_submenu_color_hover',
					'mobile_offcanvas_close_color_hover',
					'ql_item_color_hover',
					'scrolltop_bg_color_hover',
					'shop_archive_header_button_background_color_hover',
					'shop_archive_header_button_border_color_hover',
					'site_info_link_color_hover',
					'wp_block_search_button_background_hover',
				),

				'color3' => array(
					'bhfb_contact_info_icon_color',
					'bhfb_search_icon_color',
					'bhfb_woo_icons_color',
					'botiga_accordion_item_arrow_border_color_active',
					'botiga_accordion_item_arrow_border_color_hover',
					'footer_widgets_title_color',
					'loop_post_meta_color',
					'loop_post_title_color',
					'main_header_color',
					'main_header_sticky_active_color',
					'main_header_sticky_active_submenu_color',
					'main_header_submenu_color',
					'mobile_header_color',
					'mobile_offcanvas_close_color',
					'offcanvas_menu_color',
					'ql_item_color',
					'shop_archive_header_description_color',
					'shop_archive_header_title_color',
					'shop_product_product_title',
					'single_post_title_color',
					'single_product_title_color',
					'site_description_color',
					'site_info_icon_color',
					'site_info_link_color',
					'site_info_text_color',
					'site_title_color',
				),

				'color4' => array(
					'footer_credits_text_color',
					'footer_widgets_links_color',
					'footer_widgets_text_color',
					'loop_post_text_color',
					'main_header_bottom_color',
					'single_sticky_add_to_cart_style_color_content',
					'topbar_color',
				),

				'color5' => array(
					'botiga_accordion_item_arrow_border_color',
					'botiga_footer_row__above_footer_row_border_top_color',
					'botiga_footer_row__below_footer_row_border_top_color',
					'botiga_footer_row__main_footer_row_border_top_color',
					'botiga_header_row__above_header_row_border_bottom_color',
					'botiga_header_row__below_header_row_border_bottom_color',
					'botiga_header_row__main_header_row_border_bottom_color',
					'ql_item_border_color',
					'single_product_tabs_remaining_borders',
					'single_sticky_add_to_cart_style_color_border',
					'site_info_border_color',
				),

				'color6' => array(
					'botiga_footer_row__above_footer_row_background_color',
					'botiga_footer_row__below_footer_row_background_color',
					'botiga_footer_row__main_footer_row_background_color',
					'botiga_tabs_nav_link_background',
					'footer_credits_background',
					'footer_widgets_background',
					'ql_background_color',
					'single_product_gallery_styles_background_color',
					'single_product_tabs_background_color',
					'single_product_tabs_background_color_active',
					'single_sticky_add_to_cart_style_color_background',
					'site_footer_background',
				),

				'color7' => array(
					'comments_comment_reply_link_color',
					'comments_comment_reply_link_color_hover',
					'scrolltop_color',
					'scrolltop_color_hover',
					'single_product_reviews_advanced_section_bg_color',
					'topbar_background',
					'wp_block_search_button_color',
				),

				'color8' => array(
					'botiga_header_row__above_header_row_background_color',
					'botiga_header_row__below_header_row_background_color',
					'botiga_header_row__main_header_row_background_color',
					'login_register_submenu_background',
					'main_header_background',
					'main_header_bottom_background',
					'main_header_sticky_active_background',
					'main_header_sticky_active_submenu_background_color',
					'main_header_submenu_background',
					'mobile_header_background',
					'mobile_offcanvas_background_color',
					'offcanvas_menu_background',
					'shop_archive_header_background_color',
					'shop_archive_header_button_background_color',
					'shop_archive_header_button_color_hover',
				),
			);

			foreach ( $theme_mods_by_slot as $slot => $theme_mods ) {
				if ( empty( $palette[ $slot ] ) ) {
					continue;
				}

				foreach ( $theme_mods as $theme_mod ) {
					set_theme_mod( $theme_mod, $palette[ $slot ] );
				}
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
			$is_botiga  = 'botiga' === $theme_slug;

			// Apply fonts based on theme.
			// Both Sydney and Botiga expect JSON format: {"font":"Font Name","regularweight":"700","category":"sans-serif"}
			$heading_value = wp_json_encode( array(
				'font' => $heading_font,
				'regularweight' => $is_botiga ? '400' : '700',
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
			} elseif ( $is_botiga ) {
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
