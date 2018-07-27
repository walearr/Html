var gulp = require('gulp');
gulp.task('hello', function() {
    console.log('Hello, is it me your looking for?');
});
var sass = require('gulp-sass');
gulp.task('sass', function(){
    return gulp.src('app/scss//**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

var browserSync = require('browser-sync').create();
gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'app',
            directory: true
        },
    })
})
gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('app/scss/**/*.scss' , ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
gulp.task('useref', function(){
    return gulp.src('app/**/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js',uglify()))
        .pipe(gulp.dest('dist'))
});

