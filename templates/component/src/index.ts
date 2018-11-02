import { ComponentWrapper, EntityBuilder } from "aframe-typescript-toolkit"

interface ColorComponentSchema {
    readonly color: string
}

export class ColorComponent extends ComponentWrapper<ColorComponentSchema> {

    constructor() {
        super("color-component", {
            color: {
                type: "string",
                default: "colorless",
            }, 
        })
    }

    init() {
        const entityColor = this.el.getAttribute("color")
        EntityBuilder.create("a-text", {
            id: "color-text",
            value: entityColor || this.data.color,
            color: entityColor || "black",
            position: "-1 1.25 0",
        }).attachTo(this.el)
    }

    tick() {
        
    }
}

new ColorComponent().register()