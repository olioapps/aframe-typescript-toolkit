import { ComponentWrapper } from "./aframe_wrapper"

export interface Attributes {
    [key: string]: {}
}


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

    /***
     * @hidden
     */
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
    setAttributes(attributes: Attributes): EntityBuilder {
        Object.keys(attributes).forEach( k => {
            this.set(k, attributes[k])            
        })
        return this
    }
/**
* toEntity returns the entity itself. 
*/
    toEntity(): AFrame.Entity {
        return this.entity
    }

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