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


Object.defineProperty(exports, "__esModule", { value: true });
var aframe_wrapper_1 = __webpack_require__(1);
exports.ComponentWrapper = aframe_wrapper_1.ComponentWrapper;
exports.SystemWrapper = aframe_wrapper_1.SystemWrapper;
var entity_builder_1 = __webpack_require__(2);
exports.EntityBuilder = entity_builder_1.EntityBuilder;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// helpers
/***
 * @hidden
 */
var hasMethod = function (obj, name) {
    var desc = Object.getOwnPropertyDescriptor(obj, name);
    return !!desc && typeof desc.value === "function";
};
/***
 * @hidden
 */
var getInstanceMethodNames = function (obj, stop) {
    var array = [];
    var proto = Object.getPrototypeOf(obj);
    while (proto && proto !== stop) {
        Object.getOwnPropertyNames(proto).forEach(function (name) {
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
/**
 * Extend this class to create strongly typed A-Frame components.
 * Default implementations for component lifecycle methods such as init(), tick(), and others are provided,
 * and can be overridden for your component's specific behavior.
 */
var ComponentWrapper = /** @class */function () {
    function ComponentWrapper(name, schema) {
        this.name = name;
        this.schema = schema || {};
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations
    /**
     * Wraps https://aframe.io/docs/0.8.0/core/component.html#definition_lifecycle_handler_methods_remove.
     */
    ComponentWrapper.prototype.remove = function () {};
    /**
     * Wraps https://aframe.io/docs/0.8.0/core/component.html#definition_lifecycle_handler_methods_update.
     */
    ComponentWrapper.prototype.update = function (oldData) {};
    /**
     * Wraps https://aframe.io/docs/0.8.0/core/component.html#definition_lifecycle_handler_methods_updateschema.
     */
    ComponentWrapper.prototype.extendSchema = function (update) {};
    ComponentWrapper.prototype.flushToDOM = function () {};
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations
    /**
     * Wraps https://aframe.io/docs/0.8.0/core/component.html#definition_lifecycle_handler_methods_init.
     */
    ComponentWrapper.prototype.init = function () {};
    /**
     * Wraps https://aframe.io/docs/0.8.0/core/component.html#definition_lifecycle_handler_methods_pause.
     */
    ComponentWrapper.prototype.pause = function () {};
    /**
     * Wraps https://aframe.io/docs/0.8.0/core/component.html#definition_lifecycle_handler_methods_play.
     */
    ComponentWrapper.prototype.play = function () {};
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // special wrapper functions implementations
    /***
     * @hidden
     */
    ComponentWrapper.prototype.merge = function () {
        var _this = this;
        var funcs = getInstanceMethodNames(this, Object.prototype);
        funcs.forEach(function (k) {
            return _this[k] = _this[k];
        });
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
        // unregister any existing component
        if (!!AFRAME.components[this.name]) {
            console.log("WARNING -- unregistering already registered component with name \"" + this.name + "\".");
            delete AFRAME.components[this.name];
        }
        this.merge();
        AFRAME.registerComponent(this.name, this);
        return this;
    };
    ComponentWrapper.prototype.registerCallback = function (callbackName, fn) {
        this.el.addEventListener(callbackName, fn.bind(this));
    };
    return ComponentWrapper;
}();
exports.ComponentWrapper = ComponentWrapper;
var SystemWrapper = /** @class */function () {
    function SystemWrapper(name, schema) {
        this.name = name;
        this.schema = schema || {};
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations
    SystemWrapper.prototype.init = function () {};
    SystemWrapper.prototype.pause = function () {};
    SystemWrapper.prototype.play = function () {};
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // special wrapper functions implementations
    /***
     * @hidden
     */
    SystemWrapper.prototype.merge = function () {
        var _this = this;
        var funcs = getInstanceMethodNames(this, Object.prototype);
        funcs.forEach(function (k) {
            return _this[k] = _this[k];
        });
    };
    SystemWrapper.prototype.register = function () {
        this.merge();
        AFRAME.registerSystem(this.name, this);
    };
    return SystemWrapper;
}();
exports.SystemWrapper = SystemWrapper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var EntityBuilder = /** @class */function () {
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
        } else if (!!b) {
            this.entity.setAttribute(a, b || "");
        } else {
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
        } else {
            // there isn't; attach directly
            if ("appendChild" in parent) {
                parent.appendChild(this.entity);
            } else {
                // parent.attach(this.entity)
            }
        }
        return this;
    };
    return EntityBuilder;
}();
exports.EntityBuilder = EntityBuilder;

/***/ })
/******/ ]);