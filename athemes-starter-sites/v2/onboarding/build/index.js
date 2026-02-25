/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/check.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/check.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ check_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
// packages/icons/src/library/check.tsx


var check_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M16.5 7.5 10 13.9l-2.5-2.4-1 1 3.5 3.6 7.5-7.6z" }) });

//# sourceMappingURL=check.js.map


/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/search.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/search.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ search_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
// packages/icons/src/library/search.tsx


var search_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M13 5c-3.3 0-6 2.7-6 6 0 1.4.5 2.7 1.3 3.7l-3.8 3.8 1.1 1.1 3.8-3.8c1 .8 2.3 1.3 3.7 1.3 3.3 0 6-2.7 6-6S16.3 5 13 5zm0 10.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z" }) });

//# sourceMappingURL=search.js.map


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data: {};
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          'Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'),
          {expectedType: expectedType}
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret);
        if (checkerResult == null) {
          return null;
        }
        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }
      var expectedTypesMessage = (expectedTypes.length > 0) ? ', expected one of type [' + expectedTypes.join(', ') + ']': '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError(
      (componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' +
      'it must be a function, usually from the `prop-types` package, but received `' + type + '`.'
    );
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/prop-types/node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else // removed by dead control flow
{}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/prop-types/node_modules/react-is/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/prop-types/node_modules/react-is/index.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) // removed by dead control flow
{} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/prop-types/node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./v2/onboarding/src/App.js":
/*!**********************************!*\
  !*** ./v2/onboarding/src/App.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Layout */ "./v2/onboarding/src/components/Layout/index.js");
/* harmony import */ var _components_Layout_ResumeModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Layout/ResumeModal */ "./v2/onboarding/src/components/Layout/ResumeModal.js");
/* harmony import */ var _data_wizard_steps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/wizard-steps */ "./v2/onboarding/src/data/wizard-steps.js");
/* harmony import */ var _context_WizardContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context/WizardContext */ "./v2/onboarding/src/context/WizardContext.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * Main onboarding wizard app component.
 *
 * @package Athemes Starter Sites
 */








/**
 * Main App component for the onboarding wizard.
 *
 * @return {JSX.Element} The app component.
 */

function App() {
  const {
    currentStep,
    setCurrentStep,
    completedSteps,
    markStepCompleted,
    isLoading,
    saveState,
    resetWizard
  } = (0,_context_WizardContext__WEBPACK_IMPORTED_MODULE_5__.useWizard)();

  // Navigation state for error handling
  const [navigationState, setNavigationState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    isLoading: false,
    error: null
  });

  // Resume modal state
  const [showResumeModal, setShowResumeModal] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const hasCheckedResume = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);

  /**
   * Show resume modal if user has saved progress (only on initial load).
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isLoading && !hasCheckedResume.current) {
      // Check if coming from legacy wizard (skip resume modal)
      const urlParams = new URLSearchParams(window.location.search);
      const fromLegacy = urlParams.get('from-legacy');

      // Check if there's saved progress to resume
      if (completedSteps.length > 0 && !fromLegacy) {
        setShowResumeModal(true);
      }

      // Clean up URL parameter if present
      if (fromLegacy) {
        urlParams.delete('from-legacy');
        const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
        window.history.replaceState({}, '', newUrl);
      }

      // Mark as checked regardless of whether we showed the modal
      hasCheckedResume.current = true;
    }
  }, [isLoading, completedSteps.length]);

  /**
   * Handle resuming the wizard session.
   */
  const handleResume = () => {
    setShowResumeModal(false);
  };

  /**
   * Handle restarting the wizard from scratch.
   */
  const handleRestart = async () => {
    const success = await resetWizard();
    if (success) {
      setShowResumeModal(false);
      hasCheckedResume.current = false;
    }
  };

  /**
   * Handle step navigation.
   *
   * @param {number} stepId Step ID to navigate to.
   */
  const handleStepChange = stepId => {
    setCurrentStep(stepId);
  };

  /**
   * Handle going to the next step.
   *
   * @param {Object} stepData Optional data from the step to save.
   */
  const handleContinue = async (stepData = null) => {
    const nextStep = currentStep + 1;
    const isLastStep = nextStep > _data_wizard_steps__WEBPACK_IMPORTED_MODULE_4__["default"].length;

    // Set loading state and clear any previous errors
    setNavigationState({
      isLoading: true,
      error: null
    });
    try {
      await markStepCompleted(currentStep, isLastStep ? null : nextStep, stepData);
      // Clear loading state on success
      setNavigationState({
        isLoading: false,
        error: null
      });
    } catch (error) {
      // Set error state and don't navigate
      setNavigationState({
        isLoading: false,
        error: error.message
      });
      // eslint-disable-next-line no-console
      console.error('Failed to save wizard state:', error);
    }
  };

  /**
   * Handle going to the previous step.
   */
  const handleBack = () => {
    // Clear navigation errors when going back
    setNavigationState({
      isLoading: false,
      error: null
    });
    const prevStep = currentStep - 1;
    if (prevStep >= 1) {
      setCurrentStep(prevStep);
    }
  };

  /**
   * Handle skipping the current step.
   */
  const handleSkip = () => {
    handleContinue();
  };

  /**
   * Handle wizard close.
   */
  const handleClose = () => {
    const dashboardUrl = atssOnboarding?.dashboardUrl || 'admin.php?page=themes.php';
    window.location.href = dashboardUrl;
  };

  /**
   * Render the current step component.
   *
   * @return {JSX.Element|null} The step component or null.
   */
  const renderCurrentStep = () => {
    const step = _data_wizard_steps__WEBPACK_IMPORTED_MODULE_4__["default"].find(s => s.id === currentStep);
    if (!step || !step.component) {
      return null;
    }
    const StepComponent = step.component;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(StepComponent, {
      onBack: handleBack,
      onSkip: handleSkip,
      onContinue: handleContinue,
      navigationLoading: navigationState.isLoading,
      navigationError: navigationState.error
    });
  };
  if (isLoading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "atss-onboarding-wizard__loading-screen",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Layout__WEBPACK_IMPORTED_MODULE_2__.Spinner, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "atss-onboarding-wizard__loading-text text-lg",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading wizard...', 'athemes-starter-sites')
      })]
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "atss-onboarding-wizard",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Layout_ResumeModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
      isOpen: showResumeModal,
      onResume: handleResume,
      onRestart: handleRestart
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "atss-onboarding-wizard__container",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Layout__WEBPACK_IMPORTED_MODULE_2__.Navigation, {
        steps: _data_wizard_steps__WEBPACK_IMPORTED_MODULE_4__["default"],
        currentStep: currentStep,
        completedSteps: completedSteps,
        onStepChange: handleStepChange,
        onClose: handleClose
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("main", {
        className: "atss-onboarding-wizard__content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Suspense, {
          fallback:
          // Don't show loading spinner for Customize (3) and Pages (4) steps
          currentStep === 3 || currentStep === 4 ? null : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "atss-onboarding-wizard__step-loading",
            "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Loading step', 'athemes-starter-sites'),
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_Layout__WEBPACK_IMPORTED_MODULE_2__.Spinner, {})
          }),
          children: renderCurrentStep()
        })
      }, currentStep)]
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);

/***/ }),

/***/ "./v2/onboarding/src/assets/images/elementor.svg":
/*!*******************************************************!*\
  !*** ./v2/onboarding/src/assets/images/elementor.svg ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgElementor),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgElementor = function SvgElementor(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 20,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#92003B",
    d: "M0 9.883C0 4.414 4.453 0 9.96 0c5.548 0 10 4.414 10 9.883 0 5.508-4.452 9.96-10 9.96A9.953 9.953 0 0 1 0 9.884m7.5-4.14H5.82v8.32H7.5zm1.64 0v1.679h5v-1.68zm5 3.32h-5v1.68h5zm-5 3.32v1.68h5v-1.68z"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0wIDkuODgyODFDMCA0LjQxNDA2IDQuNDUzMTIgMCA5Ljk2MDk0IDBDMTUuNTA3OCAwIDE5Ljk2MDkgNC40MTQwNiAxOS45NjA5IDkuODgyODFDMTkuOTYwOSAxNS4zOTA2IDE1LjUwNzggMTkuODQzOCA5Ljk2MDk0IDE5Ljg0MzhDNC40NTMxMiAxOS44NDM4IDAgMTUuMzkwNiAwIDkuODgyODFaTTcuNSA1Ljc0MjE5SDUuODIwMzFWMTQuMDYyNUg3LjVWNS43NDIxOVpNOS4xNDA2MiA1Ljc0MjE5VjcuNDIxODhIMTQuMTQwNlY1Ljc0MjE5SDkuMTQwNjJaTTE0LjE0MDYgOS4wNjI1SDkuMTQwNjJWMTAuNzQyMkgxNC4xNDA2VjkuMDYyNVpNOS4xNDA2MiAxMi4zODI4VjE0LjA2MjVIMTQuMTQwNlYxMi4zODI4SDkuMTQwNjJaIiBmaWxsPSIjOTIwMDNCIi8+DQo8L3N2Zz4NCg==");

/***/ }),

