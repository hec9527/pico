const path = require('path');
const pkg = require(path.join(process.cwd(), '/package.json'));

/** @type {import("webpack").Configuration} */
const webpackConfig = {
  mode: 'production',
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    library: pkg.name,
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  optimization: {
    usedExports: true,
  },
  performance: {
    hints: false,
  },
  resolveLoader: {
    modules: [path.join(__dirname, '../node_modules'), path.join(process.cwd(), 'node_modules')],
  },
  module: {
    rules: [
      {
        test: /.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(avif|webp|png|svg|jpg|gif|jpeg)$/,
        type: 'asset/inline',
      },
      {
        test: /.m?js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { loose: true, modules: false }],
                '@babel/preset-typescript',
                '@babel/preset-react',
              ],
            },
          },
        ],
      },
    ],
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

  plugins: [],
};

module.exports = webpackConfig;
