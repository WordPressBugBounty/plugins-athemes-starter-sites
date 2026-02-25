"use strict";
(globalThis["webpackChunkathemes_starter_sites"] = globalThis["webpackChunkathemes_starter_sites"] || []).push([["v2_onboarding_src_components_Steps_Pages_js"],{

/***/ "./v2/onboarding/src/components/Steps/Pages.js":
/*!*****************************************************!*\
  !*** ./v2/onboarding/src/components/Steps/Pages.js ***!
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
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Layout */ "./v2/onboarding/src/components/Layout/index.js");
/* harmony import */ var _context_WizardContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../context/WizardContext */ "./v2/onboarding/src/context/WizardContext.js");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../utils/api */ "./v2/onboarding/src/utils/api.js");
/* harmony import */ var _data_starter_sites__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../data/starter-sites */ "./v2/onboarding/src/data/starter-sites.js");
/* harmony import */ var _data_color_schemes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../data/color-schemes */ "./v2/onboarding/src/data/color-schemes.js");
/* harmony import */ var _data_typography_pairs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../data/typography-pairs */ "./v2/onboarding/src/data/typography-pairs.js");
/* harmony import */ var _utils_preload_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../utils/preload-helpers */ "./v2/onboarding/src/utils/preload-helpers.js");
/* harmony import */ var _utils_preview_bridge__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../utils/preview-bridge */ "./v2/onboarding/src/utils/preview-bridge.js");
/* harmony import */ var _utils_use_preview_sync__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../utils/use-preview-sync */ "./v2/onboarding/src/utils/use-preview-sync.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);
/**
 * Pages step component.
 *
 * @package Athemes Starter Sites
 */













/**
 * Transform color scheme data to preview-compatible format.
 *
 * @param {string} schemeId       The selected color scheme ID.
 * @param {Array}  colorSchemes   Array of available color schemes.
 * @param {Object} customColors   Custom generated colors (if scheme is 'custom').
 * @return {Object|null} Color data ready for preview, or null if not available.
 */

const transformColors = (schemeId, colorSchemes, customColors) => {
  if (!schemeId) {
    return null;
  }

  // Handle custom colors
  if (schemeId === 'custom') {
    if (!customColors || typeof customColors !== 'object' || Object.keys(customColors).length === 0) {
      return null;
    }
    return customColors;
  }

  // Find the selected scheme
  const selectedScheme = colorSchemes.find(scheme => scheme.id === schemeId);
  if (!selectedScheme || !selectedScheme.colors) {
    return null;
  }
  return selectedScheme.colors;
};

/**
 * Pages step component.
 *
 * @param {Object}   props                  Component props.
 * @param {Function} props.onBack           Callback to go to previous step.
 * @param {Function} props.onContinue       Callback to proceed to next step.
 * @param {boolean}  props.navigationLoading Whether navigation is in loading state.
 * @param {string}   props.navigationError   Navigation error message.
 * @return {JSX.Element} Pages component.
 */
