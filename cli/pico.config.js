/** @type {import("../index.d").PicoConfig} */
const config = {
  entry: ['./src/index.tsx'],
  build: {
    jsGlob: ['src/**/*.{js,jsx,ts,tsx}'],
    styleGlob: ['src/**/*.{css,less}'],
  },

  outDir: {
    es: 'es',
    commonjs: 'lib',
    umd: 'dist',
  },
};

module.exports = config;
