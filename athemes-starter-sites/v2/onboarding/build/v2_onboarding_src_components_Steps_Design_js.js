"use strict";
(globalThis["webpackChunkathemes_starter_sites"] = globalThis["webpackChunkathemes_starter_sites"] || []).push([["v2_onboarding_src_components_Steps_Design_js"],{

/***/ "./node_modules/@wordpress/icons/build-module/library/chevron-down.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/chevron-down.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ chevron_down_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
// packages/icons/src/library/chevron-down.tsx


var chevron_down_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M17.5 11.6L12 16l-5.5-4.4.9-1.2L12 14l4.5-3.6 1 1.2z" }) });

//# sourceMappingURL=chevron-down.js.map


/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/close-small.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/close-small.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ close_small_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
// packages/icons/src/library/close-small.tsx


var close_small_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M12 13.06l3.712 3.713 1.061-1.06L13.061 12l3.712-3.712-1.06-1.06L12 10.938 8.288 7.227l-1.061 1.06L10.939 12l-3.712 3.712 1.06 1.061L12 13.061z" }) });

//# sourceMappingURL=close-small.js.map


/***/ }),

/***/ "./v2/onboarding/src/components/Controls/FilterStartersControl.js":
/*!************************************************************************!*\
  !*** ./v2/onboarding/src/components/Controls/FilterStartersControl.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Filter Starters Control component for filtering starter sites by type and category.
 *
 * @package Athemes Starter Sites
 */




/**
 * Filter Starters Control component.
 *
 * @param {Object}   props                Component props.
 * @param {Object}   props.selectedType   Currently selected type object with key and name.
 * @param {Function} props.onTypeChange   Callback when type changes.
 * @param {Object}   props.selectedCategory Currently selected category object with key and name.
 * @param {Function} props.onCategoryChange Callback when category changes.
 * @param {number}   props.resultsCount   Number of results to display.
 * @param {Array}    props.typeOptions    Array of type options with key and name.
 * @param {Array}    props.categoryOptions Array of category options with key and name.
 * @return {JSX.Element} Filter Starters Control component.
 */

function FilterStartersControl({
  selectedType,
  onTypeChange,
  selectedCategory,
  onCategoryChange,
  resultsCount,
  typeOptions,
  categoryOptions
}) {
  /**
   * Get the results count text.
   *
   * @return {string} The formatted results count text.
   */
  const getResultsText = () => {
    if (resultsCount === 0) {
      return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No results', 'athemes-starter-sites');
    }
    return (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.sprintf)(
    // translators: %d is the number of results
    (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__._n)('%d result', '%d results', resultsCount, 'athemes-starter-sites'), resultsCount);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
    className: "atss-filter-starters-control",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "atss-filter-starters-control__filters atss-form-field",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CustomSelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Type:', 'athemes-starter-sites'),
        options: typeOptions,
        value: selectedType,
        onChange: onTypeChange,
        __next40pxDefaultSize: true
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CustomSelectControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Category:', 'athemes-starter-sites'),
        options: categoryOptions,
        value: selectedCategory,
        onChange: onCategoryChange,
        __next40pxDefaultSize: true
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
      className: "atss-filter-starters-control__results text-sm text-secondary",
      children: getResultsText()
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FilterStartersControl);

/***/ }),

/***/ "./v2/onboarding/src/components/Controls/SearchStartersControl.js":
/*!************************************************************************!*\
  !*** ./v2/onboarding/src/components/Controls/SearchStartersControl.js ***!
  \************************************************************************/
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
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/chevron-down.js");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/close-small.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Search Starters Control component for filtering starter sites.
 *
 * @package Athemes Starter Sites
 */






/**
 * Search Starters Control component.
 *
 * @param {Object}   props                Component props.
 * @param {string}   props.searchValue    Current search value.
 * @param {Function} props.onSearchChange Callback when search changes.
 * @param {string}   props.selectedBuilder Currently selected builder.
 * @param {Function} props.onBuilderChange Callback when builder changes.
 * @param {Array}    props.builders       Array of builder options with value, label, and icon.
 * @return {JSX.Element} Search Starters Control component.
 */

