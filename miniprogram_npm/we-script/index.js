module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(1);

var PENDING = 0;
var COMPLETED = 1;
function attached() {
    var _this = this;

    var _data = this.data,
        src = _data.src,
        timeout = _data.timeout,
        cache = _data.cache,
        text = _data.text,
        once = _data.once;

    var context = _utils.globalContext;
    var isInit = true;
    this.triggerEvent("onInit", {
        getContext: function getContext() {
            return context;
        },
        setContext: function setContext(ctx) {
            if (!isInit) {
                return;
            }
            context = ctx;
        }
    });
    isInit = false;
    if (text) {
        Promise.resolve().then(function () {
            (0, _utils.evalScript)(text, context);
            _this.triggerEvent("onLoad", {
                context: context
            });
            _this.setData({
                loadStatus: COMPLETED
            });
        }).catch(function (e) {
            _this.triggerEvent("onError", { error: e });
        });
        return;
    }
    if (!src) {
        this.triggerEvent("onLoad", {
            context: context
        });
        return;
    }
    var scriptUrls = Array.isArray(src) ? src : [src];
    var promises = scriptUrls.map(function (url) {
        return (0, _utils.loadScript)({
            url: url,
            timeout: timeout,
            method: "GET"
        }, cache);
    });
    Promise.all(promises).then(function (codes) {
        codes.forEach(function (code) {
            if (!(once && (0, _utils.hasRunInContext)(context, code.url))) {
                (0, _utils.evalScript)(code.data, context);
                (0, _utils.setRunInContext)(context, code.url);
            }
        });
        _this.triggerEvent("onLoad", {
            context: context
        });
        _this.setData({
            loadStatus: COMPLETED
        });
    }).catch(function (e) {
        _this.triggerEvent("onError", { error: e });
    });
}
Component({
    properties: {
        src: {
            type: String,
            optionalTypes: [String, Array]
        },
        text: String,
        // 无效
        type: String,
        // 无效
        context: {
            type: Object,
            value: _utils.globalContext
        },
        timeout: {
            type: Number,
            value: 60000
        },
        cache: {
            type: Boolean,
            value: true
        },
        once: {
            type: Boolean,
            value: true
        }
    },
    data: {
        loadStatus: PENDING,
        PENDING: PENDING,
        COMPLETED: COMPLETED
    },
    lifetimes: {
        attached: attached
    },
    attached: attached
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.globalContext = undefined;
exports.evalScript = evalScript;
exports.loadScript = loadScript;
exports.hasRunInContext = hasRunInContext;
exports.setRunInContext = setRunInContext;

var _eval = __webpack_require__(2);

var _adapter = __webpack_require__(3);

var loadCachedScript = Object.create(null);
var SCRIPT_EXEC_TIMEOUT = 600000;
// 基本方法注入
var rootContext = {
    console: console,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    setInterval: setInterval,
    clearInterval: clearInterval,
    wx: typeof wx === "undefined" ? undefined : wx
};
var globalContext = exports.globalContext = {};
function evalScript(code, context) {
    if (!code) return;
    var interpreter = new _eval.Interpreter(context || globalContext, {
        timeout: SCRIPT_EXEC_TIMEOUT,
        rootContext: rootContext,
        globalContextInFunction: context || globalContext
    });
    interpreter.evaluate(code);
    return interpreter.getValue();
}
function loadScript(requestOpts) {
    var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var url = requestOpts.url;
    return new Promise(function (resolve, reject) {
        if (useCache && url in loadCachedScript) {
            resolve({
                url: url,
                data: loadCachedScript[url]
            });
            return;
        }
        (0, _adapter.request)(Object.assign({}, requestOpts, {
            success: function success(res) {
                loadCachedScript[url] = res.data;
                resolve({
                    url: url,
                    data: res.data
                });
            },
            fail: function fail(err) {
                reject(new Error(err.errMsg));
            }
        }));
    });
}
function hasRunInContext(ctx, url) {
    return ctx && ctx.__weScriptRunCache__ && ctx.__weScriptRunCache__[url];
}
function setRunInContext(ctx, url) {
    if (!ctx) return;
    if (!ctx.__weScriptRunCache__) {
        Object.defineProperty(ctx, "__weScriptRunCache__", {
            enumerable: false,
            value: Object.create(null)
        });
    }
    ctx.__weScriptRunCache__[url] = true;
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("eval5");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.request = request;
function request(options) {
    wx.request(options);
}

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map