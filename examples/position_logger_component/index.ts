import { ComponentWrapper } from "aframe-typescript-toolkit"

export interface PositionLoggerSchema {
    readonly intervalTsMs: number
}

export class PositionLogger extends ComponentWrapper<PositionLoggerSchema> {
    lastTs: number = 0

    constructor() {
        super("position-logger", {
            intervalTsMs: {
                type: "number",
                default: 1000,
            }
        })
    }

    tick() {
        const now = new Date().getTime()
        if (now - this.lastTs > this.data.intervalTsMs) {
            const currentPos = this.el.object3D.position.clone()
            console.log("Position", currentPos)
            this.lastTs = now
        }
    }
}

new PositionLogger().register()