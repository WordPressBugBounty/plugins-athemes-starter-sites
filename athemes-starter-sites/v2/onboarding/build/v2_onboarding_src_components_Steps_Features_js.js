"use strict";
(globalThis["webpackChunkathemes_starter_sites"] = globalThis["webpackChunkathemes_starter_sites"] || []).push([["v2_onboarding_src_components_Steps_Features_js"],{

/***/ "./v2/onboarding/src/components/Controls/PluginSummary.js":
/*!****************************************************************!*\
  !*** ./v2/onboarding/src/components/Controls/PluginSummary.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_plugin_info__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/plugin-info */ "./v2/onboarding/src/data/plugin-info.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * PluginSummary component for displaying selected plugins as a list of pills.
 *
 * @package Athemes Starter Sites
 */




const PLUGIN_INFO = _data_plugin_info__WEBPACK_IMPORTED_MODULE_1__["default"];
function getPluginIcon(slug) {
  const info = PLUGIN_INFO[slug];
  if (info?.plugin_icon) {
    return info.plugin_icon;
  }
  return info?.icon || _data_plugin_info__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_ICON;
}
function getPluginName(slug, fallbackName) {
  const info = PLUGIN_INFO[slug];
  if (info?.plugin_icon) {
    return info.plugin_icon;
  }
  return fallbackName;
}

/**
 * PluginSummary component.
 *
 * Displays a list of selected plugins as pill badges with icons.
 *
 * @param {Object}   props                    Component props.
 * @param {Array}    props.selectedPlugins    Array of selected plugin slugs.
 * @param {Array}    props.availablePlugins   Array of available plugin objects.
 * @return {JSX.Element} PluginSummary component.
 */
function PluginSummary({
  selectedPlugins = [],
  availablePlugins = []
}) {
  if (selectedPlugins.length === 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "atss-plugin-summary",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "atss-plugin-summary__empty text-sm text-secondary",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No plugins selected.', 'athemes-starter-sites')
      })
    });
  }
  const selectedPluginObjects = availablePlugins.filter(plugin => selectedPlugins.includes(plugin.slug));
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "atss-plugin-summary",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
      className: "atss-plugin-summary__description text-sm",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('The following plugins will be installed & activated:', 'athemes-starter-sites')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "atss-plugin-summary__list",
      children: selectedPluginObjects.map(plugin => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "atss-plugin-summary__pill",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          className: "atss-plugin-summary__icon",
          dangerouslySetInnerHTML: {
            __html: getPluginIcon(plugin.slug)
          }
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          className: "atss-plugin-summary__name",
          children: plugin.name
        })]
      }, plugin.slug))
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PluginSummary);

/***/ }),

/***/ "./v2/onboarding/src/components/Layout/FeatureCard.js":
/*!************************************************************!*\
  !*** ./v2/onboarding/src/components/Layout/FeatureCard.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_plugin_info__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../data/plugin-info */ "./v2/onboarding/src/data/plugin-info.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * FeatureCard component for displaying individual plugins in the Features step.
 *
 * @package Athemes Starter Sites
 */




const PLUGIN_INFO = _data_plugin_info__WEBPACK_IMPORTED_MODULE_1__["default"];
function getPluginIcon(slug) {
  return PLUGIN_INFO[slug]?.icon || _data_plugin_info__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_ICON;
}
function getPluginName(slug) {
  return PLUGIN_INFO[slug]?.name || slug;
}
function getDescription(slug) {
  return PLUGIN_INFO[slug]?.description || _data_plugin_info__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_DESCRIPTION;
}

/**
 * FeatureCard component.
 *
 * @param {Object}   props             Component props.
 * @param {Object}   props.plugin      Plugin object with name, slug, required, etc.
 * @param {boolean}  props.isSelected  Whether this plugin is selected.
 * @param {Function} props.onToggle    Callback when checkbox is toggled.
 * @return {JSX.Element} FeatureCard component.
 */
function FeatureCard({
  plugin,
  isSelected = false,
  onToggle
}) {
  // Handle toggle (used by both card and checkbox).
  const handleToggle = e => {
    if (e) {
      e.stopPropagation();
    }
    if (onToggle) {
      onToggle();
    }
  };

  // Determine the badge type based on the required property.
  const getBadgeType = () => {
    if (plugin.required === true) {
      return 'required';
    }
    // Consider plugins without explicit required: false as recommended.
    if (plugin.recommended === true) {
      return 'recommended';
    }
    return 'none';
  };
  const badgeType = getBadgeType();

  // Render badge based on type.
  const renderBadge = () => {
    if (badgeType === 'recommended') {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "atss-feature-card__badge atss-feature-card__badge--recommended",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Recommended', 'athemes-starter-sites')
      });
    }
    if (badgeType === 'required') {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "atss-feature-card__badge atss-feature-card__badge--required",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Required', 'athemes-starter-sites')
      });
    }
    return null;
  };
  const isDisabled = plugin.required === true;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: `atss-feature-card ${isSelected ? 'atss-feature-card--selected' : ''} ${isDisabled ? 'atss-feature-card--disabled' : ''}`,
    onClick: !isDisabled ? handleToggle : undefined,
    role: "button",
    tabIndex: isDisabled ? -1 : 0,
    onKeyDown: e => {
      if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
        handleToggle();
      }
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "atss-feature-card__content",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "atss-feature-card__icon",
        dangerouslySetInnerHTML: {
          __html: getPluginIcon(plugin.slug)
        }
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        className: "atss-feature-card__text",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
          className: "atss-feature-card__title-wrapper",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
            className: "atss-feature-card__title",
            children: getPluginName(plugin.slug)
          }), renderBadge()]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
          className: "atss-feature-card__description",
          children: getDescription(plugin.slug)
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
      type: "button",
      className: `atss-feature-card__checkbox ${isSelected ? 'atss-feature-card__checkbox--checked' : ''}`,
      onClick: handleToggle,
      disabled: isDisabled,
      "aria-checked": isSelected,
      "aria-label": isSelected ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Deselect plugin', 'athemes-starter-sites') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Select plugin', 'athemes-starter-sites'),
      children: isSelected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
        width: "12",
        height: "10",
        viewBox: "0 0 12 10",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: "atss-feature-card__checkmark",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
          d: "M1 5L4.5 8.5L11 1",
          stroke: "white",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FeatureCard);

/***/ }),

/***/ "./v2/onboarding/src/components/Steps/Features.js":
/*!********************************************************!*\
  !*** ./v2/onboarding/src/components/Steps/Features.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_WizardContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../context/WizardContext */ "./v2/onboarding/src/context/WizardContext.js");
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Layout */ "./v2/onboarding/src/components/Layout/index.js");
/* harmony import */ var _Layout_FeatureCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Layout/FeatureCard */ "./v2/onboarding/src/components/Layout/FeatureCard.js");
/* harmony import */ var _Controls_PluginSummary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Controls/PluginSummary */ "./v2/onboarding/src/components/Controls/PluginSummary.js");
/* harmony import */ var _data_plugin_info__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../data/plugin-info */ "./v2/onboarding/src/data/plugin-info.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
/**
 * Features step component.
 *
 * @package Athemes Starter Sites
 */









