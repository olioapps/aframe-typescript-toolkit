import { ComponentWrapper } from "aframe-typescript-toolkit";
interface PositionLoggerSchema {
    readonly intervalTsMs: number;
}
export declare class PositionLogger extends ComponentWrapper<PositionLoggerSchema> {
    lastTs: number;
    constructor();
    tick(): void;
}
export {};
