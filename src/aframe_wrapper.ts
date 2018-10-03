////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// helpers

/***
 * @hidden
 */
const hasMethod = (obj: {}, name: string) => {
    const desc = Object.getOwnPropertyDescriptor (obj, name)
    return !!desc && typeof desc.value === "function"
}

/***
 * @hidden
 */
const getInstanceMethodNames = (obj: {}, stop: {}) => {
    const array: string[] = []
    let proto = Object.getPrototypeOf (obj)
    while (proto && proto !== stop) {
        Object.getOwnPropertyNames (proto)
        .forEach (name => {
            if (name !== "constructor") {
            if (hasMethod (proto, name)) {
                array.push (name)
            }
            }
        })
        proto = Object.getPrototypeOf(proto)
    }
    return array
}

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

export abstract class ComponentWrapper<SCHEMA = {}, SYSTEM extends AFrame.System = AFrame.System> 
    implements AFrame.Component<SCHEMA, SYSTEM> {

    el: AFrame.Entity
    id: string
    data: SCHEMA
    schema: AFrame.Schema<SCHEMA>
    system: SYSTEM
    name: string

    constructor(name: string, schema?: AFrame.Schema<SCHEMA>) {
        this.name = name
        this.schema = schema || {}
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations

    /**
     * Wraps A-Frame lifecycle handler method: [remove](https://aframe.io/docs/0.8.0/core/component.html#remove). See A-Frame documentation for more details.
     */
    remove() {}
    
    /**
    * Wraps A-Frame lifecycle handler method: [update](https://aframe.io/docs/0.8.0/core/component.html#update-olddata). See A-Frame documentation for more details.
     */
    update(oldData: {}) {}

    /**
      * Wraps A-Frame lifecycle handler method: [updateschema](https://aframe.io/docs/0.8.0/core/component.html#updateschema-data). See A-Frame documentation for more details.
     */
   
    extendSchema(update: {}) {}
    flushToDOM() {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations

    /**
     * Wraps A-Frame lifecycle handler method: [init](https://aframe.io/docs/0.8.0/core/component.html#init).
     */
    init() {}
    
    /**
     * Wraps A-Frame lifecycle handler method: [pause](https://aframe.io/docs/0.8.0/core/component.html#pause).
     */
    pause() {}
    
    /**
     * Wraps A-Frame lifecycle handler method: [play](https://aframe.io/docs/0.8.0/core/component.html#play).
     */
    play() {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // special wrapper functions implementations

    /***
     * @hidden
     */
    merge() {
        const funcs = getInstanceMethodNames(this, Object.prototype)
        funcs.forEach( k => this[k] = this[k])
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // special wrapper functions implementations

    /**
    * Call this method to remove/detach A-Frame entity from scene
    */
    destroy() {
        const parent = this.el.parentElement
        if (!!parent) {
            parent.removeChild(this.el)
        }
    }
  
    register() {
        this.merge()
        AFRAME.registerComponent(this.name, this)

        return this
    }

    registerCallback(callbackName: string, fn: Function) {
        this.el.addEventListener(callbackName, fn.bind(this))
    }
}
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

export abstract class SystemWrapper<SCHEMA = {}>
    implements AFrame.System {

    data: SCHEMA
    schema: AFrame.Schema<SCHEMA>
    system: any
    name: string

    constructor(name: string, schema?: AFrame.Schema<SCHEMA>) {
        this.name = name
        this.schema = schema
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations

    init() {}
    pause() {}
    play() {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // special wrapper functions implementations

    /***
     * @hidden
     */
    merge() {
        const funcs = getInstanceMethodNames(this, Object.prototype)
        funcs.forEach( k => this[k] = this[k])
    }

    register() {
        this.merge()
        AFRAME.registerSystem(this.name, this)
    }
}