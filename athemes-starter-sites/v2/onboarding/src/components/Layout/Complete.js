/**
 * Complete component.
 * Displays the success screen after import is complete with a preview iframe.
 *
 * @package Athemes Starter Sites
 */

import { __ } from '@wordpress/i18n';
import { useState, useRef } from '@wordpress/element';
import successIcon from '../../assets/images/success.svg';
import linkIcon from '../../assets/images/link.svg';
import { Spinner, FooterButton } from './index';
import { FACEBOOK_GROUP_URL } from '../../utils/config';
import { DOCUMENTATION_URL } from '../../utils/config';

function Complete() {
	const siteUrl = useRef( window.location.origin );
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
				const customizeUrl = window.atssOnboarding?.customizeUrl;
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

	return (
		<div className="atss-onboarding-wizard__step atss-onboarding-wizard__step--complete">
			<main className="atss-onboarding-wizard__step-body">
				<div className="atss-onboarding-wizard__step-body-content atss-onboarding-wizard__step-body-content-inner">
					<div className="atss-complete">
						<div className="atss-complete__icon-wrapper">
							<img
								src={ successIcon }
								alt={ __( 'Success icon indicating site setup is complete', 'athemes-starter-sites' ) }
								className="atss-complete__icon"
							/>
						</div>
						<div className="atss-complete__header">
							<h2 className="atss-onboarding-wizard__step-body-title text-xl font-medium">
								{ __( 'Site setup complete!', 'athemes-starter-sites' ) }
							</h2>
							<p className="atss-onboarding-wizard__step-body-description text-sm text-secondary">
								{ __( 'You can choose to visit site and start customizing it or check out our documentation for more details', 'athemes-starter-sites' ) }
							</p>
						</div>
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
							</button>
					</div>
				</div>
			</main>
			<footer className="atss-onboarding-wizard__footer flex gap-md">
				{ footerActions.map( ( action, index ) => (
					<FooterButton
						key={ index }
						label={ action.label }
						onClick={ action.onClick }
					/>
				) ) }
			</footer>
		</div>
	);
}

export default Complete;