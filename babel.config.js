module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: {
          version: '3',
          proposals: true,
        },
        useBuiltIns: 'usage',
        targets: {
          browsers: [
            'edge >= 16',
            'safari >= 9',
            'firefox >= 57',
            'ie >= 11',
            'ios >= 9',
            'chrome >= 49',
          ],
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  sourceType: 'unambiguous',
};