/***/ "./v2/onboarding/src/assets/images/waving.jpg":
/*!****************************************************!*\
  !*** ./v2/onboarding/src/assets/images/waving.jpg ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/waving.9baab65b.jpg";

/***/ }),

/***/ "./v2/onboarding/src/assets/images/wordpress.svg":
/*!*******************************************************!*\
  !*** ./v2/onboarding/src/assets/images/wordpress.svg ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReactComponent: () => (/* binding */ SvgWordpress),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }

var SvgWordpress = function SvgWordpress(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    width: 20,
    height: 20,
    fill: "none"
  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("path", {
    fill: "#1D2327",
    d: "M2.07 6.328c-.468 1.016-.703 2.188-.703 3.36 0 3.32 1.914 6.132 4.688 7.5zm13.203 2.969c0 .703-.273 1.523-.625 2.656l-.82 2.774L10.82 5.82c.508-.039.938-.078.938-.078.469-.078.39-.742-.04-.703 0 0-1.366.117-2.226.117-.82 0-2.187-.117-2.187-.117-.43-.039-.508.664-.04.703l.86.078 1.29 3.516-1.798 5.469L4.57 5.82c.508-.039.977-.078.977-.078.43-.078.39-.742-.078-.703 0 0-1.328.117-2.227.117h-.508a8.26 8.26 0 0 1 6.954-3.75 8.2 8.2 0 0 1 5.585 2.188c-.039-.04-.078-.04-.117-.04-.781 0-1.367.743-1.367 1.485 0 .703.39 1.29.82 1.953.313.547.664 1.25.664 2.305M9.805 10.43l2.578 6.992c0 .039.039.078.039.117a8 8 0 0 1-2.735.469c-.82 0-1.601-.117-2.382-.313zm7.148-4.727a8.16 8.16 0 0 1 1.016 3.984 8.24 8.24 0 0 1-4.14 7.188l2.538-7.344c.508-1.172.664-2.11.664-2.969 0-.312-.039-.585-.078-.859m2.422 3.984C19.375 4.376 15 0 9.688 0 4.336 0 0 4.375 0 9.688a9.686 9.686 0 0 0 9.688 9.687c5.312 0 9.687-4.336 9.687-9.687m-.469 0c0 5.118-4.14 9.258-9.218 9.258A9.25 9.25 0 0 1 .43 9.688c0-5.079 4.14-9.22 9.258-9.22 5.078 0 9.218 4.141 9.218 9.22"
  })));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0yLjA3MDMxIDYuMzI4MTJDMS42MDE1NiA3LjM0Mzc1IDEuMzY3MTkgOC41MTU2MiAxLjM2NzE5IDkuNjg3NUMxLjM2NzE5IDEzLjAwNzggMy4yODEyNSAxNS44MjAzIDYuMDU0NjkgMTcuMTg3NUwyLjA3MDMxIDYuMzI4MTJaTTE1LjI3MzQgOS4yOTY4OEMxNS4yNzM0IDEwIDE1IDEwLjgyMDMgMTQuNjQ4NCAxMS45NTMxTDEzLjgyODEgMTQuNzI2NkwxMC44MjAzIDUuODIwMzFDMTEuMzI4MSA1Ljc4MTI1IDExLjc1NzggNS43NDIxOSAxMS43NTc4IDUuNzQyMTlDMTIuMjI2NiA1LjY2NDA2IDEyLjE0ODQgNSAxMS43MTg4IDUuMDM5MDZDMTEuNzE4OCA1LjAzOTA2IDEwLjM1MTYgNS4xNTYyNSA5LjQ5MjE5IDUuMTU2MjVDOC42NzE4OCA1LjE1NjI1IDcuMzA0NjkgNS4wMzkwNiA3LjMwNDY5IDUuMDM5MDZDNi44NzUgNSA2Ljc5Njg4IDUuNzAzMTIgNy4yNjU2MiA1Ljc0MjE5QzcuMjY1NjIgNS43NDIxOSA3LjY5NTMxIDUuNzgxMjUgOC4xMjUgNS44MjAzMUw5LjQxNDA2IDkuMzM1OTRMNy42MTcxOSAxNC44MDQ3TDQuNTcwMzEgNS44MjAzMUM1LjA3ODEyIDUuNzgxMjUgNS41NDY4OCA1Ljc0MjE5IDUuNTQ2ODggNS43NDIxOUM1Ljk3NjU2IDUuNjY0MDYgNS45Mzc1IDUgNS40Njg3NSA1LjAzOTA2QzUuNDY4NzUgNS4wMzkwNiA0LjE0MDYyIDUuMTU2MjUgMy4yNDIxOSA1LjE1NjI1QzMuMDg1OTQgNS4xNTYyNSAyLjkyOTY5IDUuMTU2MjUgMi43MzQzOCA1LjE1NjI1QzQuMjE4NzUgMi44OTA2MiA2Ljc1NzgxIDEuNDA2MjUgOS42ODc1IDEuNDA2MjVDMTEuODM1OSAxLjQwNjI1IDEzLjc4OTEgMi4yMjY1NiAxNS4yNzM0IDMuNTkzNzVDMTUuMjM0NCAzLjU1NDY5IDE1LjE5NTMgMy41NTQ2OSAxNS4xNTYyIDMuNTU0NjlDMTQuMzc1IDMuNTU0NjkgMTMuNzg5MSA0LjI5Njg4IDEzLjc4OTEgNS4wMzkwNkMxMy43ODkxIDUuNzQyMTkgMTQuMTc5NyA2LjMyODEyIDE0LjYwOTQgNi45OTIxOUMxNC45MjE5IDcuNTM5MDYgMTUuMjczNCA4LjI0MjE5IDE1LjI3MzQgOS4yOTY4OFpNOS44MDQ2OSAxMC40Mjk3TDEyLjM4MjggMTcuNDIxOUMxMi4zODI4IDE3LjQ2MDkgMTIuNDIxOSAxNy41IDEyLjQyMTkgMTcuNTM5MUMxMS41NjI1IDE3Ljg1MTYgMTAuNjI1IDE4LjAwNzggOS42ODc1IDE4LjAwNzhDOC44NjcxOSAxOC4wMDc4IDguMDg1OTQgMTcuODkwNiA3LjMwNDY5IDE3LjY5NTNMOS44MDQ2OSAxMC40Mjk3Wk0xNi45NTMxIDUuNzAzMTJDMTcuNjE3MiA2LjkxNDA2IDE3Ljk2ODggOC4yNDIxOSAxNy45Njg4IDkuNjg3NUMxNy45Njg4IDEyLjc3MzQgMTYuMzI4MSAxNS40Mjk3IDEzLjgyODEgMTYuODc1TDE2LjM2NzIgOS41MzEyNUMxNi44NzUgOC4zNTkzOCAxNy4wMzEyIDcuNDIxODggMTcuMDMxMiA2LjU2MjVDMTcuMDMxMiA2LjI1IDE2Ljk5MjIgNS45NzY1NiAxNi45NTMxIDUuNzAzMTJaTTE5LjM3NSA5LjY4NzVDMTkuMzc1IDQuMzc1IDE1IDAgOS42ODc1IDBDNC4zMzU5NCAwIDAgNC4zNzUgMCA5LjY4NzVDMCAxNS4wMzkxIDQuMzM1OTQgMTkuMzc1IDkuNjg3NSAxOS4zNzVDMTUgMTkuMzc1IDE5LjM3NSAxNS4wMzkxIDE5LjM3NSA5LjY4NzVaTTE4LjkwNjIgOS42ODc1QzE4LjkwNjIgMTQuODA0NyAxNC43NjU2IDE4Ljk0NTMgOS42ODc1IDE4Ljk0NTNDNC41NzAzMSAxOC45NDUzIDAuNDI5Njg4IDE0LjgwNDcgMC40Mjk2ODggOS42ODc1QzAuNDI5Njg4IDQuNjA5MzggNC41NzAzMSAwLjQ2ODc1IDkuNjg3NSAwLjQ2ODc1QzE0Ljc2NTYgMC40Njg3NSAxOC45MDYyIDQuNjA5MzggMTguOTA2MiA5LjY4NzVaIiBmaWxsPSIjMUQyMzI3Ii8+DQo8L3N2Zz4NCg==");

/***/ }),

/***/ "./v2/onboarding/src/components/Controls/CustomSelectControlWithPlaceholder.js":
/*!*************************************************************************************!*\
  !*** ./v2/onboarding/src/components/Controls/CustomSelectControlWithPlaceholder.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * CustomSelectControl wrapper with placeholder support.
 *
 * @package Athemes Starter Sites
 */




/**
 * Placeholder option key used internally.
 */

const PLACEHOLDER_KEY = '__placeholder__';

/**
 * CustomSelectControl wrapper that adds placeholder functionality.
 *
 * @param {Object}   props                       Component props.
 * @param {string}   props.placeholder           Placeholder text to display when no value is selected.
 * @param {Array}    props.options               Available options (without placeholder).
 * @param {Object}   props.value                 Currently selected value.
 * @param {Function} props.onChange              Callback when selection changes.
 * @param {string}   props.label                 Control label.
 * @param {boolean}  props.__next40pxDefaultSize Size variant flag.
 * @param {Object}   ...restProps                All other CustomSelectControl props.
 * @return {JSX.Element} CustomSelectControl with placeholder support.
 */
