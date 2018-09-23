(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AframeToolkitExample"] = factory();
	else
		root["AframeToolkitExample"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
Object.defineProperty(exports, "__esModule", { value: true });
var aframe_typescript_toolkit_1 = __webpack_require__(1);
var PositionLogger = /** @class */function (_super) {
    __extends(PositionLogger, _super);
    function PositionLogger() {
        var _this = _super.call(this, "position-logger", {
            intervalTsMs: {
                type: "number",
                default: 1000
            }
        }) || this;
        _this.lastTs = 0;
        return _this;
    }
    PositionLogger.prototype.tick = function () {
        var now = new Date().getTime();
        if (now - this.lastTs > this.data.intervalTsMs) {
            var currentPos = this.el.object3D.position.clone();
            console.log("Position", currentPos);
            this.lastTs = now;
        }
    };
    return PositionLogger;
}(aframe_typescript_toolkit_1.ComponentWrapper);
exports.PositionLogger = PositionLogger;
new PositionLogger().register();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var aframe_wrapper_1 = __webpack_require__(2);
exports.ComponentWrapper = aframe_wrapper_1.ComponentWrapper;
exports.SystemWrapper = aframe_wrapper_1.SystemWrapper;
var entity_builder_1 = __webpack_require__(3);
exports.EntityBuilder = entity_builder_1.EntityBuilder;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// helpers
Object.defineProperty(exports, "__esModule", { value: true });
var hasMethod = function (obj, name) {
    var desc = Object.getOwnPropertyDescriptor(obj, name);
    return !!desc && typeof desc.value === "function";
};
var getInstanceMethodNames = function (obj, stop) {
    var array = [];
    var proto = Object.getPrototypeOf(obj);
    while (proto && proto !== stop) {
        Object.getOwnPropertyNames(proto)
            .forEach(function (name) {
            if (name !== "constructor") {
                if (hasMethod(proto, name)) {
                    array.push(name);
                }
            }
        });
        proto = Object.getPrototypeOf(proto);
    }
    return array;
};
var ComponentWrapper = /** @class */ (function () {
    function ComponentWrapper(name, schema) {
        this.name = name;
        this.schema = schema || {};
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations
    ComponentWrapper.prototype.remove = function () { };
    ComponentWrapper.prototype.update = function (oldData) { };
    ComponentWrapper.prototype.extendSchema = function (update) { };
    ComponentWrapper.prototype.flushToDOM = function () { };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations
    ComponentWrapper.prototype.init = function () { };
    ComponentWrapper.prototype.pause = function () { };
    ComponentWrapper.prototype.play = function () { };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // special wrapper functions implementations
    ComponentWrapper.prototype.merge = function () {
        var _this = this;
        var funcs = getInstanceMethodNames(this, Object.prototype);
        funcs.forEach(function (k) { return _this[k] = _this[k]; });
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // special wrapper functions implementations
    ComponentWrapper.prototype.destroy = function () {
        var parent = this.el.parentElement;
        if (!!parent) {
            parent.removeChild(this.el);
        }
    };
    ComponentWrapper.prototype.register = function () {
        this.merge();
        AFRAME.registerComponent(this.name, this);
        return this;
    };
    ComponentWrapper.prototype.registerCallback = function (callbackName, fn) {
        this.el.addEventListener(callbackName, fn.bind(this));
    };
    return ComponentWrapper;
}());
exports.ComponentWrapper = ComponentWrapper;
var SystemWrapper = /** @class */ (function () {
    function SystemWrapper(name, schema) {
        this.name = name;
        this.schema = schema;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations
    SystemWrapper.prototype.init = function () { };
    SystemWrapper.prototype.pause = function () { };
    SystemWrapper.prototype.play = function () { };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // special wrapper functions implementations
    SystemWrapper.prototype.merge = function () {
        var _this = this;
        var funcs = getInstanceMethodNames(this, Object.prototype);
        funcs.forEach(function (k) { return _this[k] = _this[k]; });
    };
    SystemWrapper.prototype.register = function () {
        this.merge();
        AFRAME.registerSystem(this.name, this);
    };
    return SystemWrapper;
}());
exports.SystemWrapper = SystemWrapper;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EntityBuilder = /** @class */ (function () {
    function EntityBuilder(type, attributes) {
        this.entity = document.createElement(type);
        if (attributes) {
            this.setAttributes(attributes);
        }
    }
    EntityBuilder.create = function (type, attributes, children) {
        var builder = new EntityBuilder(type, attributes);
        if (!!children) {
            children.forEach(function (c) {
                c.attachTo(builder.entity);
            });
        }
        return builder;
    };
    EntityBuilder.prototype.set = function (a, b, c) {
        if (!!b && !!c) {
            this.entity.setAttribute(a, b, c);
        }
        else if (!!b) {
            this.entity.setAttribute(a, b || "");
        }
        else {
            this.entity.setAttribute(a, "");
        }
        return this;
    };
    EntityBuilder.prototype.setAttributes = function (attributes) {
        var _this = this;
        Object.keys(attributes).forEach(function (k) {
            _this.set(k, attributes[k]);
        });
        return this;
    };
    EntityBuilder.prototype.toEntity = function () {
        return this.entity;
    };
    EntityBuilder.prototype.attachTo = function (parent) {
        if (!parent) {
            // attach to the scene by default
            document.querySelector("a-scene").appendChild(this.entity);
            return this;
        }
        // a parent was specified
        if ("el" in parent) {
            // there's an element in this parent; attach the entity
            // being created there
            parent.el.appendChild(this.entity);
        }
        else {
            // there isn't; attach directly
            if ("appendChild" in parent) {
                parent.appendChild(this.entity);
            }
            else {
                // parent.attach(this.entity)
            }
        }
        return this;
    };
    return EntityBuilder;
}());
exports.EntityBuilder = EntityBuilder;


/***/ })
/******/ ]);
});