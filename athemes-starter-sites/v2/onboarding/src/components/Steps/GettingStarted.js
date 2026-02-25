/**
 * Getting Started step component.
 *
 * @package Athemes Starter Sites
 */

import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import RadioCardControl from '../Controls/RadioCardControl';
import CustomSelectControlWithPlaceholder from '../Controls/CustomSelectControlWithPlaceholder';
import { Footer } from '../Layout';
import starterCategories from '../../data/starter-categories';
import { useWizard } from '../../context/WizardContext';

/**
 * Getting Started step component.
 *
 * @param {Object}   props                  Component props.
 * @param {Function} props.onContinue       Callback to proceed to next step.
 * @param {boolean}  props.navigationLoading Whether navigation is in loading state.
 * @param {string}   props.navigationError   Navigation error message.
 * @return {JSX.Element} GettingStarted component.
 */
function GettingStarted( { onContinue, navigationLoading, navigationError } ) {
	const { wizardData, siteTitle, setSiteTitle, builder, setBuilder } = useWizard();
	const savedData = wizardData[ 'getting-started' ] || {};

	const [ dropdownValue, setDropdownValue ] = useState( savedData.siteCategory || null );
	const [ selectedBuilder, setSelectedBuilder ] = useState( builder || 'gutenberg' );

	const wordpressIcon = require( '../../assets/images/wordpress.svg' ).default;
	const elementorIcon = require( '../../assets/images/elementor.svg' ).default;

	// Check if current theme is Botiga.
	const themeName = typeof atssOnboarding !== 'undefined' ? atssOnboarding?.themeName : '';
	const isBotiga = themeName?.toLowerCase().includes( 'botiga' );

	/**
	 * Handle continue button click.
	 */
	const handleContinue = () => {
		// Update context builder before continuing
		setBuilder( selectedBuilder );

		onContinue( {
			siteCategory: dropdownValue,
			builder: selectedBuilder,
		} );
	};

	return (
		<div className="atss-onboarding-wizard__step atss-onboarding-wizard__step--getting-started">
			<main className="atss-onboarding-wizard__step-body">
				<div className="atss-onboarding-wizard__step-body-content">
					<div className="atss-onboarding-wizard__emoji-circle">
						<img
							src={ require( '../../assets/images/waving.jpg' ) }
							alt="Waving hand"
							width="74"
							height="74"
							className="atss-onboarding-wizard__emoji"
						/>
					</div>
					<h2 className="atss-onboarding-wizard__step-body-title text-xl font-medium">{ __( 'Let’s build your website!', 'athemes-starter-sites' ) }</h2>
					<p className="atss-onboarding-wizard__step-body-description text-sm text-secondary">{ __( 'Tell us a bit about your site so we can recommend the perfect templates and tools to get you started', 'athemes-starter-sites' ) }</p>
				
					<div className="atss-onboarding-wizard__step-body-form atss-options-form flex flex-col gap-xxl">
						<div className="atss-form-row flex gap-xxl">
							<div className="atss-form-field">
								<TextControl
									label={ __( 'Site Name', 'athemes-starter-sites' ) }
									value={ siteTitle }
									placeholder={ __( 'Name of your website', 'athemes-starter-sites' ) }
									onChange={ ( value ) => setSiteTitle( value ) }
									__next40pxDefaultSize={ true }
									__nextHasNoMarginBottom={ true }
								/>
							</div>
							{ ! isBotiga && (
								<div className="atss-form-field">
									<CustomSelectControlWithPlaceholder
										label={ __( 'Industry', 'athemes-starter-sites' ) }
										placeholder={ __( 'Select an industry ...', 'athemes-starter-sites' ) }
										options={ starterCategories }
										value={ dropdownValue }
										onChange={ ( { selectedItem } ) => setDropdownValue( selectedItem ) }
										__next40pxDefaultSize={ true }
									/>
								</div>
							) }
						</div>
						
						<div className="atss-form-field">
						<RadioCardControl
							label={ __( 'Preferred builder', 'athemes-starter-sites' ) }
							options={ [
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
							] }
							selected={ selectedBuilder }
							onChange={ ( value ) => setSelectedBuilder( value ) }
							default={ 'gutenberg' }
						/>
						</div>
					</div>
				</div>
			</main>

			<Footer
				showBack={ false }
				showSkip={ false }
				continueText={ __( 'Save and Continue', 'athemes-starter-sites' ) }
				onContinue={ handleContinue }
				continueDisabled={ ! siteTitle.trim() }
				continueLoading={ navigationLoading }
				continueError={ navigationError }
			/>
		</div>
	);
}

export default GettingStarted;
