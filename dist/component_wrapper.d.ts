/// <reference types="aframe" />
import EntityBuilder from "./entity_builder";
export default abstract class ComponentWrapper<S = {}> implements AFrame.Component<S> {
    data: S;
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
    destroy(): void;
    register(): void;
    buildEntity(type: string): EntityBuilder;
    private static hasMethod;
    private static getInstanceMethodNames;
}
