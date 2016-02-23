(function(){

    'use strict';
    var pkg =  require('./package.json'),
        fs = require('fs'),
        gulp = require('gulp'),
        jade = require('gulp-jade'),
        sass = require('gulp-sass'),
        clean = require('gulp-clean'),
        uglify = require('gulp-uglify'),
        header = require('gulp-header'),
        rename = require('gulp-rename');

    var debug = false;
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
    var copyright = fs.readFileSync('copyright');
    var packages = {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        author: pkg.author,
        repository: pkg.repository.url,
        license: pkg.license
    };

    gulp.task('clean:html', function(){
        return gulp.src(paths.html.dest+'/**/*', {read: false})
            .pipe(clean());
    });
    gulp.task('clean:css', function(cb){
        return gulp.src(paths.css.dest+'/**/*', {read: false})
            .pipe(clean());
    });
    gulp.task('clean:js', function(cb){
        return gulp.src(paths.js.dest+'/**/*', {read: false})
            .pipe(clean());
    });

    gulp.task('html', ['clean:html'], function(){
        return gulp.src(paths.html.src)
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
        var stream = gulp.src(paths.css.src);
        stream = stream.pipe(sass({outputStyle: 'nested'}))
            .pipe(gulp.dest(paths.css.dest));
        if(debug){
            return stream;
        }
        else {
            return stream.pipe(sass({outputStyle: 'compressed'}))
                .pipe(header(copyright, packages))
                .pipe(rename({suffix: ".min"}))
                .pipe(gulp.dest(paths.css.dest));
        }
    });

    gulp.task('js', ['clean:js'], function(){
        var stream = gulp.src(paths.js.src);
        stream = stream.pipe(gulp.dest(paths.js.dest));
        if(debug){
            return stream;
        }
        else {
            return stream.pipe(uglify())
                .pipe(header(copyright, packages))
                .pipe(rename({suffix: '.min'}))
                .pipe(gulp.dest(paths.js.dest));
        }
    });

    gulp.task('debug', function(){
        debug = true;
        gulp.start('default');
    });

    gulp.task('default', ['html', 'css', 'js']);

}());