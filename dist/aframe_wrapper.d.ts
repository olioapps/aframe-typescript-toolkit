import * as AFrame from "aframe";
/**
 * Extend this class to create strongly typed A-Frame components.
 * Default implementations for component lifecycle methods such as init(), tick(), and others are provided,
 * and can be overridden for your component's specific behavior.
 */
export declare abstract class ComponentWrapper<SCHEMA extends object = {}, SYSTEM extends AFrame.System = AFrame.System> implements AFrame.Component<SCHEMA, SYSTEM> {
    el: AFrame.Entity;
    id: string;
    initialized: boolean;
    data: SCHEMA;
    schema: AFrame.Schema<SCHEMA>;
    system: SYSTEM;
    name: string;
    constructor(name: string, schema?: AFrame.Schema<SCHEMA>);
    /**
     * Wraps https://aframe.io/docs/0.8.0/core/component.html#definition_lifecycle_handler_methods_remove.
     */
    remove(): void;
    /**
     * Wraps https://aframe.io/docs/0.8.0/core/component.html#definition_lifecycle_handler_methods_update.
     */
    update(oldData: {}): void;
    /**
     * Wraps https://aframe.io/docs/0.8.0/core/component.html#definition_lifecycle_handler_methods_updateschema.
     */
    extendSchema(update: {}): void;
    flushToDOM(): void;
    /**
     * Wraps https://aframe.io/docs/0.8.0/core/component.html#definition_lifecycle_handler_methods_init.
     */
    init(): void;
    /**
     * Wraps https://aframe.io/docs/0.8.0/core/component.html#definition_lifecycle_handler_methods_pause.
     */
    pause(): void;
    /**
     * Wraps https://aframe.io/docs/0.8.0/core/component.html#definition_lifecycle_handler_methods_play.
     */
    play(): void;
    /***
     * @hidden
     */
    merge(): void;
    destroy(): void;
    register(): this;
    registerCallback(callbackName: string, fn: Function): void;
}
export declare abstract class SystemWrapper<SCHEMA extends {
    [key: string]: any;
} = {}> implements AFrame.System {
    el: AFrame.Entity;
    data: SCHEMA;
    schema: AFrame.Schema<SCHEMA>;
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
