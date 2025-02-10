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
          '@services': './src/services',
          '@test': './src/test',
          '@theme': './src/theme',
          '@stores': './src/stores',
          '@domains': './src/domains',
          '@api': './src/api',
          '@types': './src/types',
          '@utils': './src/utils',
          '@infra': './src/infra',
        },
      },
    ],
  ],
};
