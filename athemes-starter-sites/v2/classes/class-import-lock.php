<?php
/**
 * One site-wide lock shared by every writing import handler.
 *
 * @package    Athemes Starter Sites
 * @subpackage Core
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Import Lock Class
 *
 * A gateway timeout does not stop the PHP request behind it, so a client
 * retry can overlap the request it replaces. Every writing import handler
 * holds this lock while it runs. The lock is a transient holding a token
 * unique to the request that took it, and it expires on a TTL because a
 * hard-killed worker never runs its shutdown release.
 *
 * The headless import path never takes the lock. In a request that holds no
 * token, refresh() and release() do nothing.
 *
 * With a persistent object cache, read() relies on the cache drop-in honoring
 * the $force argument of wp_cache_get(); a drop-in that ignores it would
 * reintroduce stale reads.
 */
class Athemes_Starter_Sites_Import_Lock {

	/**
	 * Transient name.
	 *
	 * @var string
	 */
	const TRANSIENT = 'atss_import_lock';

	/**
	 * Minimum seconds between two lock writes by refresh().
	 *
	 * @var int
	 */
	const REFRESH_INTERVAL = 10;

	/**
	 * This request's token. Empty until the first successful acquire().
	 *
	 * @var string
	 */
	private static $token = '';

	/**
	 * TTL used by refresh_after_http_call().
	 *
	 * @var int
	 */
	private static $ttl = 150;

	/**
	 * When this request last wrote the lock (microtime), 0 before the first write.
	 *
	 * @var float
	 */
	private static $last_write = 0;

	/**
	 * Take the lock for this request.
	 *
	 * @param int $ttl          Lock lifetime in seconds.
	 * @param int $wait_seconds Seconds to wait for another request's lock before taking it over. 0 means do not wait.
	 * @return bool True when this request now holds the lock, false when another request holds it and $wait_seconds is 0.
	 */
	public static function acquire( $ttl = 150, $wait_seconds = 0 ) {

		$token  = ( '' !== self::$token ) ? self::$token : self::generate_token();
		$holder = self::read();

		if ( $holder && $token !== $holder ) {

			if ( $wait_seconds <= 0 ) {
				return false;
			}

			// Re-check every 2 s. Take the lock over if it is still held after $wait_seconds.
			$waited = 0;

			while ( $holder && $token !== $holder && $waited < $wait_seconds ) {
				sleep( 2 );
				$waited += 2;
				$holder  = self::read();
			}
		}

		set_transient( self::TRANSIENT, $token, $ttl );
		self::$last_write = microtime( true );

		if ( '' === self::$token ) {
			self::$token = $token;
			self::$ttl   = (int) $ttl;

			register_shutdown_function( array( __CLASS__, 'release' ) );
			add_action( 'http_api_debug', array( __CLASS__, 'refresh_after_http_call' ) );
		}

		return true;

	}

	/**
	 * Extend the lock, but only while this request holds it.
	 *
	 * Skips both the read and the write when this request wrote the lock less
	 * than REFRESH_INTERVAL seconds ago, whatever $ttl the last write used.
	 *
	 * @param int $ttl Lock lifetime in seconds, counted from now.
	 * @return bool True while this request holds the lock, false when it never
	 *              took it or a read shows another request's token or no lock.
	 */
	public static function refresh( $ttl = 150 ) {

		if ( '' === self::$token ) {
			return false;
		}

		// Only a write sets $last_write, and a write happens only while the
		// lock is held, so the last known state is held.
		if ( microtime( true ) - self::$last_write < self::REFRESH_INTERVAL ) {
			return true;
		}

		if ( self::$token !== self::read() ) {
			return false;
		}

		set_transient( self::TRANSIENT, self::$token, $ttl );
		self::$last_write = microtime( true );

		return true;

	}

	/**
	 * Delete the lock, but only while this request holds it.
	 *
	 * Called before every JSON response and again on shutdown, which covers
	 * fatals and other exits.
	 *
	 * @return void
	 */
	public static function release() {

		if ( '' === self::$token ) {
			return;
		}

		if ( self::$token === self::read() ) {
			delete_transient( self::TRANSIENT );
		}

	}

	/**
	 * Extend the lock after every outgoing HTTP call. Hooked to http_api_debug.
	 *
	 * @return bool See refresh().
	 */
	public static function refresh_after_http_call() {

		return self::refresh( self::$ttl );

	}

	/**
	 * A token unique to this request.
	 *
	 * wp_generate_uuid4() exists since WordPress 4.7. Older versions get a
	 * random 32-character string.
	 *
	 * @return string
	 */
	private static function generate_token() {

		if ( function_exists( 'wp_generate_uuid4' ) ) {
			return wp_generate_uuid4();
		}

		return wp_generate_password( 32, false );

	}

	/**
	 * Read the lock as stored now, not as this request cached it.
	 *
	 * get_transient() answers from the in-request option cache, which still
	 * holds this request's own last write. The token checks above must see a
	 * lock that another request wrote, took over or deleted since then.
	 *
	 * @return string|false The holder's token, or false when the lock is free.
	 */
	private static function read() {

		if ( wp_using_ext_object_cache() ) {
			return wp_cache_get( self::TRANSIENT, 'transient', true );
		}

		$option  = '_transient_' . self::TRANSIENT;
		$timeout = '_transient_timeout_' . self::TRANSIENT;

		wp_cache_delete( $option, 'options' );
		wp_cache_delete( $timeout, 'options' );

		$notoptions = wp_cache_get( 'notoptions', 'options' );

		if ( is_array( $notoptions ) && ( isset( $notoptions[ $option ] ) || isset( $notoptions[ $timeout ] ) ) ) {
			unset( $notoptions[ $option ], $notoptions[ $timeout ] );
			wp_cache_set( 'notoptions', $notoptions, 'options' );
		}

		return get_transient( self::TRANSIENT );

	}

}