function SearchStartersControl({
  searchValue,
  onSearchChange,
  selectedBuilder,
  onBuilderChange,
  builders = []
}) {
  const [isDropdownOpen, setIsDropdownOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const dropdownRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Get the currently selected builder object
  const currentBuilder = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => builders.find(b => b.value === selectedBuilder) || builders[0], [builders, selectedBuilder]);

  /**
   * Close dropdown when clicking outside.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  /**
   * Handle builder selection.
   *
   * @param {string} builderValue The selected builder value.
   */
  const handleBuilderSelect = builderValue => {
    onBuilderChange(builderValue);
    setIsDropdownOpen(false);
  };

  /**
   * Handle keyboard navigation in dropdown.
   *
   * @param {Object} event The keyboard event.
   */
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      setIsDropdownOpen(false);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  /**
   * Handle clearing the search input.
   */
  const handleClearSearch = () => {
    onSearchChange('');
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "atss-search-starters-control",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "atss-search-starters-control__search",
      children: [!searchValue ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("svg", {
        width: "17",
        height: "17",
        viewBox: "0 0 17 17",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: "atss-search-starters-control__search-icon",
        "aria-hidden": "true",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
          d: "M13 6.5C13 7.9375 12.5312 9.28125 11.75 10.3438L15.6875 14.3125C16.0938 14.6875 16.0938 15.3438 15.6875 15.7188C15.3125 16.125 14.6562 16.125 14.2812 15.7188L10.3125 11.75C9.25 12.5625 7.90625 13 6.5 13C2.90625 13 0 10.0938 0 6.5C0 2.9375 2.90625 0 6.5 0C10.0625 0 13 2.9375 13 6.5ZM6.5 11C8.09375 11 9.5625 10.1562 10.375 8.75C11.1875 7.375 11.1875 5.65625 10.375 4.25C9.5625 2.875 8.09375 2 6.5 2C4.875 2 3.40625 2.875 2.59375 4.25C1.78125 5.65625 1.78125 7.375 2.59375 8.75C3.40625 10.1562 4.875 11 6.5 11Z",
          fill: "#A7AAAD"
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
        type: "button",
        className: "atss-search-starters-control__clear-button",
        onClick: handleClearSearch,
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Clear search', 'athemes-starter-sites'),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
        type: "text",
        className: "atss-search-starters-control__search-input",
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search for starter template', 'athemes-starter-sites'),
        value: searchValue,
        onChange: e => onSearchChange(e.target.value),
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Search for starter template', 'athemes-starter-sites')
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "atss-search-starters-control__builder",
      ref: dropdownRef,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("button", {
        type: "button",
        className: "atss-search-starters-control__builder-button",
        onClick: () => setIsDropdownOpen(!isDropdownOpen),
        onKeyDown: handleKeyDown,
        "aria-haspopup": "listbox",
        "aria-expanded": isDropdownOpen,
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select page builder', 'athemes-starter-sites'),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "atss-search-starters-control__builder-current",
          children: [currentBuilder?.icon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
            className: "atss-search-starters-control__builder-icon",
            children: currentBuilder.icon
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
            className: "atss-search-starters-control__builder-label",
            children: currentBuilder?.label || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Builder', 'athemes-starter-sites')
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
          className: `atss-search-starters-control__builder-dropdown-icon ${isDropdownOpen ? 'is-open' : ''}`
        })]
      }), isDropdownOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "atss-search-starters-control__builder-dropdown",
        "data-dialog": true,
        role: "listbox",
        "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Page builder options', 'athemes-starter-sites'),
        children: builders.map(builder => {
          const isSelected = builder.value === selectedBuilder;
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("button", {
            type: "button",
            className: `atss-search-starters-control__builder-option ${isSelected ? 'is-selected' : ''}`,
            onClick: () => handleBuilderSelect(builder.value),
            role: "option",
            "aria-selected": isSelected,
            ...(isSelected && {
              'data-active-item': true
            }),
            children: [builder.icon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "atss-search-starters-control__builder-option-icon",
              children: builder.icon
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "atss-search-starters-control__builder-option-label",
              children: builder.label
            })]
          }, builder.value);
        })
      })]
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchStartersControl);

/***/ }),

/***/ "./v2/onboarding/src/components/Layout/Card.js":
/*!*****************************************************!*\
  !*** ./v2/onboarding/src/components/Layout/Card.js ***!
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
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/helpers */ "./v2/onboarding/src/utils/helpers.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Card component for displaying starter site templates.
 *
 * @package Athemes Starter Sites
 */





