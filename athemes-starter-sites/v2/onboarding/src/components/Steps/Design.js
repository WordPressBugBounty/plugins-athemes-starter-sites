/**
 * Design step component.
 *
 * @package Athemes Starter Sites
 */

import { useState, useMemo, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { Footer } from '../Layout';
import Card from '../Layout/Card';
import { getStarterSites } from '../../data/starter-sites';
import SearchStartersControl from '../Controls/SearchStartersControl';
import FilterStartersControl from '../Controls/FilterStartersControl';
import starterCategories from '../../data/starter-categories';
import { useWizard } from '../../context/WizardContext';

/**
 * Design step component.
 *
 * @param {Object}   props            Component props.
 * @param {Function} props.onBack     Callback to go to previous step.
 * @param {Function} props.onContinue Callback to proceed to next step.
 * @return {JSX.Element} Design component.
 */
function Design( { onBack, onContinue, onSkip, navigationLoading, navigationError } ) {
	const { wizardData, setPrefetchedPages, updateStepData, builder, setBuilder } = useWizard();
	const starterSites = getStarterSites();

	// Get the initial builder from context
	const initialBuilder = builder || 'gutenberg';

	// Build type options for the filter control
	const typeOptions = [
		{ key: 'all', name: __( 'All', 'athemes-starter-sites' ) },
		{ key: 'free', name: __( 'Free', 'athemes-starter-sites' ) },
		{ key: 'pro', name: __( 'Pro', 'athemes-starter-sites' ) },
	];

	// Build category options for the filter control
	// Filter out 'other' as it's only for the initial selection in GettingStarted
	const categoryOptions = [
		{ key: 'all', name: __( 'All Categories', 'athemes-starter-sites' ) },
		...starterCategories.filter( ( cat ) => cat.key !== 'other' ),
	];

	// Initialize category from GettingStarted step if available
	const getInitialCategory = () => {
		const gettingStartedData = wizardData[ 'getting-started' ] || {};
		const savedCategory = gettingStartedData.siteCategory;
		if ( savedCategory && savedCategory.key ) {
			// If "Other" is selected, default to "All Categories"
			if ( savedCategory.key === 'other' ) {
				return categoryOptions[ 0 ];
			}
			// Find matching category in categoryOptions
			const matchingCategory = categoryOptions.find( ( cat ) => cat.key === savedCategory.key );
			return matchingCategory || categoryOptions[ 0 ];
		}
		return categoryOptions[ 0 ]; // Default to "All Categories"
	};

	// Local selection state — card click sets this, Continue saves it
	const [ selectedCardId, setSelectedCardId ] = useState(
		wizardData?.design?.selectedSiteId || null
	);

	// State for search and builder filter
	const [ searchQuery, setSearchQuery ] = useState( '' );
	const [ selectedBuilder, setSelectedBuilder ] = useState( builder || 'gutenberg' );

	// State for type and category filters
	const [ selectedType, setSelectedType ] = useState( typeOptions[ 0 ] );
	const [ selectedCategory, setSelectedCategory ] = useState( getInitialCategory() );

	// Sync selectedBuilder with context builder
	useEffect( () => {
		setSelectedBuilder( builder || 'gutenberg' );
	}, [ builder ] );

	// Load builder icons
	const wordpressIcon = require( '../../assets/images/wordpress.svg' ).default;
	const elementorIcon = require( '../../assets/images/elementor.svg' ).default;

	// Builder options for the search control
	const builderOptions = [
		{
			value: 'gutenberg',
			label: __( 'Block Editor', 'athemes-starter-sites' ),
			icon: <img src={ wordpressIcon } alt="" />,
		},
		{
			value: 'elementor',
			label: __( 'Elementor', 'athemes-starter-sites' ),
			icon: <img src={ elementorIcon } alt="" />,
		},
	];

	// Filter starter sites based on all filters
	const filteredSites = useMemo( () => {
		return starterSites.filter( ( site ) => {
			// Filter by builder
			const matchesBuilder = site.builders?.includes( selectedBuilder );

			// Filter by type (free/pro)
			const matchesType = selectedType.key === 'all' || site.type === selectedType.key;

			// Filter by category
			const matchesCategory = selectedCategory.key === 'all' ||
				site.categories?.includes( selectedCategory.key );

			// Filter by search query (name and categories)
			const matchesSearch = ! searchQuery ||
				site.name?.toLowerCase().includes( searchQuery.toLowerCase() ) ||
				site.categories?.some( ( cat ) => cat.toLowerCase().includes( searchQuery.toLowerCase() ) );
			return matchesBuilder && matchesType && matchesCategory && matchesSearch;
		} );
	}, [ starterSites, selectedBuilder, selectedType, selectedCategory, searchQuery ] );

	const handleContinue = () => {
		onContinue( {
			selectedSiteId: selectedCardId,
		} );
	};

	return (
		<div className="atss-onboarding-wizard__step atss-onboarding-wizard__step--design">
			<main className="atss-onboarding-wizard__step-body">
				<div className="atss-onboarding-wizard__step-body-content w100">
					<h2 className="atss-onboarding-wizard__step-body-title text-xl font-medium">
						{ __( 'Select a Template to Start With', 'athemes-starter-sites' ) }
					</h2>
					<p className="atss-onboarding-wizard__step-body-description w100 text-sm text-secondary">
						{ __( 'Choose a template that matches your style. You can customize everything later to make it uniquely yours.', 'athemes-starter-sites' ) }
					</p>

					{ /* Search and Filter Control */ }
					<SearchStartersControl
						searchValue={ searchQuery }
						onSearchChange={ setSearchQuery }
						selectedBuilder={ selectedBuilder }
						onBuilderChange={ ( value ) => {
							setSelectedBuilder( value );
							setBuilder( value );
						} }
						builders={ builderOptions }
					/>

					{ /* Type and Category Filter Control */ }
					<FilterStartersControl
						selectedType={ selectedType }
						onTypeChange={ ( { selectedItem } ) => setSelectedType( selectedItem ) }
						selectedCategory={ selectedCategory }
						onCategoryChange={ ( { selectedItem } ) => setSelectedCategory( selectedItem ) }
						resultsCount={ filteredSites.length }
						typeOptions={ typeOptions }
						categoryOptions={ categoryOptions }
					/>

					{ /* Filtered demos grid */ }
					{ filteredSites.length > 0 ? (
						<div className="atss-design-demos-grid">
							{ filteredSites.map( ( site ) => (
								<Card
									key={ site.id }
									id={ site.id }
									name={ site.name }
									thumbnail={ site.thumbnail }
									preview={ site.preview }
									type={ site.type }
									isSelected={ selectedCardId === site.id }
									onSelect={ ( siteId ) => {
										if ( siteId === selectedCardId ) {
											setSelectedCardId( null );
											onContinue( {
												selectedSiteId: siteId,
											} );
											return;
										}
										setPrefetchedPages( null );
										updateStepData( 'pages', { selectedPages: [] } );
										const hasBuilderChanged = selectedBuilder !== initialBuilder;
										if ( hasBuilderChanged ) {
											updateStepData( 'features', {} );
										}
										setSelectedCardId( siteId );
										onContinue( {
											selectedSiteId: siteId,
										} );
									} }
								/>
							) ) }
						</div>
					) : (
						<div className="text-center text-secondary" style={ { marginTop: '24px' } }>
							<p>{ __( 'No templates found.', 'athemes-starter-sites' ) }</p>
							<p>{ __( 'Try adjusting your search or filter criteria.', 'athemes-starter-sites' ) }</p>
						</div>
					) }
				</div>
			</main>

			<Footer
				showBack={ true }
				showSkip={ true }
				showContinue={ false }
				continueText={ __( 'Continue', 'athemes-starter-sites' ) }
				onBack={ onBack }
				onSkip={ onSkip }
				onContinue={ handleContinue }
				continueDisabled={ ! selectedCardId }
				continueLoading={ navigationLoading }
				continueError={ navigationError }
			/>
		</div>
	);
}

export default Design;
