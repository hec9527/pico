const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const babelConfig = require('./babel.config');
const pkg = require(path.join(process.cwd(), '/package.json'));

/** @returns {import("webpack").Configuration} */
const getWebpackConfig = postCssPlugins => ({
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    library: pkg.name,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /.(css|less)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: postCssPlugins,
              },
            },
          },
          { loader: 'less-loader' },
        ],
      },
      {
        test: /.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig('auto'),
          },
        ],
      },
    ],
  },
  resolveLoader: {
    modules: [path.join(__dirname, '../node_modules'), path.join(process.cwd(), 'node_modules')],
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },

  plugins: [new MiniCssExtractPlugin({ filename: '[name].css' })],
});

module.exports = getWebpackConfig;
