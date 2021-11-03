module.exports = {
  presets: [
    [
      '@babel/preset-env',
      // {
      //   corejs: {
      //     version: '3',
      //     proposals: true,
      //   },
      //   useBuiltIns: 'usage',
      // },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
  ],
  sourceType: 'unambiguous',
  // env: {
  //   development: {
  //     plugins: ['react-refresh/babel'],
  //   },
  // },
};
