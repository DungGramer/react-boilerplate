const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const { paths, regex } = require('./utils.js');
const port = process.env.PORT || 3000;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // webpack 5 comes with devServer which loads in development mode
  devServer: {
    port,
    watchOptions: {
      ignored: regex.nodeModule,
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    contentBase: paths.public,
    watchContentBase: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  output: { publicPath: '/' },
});
