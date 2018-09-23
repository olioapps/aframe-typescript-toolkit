# Position Logger A-Frame Component

This is a complete example of a how to create an A-Frame component using `ComponentWrapper`. You can see it in action by simply opening `index.html` in a browser, and observing the console log.

As the sphere traverses the scene, `position-logger` will output the entity's position to the console log.

# Building the example

1. `yarn install` to install the dependencies.

2. `yarn build` to create CDN publishable artifacts in the `dist-umd` folder.

# Making the component globally useable

Exposing `dist-umd` via a CDN such as rawgit or jsdelivr will make it easy for 3rd party developers to use components such as position logger.