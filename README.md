# Marketing Cloud Theme

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
1. Install with [Bower](https://github.com/bower/bower). This will also install compatible versions of Bootstrap and Fuel UX:

    ```
    bower install fuelux-mctheme
    ```
2. Link to the [complete Bootstrap CSS](http://www.bootstrapcdn.com/) and the complete [Fuel UX CSS](https://github.com/ExactTarget/fuelux#quick-start). Then, use a single css tag ***after Bootstrap and Fuel UX styles*** from your bower components folder.

	```
    <!-- <link href="BOOTSTRAP-CSS" rel="stylesheet" type="text/css"/> -->
    <!-- <link href="FUELUX-CSS" rel="stylesheet" type="text/css"/> -->
    <link href="http://www.fuelcdn.com/fuelux-mctheme/1.0.0/css/fuelux-mctheme.min.css" rel="stylesheet" type="text/css"/>
    ```
3. Add markup from the [Bootstrap documentation](http://getbootstrap.com/) or the [Fuel UX documentation](http://exacttarget.github.io/fuelux/).

### Download
The Marketing Cloud Theme can be obtained one of three ways:

1. **Best way:** Install with a dependency manager:
    
   Using [Bower](https://github.com/bower/bower):

   ```
   bower install fuelux-mctheme
   ```
   Update with `bower update fuelux-mctheme`.

   This ensures you get all the [dependencies](#dependencies).

2. **Another good way:** Clone the Git repository:
   ```
   git clone https://github.com/ExactTarget/fuelux-mctheme/
   ```

   Cloning the repository ensures you can apply future updates to FuelUX easily, but requires to you manage its [dependencies](#dependencies) on your own.

3. **Also an option:** Download a .zip archive of the [latest release](http://www.fuelcdn.com/fuelux-mctheme/1.0.0/fuelux.zip)  or request files from [the Fuel CDN](http://www.fuelcdn.com/fuelux-mctheme/1.0.0/).

   *Note: Using the Marketing Cloud Theme in this way can make updating to future releases difficult. This approach is not recommended.*


### Dependencies
The Marketing Cloud Theme is dependent upon [Fuel UX 3](http://github.com/ExactTarget/fuelux/), [Bootstrap 3](https://github.com/twbs/bootstrap) and [jQuery](https://github.com/jquery/jquery). If you installed by cloning the repo or by downloading a .zip archive, you'll also want to grab these things, as it just won't work without them.
- [jQuery](http://github.com/jquery/jquery)
- [Bootstrap 3](http://github.com/twbs/bootstrap)
- [Fuel UX 3](http://github.com/ExactTarget/fuelux/)

### What's included

A download of FuelUX provides the following directories and files, which are grouped according to file type:
```
fuelux-mctheme/
├── css/
│   ├── fuelux-mctheme.css
│   ├── fuelux-mctheme.min.css
└── img/
    ├── spritesheet.png
    └── spritesheet-2x.png

```

## Bugs and feature requests

Have a bug or a feature request? Please first review the [open issues](https://github.com/ExactTarget/fuelux-mctheme/issues), then search for existing and closed issues. If your problem or idea is not addressed yet, [please open a new issue](https://github.com/ExactTarget/fuelux-mctheme/issues/new). The issue may be a bug in Bootstrap or Fuel UX. If you think it is, please post in the respective repository.

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