function CustomSelectControlWithPlaceholder({
  placeholder = '',
  options = [],
  value = null,
  onChange,
  ...restProps
}) {
  // Create placeholder option with special styling
  const placeholderOption = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
    key: PLACEHOLDER_KEY,
    name: placeholder,
    style: {
      color: 'var(--atss-color-text-icon)',
      fontStyle: 'normal'
    }
  }), [placeholder]);

  // Determine the actual value to pass to CustomSelectControl
  const controlValue = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    // If no value is selected or value is null/undefined, use placeholder
    if (!value || value.key === PLACEHOLDER_KEY) {
      return placeholderOption;
    }
    return value;
  }, [value, placeholderOption]);

  // Check if placeholder is currently showing
  const isPlaceholderShowing = !value || value.key === PLACEHOLDER_KEY;

  /**
   * Handle selection changes.
   * Filter out placeholder selections and pass null instead.
   */
  const handleChange = changeObject => {
    const {
      selectedItem
    } = changeObject;

    // If placeholder is selected, pass null to parent
    if (selectedItem.key === PLACEHOLDER_KEY) {
      onChange({
        ...changeObject,
        selectedItem: null
      });
      return;
    }

    // Otherwise, pass through the selected item
    onChange(changeObject);
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: isPlaceholderShowing ? 'atss-custom-select-placeholder-showing' : '',
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CustomSelectControl, {
      ...restProps,
      options: options,
      value: controlValue,
      onChange: handleChange
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomSelectControlWithPlaceholder);

/***/ }),

/***/ "./v2/onboarding/src/components/Controls/RadioCardControl.js":
/*!*******************************************************************!*\
  !*** ./v2/onboarding/src/components/Controls/RadioCardControl.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/check.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Radio Card Control component for the onboarding wizard.
 *
 * @package Athemes Starter Sites
 */





/**
 * Radio Card Control component displaying selectable card options.
 *
 * @param {Object}   props          Component props.
 * @param {string}   props.label    Label for the control.
 * @param {Array}    props.options  Array of options with value, label, and icon.
 * @param {string}   props.selected Currently selected value.
 * @param {string}   props.default  Default value to use when selected is null/undefined.
 * @param {Function} props.onChange Callback when selection changes.
 * @return {JSX.Element} Radio Card Control component.
 */

function RadioCardControl({
  label,
  options = [],
  selected,
  default: defaultValue,
  onChange
}) {
  // Use default value if selected is null or undefined
  const currentValue = selected ?? defaultValue;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
    className: "atss-onboarding-wizard__radio-card-control",
    role: "radiogroup",
    "aria-labelledby": label ? 'radio-card-label' : undefined,
    children: [label && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
      id: "radio-card-label",
      className: "atss-onboarding-wizard__radio-card-label components-base-control__label",
      children: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "atss-onboarding-wizard__radio-card-options",
      children: options.map(option => {
        const isSelected = currentValue === option.value;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
          type: "button",
          className: `atss-onboarding-wizard__radio-card atss-form-field flex items-center gap-sm ${isSelected ? 'is-selected' : ''}`,
          onClick: () => onChange(option.value),
          role: "radio",
          "aria-checked": isSelected,
          children: [option.icon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "atss-onboarding-wizard__radio-card-icon flex align-center",
            children: option.icon
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "atss-onboarding-wizard__radio-card-text text-sm",
            children: option.label
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "atss-onboarding-wizard__radio-card-indicator",
            children: isSelected ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Icon, {
              icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"]
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: "atss-onboarding-wizard__radio-card-circle"
            })
          })]
        }, option.value);
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RadioCardControl);

/***/ }),

/***/ "./v2/onboarding/src/components/Layout/CloseConfirmationModal.js":
/*!***********************************************************************!*\
  !*** ./v2/onboarding/src/components/Layout/CloseConfirmationModal.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Close confirmation modal component.
 *
 * @package Athemes Starter Sites
 */





/**
 * CloseConfirmationModal component.
 *
 * @param {Object}   props           Component props.
 * @param {boolean}  props.isOpen    Whether the modal is open.
 * @param {Function} props.onCancel  Callback when user cancels.
 * @param {Function} props.onConfirm Callback when user confirms close.
 * @return {JSX.Element|null} Modal component or null if not open.
 */

function CloseConfirmationModal({
  isOpen,
  onCancel,
  onConfirm
}) {
  if (!isOpen) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Modal, {
    style: {
      width: '500px',
      padding: '18px 30px'
    },
    onRequestClose: onCancel,
    __experimentalHideHeader: true,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "flex flex-col items-center text-align-center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
        className: "font-medium text-lg",
        style: {
          margin: '0 0 10px'
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Are you sure you want to close?', 'athemes-starter-sites')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "text-md text-tertiary",
        style: {
          maxWidth: '320px'
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('You can access the setup wizard again from Theme Dashboard > Settings', 'athemes-starter-sites')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "flex gap-xxl items-center justify-center",
        style: {
          marginTop: '30px'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
          type: "button",
          className: "atss-onboarding-wizard__btn atss-onboarding-wizard__btn--continue text-lg",
          onClick: onCancel,
          style: {
            height: '52px',
            padding: '15px 28px'
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('No', 'athemes-starter-sites')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
          type: "button",
          className: "atss-onboarding-wizard__btn atss-onboarding-wizard__btn--skip text-lg",
          style: {
            height: '52px',
            padding: '15px 20px'
          },
          onClick: onConfirm,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Yes', 'athemes-starter-sites')
        })]
      })]
    })
  });
}
CloseConfirmationModal.propTypes = {
  isOpen: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool).isRequired,
  onCancel: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  onConfirm: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CloseConfirmationModal);

/***/ }),

/***/ "./v2/onboarding/src/components/Layout/Footer.js":
/*!*******************************************************!*\
  !*** ./v2/onboarding/src/components/Layout/Footer.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Spinner */ "./v2/onboarding/src/components/Layout/Spinner.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Footer component for the onboarding wizard.
 *
 * @package Athemes Starter Sites
 */





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

function Footer({
  showBack = true,
  showSkip = false,
  showContinue = true,
  continueText = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Continue', 'athemes-starter-sites'),
  onBack,
  onSkip,
  onContinue,
  continueDisabled = false,
  continueLoading = false,
  continueError = null
}) {
  // Determine if the Continue button should show an arrow icon.
  // Show arrow when Skip is visible or Back is hidden.
  const showContinueArrow = showSkip || !showBack;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("footer", {
    className: "atss-onboarding-wizard__footer",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
      className: "atss-onboarding-wizard__footer-left",
      children: showBack && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("button", {
        type: "button",
        className: "atss-onboarding-wizard__btn atss-onboarding-wizard__btn--back",
        onClick: onBack,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "atss-onboarding-wizard__btn-arrow",
          "aria-hidden": "true",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("svg", {
            width: "21",
            height: "12",
            viewBox: "0 0 21 12",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            "aria-hidden": "true",
            focusable: "false",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
              d: "M0.421875 4.92188L4.92188 0.421875C5.37891 0 6.08203 0 6.53906 0.421875C6.96094 0.878906 6.96094 1.58203 6.53906 2.03906L3.9375 4.60547H19.2305C19.8633 4.60547 20.3555 5.09766 20.3555 5.73047C20.3555 6.36328 19.8633 6.85547 19.2305 6.85547H3.9375L6.53906 9.42188C6.96094 9.87891 6.96094 10.582 6.53906 11.0391C6.08203 11.4609 5.37891 11.4609 4.92188 11.0391L0.421875 6.53906C0 6.08203 0 5.37891 0.421875 4.92188Z",
              fill: "#A7AAAD"
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
          className: "atss-onboarding-wizard__btn-text",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Back', 'athemes-starter-sites')
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "atss-onboarding-wizard__footer-right flex",
      children: [showSkip && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
        type: "button",
        className: `atss-onboarding-wizard__btn atss-onboarding-wizard__btn--skip${continueLoading ? ' atss-onboarding-wizard__btn--loading' : ''}`,
        onClick: onSkip,
        disabled: continueLoading,
        "aria-live": "polite",
        "aria-busy": continueLoading,
        children: continueLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            style: {
              opacity: 0
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Skip', 'athemes-starter-sites')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
            className: "atss-onboarding-wizard__btn-spinner",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Spinner__WEBPACK_IMPORTED_MODULE_2__["default"], {})
          })]
        }) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Skip', 'athemes-starter-sites')
      }), showContinue && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "atss-onboarding-wizard__footer-continue-wrapper",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
          type: "button",
          className: `atss-onboarding-wizard__btn atss-onboarding-wizard__btn--continue${continueLoading ? ' atss-onboarding-wizard__btn--loading' : ''}`,
          onClick: onContinue,
          disabled: continueDisabled || continueLoading,
          "aria-live": "polite",
          "aria-busy": continueLoading,
          children: continueLoading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              style: {
                opacity: 0
              },
              children: continueError ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Retry', 'athemes-starter-sites') : continueText
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: "atss-onboarding-wizard__btn-spinner",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_Spinner__WEBPACK_IMPORTED_MODULE_2__["default"], {})
            })]
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
            children: [continueError ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Retry', 'athemes-starter-sites') : continueText, showContinueArrow && !continueError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("span", {
              className: "atss-onboarding-wizard__btn-arrow",
              "aria-hidden": "true",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("svg", {
                width: "16",
                height: "11",
                viewBox: "0 0 16 11",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                "aria-hidden": "true",
                focusable: "false",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("path", {
                  d: "M10.4062 0.140625C10.582 4.51798e-07 10.8281 4.30284e-07 11.0039 0.140625L15.6445 4.78125C15.7852 4.95703 15.7852 5.20312 15.6445 5.37891L11.0039 10.0195C10.8281 10.1602 10.582 10.1602 10.4062 10.0195L9.70312 9.31641C9.5625 9.14063 9.5625 8.89453 9.73828 8.71875L12.5508 6.01172L0.421874 6.01172C0.210937 6.01172 -1.00946e-06 5.80078 -1.0279e-06 5.58985L-1.11396e-06 4.60547C-1.13547e-06 4.35938 0.210936 4.1836 0.421874 4.1836L12.5508 4.18359L9.73828 1.44141C9.5625 1.26563 9.5625 1.01953 9.70312 0.843751L10.4062 0.140625Z",
                  fill: "white"
                })
              })
            })]
          })
        }), continueError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("p", {
          className: "atss-onboarding-wizard__footer-error-message",
          role: "alert",
          "aria-live": "assertive",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Connection issue. Click Retry to continue.', 'athemes-starter-sites')
        })]
      })]
    })]
  });
}
Footer.propTypes = {
  showBack: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  showSkip: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  showContinue: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  continueText: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
  onBack: (props, propName, componentName) => {
    if (props.showBack && !props[propName]) {
      return new Error(`${propName} is required when showBack is true in ${componentName}`);
    }
  },
  onSkip: (props, propName, componentName) => {
    if (props.showSkip && !props[propName]) {
      return new Error(`${propName} is required when showSkip is true in ${componentName}`);
    }
  },
  onContinue: (props, propName, componentName) => {
    if (props.showContinue && !props[propName]) {
      return new Error(`${propName} is required when showContinue is true in ${componentName}`);
    }
  },
  continueDisabled: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  continueLoading: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
  continueError: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
Footer.defaultProps = {
  showBack: true,
  showSkip: false,
  showContinue: true,
  continueText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Continue', 'athemes-starter-sites'),
  continueDisabled: false,
  continueLoading: false,
  continueError: null
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ }),

