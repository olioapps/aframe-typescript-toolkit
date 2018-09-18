////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// helpers

const hasMethod = (obj: {}, name: string) => {
    const desc = Object.getOwnPropertyDescriptor (obj, name)
    return !!desc && typeof desc.value === "function"
}

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

export abstract class ComponentWrapper<SCHEMA = {}, SYSTEM extends AFrame.System = AFrame.System> 
    implements AFrame.Component<SCHEMA, SYSTEM> {

    el: AFrame.Entity
    id: string
    data: SCHEMA
    schema: any
    system: SYSTEM
    name: string

    constructor(name: string, schema?: {}) {
        this.name = name
        this.schema = schema || {}
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations

    remove() {}
    update(oldData: {}) {}
    extendSchema(update: {}) {}
    flushToDOM() {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // default aframe core function implementations

    init() {}
    pause() {}
    play() {}

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // special wrapper functions implementations

    merge() {
        const funcs = getInstanceMethodNames(this, Object.prototype)
        funcs.forEach( k => this[k] = this[k])
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // special wrapper functions implementations

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

export abstract class SystemWrapper<SCHEMA = {}>
    implements AFrame.System {

    data: SCHEMA
    schema: any
    system: any
    name: string

    constructor(name: string, schema?: {}) {
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

    merge() {
        const funcs = getInstanceMethodNames(this, Object.prototype)
        funcs.forEach( k => this[k] = this[k])
    }

    register() {
        this.merge()
        AFRAME.registerSystem(this.name, this)
    }
}