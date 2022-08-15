module.exports = modules => ({
  presets: [['@babel/env', { modules }], '@babel/react', '@babel/typescript'],
  plugins: [['@babel/plugin-transform-runtime']],
});
