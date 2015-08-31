1.6.1 / 2015-08-31
==================
  * patch release - fix es6 classes compatibility

1.6.0 / 2015-08-31
==================
  * Replace 'hasOwnProperty' check to 'in' to allow handle controllers written in es6 class style

1.5.1 / 2015-07-21
==================
  * patch release - updated and improved readme
  * new badges added

1.5.0 / 2015-04-07
==================
  * preferMountPathMatch changed to be false by default
  * blurr config now supports all express router options, such as: strict, mergeParams and caseSensitive

1.4.0 / 2015-03-30
==================
  * Added preferMountPathMatch option to load resource only if request path match resource's mount (true by default)
  * Added ability to handle route just with a middleware without controller action (useful for cases where middleware only is important)

1.3.0 / 2015-03-26
==================
  * Allow to pass inline function as middleware along with middleware names
  * Added more tests
  * Example application code re-factored

1.2.0 / 2015-03-24
==================
  * Code refactored after jsLint
  * Added express as dependency
  * Tests refactored

1.1.1 / 2015-03-24
==================
  * Fixed middleware loading bug
  * Added simple application example
  * Added GET tests  

1.1.0 / 2015-03-24
==================
  * Configuration option changed from 'middlewares' to 'moddleware'
  * First draft of meaningful readme

1.0.1 / 2015-03-23
==================
  * Bug fixing release

1.0.0 / 2015-03-23
==================
  * New name - Blurr

0.1.0 / 2015-03-23
==================
  * First public release

0.0.1 / 2015-03-21
==================
  * Blurr created
