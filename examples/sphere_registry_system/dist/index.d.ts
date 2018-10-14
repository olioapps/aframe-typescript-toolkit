import { ComponentWrapper, SystemWrapper } from "aframe-typescript-toolkit";
interface SphereRegistryComponentSchema {
    readonly color: string;
    readonly position: string;
}
export declare class SphereRegistryComponent extends ComponentWrapper<SphereRegistryComponentSchema, SphereRegistrySystem> {
    constructor();
    init(): void;
}
export declare class SphereRegistrySystem extends SystemWrapper {
    constructor();
    add(component: SphereRegistryComponent): void;
}
export {};