/***/ "./v2/onboarding/src/components/Layout/FooterButton.js":
/*!*************************************************************!*\
  !*** ./v2/onboarding/src/components/Layout/FooterButton.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * FooterButton component.
 * A reusable button component for footer actions in the Complete screen.
 *
 * @package Athemes Starter Sites
 */




/**
 * FooterButton component.
 *
 * @param {Object}   props       Component props.
 * @param {string}   props.label Button label text.
 * @param {Function} props.onClick Click handler callback.
 * @param {string}   props.className Additional CSS classes.
 * @return {JSX.Element} Button element.
 */

function FooterButton({
  label,
  onClick,
  className = ''
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("button", {
    type: "button",
    className: `atss-onboarding-wizard__btn atss-onboarding-wizard__btn--skip w100 ${className}`,
    onClick: onClick,
    children: label
  });
}
FooterButton.propTypes = {
  label: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string).isRequired,
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired,
  className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string)
};
FooterButton.defaultProps = {
  className: ''
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FooterButton);

/***/ }),

/***/ "./v2/onboarding/src/components/Layout/Navigation.js":
/*!***********************************************************!*\
  !*** ./v2/onboarding/src/components/Layout/Navigation.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../utils/helpers */ "./v2/onboarding/src/utils/helpers.js");
/* harmony import */ var _CloseConfirmationModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CloseConfirmationModal */ "./v2/onboarding/src/components/Layout/CloseConfirmationModal.js");
/* harmony import */ var _context_WizardContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../context/WizardContext */ "./v2/onboarding/src/context/WizardContext.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * Navigation bar component for the onboarding wizard.
 *
 * @package Athemes Starter Sites
 */








/**
 * Navigation component displaying logo, steps, and close button.
 *
 * @param {Object}   props                 Component props.
 * @param {Array}    props.steps           Array of step objects.
 * @param {number}   props.currentStep     Current active step ID.
 * @param {Array}    props.completedSteps  Array of completed step IDs.
 * @param {Function} props.onStepChange    Callback when step is clicked.
 * @param {Function} props.onClose         Callback when close button is clicked.
 * @return {JSX.Element} Navigation component.
 */

function Navigation({
  steps,
  currentStep,
  completedSteps = [],
  onStepChange,
  onClose
}) {
  // Get import completion status from context
  const {
    isImportComplete
  } = (0,_context_WizardContext__WEBPACK_IMPORTED_MODULE_5__.useWizard)();

  // State for close confirmation modal
  const [isCloseModalOpen, setIsCloseModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  /**
   * Check if a step is accessible for navigation.
   *
   * @param {number} stepId Step ID to check.
   * @return {boolean} Whether the step is accessible.
   */
  const isStepAccessible = stepId => {
    // First step is always accessible.
    if (stepId === 1) {
      return true;
    }

    // Current step and previous steps are accessible.
    if (currentStep >= stepId) {
      return true;
    }

    // Completed steps are accessible.
    if (completedSteps.includes(stepId - 1)) {
      return true;
    }
    return false;
  };

  /**
   * Handle step button click.
   *
   * @param {number} stepId Step ID clicked.
   */
  const handleStepClick = stepId => {
    if (isStepAccessible(stepId) && onStepChange) {
      onStepChange(stepId);
    }
  };

  // Calculate theme logo once on mount since it depends on stable global variable
  const themeLogo = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    return (0,_utils_helpers__WEBPACK_IMPORTED_MODULE_3__.getThemeLogo)();
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("nav", {
    className: "atss-onboarding-wizard__nav flex justify-between items-center",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "atss-onboarding-wizard__logo flex items-center gap-md",
      children: [themeLogo && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
        src: themeLogo,
        alt: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Theme Logo', 'athemes-starter-sites'),
        className: "atss-onboarding-wizard__logo-image"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "atss-onboarding-wizard__logo-title text-lg font-medium",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Site Wizard', 'athemes-starter-sites')
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "atss-onboarding-wizard__steps flex items-center gap-xs",
      children: steps.filter(step => !step.hidden).map(step => {
        const isCompleted = completedSteps.includes(step.id);
        const isActive = currentStep === step.id;
        const isAccessible = isStepAccessible(step.id);
        // Only show checkmark if completed AND we're past this step.
        const showCheckmark = isCompleted && currentStep > step.id;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("button", {
          className: ['atss-onboarding-wizard__step flex items-center gap-xs', isActive && 'is-active text-heading', showCheckmark && 'is-completed text-secondary', !isActive && !showCheckmark && 'text-tertiary', !isAccessible && 'is-disabled'].filter(Boolean).join(' '),
          onClick: () => handleStepClick(step.id),
          disabled: !isAccessible,
          "aria-label": step.title,
          "aria-current": isActive ? 'step' : undefined,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            className: "atss-onboarding-wizard__step-number text-xs font-semibold text-icon",
            children: showCheckmark ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
              className: "atss-onboarding-wizard__step-checkmark",
              style: {
                lineHeight: '1'
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("svg", {
                width: "12",
                height: "10",
                viewBox: "0 0 12 10",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                style: {
                  maxWidth: '11px',
                  verticalAlign: 'middle'
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
                  d: "M1 5L4.5 8.5L11 1",
                  stroke: "white",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })
              })
            }) : step.id
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
            className: "atss-onboarding-wizard__step-label text-xs font-semibold",
            children: step.title
          })]
        }, step.id);
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("button", {
      type: "button",
      className: "atss-onboarding-wizard__close text-icon",
      onClick: () => {
        // If import is complete, close directly without confirmation
        if (isImportComplete) {
          onClose();
        } else {
          setIsCloseModalOpen(true);
        }
      },
      "aria-label": (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close wizard', 'athemes-starter-sites'),
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "atss-onboarding-wizard__close-icon",
        "aria-hidden": "true",
        children: "\xD7"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
        className: "screen-reader-text",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Close wizard', 'athemes-starter-sites')
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_CloseConfirmationModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isOpen: isCloseModalOpen,
      onCancel: () => setIsCloseModalOpen(false),
      onConfirm: () => {
        setIsCloseModalOpen(false);
        onClose();
      }
    })]
  });
}
Navigation.propTypes = {
  steps: prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({
    id: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number).isRequired,
    slug: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
    title: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
    component: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().elementType).isRequired
  })).isRequired,
  currentStep: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number).isRequired,
  completedSteps: prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_2___default().number)),
  onStepChange: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  onClose: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired
};
Navigation.defaultProps = {
  completedSteps: []
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navigation);

/***/ }),

/***/ "./v2/onboarding/src/components/Layout/PageCard.js":
/*!*********************************************************!*\
  !*** ./v2/onboarding/src/components/Layout/PageCard.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/search.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index */ "./v2/onboarding/src/components/Layout/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * PageCard component for displaying individual pages in the Pages step.
 *
 * @package Athemes Starter Sites
 */







