const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const port = process.env.PORT || 3000;

module.exports = merge(common, {
  mode: 'development',

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
  target: 'web',
});
