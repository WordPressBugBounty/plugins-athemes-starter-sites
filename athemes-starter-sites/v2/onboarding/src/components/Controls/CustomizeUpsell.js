/**
 * Customize Upsell component.
 *
 * @package Athemes Starter Sites
 */

import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import crownIcon from '../../assets/images/crown.svg';
import { ACCOUNT_URL, DEFAULT_UPGRADE_URL } from '../../utils/config';

/**
 * Customize Upsell component - displays pro template upgrade notice.
 *
 * @param {Object}  props           Component props.
 * @param {boolean} props.isVisible Whether to show the upsell.
 * @param {string}  props.upgradeUrl The upgrade URL with UTM parameters.
 * @return {JSX.Element|null} CustomizeUpsell component or null.
 */
function CustomizeUpsell( { isVisible = false, upgradeUrl = DEFAULT_UPGRADE_URL } ) {
	if ( ! isVisible ) {
		return null;
	}

	return (
		<div className="atss-customize-upsell">
			<div className="atss-customize-upsell__box">
			<div className="atss-customize-upsell__header flex items-center gap-xs">
				<img 
					src={ crownIcon } 
					alt="" 
					className="atss-customize-upsell__icon" 
					aria-hidden="true"
					width="16"
					height="13"
				/>
				<span className="atss-customize-upsell__title font-medium text-sm">
					{ __( 'Pro Template', 'athemes-starter-sites' ) }
				</span>
			</div>
				
				<p className="atss-customize-upsell__description text-xs text-secondary">
					{ __( 'You\'ve selected a Pro template! Unlock this design and many more by upgrading to Pro!', 'athemes-starter-sites' ) }
				</p>
				
				<Button
					variant="primary"
					href={ upgradeUrl }
					target="_blank"
					rel="noopener noreferrer"
					className="atss-onboarding-wizard__btn w100 justify-center"
				>
					{ __( 'Upgrade to Pro', 'athemes-starter-sites' ) }
					<span className="atss-onboarding-wizard__btn-arrow">→</span>
				</Button>
			</div>
			
            <p className="atss-customize-upsell__note text-xs text-tertiary">
                { __( 'If you are an existing Pro user, please get the premium version of the plugin from your', 'athemes-starter-sites' ) }{ ' ' }
                <a 
                    href={ ACCOUNT_URL }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="atss-customize-upsell__link"
                >
                    { __( 'account', 'athemes-starter-sites' ) }
                </a>
            </p>
		</div>
	);
}

export default CustomizeUpsell;
