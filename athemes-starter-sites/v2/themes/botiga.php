<?php

if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}


/**
 * Load Botiga Pet Shop onboarding wizard customizations (color and typography).
 *
 * The Pet Shop color and typography customizations applied from the onboarding
 * wizard live in v2/onboarding/includes/class-botiga-petshop-customizations.php.
 * They are loaded here, rather than by the onboarding wizard, so they only run
 * when the Botiga theme is active - matching how this config file is itself
 * conditionally required in ATSS_Core::theme_configs().
 */
if ( ! class_exists( 'ATSS_Onboarding_Botiga_Petshop_Customizations' ) ) {
	require_once ATSS_PATH . 'v2/onboarding/includes/class-botiga-petshop-customizations.php';
}

new ATSS_Onboarding_Botiga_Petshop_Customizations();
/**
 * Starter Register Demos
 */
function botiga_demos_list() {

	$plugins = array();

	$plugins[] = array(
		'name'     => 'WooCommerce',
		'slug'     => 'woocommerce',
		'path'     => 'woocommerce/woocommerce.php',
		'required' => true
	);

	$plugins[] = array(
		'name'     => 'Merchant',
		'slug'     => 'merchant',
		'path'     => 'merchant/merchant.php',
		'required' => false
	);

	$demos = array(
		'beauty'      => array(
			'name'       => esc_html__( 'Beauty', 'botiga' ),
			'type'       => 'free',
			'categories' => array( 'ecommerce' ),
			'builders'   => array(
				'gutenberg',
				'elementor',
			),
			'preview'    => 'https://demo.athemes.com/botiga/',
			'thumbnail'  => 'https://athemes.com/themes-demo-content/botiga/beauty/thumb.png',
			'plugins'    => array_merge(
				$plugins,
				array(
					array(
						'name'     => 'WPForms',
						'slug'     => 'wpforms-lite',
						'path'     => 'wpforms-lite/wpforms.php',
						'required' => false
					)
				),
			),
			'import'         => array(
				'gutenberg'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/beauty/botiga-dc-beauty.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/beauty/botiga-w-beauty.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/beauty/botiga-c-beauty.dat'
				),
				'elementor'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/elementor/beauty/botiga-dc-beauty-el.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/elementor/beauty/botiga-w-beauty-el.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/elementor/beauty/botiga-c-beauty-el.dat'
				),
			),
		),
		'apparel'   => array(
			'name'       => esc_html__( 'Apparel', 'athemes-starter-sites' ),
			'type'       => 'pro',
			'categories' => array( 'ecommerce' ),
			'builders'   => array(
				'gutenberg',
				'elementor',
			),
			'preview'    => 'https://demo.athemes.com/botiga-apparel/',
			'thumbnail'  => 'https://athemes.com/themes-demo-content/botiga/apparel/thumb.png',
			'plugins'    => array_merge(
				$plugins,
				array(
					array(
						'name'     => 'WPForms',
						'slug'     => 'wpforms-lite',
						'path'     => 'wpforms-lite/wpforms.php',
						'required' => false
					)
				),
			),
			'import'         => array(
				'gutenberg'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/apparel/botiga-dc-apparel.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/apparel/botiga-w-apparel.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/apparel/botiga-c-apparel.dat'
				),
				'elementor'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/elementor/apparel/botiga-dc-apparel-el.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/elementor/apparel/botiga-w-apparel-el.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/elementor/apparel/botiga-c-apparel-el.dat'
				),
			),
		),
		'furniture'   => array(
			'name'       => esc_html__( 'Furniture', 'athemes-starter-sites' ),
			'type'       => 'pro',
			'categories' => array( 'ecommerce' ),
			'builders'   => array(
				'gutenberg',
				'elementor',
			),
			'preview'    => 'https://demo.athemes.com/botiga-furniture/',
			'thumbnail'  => 'https://athemes.com/themes-demo-content/botiga/furniture/thumb.png',
			'plugins'    => array_merge(
				$plugins,
				array(
					array(
						'name'     => 'WPForms',
						'slug'     => 'wpforms-lite',
						'path'     => 'wpforms-lite/wpforms.php',
						'required' => false
					)
				),
			),
			'import'         => array(
				'gutenberg'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/furniture/botiga-dc-furniture.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/furniture/botiga-w-furniture.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/furniture/botiga-c-furniture.dat'
				),
				'elementor'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/elementor/furniture/botiga-dc-furniture-el.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/elementor/furniture/botiga-w-furniture-el.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/elementor/furniture/botiga-c-furniture-el.dat'
				),
			),
		),
		'jewelry'   => array(
			'name'       => esc_html__( 'Jewelry', 'athemes-starter-sites' ),
			'type'       => 'pro',
			'categories' => array( 'ecommerce' ),
			'builders'   => array(
				'gutenberg',
				'elementor',
			),
			'preview'    => 'https://demo.athemes.com/botiga-jewelry/',
			'thumbnail'  => 'https://athemes.com/themes-demo-content/botiga/jewelry/thumb.png',
			'plugins'    => array_merge(
				$plugins,
				array(
					array(
						'name'     => 'WPForms',
						'slug'     => 'wpforms-lite',
						'path'     => 'wpforms-lite/wpforms.php',
						'required' => false
					)
				),
			),
			'import'         => array(
				'gutenberg'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/jewelry/botiga-dc-jewelry.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/jewelry/botiga-w-jewelry.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/jewelry/botiga-c-jewelry.dat'
				),
				'elementor'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/elementor/jewelry/botiga-dc-jewelry-el.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/elementor/jewelry/botiga-w-jewelry-el.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/elementor/jewelry/botiga-c-jewelry-el.dat'
				),
			),
		),
		'single-product'   => array(
			'name'       => esc_html__( 'Single Product', 'athemes-starter-sites' ),
			'type'       => 'pro',
			'categories' => array( 'ecommerce' ),
			'builders'   => array(
				'gutenberg',
				'elementor',
			),
			'preview'    => 'https://demo.athemes.com/botiga-single-product/',
			'thumbnail'  => 'https://athemes.com/themes-demo-content/botiga/single-product/thumb.png',
			'plugins'    => array_merge(
				$plugins,
				array(
					array(
						'name'     => 'WPForms',
						'slug'     => 'wpforms-lite',
						'path'     => 'wpforms-lite/wpforms.php',
						'required' => false
					)
				),
			),
			'import'         => array(
				'gutenberg'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/single-product/botiga-dc-single-product.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/single-product/botiga-w-single-product.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/single-product/botiga-c-single-product.dat'
				),
				'elementor'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/elementor/single-product/botiga-dc-single-product-el.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/elementor/single-product/botiga-w-single-product-el.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/elementor/single-product/botiga-c-single-product-el.dat'
				),
			),
		),
		'multi-vendor' => array(
			'name'       => esc_html__( 'Multi Vendor', 'athemes-starter-sites' ),
			'type'       => 'pro',
			'categories' => array( 'ecommerce' ),
			'builders'   => array(
				'gutenberg',
				'elementor',
			),
			'preview'    => 'https://demo.athemes.com/botiga-multi-vendor/',
			'thumbnail'  => 'https://athemes.com/themes-demo-content/botiga/multi-vendor/thumb.png',
			'plugins'    => array_merge(
				$plugins,
				array(
					array(
						'name'     => 'WPForms',
						'slug'     => 'wpforms-lite',
						'path'     => 'wpforms-lite/wpforms.php',
						'required' => false
					),
					array(
						'name'     => 'Dokan',
						'slug'     => 'dokan-lite',
						'path'     => 'dokan-lite/dokan.php',
						'required' => false
					)
				),
			),
			'import'         => array(
				'gutenberg'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/multi-vendor/botiga-dc-multi-vendor.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/multi-vendor/botiga-w-multi-vendor.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/multi-vendor/botiga-c-multi-vendor.dat'
				),
				'elementor'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/elementor/multi-vendor/botiga-dc-multi-vendor-el.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/elementor/multi-vendor/botiga-w-multi-vendor-el.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/elementor/multi-vendor/botiga-c-multi-vendor-el.dat'
				),
			),
		),
		'wine' => array(
			'name'       => esc_html__( 'Wine', 'athemes-starter-sites' ),
			'type'       => 'pro',
			'categories' => array( 'ecommerce' ),
			'builders'   => array(
				'gutenberg',
				'elementor',
			),
			'preview'    => 'https://demo.athemes.com/botiga-wine/',
			'thumbnail'  => 'https://athemes.com/themes-demo-content/botiga/wine/thumb.png',
			'plugins'    => array_merge(
				$plugins,
				array(
					array(
						'name'     => 'WPForms',
						'slug'     => 'wpforms-lite',
						'path'     => 'wpforms-lite/wpforms.php',
						'required' => false
					),
				),
			),
			'import'         => array(
				'gutenberg'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/wine/botiga-dc-wine.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/wine/botiga-w-wine.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/wine/botiga-c-wine.dat'
				),
				'elementor'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/elementor/wine/botiga-dc-wine-el.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/elementor/wine/botiga-w-wine-el.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/elementor/wine/botiga-c-wine-el.dat'
				),
			),
		),
		'plants' => array(
			'name'       => esc_html__( 'Plants', 'athemes-starter-sites' ),
			'type'       => 'pro',
			'categories' => array( 'ecommerce' ),
			'builders'   => array(
				'gutenberg',
				'elementor',
			),
			'preview'    => 'https://demo.athemes.com/botiga-plants/',
			'thumbnail'  => 'https://athemes.com/themes-demo-content/botiga/plants/thumb.png',
			'plugins'    => array_merge(
				$plugins,
				array(
					array(
						'name'     => 'WPForms',
						'slug'     => 'wpforms-lite',
						'path'     => 'wpforms-lite/wpforms.php',
						'required' => false
					),
				),
			),
			'import'         => array(
				'gutenberg'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/plants/botiga-dc-plants.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/plants/botiga-w-plants.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/plants/botiga-c-plants.dat'
				),
				'elementor'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/elementor/plants/botiga-dc-plants-el.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/elementor/plants/botiga-w-plants-el.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/elementor/plants/botiga-c-plants-el.dat'
				),
			),
		),
		'shoes' => array(
			'name'       => esc_html__( 'Shoes', 'athemes-starter-sites' ),
			'type'       => 'pro',
			'categories' => array( 'ecommerce' ),
			'builders'   => array(
				'gutenberg',
				'elementor',
			),
			'preview'    => 'https://demo.athemes.com/botiga-shoes/',
			'thumbnail'  => 'https://athemes.com/themes-demo-content/botiga/shoes/thumb.png',
			'plugins'    => array_merge(
				$plugins,
				array(
					array(
						'name'     => 'WPForms',
						'slug'     => 'wpforms-lite',
						'path'     => 'wpforms-lite/wpforms.php',
						'required' => false
					),
				),
			),
			'import'         => array(
				'gutenberg'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/shoes/botiga-dc-shoes.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/shoes/botiga-w-shoes.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/shoes/botiga-c-shoes.dat'
				),
				'elementor'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/elementor/shoes/botiga-dc-shoes-el.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/elementor/shoes/botiga-w-shoes-el.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/elementor/shoes/botiga-c-shoes-el.dat'
				),
			),
		),
		'books' => array(
			'name'       => esc_html__( 'Books', 'athemes-starter-sites' ),
			'type'       => 'pro',
			'categories' => array( 'ecommerce' ),
			'builders'   => array(
				'gutenberg',
				'elementor',
			),
			'preview'    => 'https://demo.athemes.com/botiga-books/',
			'thumbnail'  => 'https://athemes.com/themes-demo-content/botiga/books/thumb.png',
			'plugins'    => array_merge(
				$plugins,
				array(
					array(
						'name'     => 'WPForms',
						'slug'     => 'wpforms-lite',
						'path'     => 'wpforms-lite/wpforms.php',
						'required' => false
					),
				),
			),
			'import'         => array(
				'gutenberg'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/books/botiga-dc-books.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/books/botiga-w-books.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/books/botiga-c-books.dat'
				),
				'elementor'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/elementor/books/botiga-dc-books-el.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/elementor/books/botiga-w-books-el.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/elementor/books/botiga-c-books-el.dat'
				),
			),
		),
		'fashion' => array(
			'name'       => esc_html__( 'Fashion', 'athemes-starter-sites' ),
			'type'       => 'pro',
			'categories' => array( 'ecommerce' ),
			'builders'   => array(
				'gutenberg',
				'elementor',
			),
			'preview'    => 'https://demo.athemes.com/botiga-fashion/',
			'thumbnail'  => 'https://athemes.com/themes-demo-content/botiga/fashion/thumb.png',
			'plugins'    => array_merge(
				$plugins,
				array(
					array(
						'name'     => 'WPForms',
						'slug'     => 'wpforms-lite',
						'path'     => 'wpforms-lite/wpforms.php',
						'required' => false
					),
				),
			),
			'import'         => array(
				'gutenberg'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/fashion/botiga-dc-fashion.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/fashion/botiga-w-fashion.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/fashion/botiga-c-fashion.dat'
				),
				'elementor'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/elementor/fashion/botiga-dc-fashion-el.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/elementor/fashion/botiga-w-fashion-el.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/elementor/fashion/botiga-c-fashion-el.dat'
				),
			),
		),
		'handbags' => array(
			'name'       => esc_html__( 'Handbags', 'athemes-starter-sites' ),
			'type'       => 'pro',
			'categories' => array( 'ecommerce' ),
			'builders'   => array(
				'gutenberg',
				'elementor',
			),
			'preview'    => 'https://demo.athemes.com/botiga-handbags/',
			'thumbnail'  => 'https://athemes.com/themes-demo-content/botiga/handbags/thumb.png',
			'plugins'    => array_merge(
				$plugins,
				array(
					array(
						'name'     => 'WPForms',
						'slug'     => 'wpforms-lite',
						'path'     => 'wpforms-lite/wpforms.php',
						'required' => false
					),
				),
			),
			'import'         => array(
				'gutenberg'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/handbags/botiga-dc-handbags.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/handbags/botiga-w-handbags.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/handbags/botiga-c-handbags.dat'
				),
				'elementor'    => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/elementor/handbags/botiga-dc-handbags-el.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/elementor/handbags/botiga-w-handbags-el.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/elementor/handbags/botiga-c-handbags-el.dat'
				),
			),
		),
		'petshop' => array(
			'name'       => esc_html__( 'Pet Shop', 'athemes-starter-sites' ),
			'type'       => 'pro',
			'categories' => array( 'ecommerce' ),
			'builders'   => array(
				'gutenberg',
				'elementor',
			),
			'preview'    => 'https://demo.athemes.com/botiga-petshop/',
			'previews'   => array(
				'gutenberg' => 'https://demo.athemes.com/botiga-petshop/',
				'elementor' => 'https://demo.athemes.com/botiga-petshop-el/',
			),
			'thumbnail'  => 'https://athemes.com/themes-demo-content/botiga/petshop/thumb.png',
			'plugins'    => array_merge(
				$plugins,
				array(
					array(
						'name'     => 'aThemes Blocks',
						'slug'     => 'athemes-blocks',
						'path'     => 'athemes-blocks/athemes-blocks.php',
						'required' => true,
					),
					array(
						'name'     => 'aThemes Addons for Elementor Lite',
						'slug'     => 'athemes-addons-for-elementor-lite',
						'path'     => 'athemes-addons-for-elementor-lite/athemes-addons-elementor.php',
						'required' => true,
						'builder'  => 'elementor',
					),
					array(
						'name'     => 'Sublium Subscriptions for WooCommerce',
						'slug'     => 'sublium-subscriptions-for-woocommerce',
						'path'     => 'sublium-subscriptions-for-woocommerce/sublium-subscriptions-for-woocommerce.php',
						'required' => true,
					),
					array(
						'name'     => 'WPForms',
						'slug'     => 'wpforms-lite',
						'path'     => 'wpforms-lite/wpforms.php',
						'required' => true,
					),
				),
			),
			'import'     => array(
				'gutenberg' => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/petshop/botiga-dc-petshop.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/petshop/botiga-w-petshop.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/petshop/botiga-c-petshop.dat',
				),
				'elementor' => array(
					'content'    => 'https://athemes.com/themes-demo-content/botiga/elementor/petshop/botiga-dc-petshop-el.xml',
					'widgets'    => 'https://athemes.com/themes-demo-content/botiga/elementor/petshop/botiga-w-petshop-el.wie',
					'customizer' => 'https://athemes.com/themes-demo-content/botiga/elementor/petshop/botiga-c-petshop-el.dat',
				),
			),
		),
	);

	return $demos;

}
add_filter( 'atss_register_demos_list', 'botiga_demos_list' );

