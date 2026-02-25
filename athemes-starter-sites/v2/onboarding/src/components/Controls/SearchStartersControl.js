/**
 * Search Starters Control component for filtering starter sites.
 *
 * @package Athemes Starter Sites
 */

import { useState, useRef, useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { chevronDown, closeSmall } from '@wordpress/icons';

/**
 * Search Starters Control component.
 *
 * @param {Object}   props                Component props.
 * @param {string}   props.searchValue    Current search value.
 * @param {Function} props.onSearchChange Callback when search changes.
 * @param {string}   props.selectedBuilder Currently selected builder.
 * @param {Function} props.onBuilderChange Callback when builder changes.
 * @param {Array}    props.builders       Array of builder options with value, label, and icon.
 * @return {JSX.Element} Search Starters Control component.
 */
function SearchStartersControl( {
	searchValue,
	onSearchChange,
	selectedBuilder,
	onBuilderChange,
	builders = [],
} ) {
	const [ isDropdownOpen, setIsDropdownOpen ] = useState( false );
	const dropdownRef = useRef( null );

	// Get the currently selected builder object
	const currentBuilder = useMemo(
		() => builders.find( ( b ) => b.value === selectedBuilder ) || builders[ 0 ],
		[ builders, selectedBuilder ]
	);

	/**
	 * Close dropdown when clicking outside.
	 */
	useEffect( () => {
		const handleClickOutside = ( event ) => {
			if ( dropdownRef.current && ! dropdownRef.current.contains( event.target ) ) {
				setIsDropdownOpen( false );
			}
		};

		if ( isDropdownOpen ) {
			document.addEventListener( 'mousedown', handleClickOutside );
		}

		return () => {
			document.removeEventListener( 'mousedown', handleClickOutside );
		};
	}, [ isDropdownOpen ] );

	/**
	 * Handle builder selection.
	 *
	 * @param {string} builderValue The selected builder value.
	 */
	const handleBuilderSelect = ( builderValue ) => {
		onBuilderChange( builderValue );
		setIsDropdownOpen( false );
	};

	/**
	 * Handle keyboard navigation in dropdown.
	 *
	 * @param {Object} event The keyboard event.
	 */
	const handleKeyDown = ( event ) => {
		if ( event.key === 'Escape' ) {
			setIsDropdownOpen( false );
		} else if ( event.key === 'Enter' || event.key === ' ' ) {
			event.preventDefault();
			setIsDropdownOpen( ! isDropdownOpen );
		}
	};

	/**
	 * Handle clearing the search input.
	 */
	const handleClearSearch = () => {
		onSearchChange( '' );
	};

	return (
		<div className="atss-search-starters-control">
			{/* Search Section */}
			<div className="atss-search-starters-control__search">
				{ ! searchValue ? (
					<svg 
						width="17" 
						height="17" 
						viewBox="0 0 17 17" 
						fill="none" 
						xmlns="http://www.w3.org/2000/svg"
						className="atss-search-starters-control__search-icon"
						aria-hidden="true"
					>
						<path d="M13 6.5C13 7.9375 12.5312 9.28125 11.75 10.3438L15.6875 14.3125C16.0938 14.6875 16.0938 15.3438 15.6875 15.7188C15.3125 16.125 14.6562 16.125 14.2812 15.7188L10.3125 11.75C9.25 12.5625 7.90625 13 6.5 13C2.90625 13 0 10.0938 0 6.5C0 2.9375 2.90625 0 6.5 0C10.0625 0 13 2.9375 13 6.5ZM6.5 11C8.09375 11 9.5625 10.1562 10.375 8.75C11.1875 7.375 11.1875 5.65625 10.375 4.25C9.5625 2.875 8.09375 2 6.5 2C4.875 2 3.40625 2.875 2.59375 4.25C1.78125 5.65625 1.78125 7.375 2.59375 8.75C3.40625 10.1562 4.875 11 6.5 11Z" fill="#A7AAAD"/>
					</svg>
				) : (
					<button
						type="button"
						className="atss-search-starters-control__clear-button"
						onClick={ handleClearSearch }
						aria-label={ __( 'Clear search', 'athemes-starter-sites' ) }
					>
						<Icon icon={ closeSmall } />
					</button>
				) }
				<input
					type="text"
					className="atss-search-starters-control__search-input"
					placeholder={ __( 'Search for starter template', 'athemes-starter-sites' ) }
					value={ searchValue }
					onChange={ ( e ) => onSearchChange( e.target.value ) }
					aria-label={ __( 'Search for starter template', 'athemes-starter-sites' ) }
				/>
			</div>

			{/* Builder Selector Section */}
			<div className="atss-search-starters-control__builder" ref={ dropdownRef }>
				<button
					type="button"
					className="atss-search-starters-control__builder-button"
					onClick={ () => setIsDropdownOpen( ! isDropdownOpen ) }
					onKeyDown={ handleKeyDown }
					aria-haspopup="listbox"
					aria-expanded={ isDropdownOpen }
					aria-label={ __( 'Select page builder', 'athemes-starter-sites' ) }
				>
					<div className="atss-search-starters-control__builder-current">
						{ currentBuilder?.icon && (
							<span className="atss-search-starters-control__builder-icon">
								{ currentBuilder.icon }
							</span>
						) }
						<span className="atss-search-starters-control__builder-label">
							{ currentBuilder?.label || __( 'Select Builder', 'athemes-starter-sites' ) }
						</span>
					</div>
					<Icon 
						icon={ chevronDown } 
						className={ `atss-search-starters-control__builder-dropdown-icon ${ isDropdownOpen ? 'is-open' : '' }` }
					/>
				</button>

				{/* Dropdown Menu */}
				{ isDropdownOpen && (
					<div 
						className="atss-search-starters-control__builder-dropdown"
						data-dialog
						role="listbox"
						aria-label={ __( 'Page builder options', 'athemes-starter-sites' ) }
					>
						{ builders.map( ( builder ) => {
							const isSelected = builder.value === selectedBuilder;
							return (
								<button
									key={ builder.value }
									type="button"
									className={ `atss-search-starters-control__builder-option ${ isSelected ? 'is-selected' : '' }` }
									onClick={ () => handleBuilderSelect( builder.value ) }
									role="option"
									aria-selected={ isSelected }
									{ ...( isSelected && { 'data-active-item': true } ) }
								>
									{ builder.icon && (
										<span className="atss-search-starters-control__builder-option-icon">
											{ builder.icon }
										</span>
									) }
									<span className="atss-search-starters-control__builder-option-label">
										{ builder.label }
									</span>
								</button>
							);
						} ) }
					</div>
				) }
			</div>
		</div>
	);
}

export default SearchStartersControl;

