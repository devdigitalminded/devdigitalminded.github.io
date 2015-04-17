/* Load plugins */
var gulp = require('gulp'),
  sass = require('gulp-sass'),
  watch = require('gulp-watch'),
  jshint = require('gulp-jshint'),
  // notify = require('gulp-notify'),
  concat = require('gulp-concat'),
  plumber = require('gulp-plumber'),
  uncss = require('gulp-uncss'),
  zopfli = require('gulp-zopfli'),
  connect = require('gulp-connect'),
  minifyhtml = require('gulp-minify-html'),
  inlinesource = require('gulp-inline-source'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  minifyCSS = require('gulp-minify-css'),
  pngquant = require('imagemin-pngquant'),
  imageResize = require('gulp-image-resize'),
  rename = require('gulp-rename'),
  changed = require('gulp-changed'),
  addsrc = require('gulp-add-src');

gulp.task('connect', function() {
  return connect.server({
    port: 3000,
    livereload: true
  });
});

// SCSS tasks
gulp.task('css', function() {
  return gulp.src('./scss/main.scss')
    .pipe( sass() )
    .pipe( plumber() )
    .pipe( gulp.dest('./build/css') )
    .pipe( connect.reload() )
    // .pipe( notify('CSS task complete!') )
});

gulp.task('uncss', function() {
  return gulp.src('./build/css/*.css')
    .pipe( uncss({
      html: ['./build/*.html'],
      // To make Bootstrap work
      ignore: [
        /(#|\.)fancybox(\-[a-zA-Z]+)?/,
        // Bootstrap selectors added via JS
        /\w\.in/,
        '.modal-open',
        '.modal-backdrop.fade.in',
        '.modal-open .modal',
        '.fade',
        '.fade.in',
        '.collapse',
        '.collapse.in',
        '.collapsing',
        /(#|\.)navbar(\-[a-zA-Z]+)?/,
        /(#|\.)dropdown(\-[a-zA-Z]+)?/,
        /(#|\.)btn(\-[a-zA-Z]+)?/,
        /(#|\.)(open)/,
        // currently only in a IE conditional, so uncss doesn't see it
        '.close',
        '.alert-dismissible'
      ]
    }) )
    .pipe( plumber() )
    .pipe( gulp.dest('./build/css') )
});

gulp.task('minify-css', function() {
  return gulp.src('./build/css/*.css')
    .pipe( minifyCSS() )
    .pipe( plumber() )
    .pipe( gulp.dest('./build/css') )
});

gulp.task('img', ['img-default', 'img-clients-95', 'img-clients']);

// Responsive images
gulp.task('img-default', function() {
  return gulp.src('img/**')
    .pipe( gulp.dest('build/img') );
});

gulp.task('img-clients-95', function() {
  return gulp.src('img/clients/**')
    .pipe( changed('build/img/clients') )
    .pipe( imageResize({ width : 95 }) )
    .pipe( rename(function (path) { path.basename += '-95'; }) )
    .pipe( gulp.dest('build/img/clients') );
});

gulp.task('img-clients', function() {
  return gulp.src('img/clients/**')
    .pipe( changed('build/img/clients') )
    .pipe( imageResize({ width : 224 }) )
    .pipe( gulp.dest('build/img/clients') );
});

// JS tasks
gulp.task('js', function() {
  return gulp.src('./js/main.js')
    .pipe( addsrc('./bower_components/bootstrap-without-jquery/bootstrap3/bootstrap-without-jquery.min.js') )
    .pipe( concat('all.js') )
    // .pipe( jshint() )
    .pipe( jshint.reporter('default') )
    .pipe( plumber() )
    .pipe( gulp.dest('./build/js/') )
    .pipe( connect.reload() )
    // .pipe( notify('JS task complete!') )
});

gulp.task('uglify', function() {
  return gulp.src('./js/*.js')
    .pipe( uglify() )
    .pipe( addsrc('./js/vendor/*.js') )
    .pipe( concat('all.js') )
    .pipe( plumber() )
    .pipe( gulp.dest('./build/js') )
});

// HTML reload on changes
gulp.task('html', function() {
  return gulp.src('./*.html')
    .pipe( plumber() )
    .pipe( connect.reload() )
});


/* Default task */
gulp.task('default', ['connect', 'watch'], function() {
  gulp.start('css', 'js');
});

/* Build static resources */
gulp.task('build-resources', ['css']);

/* Compress static resources */
gulp.task('compress-resources', ['uncss', 'uglify'], function() {
  gulp.start('minify-css');
});

/* Deploy task */
gulp.task('deploy', ['build-resources'], function() {
  gulp.start('compress-resources');
});

/* Watch task */
gulp.task('watch', function() {
  gulp.watch('./scss/**/*.scss', ['css']);
  gulp.watch('./js/**/*.js', ['js']);
  gulp.watch('./*.html', ['html']);
});