/**
 * Define actions that happen before import
 */
function botiga_setup_before_import( $demo_id, $builder_type ) {
	$demos_extra_data = array(
		'fashion' => array(
			'extras' => array(
				'gutenberg' => array(
					'product-filter-presets' => 'https://athemes.com/themes-demo-content/botiga/fashion/botiga-filters-presets-fashion.txt',
					'product-filter-data' => 'https://athemes.com/themes-demo-content/botiga/fashion/botiga-filters-data-fashion.txt',
					'templates-builder-data' => 'https://athemes.com/themes-demo-content/botiga/fashion/botiga-tb-fashion.txt'
				),
				'elementor' => array(
					'product-filter-presets' => 'https://athemes.com/themes-demo-content/botiga/elementor/fashion/botiga-filters-presets-fashion-el.txt',
					'product-filter-data' => 'https://athemes.com/themes-demo-content/botiga/elementor/fashion/botiga-filters-data-fashion-el.txt',
					'templates-builder-data' => 'https://athemes.com/themes-demo-content/botiga/elementor/fashion/botiga-tb-fashion-el.txt'
				),
			)
		),
		'handbags' => array(
			'extras' => array(
				'gutenberg' => array(
					'product-filter-presets' => 'https://athemes.com/themes-demo-content/botiga/handbags/botiga-filters-presets-handbags.txt',
					'product-filter-data' => 'https://athemes.com/themes-demo-content/botiga/handbags/botiga-filters-data-handbags.txt',
					'templates-builder-data' => 'https://athemes.com/themes-demo-content/botiga/handbags/botiga-tb-handbags.txt'
				),
				'elementor' => array(
					'product-filter-presets' => 'https://athemes.com/themes-demo-content/botiga/elementor/handbags/botiga-filters-presets-handbags-el.txt',
					'product-filter-data' => 'https://athemes.com/themes-demo-content/botiga/elementor/handbags/botiga-filters-data-handbags-el.txt',
					'templates-builder-data' => 'https://athemes.com/themes-demo-content/botiga/elementor/handbags/botiga-tb-handbags-el.txt'
				),
			)
		),
		'petshop' => array(
			'extras' => array(
				'gutenberg' => array(
					'product-filter-presets' => 'https://athemes.com/themes-demo-content/botiga/petshop/botiga-filters-presets-petshop.txt',
					'product-filter-data' => 'https://athemes.com/themes-demo-content/botiga/petshop/botiga-filters-data-petshop.txt',
				),
				'elementor' => array(
					'product-filter-presets' => 'https://athemes.com/themes-demo-content/botiga/elementor/petshop/botiga-filters-presets-petshop-el.txt',
					'product-filter-data' => 'https://athemes.com/themes-demo-content/botiga/elementor/petshop/botiga-filters-data-petshop-el.txt',
				),
			),
		),
	);

	// Fashion Demo Extras
	if ( $demo_id === 'fashion' ) {
		$modules = get_option( 'botiga-modules', array() );
		update_option( 'botiga-modules', array_merge( $modules, array(
			'advanced-reviews' 			=> true,
			'wishlist' 					=> true,
			'sticky-add-to-cart' 		=> true,
			'shop-filters'       		=> true,
			'templates'		       		=> true,
		) ) );

		$shop_filter_presets = ATSS_Core_Helpers::atss_get_remote_file( $demos_extra_data[ $demo_id ]['extras'][ $builder_type ]['product-filter-presets'] );
		$shop_filter_data = ATSS_Core_Helpers::atss_get_remote_file( $demos_extra_data[ $demo_id ]['extras'][ $builder_type ]['product-filter-data'] );

		update_option( 'botiga-shop-filters-presets', $shop_filter_presets );
		update_option( 'botiga-shop-filters-presets-settings', $shop_filter_data );

		$templates_builder_data = ATSS_Core_Helpers::atss_get_remote_file( $demos_extra_data[ $demo_id ]['extras'][ $builder_type ]['templates-builder-data'] );

		// Append custom data to the templates builder data.
		$templates_builder_data = atss_botiga_append_templates_builder_data( json_decode( $templates_builder_data, true ) );

		update_option( 'botiga_template_builder_data', $templates_builder_data );
	}

	// Handbags Demo Extras
	if ( $demo_id === 'handbags' ) {
		$modules = get_option( 'botiga-modules', array() );
		update_option( 'botiga-modules', array_merge( $modules, array(
			'advanced-reviews' 			=> true,
			'wishlist' 					=> true,
			'shop-filters'       		=> true,
			'templates'		       		=> true,
			'mega-menu'		       		=> true,
		) ) );

		$shop_filter_presets = ATSS_Core_Helpers::atss_get_remote_file( $demos_extra_data[ $demo_id ]['extras'][ $builder_type ]['product-filter-presets'] );
		$shop_filter_data = ATSS_Core_Helpers::atss_get_remote_file( $demos_extra_data[ $demo_id ]['extras'][ $builder_type ]['product-filter-data'] );

		update_option( 'botiga-shop-filters-presets', $shop_filter_presets );
		update_option( 'botiga-shop-filters-presets-settings', $shop_filter_data );

		$templates_builder_data = ATSS_Core_Helpers::atss_get_remote_file( $demos_extra_data[ $demo_id ]['extras'][ $builder_type ]['templates-builder-data'] );

		// Append custom data to the templates builder data.
		$templates_builder_data = atss_botiga_append_templates_builder_data( json_decode( $templates_builder_data, true ) );

		update_option( 'botiga_template_builder_data', $templates_builder_data );
	}

	// Pet Shop Demo Extras
	if ( $demo_id === 'petshop' ) {
		$modules = get_option( 'botiga-modules', array() );

		update_option(
			'botiga-modules',
			array_merge(
				$modules,
				array(
					'hf-builder'       => true,
					'shop-filters'     => true,
					'wishlist'         => true,
					'product-swatches' => true,
					'advanced-reviews' => true,
					'mega-menu'        => true,
					'templates'        => true,
					'modal-popup'      => true,
				)
			)
		);

		$shop_filter_presets = ATSS_Core_Helpers::atss_get_remote_file(
			$demos_extra_data[ $demo_id ]['extras'][ $builder_type ]['product-filter-presets']
		);
		$shop_filter_data = ATSS_Core_Helpers::atss_get_remote_file(
			$demos_extra_data[ $demo_id ]['extras'][ $builder_type ]['product-filter-data']
		);

		update_option( 'botiga-shop-filters-presets', $shop_filter_presets );
		update_option( 'botiga-shop-filters-presets-settings', $shop_filter_data );
	}
}
add_action( 'atss_import_start', 'botiga_setup_before_import', 10, 2 );

