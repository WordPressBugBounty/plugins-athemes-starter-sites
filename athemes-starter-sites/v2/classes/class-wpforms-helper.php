<?php
/**
 * WPForms helper.
 *
 * Demo-agnostic helpers for working with imported WPForms references. WXR
 * remaps the WPForms post ID on import, but form IDs embedded inside page
 * content, Elementor data, and Customizer shortcodes still point at the source
 * site's IDs. These helpers rewrite those references to the local IDs.
 *
 * @package    Athemes Starter Sites
 * @subpackage Core
 * @since      1.4.1
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'ATSS_WPForms_Helper' ) ) {

	/**
	 * WPForms helper class.
	 */
	class ATSS_WPForms_Helper {

		/**
		 * Replace an imported WPForms source ID with its local ID.
		 *
		 * Covers Gutenberg block attributes (`formId`/`form_id`) and the
		 * `[wpforms]` shortcode in both single- and double-quoted forms.
		 *
		 * @since 1.4.1
		 * @param string $content   Content containing a WPForms reference.
		 * @param int    $source_id Source form ID from the export.
		 * @param int    $target_id Imported form ID on the current site.
		 *
		 * @return string
		 */
		public static function replace_form_id( $content, $source_id, $target_id ) {
			if ( ! is_string( $content ) || '' === $content ) {
				return $content;
			}

			return str_replace(
				array(
					'"formId":"' . $source_id . '"',
					'"form_id":"' . $source_id . '"',
					'[wpforms id="' . $source_id . '"]',
					"[wpforms id='" . $source_id . "']",
				),
				array(
					'"formId":"' . $target_id . '"',
					'"form_id":"' . $target_id . '"',
					'[wpforms id="' . $target_id . '"]',
					"[wpforms id='" . $target_id . "']",
				),
				$content
			);
		}
	}
}
