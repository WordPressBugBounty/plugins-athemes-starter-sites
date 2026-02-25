<?php
/**
 * Contact data replacement during import.
 *
 * Replaces dummy contact information in imported content/widgets/customizer
 * with actual values from wizard contact step.
 *
 * @package aThemes Starter Sites
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * ATSS_Onboarding_Contact_Replacer class.
 */
class ATSS_Onboarding_Contact_Replacer {

	/**
	 * Contact data from wizard state.
	 *
	 * @var array
	 */
	private $contact_data;

	/**
	 * Search/replace map.
	 *
	 * @var array
	 */
	private $replacements = array();

	/**
	 * Constructor - sets up hooks.
	 */
	public function __construct() {
		$this->load_contact_data();

		if ( empty( $this->contact_data ) ) {
			return; // No contact data to replace.
		}

		$this->build_replacements_map();

		// Hook into import filters.
		add_filter( 'wxr_importer.pre_process.post', array( $this, 'replace_in_post_data' ), 999, 4 );
		add_filter( 'wxr_importer.pre_process.post_meta', array( $this, 'replace_in_post_meta' ), 999, 2 );
		add_filter( 'atss_before_widgets_import_data', array( $this, 'replace_in_widgets_data' ), 999 );
		add_action( 'atss_import_customizer', array( $this, 'replace_in_customizer_data' ), 999 );
	}

	/**
	 * Load contact data from wizard state.
	 */
	private function load_contact_data() {
		$wizard_state      = get_option( 'atss_wizard_state', array() );
		$this->contact_data = isset( $wizard_state['data']['contact'] ) ? $wizard_state['data']['contact'] : array();
	}

	/**
	 * Build search => replace map.
	 */
	private function build_replacements_map() {
		$replacements = array();

		// Email replacement.
		if ( ! empty( $this->contact_data['businessEmail'] ) ) {
			$email = sanitize_email( $this->contact_data['businessEmail'] );
			$replacements['office@example.org'] = $email;
			$replacements['office@example.com'] = $email;
		}

		// Phone replacement.
		if ( ! empty( $this->contact_data['phoneNumber'] ) ) {
			$phone = sanitize_text_field( $this->contact_data['phoneNumber'] );
			$replacements['(123) 456-7890'] = $phone;
		}

		// Address replacement.
		if ( ! empty( $this->contact_data['address'] ) ) {
			$address = sanitize_text_field( $this->contact_data['address'] );
			$replacements['74 Pine St, NY, NY 10005'] = $address;
		}

		// Social links replacement.
		if ( ! empty( $this->contact_data['socialLinks'] ) && is_array( $this->contact_data['socialLinks'] ) ) {
			foreach ( $this->contact_data['socialLinks'] as $link ) {
				$platform = isset( $link['platform'] ) ? $link['platform'] : '';
				$url      = isset( $link['url'] ) ? esc_url_raw( $link['url'] ) : '';

				if ( empty( $platform ) || empty( $url ) ) {
					continue;
				}

				// Map platform to dummy URL patterns.
				$dummy_patterns = $this->get_social_dummy_patterns( $platform );
				foreach ( $dummy_patterns as $dummy ) {
					// Add unencoded version.
					$replacements[ $dummy ] = $url;

					// Add JSON-encoded version (for Elementor data in XML).
					$replacements[ $this->json_encode_url( $dummy ) ] = $this->json_encode_url( $url );
				}
			}
		}

		$this->replacements = apply_filters( 'atss_contact_replacements', $replacements, $this->contact_data );
	}

	/**
	 * Get dummy URL patterns for a social platform.
	 *
	 * @param string $platform Platform name (facebook, twitter, etc.).
	 * @return array Dummy URL patterns to search for.
	 */
	private function get_social_dummy_patterns( $platform ) {
		$patterns   = array();
		$domain_map = array(
			'facebook'  => 'facebook.com',
			'twitter'   => array( 'x.com', 'twitter.com' ),
			'instagram' => 'instagram.com',
			'linkedin'  => 'linkedin.com',
			'whatsapp'  => 'wa.me',
			'youtube'   => 'youtube.com',
			'tiktok'    => 'tiktok.com',
			'pinterest' => 'pinterest.com',
		);

		if ( ! isset( $domain_map[ $platform ] ) ) {
			return $patterns;
		}

		$domains = is_array( $domain_map[ $platform ] )
			? $domain_map[ $platform ]
			: array( $domain_map[ $platform ] );

		foreach ( $domains as $domain ) {
			// Add both HTTP and HTTPS versions.
			$patterns[] = 'https://' . $domain;
			$patterns[] = 'http://' . $domain;
		}

		return $patterns;
	}

