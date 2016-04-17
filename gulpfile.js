var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('default', function () {
    gulp.src('scripts/**/*.js')
        .pipe(concat('angular-bootstrap-material.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(rename('angular-bootstrap-material.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});