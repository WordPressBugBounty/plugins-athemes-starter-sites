/**
 * Complete component.
 * Displays the success screen after import is complete with a preview iframe.
 *
 * @package Athemes Starter Sites
 */

import { __ } from '@wordpress/i18n';
import { useState, useRef } from '@wordpress/element';
import successIcon from '../../assets/images/success.svg';
import successIconBotiga from '../../assets/images/success-botiga.svg';
import linkIcon from '../../assets/images/link.svg';
import { Spinner, FooterButton } from './index';
import { FACEBOOK_GROUP_URL, DOCUMENTATION_URL } from '../../utils/config';
import isBotiga from '../../utils/is-botiga';

function ArrowIcon() {
	return (
		<svg
			width="16"
			height="11"
			viewBox="0 0 16 11"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M10.4062 0.140625C10.582 4.51798e-07 10.8281 4.30284e-07 11.0039 0.140625L15.6445 4.78125C15.7852 4.95703 15.7852 5.20312 15.6445 5.37891L11.0039 10.0195C10.8281 10.1602 10.582 10.1602 10.4062 10.0195L9.70312 9.31641C9.5625 9.14063 9.5625 8.89453 9.73828 8.71875L12.5508 6.01172L0.421874 6.01172C0.210937 6.01172 -1.00946e-06 5.80078 -1.0279e-06 5.58985L-1.11396e-06 4.60547C-1.13547e-06 4.35938 0.210936 4.1836 0.421874 4.1836L12.5508 4.18359L9.73828 1.44141C9.5625 1.26563 9.5625 1.01953 9.70312 0.843751L10.4062 0.140625Z" fill="currentColor" />
		</svg>
	);
}

function ExternalIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M10 0H15C15.5312 0 16 0.46875 16 1V6C16 6.5625 15.5312 7 15 7C14.4375 7 14 6.5625 14 6V3.4375L7.6875 9.71875C7.3125 10.125 6.65625 10.125 6.28125 9.71875C5.875 9.34375 5.875 8.6875 6.28125 8.3125L12.5625 2H10C9.4375 2 9 1.5625 9 1C9 0.46875 9.4375 0 10 0ZM2.5 1H6C6.53125 1 7 1.46875 7 2C7 2.5625 6.53125 3 6 3H2.5C2.21875 3 2 3.25 2 3.5V13.5C2 13.7812 2.21875 14 2.5 14H12.5C12.75 14 13 13.7812 13 13.5V10C13 9.46875 13.4375 9 14 9C14.5312 9 15 9.46875 15 10V13.5C15 14.9062 13.875 16 12.5 16H2.5C1.09375 16 0 14.9062 0 13.5V3.5C0 2.125 1.09375 1 2.5 1Z" fill="currentColor"/>
		</svg>
	);
}

