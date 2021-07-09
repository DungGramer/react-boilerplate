const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT || '10000',
);
const mediaPath = 'assets/images/[name].[hash:8].[ext]';

module.exports = {
  // Rules of how webpack will take our files, compile & bundle them for the browser
  entry: ['core-js/stable', path.resolve(__dirname, 'src', 'index.js')],
  target: 'web',
  module: {
    rules: [
      // File Loader
      {
        test: [/\.avif$/],
        type: 'asset/resource',
        loader: 'url-loader',
        options: {
          fallback: 'file-loader',
          limit: imageInlineSizeLimit,
          mimetype: 'image/avif',
          name: mediaPath,
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset/resource',
        loader: 'url-loader',
        options: {
          fallback: 'file-loader',
          limit: imageInlineSizeLimit,
          name: mediaPath,
        },
      },
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
          'postcss-loader',
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
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
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
          'postcss-loader',
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
              modules: {
                localIdentName: '[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
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
