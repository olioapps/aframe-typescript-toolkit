import ComponentWrapper from "./component_wrapper"
export default class EntityBuilder {
    private entity: AFrame.Entity

    constructor(type: string) {
        this.entity = <AFrame.Entity> document.createElement(type)
    }

    set(key: string, attribute: {}): EntityBuilder {
        this.entity.setAttribute(key, attribute)
        return this
    }

    toEntity(): AFrame.Entity {
        return this.entity
    }

    attachTo(parent?: EntityBuilder | AFrame.ANode | AFrame.Scene | AFrame.Entity | ComponentWrapper): EntityBuilder {
        if (!parent) {
            // attach to the scene by default
            document.querySelector("a-scene").appendChild(this.entity)
            return this
        }

        // a parent was specified
        if ("el" in parent) {
            // there's an element in this parent; attach the entity
            // being created there
            parent.el.appendChild(this.entity)
        } else {
            // there isn't; attach directly
            if ("appendChild" in parent) {
                parent.appendChild(this.entity)
            } else {
                // parent.attach(this.entity)
            }
        }    

        return this
    }

}