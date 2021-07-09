const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const port = process.env.PORT || 3000;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  // webpack 5 comes with devServer which loads in development mode
  devServer: {
    port,
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    contentBase: path.join(__dirname, '/dist'),
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
});