function Pages({
  onBack,
  onContinue,
  navigationLoading,
  navigationError
}) {
  const {
    wizardData,
    prefetchedPages,
    siteTitle,
    builder
  } = (0,_context_WizardContext__WEBPACK_IMPORTED_MODULE_3__.useWizard)();
  const iframeRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const [pages, setPages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [selectedPages, setSelectedPages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [currentPreviewPage, setCurrentPreviewPage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [isIframeLoading, setIsIframeLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);

  // Get customization data from the Customize step
  const customizeData = wizardData.customize || {};
  const designData = wizardData.design || {};
  const selectedSiteId = designData.selectedSiteId;

  // Get theme data for color schemes and typography pairs
  const themeName = (0,_data_starter_sites__WEBPACK_IMPORTED_MODULE_5__.getThemeName)();
  const selectedSite = (0,_data_starter_sites__WEBPACK_IMPORTED_MODULE_5__.getStarterSiteById)(selectedSiteId);
  const colorSchemes = (0,_data_color_schemes__WEBPACK_IMPORTED_MODULE_6__.getColorSchemesForSite)(selectedSite, themeName);
  const typographyPairs = (0,_data_typography_pairs__WEBPACK_IMPORTED_MODULE_7__.getTypographyPairsForSite)(selectedSite, themeName);

  // Initialize preview bridge for this iframe
  (0,_utils_use_preview_sync__WEBPACK_IMPORTED_MODULE_10__.usePreviewBridgeInit)(iframeRef);

  /**
   * Build customizations object from wizard data.
   */
  const getCustomizations = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    const updates = {};

    // Get colors
    const colors = transformColors(customizeData.selectedColorScheme || '', colorSchemes, customizeData.customColors || {});
    if (colors) {
      updates.colors = colors;
    }

    // Get logo
    const siteLogo = customizeData.siteLogo || {
      url: '',
      id: 0
    };
    const logoHeight = customizeData.logoHeight ?? 100;
    if (siteLogo.url) {
      updates.logo = {
        ...siteLogo,
        height: logoHeight
      };
      updates.logoHeight = logoHeight;
    }

    // Get site title
    updates.title = siteTitle;
    updates.showTitle = customizeData.showSiteTitle ?? true;

    // Get typography
    const selectedTypographyId = customizeData.selectedTypographyPair || '';
    if (selectedTypographyId) {
      const selectedPair = typographyPairs.find(pair => pair.id === selectedTypographyId);
      if (selectedPair) {
        updates.typography = selectedPair;
      }
    }
    return updates;
  }, [customizeData, colorSchemes, typographyPairs, siteTitle]);

  // Set pending customizations when component mounts or customizations change
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const customizations = getCustomizations();
    if (Object.keys(customizations).length > 0) {
      _utils_preview_bridge__WEBPACK_IMPORTED_MODULE_9__["default"].setPendingCustomizations(customizations);
    }
  }, [getCustomizations]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchPages = async () => {
      const designData = wizardData.design;

      // Check if we have a selected site.
      if (!designData?.selectedSiteId) {
        return;
      }

      // Use prefetched pages if available (from Customize step)
      if (prefetchedPages && prefetchedPages.length > 0) {
        setPages(prefetchedPages);

        // Load previously selected pages from wizard state if available,
        // otherwise select all pages by default.
        const previouslySelected = wizardData.pages?.selectedPages;
        if (previouslySelected && Array.isArray(previouslySelected) && previouslySelected.length > 0) {
          setSelectedPages(previouslySelected);
        } else {
          const allPageIds = prefetchedPages.map(page => page.id);
          setSelectedPages(allPageIds);
        }

        // Set the first page as the default preview page
        if (prefetchedPages.length > 0) {
          setCurrentPreviewPage(prefetchedPages[0]);
        }
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const pagesData = await (0,_utils_api__WEBPACK_IMPORTED_MODULE_4__.getDemoPages)(designData.selectedSiteId, builder);

        // Sort pages to ensure homepage appears first
        const sortedPages = [...pagesData].sort((a, b) => {
          const aIsHome = /^(home|my front page)$/i.test(a.title.trim());
          const bIsHome = /^(home|my front page)$/i.test(b.title.trim());
          if (aIsHome && !bIsHome) {
            return -1;
          }
          if (!aIsHome && bIsHome) {
            return 1;
          }
          return 0;
        });

        // Filter out Sample Page and Test pages
        const filteredPages = sortedPages.filter(page => {
          const title = page.title.trim();
          return !/^(sample page|test)$/i.test(title);
        });
        setPages(filteredPages);

        // Load previously selected pages from wizard state if available,
        // otherwise select all pages by default.
        const previouslySelected = wizardData.pages?.selectedPages;
        if (previouslySelected && Array.isArray(previouslySelected) && previouslySelected.length > 0) {
          setSelectedPages(previouslySelected);
        } else {
          const allPageIds = filteredPages.map(page => page.id);
          setSelectedPages(allPageIds);
        }

        // Set the first page as the default preview page
        if (filteredPages.length > 0) {
          setCurrentPreviewPage(filteredPages[0]);
        }

        // Log to console for debugging.
        // eslint-disable-next-line no-console
        console.log('Demo pages loaded:', sortedPages);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch pages:', err);
        setError(err.message || 'Failed to load pages');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPages();
  }, [wizardData, prefetchedPages, builder]);

  // Handle page selection toggle
  const handlePageToggle = pageId => {
    setSelectedPages(prevSelected => {
      if (prevSelected.includes(pageId)) {
        return prevSelected.filter(id => id !== pageId);
      }
      return [...prevSelected, pageId];
    });
  };

  // Handle page click to update preview
  const handlePageClick = page => {
    if (currentPreviewPage?.id !== page.id) {
      // Reset ready state before changing page - the new page will send ATSS_PREVIEW_READY
      _utils_preview_bridge__WEBPACK_IMPORTED_MODULE_9__["default"].resetReadyState();
      setCurrentPreviewPage(page);
      setIsIframeLoading(true);
    }
  };

  // Add preconnect hints when pages are loaded for faster iframe loading
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (pages && pages.length > 0) {
      pages.forEach(page => {
        if (page.url) {
          (0,_utils_preload_helpers__WEBPACK_IMPORTED_MODULE_8__.addPreconnectHints)(page.url, 'data-atss-page-preconnect');
        }
      });
    }
  }, [pages]);

  // Add preconnect hints when preview page changes for faster iframe loading
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (currentPreviewPage?.url) {
      (0,_utils_preload_helpers__WEBPACK_IMPORTED_MODULE_8__.addPreconnectHints)(currentPreviewPage.url);
    }
  }, [currentPreviewPage?.url]);

  // Handle iframe load - initialize bridge and apply customizations
  const handleIframeLoad = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setIsIframeLoading(false);

    // Ensure the bridge has the iframe reference (needed for conditional rendering)
    if (iframeRef.current) {
      _utils_preview_bridge__WEBPACK_IMPORTED_MODULE_9__["default"].init(iframeRef.current);
    }
    // Customizations are applied automatically when ATSS_PREVIEW_READY is received
    // via the pendingCustomizations mechanism in preview-bridge.js
  }, []);

  // Handle continue - pass selected pages to parent
  const handleContinue = () => {
    onContinue({
      selectedPages
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
    className: "atss-onboarding-wizard__step-wrapper flex",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
      className: "atss-onboarding-wizard__step atss-onboarding-wizard__step--pages",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("main", {
        className: "atss-onboarding-wizard__step-body",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
          className: "flex gap-md flex-col",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("span", {
            className: "atss-control__label text-sm font-medium",
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Pages to Import', 'athemes-starter-sites'), " (", selectedPages.length, "):"]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("p", {
            className: "text-xs",
            style: {
              margin: '0'
            },
            children: selectedPages.length === 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
              style: {
                color: 'var(--atss-color-text-error)'
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select Pages to Import', 'athemes-starter-sites')
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
                className: "text-secondary",
                style: {
                  display: 'block'
                },
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Selected: ', 'athemes-starter-sites')
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("span", {
                className: "text-heading",
                children: pages.filter(page => selectedPages.includes(page.id)).map(page => page.title).join(', ')
              })]
            })
          }), error && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("p", {
            style: {
              color: 'var(--atss-color-text-error)'
            },
            children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Error: ', 'athemes-starter-sites'), error]
          }), !isLoading && !error && pages.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
            className: "atss-pages-grid",
            children: pages.map(page => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Layout__WEBPACK_IMPORTED_MODULE_2__.PageCard, {
              id: page.id,
              title: page.title,
              url: page.url,
              thumbnail: page.thumbnail,
              isSelected: selectedPages.includes(page.id),
              onToggle: handlePageToggle,
              onClick: () => handlePageClick(page)
            }, page.id))
          }), !isLoading && !error && pages.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No pages found.', 'athemes-starter-sites')
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Layout__WEBPACK_IMPORTED_MODULE_2__.Footer, {
        showBack: true,
        showSkip: false,
        continueText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Continue', 'athemes-starter-sites'),
        onBack: onBack,
        onContinue: handleContinue,
        continueDisabled: selectedPages.length === 0,
        continueLoading: navigationLoading,
        continueError: navigationError
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
      className: "atss-onboarding-wizard__preview",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
        className: "atss-onboarding-wizard__preview-inner atss-onboarding-wizard__preview-iframe--desktop",
        children: [isIframeLoading && currentPreviewPage && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
          className: "atss-onboarding-wizard__preview-loading",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_Layout__WEBPACK_IMPORTED_MODULE_2__.Spinner, {})
        }), !isLoading && currentPreviewPage && currentPreviewPage.url ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("iframe", {
          ref: iframeRef,
          id: "page-preview",
          src: (() => {
            let url = currentPreviewPage.url;
            if (/^my front page$/i.test(currentPreviewPage.title?.trim())) {
              url = url.replace('?page_id=5', '');
            }

            // If builder is Gutenberg, append -gb to the URL slug (if not already present)
            if (builder === 'gutenberg') {
              // Clean up double dashes in URL
              if (selectedSiteId !== 'resume') {
                url = url.replace(/--/g, '-');
              }
              // Transform: https://demo.athemes.com/sydney-main/ → https://demo.athemes.com/sydney-main-gb/
              // Only add -gb if it's not already present
              if (!/-gb\/?(\?.*)?$/.test(url)) {
                url = url.replace(/\/([^\/\?]+)(\/)?(\?.*)?$/, '/$1-gb$2$3');
              }
              if (selectedSiteId === 'cafe') {
                // Special case for Cafe template
                url = 'https://demo.athemes.com/sp-cafe-gb/';
              }
              if (selectedSiteId === 'author') {
                // Special case for Author template
                url = 'https://demo.athemes.com/sp-author-gb/';
              }
            }

            // Add atss_preview=1 parameter
            url = `${url}${url.includes('?') ? '&' : '?'}atss_preview=1`;
            return url;
          })(),
          title: currentPreviewPage.title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Page Preview', 'athemes-starter-sites'),
          onLoad: handleIframeLoad,
          style: {
            opacity: isIframeLoading ? 0 : 1
          },
          className: "atss-onboarding-wizard__preview-iframe"
        }) : !isLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
          className: "atss-onboarding-wizard__preview-placeholder",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("p", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select a page to preview', 'athemes-starter-sites')
          })
        })]
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pages);