/**
 * Card component.
 *
 * @param {Object}   props             Component props.
 * @param {string}   props.id          Demo ID.
 * @param {string}   props.name        Demo name.
 * @param {string}   props.thumbnail   Thumbnail image URL.
 * @param {string}   props.preview     Preview URL (unused with image preview).
 * @param {string}   props.type        Type: 'free' or 'pro'.
 * @param {Function} props.onSelect    Callback when card is clicked.
 * @param {boolean}  props.isPreloaded Whether this card was preloaded.
 * @return {JSX.Element} Card component.
 */

function Card({
  id,
  name,
  thumbnail,
  preview,
  type,
  onSelect,
  isPreloaded = false
}) {
  const [isHovered, setIsHovered] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isScrolling, setIsScrolling] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const imgRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const previewRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);

  // Calculate scroll distance and duration when image loads
  const handleImageLoad = () => {
    if (imgRef.current && previewRef.current) {
      const displayedHeight = imgRef.current.offsetHeight;
      const containerHeight = previewRef.current.offsetHeight;
      const scrollDistance = displayedHeight - containerHeight;

      // Define scroll speeds in pixels per second
      const SCROLL_DOWN_SPEED = 200; // px/s - slower scroll down
      const SCROLL_UP_SPEED = 800; // px/s - faster scroll back up

      // Calculate durations based on distance and speed
      const scrollDownDuration = scrollDistance / SCROLL_DOWN_SPEED;
      const scrollUpDuration = scrollDistance / SCROLL_UP_SPEED;

      // Set CSS variables with the calculated values
      previewRef.current.style.setProperty('--scroll-distance', `-${scrollDistance}px`);
      previewRef.current.style.setProperty('--scroll-down-duration', `${scrollDownDuration}s`);
      previewRef.current.style.setProperty('--scroll-up-duration', `${scrollUpDuration}s`);
    }
  };

  // Build preview image URL dynamically if thumbnail not provided
  const PREVIEW_IMAGE_URL = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const themeName = window?.atssOnboarding?.themeName || 'sydney';
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_2__.getPreviewImageUrl)(id, themeName);
  }, [id]);

  // Handle card click
  const handleCardClick = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    if (onSelect) {
      onSelect(id);
    }
  }, [onSelect, id]);

  // Handle mouse enter
  const handleMouseEnter = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setIsHovered(true);
    setIsScrolling(true);
  }, []);

  // Handle mouse leave
  const handleMouseLeave = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setIsHovered(false);
    setIsScrolling(false);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  }, [handleCardClick]);

  // Determine badge text and type
  const badgeText = type === 'pro' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pro', 'athemes-starter-sites') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Free', 'athemes-starter-sites');
  const badgeClass = type === 'pro' ? 'atss-starter-card__badge--pro' : 'atss-starter-card__badge--free';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "atss-starter-card",
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleCardClick,
    role: "button",
    tabIndex: 0,
    onKeyDown: handleKeyDown,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "atss-starter-card__preview",
      ref: previewRef,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("img", {
        ref: imgRef,
        src: PREVIEW_IMAGE_URL,
        alt: name,
        className: `atss-starter-card__thumbnail ${isScrolling ? 'atss-starter-card__thumbnail--scrolling' : ''}`,
        onLoad: handleImageLoad,
        loading: "lazy"
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "atss-starter-card__info flex items-center justify-between",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: "atss-starter-card__name font-medium text-md",
        children: name || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Unnamed Demo', 'athemes-starter-sites')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
        className: `atss-starter-card__badge ${badgeClass} text-xs`,
        children: badgeText
      })]
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Card);

/***/ }),

/***/ "./v2/onboarding/src/components/Steps/Design.js":
/*!******************************************************!*\
  !*** ./v2/onboarding/src/components/Steps/Design.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Layout */ "./v2/onboarding/src/components/Layout/index.js");
/* harmony import */ var _Layout_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Layout/Card */ "./v2/onboarding/src/components/Layout/Card.js");
/* harmony import */ var _data_starter_sites__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/starter-sites */ "./v2/onboarding/src/data/starter-sites.js");
/* harmony import */ var _Controls_SearchStartersControl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Controls/SearchStartersControl */ "./v2/onboarding/src/components/Controls/SearchStartersControl.js");
/* harmony import */ var _Controls_FilterStartersControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Controls/FilterStartersControl */ "./v2/onboarding/src/components/Controls/FilterStartersControl.js");
/* harmony import */ var _data_starter_categories__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../data/starter-categories */ "./v2/onboarding/src/data/starter-categories.js");
/* harmony import */ var _context_WizardContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../context/WizardContext */ "./v2/onboarding/src/context/WizardContext.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__);
/**
 * Design step component.
 *
 * @package Athemes Starter Sites
 */











