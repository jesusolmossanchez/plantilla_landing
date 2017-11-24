var gulp = require('gulp');
var gutil = require('gulp-util');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
    gulp.src('assets/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css/'));
});


gulp.task('deploy-js', function () {
    gulp.src(['assets/js/vendor/jquery-1.12.0.min.js','assets/js/vendor/slick/slick.js','assets/js/vendor/rangeslider.min.js','assets/js/main.js', 'assets/js/plugins.js'])
      .pipe(sourcemaps.init())
      .pipe(concat('scripts-build.min.js'))
      .pipe(sourcemaps.write())
      .pipe(uglify())
      .pipe(gulp.dest('assets/dist-js/'));
});


gulp.task('deploy-css', function () {
    gulp.src(['assets/css/styles.css' ])
        .pipe(concat('styles-build.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('assets/dist-css/'));
});

gulp.task('serve', ['styles', 'deploy-css', 'deploy-js'], function() {

    browserSync.init({
        server: "."
    });

    gulp.watch("assets/scss/**/*.scss", ['styles', 'deploy-css']);
    gulp.watch("assets/js/*.js", ['deploy-js']);

    gulp.watch("assets/dist-css/*.css").on('change', browserSync.reload);
    gulp.watch("assets/dist-js/*.js").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);

});


gulp.task('default',['serve']);