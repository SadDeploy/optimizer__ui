'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


// concat and minify css
gulp.task('styles', function () {
    return gulp.src('app/styles/**/*.css')
        .pipe($.concatCss("main.css"))
        .pipe(gulp.dest('dist/styles/'))
        .pipe($.cssmin())
        .pipe($.rename({
            basename: "main",
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/styles/'));
});

// concat and minify js
gulp.task('script', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.concat('main.js'))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe($.uglify())
        .pipe($.rename({
            basename: "main",
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/scripts/'));
});

// minify html
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
        .pipe(gulp.dest('dist'));
});

// optimize img
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{cleanupIDs: false}]
        })))
        .pipe(gulp.dest('dist/images'));
});

// copy independent files
gulp.task('files', function () {
    return gulp.src('app/*')
        .pipe(gulp.dest('dist/'));
});

// clean directory
gulp.task('clean', require('del').bind(null, ['dist']));

// default task
gulp.task('default', ['styles', 'script', 'html', 'images', 'files'], function () {
    return gulp.src('dist/**/*').pipe($.size({title: 'Optimize', gzip: true}));
});

// optimize task
gulp.task('optimize', ['clean'], function () {
    gulp.start('default');
});