function Complete() {
	const siteUrl = useRef( window.atssOnboarding?.homeUrl || window.location.origin );
	const customizeUrl = window.atssOnboarding?.customizeUrl;
	const wcSetupUrl = `${ siteUrl.current.replace( /\/$/, '' ) }/wp-admin/admin.php?page=wc-admin&path=/setup-wizard`;
	const dashboardUrl = window.atssOnboarding?.dashboardUrl;

	const isWooOnboardingCompleted =
		!! window.atssOnboarding?.isWooOnboardingCompleted;

	const [ isIframeLoading, setIsIframeLoading ] = useState( true );
	const [ isIframeError, setIsIframeError ] = useState( false );
	const [ isHovering, setIsHovering ] = useState( false );

	const handleViewSite = () => {
		window.open( siteUrl.current, '_blank' );
	};

	const handleDocumentation = () => {
		window.open( DOCUMENTATION_URL, '_blank' );
	};

	const handleIframeLoad = () => {
		setIsIframeLoading( false );
	};

	const handleIframeError = () => {
		setIsIframeLoading( false );
		setIsIframeError( true );
	};

	const handlePreviewClick = () => {
		window.open( siteUrl.current, '_blank' );
	};

	const footerActions = [
		{
			label: __( 'Customize Site', 'athemes-starter-sites' ),
			onClick: () => {
				if ( customizeUrl ) {
					window.open( customizeUrl, '_blank' );
				}
			},
		},
		{
			label: __( 'Documentation', 'athemes-starter-sites' ),
			onClick: handleDocumentation,
		},
		{
			label: __( 'Join Facebook Group', 'athemes-starter-sites' ),
			onClick: () => {
				window.open( FACEBOOK_GROUP_URL, '_blank' );
			},
		},
	];

	const botigaActions = [
		{
			title: __( 'View Your Site', 'athemes-starter-sites' ),
			description: __( 'Open your site to check out the live front-end view.', 'athemes-starter-sites' ),
			label: __( 'View Site', 'athemes-starter-sites' ),
			href: siteUrl.current,
			isPrimary: true,
		},
		{
			title: __( 'Edit Your Site', 'athemes-starter-sites' ),
			description: __( 'Go to the Site Editor to edit your homepage, navigation, and customize your site’s design.', 'athemes-starter-sites' ),
			label: __( 'Edit Site', 'athemes-starter-sites' ),
			href: customizeUrl,
			isPrimary: true,
		},
		! isWooOnboardingCompleted && {
			title: __( 'WooCommerce Setup', 'athemes-starter-sites' ),
			description: __( 'Finish setting up WooCommerce to start selling products and accepting payments.', 'athemes-starter-sites' ),
			label: __( 'WooCommerce Setup', 'athemes-starter-sites' ),
			href: wcSetupUrl,
		},
		{
			title: __( 'Keep Tabs on What’s Important', 'athemes-starter-sites' ),
			description: __( 'Visit the dashboard for quick access to everything that matters and gain important insights.', 'athemes-starter-sites' ),
			label: __( 'Visit Dashboard', 'athemes-starter-sites' ),
			href: dashboardUrl,
		},
		{
			title: __( 'View Botiga Docs', 'athemes-starter-sites' ),
			description: __( 'Watch tutorial videos and read through the docs to learn how to get the most from Botiga.', 'athemes-starter-sites' ),
			label: __( 'View Docs', 'athemes-starter-sites' ),
			href: DOCUMENTATION_URL,
			isExternal: true,
		},
	].filter( Boolean );

	const themeText = {
		wizardTitle: isBotiga
			? __( 'Shop Setup Complete! 🎉', 'athemes-starter-sites' )
			: __( 'Site setup complete!', 'athemes-starter-sites' ),
		wizardDescription: isBotiga
			? (
				isWooOnboardingCompleted
					? __( 'Now you can view, edit, and customize your site using the Site Editor. Refer to our docs if you need more direction.', 'athemes-starter-sites' )
					: __( 'Now you can view, edit, and customize your site using the Site Editor. Don’t forget to finish setting up WooCommerce, and refer to our docs if you need more direction.', 'athemes-starter-sites' )
			)
			: __( 'You can choose to visit site and start customizing it or check out our documentation for more details', 'athemes-starter-sites' ),
	};

	return (
		<div className="atss-onboarding-wizard__step atss-onboarding-wizard__step--complete">
			<main className="atss-onboarding-wizard__step-body">
				<div className="atss-onboarding-wizard__step-body-content atss-onboarding-wizard__step-body-content-inner">
					<div className="atss-complete">
						<div className="atss-complete__icon-wrapper">
							<img
								src={ isBotiga ? successIconBotiga : successIcon }
								alt={ __( 'Success icon indicating site setup is complete', 'athemes-starter-sites' ) }
								className="atss-complete__icon"
							/>
						</div>

						<div className="atss-complete__header">
							<h2 className="atss-onboarding-wizard__step-body-title text-xl font-medium">
								{ themeText.wizardTitle }
							</h2>
							<p className="atss-onboarding-wizard__step-body-description text-sm text-secondary">
								{ themeText.wizardDescription }
							</p>
						</div>

						{ ! isBotiga && (
							<>
								<div className="atss-complete__preview">
									<div
										className="atss-complete__preview-inner"
										onMouseEnter={ () => setIsHovering( true ) }
										onMouseLeave={ () => setIsHovering( false ) }
										onClick={ handlePreviewClick }
									>
										{ isIframeLoading && ! isIframeError ? (
											<div className="atss-complete__preview-loading">
												<Spinner />
											</div>
										) : null }

										{ isHovering && ! isIframeLoading ? (
											<div className="atss-complete__preview-overlay">
												<div className="atss-complete__preview-overlay-icon">
													<img src={ linkIcon } alt="" />
												</div>
											</div>
										) : null }

										{ isIframeError ? (
											<div className="atss-complete__preview-error">
												<p>{ __( 'Unable to load site preview', 'athemes-starter-sites' ) }</p>
												<button
													type="button"
													className="atss-onboarding-wizard__btn atss-onboarding-wizard__btn--continue"
													onClick={ handleViewSite }
												>
													{ __( 'View Site Anyway', 'athemes-starter-sites' ) }
												</button>
											</div>
										) : (
											<iframe
												src={ siteUrl.current }
												title={ __( 'Site Preview', 'athemes-starter-sites' ) }
												className="atss-complete__iframe"
												onLoad={ handleIframeLoad }
												onError={ handleIframeError }
											/>
										) }
									</div>
								</div>

								<button
									type="button"
									className="atss-onboarding-wizard__btn atss-onboarding-wizard__btn--continue w100"
									onClick={ handleViewSite }
								>
									<span>{ __( 'Visit Site', 'athemes-starter-sites' ) }</span>
									<span className="atss-onboarding-wizard__btn-arrow" aria-hidden="true">
										<ArrowIcon />
									</span>
								</button>
							</>
						) }

						{ isBotiga && (
							<div className="atss-complete__actions">
								{ botigaActions.map( ( action ) => {
									if ( ! action.href ) {
										return null;
									}

									return (
										<div key={ action.title } className="atss-complete__action-item">
											<div className="atss-complete__action-content">
												<h4>{ action.title }</h4>
												<p>{ action.description }</p>
											</div>

											<a
												href={ action.href }
												className={ `atss-complete__action-link${ action.isPrimary ? '' : ' atss-complete__action-link--outline' }` }
												target="_blank"
												rel={ action.isExternal ? 'noreferrer' : undefined }
											>
												{ action.label }

												{ action.isExternal ? (
													<ExternalIcon />
												) : action.isPrimary ? (
													<ArrowIcon />
												) : null }
											</a>
										</div>
									);
								} ) }
							</div>
						) }
					</div>
				</div>
			</main>

			{ ! isBotiga && (
				<footer className="atss-onboarding-wizard__footer flex gap-md">
					{ footerActions.map( ( action, index ) => (
						<FooterButton
							key={ index }
							label={ action.label }
							onClick={ action.onClick }
						/>
					) ) }
				</footer>
			) }
		</div>
	);
}

export default Complete;
