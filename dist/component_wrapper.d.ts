/// <reference types="aframe" />
import EntityBuilder from "./entity_builder";
export default abstract class ComponentWrapper<SCHEMA = {}> implements AFrame.Component<SCHEMA> {
    data: SCHEMA;
    name: string;
    el: AFrame.Entity;
    id: string;
    schema: any;
    system: any;
    constructor(name: string, schema?: {});
    init(): void;
    pause(): void;
    play(): void;
    remove(): void;
    update(oldData: {}): void;
    extendSchema(update: {}): void;
    flushToDOM(): void;
    merge(): void;
    destroy(): void;
    register(): void;
    buildEntity(type: string): EntityBuilder;
    private static hasMethod;
    private static getInstanceMethodNames;
}
