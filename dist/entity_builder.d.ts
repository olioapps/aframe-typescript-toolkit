/// <reference types="aframe" />
import ComponentWrapper from "./component_wrapper";
export default class EntityBuilder {
    entity: AFrame.ANode;
    constructor(type: string);
    set(key: string, attribute: {}): EntityBuilder;
    attachx(f: ComponentWrapper): void;
    attach(parent?: AFrame.ANode | AFrame.Scene | AFrame.Entity | ComponentWrapper): EntityBuilder;
}
