/**
 * Optin step component.
 *
 * @package Athemes Starter Sites
 */

import { useState, useMemo, createInterpolateElement } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { TextControl } from '@wordpress/components';
import { useWizard } from '../../context/WizardContext';
import { Footer } from '../Layout';
import { validateEmail } from '../../utils/helpers';
import optinImageDefault from '../../assets/images/optin.jpg';
import optinImageSydney from '../../assets/images/optin-sydney.jpg';
import optinImageBotiga from '../../assets/images/optin-botiga.jpg';
import handsIcon from '../../assets/images/hands.png';
import heartGif from '../../assets/images/heart.gif';

/**
 * Optin step component.
 *
 * @param {Object}   props            Component props.
 * @param {Function} props.onBack     Callback to go to previous step.
 * @param {Function} props.onContinue Callback to proceed to next step.
 * @return {JSX.Element} Optin component.
 */
function Optin( { onBack, onContinue } ) {
	const { wizardData } = useWizard();
	const savedData = wizardData.optin || {};

	const [ email, setEmail ] = useState( savedData.email || window.atssOnboarding?.adminEmail || '' );
	const [ emailTouched, setEmailTouched ] = useState( false );
	const [ emailError, setEmailError ] = useState( '' );
	const [ optinChecked, setOptinChecked ] = useState( savedData.optinChecked !== undefined ? savedData.optinChecked : true );

	/**
	 * Determine which optin image to use based on theme name.
	 */
	const optinImage = useMemo( () => {
		const themeName = window.atssOnboarding?.themeName || 'sydney';
		const normalizedThemeName = themeName.toLowerCase();

		if ( normalizedThemeName.includes( 'botiga' ) ) {
			return optinImageBotiga;
		} else if ( normalizedThemeName.includes( 'sydney' ) ) {
			return optinImageSydney;
		}

		return optinImageDefault;
	}, [] );

	/**
	 * Handle email field blur event.
	 */
	const handleEmailBlur = () => {
		setEmailTouched( true );
		if ( email && ! validateEmail( email ) ) {
			setEmailError( __( 'Please enter a valid email address', 'athemes-starter-sites' ) );
		} else {
			setEmailError( '' );
		}
	};

	/**
	 * Handle email field change event.
	 */
	const handleEmailChange = ( value ) => {
		setEmail( value );
		// Clear error if email becomes valid
		if ( emailTouched && emailError && validateEmail( value ) ) {
			setEmailError( '' );
		}
	};

	/**
	 * Handle opt-in checkbox toggle.
	 */
	const handleOptinToggle = () => {
		setOptinChecked( ! optinChecked );
	};

	/**
	 * Handle continue button click.
	 */
	const handleContinue = () => {
		onContinue( {
			email,
			optinChecked,
		} );
	};

	/**
	 * Handle skip button click.
	 */
	const handleSkip = () => {
		onContinue( {
			email: '',
			optinChecked: false,
		} );
	};

	return (
		<div className="atss-onboarding-wizard__step atss-onboarding-wizard__step--optin">
			<main className="atss-onboarding-wizard__step-body">
				<div className="atss-onboarding-wizard__step-body-content w100">
					<img src={ optinImage } alt={ __( 'Optin', 'athemes-starter-sites' ) } width="1200" height="536" />

					<div className="atss-onboarding-wizard__step-body-content-inner">
						<h2 className="atss-onboarding-wizard__step-body-title text-xl font-medium">
							{ __( 'Stay Updated with Latest Features & Releases', 'athemes-starter-sites' ) }
						</h2>
						<p className="atss-onboarding-wizard__step-body-description text-sm text-secondary">
							{ __( 'Subscribe to our newsletter to get notified about new updates, features, and releases', 'athemes-starter-sites' ) }
						</p>

						<div className={ `atss-form-field w100${ emailError ? ' atss-form-field--has-error' : '' }` }>
							<TextControl
								label={ __( 'Email', 'athemes-starter-sites' ) }
								value={ email }
								onChange={ handleEmailChange }
								onBlur={ handleEmailBlur }
								type="email"
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

						<p className="text-xs text-tertiary text-align-left">
							{ __( 'Your email is needed so you can receive community exclusive recommendations.', 'athemes-starter-sites' ) }
						</p>

						<div className="atss-optin-box">
							<div className="atss-optin-box__icon">
								<img src={ handsIcon } alt="" />
								{ ! optinChecked && (
									<img src={ heartGif } alt="" className="atss-optin-box__icon-overlay" />
								) }
							</div>

							<div className="atss-optin-box__text">
								<h3 className="atss-optin-box__title">
									{ __( 'Help make Sydney better for all!', 'athemes-starter-sites' ) }
								</h3>
								<p className="atss-optin-box__description">
									{ createInterpolateElement(
									__( 'By enabling you agree to our <a>Terms of Service</a> and to share your non-sensitive information with aThemes.', 'athemes-starter-sites' ),
									{
										a: <a href="https://athemes.com/terms/" target="_blank" rel="noopener noreferrer" />
									}
								) }
								</p>
							</div>

							<button
								type="button"
								className={ `atss-optin-box__checkbox ${ optinChecked ? 'atss-optin-box__checkbox--checked' : '' }` }
								onClick={ handleOptinToggle }
								aria-checked={ optinChecked }
								aria-label={ optinChecked ? __( 'Disable usage tracking', 'athemes-starter-sites' ) : __( 'Enable usage tracking', 'athemes-starter-sites' ) }
							>
								{ optinChecked && (
									<svg
										width="12"
										height="10"
										viewBox="0 0 12 10"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="atss-optin-box__checkmark"
									>
										<path
											d="M1 5L4.5 8.5L11 1"
											stroke="white"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								) }
							</button>
						</div>
					</div>
				</div>
			</main>

			<Footer
				showBack={ true }
				showSkip={ true }
				continueText={ __( 'Start Import', 'athemes-starter-sites' ) }
				onBack={ onBack }
				onSkip={ handleSkip }
				onContinue={ handleContinue }
			/>
		</div>
	);
}

export default Optin;
