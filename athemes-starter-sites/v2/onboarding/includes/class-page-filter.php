<?php
/**
 * Onboarding wizard page filter.
 *
 * Filters pages during import based on user selection in the wizard.
 *
 * @package Athemes Starter Sites
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'ATSS_Onboarding_Page_Filter' ) ) {

	/**
	 * Handles filtering of pages during WXR import.
	 */
	class ATSS_Onboarding_Page_Filter {

		/**
		 * Selected pages from wizard state (lazy loaded).
		 *
		 * @var array|null
		 */
		private $selected_pages = null;

		/**
		 * Constructor - registers the filter hook.
		 */
		public function __construct() {
			add_filter( 'wxr_importer.pre_process.post', array( $this, 'maybe_skip_page' ), 10, 4 );
		}

		/**
		 * Filter callback to skip pages not selected in wizard.
		 *
		 * @param array $data     Post data.
		 * @param array $meta     Post meta.
		 * @param array $comments Post comments.
		 * @param array $terms    Post terms.
		 * @return array Post data or empty array to skip.
		 */
		public function maybe_skip_page( $data, $meta, $comments, $terms ) {
			// Only filter pages.
			if ( empty( $data ) || ! isset( $data['post_type'] ) || 'page' !== $data['post_type'] ) {
				return $data;
			}

			// Get selected pages from wizard state (lazy load).
			if ( null === $this->selected_pages ) {
				$this->load_selected_pages();
			}

			// If no filter set (empty array means no wizard state), import all pages.
			if ( empty( $this->selected_pages ) ) {
				return $data;
			}

			// Check if this page's ID is in selected pages.
			$post_id = isset( $data['post_id'] ) ? $data['post_id'] : '';
			if ( ! in_array( $post_id, $this->selected_pages, true ) ) {
				// Skip this page by returning empty array.
				return array();
			}

			return $data;
		}

		/**
		 * Load selected pages from wizard state option.
		 *
		 * @return void
		 */
		private function load_selected_pages() {
			$state = get_option( 'atss_wizard_state', array() );

			// Get selected pages from nested data structure.
			$this->selected_pages = isset( $state['data']['pages']['selectedPages'] )
				? array_map( 'strval', $state['data']['pages']['selectedPages'] )
				: array();
		}
	}
}
