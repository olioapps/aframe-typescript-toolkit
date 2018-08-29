webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var EntityBuilder = /** @class */function () {
    function EntityBuilder(type) {
        this.entity = document.createElement(type);
    }
    EntityBuilder.prototype.set = function (key, attribute) {
        this.entity.setAttribute(key, attribute);
        return this;
    };
    EntityBuilder.prototype.attachx = function (f) {
        f.el.appendChild(this.entity);
    };
    EntityBuilder.prototype.attach = function (parent) {
        if (!!parent) {
            // a parent was specified
            if ("el" in parent) {
                // there's an element in this parent; attach the entity
                // being created there
                parent.el.appendChild(this.entity);
            } else {
                // there isn't; attach directly
                parent.appendChild(this.entity);
            }
        } else {
            // attach to the scene by default
            document.querySelector("a-scene").appendChild(this.entity);
        }
        return this;
    };
    return EntityBuilder;
}();
exports.default = EntityBuilder;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var component_wrapper_1 = __webpack_require__(2);
exports.ComponentWrapper = component_wrapper_1.default;
var entity_builder_1 = __webpack_require__(0);
exports.EntityBuilder = entity_builder_1.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
var entity_builder_1 = __webpack_require__(0);
var ComponentWrapper = /** @class */function () {
    function ComponentWrapper(name, schema) {
        var _this = this;
        this.name = name;
        var funcs = ComponentWrapper.getInstanceMethodNames(this, Object.prototype);
        funcs.forEach(function (k) {
            return _this[k] = _this[k];
        });
        this["schema"] = schema || {};
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations
    ComponentWrapper.prototype.init = function () {};
    ComponentWrapper.prototype.pause = function () {};
    ComponentWrapper.prototype.play = function () {};
    ComponentWrapper.prototype.remove = function () {};
    ComponentWrapper.prototype.update = function (oldData) {};
    ComponentWrapper.prototype.extendSchema = function (update) {};
    ComponentWrapper.prototype.flushToDOM = function () {};
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // special wrapper functions implementations
    ComponentWrapper.prototype.destroy = function () {
        var parent = this.el.parentElement;
        if (!!parent) {
            parent.removeChild(this.el);
        }
    };
    ComponentWrapper.prototype.register = function () {
        AFRAME.registerComponent(this.name, this);
    };
    ComponentWrapper.prototype.buildEntity = function (type) {
        return new entity_builder_1.default(type);
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // helpers
    ComponentWrapper.hasMethod = function (obj, name) {
        var desc = Object.getOwnPropertyDescriptor(obj, name);
        return !!desc && typeof desc.value === "function";
    };
    ComponentWrapper.getInstanceMethodNames = function (obj, stop) {
        var array = [];
        var proto = Object.getPrototypeOf(obj);
        while (proto && proto !== stop) {
            Object.getOwnPropertyNames(proto).forEach(function (name) {
                if (name !== "constructor") {
                    if (ComponentWrapper.hasMethod(proto, name)) {
                        array.push(name);
                    }
                }
            });
            proto = Object.getPrototypeOf(proto);
        }
        return array;
    };
    return ComponentWrapper;
}();
exports.default = ComponentWrapper;

/***/ })
],[1]);