const autoprefixer = require('autoprefixer');
const flexBugsFixes = require('postcss-flexbugs-fixes');
const presetEnv = require('postcss-preset-env');
const postcssNormalize = require('postcss-normalize');

module.exports = {
  plugins: [
    autoprefixer({ grid: true }),
    flexBugsFixes(),
    presetEnv({
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
    }),
    postcssNormalize(),
  ],
};
