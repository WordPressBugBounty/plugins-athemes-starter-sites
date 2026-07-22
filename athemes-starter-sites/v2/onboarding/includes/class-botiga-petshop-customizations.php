<?php
/**
 * Botiga Pet Shop onboarding customizations.
 *
 * Applies the Botiga Pet Shop demo's color and typography customizations from
 * the onboarding wizard. Hooks into the generic customization handler via the
 * `atss_apply_wizard_customizations` action, and bails out unless the Pet Shop
 * demo is the one being set up.
 *
 * The mega-menu getter helpers this class relies on
 * (`atss_botiga_get_petshop_mega_menu_content_block()` and
 * `atss_botiga_get_petshop_mega_menu_items()`) remain in v2/themes/botiga.php,
 * where they are shared with the import path. This file is required and
 * instantiated from botiga.php, so those functions are always available when
 * these methods run.
 *
 * @package Athemes Starter Sites
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'ATSS_Onboarding_Botiga_Petshop_Customizations' ) ) {

	/**
	 * Botiga Pet Shop onboarding customizations class.
	 *
	 * Applies the Pet Shop demo's palette colors and heading font weight from the
	 * wizard. Every entry point is gated on the Pet Shop demo being the one the
	 * user selected (see is_petshop_demo()), so the class is inert for every other
	 * Botiga demo.
	 */
	class ATSS_Onboarding_Botiga_Petshop_Customizations {

		/**
		 * Constructor.
		 *
		 * Registers the wizard customization hooks.
		 */
		public function __construct() {
			add_action( 'atss_apply_wizard_customizations', array( $this, 'apply_palette_colors' ), 10, 2 );
			add_action( 'atss_apply_wizard_customizations', array( $this, 'update_heading_weight' ), 20, 2 );
		}

		/**
		 * Whether the wizard is setting up the Pet Shop demo.
		 *
		 * Central guard for every customization in this class so the Pet Shop
		 * scope is defined in exactly one place.
		 *
		 * @since 1.4.1
		 * @param array $full_state Complete onboarding wizard state.
		 *
		 * @return bool
		 */
		private function is_petshop_demo( $full_state ) {
			$design_data = isset( $full_state['data']['design'] )
				? (array) $full_state['data']['design']
				: array();

			$demo_id = isset( $design_data['selectedSiteId'] )
				? sanitize_key( $design_data['selectedSiteId'] )
				: '';

			return 'petshop' === $demo_id;
		}

		/**
		 * Apply the selected onboarding palette to Pet Shop colors.
		 *
		 * Updates the Pet Shop theme-mod-backed controls and imported Icon block
		 * colors. The demo's original colors remain unchanged when the user does not
		 * select or modify a color scheme in the onboarding wizard.
		 *
		 * @since 1.4.1
		 * @param array $customize_data Customize-step wizard data.
		 * @param array $full_state     Complete onboarding wizard state.
		 *
		 * @return void
		 */
		public function apply_palette_colors( $customize_data, $full_state ) {
			if ( ! $this->is_petshop_demo( $full_state ) ) {
				return;
			}

			$selected_color_scheme = isset(
				$customize_data['selectedColorScheme']
			)
				? sanitize_key(
					$customize_data['selectedColorScheme']
				)
				: '';

			$colors = isset( $customize_data['customColors'] )
				? (array) $customize_data['customColors']
				: array();

			/*
			 * No palette was selected or modified in the wizard.
			 * Preserve the colors included in the demo import.
			 */
			if ( '' === $selected_color_scheme || empty( $colors ) ) {
				return;
			}

			$palette_colors = $this->get_palette_colors( $colors );

			$this->update_theme_mod_colors( $palette_colors );

			$content_posts = array();
			$page_titles   = array(
				'Home',
				'About',
				'Contact',
			);

			foreach ( $page_titles as $page_title ) {
				$page = ATSS_Core_Helpers::atss_get_page_by_title( $page_title );

				if ( ! empty( $page ) ) {
					$content_posts[] = $page;
				}
			}

			$mega_menu_content_block = atss_botiga_get_petshop_mega_menu_content_block();

			if ( ! empty( $mega_menu_content_block ) ) {
				$content_posts[] = $mega_menu_content_block;
			}

			foreach ( $content_posts as $content_post ) {
				if ( empty( $content_post->post_content ) ) {
					continue;
				}

				$original = $content_post->post_content;
				$changed  = false;
				$blocks   = parse_blocks( $original );
				$blocks   = $this->update_athemes_block_colors( $blocks, $palette_colors, $changed );

				$content = $changed ? serialize_blocks( $blocks ) : $original;

				/*
				 * The demo authors its light section backgrounds with the editor
				 * palette preset "color-4". That slot is the light section color
				 * only in the demo's own palette; in most palettes slot index 4 is
				 * the mid-tone borders color (e.g. #ACA2A1 in palette6), so the
				 * sections render gray on the front end. The onboarding preview
				 * force-paints .has-color-4-background-color with slot 6 (the
				 * content-cards color) via the petshop_color_6 rule. Preset
				 * "color-5" resolves to that same slot-6 color, so remapping the
				 * background preset from color-4 to color-5 reproduces the preview
				 * exactly. Text presets (color-2 headings, color-3 body, etc.) are
				 * left untouched — they already resolve correctly.
				 */
				$content = str_replace(
					array(
						'"backgroundColor":"color-4"',
						'has-color-4-background-color',
					),
					array(
						'"backgroundColor":"color-5"',
						'has-color-5-background-color',
					),
					$content
				);

				if ( $content === $original ) {
					continue;
				}

				wp_update_post(
					wp_slash(
						array(
							'ID'           => $content_post->ID,
							'post_content' => $content,
						)
					)
				);
			}
		}

		/**
		 * Set the Pet Shop headings font weight after wizard customizations.
		 *
		 * This runs after the general typography customization so the selected
		 * heading font is preserved while its regular weight is changed to 700.
		 *
		 * @since 1.4.1
		 * @param array $customize_data Customize-step wizard data.
		 * @param array $full_state     Complete onboarding wizard state.
		 *
		 * @return void
		 */
		public function update_heading_weight( $customize_data, $full_state ) {
			unset( $customize_data );

			if ( ! $this->is_petshop_demo( $full_state ) ) {
				return;
			}

			$headings_font = get_theme_mod(
				'botiga_headings_font',
				''
			);

			if ( is_string( $headings_font ) ) {
				$headings_font = json_decode(
					$headings_font,
					true
				);
			}

			if ( is_array( $headings_font ) ) {
				$headings_font['regularweight'] = '700';

				set_theme_mod(
					'botiga_headings_font',
					wp_json_encode( $headings_font )
				);
			}

			/*
			 * Refresh Botiga's generated CSS after all Pet Shop theme-mod
			 * customizations have finished.
			 */
			if ( class_exists( 'Botiga_Custom_CSS' ) ) {
				Botiga_Custom_CSS::get_instance()->update_custom_css_file();
			}
		}

		/**
		 * Get the selected Pet Shop palette colors.
		 *
		 * @since 1.4.1
		 * @param array $colors Onboarding color values.
		 *
		 * @return array
		 */
		private function get_palette_colors( $colors ) {
			$palette_sources = array(
				'color1' => array(
					'--bt-color-button-bg',
				),
				'color2' => array(
					'--bt-color-button-bg-hover',
				),
				'color3' => array(
					'--bt-color-post-title',
					'--bt-color-heading-1',
				),
				'color4' => array(
					'--bt-color-body-text',
				),
				'color5' => array(
					'--bt-color-forms-borders',
				),
				'color6' => array(
					'--bt-color-content-cards-bg',
				),
				'color7' => array(
					'--bt-color-bg',
				),
				'color8' => array(
					'--bt-color-menu-bg',
					'--bt-color-bg',
				),
			);

			$palette_colors = array();

			foreach ( $palette_sources as $slot => $sources ) {
				$palette_colors[ $slot ] = '';

				foreach ( $sources as $source ) {
					if ( empty( $colors[ $source ] ) ) {
						continue;
					}

					$color = sanitize_hex_color(
						$colors[ $source ]
					);

					if ( ! $color ) {
						continue;
					}

					$palette_colors[ $slot ] = $color;

					break;
				}
			}

			return $palette_colors;
		}

		/**
		 * Apply the selected palette to Pet Shop theme mods.
		 *
		 * @since 1.4.1
		 * @param array $palette_colors Colors indexed by palette slot.
		 *
		 * @return void
		 */
		private function update_theme_mod_colors( $palette_colors ) {
			$theme_mods_by_slot = array(
				'color1' => array(
					'bhfb_mobile_offcanvas_close_text_color_hover',
					'bhfb_search_form_button_background_color',
					'bhfb_search_form_button_border_color',
					'bhfb_search_icon_color_hover',
					'botiga_section_fb_component__copyright_links_color_hover',
					'botiga_section_fb_component__widget1_links_color_hover',
					'botiga_section_fb_component__widget2_links_color_hover',
					'botiga_section_fb_component__widget3_links_color_hover',
					'botiga_section_fb_component__widget4_links_color_hover',
					'breadcrumbs_link_hover_color',
					'footer_menu_color_hover',
					'main_header_minicart_count_background_color',
					'mobile_offcanvas_menu_color_hover',
					'mobile_offcanvas_menu_submenu_color_hover',
					'product_swatch_button_border_color_default',
					'product_swatch_button_text_color_default',
					'product_swatch_image_border_color_hover',
					'shop_product_product_title_hover',
					'shop_product_wishlist_icon_active_color',
				),

				'color2' => array(
					'botiga_header_row__above_header_row_background_color',
					'botiga_section_fb_component__widget1_title_color',
					'botiga_section_fb_component__widget2_title_color',
					'botiga_section_fb_component__widget3_title_color',
					'botiga_section_fb_component__widget4_title_color',
					'breadcrumbs_link_color',
				),

				'color3' => array(
					'bhfb_search_form_button_background_color_hover',
					'bhfb_search_form_button_border_color_hover',
					'loop_post_meta_color',
					'loop_post_title_color',
					'mobile_offcanvas_menu_color',
					'mobile_offcanvas_menu_submenu_color',
					'product_swatch_button_border_color_hover',
					'product_swatch_button_text_color_hover',
					'secondary_menu_submenu_color',
					'shop_archive_slide_sidebar_close_icon_color',
					'single_post_title_color',
				),

				'color4' => array(
					'bhfb_mobile_offcanvas_close_text_color',
					'bhfb_search_form_input_placeholder_color',
					'bhfb_search_form_input_text_color',
					'bhfb_woo_icons_color_hover',
					'botiga_section_fb_component__copyright_links_color',
					'botiga_section_fb_component__copyright_text_color',
					'botiga_section_fb_component__widget1_links_color',
					'botiga_section_fb_component__widget1_text_color',
					'botiga_section_fb_component__widget2_links_color',
					'botiga_section_fb_component__widget2_text_color',
					'botiga_section_fb_component__widget3_links_color',
					'botiga_section_fb_component__widget3_text_color',
					'botiga_section_fb_component__widget4_links_color',
					'botiga_section_fb_component__widget4_text_color',
					'breadcrumbs_color',
					'footer_menu_color',
					'loop_post_text_color',
					'shop_archive_slide_sidebar_close_icon_color_hover',
					'single_sticky_add_to_cart_style_color_content',
				),

				'color5' => array(
					'bhfb_search_form_input_border_color',
					'breadcrumbs_border_bottom_color',
					'shop_archive_header_border_color',
					'shop_archive_slide_sidebar_widgets_divider_color',
				),

				'color6' => array(
					'botiga_section_hb_component__html_link_color_hover',
					'product_swatch_button_background_color_hover',
					'product_swatch_image_border_color_default',
					'secondary_menu_submenu_background',
					'secondary_menu_submenu_color_hover',
					'shop_product_wishlist_icon_background_color',
					'single_product_related_section_background_color',
					'single_product_tabs_background_color',
					'single_product_tabs_background_color_active',
				),

				'color7' => array(
					'bhfb_mobile_offcanvas_close_background_color',
					'botiga_section_hb_component__html2_link_color',
					'botiga_section_hb_component__html2_link_color_hover',
					'botiga_section_hb_component__html2_text_color',
					'botiga_section_hb_component__html_link_color',
					'botiga_section_hb_component__html_text_color',
					'login_register_submenu_background',
					'main_header_sticky_active_submenu_background_color',
					'offcanvas_menu_background',
					'product_swatch_button_background_color_default',
					'secondary_menu_color',
					'secondary_menu_color_hover',
					'shop_archive_header_button_background_color',
					'shop_archive_header_button_color_hover',
					'shop_archive_slide_sidebar_background_color',
					'single_product_upsell_section_background_color',
				),
			);

			foreach ( $theme_mods_by_slot as $slot => $theme_mods ) {
				if ( empty( $palette_colors[ $slot ] ) ) {
					continue;
				}

				foreach ( $theme_mods as $theme_mod ) {
					set_theme_mod(
						$theme_mod,
						$palette_colors[ $slot ]
					);
				}
			}
		}

		/**
		 * Update Pet Shop aThemes Blocks colors recursively.
		 *
		 * @since 1.4.1
		 * @param array $blocks         Parsed WordPress blocks.
		 * @param array $palette_colors Colors indexed by palette slot.
		 * @param bool  $changed        Whether a block was changed.
		 *
		 * @return array
		 */
		private function update_athemes_block_colors( $blocks, $palette_colors, &$changed ) {
			$color1 = isset( $palette_colors['color1'] ) ? $palette_colors['color1'] : '';
			$color2 = isset( $palette_colors['color2'] ) ? $palette_colors['color2'] : '';
			$color6 = isset( $palette_colors['color6'] ) ? $palette_colors['color6'] : '';
			$color7 = isset( $palette_colors['color7'] ) ? $palette_colors['color7'] : '';

			foreach ( $blocks as &$block ) {
				$block_name = isset( $block['blockName'] )
					? (string) $block['blockName']
					: '';

				if ( ! isset( $block['attrs'] ) || ! is_array( $block['attrs'] ) ) {
					$block['attrs'] = array();
				}

				if ( 'athemes-blocks/icon' === $block_name ) {
					if ( $color2 && $this->update_block_color_attribute( $block['attrs'], 'color', $color2 ) ) {
						$changed = true;
					}

					$current_background = isset(
						$block['attrs']['iconWrapperBackgroundColor']['desktop']['value']['defaultState']
					)
						? trim(
							(string) $block['attrs']['iconWrapperBackgroundColor']['desktop']['value']['defaultState']
						)
						: '';

					/*
					 * Preserve icons that intentionally have no wrapper background.
					 */
					if (
						$color6 &&
						'' !== $current_background &&
						$this->update_block_color_attribute(
							$block['attrs'],
							'iconWrapperBackgroundColor',
							$color6
						)
					) {
						$changed = true;
					}
				}

				if ( 'athemes-blocks/taxonomy-grid' === $block_name && $color2 ) {
					if ( $this->update_block_color_attribute( $block['attrs'], 'titleColor', $color2, $color2 ) ) {
						$changed = true;
					}

					if ( $this->update_block_color_attribute( $block['attrs'], 'navigationColor', $color2, $color2 ) ) {
						$changed = true;
					}

					if ( $this->update_block_color_attribute( $block['attrs'], 'dotsColor', $color2 ) ) {
						$changed = true;
					}
				}

				if ( 'athemes-blocks/post-grid' === $block_name ) {
					if ( $color2 && $this->update_block_color_attribute( $block['attrs'], 'navigationColor', $color2, $color2 ) ) {
						$changed = true;
					}

					if ( $color2 && $this->update_block_color_attribute( $block['attrs'], 'dotsColor', $color2 ) ) {
						$changed = true;
					}

					if ( $color1 && $color2 && $this->update_block_color_attribute( $block['attrs'], 'titleColor', $color2, $color1 ) ) {
						$changed = true;
					}

					if ( $color2 && $this->update_block_color_attribute( $block['attrs'], 'metaColor', $color2 ) ) {
						$changed = true;
					}

					if ( $color1 && $color7 && $this->update_block_color_attribute( $block['attrs'], 'buttonColor', $color1, $color7 ) ) {
						$changed = true;
					}

					if ( $color2 && $color7 && $this->update_block_color_attribute( $block['attrs'], 'buttonBackgroundColor', $color7, $color2 ) ) {
						$changed = true;
					}

					if ( $color1 && $color2 && $this->update_block_border_color_attribute( $block['attrs'], 'buttonBorder', $color1, $color2 ) ) {
						$changed = true;
					}
				}

				if ( ! empty( $block['innerBlocks'] ) ) {
					$block['innerBlocks'] = $this->update_athemes_block_colors( $block['innerBlocks'], $palette_colors, $changed );
				}
			}

			unset( $block );

			return $blocks;
		}

		/**
		 * Update a standard aThemes Blocks color-picker attribute.
		 *
		 * @since 1.4.1
		 * @param array       $attributes     Block attributes.
		 * @param string      $attribute_name Color attribute name.
		 * @param string|null $default_color  Default-state color.
		 * @param string|null $hover_color    Hover-state color.
		 *
		 * @return bool
		 */
		private function update_block_color_attribute( &$attributes, $attribute_name, $default_color = null, $hover_color = null ) {
			$current_value = isset( $attributes[ $attribute_name ]['desktop']['value'] )
				? (array) $attributes[ $attribute_name ]['desktop']['value']
				: array();

			$updated_value = $current_value;

			if ( null !== $default_color ) {
				$updated_value['defaultState'] = $default_color;
			}

			if ( null !== $hover_color ) {
				$updated_value['hoverState'] = $hover_color;
			}

			if ( $current_value === $updated_value ) {
				return false;
			}

			if ( ! isset( $attributes[ $attribute_name ] ) || ! is_array( $attributes[ $attribute_name ] ) ) {
				$attributes[ $attribute_name ] = array();
			}

			if ( ! isset( $attributes[ $attribute_name ]['desktop'] ) || ! is_array( $attributes[ $attribute_name ]['desktop'] ) ) {
				$attributes[ $attribute_name ]['desktop'] = array();
			}

			$attributes[ $attribute_name ]['desktop']['value'] = $updated_value;

			return true;
		}

		/**
		 * Update an aThemes Blocks border color attribute.
		 *
		 * @since 1.4.1
		 * @param array       $attributes     Block attributes.
		 * @param string      $attribute_name Border attribute name.
		 * @param string|null $default_color  Default-state color.
		 * @param string|null $hover_color    Hover-state color.
		 *
		 * @return bool
		 */
		private function update_block_border_color_attribute( &$attributes, $attribute_name, $default_color = null, $hover_color = null ) {
			$current_value = isset(
				$attributes[ $attribute_name ]['innerSettings']['borderColor']['default']['desktop']['value']
			)
				? (array) $attributes[ $attribute_name ]['innerSettings']['borderColor']['default']['desktop']['value']
				: array();

			$updated_value = $current_value;

			if ( null !== $default_color ) {
				$updated_value['defaultState'] = $default_color;
			}

			if ( null !== $hover_color ) {
				$updated_value['hoverState'] = $hover_color;
			}

			if ( $current_value === $updated_value ) {
				return false;
			}

			if ( ! isset( $attributes[ $attribute_name ] ) || ! is_array( $attributes[ $attribute_name ] ) ) {
				$attributes[ $attribute_name ] = array();
			}

			if ( ! isset( $attributes[ $attribute_name ]['innerSettings'] ) || ! is_array( $attributes[ $attribute_name ]['innerSettings'] ) ) {
				$attributes[ $attribute_name ]['innerSettings'] = array();
			}

			if ( ! isset( $attributes[ $attribute_name ]['innerSettings']['borderColor'] ) || ! is_array( $attributes[ $attribute_name ]['innerSettings']['borderColor'] ) ) {
				$attributes[ $attribute_name ]['innerSettings']['borderColor'] = array();
			}

			if ( ! isset( $attributes[ $attribute_name ]['innerSettings']['borderColor']['default'] ) || ! is_array( $attributes[ $attribute_name ]['innerSettings']['borderColor']['default'] ) ) {
				$attributes[ $attribute_name ]['innerSettings']['borderColor']['default'] = array();
			}

			if ( ! isset( $attributes[ $attribute_name ]['innerSettings']['borderColor']['default']['desktop'] ) || ! is_array( $attributes[ $attribute_name ]['innerSettings']['borderColor']['default']['desktop'] ) ) {
				$attributes[ $attribute_name ]['innerSettings']['borderColor']['default']['desktop'] = array();
			}

			$attributes[ $attribute_name ]['innerSettings']['borderColor']['default']['desktop']['value'] = $updated_value;

			return true;
		}
	}
}