/***/ }),

/***/ "./v2/onboarding/src/data/color-schemes.js":
/*!*************************************************!*\
  !*** ./v2/onboarding/src/data/color-schemes.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getColorSchemeById: () => (/* binding */ getColorSchemeById),
/* harmony export */   getColorSchemesForSite: () => (/* binding */ getColorSchemesForSite),
/* harmony export */   themeColorSchemes: () => (/* binding */ themeColorSchemes)
/* harmony export */ });
/**
 * Color schemes data for themes.
 *
 * @package aThemes Starter Sites
 */

/**
 * Theme-level default color schemes.
 * Each color scheme contains CSS custom properties and their values.
 */
const themeColorSchemes = {
  sydney: [{
    id: 'default',
    name: 'Default',
    colors: {
      '--sydney-global-color-1': '#d65050',
      '--sydney-global-color-2': '#b73d3d',
      '--sydney-global-color-3': '#233452',
      '--sydney-global-color-4': '#00102E',
      '--sydney-global-color-5': '#6d7685',
      '--sydney-global-color-6': '#00102E',
      '--sydney-global-color-7': '#F4F5F7',
      '--sydney-global-color-8': '#dbdbdb',
      '--sydney-global-color-9': '#ffffff'
    }
  }, {
    id: 'vibrant-blue',
    name: 'Vibrant Blue',
    colors: {
      '--sydney-global-color-1': '#2563eb',
      '--sydney-global-color-2': '#1d4ed8',
      '--sydney-global-color-3': '#334155',
      '--sydney-global-color-4': '#0f172a',
      '--sydney-global-color-5': '#64748b',
      '--sydney-global-color-6': '#1e293b',
      '--sydney-global-color-7': '#f8fafc',
      '--sydney-global-color-8': '#e2e8f0',
      '--sydney-global-color-9': '#ffffff'
    }
  }, {
    id: 'sunset-warmth',
    name: 'Sunset Warmth',
    colors: {
      '--sydney-global-color-1': '#f97316',
      '--sydney-global-color-2': '#ea580c',
      '--sydney-global-color-3': '#44403c',
      '--sydney-global-color-4': '#1c1917',
      '--sydney-global-color-5': '#78716c',
      '--sydney-global-color-6': '#292524',
      '--sydney-global-color-7': '#fafaf9',
      '--sydney-global-color-8': '#e7e5e4',
      '--sydney-global-color-9': '#ffffff'
    }
  }, {
    id: 'forest-green',
    name: 'Forest Green',
    colors: {
      '--sydney-global-color-1': '#16a34a',
      '--sydney-global-color-2': '#15803d',
      '--sydney-global-color-3': '#3f3f46',
      '--sydney-global-color-4': '#18181b',
      '--sydney-global-color-5': '#71717a',
      '--sydney-global-color-6': '#27272a',
      '--sydney-global-color-7': '#fafafa',
      '--sydney-global-color-8': '#e4e4e7',
      '--sydney-global-color-9': '#ffffff'
    }
  }, {
    id: 'royal-purple',
    name: 'Royal Purple',
    colors: {
      '--sydney-global-color-1': '#9333ea',
      '--sydney-global-color-2': '#7e22ce',
      '--sydney-global-color-3': '#3f3f46',
      '--sydney-global-color-4': '#18181b',
      '--sydney-global-color-5': '#71717a',
      '--sydney-global-color-6': '#27272a',
      '--sydney-global-color-7': '#fafafa',
      '--sydney-global-color-8': '#e4e4e7',
      '--sydney-global-color-9': '#ffffff'
    }
  }, {
    id: 'crimson-red',
    name: 'Crimson Red',
    colors: {
      '--sydney-global-color-1': '#dc2626',
      '--sydney-global-color-2': '#b91c1c',
      '--sydney-global-color-3': '#374151',
      '--sydney-global-color-4': '#111827',
      '--sydney-global-color-5': '#6b7280',
      '--sydney-global-color-6': '#1f2937',
      '--sydney-global-color-7': '#f9fafb',
      '--sydney-global-color-8': '#e5e7eb',
      '--sydney-global-color-9': '#ffffff'
    }
  }, {
    id: 'teal-aqua',
    name: 'Teal Aqua',
    colors: {
      '--sydney-global-color-1': '#14b8a6',
      '--sydney-global-color-2': '#0d9488',
      '--sydney-global-color-3': '#334155',
      '--sydney-global-color-4': '#0f172a',
      '--sydney-global-color-5': '#64748b',
      '--sydney-global-color-6': '#1e293b',
      '--sydney-global-color-7': '#f8fafc',
      '--sydney-global-color-8': '#e2e8f0',
      '--sydney-global-color-9': '#ffffff'
    }
  }],
  botiga: [{
    id: 'default',
    name: 'Default',
    colors: {
      '--botiga-global-color-1': '#d65050',
      '--botiga-global-color-2': '#b73d3d',
      '--botiga-global-color-3': '#233452',
      '--botiga-global-color-4': '#00102E',
      '--botiga-global-color-5': '#6d7685',
      '--botiga-global-color-6': '#00102E',
      '--botiga-global-color-7': '#F4F5F7',
      '--botiga-global-color-8': '#dbdbdb',
      '--botiga-global-color-9': '#ffffff'
    }
  }, {
    id: 'vibrant-blue',
    name: 'Vibrant Blue',
    colors: {
      '--botiga-global-color-1': '#2563eb',
      '--botiga-global-color-2': '#1d4ed8',
      '--botiga-global-color-3': '#334155',
      '--botiga-global-color-4': '#0f172a',
      '--botiga-global-color-5': '#64748b',
      '--botiga-global-color-6': '#1e293b',
      '--botiga-global-color-7': '#f8fafc',
      '--botiga-global-color-8': '#e2e8f0',
      '--botiga-global-color-9': '#ffffff'
    }
  }, {
    id: 'sunset-warmth',
    name: 'Sunset Warmth',
    colors: {
      '--botiga-global-color-1': '#f97316',
      '--botiga-global-color-2': '#ea580c',
      '--botiga-global-color-3': '#44403c',
      '--botiga-global-color-4': '#1c1917',
      '--botiga-global-color-5': '#78716c',
      '--botiga-global-color-6': '#292524',
      '--botiga-global-color-7': '#fafaf9',
      '--botiga-global-color-8': '#e7e5e4',
      '--botiga-global-color-9': '#ffffff'
    }
  }, {
    id: 'forest-green',
    name: 'Forest Green',
    colors: {
      '--botiga-global-color-1': '#16a34a',
      '--botiga-global-color-2': '#15803d',
      '--botiga-global-color-3': '#3f3f46',
      '--botiga-global-color-4': '#18181b',
      '--botiga-global-color-5': '#71717a',
      '--botiga-global-color-6': '#27272a',
      '--botiga-global-color-7': '#fafafa',
      '--botiga-global-color-8': '#e4e4e7',
      '--botiga-global-color-9': '#ffffff'
    }
  }, {
    id: 'royal-purple',
    name: 'Royal Purple',
    colors: {
      '--botiga-global-color-1': '#9333ea',
      '--botiga-global-color-2': '#7e22ce',
      '--botiga-global-color-3': '#3f3f46',
      '--botiga-global-color-4': '#18181b',
      '--botiga-global-color-5': '#71717a',
      '--botiga-global-color-6': '#27272a',
      '--botiga-global-color-7': '#fafafa',
      '--botiga-global-color-8': '#e4e4e7',
      '--botiga-global-color-9': '#ffffff'
    }
  }, {
    id: 'crimson-red',
    name: 'Crimson Red',
    colors: {
      '--botiga-global-color-1': '#dc2626',
      '--botiga-global-color-2': '#b91c1c',
      '--botiga-global-color-3': '#374151',
      '--botiga-global-color-4': '#111827',
      '--botiga-global-color-5': '#6b7280',
      '--botiga-global-color-6': '#1f2937',
      '--botiga-global-color-7': '#f9fafb',
      '--botiga-global-color-8': '#e5e7eb',
      '--botiga-global-color-9': '#ffffff'
    }
  }, {
    id: 'teal-aqua',
    name: 'Teal Aqua',
    colors: {
      '--botiga-global-color-1': '#14b8a6',
      '--botiga-global-color-2': '#0d9488',
      '--botiga-global-color-3': '#334155',
      '--botiga-global-color-4': '#0f172a',
      '--botiga-global-color-5': '#64748b',
      '--botiga-global-color-6': '#1e293b',
      '--botiga-global-color-7': '#f8fafc',
      '--botiga-global-color-8': '#e2e8f0',
      '--botiga-global-color-9': '#ffffff'
    }
  }]
};

