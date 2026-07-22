<?php
/**
 * Sublium subscription data importer.
 *
 * Demo-agnostic importer for Sublium WooCommerce Subscriptions data exported to
 * a JSON file. Recreates subscription plan groups, plans, and their product /
 * term relations on the current site. Safe to call from any demo: it no-ops
 * when WooCommerce or the Sublium plugin classes are not present.
 *
 * @package    Athemes Starter Sites
 * @subpackage Core
 * @since      1.4.1
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'ATSS_Sublium_Importer' ) ) {

	/**
	 * Sublium importer class.
	 */
	class ATSS_Sublium_Importer {

		/**
		 * Import Sublium subscription data.
		 *
		 * @since 1.4.1
		 * @param string $url             URL of the exported Sublium JSON file.
		 * @param string $indexer_context Context string passed to the Sublium
		 *                                ProductIndexer so each demo can schedule
		 *                                its own indexing batch.
		 *
		 * @return bool True when at least one plan was imported.
		 */
		public static function import( $url, $indexer_context = 'athemes-starter-sites:import' ) {
			$required_classes = array(
				'\Sublium_WCS\Includes\Database',
				'\Sublium_WCS\Includes\database\GroupPlans',
				'\Sublium_WCS\Includes\database\Plan',
				'\Sublium_WCS\Includes\database\PlanRelations',
			);

			if ( ! function_exists( 'wc_get_product_id_by_sku' ) ) {
				return false;
			}

			foreach ( $required_classes as $required_class ) {
				if ( ! class_exists( $required_class ) ) {
					return false;
				}
			}

			$remote_data = ATSS_Core_Helpers::atss_get_remote_file( $url );

			if ( false === $remote_data ) {
				return false;
			}

			$data = json_decode( $remote_data, true );

			if (
				JSON_ERROR_NONE !== json_last_error() ||
				! is_array( $data ) ||
				empty( $data['groups'] ) ||
				empty( $data['plans'] ) ||
				empty( $data['relations'] )
			) {
				return false;
			}

			\Sublium_WCS\Includes\Database::get_instance()->check_and_update_database();

			$group_database    = new \Sublium_WCS\Includes\database\GroupPlans();
			$plan_database     = new \Sublium_WCS\Includes\database\Plan();
			$relation_database = new \Sublium_WCS\Includes\database\PlanRelations();

			$group_id_map = array();
			$plan_id_map  = array();
			$product_ids  = array();

			foreach ( $data['groups'] as $group ) {
				$source_id = isset( $group['source_id'] ) ? absint( $group['source_id'] ) : 0;
				$title     = isset( $group['title'] ) ? sanitize_text_field( $group['title'] ) : '';

				if ( empty( $source_id ) || empty( $title ) ) {
					continue;
				}

				$group_data = array(
					'type'         => isset( $group['type'] ) ? absint( $group['type'] ) : 1,
					'title'        => $title,
					'product_type' => isset( $group['product_type'] ) ? absint( $group['product_type'] ) : 1,
					'data'         => isset( $group['data'] ) && is_array( $group['data'] ) ? $group['data'] : array(),
				);

				$existing_groups = $group_database->read(
					array(
						'type'         => $group_data['type'],
						'title'        => $group_data['title'],
						'product_type' => $group_data['product_type'],
					),
					1
				);

				if ( ! empty( $existing_groups[0]['id'] ) ) {
					$group_id = absint( $existing_groups[0]['id'] );
					$group_database->update( $group_id, $group_data );
				} else {
					$group_id = absint( $group_database->create( $group_data ) );
				}

				if ( ! empty( $group_id ) ) {
					$group_id_map[ $source_id ] = $group_id;
				}
			}

			foreach ( $data['plans'] as $plan ) {
				$source_id       = isset( $plan['source_id'] ) ? absint( $plan['source_id'] ) : 0;
				$source_group_id = isset( $plan['source_group_id'] ) ? absint( $plan['source_group_id'] ) : 0;
				$title           = isset( $plan['title'] ) ? sanitize_text_field( $plan['title'] ) : '';

				if (
					empty( $source_id ) ||
					empty( $title ) ||
					empty( $group_id_map[ $source_group_id ] )
				) {
					continue;
				}

				$plan_data = array(
					'plan_group_id'     => $group_id_map[ $source_group_id ],
					'title'             => $title,
					'type'              => isset( $plan['type'] ) ? absint( $plan['type'] ) : 1,
					'billing_frequency' => isset( $plan['billing_frequency'] ) ? absint( $plan['billing_frequency'] ) : 1,
					'billing_interval'  => isset( $plan['billing_interval'] ) ? absint( $plan['billing_interval'] ) : 1,
					'billing_length'    => isset( $plan['billing_length'] ) ? absint( $plan['billing_length'] ) : 0,
					'signup_fee'        => isset( $plan['signup_fee'] ) ? $plan['signup_fee'] : '',
					'offer'             => isset( $plan['offer'] ) ? $plan['offer'] : '',
					'prepaid'           => isset( $plan['prepaid'] ) ? absint( $plan['prepaid'] ) : 0,
					'free_gift'         => isset( $plan['free_gift'] ) ? $plan['free_gift'] : '',
					'free_trial'        => isset( $plan['free_trial'] ) ? absint( $plan['free_trial'] ) : 0,
					'data'              => isset( $plan['data'] ) && is_array( $plan['data'] ) ? $plan['data'] : array(),
					'status'            => isset( $plan['status'] ) ? absint( $plan['status'] ) : 1,
				);

				$existing_plans = $plan_database->read(
					array(
						'plan_group_id' => $plan_data['plan_group_id'],
						'title'         => $plan_data['title'],
					),
					1
				);

				if ( ! empty( $existing_plans[0]['id'] ) ) {
					$plan_id = absint( $existing_plans[0]['id'] );
					$plan_database->update( $plan_id, $plan_data );
				} else {
					$plan_id = absint( $plan_database->create( $plan_data ) );
				}

				if ( ! empty( $plan_id ) ) {
					$plan_id_map[ $source_id ] = $plan_id;
				}
			}

			foreach ( $data['relations'] as $relation ) {
				$source_plan_id = isset( $relation['source_plan_id'] ) ? absint( $relation['source_plan_id'] ) : 0;

				if ( empty( $plan_id_map[ $source_plan_id ] ) ) {
					continue;
				}

				$relation_type = isset( $relation['type'] ) ? absint( $relation['type'] ) : 1;
				$object_id     = 0;
				$variation_id  = 0;

				if ( 1 === $relation_type ) {
					$product_sku = isset( $relation['product_sku'] )
						? wc_clean( $relation['product_sku'] )
						: '';

					if ( empty( $product_sku ) ) {
						continue;
					}

					$object_id = wc_get_product_id_by_sku( $product_sku );

					if ( empty( $object_id ) ) {
						continue;
					}

					$variation_sku = isset( $relation['variation_sku'] )
						? wc_clean( $relation['variation_sku'] )
						: '';

					if ( ! empty( $variation_sku ) ) {
						$variation_id = wc_get_product_id_by_sku( $variation_sku );

						if ( ! empty( $variation_id ) ) {
							$variation = wc_get_product( $variation_id );

							if ( $variation && $variation->is_type( 'variation' ) ) {
								$object_id = $variation->get_parent_id();
							} else {
								$variation_id = 0;
							}
						}
					}

					$product_ids[] = $object_id;
				} elseif ( 2 === $relation_type ) {
					$taxonomy = isset( $relation['taxonomy'] )
						? sanitize_key( $relation['taxonomy'] )
						: '';
					$term_slug = isset( $relation['term_slug'] )
						? sanitize_title( $relation['term_slug'] )
						: '';

					if (
						empty( $taxonomy ) ||
						empty( $term_slug ) ||
						! taxonomy_exists( $taxonomy )
					) {
						continue;
					}

					$term = get_term_by( 'slug', $term_slug, $taxonomy );

					if ( empty( $term ) || is_wp_error( $term ) ) {
						continue;
					}

					$object_id = $term->term_id;
				} else {
					continue;
				}

				$relation_data = array(
					'plan_id' => $plan_id_map[ $source_plan_id ],
					'status'  => isset( $relation['status'] ) ? absint( $relation['status'] ) : 1,
					'oid'     => absint( $object_id ),
					'vid'     => absint( $variation_id ),
					'type'    => $relation_type,
					'data'    => isset( $relation['data'] ) && is_array( $relation['data'] ) ? $relation['data'] : array(),
				);

				$existing_relations = $relation_database->read(
					array(
						'plan_id' => $relation_data['plan_id'],
						'oid'     => $relation_data['oid'],
						'vid'     => $relation_data['vid'],
						'type'    => $relation_data['type'],
					),
					1
				);

				if ( ! empty( $existing_relations[0]['id'] ) ) {
					$relation_database->update(
						absint( $existing_relations[0]['id'] ),
						$relation_data
					);
				} else {
					$relation_database->create( $relation_data );
				}
			}

			$product_ids = array_values( array_unique( array_filter( array_map( 'absint', $product_ids ) ) ) );

			if (
				! empty( $product_ids ) &&
				class_exists( '\Sublium_WCS\Includes\Controller\ProductIndexer' )
			) {
				\Sublium_WCS\Includes\Controller\ProductIndexer::get_instance()->schedule_or_process(
					$indexer_context,
					array(
						'product_ids' => $product_ids,
					)
				);
			}

			if ( ! empty( $plan_id_map ) ) {
				update_option( 'sublium_wcs_setup_notice_dismissed', 1 );
			}

			return ! empty( $plan_id_map );
		}
	}
}
