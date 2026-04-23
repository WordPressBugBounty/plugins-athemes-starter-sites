/**
 * Botiga non-variable-backed color rules.
 *
 * These selectors are not mapped to CSS custom properties in the theme,
 * so preview updates must be applied by injecting generated CSS.
 *
 * @package aThemes Starter Sites
 */

/**
 * Botiga non-variable-backed controls grouped by palette slot.
 */
export const botigaNonVariableBackedColorControlsByGroup = {
	color1: [
		'scrolltop_bg_color',
		'single_product_tabs_border_color_active',
		'single_product_tabs_text_color_active',
		'single_product_tabs_text_color',
		'shop_archive_header_button_color',
		'shop_archive_header_button_border_color',
		'ql_item_bg_hover',
		'comments_comment_reply_link_background',
		'wp_block_search_button_background',
		'botiga_reading_progress_bar_background',
		'botiga_tabs_nav_link_border_color_active',
		'tags_links_color',
		'tags_links_border_color',
		'pagination_background_active',
		'pagination_color_active',
		'button_background'
	],

	color2: [
		'scrolltop_bg_color_hover',
		'shop_archive_header_button_background_color_hover',
		'shop_archive_header_button_border_color_hover',
		'main_header_sticky_active_color_hover',
		'main_header_color_hover',
		'main_header_sticky_active_submenu_color_hover',
		'main_header_submenu_color_hover',
		'ql_item_color_hover',
		'comments_comment_reply_link_background_hover',
		'wp_block_search_button_background_hover',
		'mobile_offcanvas_close_color_hover',
		'site_info_link_color_hover',
		'button_background_hover'
	],

	color3: [
		'main_header_submenu_color',
		'main_header_sticky_active_submenu_color',
		'single_product_title_color',
		'shop_product_product_title',
		'main_header_color',
		'main_header_sticky_active_color',
		'site_title_color',
		'site_description_color',
		'shop_archive_header_title_color',
		'shop_archive_header_description_color',
		'bhfb_search_icon_color',
		'bhfb_woo_icons_color',
		'bhfb_contact_info_icon_color',
		'ql_item_color',
		'botiga_accordion_item_arrow_border_color_hover',
		'botiga_accordion_item_arrow_border_color_active',
		'mobile_offcanvas_close_color',
		'site_info_text_color',
		'site_info_link_color',
		'site_info_icon_color'
	],

	color5: [
		'single_product_tabs_remaining_borders',
		'single_sticky_add_to_cart_style_color_border',
		'botiga_header_row__above_header_row_border_bottom_color',
		'botiga_header_row__main_header_row_border_bottom_color',
		'botiga_header_row__below_header_row_border_bottom_color',
		'botiga_footer_row__above_footer_row_border_top_color',
		'botiga_footer_row__main_footer_row_border_top_color',
		'botiga_footer_row__below_footer_row_border_top_color',
		'ql_item_border_color',
		'botiga_accordion_item_arrow_border_color',
		'site_info_border_color'
	],

	color6: [
		'single_product_gallery_styles_background_color',
		'single_sticky_add_to_cart_style_color_background',
		'botiga_footer_row__above_footer_row_background_color',
		'botiga_footer_row__main_footer_row_background_color',
		'botiga_footer_row__below_footer_row_background_color',
		'ql_background_color',
		'botiga_tabs_nav_link_background',
		'site_footer_background',
		'footer_widgets_background'
	],

	color7: [
		'scrolltop_color',
		'scrolltop_color_hover',
		'single_product_reviews_advanced_section_bg_color',
		'comments_comment_reply_link_color',
		'comments_comment_reply_link_color_hover',
		'wp_block_search_button_color',
		'button_text'
	],

	color8: [
		'botiga_header_row__above_header_row_background_color',
		'botiga_header_row__main_header_row_background_color',
		'botiga_header_row__below_header_row_background_color',
		'mobile_offcanvas_background_color',
		'shop_archive_header_background_color',
		'custom_background',
		'button_text_hover'
	]
};

/**
 * Botiga non-variable-backed controls in a flat list.
 */
export const botigaNonVariableBackedColorControls = Object.values(
	botigaNonVariableBackedColorControlsByGroup
).flat();

/**
 * Map control names to CSS rule builders.
 */
