var gulp = require('gulp'),
  concat = require('gulp-concat'),
  prettify = require('gulp-jsbeautifier'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  templateCache = require('gulp-angular-templatecache');
var merge2 = require('merge2');

// beautify task
gulp.task('beautify', function () {
  return gulp.src(['src/scripts/**/*.js',
                   'src/templates/**/*.html',
                   'demos/scripts/**/*.js',
                  'demos/scripts/**/*.css',
                   'demos/scripts/**/*.css'], {
      base: './'
    })
    .pipe(prettify({
      debug: true
    }))
    .pipe(gulp.dest('./'));
});


//Below task combines the templateCache stream and source files and outputs concatinated file
gulp.task('default', ['beautify'], function () {
  return merge2(gulp.src('src/scripts/**/*.js'),
      gulp.src('src/templates/**/*.html')
      .pipe(templateCache({
        module: 'angularBootstrapMaterial',
        transformUrl: function (url) {
          return 'templates/' + url;
        }
      })))
    .pipe(concat('angular-bootstrap-material.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(uglify())
    .pipe(rename('angular-bootstrap-material.min.js'))
    .pipe(gulp.dest('dist/'));
});
