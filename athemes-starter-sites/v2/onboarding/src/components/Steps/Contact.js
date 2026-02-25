/**
 * Contact step component.
 *
 * @package Athemes Starter Sites
 */

import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import { Footer } from '../Layout';
import { useWizard } from '../../context/WizardContext';
import { validateEmail } from '../../utils/helpers';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import SocialControl from '../Controls/SocialControl';

/**
 * Contact step component.
 *
 * @param {Object}   props                  Component props.
 * @param {Function} props.onBack           Callback to go to previous step.
 * @param {Function} props.onSkip           Callback to skip this step.
 * @param {Function} props.onContinue       Callback to proceed to next step.
 * @param {boolean}  props.navigationLoading Whether navigation is in loading state.
 * @param {string}   props.navigationError   Navigation error message.
 * @return {JSX.Element} Contact component.
 */
function Contact( { onBack, onSkip, onContinue, navigationLoading, navigationError } ) {
	const { wizardData, siteTitle } = useWizard();
	const savedData = wizardData.contact || {};

	// Get site name from the wizard context (stored as siteTitle)
	const siteName = siteTitle || __( 'your site', 'athemes-starter-sites' );

	const [ businessEmail, setBusinessEmail ] = useState( savedData.businessEmail || '' );
	const [ phoneNumber, setPhoneNumber ] = useState( savedData.phoneNumber || '' );
	const [ address, setAddress ] = useState( savedData.address || '' );
	const [ socialLinks, setSocialLinks ] = useState( savedData.socialLinks || [] );
	const [ emailTouched, setEmailTouched ] = useState( false );
	const [ emailError, setEmailError ] = useState( '' );

	/**
	 * Handle email field blur event.
	 */
	const handleEmailBlur = () => {
		setEmailTouched( true );
		if ( businessEmail && ! validateEmail( businessEmail ) ) {
			setEmailError( __( 'Please enter a valid email address', 'athemes-starter-sites' ) );
		} else {
			setEmailError( '' );
		}
	};

	/**
	 * Handle email field change event.
	 */
	const handleEmailChange = ( value ) => {
		setBusinessEmail( value );
		// Clear error if email becomes valid
		if ( emailTouched && emailError && validateEmail( value ) ) {
			setEmailError( '' );
		}
	};

	/**
	 * Handle continue button click.
	 */
	const handleContinue = () => {
		onContinue( {
			businessEmail,
			phoneNumber,
			address,
			socialLinks,
		} );
	};

	return (
		<div className="atss-onboarding-wizard__step atss-onboarding-wizard__step--contact">
			<main className="atss-onboarding-wizard__step-body">
				<div className="atss-onboarding-wizard__step-body-content">
					<h2 className="atss-onboarding-wizard__step-body-title text-xl font-medium">
						{ __( 'How do people get in touch with ', 'athemes-starter-sites' ) }{ siteName }?
					</h2>
					<p className="atss-onboarding-wizard__step-body-description text-sm text-secondary">
						{ __( 'Please provide the contact information below. This will be used on the website.', 'athemes-starter-sites' ) }
					</p>

					<div className="atss-onboarding-wizard__step-body-form atss-options-form flex flex-col gap-xxl">
						<div className="atss-form-row flex gap-xxl">
							<div className={ `atss-form-field atss-form-field--email${ emailError ? ' atss-form-field--has-error' : '' }` }>
								<TextControl
									label={ __( 'Business email', 'athemes-starter-sites' ) }
									value={ businessEmail }
									onChange={ handleEmailChange }
									onBlur={ handleEmailBlur }
									type="email"
									placeholder={ __( 'e.g. office@example.com', 'athemes-starter-sites' ) }
									pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
									required={ true }
									__next40pxDefaultSize={ true }
									__nextHasNoMarginBottom={ true }
								/>
								{ emailError && (
									<span className="atss-form-field__error">
										{ emailError }
									</span>
								) }
							</div>
							<div className="atss-form-field">
								<label className="components-base-control__label">
									{ __( 'Phone number', 'athemes-starter-sites' ) }
								</label>
								<PhoneInput
									defaultCountry="us"
									value={ phoneNumber }
									onChange={ ( phone ) => setPhoneNumber( phone ) }
								/>
							</div>
						</div>

						<div className="atss-form-field">
							<TextControl
								label={ __( 'Address', 'athemes-starter-sites' ) }
								value={ address }
								onChange={ ( value ) => setAddress( value ) }
								placeholder={ __( 'e.g. 123 Main St, Anytown, USA', 'athemes-starter-sites' ) }
								__next40pxDefaultSize={ true }
								__nextHasNoMarginBottom={ true }
							/>
						</div>

						<div className="atss-form-field">
							<SocialControl
								label={ __( 'Social media links', 'athemes-starter-sites' ) }
								value={ socialLinks }
								onChange={ setSocialLinks }
							/>
						</div>
					</div>
				</div>
			</main>

			<Footer
				showBack={ true }
				showSkip={ true }
				continueText={ __( 'Continue', 'athemes-starter-sites' ) }
				onBack={ onBack }
				onSkip={ onSkip }
				onContinue={ handleContinue }
				continueLoading={ navigationLoading }
				continueError={ navigationError }
			/>
		</div>
	);
}

export default Contact;
