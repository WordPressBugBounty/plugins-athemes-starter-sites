<?php

/**
 * Starter Register Demos
 */
if ( !function_exists( 'sydney_atss_demos_list') ) {
	function sydney_atss_demos_list() {

		$customizer_file = 'customizer.dat'; 
		
		$is_pro = defined( 'SYDNEY_PRO_VERSION' ) ? true : false;
		
		if ( $is_pro ) {
			$customizer_file = 'customizer-pro.dat';
		}

		$plugins = array();

		if ( ! function_exists( 'wpcf_init' ) ) {
			$plugins[] = array(
				'name'     => 'Sydney Toolbox',
				'slug'     => 'sydney-toolbox',
				'path'     => 'sydney-toolbox/sydney-toolbox.php',
				'required' => false,
			);
		}

		$plugins[] = array(
			'name'     => 'WPForms',
			'slug'     => 'wpforms-lite',
			'path'     => 'wpforms-lite/wpforms.php',
			'required' => false,
			'recommended' => true,
		);

		$plugins[] = array(
			'name'     => 'WP Mail SMTP',
			'slug'     => 'wp-mail-smtp',
			'path'     => 'wp-mail-smtp/wp_mail_smtp.php',
			'required' => false,
			'recommended' => false,
		);

		$plugins[] = array(
			'name'     => 'All in One SEO',
			'slug'     => 'all-in-one-seo-pack',
			'path'     => 'all-in-one-seo-pack/all_in_one_seo_pack.php',
			'required' => false,
			'recommended' => false,
		);

		$demos = array(
			'main-pro' => array(
				'name'       => esc_html__( 'Agency', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business', 'portfolio' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-main/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/main-pro/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/main-pro/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/main-pro/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/main-pro/' . $customizer_file
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/main-pro/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/main-pro/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/main-pro/' . $customizer_file
					),
				),
			),
			'main-free' => array(
				'name'       => esc_html__( 'Agency (free)', 'sydney' ),
				'type'       => 'free',
				'categories' => array( 'business', 'portfolio' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sydney-main/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/main-free/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							'name'     => 'aThemes Addons for Elementor Lite',
							'slug'     => 'athemes-addons-for-elementor-lite',
							'path'     => 'athemes-addons-for-elementor-lite/athemes-addons-elementor.php',
							'required' => false,
							'builder'  => 'elementor'
						),
						array(
							'name'     => 'aThemes Blocks',
							'slug'     => 'athemes-blocks',
							'path'     => 'athemes-blocks/athemes-blocks.php',
							'required' => false,
							'builder'  => 'gutenberg'
						),
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/main-free/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/main-free/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/main-free/' . $customizer_file
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/main-free/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/main-free/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/main-free/' . $customizer_file
					)
				),
			),						
			'fashion'     => array(
				'name'       => esc_html__( 'Fashion Shop', 'sydney' ),
				'type'       => 'free',
				'categories' => array( 'ecommerce' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sydney-fashion/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/fashion/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							'name'     => 'WooCommerce',
							'slug'     => 'woocommerce',
							'path'     => 'woocommerce/woocommerce.php',
							'required' => true,
						),
						array(
							'name'     => 'Merchant',
							'slug'     => 'merchant',
							'path'     => 'merchant/merchant.php',
							'required' => false,
						),
						array(
							'name'     => 'aThemes Addons for Elementor Lite',
							'slug'     => 'athemes-addons-for-elementor-lite',
							'path'     => 'athemes-addons-for-elementor-lite/athemes-addons-elementor.php',
							'required' => false,
							'builder'  => 'elementor'
						),
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/fashion/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/fashion/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/fashion/' . $customizer_file
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/fashion/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/fashion/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/fashion/' . $customizer_file
					),
				),
			),
			'walkathon'   => array(
				'name'       => esc_html__( 'Walkathon', 'sydney' ),
				'type'       => 'free',
				'categories' => array( 'charity' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sydney-walkathon/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/walkathon/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							// Charitable is a companion plugin, not structurally
							// needed to import Walkathon's pages, so it stays
							// pre-checked but remains optional.
							'name'        => 'Charitable',
							'slug'        => 'charitable',
							'path'        => 'charitable/charitable.php',
							'required'    => false,
							'recommended' => true,
							'isSelected'  => true,
						),
						array(
							'name'     => 'aThemes Addons for Elementor Lite',
							'slug'     => 'athemes-addons-for-elementor-lite',
							'path'     => 'athemes-addons-for-elementor-lite/athemes-addons-elementor.php',
							'required' => false,
							'builder'  => 'elementor'
						),
						array(
							'name'     => 'aThemes Blocks',
							'slug'     => 'athemes-blocks',
							'path'     => 'athemes-blocks/athemes-blocks.php',
							'required' => false,
							'builder'  => 'gutenberg'
						),
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/walkathon/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/walkathon/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/walkathon/' . $customizer_file
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/walkathon/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/walkathon/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/walkathon/' . $customizer_file
					),
				),
			),
			'finance'    => array(
				'name'       => esc_html__( 'Finance', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp--finance/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/finance-new/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							'name'     => 'aThemes Addons for Elementor Lite',
							'slug'     => 'athemes-addons-for-elementor-lite',
							'path'     => 'athemes-addons-for-elementor-lite/athemes-addons-elementor.php',
							'required' => false,
							'builder'  => 'elementor'
						),
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/finance-new/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/finance-new/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/finance-new/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/finance-new/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/finance-new/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/finance-new/customizer.dat'
					)
				),
			),
			'barbershop'   => array(
				'name'       => esc_html__( 'Barbershop', 'sydney' ),
				'type'       => 'free',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sydney-barbershop/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/barbershop/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							'name'     => 'aThemes Addons for Elementor Lite',
							'slug'     => 'athemes-addons-for-elementor-lite',
							'path'     => 'athemes-addons-for-elementor-lite/athemes-addons-elementor.php',
							'required' => false,
							'builder'  => 'elementor'
						),
						array(
							'name'     => 'aThemes Blocks',
							'slug'     => 'athemes-blocks',
							'path'     => 'athemes-blocks/athemes-blocks.php',
							'required' => false,
							'builder'  => 'gutenberg'
						),
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/barbershop/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/barbershop/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/barbershop/' . $customizer_file
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/barbershop/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/barbershop/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/barbershop/' . $customizer_file
					),
				),
			),
			'pet-shop'   => array(
				'name'       => esc_html__( 'Pet Shop', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'ecommerce' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-pet-shop/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/pet-shop/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							'name'     => 'WooCommerce',
							'slug'     => 'woocommerce',
							'path'     => 'woocommerce/woocommerce.php',
							'required' => true,
						),
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/pet-shop/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/pet-shop/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/pet-shop/' . $customizer_file
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/pet-shop/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/pet-shop/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/pet-shop/' . $customizer_file
					),
				),
			),
			'law-firm'   => array(
				'name'       => esc_html__( 'Law Firm', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-law-firm/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/law-firm/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/law-firm/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/law-firm/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/law-firm/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/law-firm/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/law-firm/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/law-firm/customizer.dat'
					),
				),
			),
			'photography'     => array(
				'name'       => esc_html__( 'Photography', 'sydney' ),
				'type'       => 'free',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sydney-photography/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/photography/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							'name'     => 'aThemes Addons for Elementor Lite',
							'slug'     => 'athemes-addons-for-elementor-lite',
							'path'     => 'athemes-addons-for-elementor-lite/athemes-addons-elementor.php',
							'required' => false,
							'builder'  => 'elementor'
						),
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/photography/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/photography/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/photography/' . $customizer_file
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/photography/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/photography/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/photography/' . $customizer_file
					),
				),
			),	
			'interior-design'    => array(
				'name'       => esc_html__( 'Interior Design', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sydney-interior-design/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/interior-design/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							'name'     => 'aThemes Addons for Elementor Lite',
							'slug'     => 'athemes-addons-for-elementor-lite',
							'path'     => 'athemes-addons-for-elementor-lite/athemes-addons-elementor.php',
							'required' => false,
							'builder'  => 'elementor'
						),
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/interior-design/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/interior-design/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/interior-design/customizer.dat',
						),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/interior-design/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/interior-design/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/interior-design/customizer.dat'
					),
				),
			),
			'crypto'   => array(
				'name'       => esc_html__( 'Cryptocurrency', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-cryptocurrency/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/crypto/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/crypto/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/crypto/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/crypto/customizer.dat'
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/crypto/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/crypto/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/crypto/customizer.dat'
					),
				),
			),
			'venue'   => array(
				'name'       => esc_html__( 'Venue', 'sydney' ),
				'type'       => 'free',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sydney-venue/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/venue/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							// Sugar Calendar Lite is a companion plugin for event/booking
							// management, not structurally needed to import Venue's pages,
							// so it stays pre-checked but remains optional.
							'name'        => 'Sugar Calendar Lite',
							'slug'        => 'sugar-calendar-lite',
							'path'        => 'sugar-calendar-lite/sugar-calendar-lite.php',
							'required'    => false,
							'recommended' => true,
							'isSelected'  => true,
						),
						array(
							'name'     => 'aThemes Addons for Elementor Lite',
							'slug'     => 'athemes-addons-for-elementor-lite',
							'path'     => 'athemes-addons-for-elementor-lite/athemes-addons-elementor.php',
							'required' => false,
							'builder'  => 'elementor'
						),
						array(
							'name'     => 'aThemes Blocks',
							'slug'     => 'athemes-blocks',
							'path'     => 'athemes-blocks/athemes-blocks.php',
							'required' => false,
							'builder'  => 'gutenberg'
						),
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/venue/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/venue/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/venue/' . $customizer_file
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/venue/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/venue/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/venue/' . $customizer_file
					),
				),
			),
			'painting'   => array(
				'name'       => esc_html__( 'Painting', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-painting/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/painting/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/painting/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/painting/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/painting/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/painting/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/painting/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/painting/customizer.dat'
					),
				),
			),
			'saas'   => array(
				'name'       => esc_html__( 'SaaS (requires Elementor Containers)', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-saas/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/saas/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/saas/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/saas/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/saas/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/saas/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/saas/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/saas/customizer.dat'
					),
				),
			),
			'charity'   => array(
				'name'       => esc_html__( 'Charity (requires Elementor Containers)', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-charity/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/charity/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array( 
						'content'    => 'https://athemes.com/themes-demo-content/sydney/charity/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/charity/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/charity/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/charity/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/charity/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/charity/customizer.dat'
					),
				),
			),
			'hotel'   => array(
				'name'       => esc_html__( 'Hotel', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-hotel/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/hotel/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array( 
						'content'    => 'https://athemes.com/themes-demo-content/sydney/hotel/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/hotel/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/hotel/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/hotel/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/hotel/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/hotel/customizer.dat'
					),
				),
			),
			'wedding-planner'   => array(
				'name'       => esc_html__( 'Wedding Planner', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-wedding-planner/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/wedding-planner/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array( 
						'content'    => 'https://athemes.com/themes-demo-content/sydney/wedding-planner/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/wedding-planner/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/wedding-planner/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/wedding-planner/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/wedding-planner/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/wedding-planner/customizer.dat'
					),
				),
			),
			'news'   => array(
				'name'       => esc_html__( 'News (requires Elementor Containers)', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'blog', 'magazine' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-news/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/news/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array( 
						'content'    => 'https://athemes.com/themes-demo-content/sydney/news/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/news/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/news/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/news/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/news/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/news/customizer.dat'
					),
				),
			),
			'construction'   => array(
				'name'       => esc_html__( 'Construction', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/construction/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/construction/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/construction/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/construction/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/construction/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/construction/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/construction/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/construction/customizer.dat'
					),
				),
			),
			'cafe'   => array(
				'name'       => esc_html__( 'Cafe', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/cafe/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/cafe/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							'name'     => 'WooCommerce',
							'slug'     => 'woocommerce',
							'path'     => 'woocommerce/woocommerce.php',
							'required' => true,
						),
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array( 
						'content'    => 'https://athemes.com/themes-demo-content/sydney/cafe/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/cafe/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/cafe/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/cafe/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/cafe/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/cafe/customizer.dat'
					),
				),
			),	
			'hair-salon'   => array(
				'name'       => esc_html__( 'Hair Salon', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-hair-salon/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/hair-salon/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/hair-salon/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/hair-salon/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/hair-salon/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/hair-salon/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/hair-salon/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/hair-salon/customizer.dat'
					),
				),
			),			
			'original'   => array(
				'name'       => esc_html__( 'Original', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business', 'portfolio' ),
				'builders'   => array(
					'elementor',
				),
				'preview'    => 'https://demo.athemes.com/sydney-pro/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/original/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							'name'     => 'WooCommerce',
							'slug'     => 'woocommerce',
							'path'     => 'woocommerce/woocommerce.php',
							'required' => false,
						),
						array(
							'name'     => 'Smart Slider',
							'slug'     => 'smart-slider-3',
							'path'     => 'smart-slider-3/smart-slider-3.php',
							'required' => false,
						),		
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/original/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/original/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/original/customizer.dat',
					)
				),
			),
			'gardening'    => array(
				'name'       => esc_html__( 'Gardening', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/gardening/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/gardening/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array( 
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gardening/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gardening/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gardening/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/gardening/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/gardening/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/gardening/customizer.dat'
					),
				),
			),
			'leads'    => array(
				'name'       => esc_html__( 'Lead Generation', 'sydney' ),
				'type'       => 'free',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
				),
				'preview'    => 'https://demo.athemes.com/sydney-leads/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/leads/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							'name'     => 'Hubspot',
							'slug'     => 'leadin',
							'path'     => 'leadin/leadin.php',
							'required' => false
						),
						array(
							'name'     => 'aThemes Addons for Elementor Lite',
							'slug'     => 'athemes-addons-for-elementor-lite',
							'path'     => 'athemes-addons-for-elementor-lite/athemes-addons-elementor.php',
							'required' => false,
							'builder'  => 'elementor'
						),			
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array( 
						'content'    => 'https://athemes.com/themes-demo-content/sydney/leads/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/leads/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/leads/' . $customizer_file
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/leads/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/leads/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/leads/' . $customizer_file
					),
				),
			),	
			'learndash-lms'    => array(
				'name'       => esc_html__( 'eLearning (LearnDash)', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sydney-lms-learndash/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/lms/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array( 
						'content'    => 'https://athemes.com/themes-demo-content/sydney/learndash-lms/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/learndash-lms/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/learndash-lms/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/learndash-lms/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/learndash-lms/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/learndash-lms/customizer.dat'
					),
				),
			),	
			'tutor-lms'    => array(
				'name'       => esc_html__( 'eLearning (Tutor)', 'sydney' ),
				'type'       => 'free',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sydney-lms/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/lms/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							'name'     => 'Tutor',
							'slug'     => 'tutor',
							'path'     => 'tutor/tutor.php',
							'required' => false
						),
						array(
							'name'     => 'Tutor Elementor Addons',
							'slug'     => 'tutor-lms-elementor-addons',
							'path'     => 'tutor-lms-elementor-addons/tutor-lms-elementor-addons.php',
							'required' => false
						),
						array(
							'name'     => 'aThemes Addons for Elementor Lite',
							'slug'     => 'athemes-addons-for-elementor-lite',
							'path'     => 'athemes-addons-for-elementor-lite/athemes-addons-elementor.php',
							'required' => false,
							'builder'  => 'elementor'
						),										
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array( 
						'content'    => 'https://athemes.com/themes-demo-content/sydney/lms/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/lms/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/lms/' . $customizer_file
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/tutor-lms/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/tutor-lms/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/tutor-lms/' . $customizer_file
					),
				),
			),				
			'blogpro'   => array(
				'name'       => esc_html__( 'Blog', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'blog' ),
				'builders'   => array(
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-blog/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/blogpro/thumb.jpg',
				'import'     => array(
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/blogpro/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/blogpro/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/blogpro/customizer.dat',
					),
				),
			),
			'restaurant' => array(
				'name'       => esc_html__( 'Restaurant (requires Elementor Containers)', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business', 'ecommerce' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp--restaurant/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/restaurant/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor' => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/restaurant/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/restaurant/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/restaurant/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/restaurant/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/restaurant/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/restaurant/customizer.dat'
					),
				),
			),
			'yoga'       => array(
				'name'       => esc_html__( 'Yoga', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-yoga/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/yoga/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor' => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/yoga/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/yoga/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/yoga/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/yoga/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/yoga/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/yoga/customizer.dat'
					),
				),
			),
			'business'   => array(
				'name'       => esc_html__( 'Business', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-business/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/business/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor' => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/business/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/business/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/business/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/business/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/business/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/business/customizer.dat'
					),
				),
			),
			'coworking'  => array(
				'name'       => esc_html__( 'Coworking', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp--coworking/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/coworking-new/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor' => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/coworking-new/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/coworking-new/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/coworking-new/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/coworking/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/coworking/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/coworking/customizer.dat'
					),
				),
			),
			'resume'     => array(
				'name'       => esc_html__( 'Resume', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'portfolio' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp--resume/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/resume/thumb.jpg',
				'plugins'    => $plugins,
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/resume/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/resume/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/resume/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/resume/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/resume/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/resume/customizer.dat'
					),
				),
			),	
			'author'       => array(
				'name'       => esc_html__( 'Author', 'sydney' ),
				'type'       => 'pro',
				'categories' => array( 'portfolio', 'ecommerce' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/author/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/author/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							'name'     => 'WooCommerce',
							'slug'     => 'woocommerce',
							'path'     => 'woocommerce/woocommerce.php',
							'required' => false,
						),
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/author/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/author/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/author/customizer.dat',
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/author/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/author/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/author/customizer.dat'
					),
				),
			),
			'plumber'     => array(
				'name'       => esc_html__( 'Plumber', 'sydney' ),
				'type'       => 'free',
				'categories' => array( 'business' ),
				'builders'   => array(
					'elementor',
					'gutenberg',
				),
				'preview'    => 'https://demo.athemes.com/sp-plumber/',
				'thumbnail'  => 'https://athemes.com/themes-demo-content/sydney/plumber/thumb.jpg',
				'plugins'    => array_merge(
					array(
						array(
							'name'     => 'aThemes Addons for Elementor Lite',
							'slug'     => 'athemes-addons-for-elementor-lite',
							'path'     => 'athemes-addons-for-elementor-lite/athemes-addons-elementor.php',
							'required' => false,
							'builder'  => 'elementor'
						),
					),
					$plugins
				),
				'import'     => array(
					'elementor'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/plumber/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/plumber/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/plumber/' . $customizer_file
					),
					'gutenberg'    => array(
						'content'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/plumber/content.xml',
						'widgets'    => 'https://athemes.com/themes-demo-content/sydney/gutenberg/plumber/widgets.wie',
						'customizer' => 'https://athemes.com/themes-demo-content/sydney/gutenberg/plumber/' . $customizer_file
					),
				),
			),
		);

		//Move the main free demo to the first position if the pro version is not active.
		if ( ! defined( 'SYDNEY_PRO_VERSION' ) ) {
			$free_demo = $demos['main-free'];
			unset( $demos['main-free'] );
			$demos = array_merge( array( 'main-free' => $free_demo ), $demos );
		}

		return $demos;
	}
}
add_filter( 'atss_register_demos_list', 'sydney_atss_demos_list' );

