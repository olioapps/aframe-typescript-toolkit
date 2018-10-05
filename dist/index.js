webpackJsonp([0],[
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// helpers

Object.defineProperty(exports, "__esModule", { value: true });
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
 * Additional information on A-Frame components can be found here: [Component](https://aframe.io/docs/0.8.0/core/component.html)
 *
 *
* @example
* ```typescript
*
* interface NewComponentSchema {
*    readonly name: string
*    readonly value: number
*}
*
* export class NewComponent extends ComponentWrapper<NewComponentSchema> {
*     constructor() {
*        super("new-component", {
*            name: {
*                default: "new",
*            },
*            value: {
*                default: 0,
*            },
*        })
*    }
*
*   tick() {
*       ...
*   }
* }
* ```
*
* See a complete [example](https://github.com/olioapps/aframe-typescript-toolkit/tree/master/examples/position_logger_component)
* of using `ComponentWrapper` to build an entity position logger.
*/
var ComponentWrapper = /** @class */function () {
    function ComponentWrapper(name, schema) {
        this.name = name;
        this.schema = schema || {};
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations
    /**
     * Wraps A-Frame lifecycle handler method: [remove](https://aframe.io/docs/0.8.0/core/component.html#remove). See A-Frame documentation for more details.
     */
    ComponentWrapper.prototype.remove = function () {};
    /**
    * Wraps A-Frame lifecycle handler method: [update](https://aframe.io/docs/0.8.0/core/component.html#update-olddata). See A-Frame documentation for more details.
     */
    ComponentWrapper.prototype.update = function (oldData) {};
    /**
      * Wraps A-Frame lifecycle handler method: [updateschema](https://aframe.io/docs/0.8.0/core/component.html#updateschema-data). See A-Frame documentation for more details.
     */
    ComponentWrapper.prototype.extendSchema = function (update) {};
    ComponentWrapper.prototype.flushToDOM = function () {};
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations
    /**
     * Wraps A-Frame lifecycle handler method: [init](https://aframe.io/docs/0.8.0/core/component.html#init).
     */
    ComponentWrapper.prototype.init = function () {};
    /**
     * Wraps A-Frame lifecycle handler method: [pause](https://aframe.io/docs/0.8.0/core/component.html#pause).
     */
    ComponentWrapper.prototype.pause = function () {};
    /**
     * Wraps A-Frame lifecycle handler method: [play](https://aframe.io/docs/0.8.0/core/component.html#play).
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
    /**
    * Call this method to remove/detach A-Frame entity from scene
    */
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
}();
exports.ComponentWrapper = ComponentWrapper;
/**
 * Extend this class to create strongly typed A-Frame System.
 * Like components, there are default implementations for component lifecycle
 * methods such as init(), play(), pause(), and tick()
 * that can be overridden.
 * Additional information on A-Frame systems can be found here: [System](https://aframe.io/docs/0.8.0/core/systems.html)
 *
 *
* @example
* ```typescript
*
*export class NewSystem extends SystemWrapper {
*    constructor() {
*        super("new")
*
*        new NewComponent().register()
*    }
*}
*
* ```
*
* See a complete [example](https://github.com/olioapps/aframe-typescript-toolkit/tree/master/examples/sphere_registry_system)
* of using `SystemWrapper` to build an entity registry system.
*/
var SystemWrapper = /** @class */function () {
    function SystemWrapper(name, schema) {
        this.name = name;
        this.schema = schema;
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
/**
 * Entity builder allows you to create A-Frame entities, set attributes,
 * and attach them to the scene other A-Frame elements.
 *
 *
* @example
* ```typescript
*
* EntityBuilder.create("a-text", {
*    id: "hello-text",
*    value: "Hello Word!",
*    color: "blue",
*    position: "-1 2 0",
*}).attachTo(scene)
* ```
*
* See a complete [example](https://github.com/olioapps/aframe-typescript-toolkit/tree/master/examples/position_logger_component)
* of using `ComponentWrapper` to build an entity position logger.
*/
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
    /***
     * @hidden
     */
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
    /**
    * Using the setAttributes method, you can pass attributes and data to your entity.
    *
    * @example
    * ```typescript
    *
    * const entity = EntityBuilder.create("a-text", {
    *    position: "-1 2 0",
    *})
    * entity.setAttribute({color: "red"})
    * entity.setAttribute({data: {name: "red entity", value: 10}})
    * ```
    */
    EntityBuilder.prototype.setAttributes = function (attributes) {
        var _this = this;
        Object.keys(attributes).forEach(function (k) {
            _this.set(k, attributes[k]);
        });
        return this;
    };
    /**
    * toEntity returns the entity itself.
    */
    EntityBuilder.prototype.toEntity = function () {
        return this.entity;
    };
    /**
    * Using the attachTo method, you can append your entity to the scene or other specified entity.
    * If a receiving element is not defined, the entity will attach to the A-Frame scene by default.
    * If you do define a parent element (another entity, scene, component, or node), the entity will be appended as a child.
    * @example
    * ```typescript
    *
    * const boxHolder = document.getElementById("box-holder")
    * const entity = EntityBuilder.create("a-box", {
    *    position: "-1 2 0",
    *})
    * entity.attachTo(boxHolder)
    * ```
    */
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
],[0]);