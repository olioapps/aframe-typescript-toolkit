import { ComponentWrapper, EntityBuilder } from "aframe-typescript-toolkit"

interface PositionLoggerSchema {
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

    init() {
        // create a text component and attach it to the logged component
        EntityBuilder.create("a-text", {
            id: "logtext",
            value: "watch me!",
            color: "purple",
            position: "-1 1.25 0",
        }).attachTo(this.el)
    }

    tick() {
        const now = new Date().getTime()
        if (now - this.lastTs > this.data.intervalTsMs) {
            const currentPos = this.el.object3D.position.clone()
            this.el.querySelector("#logtext").setAttribute("value", `${currentPos.x.toFixed(2)}, ${currentPos.y}, ${currentPos.z}`)

            this.lastTs = now
        }
    }
}

new PositionLogger().register()