export const botigaNonVariableBackedRuleMap = {
	scrolltop_bg_color: ( color ) => `
		.back-to-top {
			background-color: ${ color } !important;
		}
	`,

	single_product_tabs_border_color_active: ( color ) => `
		.botiga-tabs-style1 .woocommerce-tabs ul.tabs li.active a,
		.botiga-tabs-style1 .woocommerce-tabs ul.tabs li:hover a,
		.botiga-tabs-style4 .woocommerce-tabs ul.tabs li.active a,
		.botiga-tabs-style4 .woocommerce-tabs ul.tabs li:hover a {
			border-color: ${ color } !important;
		}
	`,

	single_product_tabs_text_color_active: ( color ) => `
		.woocommerce-tabs ul.tabs li.active a,
		.woocommerce-tabs ul.tabs li.active a:hover {
			color: ${ color } !important;
		}
	`,

	single_product_tabs_text_color: ( color ) => `
		.woocommerce-tabs ul.tabs li:not(.active) a,
		.woocommerce-tabs ul.tabs li:not(.active) a:hover {
			color: ${ color } !important;
		}
	`,

	shop_archive_header_button_color: ( color ) => `
		.woocommerce-page-header .category-button {
			color: ${ color } !important;
		}
	`,

	shop_archive_header_button_border_color: ( color ) => `
		.woocommerce-page-header .category-button {
			border-color: ${ color } !important;
		}
	`,

	ql_item_bg_hover: ( color ) => `
		.botiga-quick-links .quick-link:hover {
			background-color: ${ color } !important;
		}
	`,

	comments_comment_reply_link_background: ( color ) => `
		.comments-area .comment-reply-link {
			background-color: ${ color } !important;
		}
	`,

	wp_block_search_button_background: ( color ) => `
		.wp-block-search .wp-block-search__button {
			background: ${ color } !important;
		}
	`,

	botiga_reading_progress_bar_background: ( color ) => `
		.botiga-reading-progress__bar {
			background-color: ${ color } !important;
		}
	`,

	botiga_tabs_nav_link_border_color_active: ( color ) => `
		.botiga-tabs-nav .botiga-tabs-nav-item.is-active .botiga-tabs-nav-link {
			border-bottom-color: ${ color } !important;
		}
	`,

	tags_links_color: ( color ) => `
		.bhfb .botiga-credits a,
		.tags-links a {
			color: ${ color } !important;
		}
	`,

	tags_links_border_color: ( color ) => `
		.tags-links a {
			border-color: ${ color } !important;
		}
	`,

	pagination_background_active: ( color ) => `
		.navigation.pagination .page-numbers:hover,
		.navigation.pagination .page-numbers:focus,
		.navigation.pagination .page-numbers.current,
		.woocommerce-pagination li .page-numbers:hover,
		.woocommerce-pagination li .page-numbers:focus,
		.woocommerce-pagination li .page-numbers.current {
			background-color: ${ color } !important;
		}
	`,

	pagination_color_active: ( color ) => `
		.navigation.pagination .page-numbers:hover,
		.navigation.pagination .page-numbers:focus,
		.navigation.pagination .page-numbers.current,
		.woocommerce-pagination li .page-numbers:hover,
		.woocommerce-pagination li .page-numbers:focus,
		.woocommerce-pagination li .page-numbers.current {
			color: ${ color } !important;
		}
	`,

	scrolltop_bg_color_hover: ( color ) => `
		.back-to-top:hover {
			background-color: ${ color } !important;
		}
	`,

	shop_archive_header_button_background_color_hover: ( color ) => `
		.woocommerce-page-header .category-button:hover {
			background-color: ${ color } !important;
		}
	`,

	shop_archive_header_button_border_color_hover: ( color ) => `
		.woocommerce-page-header .category-button:hover {
			border-color: ${ color } !important;
		}
	`,

	main_header_sticky_active_color_hover: ( color ) => `
		.sticky-header-active .bhfb .main-navigation a.botiga-dropdown-link:hover {
			color: ${ color } !important;
		}

		.sticky-header-active .bhfb .main-navigation a.botiga-dropdown-link:hover + .dropdown-symbol svg {
			fill: ${ color } !important;
		}
	`,

	main_header_color_hover: ( color ) => `
		.bhfb .main-navigation a.botiga-dropdown-link:hover {
			color: ${ color } !important;
		}

		.bhfb .main-navigation a.botiga-dropdown-link:hover + .dropdown-symbol svg {
			fill: ${ color } !important;
		}
	`,

	main_header_sticky_active_submenu_color_hover: ( color ) => `
		.sticky-header-active .bhfb .main-navigation .sub-menu.botiga-dropdown-ul a.botiga-dropdown-link:hover {
			color: ${ color } !important;
		}

		.sticky-header-active .bhfb .main-navigation .sub-menu.botiga-dropdown-ul a.botiga-dropdown-link:hover + .dropdown-symbol svg {
			fill: ${ color } !important;
		}
	`,

	main_header_submenu_color_hover: ( color ) => `
		.bhfb .main-navigation .sub-menu.botiga-dropdown-ul a.botiga-dropdown-link:hover {
			color: ${ color } !important;
		}

		.bhfb .main-navigation .sub-menu.botiga-dropdown-ul a.botiga-dropdown-link:hover + .dropdown-symbol svg {
			fill: ${ color } !important;
		}
	`,

	ql_item_color_hover: ( color ) => `
		.botiga-quick-links .quick-link:hover .ql-image.is-svg {
			background-color: ${ color } !important;
		}
	`,

	comments_comment_reply_link_background_hover: ( color ) => `
		.comments-area .comment-reply-link:hover {
			background-color: ${ color } !important;
		}
	`,

	wp_block_search_button_background_hover: ( color ) => `
		.wp-block-search .wp-block-search__button:hover {
			background: ${ color } !important;
		}
	`,

	mobile_offcanvas_close_color_hover: ( color ) => `
		.bhfb-mobile_offcanvas .mobile-menu-close:hover svg {
			fill: ${ color } !important;
		}
	`,

	site_info_link_color_hover: ( color ) => `
		.bhfb .botiga-credits a:hover,
		.site-info a:hover {
			color: ${ color } !important;
		}
	`,

	main_header_submenu_color: ( color ) => `
		.bhfb .main-navigation .sub-menu.botiga-dropdown-ul a.botiga-dropdown-link {
			color: ${ color } !important;
		}

		.bhfb .main-navigation .sub-menu.botiga-dropdown-ul a.botiga-dropdown-link + .dropdown-symbol svg {
			fill: ${ color } !important;
		}
	`,

	main_header_sticky_active_submenu_color: ( color ) => `
		.sticky-header-active .bhfb .main-navigation .sub-menu.botiga-dropdown-ul a.botiga-dropdown-link {
			color: ${ color } !important;
		}

		.sticky-header-active .bhfb .main-navigation .sub-menu.botiga-dropdown-ul a.botiga-dropdown-link + .dropdown-symbol svg {
			fill: ${ color } !important;
		}
	`,

	single_product_title_color: ( color ) => `
		.product-gallery-summary .product_title {
			color: ${ color } !important;
		}
	`,

	shop_product_product_title: ( color ) => `
		ul.wc-block-grid__products li.wc-block-grid__product .wc-block-grid__product-title,
		ul.wc-block-grid__products li.wc-block-grid__product .woocommerce-loop-product__title,
		ul.wc-block-grid__products li.product .wc-block-grid__product-title,
		ul.wc-block-grid__products li.product .woocommerce-loop-product__title,
		ul.products li.wc-block-grid__product .wc-block-grid__product-title,
		ul.products li.wc-block-grid__product .woocommerce-loop-product__title,
		ul.products li.product .wc-block-grid__product-title,
		ul.products li.product .woocommerce-loop-product__title,
		ul.products li.product .woocommerce-loop-category__title,
		.woocommerce-loop-product__title .botiga-wc-loop-product__title {
			color: ${ color } !important;
		}
	`,

	main_header_color: ( color ) => `
		.bhfb .main-navigation a.botiga-dropdown-link {
			color: ${ color } !important;
		}

		.bhfb .main-navigation a.botiga-dropdown-link + .dropdown-symbol svg {
			fill: ${ color } !important;
		}
	`,

	main_header_sticky_active_color: ( color ) => `
		.sticky-header-active .bhfb .main-navigation a.botiga-dropdown-link {
			color: ${ color } !important;
		}

		.sticky-header-active .bhfb .main-navigation a.botiga-dropdown-link + .dropdown-symbol svg {
			fill: ${ color } !important;
		}
	`,

	site_title_color: ( color ) => `
		.site-header .site-title a,
		.bhfb .site-title a {
			color: ${ color } !important;
		}
	`,

	site_description_color: ( color ) => `
		.site-description,
		.bhfb .site-description {
			color: ${ color } !important;
		}
	`,

	shop_archive_header_title_color: ( color ) => `
		.woocommerce-page-header h1 {
			color: ${ color } !important;
		}
	`,

	shop_archive_header_description_color: ( color ) => `
		.woocommerce-page-header .page-description,
		.woocommerce-page-header .term-description {
			color: ${ color } !important;
		}
	`,

	bhfb_search_icon_color: ( color ) => `
		.bhfb-component-search .header-search svg {
			fill: ${ color } !important;
		}

		.bhfb-component-search .header-search .botiga-image.is-svg {
			background-color: ${ color } !important;
		}
	`,

	bhfb_woo_icons_color: ( color ) => `
		.bhfb-component-woo_icons .header-item svg:not(.stroke-based) {
			fill: ${ color } !important;
		}

		.bhfb-component-woo_icons .header-item svg.stroke-based {
			stroke: ${ color } !important;
		}

		.bhfb-component-woo_icons .header-item .botiga-image.is-svg {
			background-color: ${ color } !important;
		}
	`,

	bhfb_contact_info_icon_color: ( color ) => `
		.bhfb-component-contact_info .header-contact > a svg {
			fill: ${ color } !important;
		}
	`,

	ql_item_color: ( color ) => `
		.botiga-quick-links .ql-image.is-svg {
			background-color: ${ color } !important;
		}
	`,

	botiga_accordion_item_arrow_border_color_hover: ( color ) => `
		.botiga-accordion__item > a:hover:after {
			border-color: ${ color } !important;
			border-bottom-color: transparent !important;
			border-left-color: transparent !important;
		}
	`,

	botiga_accordion_item_arrow_border_color_active: ( color ) => `
		.botiga-accordion__item > a.active:after {
			border-color: ${ color } !important;
			border-bottom-color: transparent !important;
			border-left-color: transparent !important;
		}
	`,

	mobile_offcanvas_close_color: ( color ) => `
		.bhfb-mobile_offcanvas .mobile-menu-close svg {
			fill: ${ color } !important;
		}
	`,

	site_info_text_color: ( color ) => `
		.site-info {
			color: ${ color } !important;
		}
	`,

	site_info_link_color: ( color ) => `
		.site-info a {
			color: ${ color } !important;
		}
	`,

	site_info_icon_color: ( color ) => `
		.bhfb-component-mobile_hamburger .menu-toggle svg,
		.bhfb-footer .bhfb-component-social .social-profile > a svg,
		.bhfb-component-social .social-profile > a svg,
		.site-info .ws-svg-icon svg {
			fill: ${ color } !important;
		}
	`,

	header_search_form_select_arrow_color: ( color ) => `
		.botiga-select:before {
			border-color: ${ color } !important;
			border-bottom-color: transparent !important;
			border-left-color: transparent !important;
		}
	`,

	single_product_tabs_remaining_borders: ( color ) => `
		.botiga-tabs-style1 .woocommerce-tabs ul.tabs,
		.botiga-tabs-style3 .woocommerce-tabs ul.tabs {
			border-bottom-color: ${ color } !important;
		}
	`,

	single_sticky_add_to_cart_style_color_border: ( color ) => `
		.botiga-single-sticky-add-to-cart-wrapper {
			border-color: ${ color } !important;
		}
	`,

	botiga_header_row__above_header_row_border_bottom_color: ( color ) => `
		.bhfb-above_header_row {
			border-bottom-color: ${ color } !important;
		}
	`,

	botiga_header_row__main_header_row_border_bottom_color: ( color ) => `
		.bhfb-main_header_row {
			border-bottom-color: ${ color } !important;
		}
	`,

	botiga_header_row__below_header_row_border_bottom_color: ( color ) => `
		.bhfb-below_header_row {
			border-bottom-color: ${ color } !important;
		}
	`,

	botiga_footer_row__above_footer_row_border_top_color: ( color ) => `
		.bhfb-above_footer_row {
			border-top-color: ${ color } !important;
		}
	`,

	botiga_footer_row__main_footer_row_border_top_color: ( color ) => `
		.bhfb-main_footer_row {
			border-top-color: ${ color } !important;
		}
	`,

	botiga_footer_row__below_footer_row_border_top_color: ( color ) => `
		.bhfb-below_footer_row {
			border-top-color: ${ color } !important;
		}
	`,

	ql_item_border_color: ( color ) => `
		.botiga-quick-links .quick-link,
		.botiga-quick-links.pos-left .quick-link,
		.botiga-quick-links.pos-right .quick-link {
			border-color: ${ color } !important;
		}
	`,

	botiga_accordion_item_arrow_border_color: ( color ) => `
		.botiga-accordion__item > a:after {
			border-color: ${ color } !important;
			border-bottom-color: transparent !important;
			border-left-color: transparent !important;
		}
	`,

	site_info_border_color: ( color ) => `
		.site-info {
			border-color: ${ color } !important;
		}
	`,

	single_product_gallery_styles_background_color: ( color ) => `
		.product-gallery-summary.gallery-showcase:before,
		.product-gallery-summary.gallery-full-width:before {
			background-color: ${ color } !important;
		}
	`,

	single_sticky_add_to_cart_style_color_background: ( color ) => `
		.botiga-single-sticky-add-to-cart-wrapper,
		.botiga-single-sticky-add-to-cart-wrapper input[type="number"],
		.botiga-single-sticky-add-to-cart-wrapper select {
			background-color: ${ color } !important;
		}
	`,

	botiga_footer_row__above_footer_row_background_color: ( color ) => `
		.bhfb-above_footer_row {
			background-color: ${ color } !important;
		}
	`,

	botiga_footer_row__main_footer_row_background_color: ( color ) => `
		.bhfb-main_footer_row {
			background-color: ${ color } !important;
		}
	`,

	botiga_footer_row__below_footer_row_background_color: ( color ) => `
		.bhfb-below_footer_row {
			background-color: ${ color } !important;
		}
	`,

	ql_background_color: ( color ) => `
		.botiga-quick-links.pos-bottom-full,
		.botiga-quick-links:not(.pos-bottom-full) .quick-links-inner {
			background-color: ${ color } !important;
		}
	`,

	botiga_tabs_nav_link_background: ( color ) => `
		.botiga-tabs-nav .botiga-tabs-nav-item .botiga-tabs-nav-link {
			background-color: ${ color } !important;
		}
	`,

	site_footer_background: ( color ) => `
		.site-footer {
			background-color: ${ color } !important;
		}
	`,

	footer_widgets_background: ( color ) => `
		.footer-widgets {
			background-color: ${ color } !important;
		}
	`,

	scrolltop_color: ( color ) => `
		.back-to-top {
			color: ${ color } !important;
		}

		.back-to-top svg {
			stroke: ${ color } !important;
		}
	`,

	scrolltop_color_hover: ( color ) => `
		.back-to-top:hover {
			color: ${ color } !important;
		}

		.back-to-top:hover svg {
			stroke: ${ color } !important;
		}
	`,

	single_product_reviews_advanced_section_bg_color: ( color ) => `
		.single-product .site-main > .product > section.products.botiga-adv-reviews:after,
		.botiga-reviews-orderby {
			background-color: ${ color } !important;
		}
	`,

	comments_comment_reply_link_color: ( color ) => `
		.comments-area .comment-reply-link {
			color: ${ color } !important;
		}
	`,

	comments_comment_reply_link_color_hover: ( color ) => `
		.comments-area .comment-reply-link:hover {
			color: ${ color } !important;
		}
	`,

	wp_block_search_button_color: ( color ) => `
		.wp-block-search .wp-block-search__button {
			color: ${ color } !important;
		}
	`,

	botiga_header_row__above_header_row_background_color: ( color ) => `
		.bhfb-above_header_row {
			background-color: ${ color } !important;
		}
	`,

	botiga_header_row__main_header_row_background_color: ( color ) => `
		.bhfb-main_header_row {
			background-color: ${ color } !important;
		}
	`,

	botiga_header_row__below_header_row_background_color: ( color ) => `
		.bhfb-below_header_row {
			background-color: ${ color } !important;
		}
	`,

	mobile_offcanvas_background_color: ( color ) => `
		.bhfb-mobile_offcanvas,
		.botiga-offcanvas-menu {
			background-color: ${ color } !important;
		}
	`,

	shop_archive_header_background_color: ( color ) => `
		.woocommerce-page-header {
			background-color: ${ color } !important;
		}
	`,

	custom_background: ( color ) => `
		.header-search-form form button,
		.custom-background {
			background-color: ${ color } !important;
		}
	`,

	button_background: ( color ) => `
		button:not(.has-background),
		a.button:not(.has-background),
		.wp-block-button .wp-block-button__link:not(.has-background),
		.wp-block-button__link:not(.has-background),
		.wp-block-search .wp-block-search__button:not(.has-background),
		input[type="button"]:not(.has-background),
		input[type="reset"]:not(.has-background),
		input[type="submit"]:not(.has-background),
		.comments-area .comment-reply-link:not(.has-background),
		.botiga-sc-product-quantity {
			background-color: ${ color } !important;
		}
		button,a.button,
		.wp-block-button .wp-block-button__link,
		.wp-block-button__link,
		input[type="button"],
		input[type="reset"],
		input[type="submit"] {
			border-color: ${ color } !important;
		}
	`,

	button_background_hover: ( color ) => `
		.is-style-outline .wp-block-button__link:not(.has-background):hover,
		button:not(.has-background):hover,
		a.button:not(.has-background):hover,
		.wp-block-button .wp-block-button__link:not(.has-background):hover,
		.wp-block-button__link:not(.has-background):hover,
		.wp-block-search .wp-block-search__button:not(.has-background):hover,
		input[type="button"]:not(.has-background):hover,
		input[type="reset"]:not(.has-background):hover,
		input[type="submit"]:not(.has-background):hover,
		.comments-area .comment-reply-link:not(.has-background):hover {
			background-color: ${ color } !important;
		}
		button:hover,
		a.button:hover,
		.wp-block-button .wp-block-button__link:hover,
		.wp-block-button__link:hover,
		input[type="button"]:hover,
		input[type="reset"]:hover,
		input[type="submit"]:hover {
			border-color: ${ color } !important;
		}
	`,

	button_text: ( color ) => `
		.wp-block-button.is-style-outline .wp-block-button__link:not(.has-text-color),
		button:not(.has-text-color),
		a.button:not(.wc-forward):not(.has-text-color),
		a.button.checkout:not(.has-text-color),
		.checkout-button.button:not(.has-text-color),
		.wp-block-button .wp-block-button__link:not(.has-text-color),
		.wp-block-button__link:not(.has-text-color),
		input[type="button"]:not(.has-text-color),
		input[type="reset"]:not(.has-text-color),
		input[type="submit"]:not(.has-text-color),
		.woocommerce-message .button.wc-forward:not(.has-text-color),
		.comments-area .comment-reply-link:not(.has-text-color),
		.wp-block-search .wp-block-search__button:not(.has-text-color),
		.botiga-sc-product-quantity {
			color: ${ color } !important;
		}
		.woocommerce-product-search .search-submit svg,
		#masthead-mobile .search-submit svg:not(.stroke-based),
		ul.wc-block-grid__products li.wc-block-grid__product .wp-block-button__link svg,
		ul.wc-block-grid__products li.product .wp-block-button__link svg,
		ul.products li.wc-block-grid__product .wp-block-button__link svg,
		ul.products li.product .button svg {
			fill: ${ color } !important;
		}
	`,

	button_text_hover: ( color ) => `
		.is-style-outline .wp-block-button__link:not(.has-text-color):hover,
		button:hover,
		a.button:not(.wc-forward):not(.has-text-color):hover,
		a.button.checkout:not(.has-text-color):hover,
		.checkout-button.button:not(.has-text-color):hover,
		.wp-block-button .wp-block-button__link:not(.has-text-color):hover,
		.wp-block-button__link:not(.has-text-color):hover,
		input[type="button"]:not(.has-text-color):hover,
		input[type="reset"]:not(.has-text-color):hover,
		input[type="submit"]:not(.has-text-color):hover,
		.woocommerce-message .button.wc-forward:not(.has-text-color):hover,
		.comments-area .comment-reply-link:not(.has-text-color):hover,
		.wp-block-search .wp-block-search__button:not(.has-text-color):hover {
			color: ${ color } !important;
		}
		.woocommerce-product-search .search-submit:hover svg,
		#masthead-mobile .search-submit:hover svg:not(.stroke-based),
		ul.wc-block-grid__products li.wc-block-grid__product .wp-block-button__link:hover svg,
		ul.wc-block-grid__products li.product .wp-block-button__link:hover svg,
		ul.products li.wc-block-grid__product .wp-block-button__link:hover svg,
		ul.products li.product .button:hover svg {
		    fill: ${ color } !important;
		}
	`
};

