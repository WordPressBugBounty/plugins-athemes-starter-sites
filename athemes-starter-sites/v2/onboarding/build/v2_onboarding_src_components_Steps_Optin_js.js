"use strict";
(globalThis["webpackChunkathemes_starter_sites"] = globalThis["webpackChunkathemes_starter_sites"] || []).push([["v2_onboarding_src_components_Steps_Optin_js"],{

/***/ "./v2/onboarding/src/assets/images/hands.png":
/*!***************************************************!*\
  !*** ./v2/onboarding/src/assets/images/hands.png ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/hands.03c96543.png";

/***/ }),

/***/ "./v2/onboarding/src/assets/images/heart.gif":
/*!***************************************************!*\
  !*** ./v2/onboarding/src/assets/images/heart.gif ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/heart.409baa78.gif";

/***/ }),

/***/ "./v2/onboarding/src/assets/images/optin-botiga.jpg":
/*!**********************************************************!*\
  !*** ./v2/onboarding/src/assets/images/optin-botiga.jpg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/optin-botiga.c6cceeff.jpg";

/***/ }),

/***/ "./v2/onboarding/src/assets/images/optin-sydney.jpg":
/*!**********************************************************!*\
  !*** ./v2/onboarding/src/assets/images/optin-sydney.jpg ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/optin-sydney.4ef21437.jpg";

/***/ }),

/***/ "./v2/onboarding/src/assets/images/optin.jpg":
/*!***************************************************!*\
  !*** ./v2/onboarding/src/assets/images/optin.jpg ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/optin.c6cceeff.jpg";

/***/ }),

/***/ "./v2/onboarding/src/components/Steps/Optin.js":
/*!*****************************************************!*\
  !*** ./v2/onboarding/src/components/Steps/Optin.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _context_WizardContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/WizardContext */ "./v2/onboarding/src/context/WizardContext.js");
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Layout */ "./v2/onboarding/src/components/Layout/index.js");
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/helpers */ "./v2/onboarding/src/utils/helpers.js");
/* harmony import */ var _assets_images_optin_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../assets/images/optin.jpg */ "./v2/onboarding/src/assets/images/optin.jpg");
/* harmony import */ var _assets_images_optin_sydney_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../assets/images/optin-sydney.jpg */ "./v2/onboarding/src/assets/images/optin-sydney.jpg");
/* harmony import */ var _assets_images_optin_botiga_jpg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../assets/images/optin-botiga.jpg */ "./v2/onboarding/src/assets/images/optin-botiga.jpg");
/* harmony import */ var _assets_images_hands_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../assets/images/hands.png */ "./v2/onboarding/src/assets/images/hands.png");
/* harmony import */ var _assets_images_heart_gif__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../assets/images/heart.gif */ "./v2/onboarding/src/assets/images/heart.gif");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);
/**
 * Optin step component.
 *
 * @package Athemes Starter Sites
 */













/**
 * Optin step component.
 *
 * @param {Object}   props            Component props.
 * @param {Function} props.onBack     Callback to go to previous step.
 * @param {Function} props.onContinue Callback to proceed to next step.
 * @return {JSX.Element} Optin component.
 */