/**
 * Get color schemes for a starter site.
 *
 * @param {Object|null} siteData  The starter site data object.
 * @param {string}      themeName The theme name (sydney, botiga, etc.).
 * @return {Array} Array of color scheme objects.
 */
const getColorSchemesForSite = (siteData, themeName) => {
  // 1. If site has custom color schemes, return those
  if (siteData?.colorSchemes && 0 < siteData.colorSchemes.length) {
    return siteData.colorSchemes;
  }

  // 2. Otherwise, return theme defaults using themeName from atssOnboarding
  return themeColorSchemes[themeName] || themeColorSchemes.sydney;
};

/**
 * Get a single color scheme by ID from a list of schemes.
 *
 * @param {Array}  schemes  Array of color scheme objects.
 * @param {string} schemeId The ID of the color scheme to find.
 * @return {Object|null} The color scheme object or null if not found.
 */
const getColorSchemeById = (schemes, schemeId) => {
  return schemes.find(scheme => scheme.id === schemeId) || null;
};

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

/***/ }),

/***/ "./v2/onboarding/src/data/typography-pairs.js":
/*!****************************************************!*\
  !*** ./v2/onboarding/src/data/typography-pairs.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTypographyPairById: () => (/* binding */ getTypographyPairById),
/* harmony export */   getTypographyPairsForSite: () => (/* binding */ getTypographyPairsForSite),
/* harmony export */   typographyPairs: () => (/* binding */ typographyPairs)
/* harmony export */ });
/**
 * Typography pairs data for themes.
 *
 * @package aThemes Starter Sites
 */

/**
 * Universal typography pairs that work across all themes.
 * Each pair contains heading and body font families.
 * Font weights are hardcoded in the component (500 for headings, 400 for body).
 */
