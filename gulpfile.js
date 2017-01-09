var gulp = require('gulp');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var gulpWebpack = require('webpack-stream');
var webpack = require('webpack');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
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
gulp.task('copystatic', function(){
  return gulp.src('./src/public/static/**/*.*')
  .pipe(gulp.dest('./dist/public'));
});
gulp.task('copyserver', function() {
  return gulp.src('./src/server/**/*.*')
  .pipe(gulp.dest('./dist/'));
});

// Webpack
// using 'webpack-stream' for gulp stream, 'webpack' for plugins & loaders
gulp.task('webpack', function() {
  gulp.src('./src/public/js/main.js')
    .pipe(plumber(function (error) {
      console.log(error.message);
      this.emit('end');
    }))
    .pipe(gulpWebpack({
      watch: false,
      entry: { main: './src/public/js/main.js', },
      output: { filename: './app.js' },
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }]
      },
      plugins: [new webpack.optimize.UglifyJsPlugin({
        comments: false,
        compress: {
          warnings: false
        }
      })]
    }, webpack))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/public/js/'));
});

// Less
gulp.task('less', function() {
    return gulp.src('./src/public/less/styles.less')
       .pipe(plumber(function (error) {
         console.log(error.message);
         this.emit('end');
       }))
      .pipe(less({ paths: ['./src/public/less'] }))
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/public/css'))
      .pipe(liveReload())
});

// +++
// Watch
gulp.task('watch', function() {
    //liveReload.listen();
    gulp.watch(['./src/public/**/*.less'], ['less']);
    gulp.watch(['./src/public/**/*.js'], ['webpack']);
});

// +++
// Build & Default tasks
// - Define 'runbuild', which executes after 'build' via runSequence library.
//   This is because we want to make sure we delete ./dist/* before we
//   make a new build (to ensure everything is ~ frash and claen ~)
gulp.task('runbuild', ['copystatic', 'copyserver', 'less', 'webpack']);
gulp.task('build', function(done) {
    runSequence('clean', 'runbuild', function() {
      done();
    });
});
gulp.task('default', ['build']);
