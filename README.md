# dooboo-ui-legacy

### DEPRECATED

> This project ends with `dooboo-ui@0.0.80`. This project is continued in [dooboo-ui](https://github.com/dooboolab/dooboo-ui) from version `0.1.0`. There is [additional notice](https://github.com/dooboolab/dooboo-ui#notice) on why we made this decision. The main purpose to spped up the project.

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  <!-- Web -->
  <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
</p>

[![Npm Version](http://img.shields.io/npm/v/dooboo-ui.svg?style=flat-square)](https://npmjs.org/package/dooboo-ui)
[![Downloads](http://img.shields.io/npm/dm/dooboo-ui.svg?style=flat-square)](https://npmjs.org/package/dooboo-ui)
[![CircleCI](https://circleci.com/gh/dooboolab/dooboo-ui.svg?style=shield)](https://circleci.com/gh/dooboolab/dooboo-ui)
[![codecov](https://codecov.io/gh/dooboolab/dooboo-ui/branch/master/graph/badge.svg)](https://codecov.io/gh/dooboolab/dooboo-ui)
[![Sponsor](https://opencollective.com/dooboo-ui/tiers/badge.svg?style=shield)](https://opencollective.com/dooboo-ui/tiers/badge.svg)
![License](http://img.shields.io/npm/l/dooboo-ui.svg?style=flat-square)

We love [react-hooks](https://code.fb.com/open-source/react-hooks) and willing to share our [react-native](https://facebook.github.io/react-native) ui components built in [functional components](https://logrocket.com/blog/pure-functional-components) using hooks. Also the `dooboo-ui` is built on top of our favorite stacks like [emotion](https://emotion.sh/docs/@emotion/native), [typescript](https://typescript.org), [jest](https://jestjs.io), [react-testing-library](https://testing-library.com/docs/react-testing-library/intro), [expo](https://expo.io), [storybook](https://storybook.js.org), and so on.

## Documentation

- Hosted in [github pages](https://dooboolab.github.io/dooboo-ui)

## Contributing to `dooboo-ui`

![dooboo-ui](https://user-images.githubusercontent.com/27461460/73331047-ea876400-42a5-11ea-9c9c-1c997eb961be.png)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdooboolab%2Fdooboo-ui.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdooboolab%2Fdooboo-ui?ref=badge_shield)

- See also
  - dooboolab's [vision-and-mission](https://github.com/dooboolab/dooboolab.com/blob/master/vision-and-mission.md)
  - dooboolab's [code of conduct](https://github.com/dooboolab/dooboolab.com/blob/master/code-of-conduct.md)
- [Contributing](CONTRIBUTING.md)
  - Please run `yarn pre` so that the packages are prepared.
    - If you are having trouble, try to run `yarn install-packages`.
  - Try to make awesome UI components and test them in `storybook`. Ensure to test in platforms we provide which are `iOS`, `android` and `web`. Then it's all good to go for `pull request`. Give it a try :blossom:.
- While implementing UI components you should run `yarn watch` in order to build typescript files dynamically while implementing. This is currently the best solution to sync with your typescript code using `package.json`. If you find something more efficient, please give a pull request.

## Usage

We aim to support `react-native` ui components in all platforms and we are currently targeting `iOS`, `android` and `web`. If you read [issue on plan for unifying dooboo-ui](https://github.com/dooboolab/dooboo-ui/issues/194), you can see in more detail how we want to drive this project.

## Thememing

Follow the [README_THEME](./README_THEME.md)

## Compatibility

| package      | version |
| ------------ | ------- |
| react        | >=16.13 |
| react-native | >=0.62  |
| emotion      | \*      |

## List of independent components in `@dooboo-ui/*`

> Below elements are not included in `dooboo-ui` package since it depends on other packages that may overload its package.

- [CalendarCarousel](https://github.com/dooboolab/dooboo-ui/tree/master/packages/CalendarCarousel)
- [Charts](https://github.com/dooboolab/dooboo-ui/tree/master/packages/Charts)
- [GiftedChat](https://github.com/dooboolab/dooboo-ui/tree/master/packages/GiftedChat)
- [Snackbar](https://github.com/dooboolab/dooboo-ui/tree/master/packages/Snackbar)
- [theme](https://github.com/dooboolab/dooboo-ui/tree/master/packages/theme)
- [TinderCard](https://github.com/dooboolab/dooboo-ui/tree/master/packages/TinderCard)

## Troubleshoot

#### Workaround when you face error in expo web

You need to set webpack for using "dooboo-ui" in expo-web.

1.  Install @expo/webpack-config in your expo's project.
    `yarn add @expo/webpack-config`
    or `npm install @expo/webpack-config`

2.  Create webpack.config.js in root path and Add below code.
    See [issue](https://forums.expo.io/t/error-when-running-expo-start-web/33096/3) below for more details.

        ```javascript
        const createExpoWebpackConfigAsync = require('@expo/webpack-config');

        module.exports = async function(env, argv) {
          const config = await createExpoWebpackConfigAsync(
            {
              ...env,
              babel: {
                dangerouslyAddModulePathsToTranspile: [
                  'dooboo-ui',
                ],
              },
            },
            argv
          );
          return config;
        };
        ```

## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with
a link to your website. \[[Become a sponsor](https://opencollective.com/dooboo-ui#sponsor)\]

### Backers

Please be our [Backers](https://opencollective.com/dooboo-ui#backers).
<a href="https://opencollective.com/dooboo-ui#backers" target="_blank"><img src="https://opencollective.com/dooboo-ui/backers.svg?width=890"></a>

### Contributing

Please make sure to read the [Contributing Guide](CONTRIBUTING.md) before making a pull request.
Thank you to all the people who helped to maintain and upgrade this project!

[![a relative link](https://opencollective.com/dooboo-ui/contributors.svg?width=890&button=true)](https://github.com/dooboolab/dooboo-ui/graphs/contributors)

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdooboolab%2Fdooboo-ui.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdooboolab%2Fdooboo-ui?ref=badge_large)
