import { ComponentWrapper, SystemWrapper } from "aframe-typescript-toolkit"

interface SphereRegistryComponentSchema {
    readonly color: string
    readonly position: string
}

export class SphereRegistryComponent extends ComponentWrapper<SphereRegistryComponentSchema, SphereRegistrySystem> {
    constructor() {
        super("sphere-registry", {
            color: {
                default: "",
            },
            position: {
                default: "",
            },
        })
    }

    init() {
        this.system.add(this)
    }
}

export class SphereRegistrySystem extends SystemWrapper {
    constructor() {
        super("sphere-registry")

        new SphereRegistryComponent().register()
    }

    add(component: SphereRegistryComponent) {
        const { color, position } = component.data
        console.log(color, position)

        const board = document.querySelector("#board")
        const text = board.getAttribute("value")
        const newText = text + "\n" + `${color} @ ${position}`
        board.setAttribute("value", newText)

    }
}

new SphereRegistrySystem().register()
