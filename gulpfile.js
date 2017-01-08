var gulp = require('gulp');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var handlebars = require('gulp-compile-handlebars');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');
var liveReload = require('gulp-livereload');

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

// Babel
gulp.task('babel', function() {
    return gulp.src('./src/js/*.js')
      .pipe(plumber(function (error) {
        console.log(error.message);
        this.emit('end');
      }))
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/js'))
      .pipe(liveReload())
});

// Babel debug
gulp.task('babeldebug', function() {
    return gulp.src('./src/js/*.js')
      .pipe(plumber(function (error) {
        console.log(error.message);
        this.emit('end');
      }))
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('app.js'))
      .pipe(gulp.dest('./dist/js'))
      .pipe(liveReload())
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
    gulp.watch(['./src/**/*.js'], ['babel']);
});

// +++
// Default & Clean + Build
gulp.task('build', function(done) {
    runSequence('clean', 'runbuild', function() {
      done();
    });
});
//gulp.task('runbuild', ['copy', 'less', 'hbs', 'babel']);
gulp.task('runbuild', ['copy', 'less', 'hbs', 'babeldebug']);
gulp.task('default', ['watch']);
