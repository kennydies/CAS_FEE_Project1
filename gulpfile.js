let gulp = require('gulp');
let babel = require('gulp-babel');
let uglify = require('gulp-uglify');
let prefix = require('gulp-autoprefixer');
let sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('scripts', function(){
  gulp.src('public/js/*.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(uglify())
      .on('error', function (err) { console.log('[Error]', err.toString()); })
      .pipe(gulp.dest('minjs'));
});

gulp.task('watch', function(){
  gulp.watch('public/js/*.js', ['scripts']);
});

gulp.task('styles', function(){
  gulp.src('public/css/*.css')
      .pipe(prefix('last 2 versions'))
      .pipe(gulp.dest('public/css/min'));
});

gulp.task('default', ['scripts']);

gulp.task('sass', function () {
    return gulp.src('public/css/**/*.scss')
        .pipe(prefix('last 2 versions'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css/min'));
});

gulp.task('sass:watch', function () {
    gulp.watch('public/css/**/*.scss', {ignoreInitial: false}, function() {
        gulp.start('sass');
    });
});