'use strict';

var c = 'biojs-component';
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('default', function () {
  return gulp.src('*.es6.js')
    .pipe(sourcemaps.init())
    .pipe(concat(c + '.js'))
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'));
});
