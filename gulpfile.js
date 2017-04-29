const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const dedupe = require('gulp-dedupe');
const batch = require('gulp-batch');
const watch = require('gulp-watch');
// var sourcemaps = require('gulp-source-maps');

// http://blog.revathskumar.com/2016/02/browserify-separate-app-and-vendor-bundles.html

const vendors = [
    'object-path-immutable', 'jquery', 'lodash', 'react', 'react-dom', 'whatwg-fetch',
    'redux', 'react-redux', 'moment', 'redux-logger', 'redux-thunk'];


gulp.task('apply-prod-env', function() {
    process.env.NODE_ENV = 'production';
});


gulp.task('build:vendor', function() {

    var stream = browserify({
        debug: false,
        require: vendors
    });

    return stream.bundle()
      .pipe(source('vendor.js'))
      .pipe(buffer())
      // .pipe(sourcemaps.init({loadMaps: true}))
      // .pipe(sourcemaps.write('./maps'))
      // .pipe(gulp.dest('../admin/static/admin/js/'));
      .pipe(gulp.dest('./build'));
});

gulp.task('dev', function () {
    return watch(['./*.jsx', './*.js'], {ignoreInitial: false}, function () {
        gulp.start('build:app');
    });
});




/**
 * JSLint/JSHint validation
 */
gulp.task('lint', function() {
  return gulp.src('app.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('build:app', function() {
    return browserify({
        entries: ['./index.jsx'],
        extensions: ['.js', '.jsx']
        // debug: true
      })
      .external(vendors) // Specify all vendors as external source
      .transform(babelify, {
          presets: ['es2015', 'react'],
          plugins: ["transform-class-properties"]
      })
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      // .pipe(sourcemaps.init({loadMaps: true}))
      // .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./build'));
});

gulp.task('build', ['build:app', 'build:vendor']);

/**
 * Minify built vendor.js
 */
gulp.task('build:vendor-min', ['apply-prod-env', 'build:vendor'], function() {
    gulp.src('../admin/static/admin/js/vendor.js')
        .pipe(dedupe())
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});

gulp.task('build:app-min', ['apply-prod-env', 'build:app', 'lint'], function() {
    gulp.src('../admin/static/admin/js/app.js')
        .pipe(dedupe())
        .pipe(uglify())
        .pipe(gulp.dest('./build'));
});

gulp.task('default', ['build:vendor-min', 'build:app-min']);
