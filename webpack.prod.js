const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [new MiniCssExtractPlugin(), new CleanWebpackPlugin()],
  devtool: 'source-map',
  // Where files should be sent once they are bundled
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        // include: /src/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        // sideEffects: true,
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
});