/**
 * Define actions that happen after import
 */
function botiga_setup_after_import( $demo_id, $custom_import_settings = array(), $builder_type = '' ) {

	// Enable Merchant modules.
	if ( class_exists( 'Merchant' ) ) {
		$modules = get_option( 'merchant-modules', array() );

		update_option( 'merchant-modules', array_merge( $modules, array(
			'inactive-tab-message'    => true,
			'agree-to-terms-checkbox' => true,
			'payment-logos'           => true,
		) ) );
	}

	// Disable WPForms modern markup.
	// This is needed because our demos was built with the old markup.
	if ( in_array( $demo_id, array( 'beauty', 'apparel', 'furniture', 'jewelry', 'single-product', 'multi-vendor', 'wine', 'plants', 'shoes', 'books' ) ) ) {
		$wpforms_settings                    = (array) get_option( 'wpforms_settings', [] );
		$wpforms_settings[ 'modern-markup' ] = false;

		update_option( 'wpforms_settings', $wpforms_settings );
	}

	// Assign the menu.
	$main_menu = get_term_by( 'name', 'Main', 'nav_menu' );
	if ( ! empty( $main_menu ) ) {
		$locations = get_theme_mod( 'nav_menu_locations', array() );
		$locations['primary'] = $main_menu->term_id;
		set_theme_mod( 'nav_menu_locations', $locations );
	}

	// Assign Pet Shop menu locations.
	if ( 'petshop' === $demo_id ) {
		$locations = get_theme_mod( 'nav_menu_locations', array() );

		$petshop_menu_locations = array(
			'Main'        => array(
				'mobile',
			),
			'Secondary'   => array(
				'secondary',
				'top-bar-mobile',
			),
			'Footer Menu' => array(
				'footer-copyright-menu',
			),
		);

		foreach ( $petshop_menu_locations as $menu_name => $menu_locations ) {
			$menu = get_term_by( 'name', $menu_name, 'nav_menu' );

			if ( empty( $menu ) ) {
				continue;
			}

			foreach ( $menu_locations as $menu_location ) {
				$locations[ $menu_location ] = $menu->term_id;
			}
		}

		set_theme_mod( 'nav_menu_locations', $locations );
	}

	// Beauty, Furniture and Single Product Demo Extras
	if ( in_array( $demo_id, array( 'beauty', 'furniture', 'single-product', 'multi-vendor' ) ) ) {

		// Set modules.
	  $modules = get_option( 'botiga-modules', array() );
		update_option( 'botiga-modules', array_merge( $modules, array( 'hf-builder' => true ) ) );

	}

	// Multi Vendor Demo Extras
	if ( $demo_id === 'multi-vendor' ) {

		// Set modules.
	  $modules = get_option( 'botiga-modules', array() );
		update_option( 'botiga-modules', array_merge( $modules, array( 'hf-builder' => true, 'mega-menu' => true, 'size-chart' => true, 'product-swatches' => true ) ) );

		// Assign secondary menu
		$secondary_menu = get_term_by( 'name', 'Trending Categories', 'nav_menu' );
		if ( ! empty( $secondary_menu ) ) {
			$locations = get_theme_mod( 'nav_menu_locations', array() );
			$locations['secondary'] = $secondary_menu->term_id;
			set_theme_mod( 'nav_menu_locations', $locations );
		}

	}

	// Apparel Demo Extras
	if ( $demo_id === 'apparel' ) {

		// Set modules.
		// The demo apparel uses the old header system, so we need to disable the HF Builder
	  $modules = get_option( 'botiga-modules', array() );
		update_option( 'botiga-modules', array_merge( $modules, array( 'hf-builder' => false ) ) );

		// Assign footer copyright menu
		$copyright_menu = get_term_by( 'name', 'Footer Copyright', 'nav_menu' );
		if ( ! empty( $copyright_menu ) ) {
			$locations = get_theme_mod( 'nav_menu_locations', array() );
			$locations['footer-copyright-menu'] = $copyright_menu->term_id;
			set_theme_mod( 'nav_menu_locations', $locations );
		}

	}

	// Jewelry and Pet Shop Demo Extras
	if ( in_array( $demo_id, array( 'jewelry', 'petshop' ) ) ) {

		// Set modules.
		$modules = get_option( 'botiga-modules', array() );
		update_option( 'botiga-modules', array_merge( $modules, array( 'hf-builder' => true, 'mega-menu' => true ) ) );

		if ( 'petshop' === $demo_id ) {
			atss_botiga_remap_petshop_mega_menu();
		}

		// Update custom CSS file with mega menu CSS.
		if ( class_exists( 'Botiga_Mega_Menu' ) ) {
			$mega_menu = Botiga_Mega_Menu::get_instance();
			$mega_menu->save_mega_menu_css_as_option();
			$mega_menu->update_custom_css_file();
		}

	}

	// Plants Demo Extras
	if( $demo_id === 'plants' ) {
		// Set modules.
		$modules = get_option( 'botiga-modules', array() );
		update_option( 'botiga-modules', array_merge( $modules, array( 'wishlist' => true, 'advanced-reviews' => true ) ) );
	}

	// Shoes Demo Extras
	if( $demo_id === 'shoes' ) {
		// Set modules.
		$modules = get_option( 'botiga-modules', array() );
		update_option( 'botiga-modules', array_merge( $modules, array(
			'hf-builder' 	   			=> true,
			'wishlist' 		   			=> true,
			'advanced-reviews' 			=> true,
			'size-chart' 	   			=> true,
			'product-swatches' 			=> true,
			'add-to-cart-notifications' => true,
			'quick-links'               => true
		) ) );
	}

	// Books Demo Extras
	if( $demo_id === 'books' ) {
		// Set modules.
		$modules = get_option( 'botiga-modules', array() );
		update_option( 'botiga-modules', array_merge( $modules, array(
			'advanced-reviews' 			=> true,
			'buy-now' 					=> true,
		) ) );
	}

	// "Footer" menu (menu name from import)
	$footer_menu_one = get_term_by( 'name', 'Footer', 'nav_menu' );
	if ( ! empty( $footer_menu_one ) ) {
		$nav_menu_widget = get_option( 'widget_nav_menu' );
		foreach ( $nav_menu_widget as $key => $widget ) {
			if ( $key !== '_multiwidget' ) {
				if ( ( ! empty( $nav_menu_widget[ $key ]['title'] ) && in_array( $nav_menu_widget[ $key ]['title'], array( 'Quick links', 'Quick Links' ) ) ) || ( empty( $nav_menu_widget[ $key ]['title'] ) && $demo_id === 'jewelry' ) || ( empty( $nav_menu_widget[ $key ]['title'] ) && $demo_id === 'wine' ) ) {
					$nav_menu_widget[ $key ]['nav_menu'] = $footer_menu_one->term_id;
					update_option( 'widget_nav_menu', $nav_menu_widget );
				}
			}
		}
	}

	// "Footer 2" menu (menu name from import)
	$footer_menu_two = get_term_by( 'name', 'Footer 2', 'nav_menu' );
	if ( ! empty( $footer_menu_two ) ) {
		$nav_menu_widget = get_option( 'widget_nav_menu' );
		foreach ( $nav_menu_widget as $key => $widget ) {
			if ( $key !== '_multiwidget' ) {
				if ( ! empty( $nav_menu_widget[ $key ]['title'] ) && in_array( $nav_menu_widget[ $key ]['title'], array( 'About' ) ) ) {
					$nav_menu_widget[ $key ]['nav_menu'] = $footer_menu_two->term_id;
					update_option( 'widget_nav_menu', $nav_menu_widget );
				}
			}
		}
	}

	// Assign Pet Shop footer widget menus.
	if ( 'petshop' === $demo_id ) {
		$petshop_footer_menus = array(
			'Shop'  => 'Shop',
			'About' => 'About',
			'Help'  => 'Help',
		);

		$nav_menu_widgets = (array) get_option( 'widget_nav_menu', array() );

		foreach ( $nav_menu_widgets as $widget_id => $widget_settings ) {
			if (
				'_multiwidget' === $widget_id ||
				empty( $widget_settings['title'] ) ||
				! isset( $petshop_footer_menus[ $widget_settings['title'] ] )
			) {
				continue;
			}

			$menu = get_term_by(
				'name',
				$petshop_footer_menus[ $widget_settings['title'] ],
				'nav_menu'
			);

			if ( empty( $menu ) ) {
				continue;
			}

			$nav_menu_widgets[ $widget_id ]['nav_menu'] = $menu->term_id;
		}

		update_option( 'widget_nav_menu', $nav_menu_widgets );
	}

	// Asign the front as page.
	update_option( 'show_on_front', 'page' );

	// Asign the front page.
	$front_page = ATSS_Core_Helpers::atss_get_page_by_title( 'Home' );
	if ( ! empty( $front_page ) ) {
		update_option( 'page_on_front', $front_page->ID );
	}

	// Asign the blog page.
	$blog_page  = ATSS_Core_Helpers::atss_get_page_by_title( 'Blog' );
	if ( ! empty( $blog_page ) ) {
		update_option( 'page_for_posts', $blog_page->ID );
	}

	// My wishlist page
	$wishlist_page = ATSS_Core_Helpers::atss_get_page_by_title( 'My Wishlist' );
	if ( ! empty( $wishlist_page ) ) {
		update_option( 'botiga_wishlist_page_id', $wishlist_page->ID );
	}

	// Asign the shop page.
	$shop_page = ( 'single-product' === $demo_id ) ? ATSS_Core_Helpers::atss_get_page_by_title( 'Listing' ) : ATSS_Core_Helpers::atss_get_page_by_title( 'Shop' );
	if ( ! empty( $shop_page ) ) {
		update_option( 'woocommerce_shop_page_id', $shop_page->ID );
	}

	// Asign the cart page.
	$cart_page = ATSS_Core_Helpers::atss_get_page_by_title( 'Cart' );
	if ( ! empty( $cart_page ) ) {
		update_option( 'woocommerce_cart_page_id', $cart_page->ID );
	}

	// Asign the checkout page.
	$checkout_page  = ATSS_Core_Helpers::atss_get_page_by_title( 'Checkout' );
	if ( ! empty( $checkout_page ) ) {
		update_option( 'woocommerce_checkout_page_id', $checkout_page->ID );
	}

	// Asign the myaccount page.
	$myaccount_page = ATSS_Core_Helpers::atss_get_page_by_title( 'My Account' );
	if ( ! empty( $myaccount_page ) ) {
		update_option( 'woocommerce_myaccount_page_id', $myaccount_page->ID );
	}

	// Apply Pet Shop-specific post-import configuration.
	if ( 'petshop' === $demo_id ) {
		if ( false === get_option( 'botiga-first-theme-version', false ) && defined( 'BOTIGA_VERSION' ) ) {
			update_option(
				'botiga-first-theme-version',
				BOTIGA_VERSION
			);
		}

		$enabled_blocks = json_decode(
			(string) get_option( 'athemes_blocks_enabled_blocks', '[]' ),
			true
		);

		if ( ! is_array( $enabled_blocks ) ) {
			$enabled_blocks = array();
		}

		$enabled_blocks = array_values(
			array_unique(
				array_merge(
					$enabled_blocks,
					array(
						'icon',
						'post-grid',
						'taxonomy-grid',
					)
				)
			)
		);

		update_option(
			'athemes_blocks_enabled_blocks',
			wp_json_encode( $enabled_blocks )
		);

		if ( 'elementor' === $builder_type ) {
			$enabled_addon_modules = get_option( 'athemes-addons-modules', array() );

			if ( ! is_array( $enabled_addon_modules ) ) {
				$enabled_addon_modules = array();
			}

			$enabled_addon_modules['posts-carousel'] = true;

			update_option(
				'athemes-addons-modules',
				$enabled_addon_modules
			);
		}

		atss_botiga_remap_petshop_wpforms();

		ATSS_Sublium_Importer::import(
			'https://athemes.com/themes-demo-content/botiga/petshop/botiga-sublium-petshop.json',
			'athemes-starter-sites:petshop-import'
		);
	}

	// Recolor mega menus and menu-item badges with the palette selected in the
	// wizard. This runs at import finish (not during the customize step) because
	// the menus are only assigned to their locations, and the mega-menu module is
	// only loaded, by this point -- both are required before the mega-menu CSS can
	// be regenerated. Matching is done by each item's own meta, so it applies to
	// every Botiga demo regardless of menu names.
	$wizard_palette = get_transient( 'atss_botiga_wizard_palette' );

	if ( ! empty( $wizard_palette ) ) {
		atss_botiga_apply_menu_colors_from_palette( $wizard_palette );

		if ( class_exists( 'Botiga_Mega_Menu' ) ) {
			$mega_menu = Botiga_Mega_Menu::get_instance();
			$mega_menu->save_mega_menu_css_as_option();
			$mega_menu->update_custom_css_file();
		}
	}

	if ( 'petshop' === $demo_id && 'elementor' === $builder_type ) {
		// Reflect the selected palette and fonts into Elementor content (the global
		// kit and every imported document) so Elementor-built demos match the wizard
		// selection, mirroring the block-editor/customizer path. Safe to call for
		$heading_font = atss_botiga_get_selected_font( 'botiga_headings_font' );
		$body_font    = atss_botiga_get_selected_font( 'botiga_body_font' );

		atss_botiga_reflect_elementor( $wizard_palette, $heading_font, $body_font );
	}

	if ( ! empty( $wizard_palette ) ) {
		delete_transient( 'atss_botiga_wizard_palette' );
	}

	// Update custom CSS
	$custom_css = Botiga_Custom_CSS::get_instance();
	$custom_css->update_custom_css_file();

	// Set current starter site
	atss()->current_starter( 'botiga', $demo_id );

}
add_action( 'atss_finish_import', 'botiga_setup_after_import', 10, 3 );

