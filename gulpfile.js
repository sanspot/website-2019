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
  //'bower_components/foundation-sites/dist/foundation.js',
  //'bower_components/jquery/dist/jquery.js',
  'js/*'
];

var cssPaths = [
  'bower_components/foundation-sites/dist/foundation.css',
  'css/*.css'
];
//========================================= CLEAN
gulp.task('clean', function () {
  return del([
    'dist/**/*'
    // we don't want to clean this file though so we negate the pattern
    //'!dist/assets/'
  ])
  //browserSync.reload();
});

//========================================= Minify SASS
gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      // Right here!
      outputStyle: 'compressed'
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('dist/css'));
    //browserSync.reload();
});
//========================================= CopyJS
gulp.task('copyJS', function(){
 gulp.src(jsPaths)
 .pipe(gulp.dest('dist/js'));
 //browserSync.reload();
});
//========================================= CopyCSS
//Copy 'stylesheet.css' into 'dist/css'
gulp.task('copyCSS', function(){
 gulp.src(cssPaths)
 .pipe(gulp.dest('dist/css'));
 //browserSync.reload();
});
//========================================= ASSETS
gulp.task('assets', function(){
 gulp.src('src/assets/*')
 .pipe(gulp.dest('dist/assets'));
 //browserSync.reload();
});
//========================================= PANINI
gulp.task('panini', function () {
    return gulp.src('src/pages/*.html')
        .pipe(panini({
          root: 'src/pages/',
          layouts: 'src/layouts/',
          partials: 'src/partials/',
          helpers: 'src/helpers/',
          data: 'src/data/'
        }))
        .pipe(gulp.dest('dist'));
});

//========================================= BUILD
gulp.task('build', function(done) {
    sequence('clean', 'sass', 'copyCSS', 'copyJS', 'assets', 'panini', done);
});


//========================================= DEFAULT
gulp.task('default', ['build'], function() {
    //gulp.watch(['scss/*.scss', 'src/**/*', 'css/*.css', 'gulpfile.js'], ['build']);
    gulp.watch(['scss/*.scss'], ['sass']);
    gulp.watch(['css/*.css'], ['copyCSS']);
    gulp.watch(['src/**/*', 'gulpfile.js'], ['build']);
    /*
    //browser Sync
    browserSync.init({
        server: {
            baseDir: "./dist/",
            index: "hellojob.html"
        }
    });
    */
});
