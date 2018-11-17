# Sphere Registry A-Frame System

This is a complete example of a how to create an A-Frame system using `SystemWrapper`. You can see it in action by simply opening `index.html` in a browser. Spheres that have been aded to the screen are being tracked by the `sphere-regsitry` system. The latter records sphere entities registered with it onto a textbox visible on the left side of the screen.

You can click the link at the top of the page to add more spheres; watch the sphere registry text change as you add more spheres.

# Building the example

1. `yarn install` to install the dependencies.
2. `yarn build` to build the project.
3. `yarn server` allows you to see the result in a WebVR ready browser at http://localhost:3000/.

## Sharing your Custom Component
Run `yarn build` to create CDN publishable artifacts in the `dist` folder.
Exposing `dist` via a CDN such as jsdelivr will make it easy for other developers to use your a-frame system.