/**
 * Get every nav menu item ID on the site.
 *
 * Menu color customizations run across all registered menus, regardless of
 * their name or how many exist, so re-importing one demo over another still
 * recolors whatever menus are present.
 *
 * @since 1.4.1
 * @return int[] Nav menu item post IDs.
 */
function atss_botiga_get_all_menu_item_ids() {
	$menus = wp_get_nav_menus();

	if ( empty( $menus ) || is_wp_error( $menus ) ) {
		return array();
	}

	$menu_item_ids = array();

	foreach ( $menus as $menu ) {
		$menu_items = wp_get_nav_menu_items( $menu->term_id, array( 'post_status' => 'any' ) );

		if ( empty( $menu_items ) || is_wp_error( $menu_items ) ) {
			continue;
		}

		foreach ( $menu_items as $menu_item ) {
			$menu_item_ids[] = (int) $menu_item->ID;
		}
	}

	return array_unique( $menu_item_ids );
}

/**
 * Recolor every mega menu and menu-item badge to the wizard palette.
 *
 * Items are matched by their own meta -- '_is_mega_menu' for mega menus and
 * '_item_badge_background_color' for badges -- so the menu name and structure
 * are irrelevant and this applies to any Botiga demo. Slot assignments mirror
 * the preview rules in v2/onboarding/src/data/botiga-non-variable-color-rules.js.
 *
 * @since 1.4.1
 * @param array $palette Colors indexed by palette slot (color1..color8).
 * @return void
 */
