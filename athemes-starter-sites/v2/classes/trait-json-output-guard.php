<?php
/**
 * Shared output-buffer guard for AJAX JSON responses.
 *
 * @package Athemes Starter Sites
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! trait_exists( 'ATSS_Json_Output_Guard' ) ) {

	/**
	 * Discards buffered stray output before a JSON response is sent.
	 *
	 * PHP notices, warnings and plugin echoes emitted while an AJAX request
	 * runs land in whatever output buffer is open and get prepended to the
	 * JSON body, which surfaces client-side as an unreadable parse error.
	 * Every handler drains through this one helper so the behaviour can only
	 * ever change in a single place.
	 */
	trait ATSS_Json_Output_Guard {

		/**
		 * Discard every open output buffer.
		 *
		 * Stops early when a buffer refuses to close, so a non-removable
		 * buffer cannot spin this loop forever.
		 *
		 * @return void
		 */
		protected function discard_stray_output() {
			while ( ob_get_level() > 0 ) {
				if ( ! ob_end_clean() ) {
					break;
				}
			}
		}
	}
}
