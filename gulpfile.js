'use strict';

let gulp = require('gulp');
let sass = require('gulp-sass');
let csso = require('gulp-csso');
let rename = require("gulp-rename");
let gcmq = require('gulp-group-css-media-queries');
let sourcemaps = require("gulp-sourcemaps");
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
sass.compiler = require('node-sass');

gulp.task('sass', function (){
    return gulp.src('./src/assets/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gcmq())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function() {
    browserSync.init({
        server: "./src", 
        tunnel: 'test',
    }, 
    );

    gulp.watch('./src/assets/scss/*.scss', gulp.series('sass'));
    gulp.watch("./src/*.html").on('change', browserSync.reload);
});


gulp.task('start', gulp.series('sass', 'serve'));