/**
 * PageCard component.
 *
 * @param {Object}   props           Component props.
 * @param {string}   props.id        Page ID.
 * @param {string}   props.title     Page title/name.
 * @param {string}   props.url       Preview URL for iframe.
 * @param {string}   props.thumbnail Fallback thumbnail image (optional).
 * @param {boolean}  props.isSelected Whether this page is selected.
 * @param {Function} props.onToggle  Callback when checkbox is toggled.
 * @param {Function} props.onClick   Callback when card is clicked (for preview).
 * @return {JSX.Element} PageCard component.
 */

function PageCard({
  id,
  title,
  url,
  thumbnail,
  isSelected = false,
  onToggle,
  onClick
}) {
  const [hasIframeError, setHasIframeError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isIframeLoading, setIsIframeLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);

  // Process URL for front page/home - remove page_id query parameter and add atss_preview=1
  const processedUrl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (!url) {
      return url;
    }
    let processedUrl = url;
    const normalizedTitle = title?.toLowerCase().trim();
    if (normalizedTitle === 'my front page' || normalizedTitle === 'home') {
      processedUrl = url.replace(/\?page_id=\d+/, '');
    }

    // Add atss_preview=1 parameter
    processedUrl = `${processedUrl}${processedUrl.includes('?') ? '&' : '?'}atss_preview=1`;
    return processedUrl;
  }, [url, title]);

  // Handle iframe load
  const handleIframeLoad = () => {
    setIsIframeLoading(false);
  };

  // Handle iframe load error
  const handleIframeError = () => {
    setHasIframeError(true);
    setIsIframeLoading(false);
  };

  // Handle checkbox toggle
  const handleToggle = e => {
    e.stopPropagation();
    if (onToggle) {
      onToggle(id);
    }
  };

  // Handle card click
  const handleCardClick = () => {
    if (onClick) {
      onClick();
    }
  };

  // Only show the thumbnail if the iframe is not loading (missing preview or error)
  const shouldShowThumbnail = !processedUrl || hasIframeError;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: `atss-page-card ${isSelected ? 'atss-page-card--selected' : ''}`,
    onClick: handleCardClick,
    style: {
      cursor: onClick ? 'pointer' : 'default'
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "atss-page-card__preview",
      children: [processedUrl && !hasIframeError && isIframeLoading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "atss-page-card__loading",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_index__WEBPACK_IMPORTED_MODULE_4__.Spinner, {})
      }), processedUrl && !hasIframeError && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("iframe", {
        src: processedUrl,
        className: "atss-page-card__iframe",
        title: title,
        onLoad: handleIframeLoad,
        onError: handleIframeError,
        sandbox: "allow-scripts allow-same-origin",
        loading: "lazy",
        style: {
          opacity: isIframeLoading ? 0 : 1
        }
      }), shouldShowThumbnail && thumbnail && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
        src: thumbnail,
        alt: title,
        className: "atss-page-card__thumbnail",
        loading: "lazy"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "atss-page-card__dark-overlay"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "atss-page-card__hover-overlay",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Icon, {
          icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
        type: "button",
        className: `atss-page-card__checkbox ${isSelected ? 'atss-page-card__checkbox--checked' : ''}`,
        onClick: handleToggle,
        "aria-checked": isSelected,
        "aria-label": isSelected ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Deselect page', 'athemes-starter-sites') : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select page', 'athemes-starter-sites'),
        children: isSelected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("svg", {
          width: "12",
          height: "10",
          viewBox: "0 0 12 10",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          className: "atss-page-card__checkmark",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
            d: "M1 5L4.5 8.5L11 1",
            stroke: "white",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "atss-page-card__info",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
        className: "atss-page-card__title text-xs",
        children: title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Untitled Page', 'athemes-starter-sites')
      })
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageCard);

/***/ }),

/***/ "./v2/onboarding/src/components/Layout/ResumeModal.js":
/*!************************************************************!*\
  !*** ./v2/onboarding/src/components/Layout/ResumeModal.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Resume session modal component.
 *
 * @package Athemes Starter Sites
 */





/**
 * ResumeModal component.
 *
 * Displays when user returns to an incomplete wizard session.
 *
 * @param {Object}   props          Component props.
 * @param {boolean}  props.isOpen   Whether the modal is open.
 * @param {Function} props.onResume Callback when user resumes session.
 * @param {Function} props.onRestart Callback when user restarts from scratch.
 * @return {JSX.Element|null} Modal component or null if not open.
 */

function ResumeModal({
  isOpen,
  onResume,
  onRestart
}) {
  if (!isOpen) {
    return null;
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Modal, {
    style: {
      width: '500px',
      padding: '18px 30px'
    },
    onRequestClose: onResume,
    __experimentalHideHeader: true,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
      className: "flex flex-col items-center text-align-center",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("h2", {
        className: "font-medium text-lg",
        style: {
          margin: '0 0 10px'
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Resume last session?', 'athemes-starter-sites')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("div", {
        className: "text-md text-tertiary",
        style: {
          maxWidth: '380px'
        },
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('It appears that your previous website building session was interrupted. Would you like to pick up where you left off?', 'athemes-starter-sites')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)("div", {
        className: "flex gap-xxl items-center justify-center",
        style: {
          marginTop: '30px'
        },
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
          type: "button",
          className: "atss-onboarding-wizard__btn atss-onboarding-wizard__btn--continue text-lg",
          onClick: onResume,
          style: {
            height: '52px',
            padding: '15px 28px'
          },
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Resume', 'athemes-starter-sites')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)("button", {
          type: "button",
          className: "atss-onboarding-wizard__btn atss-onboarding-wizard__btn--skip text-lg",
          style: {
            height: '52px',
            padding: '15px 20px'
          },
          onClick: onRestart,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Restart', 'athemes-starter-sites')
        })]
      })]
    })
  });
}
ResumeModal.propTypes = {
  isOpen: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool).isRequired,
  onResume: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  onRestart: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResumeModal);

/***/ }),

/***/ "./v2/onboarding/src/components/Layout/Spinner.js":
/*!********************************************************!*\
  !*** ./v2/onboarding/src/components/Layout/Spinner.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Loading spinner component.
 *
 * @return {JSX.Element} Loading spinner.
 */
function Spinner() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
    className: "atss-onboarding-wizard__loading",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
      className: "atss-onboarding-wizard__spinner",
      viewBox: "0 0 36 36",
      fill: "none",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M34 18C34 15.8989 33.5861 13.8183 32.7821 11.8771C31.978 9.93586 30.7994 8.17203 29.3137 6.68629C27.828 5.20055 26.0641 4.022 24.1229 3.21793C22.1817 2.41385 20.1011 2 18 2C15.8988 2 13.8183 2.41385 11.8771 3.21793C9.93585 4.022 8.17203 5.20055 6.68629 6.68629C5.20055 8.17203 4.022 9.93586 3.21793 11.8771C2.41385 13.8183 2 15.8989 2 18",
        stroke: "url(#atss-spinner-gradient-0)",
        strokeWidth: "4",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeDasharray: "0.1 8"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
        d: "M3.21793 24.1229C4.022 26.0641 5.20055 27.828 6.68629 29.3137C8.17203 30.7994 9.93585 31.978 11.8771 32.7821C13.8183 33.5861 15.8988 34 18 34C20.1011 34 22.1817 33.5861 24.1229 32.7821C26.0641 31.978 27.828 30.7994 29.3137 29.3137C30.7994 27.828 31.978 26.0641 32.7821 24.1229",
        stroke: "url(#atss-spinner-gradient-1)",
        strokeWidth: "4",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeDasharray: "0.1 8"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("defs", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
          id: "atss-spinner-gradient-0",
          x1: "34",
          y1: "18",
          x2: "2",
          y2: "18",
          gradientUnits: "userSpaceOnUse",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
            stopColor: "currentColor"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
            offset: "1",
            stopColor: "currentColor",
            stopOpacity: "0.5"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("linearGradient", {
          id: "atss-spinner-gradient-1",
          x1: "33",
          y1: "23.5",
          x2: "3",
          y2: "24",
          gradientUnits: "userSpaceOnUse",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
            stopOpacity: "0",
            stopColor: "currentColor"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("stop", {
            offset: "1",
            stopColor: "currentColor",
            stopOpacity: "0.48"
          })]
        })]
      })]
    })
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spinner);

/***/ }),

/***/ "./v2/onboarding/src/components/Layout/index.js":
/*!******************************************************!*\
  !*** ./v2/onboarding/src/components/Layout/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Footer: () => (/* reexport safe */ _Footer__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   FooterButton: () => (/* reexport safe */ _FooterButton__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   Navigation: () => (/* reexport safe */ _Navigation__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   PageCard: () => (/* reexport safe */ _PageCard__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   ResumeModal: () => (/* reexport safe */ _ResumeModal__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   Spinner: () => (/* reexport safe */ _Spinner__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _Navigation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navigation */ "./v2/onboarding/src/components/Layout/Navigation.js");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Footer */ "./v2/onboarding/src/components/Layout/Footer.js");
/* harmony import */ var _FooterButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FooterButton */ "./v2/onboarding/src/components/Layout/FooterButton.js");
/* harmony import */ var _Spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Spinner */ "./v2/onboarding/src/components/Layout/Spinner.js");
/* harmony import */ var _PageCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PageCard */ "./v2/onboarding/src/components/Layout/PageCard.js");
/* harmony import */ var _ResumeModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ResumeModal */ "./v2/onboarding/src/components/Layout/ResumeModal.js");
/**
 * Layout components index.
 *
 * @package Athemes Starter Sites
 */








