/// <reference types="aframe" />
/**
 * Extend this class to create strongly typed A-Frame components.
 * Default implementations for component lifecycle methods such as init(), tick(), and others are provided,
 * and can be overridden for your component's specific behavior.
 * Additional Information on A-Frame components can be found here: [A-Frame Docs: Component](https://aframe.io/docs/0.8.0/core/component.html)
 *
 *
* @example
* ```typescript
*
* interface NewComponentSchema {
*    readonly name: string
*    readonly value: number
*}
*
* export class NewComponent extends ComponentWrapper<NewComponentSchema> {
*     constructor() {
*        super("new-component", {
*            name: {
*                default: "new",
*            },
*            value: {
*                default: 0,
*            },
*        })
*    }
*
*   tick() {
*       ...
*   }
*}
* ```
*/
export declare abstract class ComponentWrapper<SCHEMA = {}, SYSTEM extends AFrame.System = AFrame.System> implements AFrame.Component<SCHEMA, SYSTEM> {
    el: AFrame.Entity;
    id: string;
    data: SCHEMA;
    schema: AFrame.Schema<SCHEMA>;
    system: SYSTEM;
    name: string;
    constructor(name: string, schema?: AFrame.Schema<SCHEMA>);
    /**
     * Wraps A-Frame lifecycle handler method: [remove](https://aframe.io/docs/0.8.0/core/component.html#remove). See A-Frame documentation for more details.
     */
    remove(): void;
    /**
    * Wraps A-Frame lifecycle handler method: [update](https://aframe.io/docs/0.8.0/core/component.html#update-olddata). See A-Frame documentation for more details.
     */
    update(oldData: {}): void;
    /**
      * Wraps A-Frame lifecycle handler method: [updateschema](https://aframe.io/docs/0.8.0/core/component.html#updateschema-data). See A-Frame documentation for more details.
     */
    extendSchema(update: {}): void;
    flushToDOM(): void;
    /**
     * Wraps A-Frame lifecycle handler method: [init](https://aframe.io/docs/0.8.0/core/component.html#init).
     */
    init(): void;
    /**
     * Wraps A-Frame lifecycle handler method: [pause](https://aframe.io/docs/0.8.0/core/component.html#pause).
     */
    pause(): void;
    /**
     * Wraps A-Frame lifecycle handler method: [play](https://aframe.io/docs/0.8.0/core/component.html#play).
     */
    play(): void;
    /***
     * @hidden
     */
    merge(): void;
    /**
    * Call this method to remove/detach A-Frame entity from scene
    */
    destroy(): void;
    register(): this;
    registerCallback(callbackName: string, fn: Function): void;
}
/**
 * Extend this class to create strongly typed A-Frame System.
 * Like components, there are default implementations for component lifecycle
 * methods such as init(), play(), pause(), and tick()
 * that can be overridden.
 * Additional Information on A-Frame systems can be found here: [A-Frame Docs: System](https://aframe.io/docs/0.8.0/core/systems.html)
 *
 *
* @example
* ```typescript
*
*export class NewSystem extends SystemWrapper {
*    constructor() {
*        super("new")
*
*        new NewComponent().register()
*    }
*}
*
* ```
*/
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
