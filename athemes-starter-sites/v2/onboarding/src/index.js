/**
 * Onboarding wizard React app entry point.
 *
 * @package Athemes Starter Sites
 */

import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import App from './App';
import { WizardProvider } from './context/WizardContext';
import './styles/main.scss';

/**
 * Address potential conflicts between Lodash and Underscore.
 * WordPress media library depends on Underscore being available as `_`.
 * Some versions of Lodash can overwrite this, causing errors like
 * "this.activateMode is not a function" in media-views.js.
 */
if ( typeof _ !== 'undefined' && typeof _.noConflict === 'function' ) {
	// Check if it's actually Lodash (Underscore doesn't have `_.at`)
	if ( typeof _.at === 'function' ) {
		_.noConflict();
	}
}

/**
 * Initialize the onboarding wizard app.
 */
function initOnboardingWizard() {
	const rootElement = document.getElementById( 'atss-onboarding-wizard-root' );

	if ( ! rootElement ) {
		// eslint-disable-next-line no-console
		console.error( 'Onboarding wizard root element not found.' );
		return;
	}

	// Check if required data is available.
	if ( typeof atssOnboarding === 'undefined' ) {
		// eslint-disable-next-line no-console
		console.error( 'Onboarding wizard configuration data not found.' );
		return;
	}

	const root = createRoot( rootElement );
	root.render(
		<WizardProvider>
			<App />
		</WizardProvider>
	);
}

// Initialize when DOM is ready.
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', initOnboardingWizard );
} else {
	initOnboardingWizard();
}