function atss_botiga_apply_menu_colors_from_palette( $palette ) {
	if ( empty( $palette ) || ! is_array( $palette ) ) {
		return;
	}

	$mega_menu_color_map = array(
		'_is_mega_menu_style_background_color'         => 'color7',
		'_is_mega_menu_style_text_color'               => 'color3',
		'_is_mega_menu_style_text_color_hover'         => 'color1',
		'_is_mega_menu_style_heading_divider_color'    => 'color5',
		'_is_mega_menu_style_heading_text_color'       => 'color3',
		'_is_mega_menu_style_heading_text_color_hover' => 'color1',
	);

	foreach ( atss_botiga_get_all_menu_item_ids() as $menu_item_id ) {
		// Mega menu style colors, only for items configured as mega menus.
		if ( ! empty( get_post_meta( $menu_item_id, '_is_mega_menu', true ) ) ) {
			foreach ( $mega_menu_color_map as $meta_key => $slot ) {
				if ( empty( $palette[ $slot ] ) ) {
					continue;
				}

				update_post_meta( $menu_item_id, $meta_key, $palette[ $slot ] );
			}
		}

		// Badge background, only for items that carry a badge. The badge
		// background follows the primary / button slot (color1), matching the
		// .botiga-badge preview rule.
		if ( ! empty( $palette['color1'] ) ) {
			$badge_background = get_post_meta( $menu_item_id, '_item_badge_background_color', true );

			if ( '' !== (string) $badge_background ) {
				update_post_meta( $menu_item_id, '_item_badge_background_color', $palette['color1'] );
			}
		}
	}
}

/**
 * Get the imported Pet Shop mega-menu content block.
 *
 * @return WP_Post|null
 */
