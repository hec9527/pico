const { series, parallel, src, dest } = require('gulp');
// const { spawn } = require('child_process');
// const uglify = require('gulp-uglify');
// const rename = require('gulp-rename');
const babel = require('gulp-babel');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const del = require('del');
const path = require('path');
// const cssnano = require('cssnano');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const gulpWebpack = require('webpack-stream');
const named = require('vinyl-named');
const typescript = require('gulp-typescript');

const defaultConf = require('./pico.config');
const babelConfig = require('./babel.config');
const getDefaultWebpackConfig = require('./webpack.config');

/** @type {import("../index.d").PicoConfig} */
const config = merge(defaultConf, require(path.resolve(process.cwd(), './pico.config.js')));
const webpackConfig = merge(
  getDefaultWebpackConfig(defaultConf.postCssPlugins),
  config.webpack || {},
);

function clean(type) {
  return function cleanUp() {
    const { es, commonjs, umd } = config.outDir;
    if (type && type in config.outDir) {
      return del(config.outDir[type]);
    }
    return del([es, commonjs, umd]);
  };
}

function buildStyle(dir) {
  return function buildStyle() {
    return (
      src(config.build.styleGlob)
        .pipe(less())
        // .pipe(postcss([cssnano]))
        .pipe(postcss([]))
        .pipe(dest(dir))
    );
  };
}

function buildScript(dir, modules) {
  return function buildScript() {
    return (
      src(config.build.jsGlob)
        .pipe(babel(babelConfig(modules)))
        // .pipe(uglify())
        .pipe(dest(dir))
    );
  };
}

function emitTypeDeclare(dir) {
  //
}

function buildType(dir) {
  return function buildType() {
    return src('../tsconfig.build.json').pipe(typescript()).pipe(dest(dir));
  };
}

function buildEs() {
  return series(
    clean('es'),
    parallel(
      buildScript(config.outDir.es, false),
      buildStyle(config.outDir.es),
      buildType(config.outDir.es),
    ),
  );
}

function buildCjs() {
  return series(
    clean('commonjs'),
    parallel(
      buildScript(config.outDir.commonjs, 'commonjs'),
      buildStyle(config.outDir.commonjs),
      buildType(config.outDir.commonjs),
    ),
  );
}

function buildDist() {
  return series(clean('umd'), () =>
    src(config.entry)
      .pipe(named())
      .pipe(gulpWebpack(webpackConfig, webpack))
      //
      .pipe(dest(config.outDir.umd)),
  );
}

module.exports = {
  clean: clean(),
  es: buildEs(),
  lib: buildCjs(),
  dist: buildDist(),
  default: parallel(buildEs(), buildCjs(), buildDist()),
};
