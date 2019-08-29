import { ComponentWrapper } from "./aframe_wrapper"
import * as AFrame from "aframe"

export interface Attributes {
    [key: string]: {}
}

export class EntityBuilder {
    private entity: AFrame.Entity

    constructor(type: string, attributes?: Attributes) {
        this.entity = <AFrame.Entity> document.createElement(type)
        if (attributes) {
            this.setAttributes(attributes)
        }
    }

    static create(type: string, attributes: Attributes, children?: EntityBuilder[]): EntityBuilder {
        const builder = new EntityBuilder(type, attributes)
        if (!!children) {
            children.forEach( c => {
                c.attachTo(builder.entity)
            })
        }
        return builder
    }

    set(a: string, b?: any, c?: {}): EntityBuilder {
        if (!!b && !!c) {
            this.entity.setAttribute(a, b, c)
        } else if (!!b) {
            this.entity.setAttribute(a, b || "")
        } else {
            this.entity.setAttribute(a, "")
        }
        return this
    }

    setAttributes(attributes: Attributes): EntityBuilder {
        Object.keys(attributes).forEach( k => {
            this.set(k, attributes[k])            
        })
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