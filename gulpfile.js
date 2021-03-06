var gulp = require('gulp'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    nodemon = require('gulp-nodemon'),
    sass = require('gulp-sass');

gulp.task('build', ['client', 'sass']);

gulp.task('watch', ['client-watch', 'sass-watch']);

gulp.task('server', function () {
  nodemon({
    script: 'server/index',
    ext: 'js json'
  });
});

gulp.task('client', function () {
  gulp.src('client/js/main.js')
      .pipe(browserify({
        transform: ['hbsfy'],
        extensions: ['.hbs']
      }))
      .pipe(rename('hearthclone.js'))
      .pipe(gulp.dest('./client/build'));
});

gulp.task('client-watch', function () {
  gulp.watch('client/js/**/*.js', ['client']);
});

gulp.task('sass', function () {
  gulp.src('client/**/*.scss')
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('client/assets/css'));
});

gulp.task('sass-watch', function () {
  gulp.watch('client/**/*.scss', ['sass']);
});

gulp.task('default', ['build','server','watch']);
