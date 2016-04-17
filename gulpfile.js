var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    templateCache = require('gulp-angular-templatecache');;

gulp.task('cache-templates', function () {
    return gulp.src('templates/**/*.html')
        .pipe(templateCache({
            module: 'angularBootstrapMaterial',
            transformUrl: function (url) {
                return 'templates/' + url;
            }
        }))
        .pipe(gulp.dest('scripts/'));
});
gulp.task('default', ['cache-templates'], function () {
    return gulp.src('scripts/**/*.js')
        .pipe(concat('angular-bootstrap-material.js'))
        .pipe(gulp.dest('dist/'))
        .pipe(rename('angular-bootstrap-material.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});