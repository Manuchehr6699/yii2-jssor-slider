/* File: gulpfile.js */

// grab our packages
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    path = require('path'),
    minifyCSS = require('gulp-minify-css');
    addsrc= require('gulp-add-src');
    rename= require('gulp-rename');


//define the asset directories



// define the default task and add the watch task to it
gulp.task('default', ['watch']);

//################################ JShint Tasks ########################################

// configure the jshint task
gulp.task('jshint', function () {
    return gulp.src('build/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});


//################################ Copy Tasks ########################################



//################################ Js Tasks ########################################

gulp.task('build-js', function () {
    if (gutil.env.type === 'production') { //gulp ran with '--type production'
        return gulp.src(['build/js/*.js'])
            .pipe(concat('all.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(publicAssetsDir + 'js'));
        
    } else {
         return gulp.src(['build/js/*.js'])
            .pipe(sourcemaps.init())
            .pipe(concat('all.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('assets/js'));
    }

});

//################################ CSS Tasks ########################################

gulp.task('build-css', function () {
    if (gutil.env.type === 'production') {
        gulp.src(['build/less/*.less'])
            .pipe(less())
            .pipe(minifyCSS())
           // .pipe(rename('all.min.css'))
            .pipe(gulp.dest('assets/css'));
    } else {
        return gulp.src(['build/less/*.less'])
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(sourcemaps.write())
            //.pipe(sourcemaps.write('.',{includeContent:false, sourceRoot:'../../app/assets/less'}))
            .pipe(gulp.dest('assets/css'));
    }
});

//################################ Watch Task ########################################

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function () {
    gulp.watch( 'build/less/**/*.less', ['build-css']);
    gulp.watch('build/js/**/*.js', ['build-js']);
});