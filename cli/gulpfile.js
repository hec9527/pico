const { series, parallel, src, dest } = require('gulp');

const del = require('del');
const webpack = require('webpack');
const less = require('gulp-less');
const babel = require('gulp-babel');
const named = require('vinyl-named');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const gulpWebpack = require('webpack-stream');
const typescript = require('gulp-typescript');

const tools = require('../utils');
const config = require('./pico.config');
const webpackConfig = require('./webpack.config');

const tsConfig = require(tools.getProjectDir('./tsconfig.json'));

function cleanUp() {
  const { es, cjs, umd } = config.outDir;
  return del([es, cjs, umd]);
}

function buildStyle() {
  return src(config.build.styleGlob)
    .pipe(less())
    .pipe(postcss([autoprefixer()]))
    .pipe(dest(config.outDir.cjs))
    .pipe(dest(config.outDir.es));
}

function buildEs() {
  const tsProject = typescript({
    ...tsConfig.compilerOptions,
    module: 'es2015',
  });

  return src(config.build.jsGlob)
    .pipe(tsProject)
    .pipe(babel({ plugins: [tools.getCliDir('./cli/transform-less-to-css.js')] }))
    .pipe(dest(config.outDir.es));
}

function buildCjs() {
  return src(config.outDir.es + '/**/*.js')
    .pipe(babel({ plugins: ['@babel/plugin-transform-modules-commonjs'] }))
    .pipe(dest(config.outDir.cjs));
}

function buildUmd() {
  return src(config.entry)
    .pipe(named())
    .pipe(gulpWebpack(webpackConfig, webpack))
    .pipe(dest(config.outDir.umd));
}

function buildType() {
  const tsProject = typescript({
    ...tsConfig.compilerOptions,
    declaration: true,
    emitDeclarationOnly: true,
  });

  return src(config.build.jsGlob)
    .pipe(tsProject)
    .pipe(dest(config.outDir.es))
    .pipe(dest(config.outDir.cjs));
}

module.exports = {
  default: series(cleanUp, parallel(series(buildEs, buildCjs, buildUmd), buildStyle, buildType)),
};
