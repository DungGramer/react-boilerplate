const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Rules of how webpack will take our files, complie & bundle them for the browser
  // entry: ['core-js/stable', path.resolve(__dirname, 'src/', 'index.js')],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
      inject: false,
    }),
  ],

  // Where files should be sent once they are bundled
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.bundle.js',
    publicPath: '/',
    clean: true,
  },
};
