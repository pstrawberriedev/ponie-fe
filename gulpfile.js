var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var handlebars = require('gulp-compile-handlebars');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

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
        .pipe(handlebars(templateData, options))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload())
});

//Babel
gulp.task('babel', function() {
    return gulp.src('./src/js/*.js')
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/js'))
});

// Less
gulp.task('less', function() {
    return gulp.src('./src/less/styles.less')
      .pipe(plumber())
      .pipe(less({ paths: ['./src/less'] }))
      .pipe(gulp.dest('./dist/css'))
      .pipe(livereload())
});

// Cssmin
gulp.task('cssmin', function () {
    gulp.src('./dist/css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/css'));
});

// +++
// Watch
gulp.task('watch', function() {
    gulp.watch(['./src/**/*.hbs'], ['hbs']);
    gulp.watch(['./src/**/*.less'], ['less', 'cssmin']);
    gulp.watch(['./src/**/*.js'], ['babel']);
});

// +++
// Default & Build
gulp.task('build', ['less', 'cssmin', 'hbs', 'babel']);
gulp.task('default', ['watch']); // Default will run the 'entry' watch task
