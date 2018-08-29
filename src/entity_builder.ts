import ComponentWrapper from "./component_wrapper";

export default class EntityBuilder {
    entity: AFrame.ANode

    constructor(type: string) {
        this.entity = document.createElement(type)
    }

    set(key: string, attribute: {}): EntityBuilder {
        this.entity.setAttribute(key, attribute)
        return this
    }

    attachx(f: ComponentWrapper) {
        f.el.appendChild(this.entity)
    }

    attach(parent?: AFrame.ANode | AFrame.Scene | AFrame.Entity | ComponentWrapper): EntityBuilder {
        if (!!parent) {
            // a parent was specified
            if ("el" in parent) {
                // there's an element in this parent; attach the entity
                // being created there
                parent.el.appendChild(this.entity)
            } else {
                // there isn't; attach directly
                parent.appendChild(this.entity)
            }             
        } else {
            // attach to the scene by default
            document.querySelector("a-scene").appendChild(this.entity)
        }
        return this
    }

}