/**
 * Define actions that happen before import
 */
function sydney_atss_setup_before_import( $demo_id, $builder_type ) {

	$all_modules = get_option( 'sydney-modules' );
	$all_modules = ( is_array( $all_modules ) ) ? $all_modules : (array) $all_modules;

	//Enable demo-specific modules
	if ( 'news' === $demo_id ) {
		update_option( 'sydney-modules', array_merge( $all_modules, array( 'ext-blog' => true, 'templates' => true, 'page-headers' => true ) ) );
	} elseif ( 'restaurant' === $demo_id ) {
		update_option( 'sydney-modules', array_merge( $all_modules, array( 'templates' => true ) ) );
	} elseif ( 'charity' === $demo_id ) {
		update_option( 'sydney-modules', array_merge( $all_modules, array( 'templates' => true ) ) );
	} elseif ( 'saas' === $demo_id ) {
		update_option( 'sydney-modules', array_merge( $all_modules, array( 'templates' => true ) ) );
	}
}
add_action( 'atss_import_start', 'sydney_atss_setup_before_import', 10, 2 );

/**
 * Define actions that happen after import
 */
function sydney_atss_setup_after_import( $demo_id ) {

	// Assign the menu. Prefer "Menu 1", fall back to "Main" if not found.
	$main_menu = get_term_by( 'name', 'Menu 1', 'nav_menu' );

	if ( ! $main_menu ) {
		$main_menu = get_term_by( 'name', 'Main', 'nav_menu' );
	}

	// Check if the menu was actually found before trying to use it.
	if ( $main_menu ) {
		set_theme_mod(
			'nav_menu_locations',
			array(
				'primary' => $main_menu->term_id,
			)
		);
	}

	if ( 'finance' === $demo_id ) {
		$aafe_modules = get_option( 'athemes-addons-modules' );
		$aafe_modules = ( is_array( $aafe_modules ) ) ? $aafe_modules : (array) $aafe_modules;

		update_option( 'athemes-addons-modules', array_merge( $aafe_modules, array( 'call-to-action' => true, 'team-member' => true ) ) );
	}

	if ( 'interior-design' === $demo_id ) {
		$aafe_modules = get_option( 'athemes-addons-modules' );
		$aafe_modules = ( is_array( $aafe_modules ) ) ? $aafe_modules : (array) $aafe_modules;

		update_option( 'athemes-addons-modules', array_merge( $aafe_modules, array( 'video-popup' => true, 'team-member' => true ) ) );
	}

	if ( 'blogpro' === $demo_id ) {
		$all_modules = get_option( 'sydney-modules' );
		$all_modules = ( is_array( $all_modules ) ) ? $all_modules : (array) $all_modules;

		update_option( 'sydney-modules', array_merge( $all_modules, array( 'ext-blog' => true, 'breadcrumbs' => true ) ) );

		$main_menu = get_term_by( 'name', 'Main', 'nav_menu' );
		set_theme_mod(
			'nav_menu_locations',
			array(
				'primary' => $main_menu->term_id,
			)
		);
	}	

	if ( 'hotel' === $demo_id ) {
		$all_modules = get_option( 'sydney-modules' );
		$all_modules = ( is_array( $all_modules ) ) ? $all_modules : (array) $all_modules;

		update_option( 'sydney-modules', array_merge( $all_modules, array( 'templates' => true ) ) );

		$template_builder_data = array(
			array(
				'id'                => 'global',
				'footer'            => '192',
				'footer_builder'    => 'elementor',
			)		
		);
		
		update_option('sydney_template_builder_data', $template_builder_data);
	}

	if ( 'main-free' === $demo_id ) {
		$aafe_modules = get_option( 'athemes-addons-modules' );
		$aafe_modules = ( is_array( $aafe_modules ) ) ? $aafe_modules : (array) $aafe_modules;

		update_option( 'athemes-addons-modules', array_merge( $aafe_modules, array( 'testimonials' => true ) ) );

		$main_menu = get_term_by( 'name', 'Main', 'nav_menu' );
		set_theme_mod(
			'nav_menu_locations',
			array(
				'primary' => $main_menu->term_id,
			)
		);
		
		// Assign footer menus to widgets
		$footer_menus = array(
			'Footer 1' => array( 'About' ),
			'Footer 2' => array( 'Locations' ),
			'Footer 4' => array( 'Policy' ),
		);

		foreach ( $footer_menus as $menu_name => $widget_titles ) {
			$footer_menu = get_term_by( 'name', $menu_name, 'nav_menu' );
			if ( ! empty( $footer_menu ) ) {
				$nav_menu_widget = get_option( 'widget_nav_menu' );
				foreach ( $nav_menu_widget as $key => $widget ) {
					if ( $key !== '_multiwidget' ) {
						if ( ! empty( $nav_menu_widget[ $key ]['title'] ) && in_array( $nav_menu_widget[ $key ]['title'], $widget_titles ) ) {
							$nav_menu_widget[ $key ]['nav_menu'] = $footer_menu->term_id;
							update_option( 'widget_nav_menu', $nav_menu_widget );
						}
					}
				}
			}
		}
		
	}

	if ( 'fashion' === $demo_id ) {
		$merchant_modules = get_option( 'merchant-modules' );
		$merchant_modules = ( is_array( $merchant_modules ) ) ? $merchant_modules : (array) $merchant_modules;

		update_option( 'merchant-modules', array_merge( $merchant_modules, array( 'quick-view' => true, 'inactive-tab-message' => true ) ) );

		$aafe_modules = get_option( 'athemes-addons-modules' );
		$aafe_modules = ( is_array( $aafe_modules ) ) ? $aafe_modules : (array) $aafe_modules;

		update_option( 'athemes-addons-modules', array_merge( $aafe_modules, array( 'woo-product-grid' => true, 'testimonials' => true ) ) );
	}

	if ( 'plumber' === $demo_id ) {
		$aafe_modules = get_option( 'athemes-addons-modules' );
		$aafe_modules = ( is_array( $aafe_modules ) ) ? $aafe_modules : (array) $aafe_modules;

		update_option( 'athemes-addons-modules', array_merge( $aafe_modules, array( 'logo-carousel' => true ) ) );
	}

	if ( 'leads' === $demo_id || 'hair-salon' === $demo_id || 'photography' === $demo_id ) {
		$aafe_modules = get_option( 'athemes-addons-modules' );
		$aafe_modules = ( is_array( $aafe_modules ) ) ? $aafe_modules : (array) $aafe_modules;

		update_option( 'athemes-addons-modules', array_merge( $aafe_modules, array( 'wpforms' => true ) ) );
	}

	if ( 'venue' === $demo_id ) {
		sydney_atss_seed_venue_events();
	}

	// Asign the static front page and the blog page.
	$front_page = ATSS_Core_Helpers::atss_get_page_by_title( 'My front page' ) != NULL ? ATSS_Core_Helpers::atss_get_page_by_title( 'My front page' ) : ATSS_Core_Helpers::atss_get_page_by_title( 'Home' );
	$blog_page  = ATSS_Core_Helpers::atss_get_page_by_title( 'My blog page' ) != NULL ? ATSS_Core_Helpers::atss_get_page_by_title( 'My blog page' ) : ATSS_Core_Helpers::atss_get_page_by_title( 'Blog' );

	if ( !empty( $front_page ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $front_page->ID );

		// Assign the Front Page template.
		update_post_meta( $front_page->ID, '_wp_page_template', 'page-templates/page_front-page.php' );
	}
	if ( !empty( $blog_page ) ) {
		update_option( 'page_for_posts', $blog_page->ID );
	}

	if ( class_exists( 'SmartSlider3', false ) ) {
		SmartSlider3::import( get_template_directory() . '/demo-content/demo-slider.ss3' );
	}

	// Assign woocommerce pages in some demos
	if( class_exists( 'Woocommerce' ) ) {
		switch ( $demo_id ) {
			case 'author':
				$shop_page = ATSS_Core_Helpers::atss_get_page_by_title( 'Books' );
				update_option( 'woocommerce_shop_page_id', $shop_page->ID );

				break;
			
		}
	}

	atss()->current_starter( 'sydney', $demo_id );
}
add_action( 'atss_finish_import', 'sydney_atss_setup_after_import' );

