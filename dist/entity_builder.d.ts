/// <reference types="aframe" />
import ComponentWrapper from "./component_wrapper";
export default class EntityBuilder {
    private entity;
    constructor(type: string);
    set(key: string, attribute: {}): EntityBuilder;
    toEntity(): AFrame.Entity;
    attachTo(parent?: EntityBuilder | AFrame.ANode | AFrame.Scene | AFrame.Entity | ComponentWrapper): EntityBuilder;
}