/**
 * Features step component.
 *
 * @param {Object}   props                  Component props.
 * @param {Function} props.onBack           Callback to go to previous step.
 * @param {Function} props.onSkip           Callback to skip this step.
 * @param {Function} props.onContinue       Callback to proceed to next step.
 * @param {boolean}  props.navigationLoading Whether navigation is in loading state.
 * @param {string}   props.navigationError   Navigation error message.
 * @return {JSX.Element} Features component.
 */

function Features({
  onBack,
  onSkip,
  onContinue,
  navigationLoading,
  navigationError
}) {
  const {
    wizardData,
    builder
  } = (0,_context_WizardContext__WEBPACK_IMPORTED_MODULE_2__.useWizard)();
  const [plugins, setPlugins] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [selectedPlugins, setSelectedPlugins] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  const [previousBuilder, setPreviousBuilder] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(builder);

  // Get the currently selected demo from wizard context.
  const selectedSiteId = wizardData?.design?.selectedSiteId;

  // Get the selected builder from context
  const selectedBuilder = builder || 'gutenberg';

  // Detect if builder has changed
  const hasBuilderChanged = previousBuilder !== selectedBuilder;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Get plugins for the selected demo.
    if (selectedSiteId && window.atssOnboarding?.demos) {
      const demo = window.atssOnboarding.demos[selectedSiteId];
      if (demo && demo.plugins && Array.isArray(demo.plugins) && demo.plugins.length > 0) {
        // Filter plugins by builder if they have a 'builder' property.
        const availablePlugins = demo.plugins.filter(plugin => {
          // If plugin doesn't specify a builder, include it for all builders.
          if (!plugin.builder) {
            return true;
          }
          // If plugin specifies a builder, only include if it matches.
          return plugin.builder === selectedBuilder;
        });

        // If builder is Elementor and Elementor not already in plugins, add it as required.
        if (selectedBuilder === 'elementor' && !availablePlugins.some(p => p.slug === 'elementor')) {
          availablePlugins.unshift({
            slug: 'elementor',
            name: 'Elementor',
            description: 'The Elementor Website Builder.',
            required: true,
            builder: 'elementor'
          });
        }
        setPlugins(availablePlugins);

        // Initialize selected plugins - select all required plugins and plugins with default: true in plugin-info.js.
        const initialSelection = availablePlugins.filter(plugin => {
          // Include if explicitly required.
          if (plugin.required === true) {
            return true;
          }
          // Include if default: true in plugin-info.js.
          if (_data_plugin_info__WEBPACK_IMPORTED_MODULE_6__["default"][plugin.slug]?.default === true) {
            return true;
          }
          // Exclude if explicitly not required and not default.
          return false;
        }).map(plugin => plugin.slug);

        // If builder has changed, clear saved selection and use fresh initial selection.
        // Otherwise, use saved selection if available.
        const savedSelection = wizardData?.features?.selectedPlugins;
        if (hasBuilderChanged) {
          // Builder changed - use fresh initial selection for new builder
          setSelectedPlugins(initialSelection);
          setPreviousBuilder(selectedBuilder);
        } else {
          // Builder hasn't changed - use saved selection or initial selection
          setSelectedPlugins(savedSelection || initialSelection);
        }
      } else {
        // No plugins for this demo.
        setPlugins([]);
        setSelectedPlugins([]);
      }
    }
    setLoading(false);
  }, [selectedSiteId, selectedBuilder, hasBuilderChanged]);

  /**
   * Handle plugin selection toggle.
   *
   * @param {string} pluginSlug The plugin slug to toggle.
   */
  const handlePluginToggle = pluginSlug => {
    setSelectedPlugins(prev => {
      if (prev.includes(pluginSlug)) {
        return prev.filter(slug => slug !== pluginSlug);
      }
      return [...prev, pluginSlug];
    });
  };

  /**
   * Handle continue button click.
   * Saves selected plugins to wizard context and proceeds to Optin step.
   */
  const handleContinue = () => {
    onContinue({
      selectedPlugins
    });
  };

  /**
   * Handle skip button click.
   * Keeps required plugins but skips optional ones.
   */
  const handleSkip = () => {
    const requiredPlugins = plugins.filter(plugin => plugin.required === true).map(plugin => plugin.slug);
    onContinue({
      selectedPlugins: requiredPlugins
    });
  };
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      className: "atss-onboarding-wizard__step atss-onboarding-wizard__step--features",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("main", {
        className: "atss-onboarding-wizard__step-body",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "atss-onboarding-wizard__step-body-content w100",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
            className: "atss-onboarding-wizard__loading",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading recommended features...', 'athemes-starter-sites')
          })
        })
      })
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    className: "atss-onboarding-wizard__step atss-onboarding-wizard__step--features",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("main", {
      className: "atss-onboarding-wizard__step-body",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
        className: "atss-onboarding-wizard__step-body-content w100",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("h2", {
          className: "atss-onboarding-wizard__step-body-title text-xl font-medium",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Recommended Features', 'athemes-starter-sites')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("p", {
          className: "atss-onboarding-wizard__step-body-description text-sm text-secondary",
          children: plugins.length > 0 ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('We have selected some recommended plugins to help take your site to the next level.', 'athemes-starter-sites') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('No additional plugins are required for this starter site.', 'athemes-starter-sites')
        }), plugins.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
          className: "atss-features-grid",
          children: plugins.map(plugin => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Layout_FeatureCard__WEBPACK_IMPORTED_MODULE_4__["default"], {
            plugin: plugin,
            isSelected: selectedPlugins.includes(plugin.slug),
            onToggle: () => handlePluginToggle(plugin.slug)
          }, plugin.slug))
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Controls_PluginSummary__WEBPACK_IMPORTED_MODULE_5__["default"], {
          selectedPlugins: selectedPlugins,
          availablePlugins: plugins
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_Layout__WEBPACK_IMPORTED_MODULE_3__.Footer, {
      showBack: true,
      showSkip: true,
      continueText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Continue', 'athemes-starter-sites'),
      onBack: onBack,
      onSkip: handleSkip,
      onContinue: handleContinue,
      continueLoading: navigationLoading,
      continueError: navigationError
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Features);

/***/ }),

/***/ "./v2/onboarding/src/data/plugin-info.js":
/*!***********************************************!*\
  !*** ./v2/onboarding/src/data/plugin-info.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_DESCRIPTION: () => (/* binding */ DEFAULT_DESCRIPTION),
/* harmony export */   DEFAULT_ICON: () => (/* binding */ DEFAULT_ICON),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Plugin info data for the Features step.
 *
 * @package Athemes Starter Sites
 */