/**
* Create the Venue demo's Sugar Calendar events.
*
* Sugar Calendar 3.x keeps event dates in its own `sc_events` table, which the
* WordPress exporter never serializes. The demo's content.xml therefore carries
* only dateless `sc_event` post shells: absent from the calendar, reachable only
* as bare posts. They are replaced here with real events, dated relative to the
* import so the demo never ships a calendar full of past dates.
*
* The demo's event list block shows five events, so five are created.
*/
function sydney_atss_seed_venue_events() {

	if ( ! function_exists( 'sugar_calendar_add_event' ) || ! function_exists( 'sugar_calendar_get_event_post_type_id' ) ) {
		return;
	}

	$post_type = sugar_calendar_get_event_post_type_id();

	// Remove the imported shells, plus any events a previous run created. Both
	// carry the importer's marker meta, so nothing the user authored is touched.
	$imported = get_posts(
		array(
			'post_type'      => $post_type,
			'post_status'    => 'any',
			'posts_per_page' => -1,
			'fields'         => 'ids',
			'meta_key'       => '_athemes_sites_imported_post',
		)
	);

	foreach ( $imported as $imported_id ) {
		// The `sc_events` row is dropped explicitly. Sugar Calendar hooks its own
		// cleanup to `deleted_post`, but that was observed not to run here, and a
		// leftover row still answers the calendar's queries -- so re-importing
		// would show ghost events pointing at posts that no longer exist.
		if ( function_exists( 'sugar_calendar_delete_events' ) ) {
			sugar_calendar_delete_events(
				array(
					'object_id'   => $imported_id,
					'object_type' => 'post',
				)
			);
		}

		// Deleted rather than trashed, which would leave the event behind.
		wp_delete_post( $imported_id, true );
	}

	// Dates float with the import: "today" is resolved in the site's timezone.
	$today = new DateTimeImmutable( 'now', wp_timezone() );

	$calendar_taxonomy = function_exists( 'sugar_calendar_get_calendar_taxonomy_id' ) ? sugar_calendar_get_calendar_taxonomy_id() : '';
	$default_calendar  = function_exists( 'sugar_calendar_get_default_calendar' ) ? sugar_calendar_get_default_calendar() : 0;

	$events = array(
		array(
			'title'   => 'Concrete Hours',
			'content' => 'Ambient guitar and tape loops in the main room, doors at eight.',
			'days'    => 6,
			'start'   => '20:00:00',
			'end'     => '23:00:00',
		),
		array(
			'title'   => 'DJ Vera Holt',
			'content' => 'House and disco selections, late set on the back patio.',
			'days'    => 13,
			'start'   => '21:00:00',
			'end'     => '23:59:00',
		),
		array(
			'title'   => 'The Sunday Quartet',
			'content' => 'An early evening of standards, seated tables only.',
			'days'    => 20,
			'start'   => '18:00:00',
			'end'     => '20:00:00',
		),
		array(
			'title'   => 'South Loop Standup',
			'content' => 'Five comics, one host, two drink minimum.',
			'days'    => 27,
			'start'   => '19:30:00',
			'end'     => '21:30:00',
		),
		array(
			'title'   => 'Wraith',
			'content' => 'Post-punk headliner with support from the neighbourhood.',
			'days'    => 34,
			'start'   => '20:30:00',
			'end'     => '23:00:00',
		),
	);

	foreach ( $events as $event ) {
		$date = $today->modify( sprintf( '+%d days', $event['days'] ) )->format( 'Y-m-d' );

		$post_id = wp_insert_post(
			array(
				'post_title'   => $event['title'],
				'post_content' => $event['content'],
				'post_status'  => 'publish',
				'post_type'    => $post_type,
				'post_author'  => get_current_user_id(),
			)
		);

		if ( is_wp_error( $post_id ) || empty( $post_id ) ) {
			continue;
		}

		// Marked like an imported post so the plugin's clean-up step collects it.
		update_post_meta( $post_id, '_athemes_sites_imported_post', true );

		// Assigned explicitly rather than left to Sugar Calendar's
		// save_post_sc_event hook, which only runs in admin requests. The term id
		// is looked up because the demo's calendar term is remapped on import.
		if ( $calendar_taxonomy && $default_calendar ) {
			wp_set_object_terms( $post_id, array( (int) $default_calendar ), $calendar_taxonomy );
		}

		// `start`/`end` are wall-clock values, and the timezone is deliberately
		// left empty -- Sugar Calendar reads that as a floating time, so an 8pm
		// show reads as 8pm whatever the visitor's zone. That also matches how
		// the plugin stores its own events.
		sugar_calendar_add_event(
			array(
				'object_id'      => $post_id,
				'object_type'    => 'post',
				'object_subtype' => $post_type,
				'title'          => $event['title'],
				'content'        => $event['content'],
				'status'         => 'publish',
				'start'          => $date . ' ' . $event['start'],
				'start_tz'       => '',
				'end'            => $date . ' ' . $event['end'],
				'end_tz'         => '',
				'all_day'        => 0,
			)
		);
	}
}

