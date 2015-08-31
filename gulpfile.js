// See Salesforce UX's design-tokens project for more information

var path = require('path');

var rimraf = require('rimraf');
var async = require('async');
var _ = require('lodash');

var gulp = require('gulp');
var jsonlint = require('gulp-json-lint');
var rename = require('gulp-rename');
var theo = require('theo');

////////////////////////////////////////////////////////////////////
// Helpers
////////////////////////////////////////////////////////////////////

function clean(f, done) {
  var p = path.resolve(__dirname, f);
  rimraf(f, done);
}

////////////////////////////////////////////////////////////////////
// Tasks - Clean
////////////////////////////////////////////////////////////////////

gulp.task('clean', function(done) {
  async.each(['dist/tokens'], clean, done);
});

////////////////////////////////////////////////////////////////////
// Tasks - Tokens
////////////////////////////////////////////////////////////////////

var convertOptions = _({
  'web': [
    'styl',
    'less',
    'sass',
    'default.sass',
    'scss',
    'default.scss',
    'map.scss',
    'map.variables.scss',
    'html',
    'json',
    'common.js',
    'amd.js'
  ],
  'ios': ['ios.json'],
  'android': ['android.xml']
}).map(function(formats, transform) {
  return formats.map(function(format) {
    return {
      format: format,
      transform: transform
    };
  });
}).flatten().value();

function convert(options, done) {
  gulp.src([
    './tokens/*.json', '!./tokens/_*.json'
  ])
  .pipe(theo.plugins.transform(options.transform))
  .on('error', done)
  .pipe(theo.plugins.format(options.format))
  .on('error', done)
  .pipe(gulp.dest(path.resolve(__dirname, 'dist/tokens')))
  .on('error', done)
  .on('finish', done);
}

gulp.task('tokens', ['clean', 'lint'], function(done) {
  async.each(convertOptions, convert, done);
});

////////////////////////////////////////////////////////////////////
// Tasks - Lint
////////////////////////////////////////////////////////////////////

gulp.task('lint', function() {
  return gulp.src('./tokens/*.json')
    .pipe(jsonlint({ comments: true }))
    .pipe(jsonlint.report('verbose'));
});

////////////////////////////////////////////////////////////////////
// Tasks
////////////////////////////////////////////////////////////////////

gulp.task('dev', function() {
  gulp.watch('./tokens/**', ['tokens']);
});

gulp.task('default', ['tokens']);