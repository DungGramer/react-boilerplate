const path = require('path');

const resolvePath = relativePath => path.join(__dirname, '../', relativePath);

const paths = {
  root: resolvePath(''),
  public: resolvePath('public/'),
  dist: resolvePath('dist/'),
  indexHTML: resolvePath('public/index.html'),
  indexJS: resolvePath('src/index.js'),
  assets: resolvePath('public/assets'),
  fonts: resolvePath('public/fonts'),
  image: resolvePath('public/images'),
};

const regex = {
  css: /\.css$/i,
  cssModule: /\.module\.css$/i,
  sass: /\.(scss|sass)$/i,
  sassModule: /\.module\.(scss|sass)$/i,
  avif: /\.avif$/i,
  image: /\.(png|jpe?g|gif|bmp|ico)$/i,
  svg: /\.svg$/i,
  font: /\.(woff|woff2|eot|ttf|otf)$/i,
  js: /\.(js|jsx)$/i,
  nodeModule: /node_modules/,
};

const formatFileName = '[name].[hash:8].[ext]';

const postCSS = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      config: resolvePath('config/postcss.config.js'),
    },
  },
};

module.exports = { paths, regex, formatFileName, resolvePath, postCSS };
