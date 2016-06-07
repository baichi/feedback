var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');
var minifyHtml = require('gulp-minify-html');
var connect = require('gulp-connect');

gulp.task('html', function () {
    gulp.src(['./app/index.html', './app/admin.html']).pipe(minifyHtml())
        .pipe(gulp.dest('./build')).pipe(connect.reload());;
});

gulp.task('js', function () {
    gulp.src(['./app/js/jquery.min.js', './app/js/bootstrap.min.js', './app/js/angular.min.js', './app/js/wilddog.js', './app/js/wild-angular.min.js', './app/js/angular-sanitize.min.js', './app/js/marked.min.js', './app/js/highlight.pack.min.js', './app/js/app.js']).pipe(concat('all.js')).pipe(gulp.dest('./build')).pipe(uglify()).pipe(rename('all.min.js')).pipe(gulp.dest('./build')).pipe(connect.reload());;
});

gulp.task('serve',function(){
    connect.server({
        root:'build',//服务器的根目录
        port:8080, //服务器的地址，没有此配置项默认也是 8080
        livereload:true//启用实时刷新的功能
    });
});

gulp.task('watch',function(){
    gulp.watch('./app/*.html',['html']);
    gulp.watch('./app/js/*.js',['js']);
    gulp.watch('./app/css/*.css',['css']);
});

gulp.task('css', function () {
    gulp.src(['./app/css/bootstrap.min.css', './app/css/atelier-cave.light.css']).pipe(concat('all.css')).pipe(minifyCss()).pipe(rename('all.min.css')).pipe(gulp.dest('./build')).pipe(connect.reload());;
});

gulp.task('default',['js','css','html','serve','watch']);