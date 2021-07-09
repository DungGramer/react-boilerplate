const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const CopyPlugin = require('copy-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: path.resolve(__dirname, 'public', 'index.html'),
        },
        {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        },
      ),
    ),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[contenthash:8].css',
      chunkFilename: 'assets/css/[id].[contenthash:8].css',
    }),
    new CopyPlugin({
      patterns: [
        { from: 'public/assets', to: 'assets' },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: 'source-map',

  // Stop compilation early in production
  bail: false,

  /// There will be one main bundle, and one file per asynchronous chunk.
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: path.join(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: cssModuleRegex,
        exclude: cssRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
      {
        test: sassRegex,
        exclude: sassModuleRegex,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        sideEffects: true,
      },
      {
        test: sassModuleRegex,
        exclude: sassRegex,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
});