const typographyPairs = [{
  id: 'system',
  name: 'System Default',
  label: 'System Default',
  headingFont: {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
  },
  bodyFont: {
    family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
  },
  googleFontsUrl: '' // No Google Fonts needed for system fonts
}, {
  id: 'default',
  name: 'Default',
  label: 'Inter',
  headingFont: {
    family: 'Inter'
  },
  bodyFont: {
    family: 'Inter'
  },
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap'
}, {
  id: 'classic-elegant',
  name: 'Classic Elegant',
  label: 'Playfair Display & Source Sans Pro',
  headingFont: {
    family: 'Playfair Display'
  },
  bodyFont: {
    family: 'Source Sans Pro'
  },
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500&family=Source+Sans+Pro:wght@400&display=swap'
}, {
  id: 'modern-clean',
  name: 'Modern Clean',
  label: 'Poppins',
  headingFont: {
    family: 'Poppins'
  },
  bodyFont: {
    family: 'Poppins'
  },
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap'
}, {
  id: 'professional',
  name: 'Professional',
  label: 'Roboto Slab & Roboto',
  headingFont: {
    family: 'Roboto Slab'
  },
  bodyFont: {
    family: 'Roboto'
  },
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@500&family=Roboto:wght@400&display=swap'
}, {
  id: 'creative-bold',
  name: 'Creative Bold',
  label: 'Montserrat & Open Sans',
  headingFont: {
    family: 'Montserrat'
  },
  bodyFont: {
    family: 'Open Sans'
  },
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500&family=Open+Sans:wght@400&display=swap'
}, {
  id: 'editorial',
  name: 'Editorial',
  label: 'Merriweather & Lato',
  headingFont: {
    family: 'Merriweather'
  },
  bodyFont: {
    family: 'Lato'
  },
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@500&family=Lato:wght@400&display=swap'
}, {
  id: 'minimal-sans',
  name: 'Minimal Sans',
  label: 'Work Sans',
  headingFont: {
    family: 'Work Sans'
  },
  bodyFont: {
    family: 'Work Sans'
  },
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap'
}];

/**
 * Get typography pairs for a starter site.
 * Currently returns the same universal pairs for all sites.
 *
 * @param {Object|null} siteData  The starter site data object (unused for now).
 * @param {string}      themeName The theme name (unused for now).
 * @return {Array} Array of typography pair objects.
 */
const getTypographyPairsForSite = (siteData, themeName) => {
  // For now, return universal pairs for all themes
  // In the future, this could be extended to support site-specific or theme-specific pairs
  return typographyPairs;
};

/**
 * Get a single typography pair by ID from a list of pairs.
 *
 * @param {Array}  pairs  Array of typography pair objects.
 * @param {string} pairId The ID of the typography pair to find.
 * @return {Object|null} The typography pair object or null if not found.
 */
const getTypographyPairById = (pairs, pairId) => {
  return pairs.find(pair => pair.id === pairId) || null;
};

/***/ }),

/***/ "./v2/onboarding/src/utils/image-utils.js":
/*!************************************************!*\
  !*** ./v2/onboarding/src/utils/image-utils.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   convertLogoForPreview: () => (/* binding */ convertLogoForPreview),
/* harmony export */   imageUrlToDataUrl: () => (/* binding */ imageUrlToDataUrl),
/* harmony export */   isLocalUrl: () => (/* binding */ isLocalUrl)
/* harmony export */ });
/**
 * Image utilities - Handle image conversion for preview sync.
 *
 * @package Athemes Starter Sites
 */

/**
 * Check if a URL is from a local/development environment.
 *
 * @param {string} url The URL to check.
 * @return {boolean} True if the URL is local.
 */
const isLocalUrl = url => {
  if (!url) {
    return false;
  }
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // Check for localhost
    if (hostname === 'localhost') {
      return true;
    }

    // Check for .local domains
    if (hostname.endsWith('.local')) {
      return true;
    }

    // Check for .test domains
    if (hostname.endsWith('.test')) {
      return true;
    }

    // Check for IP addresses (127.x.x.x, 192.168.x.x, 10.x.x.x, 172.16-31.x.x)
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipv4Regex.test(hostname)) {
      const parts = hostname.split('.').map(Number);
      // 127.x.x.x (loopback)
      if (parts[0] === 127) {
        return true;
      }
      // 192.168.x.x (private)
      if (parts[0] === 192 && parts[1] === 168) {
        return true;
      }
      // 10.x.x.x (private)
      if (parts[0] === 10) {
        return true;
      }
      // 172.16.x.x - 172.31.x.x (private)
      if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) {
        return true;
      }
    }

    // Check for IPv6 localhost
    if (hostname === '::1' || hostname === '[::1]') {
      return true;
    }
    return false;
  } catch (e) {
    // If URL parsing fails, assume it's not local
    return false;
  }
};

/**
 * Convert an image URL to a data URL.
 *
 * @param {string} imageUrl The image URL to convert.
 * @return {Promise<string>} Promise that resolves to a data URL.
 */
const imageUrlToDataUrl = imageUrl => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // Set crossOrigin to anonymous to allow CORS
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Convert to data URL
        const dataUrl = canvas.toDataURL('image/png');
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    img.src = imageUrl;
  });
};

/**
 * Convert a logo object to preview-safe format.
 * If the logo URL is local, converts it to a data URL to avoid CORS issues.
 *
 * @param {Object} logo Logo object with url and id properties.
 * @return {Promise<Object>} Promise that resolves to a logo object safe for preview.
 */
const convertLogoForPreview = async logo => {
  if (!logo || !logo.url) {
    return logo;
  }

  // If the logo URL is not local, return as-is
  if (!isLocalUrl(logo.url)) {
    return logo;
  }
  try {
    // Convert local image to data URL
    const dataUrl = await imageUrlToDataUrl(logo.url);
    return {
      ...logo,
      url: dataUrl,
      originalUrl: logo.url // Keep original URL for reference
    };
  } catch (error) {
    // If conversion fails, return original logo
    // The preview will fail to load, but the logo will still be imported correctly
    // eslint-disable-next-line no-console
    console.warn('[Image Utils] Failed to convert logo to data URL:', error);
    return logo;
  }
};

/***/ }),

/***/ "./v2/onboarding/src/utils/preload-helpers.js":
/*!****************************************************!*\
  !*** ./v2/onboarding/src/utils/preload-helpers.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addPagePreconnectHints: () => (/* binding */ addPagePreconnectHints),
/* harmony export */   addPreconnectHints: () => (/* binding */ addPreconnectHints),
/* harmony export */   removePagePreconnectHints: () => (/* binding */ removePagePreconnectHints),
/* harmony export */   removePreconnectHints: () => (/* binding */ removePreconnectHints)
/* harmony export */ });
/* harmony import */ var _data_starter_sites__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/starter-sites */ "./v2/onboarding/src/data/starter-sites.js");
/**
 * Preload helpers for starter site previews.
 *
 * @package Athemes Starter Sites
 */



/**
 * Add preconnect and DNS prefetch hints for a preview URL.
 * Optimizes iframe loading by establishing early connections to the origin.
 *
 * @param {string} previewUrl The preview URL to add hints for.
 * @param {string} dataAttr   Optional data attribute for tracking (default: 'data-atss-preconnect').
 */
