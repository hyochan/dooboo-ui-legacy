// eslint-disable-next-line
const { defaults: tsJestConfig } = require('ts-jest/presets');

process.env.TZ = 'Asia/Seoul';

module.exports = {
  ...tsJestConfig,
  preset: '@testing-library/react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(.*-)?react-(.*-)?native(-.*)?)',
  ],
  modulePaths: [
    '<rootDir>',
  ],
  moduleDirectories: [
    'node_modules',
  ],
  testMatch: [
    '**/__tests__/**/*test.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)',
  ],
  moduleFileExtensions: [
    'js',
    'ts',
    'tsx',
  ],
  globals: {
    'ts-jest': {
      tsConfig: {
        jsx: 'react',
      },
      diagnostics: false,
    },
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '\\.(ts|tsx)$': 'ts-jest',
  },
  // 'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  cacheDirectory: '.jest/cache',
  // moduleNameMapper: {
  //   '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|
  //     webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/test/assetsTransformer.js'
  // },
};
