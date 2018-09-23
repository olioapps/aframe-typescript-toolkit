/// <reference types="aframe" />
export declare abstract class ComponentWrapper<SCHEMA = {}, SYSTEM extends AFrame.System = AFrame.System> implements AFrame.Component<SCHEMA, SYSTEM> {
    el: AFrame.Entity;
    id: string;
    data: SCHEMA;
    schema: AFrame.Schema<SCHEMA>;
    system: SYSTEM;
    name: string;
    constructor(name: string, schema?: AFrame.Schema<SCHEMA>);
    remove(): void;
    update(oldData: {}): void;
    extendSchema(update: {}): void;
    flushToDOM(): void;
    init(): void;
    pause(): void;
    play(): void;
    /***
     * @hidden
     */
    merge(): void;
    destroy(): void;
    register(): this;
    registerCallback(callbackName: string, fn: Function): void;
}
export declare abstract class SystemWrapper<SCHEMA = {}> implements AFrame.System {
    data: SCHEMA;
    schema: AFrame.Schema<SCHEMA>;
    system: any;
    name: string;
    constructor(name: string, schema?: AFrame.Schema<SCHEMA>);
    init(): void;
    pause(): void;
    play(): void;
    /***
     * @hidden
     */
    merge(): void;
    register(): void;
}
