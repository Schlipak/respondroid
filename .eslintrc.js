module.exports = {
  env: {
    es6: true,
    'react-native/react-native': true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-raw-text': [
      2,
      { skip: ['Title', 'Headline', 'Subheading', 'Button', 'HelperText'] },
    ],
    'no-return-assign': [0],
    'class-methods-use-this': [0],
  },
};