function atss_botiga_get_petshop_mega_menu_content_block() {
	$content_blocks = get_posts( array(
		'post_type'      => 'athemes_hf',
		'post_status'    => 'any',
		'posts_per_page' => 1,
		'orderby'        => 'ID',
		'order'          => 'DESC',
		'title'          => 'Shop Mega Menu',
	) );

	return ! empty( $content_blocks ) ? $content_blocks[0] : null;
}

/**
 * Get the imported Pet Shop mega-menu items.
 *
 * @return array
 */
function atss_botiga_get_petshop_mega_menu_items() {
	$mega_menu_items = array(
		'shop'    => null,
		'content' => null,
	);

	$main_menu = get_term_by( 'name', 'Main', 'nav_menu' );

	if ( empty( $main_menu ) || is_wp_error( $main_menu ) ) {
		return $mega_menu_items;
	}

	$menu_items = wp_get_nav_menu_items( $main_menu->term_id, array( 'post_status' => 'any' ) );

	if ( empty( $menu_items ) || is_wp_error( $menu_items ) ) {
		return $mega_menu_items;
	}

	foreach ( $menu_items as $menu_item ) {
		if ( 0 !== (int) $menu_item->menu_item_parent ) {
			continue;
		}

		// Prefer the item explicitly flagged as a mega menu. The demo's mega-menu
		// item has an empty nav label (it links to the "Shop" page), so matching
		// on the title alone is unreliable; the '_is_mega_menu' meta is definitive.
		$is_mega_menu = get_post_meta( $menu_item->ID, '_is_mega_menu', true );

		if ( ! empty( $is_mega_menu ) || 'Shop' === $menu_item->title ) {
			$mega_menu_items['shop'] = $menu_item;

			break;
		}
	}

	if ( empty( $mega_menu_items['shop'] ) ) {
		return $mega_menu_items;
	}

	foreach ( $menu_items as $menu_item ) {
		if (
			(int) $mega_menu_items['shop']->ID !==
			(int) $menu_item->menu_item_parent
		) {
			continue;
		}

		$content_type = get_post_meta( $menu_item->ID, '_is_mega_menu_item_content_type', true );

		if (
			'content-block' === $content_type ||
			'Column 1' === $menu_item->title
		) {
			$mega_menu_items['content'] = $menu_item;

			break;
		}
	}

	return $mega_menu_items;
}

/**
 * Remap the imported Pet Shop mega-menu content block.
 *
 * @return void
 */
function atss_botiga_remap_petshop_mega_menu() {
	$content_block   = atss_botiga_get_petshop_mega_menu_content_block();
	$mega_menu_items = atss_botiga_get_petshop_mega_menu_items();

	if ( empty( $content_block ) ) {
		return;
	}

	$templates_builder_data = (array) get_option( 'botiga_template_builder_data', array() );
	$templates_changed      = false;
	$template_found         = false;

	foreach ( $templates_builder_data as &$template ) {
		$template_name = isset( $template['template_name'] )
			? (string) $template['template_name']
			: '';

		if ( 'Shop Mega Menu' !== $template_name ) {
			continue;
		}

		$template_found = true;

		if (
			! isset( $template['content'] ) ||
			$content_block->ID !== (int) $template['content']
		) {
			$template['content'] = $content_block->ID;
			$templates_changed   = true;
		}
	}

	unset( $template );

	if ( ! $template_found ) {
		$templates_builder_data[] = array(
			'id'                    => 'botiga-template-' . wp_generate_uuid4(),
			'template_name'         => $content_block->post_title,
			'template_category'     => array(
				'content-block',
			),
			'content'               => $content_block->ID,
			'content_builder'       => get_post_meta(
				$content_block->ID,
				'_elementor_edit_mode',
				true
			)
				? 'elementor'
				: 'editor',
			'template_author'       => get_the_author_meta(
				'display_name',
				$content_block->post_author
			),
			'template_author_image' => get_avatar_url(
				$content_block->post_author
			),
			'template_date'         => $content_block->post_date,
			'template_preview_url'  => get_permalink(
				$content_block->ID
			),
			'template_scope'        => 'full',
			'conditions'            => wp_json_encode(
				array(
					array(
						'type'      => 'include',
						'condition' => 'content-block',
						'id'        => null,
					),
				)
			),
		);

		$templates_changed = true;
	}

	if ( $templates_changed ) {
		update_option( 'botiga_template_builder_data', $templates_builder_data );
	}

	if ( ! empty( $mega_menu_items['shop'] ) ) {
		update_post_meta( $mega_menu_items['shop']->ID, '_is_mega_menu', 'on' );
	}

	if ( empty( $mega_menu_items['content'] ) ) {
		return;
	}

	update_post_meta(
		$mega_menu_items['content']->ID,
		'_is_mega_menu_item_content_type',
		'content-block'
	);

	update_post_meta(
		$mega_menu_items['content']->ID,
		'_is_mega_menu_item_content_custom_content_block',
		$content_block->ID
	);
}

/**
 * Remap a set of WPForms source IDs found anywhere in a blob of content.
 *
 * Applies ATSS_WPForms_Helper::replace_form_id() for every source => target
 * pair, skipping pairs where the ID is unchanged so untouched content is
 * returned as-is.
 *
 * @param string $content     Content that may contain WPForms references.
 * @param array  $form_id_map Map of source form ID => imported form ID.
 *
 * @return string
 */
function atss_botiga_remap_wpforms_ids( $content, $form_id_map ) {
	if ( ! is_string( $content ) || '' === $content ) {
		return $content;
	}

	foreach ( $form_id_map as $source_id => $target_id ) {
		if ( (int) $source_id === (int) $target_id ) {
			continue;
		}

		$content = ATSS_WPForms_Helper::replace_form_id( $content, $source_id, $target_id );
	}

	return $content;
}

/**
 * Remap Pet Shop WPForms references after import.
 *
 * The exported content references the forms by the IDs they had on the source
 * site. The importer preserves post IDs when they are free, so on a clean site
 * the imported forms keep those IDs and the rewrites below are no-ops; when the
 * IDs are already taken (a re-import, or a non-empty site) the forms are
 * re-created with new IDs and every reference has to be remapped by title.
 *
 * @return void
 */
