module.exports = {
  root: true,
  extends: '@dooboo/eslint-config',
  rules: {
    'max-len': [
      'error',
      {
        code: 140,
        ignoreRegExpLiterals: true,
      },
    ],
  },
};
