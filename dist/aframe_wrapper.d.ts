/// <reference types="aframe" />
export declare abstract class ComponentWrapper<SCHEMA = {}, SYSTEM extends AFrame.System = AFrame.System> implements AFrame.Component<SCHEMA, SYSTEM> {
    el: AFrame.Entity;
    id: string;
    data: SCHEMA;
    schema: any;
    system: SYSTEM;
    name: string;
    constructor(name: string, schema?: {});
    remove(): void;
    update(oldData: {}): void;
    extendSchema(update: {}): void;
    flushToDOM(): void;
    init(): void;
    pause(): void;
    play(): void;
    merge(): void;
    destroy(): void;
    register(): void;
}
export declare abstract class SystemWrapper<SCHEMA = {}> implements AFrame.System {
    data: SCHEMA;
    schema: any;
    system: any;
    name: string;
    constructor(name: string, schema?: {});
    init(): void;
    pause(): void;
    play(): void;
    merge(): void;
    register(): void;
}
