# Fuel UX Carbon Theme

[Primary Fuel UX repo](https://github.com/ExactTarget/fuelux)

Fuel UX extends Twitter Bootstrap with additional lightweight JavaScript controls.
Other benefits include easy installation into web projects, integrated scripts for customizing Bootstrap and Fuel UX,
simple updates, and solid optimization for deployment. All functionality is covered by live documentation and unit tests.

## Getting Started
* `git clone git://github.com/ExactTarget/fuelux-carbon.git`
* Carbon-themed Fuel UX files for production use are located in the [dist](https://github.com/ExactTarget/fuelux-carbon/tree/master/dist) directory
* To customize, modify the files under [src](https://github.com/ExactTarget/fuelux-carbon/tree/master/src) then run `grunt` to regenerate your [dist](https://github.com/ExactTarget/fuelux-carbon/tree/master/dist) directory (more below)

### Important notes
Please don't edit files in the `dist` directory as they are generated via grunt. You'll find source code in the `src` directory!

While grunt can run the included unit tests via PhantomJS, this isn't a substitute for the real thing. Please be sure to test the `test/*.html` unit test file(s) in real browsers as well.

More about [Installing grunt and PhantomJS](https://github.com/ExactTarget/fuelux/wiki/Installing-grunt-and-PhantomJS)

## Copyright and license

Copyright (c) 2012 ExactTarget

Licensed under the MIT License (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the COPYING file.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.