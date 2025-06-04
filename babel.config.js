module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@utils': './src/utils',
          '@assets': './src/assets',
          '@navigations': './src/navigations',
          '@types': './src/types',
          '@hooks': './src/hooks',
          '@contexts': './src/contexts',
          '@services': './src/services',
        },
      },
    ],
  ],
}
