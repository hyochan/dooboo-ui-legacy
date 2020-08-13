module.exports = {
  "stories": [
    "../src/**/*.stories.@(js|mdx)"
  ],
  "addons": [
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        babelOptions: {},
        sourceLoaderOptions: null
      }
    }
  ]
}