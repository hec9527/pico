/** @type {import("../index.d").PicoConfig} */
const config = {
  entry: ['./lib/es/index.js'],

  build: {
    jsGlob: [
      './src/**/*.{js,jsx,ts,tsx}',
      '!./src/**/test/*.{js,jsx,ts,tsx}',
      '!./src/**/demo/*.{js,jsx,ts,tsx}',
    ],
    styleGlob: ['src/**/*.{css,less}'],
  },

  outDir: {
    es: './lib/es',
    cjs: './lib/cjs',
    umd: './lib/umd',
  },
};

module.exports = config;