const addPreconnectHints = (previewUrl, dataAttr = 'data-atss-preconnect') => {
  if (!previewUrl) {
    return;
  }
  try {
    const url = new URL(previewUrl);
    const origin = url.origin;

    // Check if hints for this origin already exist
    const existingHint = document.querySelector(`link[${dataAttr}="${origin}"]`);
    if (existingHint) {
      return;
    }

    // DNS prefetch - resolves domain early
    const dnsPrefetch = document.createElement('link');
    dnsPrefetch.rel = 'dns-prefetch';
    dnsPrefetch.href = origin;
    dnsPrefetch.setAttribute(dataAttr, origin);
    document.head.appendChild(dnsPrefetch);

    // Preconnect - establishes early connection (DNS + TCP + TLS)
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = origin;
    preconnect.setAttribute(dataAttr, origin);
    document.head.appendChild(preconnect);
  } catch (e) {

    // Invalid URL, skip silently
  }
};

/**
 * Remove preconnect hints for a specific origin or all hints.
 *
 * @param {string} origin     Optional origin to remove hints for. If not provided, removes all.
 * @param {string} dataAttr   Optional data attribute for tracking (default: 'data-atss-preconnect').
 */
const removePreconnectHints = (origin = null, dataAttr = 'data-atss-preconnect') => {
  let selector = `link[${dataAttr}]`;
  if (origin) {
    selector = `link[${dataAttr}="${origin}"]`;
  }
  const links = document.querySelectorAll(selector);
  links.forEach(link => link.remove());
};

/**
 * Add preconnect hints for an array of page URLs.
 * Used to optimize page iframe loading in the Pages step.
 *
 * @param {Array} pages Array of page objects with 'url' property.
 */
const addPagePreconnectHints = pages => {
  if (!pages || !Array.isArray(pages)) {
    return;
  }
  pages.forEach(page => {
    if (page.url) {
      addPreconnectHints(page.url, 'data-atss-page-preconnect');
    }
  });
};

/**
 * Remove all page preconnect hints.
 */
const removePagePreconnectHints = () => {
  removePreconnectHints(null, 'data-atss-page-preconnect');
};

/***/ }),

/***/ "./v2/onboarding/src/utils/preview-bridge.js":
/*!***************************************************!*\
  !*** ./v2/onboarding/src/utils/preview-bridge.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Preview Bridge - Handles communication with the preview iframe.
 *
 * @package Athemes Starter Sites
 */

/**
 * PreviewBridge class manages all postMessage communication with preview iframe.
 */
class PreviewBridge {
  /**
   * Constructor.
   *
   * @param {string} iframeId The ID of the iframe element.
   */
  constructor(iframeId = 'demo-preview') {
    this.iframeId = iframeId;
    this.iframe = null;
    this.isReady = false;
    this.messageQueue = [];
    this.debug = window.atssOnboarding?.debug || false;
    this.messageHandler = null;
    this.pendingCustomizations = null;
    this.readyReceivedWithoutIframe = false;
  }

  /**
   * Initialize the bridge with an iframe element.
   *
   * @param {HTMLIFrameElement} iframe The iframe element.
   */
  init(iframe) {
    this.log('info', 'init() called with iframe:', iframe ? iframe.id || 'unnamed' : 'null');

    // If called with null, just set up the message handler but don't update iframe ref
    if (!iframe) {
      // Only set up message handler if not already set
      if (!this.messageHandler) {
        this.setupMessageHandler();
      }
      return;
    }

    // Skip if same iframe (avoid re-initialization)
    if (this.iframe === iframe) {
      this.log('info', 'init() called with same iframe, skipping');
      return;
    }

    // Check if we previously received PREVIEW_READY but had no iframe to send to
    const hadPendingReady = this.readyReceivedWithoutIframe;
    this.log('info', 'Initializing bridge with new iframe');
    this.iframe = iframe;
    this.readyReceivedWithoutIframe = false;

    // Set up message handler if not already set
    if (!this.messageHandler) {
      this.setupMessageHandler();
    }

    // If we had received PREVIEW_READY but couldn't send (no iframe), send now
    if (hadPendingReady && this.pendingCustomizations) {
      this.log('info', 'Had pending ready state, applying customizations now');
      this.isReady = true;
      this.batchUpdate(this.pendingCustomizations);
    }
  }

  /**
   * Set up the message handler for PREVIEW_READY signals.
   */
  setupMessageHandler() {
    // Remove previous handler if exists
    if (this.messageHandler) {
      window.removeEventListener('message', this.messageHandler);
    }

    // Create bound message handler
    this.messageHandler = event => {
      if ('ATSS_PREVIEW_READY' === event.data?.type) {
        this.log('info', 'Received ATSS_PREVIEW_READY signal');
        this.isReady = true;

        // If we don't have an iframe reference yet, remember that ready was received
        if (!this.iframe) {
          this.log('info', 'No iframe reference yet, marking readyReceivedWithoutIframe');
          this.readyReceivedWithoutIframe = true;
          return;
        }
        this.flushMessageQueue();

        // Apply pending customizations if any
        if (this.pendingCustomizations) {
          this.log('info', 'Applying pending customizations');
          this.batchUpdate(this.pendingCustomizations);
        }
      }
    };

    // Listen for iframe ready message
    window.addEventListener('message', this.messageHandler);
    this.log('info', 'Message handler set up');
  }

  /**
   * Reset the ready state when iframe navigates to a new page.
   * Call this before the iframe src changes.
   */
  resetReadyState() {
    this.isReady = false;
    this.messageQueue = [];
    this.readyReceivedWithoutIframe = false;
    this.log('info', 'Ready state reset for new page load');
  }

  /**
   * Set pending customizations to be applied when iframe becomes ready.
   *
   * @param {Object} customizations The customizations to apply.
   */
  setPendingCustomizations(customizations) {
    this.pendingCustomizations = customizations;
    this.log('info', 'Pending customizations set', customizations);
  }

  /**
   * Clear pending customizations.
   */
  clearPendingCustomizations() {
    this.pendingCustomizations = null;
  }

  /**
   * Store customizations to be re-applied when iframe navigates.
   *
   * @param {Object} updates Partial customization updates to merge.
   */
  storePendingCustomizations(updates) {
    if (!updates || 'object' !== typeof updates) {
      return;
    }
    if (!this.pendingCustomizations) {
      this.pendingCustomizations = {};
    }
    this.pendingCustomizations = {
      ...this.pendingCustomizations,
      ...updates
    };
  }

