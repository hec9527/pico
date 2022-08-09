const { series, parallel, src, watch, dest } = require('gulp');
const { spawn } = require('child_process');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const del = require('del');
const path = require('path');
const { merge } = require('lodash');
const defaultConf = require('../config/default');

/** @type {import("../index.d").PicoConfig} */
const config = merge(defaultConf, require(path.resolve(process.cwd(), './pico.config.js')));

console.log(config);

function cleanAll() {
  const { es, commonjs, umd } = config.outDir;
  return del([es, commonjs, umd]);
}

function buildEs() {
  //
}

function buildCommonJs() {
  //
}

function buildDest() {
  //
}

module.exports = {
  clean: cleanAll,
};
