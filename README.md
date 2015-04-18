# generator-silex-app 

> [Yeoman](http://yeoman.io) generator for a WebComposer app. It creates a skelethon for a Silex application adding React, Gulp and browserify to work also with frontend.

## What's inside?

Bundled:

* Silex
* Gulp
* Bower
* jQuery
* Browserify
* Reactify - Help to transform JSX
* watchify support!
* livereload (BrowserSync)
* Sass with Compass
* Bootstrap - Twitter Bootstrap's official Sass version
* Modernizr

## Getting Started

```
$ npm install -g yo                                # Install Yeoman (if you don't have it yet)...
$ npm install -g generator-webcomposer             # ...then install this generator...
$ yo webcomposer                                   # ...and run it.
```

You'll need to install it with `gem install sass`.
If you find your css build results are empty, update your sass gem.

Now, when everything is ready, run the `watch` task and begin to develop your application.
```
$ gulp watch
```

The `dist` task helps you preparing your file for the live deploy, minifying and uglifyng both CSS and JS

```
$ gulp dist
```

How to run test?  
Currently, I prefer to run test tasks from npm. Please run this command.
```
$ npm test
```

## License

MIT
