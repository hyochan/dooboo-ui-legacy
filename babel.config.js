module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      '@babel/preset-react',
      'babel-preset-expo',
      '@babel/preset-typescript',
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-modules-commonjs',
    ],
  };
};
