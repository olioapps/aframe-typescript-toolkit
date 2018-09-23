# Sphere Registry A-Frame System

This is a complete example of a how to create an A-Frame system using `SystemWrapper`. You can see it in action by simply opening `index.html` in a browser. Spheres that have been aded to the screen are being tracked by the `sphere-regsitry` system. The latter records sphere entities registered with it onto a textbox visible on the left side of the screen.

You can click the link at the top of the page to add more spheres; watch the sphere registry text change as you add more spheres.

# Building the example

1. `yarn install` to install the dependencies.

2. `yarn build` to create CDN publishable artifacts in the `dist-umd` folder.

# Making the component globally useable

Exposing `dist-umd` via a CDN such as rawgit or jsdelivr will make it easy for 3rd party developers to use systems such as the sphere registry.