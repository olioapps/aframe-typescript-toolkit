# Color Component

This is a boilerplate A-Frame component created using `aframe-typescript-toolkit`. 

The `color-component` reports the color of an A-Frame entity that has the color-component attached.

<img src="./assets/color-component.png" alt="example color component">

The component (defined in index.js) can be changed in any way to create a custom component. Components can provide appearance, behavior, and/or functionality to the entity to which it is attached. 

Read the docs for [`aframe-typescript-toolkit`](https://github.com/olioapps/aframe-typescript-toolkit).

Read more about A-Frame components here: [Component](https://aframe.io/docs/0.8.0/core/component.html)

The scene (defined in index.html) is an easy way to see your component in action and test its functionality. 

## Building the example

1. `yarn install` to install the dependencies.

2. `yarn build` to create CDN publishable artifacts in the `dist` folder.

3. run `yarn start` to see the component in action at http://localhost:8081/. 

## Sharing your Custom Component

Exposing `dist` via a CDN such as jsdelivr will make it easy for other developers to use your a-frame component.