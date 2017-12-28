This project is a learning spike that builds on my earlier project, [`react-dead-simple`](https://github.com/debradley/react-dead-simple)—a proof of concept that avoids the use of build tools to keep things simple. But a real-world React project needs a build step, hence `react-parcel-boilerplate`.

My intent in this spike is to begin moving towards a realistic boilerplate, adding that tooling that's typically necessary for production. I'm also adding some complexity to the "app" itself, for learning and to keep things interesting. I'm using [parcel](https://parceljs.org/) rather than webpack as my build tool to investigate this new kid on the block that promises zero configuration, a real pain point with webpack. Goals include:

* :white_check_mark: evaluate Parcel
* :white_check_mark: scripts create separate development and production builds (built-in to parcel)
* :white_check_mark: use hot reloading during development (built-in to parcel)
* :x: create a separate vendor pack, for caching efficiency (doesn't seem to be an option in parcel)
* lint CSS and JavaScript on demand or on commit
* :white_check_mark: optimize and minify HTML, CSS, and JavaScript (built-in to parcel)
* :white_check_mark: autoprefix CSS for better browser compatibility (via postcss)
* :white_check_mark: transpile CSS 4 syntax (via postcss)
* :white_check_mark: configure babel to use helpful presets and plugins
* :white_check_mark: follow a component-centric folder structure
* :white_check_mark: turn "Loading..." into an animated component
* :white_check_mark: use CSS vars for theming
* :white_check_mark: manipulate the theming dynamically using JavaScript
* set page-level metadata for SEO
* :white_check_mark: maintain async loading of scripts (parcel respects it when updating the link)
* :x: inline critical CSS; load the rest through JavaScript if necessary (saving for future project)
* get a better score on [PageSpeed](https://developers.google.com/speed/pagespeed/insights/) than [`react-dead-simple`](https://github.com/debradley/react-dead-simple)

## Resources

* [Parcel](https://parceljs.org)
* [Everything You Need To Know About Parcel](https://medium.freecodecamp.org/all-you-need-to-know-about-parcel-dbe151b70082)
* [Building a Reactjs project with Parceljs](https://blog.vigneshm.com/building-a-reactjs-project-with-parceljs-d88cdd178e50)
* [Create a React app with zero configuration using Parcel](http://blog.jakoblind.no/react-parcel/)

## Use

`yarn start` - runs parcel in development mode in the foreground at http://localhost:1234/ (change the port by editing the script to use parcel's `-p` argument, i.e. `-p 3000`)

`yarn run build` - create a production build in `docs`. Note that the built files are in version control so they can be picked up by GitHub pages.

## Process

Here are the steps I took to build from what's in [`react-dead-simple`](https://github.com/debradley/react-dead-simple). Unlike that project, this one doesn't load third-party libraries from the HTML. That means adding yarn, along with a bunch of dependencies in `node_modules` and `package.json`.

```sh
yarn init

# react and babel, as before, plus parcel
yarn add react react-dom
yarn add -D babel-preset-react babel-preset-env parcel-bundler

# some nice-to-have babel plugins that extend the syntax we can use (I'm not actually making use of them in this project though...yet?)
yarn add -D babel-plugin-transform-class-properties babel-plugin-transform-object-rest-spread

# javascript linting
yarn add -D babel-eslint eslint eslint-config-airbnb-base eslint-config-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-prettier prettier

# css support: reset, linting, additional syntax
yarn add normalize.css
yarn add -D stylelint stylelint-config-standard
yarn add -D postcss-cssnext # includes autoprefixer

# enforce linting/formatting on commit
yarn add -D lint-staged husky
```

Create/edit config files for all the new tools: `.eslintrc.json`, `.stylelintrc.json`, `.postcssrc.json`, `.browserslistrc`, `.gitignore`, `.babelrc`, `package.json`

Refactor the inline JS to individual components in `src/components`.

Make these components import CSS into JavaScript. This isn't css-in-js, but it does let the CSS be post-processed and hot reloaded.

Remove scripts from HTML; parcel uses the template in `src/app/index.html` to insert the generated script into `docs/index.html`.

## Lessons Learned

Parcel's niche seems to be quick-and-dirty development projects rather than production code. But while using parcel does let you avoid configuring your build tool, that's not even half the battle. As this project shows, there are a lot of other dependencies that do require configuration. And not even having the option to configure parcel is sometimes frustrating.

Parcel automatically minifies JS, CSS, and HTML in build mode. However, there doesn't appear to be a way to customize the minification if you don't like the defaults.

Parcel is young: there are bugs, it lacks key options, and there's little existing information out there on how to get things done other than happy path hello world usage.

Parcel doesn't run eslint—that's up to you in package.json.

Parcel builds the CSS and inserts a `link` in the generated HTML, but doesn't let you add an `media` attribute to it.

GitHub Pages only works if the index.html is in the project root or a docs folder; You can pass the `-d` flag to parcel to change its output directory.

Most tools allow an optional `.json` suffix on their config files (which makes editors happy), but babel and browserlist don't (though babel 7 will allow .babelrc.js). Both of these files can be embedded in package.json, however, which lets your editor do syntax checking, though I'm not sure if it's otherwise better or worse than putting it in a separate file.

If you want to glob a set of files for eslint to check that glob needs to be quoted, otherwise it silently does something different than you'd expect (it gets some files but not others). In other words, do `eslint "src/**/*.{js,jsx}"` and not `eslint src/**/*.{js,jsx}`. (This is a shell thing, not an eslint thing).

`postcss-cssnext` nesting doesn't support one aspect of Sass nesting, where `&` can be a portion of a selector, i.e. `&__item`. `cssnext` is consistent in this regard with the CSS draft spec, which is a good thing. But if you still want that functionality can get it instead from [postcss-nested](https://github.com/postcss/postcss-nested). I'm not sure what you'd have to do to let both plugins play nicely together.

One "how to" for parcel I saw (but can't find now) had a `module.hot` check in the bootstrapping component, which led me to believe I might have to change my components to be able to take advantage of hot reloading, but [it seems you only have to do that if you want to hook into the hot load lifecycle for some reason](https://parceljs.org/hmr.html).

I had a question coming into this spike: parcel seems to be faster than webpack (should confirm) and to provide "good-enough" optimization for small projects, but when does it fall over? At what point is the additional complexity of webpack warranted? My tentative answer after the spike is that, for me, for now, webpack is probably always the better choice because it's more mature, better-documented, and more flexible, and what you need for a minimally effective webpack configuration is [really quite small](https://react.christmas/20). If you start with parcel but then need to turn it into a "real" project, you'll end up moving to webpack. But even if your project is only ever just for fun, parcel doesn't save you much. I plan to test this theory out in my next spike. I also expect webpack to incorporate ideas from parcel eventually.

TODO: how does deployed size compare? How does load time compare?

react-dead-simple
https://www.webpagetest.org
Page size: 559k
Total load time: 2.6s

Lighthouse
Performance: 60
first paint: 6000ms
First interactive: 6240ms

react-parcel-boilerplate
Lighthouse
Performance: 81
first paint: 2,260ms
First interactive: 5,570ms

build time: first=6.76s, subsequent=1.5-1.6s

I was unsure whether my app should wait for `DOMContentLoaded` before loading and went down a rabbit hole of (useful) research that I will document elsewhere, but, while I am still not 100% sure, I believe that the right approach for this project is to mark the script as `async` and wait on `window.load`, based on the following:

* page render times are improved by `async`, when it can be used
* this script does not depend on CSSOM (so async is ok)
* this script does not depend on any other scripts (so async is ok and defer isn't called for)
* this script does depend on the existence of a specific DOM element (so it must load after it exists)
* an async script will definitely run before `window.load`, but possibly no sooner (`DOMContentLoaded` could fire before the script runs)

The downside to this approach is that it defers script execution until the last possible moment, so we get a possibly-longer-than-necessary "FUOC".

## TODO

Investigations for a future version of this project, or a different project:

How do you setup [code splitting](https://parceljs.org/code_splitting.html)? The parcel docs aren't enough for me to figure it out. [react-loadable](https://github.com/thejameskyle/react-loadable) may point the way.

[Parcel doesn't appear to be able to generate vendor bundles or sourcemaps](https://github.com/parcel-bundler/parcel/issues/41#issuecomment-350256844). Is that true?

Hot loading of JSX often always fails in parcel (though CSS seems to work); reloading the page manually then causes parcel to crash with: `events.js:183 throw er; // Unhandled 'error' event`. [An issue](https://github.com/parcel-bundler/parcel/issues/111) suggests this is because something else is using the same port, though that's not the case for me.

The amount of configuration required for this simple project shows that boilerplates are still very helpful, even with tools like parcel. But is it better to clone a repo like this one, to use something like [create-react-app](https://github.com/facebookincubator/create-react-app), or to build a generator with [yeoman](http://yeoman.io/)?

I built a Spinner component, but of course it can't actually replace the initial "Loading..." message until the script in which it exists has loaded, making it useless for that scenario. I could inline the spinner CSS, but doing that with postcss support isn't something parcel supports. I'll work on dynamic imports and inlining critical CSS in a future project with [critical](https://github.com/addyosmani/critical) and [loadCSS](https://github.com/filamentgroup/loadCSS/).

Next spike:

* make a variant boilerplate that uses webpack, to see how much configuration is really needed
* compare its build speed and output size with parcel
* figure out dynamic import and [code splitting](https://serverless-stack.com/chapters/code-splitting-in-create-react-app.html)
* Animate background through [color interpolation](http://jsfiddle.net/99ycK/1/)
* Use [Trello](https://trello.com/)
