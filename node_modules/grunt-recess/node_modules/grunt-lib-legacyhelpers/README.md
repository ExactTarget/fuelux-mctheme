# grunt-lib-legacyhelpers

> Some old grunt helpers provided for backwards compatability.

Grunt's helper system has been depreciated in favor of node `require`.  If your plugin uses the `concat`, `gzip` or `min_max_info` helpers, you may now use them by adding this package to your plugin's dependencies.

## Usage

```js
// adding this line near the top of your task will load the helpers,
// giving them access to the current instance of grunt.
var helpers = require('grunt-lib-legacyhelpers').init(grunt);

// then, replace any call to helpers:
grunt.helper('name', ...);

// with this:
helpers.name(...);
```

*Future releases of grunt will provide the ability to pipe data through multiple tasks in your plugin code.  For now, this is the canonical method for sharing common utility functions between tasks.*