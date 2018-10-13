import { ComponentWrapper } from "../../dist/index";
interface PositionLoggerSchema {
    readonly intervalTsMs: number;
}
export declare class PositionLogger extends ComponentWrapper<PositionLoggerSchema> {
    lastTs: number;
    constructor();
    init(): void;
    tick(): void;
}
export {};
