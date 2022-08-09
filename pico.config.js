/** @type {import("pico").PicoConfig} */
const config = {
  enter: 'src/index3.tsx',
  outDir: {
    es: 'es3',
    // commonjs: 'lib',
    umd: 'dist3',
  },
};

module.exports = config;