  /**
   * Send a message to the iframe.
   *
   * @param {Object} message The message object to send.
   * @return {boolean} Whether the message was sent successfully.
   */
  send(message) {
    if (!this.iframe?.contentWindow) {
      this.log('error', 'Iframe not available', message);
      return false;
    }

    // If iframe is not ready, queue the message
    if (!this.isReady) {
      this.messageQueue.push(message);
      this.log('info', 'Message queued (iframe not ready)', message);
      return false;
    }
    try {
      this.iframe.contentWindow.postMessage(message, '*');
      this.log('info', 'Message sent', message);
      return true;
    } catch (error) {
      this.log('error', 'Failed to send message', {
        message,
        error
      });
      return false;
    }
  }

  /**
   * Flush queued messages.
   */
  flushMessageQueue() {
    if (0 === this.messageQueue.length) {
      return;
    }
    this.log('info', `Flushing ${this.messageQueue.length} queued messages`);
    while (0 < this.messageQueue.length) {
      const message = this.messageQueue.shift();
      this.send(message);
    }
  }

  /**
   * Update colors in the preview.
   *
   * @param {Object} colors Object with CSS variable names as keys and color values.
   * @return {boolean} Whether the update was sent successfully.
   */
  updateColors(colors) {
    if (!colors || 'object' !== typeof colors) {
      this.log('error', 'Invalid colors object', colors);
      return false;
    }

    // Store colors to re-apply on page navigation
    this.storePendingCustomizations({
      colors
    });
    return this.send({
      type: 'ATSS_COLOR_UPDATE',
      colors
    });
  }

  /**
   * Reset colors in the preview to their original values.
   *
   * @return {boolean} Whether the reset was sent successfully.
   */
  resetColors() {
    return this.send({
      type: 'ATSS_COLOR_RESET'
    });
  }

  /**
   * Update logo in the preview.
   *
   * @param {Object} logo Logo data object with url and id.
   * @return {boolean} Whether the update was sent successfully.
   */
  updateLogo(logo) {
    if (!logo) {
      this.log('error', 'Invalid logo object', logo);
      return false;
    }

    // Store logo to re-apply on page navigation
    this.storePendingCustomizations({
      logo
    });
    return this.send({
      type: 'ATSS_LOGO_UPDATE',
      logo
    });
  }

  /**
   * Update logo height in the preview.
   *
   * @param {number} height Logo height in pixels.
   * @return {boolean} Whether the update was sent successfully.
   */
  updateLogoHeight(height) {
    // Store logo height to re-apply on page navigation
    this.storePendingCustomizations({
      logoHeight: height
    });
    return this.send({
      type: 'ATSS_LOGO_HEIGHT_UPDATE',
      height
    });
  }

  /**
   * Update site title in the preview.
   *
   * @param {string}  title     The site title.
   * @param {boolean} showTitle Whether to show the title.
   * @return {boolean} Whether the update was sent successfully.
   */
  updateSiteTitle(title, showTitle) {
    // Store site title to re-apply on page navigation
    this.storePendingCustomizations({
      title,
      showTitle
    });
    return this.send({
      type: 'ATSS_SITE_TITLE_UPDATE',
      title,
      showTitle
    });
  }

  /**
   * Update typography in the preview.
   *
   * @param {Object} typography Typography data object.
   * @return {boolean} Whether the update was sent successfully.
   */
  updateTypography(typography) {
    if (!typography || 'object' !== typeof typography) {
      this.log('error', 'Invalid typography object', typography);
      return false;
    }

    // Store typography to re-apply on page navigation
    this.storePendingCustomizations({
      typography
    });
    return this.send({
      type: 'ATSS_TYPOGRAPHY_UPDATE',
      typography
    });
  }

  /**
   * Reset typography in the preview to their original values.
   *
   * @return {boolean} Whether the reset was sent successfully.
   */
  resetTypography() {
    return this.send({
      type: 'ATSS_TYPOGRAPHY_RESET'
    });
  }

  /**
   * Send batch updates to the preview.
   *
   * @param {Object} updates Object containing multiple update types.
   * @return {boolean} Whether the update was sent successfully.
   */
  batchUpdate(updates) {
    return this.send({
      type: 'ATSS_BATCH_UPDATE',
      updates
    });
  }

  /**
   * Mark iframe as ready (for testing or manual control).
   */
  markReady() {
    this.isReady = true;
    this.flushMessageQueue();
  }

  /**
   * Log messages if debug mode is enabled.
   *
   * @param {string} level   Log level (info, warn, error).
   * @param {string} message Log message.
   * @param {*}      data    Additional data to log.
   */
  log(level, message, data) {
    if (!this.debug) {
      return;
    }
    const prefix = '[PreviewBridge]';
    /* eslint-disable no-console */
    switch (level) {
      case 'error':
        console.error(prefix, message, data);
        break;
      case 'warn':
        console.warn(prefix, message, data);
        break;
      default:
        console.log(prefix, message, data);
    }
    /* eslint-enable no-console */
  }

  /**
   * Destroy the bridge and clean up.
   */
  destroy() {
    if (this.messageHandler) {
      window.removeEventListener('message', this.messageHandler);
      this.messageHandler = null;
    }
    this.iframe = null;
    this.isReady = false;
    this.messageQueue = [];
    this.pendingCustomizations = null;
    this.readyReceivedWithoutIframe = false;
  }
}

// Create a singleton instance
const previewBridge = new PreviewBridge();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (previewBridge);

/***/ }),

/***/ "./v2/onboarding/src/utils/use-preview-sync.js":
/*!*****************************************************!*\
  !*** ./v2/onboarding/src/utils/use-preview-sync.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useColorPreviewSync: () => (/* binding */ useColorPreviewSync),
/* harmony export */   useLogoHeightPreviewSync: () => (/* binding */ useLogoHeightPreviewSync),
/* harmony export */   useLogoPreviewSync: () => (/* binding */ useLogoPreviewSync),
/* harmony export */   usePreviewBridgeInit: () => (/* binding */ usePreviewBridgeInit),
/* harmony export */   useSiteTitlePreviewSync: () => (/* binding */ useSiteTitlePreviewSync),
/* harmony export */   useTypographyPreviewSync: () => (/* binding */ useTypographyPreviewSync)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _preview_bridge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./preview-bridge */ "./v2/onboarding/src/utils/preview-bridge.js");
/* harmony import */ var _image_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./image-utils */ "./v2/onboarding/src/utils/image-utils.js");
/**
 * usePreviewSync hook - Syncs wizard data with preview iframe.
 *
 * @package Athemes Starter Sites
 */