/***/ }),

/***/ "./v2/onboarding/src/components/Steps/GettingStarted.js":
/*!**************************************************************!*\
  !*** ./v2/onboarding/src/components/Steps/GettingStarted.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _Controls_RadioCardControl__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Controls/RadioCardControl */ "./v2/onboarding/src/components/Controls/RadioCardControl.js");
/* harmony import */ var _Controls_CustomSelectControlWithPlaceholder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Controls/CustomSelectControlWithPlaceholder */ "./v2/onboarding/src/components/Controls/CustomSelectControlWithPlaceholder.js");
/* harmony import */ var _Layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Layout */ "./v2/onboarding/src/components/Layout/index.js");
/* harmony import */ var _data_starter_categories__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../data/starter-categories */ "./v2/onboarding/src/data/starter-categories.js");
/* harmony import */ var _context_WizardContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../context/WizardContext */ "./v2/onboarding/src/context/WizardContext.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
/**
 * Getting Started step component.
 *
 * @package Athemes Starter Sites
 */










/**
 * Getting Started step component.
 *
 * @param {Object}   props                  Component props.
 * @param {Function} props.onContinue       Callback to proceed to next step.
 * @param {boolean}  props.navigationLoading Whether navigation is in loading state.
 * @param {string}   props.navigationError   Navigation error message.
 * @return {JSX.Element} GettingStarted component.
 */

function GettingStarted({
  onContinue,
  navigationLoading,
  navigationError
}) {
  const {
    wizardData,
    siteTitle,
    setSiteTitle,
    builder,
    setBuilder
  } = (0,_context_WizardContext__WEBPACK_IMPORTED_MODULE_7__.useWizard)();
  const savedData = wizardData['getting-started'] || {};
  const [dropdownValue, setDropdownValue] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(savedData.siteCategory || null);
  const [selectedBuilder, setSelectedBuilder] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(builder || 'gutenberg');
  const wordpressIcon = (__webpack_require__(/*! ../../assets/images/wordpress.svg */ "./v2/onboarding/src/assets/images/wordpress.svg")["default"]);
  const elementorIcon = (__webpack_require__(/*! ../../assets/images/elementor.svg */ "./v2/onboarding/src/assets/images/elementor.svg")["default"]);

  // Check if current theme is Botiga.
  const themeName = typeof atssOnboarding !== 'undefined' ? atssOnboarding?.themeName : '';
  const isBotiga = themeName?.toLowerCase().includes('botiga');

  /**
   * Handle continue button click.
   */
  const handleContinue = () => {
    // Update context builder before continuing
    setBuilder(selectedBuilder);
    onContinue({
      siteCategory: dropdownValue,
      builder: selectedBuilder
    });
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
    className: "atss-onboarding-wizard__step atss-onboarding-wizard__step--getting-started",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("main", {
      className: "atss-onboarding-wizard__step-body",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: "atss-onboarding-wizard__step-body-content",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
          className: "atss-onboarding-wizard__emoji-circle",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
            src: __webpack_require__(/*! ../../assets/images/waving.jpg */ "./v2/onboarding/src/assets/images/waving.jpg"),
            alt: "Waving hand",
            width: "74",
            height: "74",
            className: "atss-onboarding-wizard__emoji"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("h2", {
          className: "atss-onboarding-wizard__step-body-title text-xl font-medium",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Let’s build your website!', 'athemes-starter-sites')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("p", {
          className: "atss-onboarding-wizard__step-body-description text-sm text-secondary",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Tell us a bit about your site so we can recommend the perfect templates and tools to get you started', 'athemes-starter-sites')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "atss-onboarding-wizard__step-body-form atss-options-form flex flex-col gap-xxl",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
            className: "atss-form-row flex gap-xxl",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "atss-form-field",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Site Name', 'athemes-starter-sites'),
                value: siteTitle,
                placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Name of your website', 'athemes-starter-sites'),
                onChange: value => setSiteTitle(value),
                __next40pxDefaultSize: true,
                __nextHasNoMarginBottom: true
              })
            }), !isBotiga && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
              className: "atss-form-field",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Controls_CustomSelectControlWithPlaceholder__WEBPACK_IMPORTED_MODULE_4__["default"], {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Industry', 'athemes-starter-sites'),
                placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Select an industry ...', 'athemes-starter-sites'),
                options: _data_starter_categories__WEBPACK_IMPORTED_MODULE_6__["default"],
                value: dropdownValue,
                onChange: ({
                  selectedItem
                }) => setDropdownValue(selectedItem),
                __next40pxDefaultSize: true
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
            className: "atss-form-field",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Controls_RadioCardControl__WEBPACK_IMPORTED_MODULE_3__["default"], {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Preferred builder', 'athemes-starter-sites'),
              options: [{
                value: 'gutenberg',
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Block Editor', 'athemes-starter-sites'),
                icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
                  src: wordpressIcon,
                  alt: ""
                })
              }, {
                value: 'elementor',
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Elementor', 'athemes-starter-sites'),
                icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
                  src: elementorIcon,
                  alt: ""
                })
              }],
              selected: selectedBuilder,
              onChange: value => setSelectedBuilder(value),
              default: 'gutenberg'
            })
          })]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_Layout__WEBPACK_IMPORTED_MODULE_5__.Footer, {
      showBack: false,
      showSkip: false,
      continueText: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Save and Continue', 'athemes-starter-sites'),
      onContinue: handleContinue,
      continueDisabled: !siteTitle.trim(),
      continueLoading: navigationLoading,
      continueError: navigationError
    })]
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GettingStarted);

/***/ }),

/***/ "./v2/onboarding/src/context/WizardContext.js":
/*!****************************************************!*\
  !*** ./v2/onboarding/src/context/WizardContext.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WizardProvider: () => (/* binding */ WizardProvider),
/* harmony export */   useWizard: () => (/* binding */ useWizard)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_wizard_steps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/wizard-steps */ "./v2/onboarding/src/data/wizard-steps.js");
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/api */ "./v2/onboarding/src/utils/api.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/**
 * Wizard context and provider.
 *
 * @package Athemes Starter Sites
 */





const WizardContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)();

/**
 * Hook to use the wizard context.
 *
 * @return {Object} The context value.
 */
const useWizard = () => {
  const context = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useContext)(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};

/**
 * Wizard provider component.
 *
 * @param {Object} props          Component props.
 * @param {Object} props.children Child components.
 * @return {JSX.Element} The provider component.
 */