function atss_botiga_remap_petshop_wpforms() {
	if ( ! post_type_exists( 'wpforms' ) ) {
		return;
	}

	// Source form IDs as they appear in the exported content, keyed by title.
	$required_forms = array(
		309 => 'Modal Newsletter',
		310 => 'Newsletter - CTA',
		331 => 'Contact',
	);

	$forms = get_posts(
		array(
			'post_type'      => 'wpforms',
			'post_status'    => 'any',
			'posts_per_page' => -1,
			'orderby'        => 'ID',
			'order'          => 'DESC',
		)
	);

	$forms_by_title = array();

	foreach ( $forms as $form ) {
		// Keep the most recently imported form for each title.
		if ( ! isset( $forms_by_title[ $form->post_title ] ) ) {
			$forms_by_title[ $form->post_title ] = (int) $form->ID;
		}
	}

	$form_id_map = array();

	foreach ( $required_forms as $source_id => $form_title ) {
		if ( isset( $forms_by_title[ $form_title ] ) ) {
			$form_id_map[ $source_id ] = $forms_by_title[ $form_title ];
		}
	}

	if ( empty( $form_id_map ) ) {
		return;
	}

	/*
	 * WXR remaps the WPForms post ID, but the form's own JSON still stores the
	 * source-site ID in its top-level "id" field. Sync that value to the new
	 * post ID.
	 *
	 * The rewrite is done directly on the raw post_content string rather than
	 * by decoding and re-encoding through wpforms_encode(): that helper runs the
	 * JSON through _wp_specialchars(), which changes the stored bytes and makes
	 * the WPForms builder report "Corrupted Form Data". Operating on the raw
	 * string preserves the exact encoding WPForms wrote, and only the form's own
	 * ID token is touched (field IDs are small integers such as "1"/"2" and
	 * never collide with the form IDs being remapped). Pairs whose ID is
	 * unchanged (the usual clean import) are skipped entirely, so nothing is
	 * re-saved unnecessarily.
	 */
	foreach ( $form_id_map as $source_id => $target_id ) {
		if ( (int) $source_id === (int) $target_id ) {
			continue;
		}

		$form = get_post( $target_id );

		if ( empty( $form ) || '' === (string) $form->post_content ) {
			continue;
		}

		$updated_content = str_replace(
			array(
				'"id":"' . (int) $source_id . '"',
				'"id":' . (int) $source_id . ',',
			),
			array(
				'"id":"' . (int) $target_id . '"',
				'"id":' . (int) $target_id . ',',
			),
			$form->post_content
		);

		if ( $updated_content === $form->post_content ) {
			continue;
		}

		wp_update_post(
			wp_slash(
				array(
					'ID'           => $target_id,
					'post_content' => $updated_content,
				)
			)
		);
	}

	/*
	 * Rewrite every imported page that references any of these forms, covering
	 * both the block editor content and the Elementor document. Scanning all
	 * pages (instead of a fixed page => form map) keeps this working if a form
	 * is placed on a different or additional page.
	 */
	$pages = get_posts(
		array(
			'post_type'      => 'page',
			'post_status'    => 'any',
			'posts_per_page' => -1,
		)
	);

	foreach ( $pages as $page ) {
		$updated_content = atss_botiga_remap_wpforms_ids( $page->post_content, $form_id_map );

		if ( $updated_content !== $page->post_content ) {
			wp_update_post(
				wp_slash(
					array(
						'ID'           => $page->ID,
						'post_content' => $updated_content,
					)
				)
			);
		}

		$elementor_data = get_post_meta( $page->ID, '_elementor_data', true );

		if ( empty( $elementor_data ) ) {
			continue;
		}

		$updated_elementor_data = atss_botiga_remap_wpforms_ids( $elementor_data, $form_id_map );

		if ( $updated_elementor_data !== $elementor_data ) {
			update_post_meta( $page->ID, '_elementor_data', wp_slash( $updated_elementor_data ) );
			delete_post_meta( $page->ID, '_elementor_element_cache' );
		}
	}

	// Update the Modal Newsletter shortcode imported from the Customizer.
	$modal_popup_content = (string) get_theme_mod( 'modal_popup_content', '' );

	if ( '' !== $modal_popup_content ) {
		$updated_modal_popup_content = atss_botiga_remap_wpforms_ids( $modal_popup_content, $form_id_map );

		if ( $updated_modal_popup_content !== $modal_popup_content ) {
			set_theme_mod( 'modal_popup_content', $updated_modal_popup_content );
		}
	}
}

/**
 * Get a font family name from a Botiga font theme mod.
 *
 * The wizard stores fonts as JSON ({"font":"...","regularweight":"..."}). This
 * returns just the family name, or an empty string when none is set.
 *
 * @since 1.4.1
 * @param string $theme_mod Theme mod key.
 * @return string
 */
function atss_botiga_get_selected_font( $theme_mod ) {
	$raw = get_theme_mod( $theme_mod, '' );

	if ( empty( $raw ) ) {
		return '';
	}

	$decoded = json_decode( $raw, true );

	if ( is_array( $decoded ) && ! empty( $decoded['font'] ) ) {
		return (string) $decoded['font'];
	}

	return is_string( $raw ) ? $raw : '';
}

/**
 * Build the Elementor color reconciliation map.
 *
 * Maps each color of the Elementor demo's own palette to the value the wizard
 * selected for the same slot, using the shared eight-slot palette so Elementor
 * content reflects exactly like the block-editor/customizer content. Only the
 * palette colors are mapped; non-palette accents (e.g. the gold icon color) are
 * intentionally left untouched.
 *
 * @since 1.4.1
 * @param array $palette Selected palette keyed color1..color8 => hex.
 * @return array Map of source hex (uppercase) => target hex.
 */
function atss_botiga_build_elementor_color_map( $palette ) {
	$source_slots = array(
		'#2E5240' => 'color1',
		'#1F3A2C' => 'color2',
		'#1E2A23' => 'color3',
		'#6C746C' => 'color4',
		'#F6F1E7' => 'color5',
		'#DDE6DC' => 'color6',
		'#FFFFFF' => 'color7',
	);

	$map = array();

	foreach ( $source_slots as $hex => $slot ) {
		if ( ! empty( $palette[ $slot ] ) ) {
			$map[ strtoupper( $hex ) ] = $palette[ $slot ];
		}
	}

	return $map;
}

/**
 * Decide which font family a font_family control should receive.
 *
 * Icon fonts are never restyled. Heading contexts (h1..h6, title, heading) use
 * the heading font; a bare typography_font_family uses the element's widget type
 * to decide; everything else (body, link, description, button) uses the body
 * font.
 *
 * @since 1.4.1
 * @param string $key          Control key.
 * @param string $widget_type  Current element widget/el type.
 * @param string $heading_font Heading font family.
 * @param string $body_font    Body font family.
 * @return string|null Font family, or null to leave the control unchanged.
 */
function atss_botiga_classify_elementor_font( $key, $widget_type, $heading_font, $body_font ) {
	$k = strtolower( $key );

	if ( 0 === strpos( $k, 'icon_' ) ) {
		return null;
	}

	$heading_prefixes = array( 'h1_', 'h2_', 'h3_', 'h4_', 'h5_', 'h6_', 'title_' );

	foreach ( $heading_prefixes as $prefix ) {
		if ( 0 === strpos( $k, $prefix ) ) {
			return $heading_font;
		}
	}

	if ( false !== strpos( $k, 'heading' ) ) {
		return $heading_font;
	}

	if ( 'typography_font_family' === $k ) {
		return ( 'heading' === $widget_type ) ? $heading_font : $body_font;
	}

	return $body_font;
}

/**
 * Recursively reconcile colors and fonts in an Elementor settings tree.
 *
 * Works for both the kit settings array and a decoded _elementor_data document.
 * Palette hex values are remapped to the selected palette; Inter font families
 * are swapped to the selected heading/body fonts. Font sizes, weights and every
 * non-palette value are left untouched.
 *
 * @since 1.4.1
 * @param mixed  $node         Settings node (array) or scalar.
 * @param array  $color_map    Source hex (uppercase) => target hex.
 * @param string $heading_font Heading font family (empty to skip fonts).
 * @param string $body_font    Body font family (empty to skip fonts).
 * @param string $widget_type  Inherited widget/el type for context.
 * @return mixed The reconciled node.
 */
function atss_botiga_walk_elementor_settings( $node, $color_map, $heading_font, $body_font, $icon_color = '', $widget_type = '' ) {
	if ( ! is_array( $node ) ) {
		return $node;
	}

	if ( isset( $node['widgetType'] ) ) {
		$widget_type = $node['widgetType'];
	} elseif ( '' === $widget_type && isset( $node['elType'] ) ) {
		$widget_type = $node['elType'];
	}

	// Force icon widgets to use the primary palette color for the glyph, so the
	// demo's decorative icon colors track the wizard selection. Done at the
	// widget level (before the generic pass) because which control holds the
	// glyph color depends on the widget and its view.
	if ( '' !== $icon_color && isset( $node['settings'] ) && is_array( $node['settings'] ) && in_array( $widget_type, array( 'icon', 'icon-box', 'icon-list' ), true ) ) {
		$node['settings'] = atss_botiga_set_elementor_icon_color( $node['settings'], $widget_type, $icon_color );
	}

	$swap_fonts = ( '' !== $heading_font || '' !== $body_font );

	foreach ( $node as $key => $value ) {
		if ( is_array( $value ) ) {
			$node[ $key ] = atss_botiga_walk_elementor_settings( $value, $color_map, $heading_font, $body_font, $icon_color, $widget_type );
			continue;
		}

		if ( ! is_string( $value ) || '' === $value ) {
			continue;
		}

		if ( $swap_fonts && is_string( $key ) && 'font_family' === substr( $key, -11 ) ) {
			if ( 'Inter' === $value ) {
				$font = atss_botiga_classify_elementor_font( $key, $widget_type, $heading_font, $body_font );

				if ( null !== $font && '' !== $font ) {
					$node[ $key ] = $font;
				}
			}

			continue;
		}

		// Remap palette colors anywhere in the string. This covers standalone
		// color values ("#2E5240") and colors embedded in HTML content, e.g. a
		// heading title of the form <span style="color:#2E5240;">. The negative
		// lookahead leaves 8-digit alpha values (e.g. #FFFFFF00) and any longer
		// token untouched; non-palette accents are left alone by the map lookup.
		if ( ! empty( $color_map ) && false !== strpos( $value, '#' ) ) {
			$node[ $key ] = preg_replace_callback(
				'/#[0-9A-Fa-f]{6}(?![0-9A-Fa-f])/',
				function ( $matches ) use ( $color_map ) {
					$upper = strtoupper( $matches[0] );

					return isset( $color_map[ $upper ] ) ? $color_map[ $upper ] : $matches[0];
				},
				$value
			);
		}
	}

	return $node;
}

