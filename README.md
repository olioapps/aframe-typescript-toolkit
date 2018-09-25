# A-Frame + Typescript

This repository offers wrapper classes for A-Frame building blocks such as Components and Systems, making it easy to build A-Frame code that looks and feels like idiomatic Typescript code.

## Usage

### installation
```javascript
npm install aframe-typescript-toolkit 
// or  yarn add aframe-typescript-toolkit
```

```javascript 
import * as AframeTypescriptToolkit from "aframe-typescript-toolkit"
```

## A-Frame Typescript Classes 

### EntityBuilder
Entity builder allows you to create A-Frame entities, set attributes, and attach them to the scene other A-Frame elements. 
```javascript
import { EntityBuilder } from "aframe-typescript-toolkit"

const scene = document.getElementById("scene")

EntityBuilder.create("a-text", {
    id: "hello-text",
    value: "Hello Word!",
    color: "blue",
    position: "-1 2 0",
}).attachTo(scene)
```
See the docs for additional information on [EntityBuilder](https://cdn.rawgit.com/olioapps/aframe-typescript-toolkit/199aa562/dist/docs/classes/_entity_builder_.entitybuilder.html)

### ComponentWrapper
The ComponentWrapper is a base class for creating strongly typed A-Frame components. Component lifecycle methods such as init(), tick(), and others are provided, and can be overridden to suit your component's specific behavior.

See the [example](https://github.com/olioapps/aframe-typescript-toolkit/tree/master/examples/position_logger_component) as well as the [ComponentWrapper docs](https://cdn.rawgit.com/olioapps/aframe-typescript-toolkit/199aa562/dist/docs/classes/_aframe_wrapper_.componentwrapper.html) for more details. 

### SystemWrapper
The SystemWrapper allows you to create typescript A-Frame systems. Components can subscribe themselves to a system, allowing the system to reference its components.

See the [example](https://github.com/olioapps/aframe-typescript-toolkit/tree/master/examples/sphere_registry_system) as well as the [SystemWrapper docs](https://cdn.rawgit.com/olioapps/aframe-typescript-toolkit/199aa562/dist/docs/classes/_aframe_wrapper_.systemwrapper.html) for more details. 

## Examples 
### [Position Logger](https://github.com/olioapps/aframe-typescript-toolkit/tree/master/examples/position_logger_component)
Position Logger A-Frame Component is a complete example of how to use an A-Frame component using `ComponentWrapper`


### [Sphere Registry System](https://github.com/olioapps/aframe-typescript-toolkit/tree/master/examples/sphere_registry_system)
 Sphere Registry A-Frame System is a complete example of a how to create an A-Frame system using `SystemWrapper`

## Contact
We are interested in hearing your questions and feedback.

Email: [vr@olioapps.com](vr@olioapps.com)

## Additional Reading 
- [aframe-typescript-toolkit Docs](https://cdn.rawgit.com/olioapps/aframe-typescript-toolkit/199aa562/dist/docs/index.html)
- [A-Frame](https://aframe.io/)
- [Typescript](https://www.typescriptlang.org/docs/home.html)

## License
This program is free software and is distributed under an MIT License.