const pluginInfo = {
  'woocommerce': {
    icon: '<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 0.75C0 0.34375 0.3125 0 0.75 0H2.15625C2.84375 0 3.46875 0.40625 3.75 1H16.5938C17.4062 1 18 1.78125 17.7812 2.59375L16.5 7.34375C16.25 8.34375 15.3438 9 14.3438 9H5.3125L5.5 9.90625C5.5625 10.25 5.875 10.5 6.21875 10.5H15.25C15.6562 10.5 16 10.8438 16 11.25C16 11.6875 15.6562 12 15.25 12H6.21875C5.15625 12 4.21875 11.25 4.03125 10.1875L2.40625 1.71875C2.375 1.59375 2.28125 1.5 2.15625 1.5H0.75C0.3125 1.5 0 1.1875 0 0.75ZM4 14.5C4 13.9688 4.28125 13.5 4.75 13.2188C5.1875 12.9375 5.78125 12.9375 6.25 13.2188C6.6875 13.5 7 13.9688 7 14.5C7 15.0625 6.6875 15.5312 6.25 15.8125C5.78125 16.0938 5.1875 16.0938 4.75 15.8125C4.28125 15.5312 4 15.0625 4 14.5ZM14.5 13C15.0312 13 15.5 13.3125 15.7812 13.75C16.0625 14.2188 16.0625 14.8125 15.7812 15.25C15.5 15.7188 15.0312 16 14.5 16C13.9375 16 13.4688 15.7188 13.1875 15.25C12.9062 14.8125 12.9062 14.2188 13.1875 13.75C13.4688 13.3125 13.9375 13 14.5 13Z" fill="#335EEA"/></svg>',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Ecommerce', 'athemes-starter-sites'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Sell your products and services online with ease.', 'athemes-starter-sites'),
    plugin_icon: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85.9 47.6"> <path fill="#50575E" d="M77.4,0.1c-4.3,0-7.1,1.4-9.6,6.1L56.4,27.7V8.6c0-5.7-2.7-8.5-7.7-8.5s-7.1,1.7-9.6,6.5L28.3,27.7V8.8 c0-6.1-2.5-8.7-8.6-8.7H7.3C2.6,0.1,0,2.3,0,6.3s2.5,6.4,7.1,6.4h5.1v24.1c0,6.8,4.6,10.8,11.2,10.8S33,45,36.3,38.9l7.2-13.5v11.4 c0,6.7,4.4,10.8,11.1,10.8s9.2-2.3,13-8.7l16.6-28c3.6-6.1,1.1-10.8-6.9-10.8C77.3,0.1,77.3,0.1,77.4,0.1z"/> </svg>',
    default: true
  },
  'elementor': {
    icon: '<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.59375 11.625L6 8.375C6 7.4375 6.4375 6.5625 7.1875 6L14.5938 0.4375C15.1562 0 15.9688 0.03125 16.5 0.53125C17.0312 1.03125 17.125 1.84375 16.75 2.46875L11.6875 10.2812C11.2188 11 10.4375 11.5 9.59375 11.625ZM8.96875 12.4062C8.96875 12.4688 9 12.5625 9 12.625C9 14.5625 7.40625 16.125 5.5 16.125H1C0.4375 16.125 0 15.6875 0 15.125C0 14.5938 0.4375 14.125 1 14.125H1.125C1.6875 14.125 2.0625 13.5625 2 13C2 12.875 2 12.75 2 12.625C2 10.75 3.46875 9.21875 5.34375 9.15625L8.96875 12.4062Z" fill="#335EEA"/></svg>',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Page Builder', 'athemes-starter-sites'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Create and customize pages effortlessly using a visual editor.', 'athemes-starter-sites'),
    plugin_icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 7.90625C0 3.53125 3.5625 0 7.96875 0C12.4062 0 15.9688 3.53125 15.9688 7.90625C15.9688 12.3125 12.4062 15.875 7.96875 15.875C3.5625 15.875 0 12.3125 0 7.90625ZM6 4.59375H4.65625V11.25H6V4.59375ZM7.3125 4.59375V5.9375H11.3125V4.59375H7.3125ZM11.3125 7.25H7.3125V8.59375H11.3125V7.25ZM7.3125 9.90625V11.25H11.3125V9.90625H7.3125Z" fill="#50575E"/> </svg>',
    default: true
  },
  'wpforms-lite': {
    icon: '<svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0.75 0H2.25C2.65625 0 3 0.34375 3 0.75V2.25C3 2.6875 2.65625 3 2.25 3H0.75C0.3125 3 0 2.6875 0 2.25V0.75C0 0.34375 0.3125 0 0.75 0ZM5.5 0.5H14.5C15.0312 0.5 15.5 0.96875 15.5 1.5C15.5 2.0625 15.0312 2.5 14.5 2.5H5.5C4.9375 2.5 4.5 2.0625 4.5 1.5C4.5 0.96875 4.9375 0.5 5.5 0.5ZM5.5 5.5H14.5C15.0312 5.5 15.5 5.96875 15.5 6.5C15.5 7.0625 15.0312 7.5 14.5 7.5H5.5C4.9375 7.5 4.5 7.0625 4.5 6.5C4.5 5.96875 4.9375 5.5 5.5 5.5ZM5.5 10.5H14.5C15.0312 10.5 15.5 10.9688 15.5 11.5C15.5 12.0625 15.0312 12.5 14.5 12.5H5.5C4.9375 12.5 4.5 12.0625 4.5 11.5C4.5 10.9688 4.9375 10.5 5.5 10.5ZM0 5.75C0 5.34375 0.3125 5 0.75 5H2.25C2.65625 5 3 5.34375 3 5.75V7.25C3 7.6875 2.65625 8 2.25 8H0.75C0.3125 8 0 7.6875 0 7.25V5.75ZM0.75 10H2.25C2.65625 10 3 10.3438 3 10.75V12.25C3 12.6875 2.65625 13 2.25 13H0.75C0.3125 13 0 12.6875 0 12.25V10.75C0 10.3438 0.3125 10 0.75 10Z" fill="#335EEA"/> </svg>',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Contact Form', 'athemes-starter-sites'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Make it easy for your visitors to reach out to you.', 'athemes-starter-sites'),
    plugin_icon: '<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 1.375V12.6562C14 13.4375 13.4062 14.0312 12.625 14.0312H1.34375C0.59375 14 0 13.4375 0 12.6562V1.375C0 0.625 0.5625 0 1.34375 0H12.625C13.375 0 14 0.59375 14 1.375ZM12.8125 12.6562V1.375C12.8125 1.28125 12.75 1.1875 12.625 1.1875H12.3438L8.90625 3.5L7 1.96875L5.0625 3.5L1.625 1.1875H1.34375C1.25 1.1875 1.15625 1.28125 1.15625 1.375V12.6562C1.15625 12.75 1.25 12.8438 1.34375 12.8438H12.625C12.75 12.8438 12.8125 12.75 12.8125 12.6562ZM4.6875 4.8125V5.96875H2.375V4.8125H4.6875ZM4.6875 7.15625V8.3125H2.375V7.15625H4.6875ZM5.03125 2.5625L6.71875 1.1875H3L5.03125 2.5625ZM11.5938 4.8125V5.96875H5.46875V4.8125H11.5938ZM11.5938 7.15625V8.3125H5.46875V7.15625H11.5938ZM8.9375 2.5625L10.9688 1.1875H7.25L8.9375 2.5625ZM11.5938 9.46875V10.6562H8.46875V9.46875H11.5938Z" fill="#50575E"/> </svg>',
    default: true
  },
  'merchant': {
    icon: '<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 0.75C0 0.34375 0.3125 0 0.75 0H2.15625C2.84375 0 3.46875 0.40625 3.75 1H16.5938C17.4062 1 18 1.78125 17.7812 2.59375L16.5 7.34375C16.25 8.34375 15.3438 9 14.3438 9H5.3125L5.5 9.90625C5.5625 10.25 5.875 10.5 6.21875 10.5H15.25C15.6562 10.5 16 10.8438 16 11.25C16 11.6875 15.6562 12 15.25 12H6.21875C5.15625 12 4.21875 11.25 4.03125 10.1875L2.40625 1.71875C2.375 1.59375 2.28125 1.5 2.15625 1.5H0.75C0.3125 1.5 0 1.1875 0 0.75ZM4 14.5C4 13.9688 4.28125 13.5 4.75 13.2188C5.1875 12.9375 5.78125 12.9375 6.25 13.2188C6.6875 13.5 7 13.9688 7 14.5C7 15.0625 6.6875 15.5312 6.25 15.8125C5.78125 16.0938 5.1875 16.0938 4.75 15.8125C4.28125 15.5312 4 15.0625 4 14.5ZM14.5 13C15.0312 13 15.5 13.3125 15.7812 13.75C16.0625 14.2188 16.0625 14.8125 15.7812 15.25C15.5 15.7188 15.0312 16 14.5 16C13.9375 16 13.4688 15.7188 13.1875 15.25C12.9062 14.8125 12.9062 14.2188 13.1875 13.75C13.4688 13.3125 13.9375 13 14.5 13Z" fill="#335EEA"/></svg>',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Additional ecommerce features', 'athemes-starter-sites'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Boost your WooCommerce sales with proven conversion tactics.', 'athemes-starter-sites'),
    plugin_icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="14"> <path d="m12.94.519-2.41 4.265 2.65 4.714h4.762L12.939.518ZM4.163 5.646.747 11.625h4.838l1.003-1.686-2.425-4.293ZM7.103.519 4.695 4.784l4.652 8.235h4.817L7.104.519Z" fill="#50575E"/> </svg>',
    default: true
  },
  'sydney-toolbox': {
    icon: '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M2.53125 0.21875L5.78125 2.71875C5.96875 2.875 6.09375 3.09375 6.09375 3.3125V5L9.5 8.40625C10.4062 7.96875 11.5312 8.125 12.2812 8.875L15.7812 12.375C16.1875 12.75 16.1875 13.4062 15.7812 13.7812L13.7812 15.7812C13.4062 16.1875 12.75 16.1875 12.375 15.7812L8.875 12.2812C8.125 11.5312 7.96875 10.375 8.4375 9.46875L5.03125 6.0625H3.3125C3.09375 6.0625 2.875 5.96875 2.71875 5.78125L0.21875 2.53125C0 2.21875 0.03125 1.8125 0.3125 1.53125L1.5625 0.28125C1.8125 0.03125 2.25 0 2.53125 0.21875ZM0.6875 12.4688L5.34375 7.8125L7.28125 9.75C7.09375 10.4062 7.125 11.125 7.375 11.7812L3.6875 15.4688C3.3125 15.8438 2.75 16.0625 2.1875 16.0625C1.03125 16.0625 0.09375 15.125 0.09375 13.9688C0.09375 13.4062 0.3125 12.8438 0.6875 12.4688ZM16.0938 4.5625C16.0938 6.375 15.0312 7.9375 13.5 8.65625L13 8.15625C12.125 7.28125 10.875 6.96875 9.75 7.28125L7.09375 4.59375V4.5625C7.09375 2.09375 9.09375 0.0625 11.5938 0.0625C11.9062 0.0625 12.2188 0.125 12.5312 0.1875C12.875 0.25 12.9688 0.6875 12.7188 0.9375L10.7188 2.9375C10.625 3.03125 10.5938 3.15625 10.5938 3.28125V5.0625C10.5938 5.34375 10.8125 5.5625 11.0938 5.5625L12.875 5.59375C13 5.59375 13.125 5.53125 13.2188 5.4375L15.2188 3.4375C15.4688 3.1875 15.9062 3.28125 15.9688 3.625C16.0312 3.9375 16.0938 4.25 16.0938 4.5625ZM1.84375 13.5625C1.84375 14 2.15625 14.3125 2.59375 14.3125C3 14.3125 3.34375 14 3.34375 13.5625C3.34375 13.1562 3 12.8125 2.59375 12.8125C2.15625 12.8125 1.84375 13.1562 1.84375 13.5625Z" fill="#335EEA"/></svg>',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Custom posts & fields', 'athemes-starter-sites'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Extends the Sydney theme with additional features.', 'athemes-starter-sites'),
    plugin_icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1.65625 5.0625C1.28125 5.875 1.09375 6.8125 1.09375 7.75C1.09375 10.4062 2.625 12.6562 4.84375 13.75L1.65625 5.0625ZM12.2188 7.4375C12.2188 8 12 8.65625 11.7188 9.5625L11.0625 11.7812L8.65625 4.65625C9.0625 4.625 9.40625 4.59375 9.40625 4.59375C9.78125 4.53125 9.71875 4 9.375 4.03125C9.375 4.03125 8.28125 4.125 7.59375 4.125C6.9375 4.125 5.84375 4.03125 5.84375 4.03125C5.5 4 5.4375 4.5625 5.8125 4.59375C5.8125 4.59375 6.15625 4.625 6.5 4.65625L7.53125 7.46875L6.09375 11.8438L3.65625 4.65625C4.0625 4.625 4.4375 4.59375 4.4375 4.59375C4.78125 4.53125 4.75 4 4.375 4.03125C4.375 4.03125 3.3125 4.125 2.59375 4.125C2.46875 4.125 2.34375 4.125 2.1875 4.125C3.375 2.3125 5.40625 1.125 7.75 1.125C9.46875 1.125 11.0312 1.78125 12.2188 2.875C12.1875 2.84375 12.1562 2.84375 12.125 2.84375C11.5 2.84375 11.0312 3.4375 11.0312 4.03125C11.0312 4.59375 11.3438 5.0625 11.6875 5.59375C11.9375 6.03125 12.2188 6.59375 12.2188 7.4375ZM7.84375 8.34375L9.90625 13.9375C9.90625 13.9688 9.9375 14 9.9375 14.0312C9.25 14.2812 8.5 14.4062 7.75 14.4062C7.09375 14.4062 6.46875 14.3125 5.84375 14.1562L7.84375 8.34375ZM13.5625 4.5625C14.0938 5.53125 14.375 6.59375 14.375 7.75C14.375 10.2188 13.0625 12.3438 11.0625 13.5L13.0938 7.625C13.5 6.6875 13.625 5.9375 13.625 5.25C13.625 5 13.5938 4.78125 13.5625 4.5625ZM15.5 7.75C15.5 3.5 12 0 7.75 0C3.46875 0 0 3.5 0 7.75C0 12.0312 3.46875 15.5 7.75 15.5C12 15.5 15.5 12.0312 15.5 7.75ZM15.125 7.75C15.125 11.8438 11.8125 15.1562 7.75 15.1562C3.65625 15.1562 0.34375 11.8438 0.34375 7.75C0.34375 3.6875 3.65625 0.375 7.75 0.375C11.8125 0.375 15.125 3.6875 15.125 7.75Z" fill="#50575E"/> </svg>'
  },
  'athemes-addons-for-elementor-lite': {
    icon: '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 2H9V6H14V2ZM14 8H9V12H14V8ZM7 6V2H2V6H7ZM2 8V12H7V8H2ZM2 0H14C15.0938 0 16 0.90625 16 2V12C16 13.125 15.0938 14 14 14H2C0.875 14 0 13.125 0 12V2C0 0.90625 0.875 0 2 0Z" fill="#335EEA"/></svg>',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Additional Elementor blocks', 'athemes-starter-sites'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Access a collection of beautiful Elementor widgets and designs.', 'athemes-starter-sites'),
    plugin_icon: '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none"> <path d="M4.3371 5.33672L0.0488281 13.0046H2.47652H5.38975L6.69196 9.80144L4.3371 5.33672ZM7.19206 0.00463867L4.85371 4.44024L9.37116 13.0046H14.0488L7.19206 0.00463867Z" fill="#50575E"/> <path d="M17.8002 0.00463867H8.125L10.1119 3.78976H17.8002V0.00463867Z" fill="#50575E"/> <path d="M17.8002 9.20229H12.9784L14.9654 13.0046H17.8002V9.20229Z" fill="#50575E"/> <path d="M17.8002 4.60335H10.5608L12.5477 8.3887H17.8002V4.60335Z" fill="#50575E"/> </svg>',
    default: true
  },
  'athemes-blocks': {
    icon: '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 2H9V6H14V2ZM14 8H9V12H14V8ZM7 6V2H2V6H7ZM2 8V12H7V8H2ZM2 0H14C15.0938 0 16 0.90625 16 2V12C16 13.125 15.0938 14 14 14H2C0.875 14 0 13.125 0 12V2C0 0.90625 0.875 0 2 0Z" fill="#335EEA"/> </svg>',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Additional blocks', 'athemes-starter-sites'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Access a collection of beautiful blocks to enhance your website.', 'athemes-starter-sites'),
    plugin_icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="14" viewBox="0 0 20 14" fill="none"> <rect x="4.46973" y="5.06073" width="6.32103" height="6.32103" transform="rotate(45 4.46973 5.06073)" fill="#50575E"/> <rect x="14.7261" y="5.06073" width="6.32103" height="6.32103" transform="rotate(45 14.7261 5.06073)" fill="#50575E"/> <rect x="9.62061" width="6.32103" height="6.32103" transform="rotate(45 9.62061 0)" fill="#50575E"/> </svg>',
    default: true
  },
  'dokan-lite': {
    icon: '<svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M0 0.75C0 0.34375 0.3125 0 0.75 0H2.15625C2.84375 0 3.46875 0.40625 3.75 1H16.5938C17.4062 1 18 1.78125 17.7812 2.59375L16.5 7.34375C16.25 8.34375 15.3438 9 14.3438 9H5.3125L5.5 9.90625C5.5625 10.25 5.875 10.5 6.21875 10.5H15.25C15.6562 10.5 16 10.8438 16 11.25C16 11.6875 15.6562 12 15.25 12H6.21875C5.15625 12 4.21875 11.25 4.03125 10.1875L2.40625 1.71875C2.375 1.59375 2.28125 1.5 2.15625 1.5H0.75C0.3125 1.5 0 1.1875 0 0.75ZM4 14.5C4 13.9688 4.28125 13.5 4.75 13.2188C5.1875 12.9375 5.78125 12.9375 6.25 13.2188C6.6875 13.5 7 13.9688 7 14.5C7 15.0625 6.6875 15.5312 6.25 15.8125C5.78125 16.0938 5.1875 16.0938 4.75 15.8125C4.28125 15.5312 4 15.0625 4 14.5ZM14.5 13C15.0312 13 15.5 13.3125 15.7812 13.75C16.0625 14.2188 16.0625 14.8125 15.7812 15.25C15.5 15.7188 15.0312 16 14.5 16C13.9375 16 13.4688 15.7188 13.1875 15.25C12.9062 14.8125 12.9062 14.2188 13.1875 13.75C13.4688 13.3125 13.9375 13 14.5 13Z" fill="#335EEA"/></svg>',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Multi-vendor system', 'athemes-starter-sites'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Set up a multi-vendor marketplace to connect sellers with buyers.', 'athemes-starter-sites'),
    plugin_icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1.65625 5.0625C1.28125 5.875 1.09375 6.8125 1.09375 7.75C1.09375 10.4062 2.625 12.6562 4.84375 13.75L1.65625 5.0625ZM12.2188 7.4375C12.2188 8 12 8.65625 11.7188 9.5625L11.0625 11.7812L8.65625 4.65625C9.0625 4.625 9.40625 4.59375 9.40625 4.59375C9.78125 4.53125 9.71875 4 9.375 4.03125C9.375 4.03125 8.28125 4.125 7.59375 4.125C6.9375 4.125 5.84375 4.03125 5.84375 4.03125C5.5 4 5.4375 4.5625 5.8125 4.59375C5.8125 4.59375 6.15625 4.625 6.5 4.65625L7.53125 7.46875L6.09375 11.8438L3.65625 4.65625C4.0625 4.625 4.4375 4.59375 4.4375 4.59375C4.78125 4.53125 4.75 4 4.375 4.03125C4.375 4.03125 3.3125 4.125 2.59375 4.125C2.46875 4.125 2.34375 4.125 2.1875 4.125C3.375 2.3125 5.40625 1.125 7.75 1.125C9.46875 1.125 11.0312 1.78125 12.2188 2.875C12.1875 2.84375 12.1562 2.84375 12.125 2.84375C11.5 2.84375 11.0312 3.4375 11.0312 4.03125C11.0312 4.59375 11.3438 5.0625 11.6875 5.59375C11.9375 6.03125 12.2188 6.59375 12.2188 7.4375ZM7.84375 8.34375L9.90625 13.9375C9.90625 13.9688 9.9375 14 9.9375 14.0312C9.25 14.2812 8.5 14.4062 7.75 14.4062C7.09375 14.4062 6.46875 14.3125 5.84375 14.1562L7.84375 8.34375ZM13.5625 4.5625C14.0938 5.53125 14.375 6.59375 14.375 7.75C14.375 10.2188 13.0625 12.3438 11.0625 13.5L13.0938 7.625C13.5 6.6875 13.625 5.9375 13.625 5.25C13.625 5 13.5938 4.78125 13.5625 4.5625ZM15.5 7.75C15.5 3.5 12 0 7.75 0C3.46875 0 0 3.5 0 7.75C0 12.0312 3.46875 15.5 7.75 15.5C12 15.5 15.5 12.0312 15.5 7.75ZM15.125 7.75C15.125 11.8438 11.8125 15.1562 7.75 15.1562C3.65625 15.1562 0.34375 11.8438 0.34375 7.75C0.34375 3.6875 3.65625 0.375 7.75 0.375C11.8125 0.375 15.125 3.6875 15.125 7.75Z" fill="#50575E"/> </svg>',
    default: true
  },
  'tutor': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 195.8l209.2 86.1c9.8 4 20.2 6.1 30.8 6.1s21-2.1 30.8-6.1l242.4-99.8c9-3.7 14.8-12.4 14.8-22.1s-5.8-18.4-14.8-22.1L318.8 38.1C309 34.1 298.6 32 288 32s-21 2.1-30.8 6.1L14.8 137.9C5.8 141.6 0 150.3 0 160L0 456c0 13.3 10.7 24 24 24s24-10.7 24-24l0-260.2zm48 71.7L96 384c0 53 86 96 192 96s192-43 192-96l0-116.6-142.9 58.9c-15.6 6.4-32.2 9.7-49.1 9.7s-33.5-3.3-49.1-9.7L96 267.4z"/></svg>',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Learning Management', 'athemes-starter-sites'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Create and manage your online learning platform with ease.', 'athemes-starter-sites'),
    plugin_icon: '<svg fill="#50575E" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1139"> <defs/> <path fill-rule="evenodd" clip-rule="evenodd" d="M341.652 622.4c-23.412 0-43.222-19.8-43.222-43.2v-99c0-23.4 19.81-43.2 43.222-43.2 23.412 0 43.222 19.8 43.222 43.2v99c0 23.4-18.009 43.2-43.222 43.2 1.801 0 1.801 0 0 0zM655.01 622.4c-23.412 0-43.222-18-43.222-43.2v-99c0-23.4 19.81-43.2 43.222-43.2 23.412 0 43.222 19.8 43.222 43.2v99c0 25.2-19.81 43.2-43.222 43.2z" fill="#fff"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M255.204 406.4c18.009-37.8 54.028-63 95.449-63 61.231 1.8 108.055 52.2 106.254 113.4v203.4c3.602 21.6 23.412 37.8 45.023 34.2 18.009-1.8 32.416-16.2 34.217-34.2V455c-1.801-61.2 46.824-111.6 106.254-113.4 39.621 0 75.639 21.6 93.648 59.4 68.435 133.2 14.407 295.2-117.06 363.6C487.523 833 325.44 779 258.806 647.6c-39.62-75.6-39.62-165.6-3.602-241.2zM426.291 140h151.277v59.4c-25.212-5.4-52.226-9-77.439-9-25.213 0-50.426 3.6-75.639 7.2l1.801-57.6zm414.211 388.8c0-122.4-66.634-235.8-172.888-295.2V140h64.833c25.213 0 45.023-19.8 45.023-45s-21.611-45-45.023-45H271.413C246.2 51.8 226.39 71.6 226.39 96.8c0 25.2 19.81 45 45.023 45h66.633v91.8c-163.883 90-230.517 298.8-135.068 459 3.602 5.4-3.602-5.4 0 0C338.046 930.2 687.424 948.2 802.683 950c10.805 0 19.81-3.6 27.014-10.8 7.203-7.2 10.805-18 10.805-27V528.8z" fill="#50575E"/> </svg>',
    default: true
  },
  'tutor-lms-elementor-addons': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 195.8l209.2 86.1c9.8 4 20.2 6.1 30.8 6.1s21-2.1 30.8-6.1l242.4-99.8c9-3.7 14.8-12.4 14.8-22.1s-5.8-18.4-14.8-22.1L318.8 38.1C309 34.1 298.6 32 288 32s-21 2.1-30.8 6.1L14.8 137.9C5.8 141.6 0 150.3 0 160L0 456c0 13.3 10.7 24 24 24s24-10.7 24-24l0-260.2zm48 71.7L96 384c0 53 86 96 192 96s192-43 192-96l0-116.6-142.9 58.9c-15.6 6.4-32.2 9.7-49.1 9.7s-33.5-3.3-49.1-9.7L96 267.4z"/></svg>',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Blocks for learning', 'athemes-starter-sites'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enhance your online learning platform with Elementor addons.', 'athemes-starter-sites'),
    plugin_icon: '<svg fill="#50575E" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1139"> <defs/> <path fill-rule="evenodd" clip-rule="evenodd" d="M341.652 622.4c-23.412 0-43.222-19.8-43.222-43.2v-99c0-23.4 19.81-43.2 43.222-43.2 23.412 0 43.222 19.8 43.222 43.2v99c0 23.4-18.009 43.2-43.222 43.2 1.801 0 1.801 0 0 0zM655.01 622.4c-23.412 0-43.222-18-43.222-43.2v-99c0-23.4 19.81-43.2 43.222-43.2 23.412 0 43.222 19.8 43.222 43.2v99c0 25.2-19.81 43.2-43.222 43.2z" fill="#fff"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M255.204 406.4c18.009-37.8 54.028-63 95.449-63 61.231 1.8 108.055 52.2 106.254 113.4v203.4c3.602 21.6 23.412 37.8 45.023 34.2 18.009-1.8 32.416-16.2 34.217-34.2V455c-1.801-61.2 46.824-111.6 106.254-113.4 39.621 0 75.639 21.6 93.648 59.4 68.435 133.2 14.407 295.2-117.06 363.6C487.523 833 325.44 779 258.806 647.6c-39.62-75.6-39.62-165.6-3.602-241.2zM426.291 140h151.277v59.4c-25.212-5.4-52.226-9-77.439-9-25.213 0-50.426 3.6-75.639 7.2l1.801-57.6zm414.211 388.8c0-122.4-66.634-235.8-172.888-295.2V140h64.833c25.213 0 45.023-19.8 45.023-45s-21.611-45-45.023-45H271.413C246.2 51.8 226.39 71.6 226.39 96.8c0 25.2 19.81 45 45.023 45h66.633v91.8c-163.883 90-230.517 298.8-135.068 459 3.602 5.4-3.602-5.4 0 0C338.046 930.2 687.424 948.2 802.683 950c10.805 0 19.81-3.6 27.014-10.8 7.203-7.2 10.805-18 10.805-27V528.8z" fill="#50575E"/> </svg>',
    default: true
  },
  'wp-mail-smtp': {
    icon: '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.5 0C15.3125 0 16 0.6875 16 1.5C16 2 15.75 2.4375 15.375 2.71875L8.59375 7.8125C8.21875 8.09375 7.75 8.09375 7.375 7.8125L0.59375 2.71875C0.21875 2.4375 0 2 0 1.5C0 0.6875 0.65625 0 1.5 0H14.5ZM6.78125 8.625C7.5 9.15625 8.46875 9.15625 9.1875 8.625L16 3.5V10C16 11.125 15.0938 12 14 12H2C0.875 12 0 11.125 0 10V3.5L6.78125 8.625Z" fill="#335EEA"/></svg>',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Reliably send emails', 'athemes-starter-sites'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Securely send emails from your WordPress site with a reliable SMTP service.', 'athemes-starter-sites'),
    plugin_icon: '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" fill="none"> <path d="M0.0102539 12.0336V37.0918C0.0102539 40.65 1.87122 42.4286 5.59314 42.4276L29.7673 42.4187V34.9768H44.651V27.5558L46.126 26.0674L50.6045 26.0466V12.0336C50.6045 8.47636 48.7435 6.69775 45.0216 6.69775H5.59314C1.87122 6.69775 0.0102539 8.47636 0.0102539 12.0336ZM5.24486 15.8617C4.83013 15.5067 4.56092 15.0112 4.48877 14.47C4.43221 14.1583 4.43918 13.8384 4.50926 13.5295C4.57934 13.2205 4.71108 12.9289 4.89658 12.6721C5.07437 12.394 5.31363 12.1604 5.59593 11.9893C5.87823 11.8182 6.19603 11.7142 6.52486 11.6853C7.18145 11.5988 7.8464 11.7647 8.38532 12.1497L25.3662 23.6339L42.2309 12.1497C42.797 11.7766 43.4754 11.6124 44.1494 11.6853C44.4755 11.7241 44.7896 11.8322 45.0704 12.0024C45.3513 12.1726 45.5924 12.4009 45.7777 12.6721C45.9788 12.9205 46.12 13.2119 46.1905 13.5237C46.2609 13.8355 46.2587 14.1593 46.184 14.47C46.0748 15.0115 45.7883 15.5011 45.3699 15.8617L25.3662 32.335L5.24486 15.8617Z" fill="#50575E"/> <path d="M32.7441 48.3721H47.6279L47.6145 55.2544C47.6134 55.5862 47.7109 55.911 47.8946 56.1874C48.0783 56.4638 48.34 56.6794 48.6464 56.8069C48.9528 56.9345 49.2901 56.9682 49.6157 56.9037C49.9413 56.8393 50.2404 56.6797 50.4751 56.445L62.7542 44.1868C62.9102 44.0311 63.0339 43.8462 63.1183 43.6427C63.2028 43.4391 63.2462 43.2209 63.2462 43.0006C63.2462 42.7802 63.2028 42.562 63.1183 42.3585C63.0339 42.1549 62.9102 41.97 62.7542 41.8143L50.4751 29.5487C50.2404 29.3141 49.9413 29.1544 49.6157 29.09C49.2901 29.0256 48.9528 29.0592 48.6464 29.1868C48.34 29.3143 48.0783 29.53 47.8946 29.8064C47.7109 30.0828 47.6134 30.4075 47.6145 30.7394V37.9818L32.7441 37.9535V48.3721Z" fill="#50575E"/> </svg>'
  },
  'all-in-one-seo-pack': {
    icon: '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13 6.5C13 7.9375 12.5312 9.28125 11.75 10.3438L15.6875 14.3125C16.0938 14.6875 16.0938 15.3438 15.6875 15.7188C15.3125 16.125 14.6562 16.125 14.2812 15.7188L10.3125 11.75C9.25 12.5625 7.90625 13 6.5 13C2.90625 13 0 10.0938 0 6.5C0 2.9375 2.90625 0 6.5 0C10.0625 0 13 2.9375 13 6.5ZM6.5 11C8.09375 11 9.5625 10.1562 10.375 8.75C11.1875 7.375 11.1875 5.65625 10.375 4.25C9.5625 2.875 8.09375 2 6.5 2C4.875 2 3.40625 2.875 2.59375 4.25C1.78125 5.65625 1.78125 7.375 2.59375 8.75C3.40625 10.1562 4.875 11 6.5 11Z" fill="#335EEA"/></svg>',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('SEO Search & Visibility', 'athemes-starter-sites'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Optimize your site for search engines with a powerful SEO tools.', 'athemes-starter-sites'),
    plugin_icon: '<svg viewBox="0 0 20 20" width="16" height="16" fill="#50575E" xmlns="http://www.w3.org/2000/svg" class="aioseo-gear"> <path fill-rule="evenodd" clip-rule="evenodd" d="M9.98542 19.9708C15.5002 19.9708 19.9708 15.5002 19.9708 9.98542C19.9708 4.47063 15.5002 0 9.98542 0C4.47063 0 0 4.47063 0 9.98542C0 15.5002 4.47063 19.9708 9.98542 19.9708ZM8.39541 3.65464C8.26016 3.4485 8.0096 3.35211 7.77985 3.43327C7.51816 3.52572 7.26218 3.63445 7.01349 3.7588C6.79519 3.86796 6.68566 4.11731 6.73372 4.36049L6.90493 5.22694C6.949 5.44996 6.858 5.6763 6.68522 5.82009C6.41216 6.04734 6.16007 6.30426 5.93421 6.58864C5.79383 6.76539 5.57233 6.85907 5.35361 6.81489L4.50424 6.6433C4.26564 6.5951 4.02157 6.70788 3.91544 6.93121C3.85549 7.05738 3.79889 7.1862 3.74583 7.31758C3.69276 7.44896 3.64397 7.58105 3.59938 7.71369C3.52048 7.94847 3.61579 8.20398 3.81839 8.34133L4.53958 8.83027C4.72529 8.95617 4.81778 9.1819 4.79534 9.40826C4.75925 9.77244 4.76072 10.136 4.79756 10.4936C4.82087 10.7198 4.72915 10.9459 4.54388 11.0724L3.82408 11.5642C3.62205 11.7022 3.52759 11.9579 3.60713 12.1923C3.69774 12.4593 3.8043 12.7205 3.92615 12.9743C4.03313 13.1971 4.27749 13.3088 4.51581 13.2598L5.36495 13.0851C5.5835 13.0401 5.80533 13.133 5.94623 13.3093C6.16893 13.5879 6.42071 13.8451 6.6994 14.0756C6.87261 14.2188 6.96442 14.4448 6.92112 14.668L6.75296 15.5348C6.70572 15.7782 6.81625 16.0273 7.03511 16.1356C7.15876 16.1967 7.285 16.2545 7.41375 16.3086C7.54251 16.3628 7.67196 16.4126 7.80195 16.4581C8.18224 16.5912 8.71449 16.1147 9.108 15.7625C9.30205 15.5888 9.42174 15.343 9.42301 15.0798C9.42301 15.0784 9.42302 15.077 9.42302 15.0756L9.42301 13.6263C9.42301 13.6109 9.4236 13.5957 9.42476 13.5806C8.26248 13.2971 7.39838 12.2301 7.39838 10.9572V9.41823C7.39838 9.30125 7.49131 9.20642 7.60596 9.20642H8.32584V7.6922C8.32584 7.48312 8.49193 7.31364 8.69683 7.31364C8.90171 7.31364 9.06781 7.48312 9.06781 7.6922V9.20642H11.0155V7.6922C11.0155 7.48312 11.1816 7.31364 11.3865 7.31364C11.5914 7.31364 11.7575 7.48312 11.7575 7.6922V9.20642H12.4773C12.592 9.20642 12.6849 9.30125 12.6849 9.41823V10.9572C12.6849 12.2704 11.7653 13.3643 10.5474 13.6051C10.5477 13.6121 10.5478 13.6192 10.5478 13.6263L10.5478 15.0694C10.5478 15.3377 10.6711 15.5879 10.871 15.7622C11.2715 16.1115 11.8129 16.5837 12.191 16.4502C12.4527 16.3577 12.7086 16.249 12.9573 16.1246C13.1756 16.0155 13.2852 15.7661 13.2371 15.5229L13.0659 14.6565C13.0218 14.4334 13.1128 14.2071 13.2856 14.0633C13.5587 13.8361 13.8107 13.5792 14.0366 13.2948C14.177 13.118 14.3985 13.0244 14.6172 13.0685L15.4666 13.2401C15.7052 13.2883 15.9493 13.1756 16.0554 12.9522C16.1153 12.8261 16.1719 12.6972 16.225 12.5659C16.2781 12.4345 16.3269 12.3024 16.3714 12.1698C16.4503 11.935 16.355 11.6795 16.1524 11.5421L15.4312 11.0532C15.2455 10.9273 15.153 10.7015 15.1755 10.4752C15.2116 10.111 15.2101 9.74744 15.1733 9.38986C15.1499 9.16361 15.2417 8.93757 15.4269 8.811L16.1467 8.31927C16.3488 8.18126 16.4432 7.92558 16.3637 7.69115C16.2731 7.42411 16.1665 7.16292 16.0447 6.90915C15.9377 6.68638 15.6933 6.57462 15.455 6.62366L14.6059 6.79837C14.3873 6.84334 14.1655 6.75048 14.0246 6.57418C13.8019 6.29554 13.5501 6.03832 13.2714 5.80784C13.0982 5.6646 13.0064 5.43858 13.0497 5.2154L13.2179 4.34868C13.2651 4.10521 13.1546 3.85616 12.9357 3.74787C12.8121 3.68669 12.6858 3.62895 12.5571 3.5748C12.4283 3.52065 12.2989 3.47086 12.1689 3.42537C11.9388 3.34485 11.6884 3.44211 11.5538 3.64884L11.0746 4.38475C10.9513 4.57425 10.73 4.66862 10.5082 4.64573C10.1513 4.6089 9.79502 4.61039 9.44459 4.64799C9.22286 4.67177 9.00134 4.57818 8.87731 4.38913L8.39541 3.65464Z" fill="#50575E" /> </svg>'
  },
  'sugar-calendar-lite': {
    icon: '<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5 1V2H9V1C9 0.46875 9.4375 0 10 0C10.5312 0 11 0.46875 11 1V2H12.5C13.3125 2 14 2.6875 14 3.5V5H0V3.5C0 2.6875 0.65625 2 1.5 2H3V1C3 0.46875 3.4375 0 4 0C4.53125 0 5 0.46875 5 1ZM0 6H14V14.5C14 15.3438 13.3125 16 12.5 16H1.5C0.65625 16 0 15.3438 0 14.5V6ZM2 9.5C2 9.78125 2.21875 10 2.5 10H3.5C3.75 10 4 9.78125 4 9.5V8.5C4 8.25 3.75 8 3.5 8H2.5C2.21875 8 2 8.25 2 8.5V9.5ZM6 9.5C6 9.78125 6.21875 10 6.5 10H7.5C7.75 10 8 9.78125 8 9.5V8.5C8 8.25 7.75 8 7.5 8H6.5C6.21875 8 6 8.25 6 8.5V9.5ZM10.5 8C10.2188 8 10 8.25 10 8.5V9.5C10 9.78125 10.2188 10 10.5 10H11.5C11.75 10 12 9.78125 12 9.5V8.5C12 8.25 11.75 8 11.5 8H10.5ZM2 13.5C2 13.7812 2.21875 14 2.5 14H3.5C3.75 14 4 13.7812 4 13.5V12.5C4 12.25 3.75 12 3.5 12H2.5C2.21875 12 2 12.25 2 12.5V13.5ZM6.5 12C6.21875 12 6 12.25 6 12.5V13.5C6 13.7812 6.21875 14 6.5 14H7.5C7.75 14 8 13.7812 8 13.5V12.5C8 12.25 7.75 12 7.5 12H6.5ZM10 13.5C10 13.7812 10.2188 14 10.5 14H11.5C11.75 14 12 13.7812 12 13.5V12.5C12 12.25 11.75 12 11.5 12H10.5C10.2188 12 10 12.25 10 12.5V13.5Z" fill="#335EEA"/></svg>',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Event Calendar', 'athemes-starter-sites'),
    description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Easily create and manage your events, sell tickets, and more.', 'athemes-starter-sites'),
    plugin_icon: '<svg xmlns="http://www.w3.org/2000/svg" width="39" height="38" viewBox="0 0 39 38" fill="none"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.52254 1.88902C8.52254 1.40578 8.7422 0.922543 9.09364 0.571098C9.48902 0.219653 9.97225 0 10.4994 0C11.0266 0 11.5538 0.219653 11.9052 0.571098C12.2566 0.922543 12.4763 1.36185 12.4763 1.88902L25.5676 1.88902C25.5676 1.40578 25.7873 0.922543 26.1387 0.571098C26.4902 0.219653 27.0173 0 27.5445 0C28.0717 0 28.5988 0.219653 28.9503 0.571098C29.3017 0.922543 29.5214 1.36185 29.5214 1.88902L30.1803 1.88902C34.5295 1.88902 38.0439 5.40347 38.0439 9.7526L38.0439 30.1364C38.0439 34.4855 34.5295 38 30.1803 38L7.86358 38C3.51445 38 0 34.4855 0 30.1364L0 9.7526C0 5.40347 3.51445 1.88902 7.86358 1.88902H8.52254ZM33.2116 28.2913C33.2116 29.6532 32.6844 30.9272 31.7179 31.8936C30.7514 32.8601 29.4775 33.3873 28.1156 33.3873L9.92832 33.3873C7.11676 33.3873 4.83237 31.1029 4.83237 28.2913V27.3688C4.83237 27.3688 4.96416 27.0613 5.09595 27.0613L23.5468 27.0613C24.689 27.0613 25.5676 26.1827 25.5676 25.0405C25.5676 23.9422 24.6451 23.0197 23.5468 23.0197L7.11676 23.0197C6.50173 23.0197 5.93064 22.8 5.49133 22.3607C5.05202 21.9214 4.83237 21.3503 4.83237 20.7792L4.83237 10.104C4.83237 9.13757 5.22775 8.21503 5.88671 7.55607C6.54566 6.89711 7.46821 6.50173 8.43468 6.50173C8.43468 6.50173 8.43468 6.50173 8.47861 6.50173C8.47861 6.50173 8.47861 6.50173 8.47861 6.54566C8.47861 7.51214 9.26936 8.30289 10.2358 8.30289H10.7191C11.6855 8.30289 12.4763 7.51214 12.4763 6.54566C12.4763 6.54566 12.4763 6.4578 12.5642 6.4578L25.4798 6.4578C25.4798 6.4578 25.5676 6.4578 25.5676 6.54566C25.5676 7.51214 26.3584 8.30289 27.3249 8.30289L27.8081 8.30289C28.7746 8.30289 29.5653 7.51214 29.5653 6.54566V6.50173C29.5653 6.50173 29.5653 6.50173 29.6092 6.50173C31.6301 6.50173 33.2116 8.12717 33.2116 10.104V12.5202C33.2116 12.5202 33.0798 12.8277 32.948 12.8277L14.541 12.8277C13.4428 12.8277 12.5202 13.7064 12.5202 14.8486C12.5202 15.9468 13.4428 16.8694 14.541 16.8694H30.9711C31.5861 16.8694 32.1572 17.089 32.5965 17.5283C33.0358 17.9676 33.2555 18.5387 33.2555 19.1098L33.2555 28.2913H33.2116Z" fill="#50575E"/> </svg>'
  }
};
const DEFAULT_ICON = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H5V7h14v12zm-7-2l-4-4 1.41-1.41L12 14.17l5.59-5.59L19 10l-7 7z" fill="currentColor"/></svg>';
const DEFAULT_DESCRIPTION = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Enhance your site with this feature.', 'athemes-starter-sites');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pluginInfo);

/***/ })

}]);
//# sourceMappingURL=v2_onboarding_src_components_Steps_Features_js.js.map?ver=b7593e6cb2685ba22609