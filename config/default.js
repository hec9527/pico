/** @type {import("../index.d").PicoConfig} */
const config = {
  enter: 'src/index.tsx',
  outDir: {
    es: 'es',
    commonjs: 'lib',
    umd: 'dist',
  },
};

module.exports = config;
