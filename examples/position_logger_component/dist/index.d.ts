import { ComponentWrapper } from "aframe-typescript-toolkit";
export interface PositionLoggerSchema {
    readonly intervalTsMs: number;
}
export declare class PositionLogger extends ComponentWrapper<PositionLoggerSchema> {
    lastTs: number;
    constructor();
    tick(): void;
}