const WizardProvider = ({
  children
}) => {
  const [state, setState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({
    builder: 'gutenberg',
    currentStep: 1,
    completedSteps: [],
    data: {}
  });
  const [isLoading, setIsLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [error, setError] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [prefetchedPages, setPrefetchedPages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [isImportComplete, setIsImportComplete] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [isHistoryInitialized, setIsHistoryInitialized] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const isHandlingPopState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);

  /**
   * Load initial state from the database.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const loadState = async () => {
      if (typeof atssOnboarding === 'undefined') {
        setIsLoading(false);
        return;
      }
      try {
        const data = await (0,_utils_api__WEBPACK_IMPORTED_MODULE_2__.getWizardState)();
        if (data && Object.keys(data).length > 0) {
          setState(prev => ({
            ...prev,
            ...data,
            builder: data.builder || 'gutenberg'
          }));
          setError(null); // Clear any previous errors
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to load wizard state:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadState();
  }, []);

  /**
   * Initialize browser history with current step on mount.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isLoading && !isHistoryInitialized) {
      // Replace initial history state with wizard step
      window.history.replaceState({
        wizardStep: state.currentStep
      }, '', window.location.href);
      setIsHistoryInitialized(true);
    }
  }, [isLoading, isHistoryInitialized, state.currentStep]);

  /**
   * Push history state when step changes (after initialization).
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!isHistoryInitialized || isHandlingPopState.current) {
      // Don't push history if we're handling a popstate event
      if (isHandlingPopState.current) {
        isHandlingPopState.current = false;
      }
      return;
    }

    // Push new history entry when step changes
    window.history.pushState({
      wizardStep: state.currentStep
    }, '', window.location.href);
  }, [state.currentStep, isHistoryInitialized]);

  /**
   * Listen for browser back/forward button.
   */
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const handlePopState = event => {
      if (event.state && typeof event.state.wizardStep === 'number') {
        // Set flag to prevent history push when we update state
        isHandlingPopState.current = true;

        // Navigate to the step from history
        const targetStep = event.state.wizardStep;

        // Update state without triggering history push
        setState(prev => ({
          ...prev,
          currentStep: targetStep
        }));
      } else {
        // No wizard state in history, allow default navigation (exit wizard)
        // This happens when user goes back beyond the first step
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  /**
   * Update step data.
   *
   * @param {string} stepSlug The step slug (e.g., 'getting-started').
   * @param {Object} data     The data to save for this step.
   */
  const updateStepData = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((stepSlug, data) => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [stepSlug]: data
      }
    }));
  }, []);

  /**
   * Get the site title (single source of truth).
   *
   * @return {string} The site title.
   */
  const siteTitle = state.data.siteTitle || '';

  /**
   * Update the site title (single source of truth).
   *
   * @param {string} title The new site title.
   */
  const setSiteTitle = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(title => {
    setState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        siteTitle: title
      }
    }));
  }, []);

  /**
   * Get the builder (single source of truth).
   *
   * @return {string} The builder.
   */
  const builder = state.builder || 'gutenberg';

  /**
   * Update the builder (single source of truth).
   *
   * @param {string} newBuilder The new builder.
   */
  const setBuilder = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(newBuilder => {
    const validBuilders = ['gutenberg', 'elementor', 'beaver-builder'];
    if (!validBuilders.includes(newBuilder)) {
      // eslint-disable-next-line no-console
      console.warn(`Invalid builder: ${newBuilder}. Defaulting to gutenberg.`);
      newBuilder = 'gutenberg';
    }
    setState(prev => ({
      ...prev,
      builder: newBuilder
    }));
  }, []);

  /**
   * Save state to the database.
   *
   * @param {Object} newState Optional new state to save. If not provided, uses current state.
   * @return {Promise} The save operation promise.
   */
  const saveState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (newState = null) => {
    const stateToSave = newState || state;
    try {
      await (0,_utils_api__WEBPACK_IMPORTED_MODULE_2__.saveWizardState)(stateToSave);
      setError(null); // Clear any previous errors
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to save wizard state:', error);
      setError(error.message);
      return false;
    }
  }, [state]);

  /**
   * Mark a step as completed and optionally move to next step.
   *
   * @param {number} stepId     Step ID to mark as completed.
   * @param {number} nextStepId Optional next step ID to move to.
   * @param {Object} stepData   Optional data to save for the current step.
   */
  const markStepCompleted = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (stepId, nextStepId = null, stepData = null) => {
    // Build the new state outside of setState to ensure we save what we set
    const updatedState = {
      ...state,
      completedSteps: state.completedSteps.includes(stepId) ? state.completedSteps : [...state.completedSteps, stepId],
      currentStep: nextStepId || state.currentStep
    };

    // Extract builder from stepData if present and set it at root level
    if (stepData && stepData.builder) {
      updatedState.builder = stepData.builder;
    }
    if (stepData) {
      const stepSlug = _data_wizard_steps__WEBPACK_IMPORTED_MODULE_1__["default"].find(s => s.id === stepId)?.slug;
      if (stepSlug) {
        updatedState.data = {
          ...state.data,
          [stepSlug]: stepData
        };
      }
    }

    // Save to database first with the complete updated state
    await saveState(updatedState);

    // Then update React state
    setState(updatedState);
  }, [state, saveState]);
  const setCurrentStep = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(stepId => {
    setState(prev => ({
      ...prev,
      currentStep: stepId
    }));
  }, []);

  /**
   * Reset wizard state (delete from database and reset to initial state).
   *
   * @return {Promise<boolean>} True if successful, false otherwise.
   */
  const resetWizard = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      await (0,_utils_api__WEBPACK_IMPORTED_MODULE_2__.deleteWizardState)();
      setState({
        currentStep: 1,
        completedSteps: [],
        data: {}
      });
      setError(null);
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to reset wizard:', error);
      setError(error.message);
      return false;
    }
  }, []);
  const value = {
    currentStep: state.currentStep,
    setCurrentStep,
    completedSteps: state.completedSteps,
    wizardData: state.data,
    updateStepData,
    saveState,
    markStepCompleted,
    isLoading,
    error,
    setError,
    prefetchedPages,
    setPrefetchedPages,
    siteTitle,
    setSiteTitle,
    builder,
    setBuilder,
    isImportComplete,
    setIsImportComplete,
    resetWizard
  };
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(WizardContext.Provider, {
    value: value,
    children: children
  });
};

/***/ }),

/***/ "./v2/onboarding/src/data/starter-categories.js":
/*!******************************************************!*\
  !*** ./v2/onboarding/src/data/starter-categories.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Starter categories configuration.
 *
 * @package Athemes Starter Sites
 */



/**
 * Starter categories for the Industry dropdown.
 *
 * These categories match the category keys used in the demo definitions
 * (e.g., in v2/themes/sydney.php and v2/themes/botiga.php).
 */
const starterCategories = [{
  key: 'business',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Business', 'athemes-starter-sites')
}, {
  key: 'ecommerce',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('eCommerce', 'athemes-starter-sites')
}, {
  key: 'portfolio',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Portfolio', 'athemes-starter-sites')
}, {
  key: 'blog',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Blog', 'athemes-starter-sites')
}, {
  key: 'magazine',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Magazine', 'athemes-starter-sites')
}, {
  key: 'other',
  name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Other', 'athemes-starter-sites')
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (starterCategories);

/***/ }),

/***/ "./v2/onboarding/src/data/wizard-steps.js":
/*!************************************************!*\
  !*** ./v2/onboarding/src/data/wizard-steps.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_Steps_GettingStarted__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Steps/GettingStarted */ "./v2/onboarding/src/components/Steps/GettingStarted.js");
/**
 * Wizard steps configuration.
 *
 * @package Athemes Starter Sites
 */





/**
 * Lazy load step components.
 */
const Design = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "v2_onboarding_src_components_Steps_Design_js").then(__webpack_require__.bind(__webpack_require__, /*! ../components/Steps/Design */ "./v2/onboarding/src/components/Steps/Design.js")));
const Customize = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "v2_onboarding_src_components_Steps_Customize_js").then(__webpack_require__.bind(__webpack_require__, /*! ../components/Steps/Customize */ "./v2/onboarding/src/components/Steps/Customize.js")));
const Pages = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "v2_onboarding_src_components_Steps_Pages_js").then(__webpack_require__.bind(__webpack_require__, /*! ../components/Steps/Pages */ "./v2/onboarding/src/components/Steps/Pages.js")));
const Contact = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_react-international-phone_dist_index_css-node_modules_react-internationa-e45498"), __webpack_require__.e("v2_onboarding_src_components_Steps_Contact_js-node_modules_react-international-phone_dist_index_css")]).then(__webpack_require__.bind(__webpack_require__, /*! ../components/Steps/Contact */ "./v2/onboarding/src/components/Steps/Contact.js")));
const Features = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "v2_onboarding_src_components_Steps_Features_js").then(__webpack_require__.bind(__webpack_require__, /*! ../components/Steps/Features */ "./v2/onboarding/src/components/Steps/Features.js")));
const Optin = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "v2_onboarding_src_components_Steps_Optin_js").then(__webpack_require__.bind(__webpack_require__, /*! ../components/Steps/Optin */ "./v2/onboarding/src/components/Steps/Optin.js")));
const Import = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.lazy)(() => __webpack_require__.e(/*! import() */ "v2_onboarding_src_components_Steps_Import_js").then(__webpack_require__.bind(__webpack_require__, /*! ../components/Steps/Import */ "./v2/onboarding/src/components/Steps/Import.js")));

/**
 * Wizard steps configuration.
 */
const wizardSteps = [{
  id: 1,
  slug: 'getting-started',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Getting Started', 'athemes-starter-sites'),
  component: _components_Steps_GettingStarted__WEBPACK_IMPORTED_MODULE_2__["default"]
}, {
  id: 2,
  slug: 'design',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Design', 'athemes-starter-sites'),
  component: Design
}, {
  id: 3,
  slug: 'customize',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Customize', 'athemes-starter-sites'),
  component: Customize
}, {
  id: 4,
  slug: 'pages',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Pages', 'athemes-starter-sites'),
  component: Pages
}, {
  id: 5,
  slug: 'contact',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Contact', 'athemes-starter-sites'),
  component: Contact
}, {
  id: 6,
  slug: 'features',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Features', 'athemes-starter-sites'),
  component: Features
}, {
  id: 7,
  slug: 'optin',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Optin', 'athemes-starter-sites'),
  component: Optin,
  hidden: true
}, {
  id: 8,
  slug: 'import',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Import', 'athemes-starter-sites'),
  component: Import,
  hidden: true
}];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (wizardSteps);

/***/ }),

/***/ "./v2/onboarding/src/styles/main.scss":
/*!********************************************!*\
  !*** ./v2/onboarding/src/styles/main.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./v2/onboarding/src/utils/api.js":
/*!****************************************!*\
  !*** ./v2/onboarding/src/utils/api.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteWizardState: () => (/* binding */ deleteWizardState),
/* harmony export */   getDemoPages: () => (/* binding */ getDemoPages),
/* harmony export */   getWizardState: () => (/* binding */ getWizardState),
/* harmony export */   importAjaxRequest: () => (/* binding */ importAjaxRequest),
/* harmony export */   saveWizardState: () => (/* binding */ saveWizardState),
/* harmony export */   wpAjaxRequest: () => (/* binding */ wpAjaxRequest)
/* harmony export */ });
/**
 * WordPress AJAX API utility functions.
 *
 * @package Athemes Starter Sites
 */

