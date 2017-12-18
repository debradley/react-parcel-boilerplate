This project is a learning spike that builds on [react-dead-simple](https://github.com/debradley/react-dead-simple), a proof of concept that avoids the use of build tools to keep things simple. But a real-world React project needs a build step.

My intent in this spike is to begin moving towards a realistic boilerplate, adding tooling typically necessary for production. I'm also adding some complexity to the "app" itself, for learning and to keep things interesting. I'm using [parcel](https://parceljs.org/) rather than webpack as my build tool to investigate the new kid on the block and because it promises to require less configuration than webpack. Goals include:

* scripts create separate development and production builds
* use hot reloading during development
* create a separate vendor pack, for caching efficiency
* lint CSS and JavaScript
* optimize and minify HTML, CSS, and JavaScript
* autoprefix CSS for better browser compatibility
* transpile CSS 4 syntax
* inline critical CSS; load the rest through JavaScript if necessary
* configure babel to use helpful presets and plugins
* set page-level metadata for SEO
* follow a component-centric folder structure
* turn "Loading..." into an animated component
* use CSS vars for theming
* manipulate the theming in realtime using JavaScript
* maintain async loading of scripts
* get a better score on [PageSpeed](https://developers.google.com/speed/pagespeed/insights/) than react-dead-simple