/**
 * Transform color scheme data to preview-compatible format.
 *
 * @param {string} schemeId       The selected color scheme ID.
 * @param {Array}  colorSchemes   Array of available color schemes.
 * @param {Object} customColors   Custom generated colors (if scheme is 'custom').
 * @return {Object|null} Color data ready for preview, or null if not available.
 */
const transformColors = (schemeId, colorSchemes, customColors) => {
  if (!schemeId) {
    return null;
  }

  // Handle custom colors
  if ('custom' === schemeId) {
    // Validate that customColors has actual color properties
    if (!customColors || 'object' !== typeof customColors || 0 === Object.keys(customColors).length) {
      return null;
    }
    return customColors;
  }

  // Find the selected scheme
  const selectedScheme = colorSchemes.find(scheme => scheme.id === schemeId);
  if (!selectedScheme || !selectedScheme.colors) {
    return null;
  }
  return selectedScheme.colors;
};

/**
 * Hook to sync colors with the preview iframe.
 *
 * @param {Object} options Hook options.
 * @param {string} options.selectedColorScheme   The selected color scheme ID.
 * @param {Array}  options.colorSchemes         Array of available color schemes.
 * @param {Object} options.customColors         Custom generated colors.
 * @param {number} options.debounceMs           Debounce delay in milliseconds (default: 300).
 */
const useColorPreviewSync = ({
  selectedColorScheme,
  colorSchemes = [],
  customColors = {},
  debounceMs = 300
}) => {
  const timeoutRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce the color update
    timeoutRef.current = setTimeout(() => {
      const colors = transformColors(selectedColorScheme, colorSchemes, customColors);
      if (colors) {
        _preview_bridge__WEBPACK_IMPORTED_MODULE_1__["default"].updateColors(colors);
      }
    }, debounceMs);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [selectedColorScheme, colorSchemes, customColors, debounceMs]);
};

/**
 * Hook to sync logo with the preview iframe.
 *
 * @param {Object} siteLogo Logo data object with url and id.
 * @param {number} logoHeight Optional logo height to include in the logo object.
 */
const useLogoPreviewSync = (siteLogo, logoHeight) => {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!siteLogo) {
      return;
    }

    // Convert logo to preview-safe format (handles local URLs)
    const syncLogo = async () => {
      try {
        // Include height in logo object if provided
        const logoWithHeight = logoHeight !== undefined && null !== logoHeight ? {
          ...siteLogo,
          height: logoHeight
        } : siteLogo;

        // Convert local URLs to data URLs to avoid CORS issues
        const previewSafeLogo = await (0,_image_utils__WEBPACK_IMPORTED_MODULE_2__.convertLogoForPreview)(logoWithHeight);
        _preview_bridge__WEBPACK_IMPORTED_MODULE_1__["default"].updateLogo(previewSafeLogo);
      } catch (error) {
        // If conversion fails, send original logo anyway
        // eslint-disable-next-line no-console
        console.warn('[useLogoPreviewSync] Failed to convert logo:', error);
        const logoWithHeight = logoHeight !== undefined && null !== logoHeight ? {
          ...siteLogo,
          height: logoHeight
        } : siteLogo;
        _preview_bridge__WEBPACK_IMPORTED_MODULE_1__["default"].updateLogo(logoWithHeight);
      }
    };
    syncLogo();
  }, [siteLogo, logoHeight]);
};

/**
 * Hook to sync logo height with the preview iframe.
 *
 * @param {number} logoHeight The logo height.
 */
const useLogoHeightPreviewSync = logoHeight => {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (logoHeight !== undefined && null !== logoHeight) {
      _preview_bridge__WEBPACK_IMPORTED_MODULE_1__["default"].updateLogoHeight(logoHeight);
    }
  }, [logoHeight]);
};

/**
 * Hook to sync site title with the preview iframe.
 *
 * @param {string}  siteTitle    The site title.
 * @param {boolean} showSiteTitle Whether to show the title.
 */
const useSiteTitlePreviewSync = (siteTitle, showSiteTitle) => {
  const timeoutRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce the title update
    timeoutRef.current = setTimeout(() => {
      _preview_bridge__WEBPACK_IMPORTED_MODULE_1__["default"].updateSiteTitle(siteTitle, showSiteTitle);
    }, 500);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [siteTitle, showSiteTitle]);
};

/**
 * Hook to sync typography with the preview iframe.
 *
 * @param {string} selectedTypographyPair The selected typography pair ID.
 * @param {Array}  typographyPairs       Array of available typography pairs.
 */
const useTypographyPreviewSync = (selectedTypographyPair, typographyPairs) => {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!selectedTypographyPair) {
      return;
    }
    const selectedPair = typographyPairs.find(pair => pair.id === selectedTypographyPair);
    if (selectedPair) {
      _preview_bridge__WEBPACK_IMPORTED_MODULE_1__["default"].updateTypography(selectedPair);
    }
  }, [selectedTypographyPair, typographyPairs]);
};

/**
 * Hook to initialize the preview bridge with an iframe.
 * This hook watches for the iframe element to become available and initializes the bridge.
 *
 * @param {Object} iframeRef React ref to the iframe element.
 */
const usePreviewBridgeInit = iframeRef => {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // Initialize immediately if iframe is available
    if (iframeRef?.current) {
      _preview_bridge__WEBPACK_IMPORTED_MODULE_1__["default"].init(iframeRef.current);
    }
  }, [iframeRef]);

  // Also watch for when the iframe element becomes available (for conditional rendering)
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    // If iframe ref exists and has a current value, and it's different from what bridge has
    if (iframeRef?.current && _preview_bridge__WEBPACK_IMPORTED_MODULE_1__["default"].iframe !== iframeRef.current) {
      _preview_bridge__WEBPACK_IMPORTED_MODULE_1__["default"].init(iframeRef.current);
    }
  });
};

/***/ })

}]);
//# sourceMappingURL=v2_onboarding_src_components_Steps_Pages_js.js.map?ver=96ebfb957069e3dd18b8