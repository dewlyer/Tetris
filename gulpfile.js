(function(){

    'use strict';
    var pkg =  require('./package.json'),
        del = require('del'),
        gulp = require('gulp'),
        jade = require('gulp-jade'),
        sass = require('gulp-sass'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename');

    var paths = {
        html: {
            src: 'src/html/*.jade',
            dest: 'dist/html'
        },
        css: {
            src: 'src/css/**/*.scss',
            dest: 'dist/css'
        },
        js: {
            src: 'src/js/**/*.js',
            dest: 'dist/js'
        }
    };

    gulp.task('clean:html', function(cb){
        return del([paths.html.dest+'/**/*'], cb);
    });
    gulp.task('clean:css', function(cb){
        return del([paths.css.dest+'/**/*'], cb);
    });
    gulp.task('clean:js', function(cb){
        return del([paths.js.dest+'/**/*'], cb);
    });

    gulp.task('html', ['clean:html'], function(){
        gulp.src(paths.html.src)
            .pipe(jade({
                pretty: true,
                data: {
                    debug: false,
                    name: pkg.name,
                    keywords: pkg.keywords,
                    description: pkg.description
                }
            }))
            .pipe(gulp.dest(paths.html.dest));
    });

    gulp.task('css', ['clean:css'], function(){
        gulp.src(paths.css.src)
            .pipe(sass({outputStyle: 'nested'}))
            .pipe(gulp.dest(paths.css.dest))
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest(paths.css.dest));
    });

    gulp.task('js', ['clean:js'], function(){
        gulp.src(paths.js.src)
            .pipe(gulp.dest(paths.js.dest))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest(paths.js.dest))
    });

    gulp.task('default', ['html', 'css', 'js']);

}());