/**
 * Design step component.
 *
 * @param {Object}   props            Component props.
 * @param {Function} props.onBack     Callback to go to previous step.
 * @param {Function} props.onContinue Callback to proceed to next step.
 * @return {JSX.Element} Design component.
 */

function Design({
  onBack,
  onContinue
}) {
  const {
    wizardData,
    setPrefetchedPages,
    updateStepData,
    builder,
    setBuilder
  } = (0,_context_WizardContext__WEBPACK_IMPORTED_MODULE_8__.useWizard)();
  const starterSites = (0,_data_starter_sites__WEBPACK_IMPORTED_MODULE_4__.getStarterSites)();

  // Get the initial builder from context
  const initialBuilder = builder || 'gutenberg';

  // Build type options for the filter control
  const typeOptions = [{
    key: 'all',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All', 'athemes-starter-sites')
  }, {
    key: 'free',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Free', 'athemes-starter-sites')
  }, {
    key: 'pro',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pro', 'athemes-starter-sites')
  }];

  // Build category options for the filter control
  // Filter out 'other' as it's only for the initial selection in GettingStarted
  const categoryOptions = [{
    key: 'all',
    name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('All Categories', 'athemes-starter-sites')
  }, ..._data_starter_categories__WEBPACK_IMPORTED_MODULE_7__["default"].filter(cat => cat.key !== 'other')];

  // Initialize category from GettingStarted step if available
  const getInitialCategory = () => {
    const gettingStartedData = wizardData['getting-started'] || {};
    const savedCategory = gettingStartedData.siteCategory;
    if (savedCategory && savedCategory.key) {
      // If "Other" is selected, default to "All Categories"
      if (savedCategory.key === 'other') {
        return categoryOptions[0];
      }
      // Find matching category in categoryOptions
      const matchingCategory = categoryOptions.find(cat => cat.key === savedCategory.key);
      return matchingCategory || categoryOptions[0];
    }
    return categoryOptions[0]; // Default to "All Categories"
  };

  // State for search and builder filter
  const [searchQuery, setSearchQuery] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [selectedBuilder, setSelectedBuilder] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(builder || 'gutenberg');

  // State for type and category filters
  const [selectedType, setSelectedType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(typeOptions[0]);
  const [selectedCategory, setSelectedCategory] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(getInitialCategory());

  // Sync selectedBuilder with context builder
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setSelectedBuilder(builder || 'gutenberg');
  }, [builder]);

  // Load builder icons
  const wordpressIcon = (__webpack_require__(/*! ../../assets/images/wordpress.svg */ "./v2/onboarding/src/assets/images/wordpress.svg")["default"]);
  const elementorIcon = (__webpack_require__(/*! ../../assets/images/elementor.svg */ "./v2/onboarding/src/assets/images/elementor.svg")["default"]);

  // Builder options for the search control
  const builderOptions = [{
    value: 'gutenberg',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Block Editor', 'athemes-starter-sites'),
    icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("img", {
      src: wordpressIcon,
      alt: ""
    })
  }, {
    value: 'elementor',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Elementor', 'athemes-starter-sites'),
    icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("img", {
      src: elementorIcon,
      alt: ""
    })
  }];

  // Filter starter sites based on all filters
  const filteredSites = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return starterSites.filter(site => {
      // Filter by builder
      const matchesBuilder = site.builders?.includes(selectedBuilder);

      // Filter by type (free/pro)
      const matchesType = selectedType.key === 'all' || site.type === selectedType.key;

      // Filter by category
      const matchesCategory = selectedCategory.key === 'all' || site.categories?.includes(selectedCategory.key);

      // Filter by search query (name and categories)
      const matchesSearch = !searchQuery || site.name?.toLowerCase().includes(searchQuery.toLowerCase()) || site.categories?.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesBuilder && matchesType && matchesCategory && matchesSearch;
    });
  }, [starterSites, selectedBuilder, selectedType, selectedCategory, searchQuery]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
    className: "atss-onboarding-wizard__step atss-onboarding-wizard__step--design",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("main", {
      className: "atss-onboarding-wizard__step-body",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
        className: "atss-onboarding-wizard__step-body-content w100",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("h2", {
          className: "atss-onboarding-wizard__step-body-title text-xl font-medium",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select template to start with', 'athemes-starter-sites')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
          className: "atss-onboarding-wizard__step-body-description w100 text-sm text-secondary",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Choose a template that matches your style. You can customize everything later to make it uniquely yours', 'athemes-starter-sites')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_Controls_SearchStartersControl__WEBPACK_IMPORTED_MODULE_5__["default"], {
          searchValue: searchQuery,
          onSearchChange: setSearchQuery,
          selectedBuilder: selectedBuilder,
          onBuilderChange: value => {
            setSelectedBuilder(value);
            setBuilder(value);
          },
          builders: builderOptions
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_Controls_FilterStartersControl__WEBPACK_IMPORTED_MODULE_6__["default"], {
          selectedType: selectedType,
          onTypeChange: ({
            selectedItem
          }) => setSelectedType(selectedItem),
          selectedCategory: selectedCategory,
          onCategoryChange: ({
            selectedItem
          }) => setSelectedCategory(selectedItem),
          resultsCount: filteredSites.length,
          typeOptions: typeOptions,
          categoryOptions: categoryOptions
        }), filteredSites.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("div", {
          className: "atss-design-demos-grid",
          children: filteredSites.map(site => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_Layout_Card__WEBPACK_IMPORTED_MODULE_3__["default"], {
            id: site.id,
            name: site.name,
            thumbnail: site.thumbnail,
            preview: site.preview,
            type: site.type,
            onSelect: siteId => {
              // Clear prefetched pages when a new design is selected
              // This ensures fresh pages are fetched for the new design
              setPrefetchedPages(null);

              // Clear selected pages when a new design is selected
              // This ensures we don't have stale page IDs from a previous site
              updateStepData('pages', {
                selectedPages: []
              });

              // Check if builder has changed from the initial builder
              const hasBuilderChanged = selectedBuilder !== initialBuilder;

              // If builder changed, clear features data
              if (hasBuilderChanged) {
                updateStepData('features', {});
              }

              // Save the selected demo
              onContinue({
                selectedSiteId: siteId
              });
            }
          }, site.id))
        }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsxs)("div", {
          className: "text-center text-secondary",
          style: {
            marginTop: '24px'
          },
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No templates found.', 'athemes-starter-sites')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Try adjusting your search or filter criteria.', 'athemes-starter-sites')
          })]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_9__.jsx)(_Layout__WEBPACK_IMPORTED_MODULE_2__.Footer, {
      showBack: true,
      showSkip: false,
      showContinue: false,
      onBack: onBack
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Design);

/***/ }),

