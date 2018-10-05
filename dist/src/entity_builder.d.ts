/// <reference types="aframe" />
import { ComponentWrapper } from "./aframe_wrapper";
export interface Attributes {
    [key: string]: {};
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
export declare class EntityBuilder {
    private entity;
    constructor(type: string, attributes?: Attributes);
    static create(type: string, attributes: Attributes, children?: EntityBuilder[]): EntityBuilder;
    /***
     * @hidden
     */
    set(a: string, b?: any, c?: {}): EntityBuilder;
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
    setAttributes(attributes: Attributes): EntityBuilder;
    /**
    * toEntity returns the entity itself.
    */
    toEntity(): AFrame.Entity;
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
    attachTo(parent?: EntityBuilder | AFrame.ANode | AFrame.Scene | AFrame.Entity | ComponentWrapper): EntityBuilder;
}
