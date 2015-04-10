# Marketing Cloud Theme

The Marketing Cloud Theme is a single stylesheet that should be included after [Fuel UX](https://getfuelux.com) and Bootstrap.

This theme enables a first-class user experience for your applications that seamlessly fits into the [Salesforce ExactTarget Marketing Cloud](http://www.exacttarget.com/) platform and strives to offer visual parity with the previously released, [Internet Marketing Hub Theme](https://github.com/ExactTarget/fuelux-imhtheme) with support for [Fuel UX 3](http://exacttarget.github.io/fuelux/) and [Bootstrap 3](http://getbootstrap.com/).

## Table of contents

 * [Demos](#demos)
 * [Quick start](#quick-start)
 * [Bugs and feature requests](#bugs-and-feature-requests)
 * [Philosophy and authors](#philosophy-and-authors)
 * [Copyright and license](#copyright-and-license)

## Demos

View [demos of the Marketing Cloud Theme](http://exacttarget.github.com/fuelux-mctheme).

## Quick start
1. Install [Fuel UX](https://getfuelux.com).
2. Use a single css tag ***after Bootstrap and Fuel UX styles***:

	```
    <link href="http://www.fuelcdn.com/fuelux-mctheme/1.4.3/css/fuelux-mctheme.min.css" rel="stylesheet" type="text/css"/>
    ```
3. [Use Fuel UX as normal](http://exacttarget.github.io/fuelux/).

### Download
The Marketing Cloud Theme can be obtained through:

1. [CDN](http://www.fuelcdn.com/fuelux-mctheme/1.4.3/css/fuelux-mctheme.min.css)
1. [Zip](http://www.fuelcdn.com/fuelux-mctheme/1.4.3/fuelux.zip)
2. Clone git repo:
   ```
   git clone https://github.com/ExactTarget/fuelux-mctheme/
   ```
1. Dependency manager:
   ```
   bower install fuelux-mctheme
   ```

### Contributing
To work on the Marketing Cloud theme:

1. Clone git repo:
   ```
   git clone https://github.com/ExactTarget/fuelux-mctheme/
   ```
1. Run npm install:
  ```
  npm install
  ```
1. Run bower install:
  ```
  bower install
  ```
1. Start up the server:
  ```
  grunt serve
  ```
1. View output in browser [http://localhost:8000](http://localhost:8000)

If you have changes you would like to contribute, please:

1. Fork the repo
1. Make a new branch
1. Do your work
1. When ready, issue a pull request

### Dependencies
The Marketing Cloud Theme is dependent upon [Fuel UX 3](http://github.com/ExactTarget/fuelux/), [Bootstrap 3](https://github.com/twbs/bootstrap) and [jQuery](https://github.com/jquery/jquery). If you installed by cloning the repo or by downloading a .zip archive, you'll also want to grab these things, as it just won't work without them.
- [jQuery](http://github.com/jquery/jquery)
- [Bootstrap 3](http://github.com/twbs/bootstrap)
- [Fuel UX 3](http://github.com/ExactTarget/fuelux/)

### What's included

A download of FuelUX provides the following directories and files, which are grouped according to file type:
```
fuelux-mctheme/
└── css/
    ├── fuelux-mctheme.css
    └── fuelux-mctheme.min.css

```
SVGs of theme icons are base64-encoded into the CSS files above.

## Bugs and feature requests

Have a bug or a feature request? Please first review the [open issues](https://github.com/ExactTarget/fuelux-mctheme/issues), then search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/ExactTarget/fuelux-mctheme/issues/new). The issue may be a bug in Bootstrap or Fuel UX. If you think it is, please post in the respective repository.

## Edge servers

A build of master is available at `https://fuelux-mctheme.herokuapp.com/dist/css/fuelux-mctheme.css`.

_These files should never be used in production and may not have been fully tested._

To create your own edge server, setup a github web hook on Heroku for this repository and put the app into development mode with `heroku config:set NPM_CONFIG_PRODUCTION=false`.


##Philosophy and authors

### The Fuel UX Philosophy
Our aim is to provide a suite of related but independent projects that help web developers integrate, manage, and customize quality libraries and utilities to more efficiently develop, maintain, test, and distribute their projects.  Any improvements or fixes we make to the open source projects, we use will be contributed upstream if they are useful to the rest of the community.

|Project Maintainers (a-z)&nbsp;&nbsp;&nbsp;&nbsp; | |
|:----|----:|
|Stephen James | [![tweetllama on Twitter](https://raw.githubusercontent.com/ExactTarget/fuelux/gh-pages/invertobird-sm.png)](http://twitter.com/tweetllama) [![interactivellama on Github](https://raw.githubusercontent.com/ExactTarget/fuelux/gh-pages/invertocat-sm.png)](http://github.com/interactivellama)|
|Kevin Parkerson  | [![kevinparkerson on Twitter](https://raw.githubusercontent.com/ExactTarget/fuelux/gh-pages/invertobird-sm.png)](http://twitter.com/kevinparkerson) [![kevinparkerson on Github](https://raw.githubusercontent.com/ExactTarget/fuelux/gh-pages/invertocat-sm.png)](http://github.com/kevinparkerson)|

|Major Contributors&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | |
|:----|----:|
|Dave Woodward |[![@futuremint on Twitter](https://raw.githubusercontent.com/ExactTarget/fuelux/gh-pages/invertobird-sm.png)](http://twitter.com/futuremint) [![futuremint on Github](https://raw.githubusercontent.com/ExactTarget/fuelux/gh-pages/invertocat-sm.png)](http://github.com/futuremint) |
|Christopher McCulloh | [![@cmcculloh on Twitter](https://raw.githubusercontent.com/ExactTarget/fuelux/gh-pages/invertobird-sm.png)](http://twitter.com/cmcculloh) [![cmcculloh on Github](https://raw.githubusercontent.com/ExactTarget/fuelux/gh-pages/invertocat-sm.png)](http://github.com/cmcculloh)|

## Copyright and license

Copyright &copy; 2012-2014 ExactTarget, Inc.

View [BSD-3 license](https://github.com/ExactTarget/fuelux-mctheme/blob/master/LICENSE).
