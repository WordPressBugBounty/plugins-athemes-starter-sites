/**
 * Filter Starters Control component for filtering starter sites by type and category.
 *
 * @package Athemes Starter Sites
 */

import { CustomSelectControl } from '@wordpress/components';
import { __, sprintf, _n } from '@wordpress/i18n';

/**
 * Filter Starters Control component.
 *
 * @param {Object}   props                Component props.
 * @param {Object}   props.selectedType   Currently selected type object with key and name.
 * @param {Function} props.onTypeChange   Callback when type changes.
 * @param {Object}   props.selectedCategory Currently selected category object with key and name.
 * @param {Function} props.onCategoryChange Callback when category changes.
 * @param {number}   props.resultsCount   Number of results to display.
 * @param {Array}    props.typeOptions    Array of type options with key and name.
 * @param {Array}    props.categoryOptions Array of category options with key and name.
 * @return {JSX.Element} Filter Starters Control component.
 */
function FilterStartersControl( {
	selectedType,
	onTypeChange,
	selectedCategory,
	onCategoryChange,
	resultsCount,
	typeOptions,
	categoryOptions,
} ) {
	/**
	 * Get the results count text.
	 *
	 * @return {string} The formatted results count text.
	 */
	const getResultsText = () => {
		if ( resultsCount === 0 ) {
			return __( 'No results', 'athemes-starter-sites' );
		}
		
		return sprintf(
			// translators: %d is the number of results
			_n( '%d result', '%d results', resultsCount, 'athemes-starter-sites' ),
			resultsCount
		);
	};

	return (
		<div className="atss-filter-starters-control">
			<div className="atss-filter-starters-control__filters atss-form-field">
				<CustomSelectControl
					label={ __( 'Type:', 'athemes-starter-sites' ) }
					options={ typeOptions }
					value={ selectedType }
					onChange={ onTypeChange }
					__next40pxDefaultSize={ true }
				/>
				<CustomSelectControl
					label={ __( 'Category:', 'athemes-starter-sites' ) }
					options={ categoryOptions }
					value={ selectedCategory }
					onChange={ onCategoryChange }
					__next40pxDefaultSize={ true }
				/>
			</div>
			<div className="atss-filter-starters-control__results text-sm text-secondary">
				{ getResultsText() }
			</div>
		</div>
	);
}

export default FilterStartersControl;

