module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: '.',
        alias: {
          '@assets/icons': './src/assets/icons',
          '@assets/brand': './src/assets/brand',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@routes': './src/routes',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@domains': './src/domains',
          '@api': './src/api',
        },
      },
    ],
  ],
};