/**
 * Get Botiga palette slot colors from the existing variable-backed scheme colors.
 *
 * @param {Object} colors Scheme colors object.
 * @return {Object} Palette slot color map.
 */
export const getBotigaNonVariablePaletteMap = ( colors ) => {
	if ( ! colors || 'object' !== typeof colors ) {
		return {};
	}

	return {
		color1: colors[ '--bt-color-button-bg' ] || '',
		color2: colors[ '--bt-color-button-bg-hover' ] || '',
		color3: colors[ '--bt-color-post-title' ] || '',
		color5: colors[ '--bt-color-forms-borders' ] || '',
		color6: colors[ '--bt-color-content-cards-bg' ] || '',
		color7: colors[ '--bt-color-bg' ] || '',
		color8: colors[ '--bt-color-menu-bg' ] || colors[ '--bt-color-bg' ] || ''
	};
};

/**
 * Build Botiga non-variable-backed CSS from a colors object.
 *
 * @param {Object} colors Scheme colors object.
 * @return {string} Generated CSS string.
 */
export const buildBotigaNonVariableCss = ( colors ) => {
	const paletteMap = getBotigaNonVariablePaletteMap( colors );

	return Object.entries( botigaNonVariableBackedColorControlsByGroup )
		.flatMap( ( [ groupName, controls ] ) => {
			const color = paletteMap[ groupName ];

			if ( ! color ) {
				return [];
			}

			return controls.map( ( controlName ) => {
				const buildRule = botigaNonVariableBackedRuleMap[ controlName ];

				if ( ! buildRule ) {
					return '';
				}

				return buildRule( color );
			} );
		} )
		.filter( Boolean )
		.join( '\n' );
};

