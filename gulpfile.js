var gulp = require('gulp');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var webpack = require('webpack-stream');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var handlebars = require('gulp-compile-handlebars');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var liveReload = require('gulp-livereload'); //implement this, currently unused

// Clean
gulp.task('clean', function(){
  return gulp.src(['./dist/*'], {read:false})
  .pipe(clean());
});

// Move Static Files
gulp.task('copy', function(){
  return gulp.src('./src/static/**/*.*')
  .pipe(gulp.dest('./dist/'));
});

// Handlebars
//  @todo: Redo this. Need more dynamic compiling and data-passthrough...
//  should I handle this via express?
gulp.task('hbs', function () {
    var templateData = { testy: 'this is the body' },
    options = {
        ignorePartials: true,
        batch : ['./src/views/partials'],
        helpers : {
            capitals : function(str){
                return str.toUpperCase();
            }
        }
    }

    return gulp.src('./src/views/index.hbs')
      .pipe(plumber(function (error) {
        console.log(error.message);
        this.emit('end');
      }))
      .pipe(handlebars(templateData, options))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('dist'))
      .pipe(liveReload())
});

// Webpack
// @todo: minify webpack output
gulp.task('webpack', function() {
  return gulp.src('./src/js/main.js')
    .pipe(plumber(function (error) {
      console.log(error.message);
      this.emit('end');
    }))
    .pipe(webpack({
      watch: false,
      entry: { main: './src/js/main.js', },
      output: { filename: './app.js' }
    }))
    .pipe(gulp.dest('./dist/js/'));
});

// Less
gulp.task('less', function() {
    return gulp.src('./src/less/styles.less')
       .pipe(plumber(function (error) {
         console.log(error.message);
         this.emit('end');
       }))
      .pipe(less({ paths: ['./src/less'] }))
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/css'))
      .pipe(liveReload())
});

// +++
// Watch
gulp.task('watch', function() {
    //liveReload.listen();
    gulp.watch(['./src/**/*.hbs'], ['hbs']);
    gulp.watch(['./src/**/*.less'], ['less']);
    gulp.watch(['./src/**/*.js'], ['webpack']);
});

// +++
// Default & Clean + Build
// - define runbuild, which executes after 'build' via runSequence library
// -- this is because we want to make sure we delete ./dist before we make
//    a new build - to ensure everything is frash and claen
gulp.task('build', function(done) {
    runSequence('clean', 'runbuild', function() {
      done();
    });
});
gulp.task('runbuild', ['copy', 'less', 'hbs', 'webpack']);
gulp.task('default', ['watch']);
