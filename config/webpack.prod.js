const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const CopyPlugin = require('copy-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { ESBuildMinifyPlugin } = require('esbuild-loader');
const esbuild = require('esbuild');

const { paths, regex, postCSS, resolvePath } = require('./utils');

module.exports = merge(common, {
  mode: 'production',
  target: ['es5', 'web'],
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(
      Object.assign(
        {
          inject: true,
          template: paths.indexHTML,
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
        // { from: 'public/assets/images', to: 'assets/images' },
        { from: 'public/_redirects', to: '' },
        { from: 'public/favicon.ico', to: '' },
      ],
    }),
  ],
  devtool: false,

  // Stop compilation early in production
  bail: false,

  /// There will be one main bundle, and one file per asynchronous chunk.
  output: {
    path: paths.dist,
    filename: '[name].[contenthash:8].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: regex.js,
        exclude: regex.nodeModules,
        use: [
          {
            loader: 'swc-loader',
          },
        ],
      },
      {
        test: regex.css,
        exclude: regex.cssModule,
        use: [MiniCssExtractPlugin.loader, 'css-loader', postCSS],
      },
      {
        test: regex.cssModule,
        exclude: regex.css,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          postCSS,
        ],
      },
      {
        test: regex.sass,
        exclude: regex.sassModule,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          postCSS,
          'sass-loader',
        ],
        sideEffects: true,
      },
      {
        test: regex.sassModule,
        exclude: regex.sass,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          postCSS,
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new ESBuildMinifyPlugin({
        target: 'es2015',
        css: true,
      }),
    ],
  },
});