/**
 * Set the icon glyph color on an Elementor icon widget's settings.
 *
 * The control that holds the glyph color differs by widget and view: icon-list
 * uses icon_color; icon and icon-box use secondary_color in stacked/framed views
 * (where primary_color is the shape fill) and primary_color otherwise. Any
 * global override on that control is removed so the explicit color wins.
 *
 * @since 1.4.1
 * @param array  $settings    Widget settings.
 * @param string $widget_type Widget type.
 * @param string $icon_color  Target glyph color.
 * @return array Updated settings.
 */
function atss_botiga_set_elementor_icon_color( $settings, $widget_type, $icon_color ) {
	if ( 'icon-list' === $widget_type ) {
		$key = 'icon_color';
	} else {
		$view = isset( $settings['view'] ) ? $settings['view'] : 'default';
		$key  = ( 'stacked' === $view || 'framed' === $view ) ? 'secondary_color' : 'primary_color';
	}

	$settings[ $key ] = $icon_color;

	if ( isset( $settings['__globals__'][ $key ] ) ) {
		unset( $settings['__globals__'][ $key ] );
	}

	return $settings;
}

/**
 * Reconcile the Elementor global kit with the wizard selection.
 *
 * Finds the imported demo kit (the kit whose system colors use the demo
 * palette), reconciles its colors and fonts, and makes it the active kit so the
 * imported widgets that reference global colors/typography resolve against it.
 *
 * @since 1.4.1
 * @param array  $color_map    Source hex (uppercase) => target hex.
 * @param string $heading_font Heading font family.
 * @param string $body_font    Body font family.
 * @return void
 */
function atss_botiga_reflect_elementor_kit( $color_map, $heading_font, $body_font ) {
	$kits = get_posts(
		array(
			'post_type'        => 'elementor_library',
			'post_status'      => 'any',
			'posts_per_page'   => -1,
			'fields'           => 'ids',
			'suppress_filters' => false,
			'meta_query'       => array(
				'relation' => 'AND',
				array(
					'key'   => '_elementor_template_type',
					'value' => 'kit',
				),
				array(
					'key'     => '_athemes_sites_imported_post',
					'compare' => 'EXISTS',
				),
			),
		)
	);

	if ( empty( $kits ) ) {
		return;
	}

	$target_kit = 0;

	foreach ( $kits as $kit_id ) {
		$settings = get_post_meta( $kit_id, '_elementor_page_settings', true );

		if ( ! is_array( $settings ) || empty( $settings['system_colors'] ) ) {
			continue;
		}

		foreach ( $settings['system_colors'] as $system_color ) {
			if ( isset( $system_color['color'] ) && isset( $color_map[ strtoupper( $system_color['color'] ) ] ) ) {
				$target_kit = $kit_id;
				break 2;
			}
		}
	}

	if ( ! $target_kit ) {
		return;
	}

	$settings = get_post_meta( $target_kit, '_elementor_page_settings', true );

	if ( ! is_array( $settings ) ) {
		return;
	}

	$settings = atss_botiga_walk_elementor_settings( $settings, $color_map, $heading_font, $body_font, '' );

	update_post_meta( $target_kit, '_elementor_page_settings', $settings );
	delete_post_meta( $target_kit, '_elementor_css' );

	update_option( 'elementor_active_kit', $target_kit );
}

/**
 * Reconcile colors and fonts inside every imported Elementor document.
 *
 * Walks the _elementor_data of each imported post, including pages and
 * header/footer builder templates, remaps palette colors and Inter fonts, and
 * clears the per-post Elementor caches so the CSS regenerates.
 *
 * @since 1.4.1
 * @param array  $color_map    Source hex (uppercase) => target hex.
 * @param string $heading_font Heading font family.
 * @param string $body_font    Body font family.
 * @param string $icon_color   Primary color for icon widgets, or empty.
 * @return void
 */
function atss_botiga_reflect_elementor_data( $color_map, $heading_font, $body_font, $icon_color = '' ) {
	$posts = get_posts(
		array(
			'post_type'        => get_post_types( array(), 'names' ),
			'post_status'      => 'any',
			'posts_per_page'   => -1,
			'fields'           => 'ids',
			'suppress_filters' => false,
			'meta_query'       => array(
				'relation' => 'AND',
				array(
					'key'     => '_elementor_data',
					'compare' => 'EXISTS',
				),
				array(
					'key'     => '_athemes_sites_imported_post',
					'compare' => 'EXISTS',
				),
			),
		)
	);

	if ( empty( $posts ) ) {
		return;
	}

	foreach ( $posts as $post_id ) {
		$raw = get_post_meta( $post_id, '_elementor_data', true );

		if ( empty( $raw ) || ! is_string( $raw ) ) {
			continue;
		}

		$data = json_decode( $raw, true );

		if ( ! is_array( $data ) ) {
			continue;
		}

		$updated = atss_botiga_walk_elementor_settings( $data, $color_map, $heading_font, $body_font, $icon_color );
		$encoded = wp_json_encode( $updated );

		if ( false === $encoded || $encoded === $raw ) {
			continue;
		}

		update_post_meta( $post_id, '_elementor_data', wp_slash( $encoded ) );
		delete_post_meta( $post_id, '_elementor_css' );
		delete_post_meta( $post_id, '_elementor_element_cache' );
	}
}

/**
 * Reflect the wizard palette and fonts into Elementor content after import.
 *
 * Mirrors the block-editor/customizer path for Elementor demos: the global kit
 * and every imported document are reconciled to the selected palette and fonts.
 * Runs only when Elementor is available and there is something to apply.
 *
 * @since 1.4.1
 * @param array  $palette      Selected palette keyed color1..color8 => hex, or empty.
 * @param string $heading_font Heading font family, or empty.
 * @param string $body_font    Body font family, or empty.
 * @return void
 */
function atss_botiga_reflect_elementor( $palette, $heading_font, $body_font ) {
	if ( ! class_exists( '\Elementor\Plugin' ) ) {
		return;
	}

	$color_map = ! empty( $palette ) ? atss_botiga_build_elementor_color_map( $palette ) : array();

	if ( empty( $color_map ) && '' === $heading_font && '' === $body_font ) {
		return;
	}

	$icon_color = ! empty( $palette['color1'] ) ? $palette['color1'] : '';

	atss_botiga_reflect_elementor_kit( $color_map, $heading_font, $body_font );
	atss_botiga_reflect_elementor_data( $color_map, $heading_font, $body_font, $icon_color );

	if ( isset( \Elementor\Plugin::$instance->files_manager ) ) {
		\Elementor\Plugin::$instance->files_manager->clear_cache();
	}
}

/**
 * Append custom data to the templates builder data.
 *
 * @param array $templates_builder_data The templates builder data.
 *
 * @return array
 */
function atss_botiga_append_templates_builder_data( $templates_builder_data ) {
	$new_data = array();

	// Update the templates builder data.
	foreach( $templates_builder_data as $template ) {
		$template['template_preview_url'] = get_bloginfo( 'url' ) . '/athemes_hf/' . $template['id'] . '-content';

		$new_data[] = $template;
	}

	return $new_data;
}

// Do not create default WooCommerce pages when plugin is activated
// The condition avoid the filter being applied in others pages
// Eg: Woo > Status > Tools > Create default pages
if ( isset( $_POST['action'] ) && $_POST['action'] === 'atss_import_plugin' ) {
	add_filter( 'woocommerce_create_pages', '__return_empty_array' );
}
