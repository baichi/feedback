var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');

gulp.task('html', function () {
    gulp.src(['./index.html', './admin.html']).pipe(minifyHtml())
        .pipe(gulp.dest('./build'));
});

gulp.task('js', function () {
    gulp.src(['./app/js/jquery.min.js', './app/js/bootstrap.min.js', './app/js/angular.min.js', './app/js/wilddog.js', './app/js/wild-angular.min.js', './app/js/angular-sanitize.min.js', './app/js/marked.min.js', './app/js/highlight.pack.min.js']).pipe(concat('all.js')).pipe(uglify()).pipe(rename('all.min.js')).pipe(gulp.dest('./build'));
});

gulp.task('css', function () {
    gulp.src(['./app/css/bootstrap.min.css', './app/css/atelier-cave.light.css']).pipe(concat('all.css')).pipe(minifyCss()).pipe(rename('all.min.css')).pipe(gulp.dest('./build'));
});

gulp.task('default',['js','css','html']);