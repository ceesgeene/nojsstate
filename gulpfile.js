'use strict';

/* global require */

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('default', ['compress']);

gulp.task('compress', function () {
    return gulp.src('pagestate.js')
        .pipe(uglify())
        .pipe(rename('pagestate.min.js'))
        .pipe(gulp.dest('.'));
});
