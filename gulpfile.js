const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const terser = require('gulp-terser');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('gulp-sass')(require('sass'));

const paths = {
    styles: {
      src: ['./src/sass/**/*.scss'],
      dest: './css/',
    },
    scripts: {
      src: ['./src/js/**/*.js'],
      dest: './js/',
    },
};


function compileStyles() {
    return src(paths.styles.src)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(postcss([autoprefixer(), cssnano()]))
      .pipe(rename({ suffix: '.min' }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(paths.styles.dest));
}

function minifyScripts() {
    return src(paths.scripts.src)
      .pipe(sourcemaps.init())
      .pipe(terser().on('error', (error) => console.log(error)))
      .pipe(rename({ suffix: '.min' }))
      .pipe(sourcemaps.write('.'))
      .pipe(dest(paths.scripts.dest));
}

function cacheBust() {
    return src(paths.cachebust.src)
      .pipe(replace(/cache_bust=\d+/g, 'cache_bust=' + new Date().getTime()))
      .pipe(dest(paths.cachebust.dest));
}

function watcher() {
    watch(paths.styles.src, compileStyles);
    watch(paths.scripts.src, minifyScripts);
}

exports.compileStyles = compileStyles;
exports.minifyScripts = minifyScripts;
exports.watcher = watcher;

exports.default = series(
    parallel(compileStyles, minifyScripts),
    watcher
);