/**
 * Footer component for the onboarding wizard.
 *
 * @package Athemes Starter Sites
 */

import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

/**
 * Footer component displaying navigation buttons.
 *
 * @param {Object}   props                   Component props.
 * @param {boolean}  props.showBack          Whether to show the Back button.
 * @param {boolean}  props.showSkip          Whether to show the Skip button.
 * @param {boolean}  props.showContinue      Whether to show the Continue button.
 * @param {string}   props.continueText      Text for the Continue button.
 * @param {Function} props.onBack            Callback when Back button is clicked.
 * @param {Function} props.onSkip            Callback when Skip button is clicked.
 * @param {Function} props.onContinue        Callback when Continue button is clicked.
 * @param {boolean}  props.continueDisabled  Whether the Continue button is disabled.
 * @param {boolean}  props.continueLoading   Whether the Continue button is in loading state.
 * @param {string}   props.continueError     Error message to display below the Continue button.
 * @return {JSX.Element} Footer component.
 */
function Footer( {
	showBack = true,
	showSkip = false,
	showContinue = true,
	continueText = __( 'Continue', 'athemes-starter-sites' ),
	onBack,
	onSkip,
	onContinue,
	continueDisabled = false,
	continueLoading = false,
	continueError = null,
} ) {
	// Determine if the Continue button should show an arrow icon.
	// Show arrow when Skip is visible or Back is hidden.
	const showContinueArrow = showSkip || !showBack;

	return (
		<footer className="atss-onboarding-wizard__footer">
			<div className="atss-onboarding-wizard__footer-left">
				{ showBack && (
					<button
						type="button"
						className="atss-onboarding-wizard__btn atss-onboarding-wizard__btn--back"
						onClick={ onBack }
					>
						<span className="atss-onboarding-wizard__btn-arrow" aria-hidden="true">
							<svg
								width="21"
								height="12"
								viewBox="0 0 21 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
								focusable="false"
							>
								<path d="M0.421875 4.92188L4.92188 0.421875C5.37891 0 6.08203 0 6.53906 0.421875C6.96094 0.878906 6.96094 1.58203 6.53906 2.03906L3.9375 4.60547H19.2305C19.8633 4.60547 20.3555 5.09766 20.3555 5.73047C20.3555 6.36328 19.8633 6.85547 19.2305 6.85547H3.9375L6.53906 9.42188C6.96094 9.87891 6.96094 10.582 6.53906 11.0391C6.08203 11.4609 5.37891 11.4609 4.92188 11.0391L0.421875 6.53906C0 6.08203 0 5.37891 0.421875 4.92188Z" fill="#A7AAAD"/>
							</svg>
						</span>
						<span className="atss-onboarding-wizard__btn-text">{ __( 'Back', 'athemes-starter-sites' ) }</span>
					</button>
				) }
			</div>

			<div className="atss-onboarding-wizard__footer-right flex">
				{ showSkip && (
					<button
						type="button"
						className={ `atss-onboarding-wizard__btn atss-onboarding-wizard__btn--skip${ continueLoading ? ' atss-onboarding-wizard__btn--loading' : '' }` }
						onClick={ onSkip }
						disabled={ continueLoading }
						aria-live="polite"
						aria-busy={ continueLoading }
					>
						{ continueLoading ? (
							<>
								<span style={ { opacity: 0 } }>{ __( 'Skip', 'athemes-starter-sites' ) }</span>
								<span className="atss-onboarding-wizard__btn-spinner">
									<Spinner />
								</span>
							</>
						) : (
							__( 'Skip', 'athemes-starter-sites' )
						) }
					</button>
				) }

				{ showContinue && (
					<div className="atss-onboarding-wizard__footer-continue-wrapper">
						<button
							type="button"
							className={ `atss-onboarding-wizard__btn atss-onboarding-wizard__btn--continue${ continueLoading ? ' atss-onboarding-wizard__btn--loading' : '' }` }
							onClick={ onContinue }
							disabled={ continueDisabled || continueLoading }
							aria-live="polite"
							aria-busy={ continueLoading }
						>
							{ continueLoading ? (
								<>
									<span style={ { opacity: 0 } }>{ continueError ? __( 'Retry', 'athemes-starter-sites' ) : continueText }</span>
									<span className="atss-onboarding-wizard__btn-spinner">
										<Spinner />
									</span>
								</>
							) : (
								<>
									{ continueError ? __( 'Retry', 'athemes-starter-sites' ) : continueText }
									{ showContinueArrow && ! continueError && (
										<span className="atss-onboarding-wizard__btn-arrow" aria-hidden="true">
											<svg
												width="16"
												height="11"
												viewBox="0 0 16 11"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
												aria-hidden="true"
												focusable="false"
											>
												<path d="M10.4062 0.140625C10.582 4.51798e-07 10.8281 4.30284e-07 11.0039 0.140625L15.6445 4.78125C15.7852 4.95703 15.7852 5.20312 15.6445 5.37891L11.0039 10.0195C10.8281 10.1602 10.582 10.1602 10.4062 10.0195L9.70312 9.31641C9.5625 9.14063 9.5625 8.89453 9.73828 8.71875L12.5508 6.01172L0.421874 6.01172C0.210937 6.01172 -1.00946e-06 5.80078 -1.0279e-06 5.58985L-1.11396e-06 4.60547C-1.13547e-06 4.35938 0.210936 4.1836 0.421874 4.1836L12.5508 4.18359L9.73828 1.44141C9.5625 1.26563 9.5625 1.01953 9.70312 0.843751L10.4062 0.140625Z" fill="white"/>
											</svg>
										</span>
									) }
								</>
							) }
						</button>
						{ continueError && (
							<p className="atss-onboarding-wizard__footer-error-message" role="alert" aria-live="assertive">
								{ __( 'Connection issue. Click Retry to continue.', 'athemes-starter-sites' ) }
							</p>
						) }
					</div>
				) }
			</div>
		</footer>
	);
}

Footer.propTypes = {
	showBack: PropTypes.bool,
	showSkip: PropTypes.bool,
	showContinue: PropTypes.bool,
	continueText: PropTypes.string,
	onBack: ( props, propName, componentName ) => {
		if ( props.showBack && ! props[ propName ] ) {
			return new Error(
				`${ propName } is required when showBack is true in ${ componentName }`
			);
		}
	},
	onSkip: ( props, propName, componentName ) => {
		if ( props.showSkip && ! props[ propName ] ) {
			return new Error(
				`${ propName } is required when showSkip is true in ${ componentName }`
			);
		}
	},
	onContinue: ( props, propName, componentName ) => {
		if ( props.showContinue && ! props[ propName ] ) {
			return new Error(
				`${ propName } is required when showContinue is true in ${ componentName }`
			);
		}
	},
	continueDisabled: PropTypes.bool,
	continueLoading: PropTypes.bool,
	continueError: PropTypes.string,
};

Footer.defaultProps = {
	showBack: true,
	showSkip: false,
	showContinue: true,
	continueText: __( 'Continue', 'athemes-starter-sites' ),
	continueDisabled: false,
	continueLoading: false,
	continueError: null,
};

export default Footer;
