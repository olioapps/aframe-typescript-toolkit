/// <reference types="aframe" />
import { ComponentWrapper } from "./aframe_wrapper";
export interface Attributes {
    [key: string]: {};
}
export declare class EntityBuilder {
    private entity;
    constructor(type: string, attributes?: Attributes);
    static create(type: string, attributes: Attributes, children?: EntityBuilder[]): EntityBuilder;
    set(a: string, b?: any, c?: {}): EntityBuilder;
    setAttributes(attributes: Attributes): EntityBuilder;
    toEntity(): AFrame.Entity;
    attachTo(parent?: EntityBuilder | AFrame.ANode | AFrame.Scene | AFrame.Entity | ComponentWrapper): EntityBuilder;
}