/*
* Color scheme tooltips
*/
function sydney_atss_color_scheme_tooltips() {
	$tooltips = array(
		'global_color_1' => esc_html__( 'Global color 1: primary color, used for accents, buttons, etc.', 'athemes-starter-sites' ),
		'global_color_2' => esc_html__( 'Global color 2: hover color', 'athemes-starter-sites' ),
		'global_color_3' => esc_html__( 'Global color 3: body text color', 'athemes-starter-sites' ),
		'global_color_4' => esc_html__( 'Global color 4: general headings color', 'athemes-starter-sites' ),
		'global_color_5' => esc_html__( 'Global color 5: used for smaller text, like post meta', 'athemes-starter-sites' ),
		'global_color_6' => esc_html__( 'Global color 6: dark backgrounds, like the header & footer', 'athemes-starter-sites' ),
		'global_color_7' => esc_html__( 'Global color 7: light backgrounds', 'athemes-starter-sites' ),
		'global_color_8' => esc_html__( 'Global color 8: border color', 'athemes-starter-sites' ),
		'global_color_9' => esc_html__( 'Global color 9: site background color', 'athemes-starter-sites' ),
	);

	return $tooltips;
}
add_filter( 'atss_register_customize_tooltips', 'sydney_atss_color_scheme_tooltips' );

/**
 * Allow Sydney and Sydney Pro to share customizer files
 * This ensures cross-compatibility between Sydney (free) and Sydney Pro themes
 */
function sydney_atss_customizer_import_theme_match( $theme_matches, $import_template, $current_template, $current_stylesheet ) {
	// If already matched, return true
	if ( $theme_matches ) {
		return true;
	}

	$sydney_themes = array( 'sydney', 'sydney-pro', 'sydney-pro-ii' );
	
	if ( in_array( $import_template, $sydney_themes, true ) && in_array( $current_template, $sydney_themes, true ) ) {
		return true;
	}
	
	if ( in_array( $import_template, $sydney_themes, true ) && in_array( $current_stylesheet, $sydney_themes, true ) ) {
		return true;
	}
	
	return $theme_matches;
}
add_filter( 'atss_customizer_import_theme_match', 'sydney_atss_customizer_import_theme_match', 10, 4 );