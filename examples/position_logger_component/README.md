# Position Logger A-Frame Component

This is a complete example of a how to create an A-Frame system using `ComponentWrapper`. Entities that have the `position-logger` component will report their positions via a text entity above the component.

# Building the example

1. `yarn install` to install the dependencies.
2. `yarn build` to build the project.
3. `yarn server` allows you to see the result in a WebVR ready browser at http://localhost:3000/.

## Sharing your Custom Component
Run `yarn build` to create CDN publishable artifacts in the `dist` folder.
Exposing `dist` via a CDN such as jsdelivr will make it easy for other developers to use your a-frame component.