function Optin({
  onBack,
  onContinue
}) {
  const {
    wizardData
  } = (0,_context_WizardContext__WEBPACK_IMPORTED_MODULE_3__.useWizard)();
  const savedData = wizardData.optin || {};
  const [email, setEmail] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(savedData.email || window.atssOnboarding?.adminEmail || '');
  const [emailTouched, setEmailTouched] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [emailError, setEmailError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [optinChecked, setOptinChecked] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(savedData.optinChecked !== undefined ? savedData.optinChecked : true);

  /**
   * Determine which optin image to use based on theme name.
   */
  const optinImage = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const themeName = window.atssOnboarding?.themeName || 'sydney';
    const normalizedThemeName = themeName.toLowerCase();
    if (normalizedThemeName.includes('botiga')) {
      return _assets_images_optin_botiga_jpg__WEBPACK_IMPORTED_MODULE_8__;
    } else if (normalizedThemeName.includes('sydney')) {
      return _assets_images_optin_sydney_jpg__WEBPACK_IMPORTED_MODULE_7__;
    }
    return _assets_images_optin_jpg__WEBPACK_IMPORTED_MODULE_6__;
  }, []);

  /**
   * Handle email field blur event.
   */
  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (email && !(0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__.validateEmail)(email)) {
      setEmailError((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Please enter a valid email address', 'athemes-starter-sites'));
    } else {
      setEmailError('');
    }
  };

  /**
   * Handle email field change event.
   */
  const handleEmailChange = value => {
    setEmail(value);
    // Clear error if email becomes valid
    if (emailTouched && emailError && (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_5__.validateEmail)(value)) {
      setEmailError('');
    }
  };

  /**
   * Handle opt-in checkbox toggle.
   */
  const handleOptinToggle = () => {
    setOptinChecked(!optinChecked);
  };

  /**
   * Handle continue button click.
   */
  const handleContinue = () => {
    onContinue({
      email,
      optinChecked
    });
  };

  /**
   * Handle skip button click.
   */
  const handleSkip = () => {
    onContinue({
      email: '',
      optinChecked: false
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
    className: "atss-onboarding-wizard__step atss-onboarding-wizard__step--optin",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("main", {
      className: "atss-onboarding-wizard__step-body",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: "atss-onboarding-wizard__step-body-content w100",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("img", {
          src: optinImage,
          alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Optin', 'athemes-starter-sites'),
          width: "1200",
          height: "536"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
          className: "atss-onboarding-wizard__step-body-content-inner",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("h2", {
            className: "atss-onboarding-wizard__step-body-title text-xl font-medium",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Stay Updated with Latest Features & Releases', 'athemes-starter-sites')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("p", {
            className: "atss-onboarding-wizard__step-body-description text-sm text-secondary",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Subscribe to our newsletter to get notified about new updates, features, and releases', 'athemes-starter-sites')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            className: `atss-form-field w100${emailError ? ' atss-form-field--has-error' : ''}`,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Email', 'athemes-starter-sites'),
              value: email,
              onChange: handleEmailChange,
              onBlur: handleEmailBlur,
              type: "email",
              pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
              required: true,
              __next40pxDefaultSize: true,
              __nextHasNoMarginBottom: true
            }), emailError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
              className: "atss-form-field__error",
              children: emailError
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("p", {
            className: "text-xs text-tertiary text-align-left",
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Your email is needed so you can receive community exclusive recommendations.', 'athemes-starter-sites')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            className: "atss-optin-box",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
              className: "atss-optin-box__icon",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("img", {
                src: _assets_images_hands_png__WEBPACK_IMPORTED_MODULE_9__,
                alt: ""
              }), !optinChecked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("img", {
                src: _assets_images_heart_gif__WEBPACK_IMPORTED_MODULE_10__,
                alt: "",
                className: "atss-optin-box__icon-overlay"
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
              className: "atss-optin-box__text",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("h3", {
                className: "atss-optin-box__title",
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Help make Sydney better for all!', 'athemes-starter-sites')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("p", {
                className: "atss-optin-box__description",
                children: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('By enabling you agree to our <a>Terms of Service</a> and to share your non-sensitive information with aThemes.', 'athemes-starter-sites'), {
                  a: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("a", {
                    href: "https://athemes.com/terms/",
                    target: "_blank",
                    rel: "noopener noreferrer"
                  })
                })
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("button", {
              type: "button",
              className: `atss-optin-box__checkbox ${optinChecked ? 'atss-optin-box__checkbox--checked' : ''}`,
              onClick: handleOptinToggle,
              "aria-checked": optinChecked,
              "aria-label": optinChecked ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Disable usage tracking', 'athemes-starter-sites') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Enable usage tracking', 'athemes-starter-sites'),
              children: optinChecked && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("svg", {
                width: "12",
                height: "10",
                viewBox: "0 0 12 10",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "atss-optin-box__checkmark",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                  d: "M1 5L4.5 8.5L11 1",
                  stroke: "white",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })
              })
            })]
          })]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Layout__WEBPACK_IMPORTED_MODULE_4__.Footer, {
      showBack: true,
      showSkip: true,
      continueText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Start Import', 'athemes-starter-sites'),
      onBack: onBack,
      onSkip: handleSkip,
      onContinue: handleContinue
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Optin);

/***/ })

}]);
//# sourceMappingURL=v2_onboarding_src_components_Steps_Optin_js.js.map?ver=0c45f94b423ecf0e54fa