/***/ "./v2/onboarding/src/data/starter-sites.js":
/*!*************************************************!*\
  !*** ./v2/onboarding/src/data/starter-sites.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getOnboardingSettings: () => (/* binding */ getOnboardingSettings),
/* harmony export */   getRawDemos: () => (/* binding */ getRawDemos),
/* harmony export */   getStarterSiteById: () => (/* binding */ getStarterSiteById),
/* harmony export */   getStarterSites: () => (/* binding */ getStarterSites),
/* harmony export */   getThemeName: () => (/* binding */ getThemeName)
/* harmony export */ });
/**
 * Starter sites data getter.
 *
 * @package Athemes Starter Sites
 */

/**
 * Get the raw demos object from the localized data.
 *
 * @return {Object} The demos object.
 */
const getRawDemos = () => {
  return window.atssOnboarding?.demos || {};
};

/**
 * Get all available starter sites as an array.
 *
 * @return {Array} Array of demo objects.
 */
const getStarterSites = () => {
  const demos = getRawDemos();
  return Object.entries(demos).map(([id, data]) => ({
    id,
    ...data
  }));
};

/**
 * Get a single starter site by its ID.
 *
 * @param {string} id The demo ID.
 * @return {Object|null} The demo object or null if not found.
 */
const getStarterSiteById = id => {
  const demos = getRawDemos();
  return demos[id] ? {
    id,
    ...demos[id]
  } : null;
};

/**
 * Get the onboarding settings.
 *
 * @return {Object} The settings object.
 */
const getOnboardingSettings = () => {
  return window.atssOnboarding?.settings || {};
};

/**
 * Get the current theme name.
 *
 * @return {string} The theme name (e.g., 'sydney', 'botiga').
 */
const getThemeName = () => {
  return window.atssOnboarding?.themeName || 'sydney';
};

/***/ })

}]);
//# sourceMappingURL=v2_onboarding_src_components_Steps_Design_js.js.map?ver=2ef358ff1506053b63f2