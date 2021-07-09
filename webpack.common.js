const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = {
  // Rules of how webpack will take our files, compile & bundle them for the browser
  entry: ['core-js/stable', path.resolve(__dirname, 'src/', 'index.js')],
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
        ],
        sideEffects: true,
      },
      {
        test: cssModuleRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 3,
            },
          },
          'sass-loader',
        ],
        sideEffects: true,
      },
      {
        test: sassModuleRegex,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 3,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['*', '.js', '.jsx', '.scss'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
    }),
  ],
};