/**
 * Make a WordPress AJAX request.
 *
 * @param {string} action - The WordPress AJAX action name.
 * @param {Object} data   - Additional data to send.
 * @return {Promise} The response data.
 * @throws {Error} If the request fails or atssOnboarding is not defined.
 */
const wpAjaxRequest = async (action, data = {}) => {
  if ('undefined' === typeof atssOnboarding) {
    throw new Error('atssOnboarding is not defined. Make sure the script is properly enqueued.');
  }
  const response = await fetch(atssOnboarding.ajaxUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      action,
      nonce: atssOnboarding.nonce,
      ...data
    })
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.data?.message || 'Request failed');
  }
  return result.data;
};

/**
 * Get the wizard state from the database.
 *
 * @return {Promise} The wizard state data.
 */
const getWizardState = async () => {
  return await wpAjaxRequest('atss_get_wizard_state');
};

/**
 * Save the wizard state to the database.
 *
 * @param {Object} state - The state object to save.
 * @return {Promise} The response data.
 */
const saveWizardState = async state => {
  return await wpAjaxRequest('atss_save_wizard_state', {
    state: JSON.stringify(state)
  });
};

/**
 * Delete the wizard state from the database.
 *
 * @return {Promise} The response data.
 */
const deleteWizardState = async () => {
  return await wpAjaxRequest('atss_delete_wizard_state');
};

/**
 * Get demo pages from XML file.
 *
 * @param {string} demoId  - The demo site ID.
 * @param {string} builder - The builder type (gutenberg/elementor).
 * @return {Promise} Array of page objects.
 */
const getDemoPages = async (demoId, builder) => {
  return await wpAjaxRequest('atss_get_demo_pages', {
    demo_id: demoId,
    builder: builder
  });
};

/**
 * Make an import AJAX request with extended timeout support.
 *
 * This function is specifically designed for import operations:
 * - Supports longer timeouts for content import (3 minutes)
 * - Returns the full response object (needed for newAJAX status handling)
 * - Doesn't throw on success: false (caller handles that)
 *
 * @param {Object} stepData             - The import step data.
 * @param {string} stepData.action      - The WordPress AJAX action name.
 * @param {string} stepData.demo_id     - The demo site ID.
 * @param {string} stepData.builder_type - The builder type (gutenberg/elementor).
 * @return {Promise<Object>} The full AJAX response object.
 * @throws {Error} If the request fails or atssOnboarding is not defined.
 */
const importAjaxRequest = async stepData => {
  if ('undefined' === typeof atssOnboarding) {
    throw new Error('atssOnboarding is not defined. Make sure the script is properly enqueued.');
  }
  const {
    action,
    log,
    priority,
    ...params
  } = stepData;

  // Determine timeout based on action type.
  // Content import can take a long time, widgets and customizer need extended time too.
  let timeoutMs = 120000; // 2 minutes default.
  if ('atss_import_contents' === action) {
    timeoutMs = 180000; // 3 minutes for content.
  } else if ('atss_import_widgets' === action || 'atss_import_customizer' === action) {
    timeoutMs = 120000; // 2 minutes for widgets/customizer.
  } else if ('atss_import_plugin' === action) {
    timeoutMs = 120000; // 2 minutes for plugin installation.
  }

  // Create AbortController for timeout.
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(atssOnboarding.ajaxUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        action,
        nonce: atssOnboarding.nonce,
        ...params
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Return the full response for newAJAX handling.
    return await response.json();
  } catch (err) {
    clearTimeout(timeoutId);

    // Re-throw abort errors with a cleaner name.
    if ('AbortError' === err.name) {
      const timeoutError = new Error(`Request timed out after ${timeoutMs / 1000} seconds`);
      timeoutError.name = 'AbortError';
      throw timeoutError;
    }
    throw err;
  }
};

/***/ }),

/***/ "./v2/onboarding/src/utils/helpers.js":
/*!********************************************!*\
  !*** ./v2/onboarding/src/utils/helpers.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPreviewImageUrl: () => (/* binding */ getPreviewImageUrl),
/* harmony export */   getThemeLogo: () => (/* binding */ getThemeLogo),
/* harmony export */   validateEmail: () => (/* binding */ validateEmail)
/* harmony export */ });
/**
 * Theme helper utilities.
 *
 * @package Athemes Starter Sites
 */

/**
 * Get the theme logo based on the current theme.
 *
 * @return {string|null} Logo URL or null if not found.
 */
const getThemeLogo = () => {
  // Check if global variable exists
  if ('undefined' === typeof atssOnboarding) {
    console.warn('atssOnboarding configuration not found');
    return null;
  }
  const themeName = atssOnboarding?.themeName;
  const pluginUrl = atssOnboarding?.pluginUrl;
  if (!themeName || !pluginUrl) {
    return null;
  }

  // Normalize theme name to match logo filenames
  const normalizedTheme = themeName.toLowerCase().includes('sydney') ? 'sydney' : 'botiga';
  return `${pluginUrl}v2/onboarding/src/assets/images/logo-${normalizedTheme}.svg`;
};

/**
 * Build preview image URL for a demo/starter site.
 *
 * @param {string} id        Demo ID.
 * @param {string} themeName Optional theme name. Defaults to 'sydney' if not provided.
 * @return {string} Preview image URL.
 */
const getPreviewImageUrl = (id, themeName = 'sydney') => {
  const normalizedThemeName = (themeName || 'sydney').toLowerCase();
  return `https://athemes.com/themes-demo-content/full-height-ss/${normalizedThemeName}/${id}.jpg`;
};

/**
 * Validate email address.
 *
 * @param {string} email Email address to validate.
 * @return {boolean} True if email is valid, false otherwise.
 */
const validateEmail = email => {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(email);
};

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactJSXRuntime"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js?ver=" + {"v2_onboarding_src_components_Steps_Design_js":"2ef358ff1506053b63f2","v2_onboarding_src_components_Steps_Customize_js":"6a5e6445472c32f83cad","v2_onboarding_src_components_Steps_Pages_js":"96ebfb957069e3dd18b8","vendors-node_modules_react-international-phone_dist_index_css-node_modules_react-internationa-e45498":"55d8c500cab8a80236fd","v2_onboarding_src_components_Steps_Contact_js-node_modules_react-international-phone_dist_index_css":"72ba19437bc86025820d","v2_onboarding_src_components_Steps_Features_js":"b7593e6cb2685ba22609","v2_onboarding_src_components_Steps_Optin_js":"0c45f94b423ecf0e54fa","v2_onboarding_src_components_Steps_Import_js":"6d2945263021e568fdfd"}[chunkId] + "";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".css";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "athemes-starter-sites:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (globalThis.importScripts) scriptUrl = globalThis.location + "";
/******/ 		var document = globalThis.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			if (__webpack_require__.nc) {
/******/ 				linkTag.nonce = __webpack_require__.nc;
/******/ 			}
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && event.type;
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + errorType + ": " + realHref + ")");
/******/ 					err.name = "ChunkLoadError";
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// object to store loaded CSS chunks
/******/ 		var installedCssChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.miniCss = (chunkId, promises) => {
/******/ 			var cssChunks = {"v2_onboarding_src_components_Steps_Contact_js-node_modules_react-international-phone_dist_index_css":1};
/******/ 			if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 			else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 				promises.push(installedCssChunks[chunkId] = loadStylesheet(chunkId).then(() => {
/******/ 					installedCssChunks[chunkId] = 0;
/******/ 				}, (e) => {
/******/ 					delete installedCssChunks[chunkId];
/******/ 					throw e;
/******/ 				}));
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no hmr
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkathemes_starter_sites"] = globalThis["webpackChunkathemes_starter_sites"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!************************************!*\
  !*** ./v2/onboarding/src/index.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./v2/onboarding/src/App.js");
/* harmony import */ var _context_WizardContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context/WizardContext */ "./v2/onboarding/src/context/WizardContext.js");
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/main.scss */ "./v2/onboarding/src/styles/main.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Onboarding wizard React app entry point.
 *
 * @package Athemes Starter Sites
 */







/**
 * Address potential conflicts between Lodash and Underscore.
 * WordPress media library depends on Underscore being available as `_`.
 * Some versions of Lodash can overwrite this, causing errors like
 * "this.activateMode is not a function" in media-views.js.
 */

if (typeof _ !== 'undefined' && typeof _.noConflict === 'function') {
  // Check if it's actually Lodash (Underscore doesn't have `_.at`)
  if (typeof _.at === 'function') {
    _.noConflict();
  }
}

/**
 * Initialize the onboarding wizard app.
 */
function initOnboardingWizard() {
  const rootElement = document.getElementById('atss-onboarding-wizard-root');
  if (!rootElement) {
    // eslint-disable-next-line no-console
    console.error('Onboarding wizard root element not found.');
    return;
  }

  // Check if required data is available.
  if (typeof atssOnboarding === 'undefined') {
    // eslint-disable-next-line no-console
    console.error('Onboarding wizard configuration data not found.');
    return;
  }
  const root = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(rootElement);
  root.render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_context_WizardContext__WEBPACK_IMPORTED_MODULE_3__.WizardProvider, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_App__WEBPACK_IMPORTED_MODULE_2__["default"], {})
  }));
}

// Initialize when DOM is ready.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initOnboardingWizard);
} else {
  initOnboardingWizard();
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map