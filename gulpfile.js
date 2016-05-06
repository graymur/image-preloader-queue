var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch'),
    jshint = require('gulp-jshint')
;

gulp.task('hint', function() {
    return gulp.src('./index.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        ;
});

gulp.task('minify', function() {
    return gulp.src(['./index.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./minified'))
    ;
});

gulp.task('watch', function() {
    // watch JS modules files
    gulp.watch('./index.js', ['hint', 'minify']);
});

gulp.task('default', ['watch']);