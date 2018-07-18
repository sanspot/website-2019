var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    del  = require('del'),
    sequence = require('gulp-sequence'),
    panini = require('panini');
    //browserSync = require('browser-sync').create();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

var jsPaths = [
  'js/*'
];

var cssPaths = [
  'bower_components/foundation-sites/dist/foundation.css',
  'css/*.css'
];
//========================================= CLEAN
gulp.task('clean', function (done) {
  return del([
    'dist/**/*'
    // we don't want to clean this file though so we negate the pattern
    //'!dist/assets/'
  ])
  done();
});

//========================================= Minify SASS
gulp.task('sass', function(done) {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed'
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('dist/css'));
    done();
});
//========================================= CopyJS
gulp.task('copyJS', function(done){
 gulp.src(jsPaths)
 .pipe(gulp.dest('dist/js'));
 done();
});
/*
//========================================= CopyCSS
//Copy 'stylesheet.css' into 'dist/css'
gulp.task('copyCSS', function(done){
 gulp.src(cssPaths)
 .pipe(gulp.dest('dist/css'));
 done();
});
*/
//========================================= ASSETS
gulp.task('assets', function(done){
 gulp.src('src/assets/*')
 .pipe(gulp.dest('dist/assets'));
 done();
});
//========================================= PANINI
gulp.task('panini', function (done) {
    return gulp.src('src/pages/*.html')
        .pipe(panini({
          root: 'src/pages/',
          layouts: 'src/layouts/',
          partials: 'src/partials/',
          helpers: 'src/helpers/',
          data: 'src/data/'
        }))
        .pipe(gulp.dest('dist'));

      done();
});

//========================================= BUILD
gulp.task('build', function(done) {
    sequence('clean', 'sass', 'copyJS', 'assets', 'panini', done);
});


//========================================= DEFAULT
gulp.task('default', ['build'], function() {
    gulp.watch(['scss/*.scss'], ['sass']);
    gulp.watch(['css/*.css'], ['copyCSS']);
    gulp.watch(['src/**/*', 'gulpfile.js'], ['build']);
});