/**
 * Build Botiga scoped variable override CSS.
 *
 * This helps override theme-defined CSS variables that are set on more specific
 * selectors such as body, .single, and .blog.
 *
 * @param {Object} colors Scheme colors object.
 * @return {string} Generated CSS string.
 */
export const buildBotigaScopedVariableOverrideCss = ( colors ) => {
	if ( ! colors || 'object' !== typeof colors ) {
		return '';
	}

	const bodyVars = [
		'--bt-color-button-bg',
		'--bt-color-button-border',
		'--bt-color-link-default',
		'--bt-color-button-bg-hover',
		'--bt-color-button-border-hover',
		'--bt-color-link-hover',
		'--bt-color-forms-text',
		'--bt-color-heading-1',
		'--bt-color-heading-2',
		'--bt-color-heading-3',
		'--bt-color-heading-4',
		'--bt-color-heading-5',
		'--bt-color-heading-6',
		'--bt-color-body-text',
		'--bt-color-forms-placeholder',
		'--bt-color-post-meta',
		'--bt-color-loop-post-text',
		'--bt-color-forms-borders',
		'--bt-color-content-cards-bg',
		'--bt-color-menu-text',
		'--bt-color-menu-bg',
		'--bt-color-bg',
		'--bt-color-button',
		'--bt-color-button-hover',
		'--bt-color-forms-background'
	];

	const singleVars = [
		'--bt-color-post-title'
	];

	const blogVars = [
		'--bt-color-loop-post-meta',
		'--bt-color-loop-post-title'
	];

	const buildVarBlock = ( selector, vars ) => {
		const lines = vars
			.filter( ( property ) => colors[ property ] )
			.map(
				( property ) => `\t${ property }: ${ colors[ property ] } !important;`
			);

		if ( 0 === lines.length ) {
			return '';
		}

		return `${ selector } {\n${ lines.join( '\n' ) }\n}`;
	};

	return [
		buildVarBlock( 'body', bodyVars ),
		buildVarBlock( '.single', singleVars ),
		buildVarBlock( '.blog', blogVars )
	]
		.filter( Boolean )
		.join( '\n\n' );
};
