var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint')
;

gulp.task('hint', function() {
    return gulp.src('./images-preloader-queue.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        ;
});

gulp.task('minify', function() {
    return gulp.src(['./images-preloader-queue.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./minified'))
    ;
});

gulp.task('watch', function() {
    // watch JS modules files
    gulp.watch('./images-preloader-queue.js', ['hint', 'minify']);
});

gulp.task('default', ['watch']);