	/**
	 * JSON-encode a URL by escaping forward slashes.
	 *
	 * This matches how URLs appear in Elementor data stored in XML files.
	 *
	 * @param string $url URL to encode.
	 * @return string Encoded URL with escaped forward slashes.
	 */
	private function json_encode_url( $url ) {
		return str_replace( '/', '\/', $url );
	}

	/**
	 * Replace contact data in post content.
	 *
	 * @param array $data     Post data array.
	 * @param array $meta     Post meta array.
	 * @param array $comments Comments array.
	 * @param array $terms    Terms array.
	 * @return array Modified post data.
	 */
	public function replace_in_post_data( $data, $meta, $comments, $terms ) {
		if ( empty( $data ) || empty( $this->replacements ) ) {
			return $data;
		}

		// Replace in post content fields.
		$fields_to_replace = array( 'post_content', 'post_excerpt', 'post_title' );
		foreach ( $fields_to_replace as $field ) {
			if ( isset( $data[ $field ] ) ) {
				$data[ $field ] = $this->replace_in_string( $data[ $field ] );
			}
		}

		return $data;
	}

	/**
	 * Replace contact data in individual post meta item.
	 *
	 * @param array $meta_item Meta data item.
	 * @param int   $post_id   Post ID.
	 * @return array Modified meta item.
	 */
	public function replace_in_post_meta( $meta_item, $post_id ) {
		if ( empty( $meta_item ) || empty( $this->replacements ) ) {
			return $meta_item;
		}

		if ( isset( $meta_item['value'] ) ) {
			$meta_item['value'] = $this->replace_recursively( $meta_item['value'] );
		}

		return $meta_item;
	}

	/**
	 * Replace contact data in widgets.
	 *
	 * @param object $data Widgets data object.
	 * @return object Modified widgets data.
	 */
	public function replace_in_widgets_data( $data ) {
		if ( empty( $data ) || empty( $this->replacements ) ) {
			return $data;
		}
	
		return $this->replace_recursively( $data );
	}

	/**
	 * Replace contact data in customizer settings.
	 *
	 * @param array $data Customizer data array.
	 */
	public function replace_in_customizer_data( $data ) {
		if ( empty( $data ) || empty( $this->replacements ) ) {
			return;
		}

		// Get current theme mods.
		$theme_slug = get_option( 'stylesheet' );
		$mods       = get_option( "theme_mods_{$theme_slug}" );

		if ( ! is_array( $mods ) ) {
			return;
		}

		// Replace in theme mods.
		$mods = $this->replace_recursively( $mods );

		// Update theme mods.
		update_option( "theme_mods_{$theme_slug}", $mods );
	}

	/**
	 * Recursively replace values in nested arrays/objects.
	 *
	 * @param mixed $value Value to process.
	 * @param int   $depth Current recursion depth.
	 * @return mixed Processed value.
	 */
	private function replace_recursively( $value, $depth = 0 ) {
		$max_depth = 20;

		if ( $depth > $max_depth ) {
			return $value;
		}

		if ( is_string( $value ) ) {
			return $this->replace_in_string( $value );
		}

		if ( is_array( $value ) ) {
			foreach ( $value as $key => $item ) {
				$value[ $key ] = $this->replace_recursively( $item, $depth + 1 );
			}
		}

		if ( is_object( $value ) ) {
			foreach ( $value as $key => $item ) {
				$value->$key = $this->replace_recursively( $item, $depth + 1 );
			}
		}

		return $value;
	}

	/**
	 * Replace dummy values in a string.
	 *
	 * @param string $content Content to process.
	 * @return string Processed content.
	 */
	private function replace_in_string( $content ) {
		if ( empty( $content ) || ! is_string( $content ) ) {
			return $content;
		}

		foreach ( $this->replacements as $search => $replace ) {
			$content = str_replace( $search, $replace, $content );
		}

		return $content;
	}
}
