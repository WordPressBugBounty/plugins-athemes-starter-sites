/**
 * FooterButton component.
 * A reusable button component for footer actions in the Complete screen.
 *
 * @package Athemes Starter Sites
 */

import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

/**
 * FooterButton component.
 *
 * @param {Object}   props       Component props.
 * @param {string}   props.label Button label text.
 * @param {Function} props.onClick Click handler callback.
 * @param {string}   props.className Additional CSS classes.
 * @return {JSX.Element} Button element.
 */
function FooterButton( { label, onClick, className = '' } ) {
	return (
		<button
			type="button"
			className={ `atss-onboarding-wizard__btn atss-onboarding-wizard__btn--skip w100 ${ className }` }
			onClick={ onClick }
		>
			{ label }
		</button>
	);
}

FooterButton.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string,
};

FooterButton.defaultProps = {
	className: '',
};

export default FooterButton;
