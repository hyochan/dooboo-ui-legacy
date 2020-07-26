# dooboo-ui
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

> React Native UI components built by `dooboolab`

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
![License](http://img.shields.io/npm/l/dooboo-ui.svg?style=flat-square)

We love [react-hooks](https://code.fb.com/open-source/react-hooks) and willing to share our [react-native](https://facebook.github.io/react-native) ui components built in [functional components](https://logrocket.com/blog/pure-functional-components) using hooks. Also the `dooboo-ui` is built on top of our favorite stacks like [styled-components](https://styled-components.com), [typescript](https://typescript.org), [jest](https://jestjs.io), [react-testing-library](https://testing-library.com/docs/react-testing-library/intro), [expo](https://expo.io), [storybook](https://storybook.js.org), and so on.

## Documentation

- Hosted in [github pages](https://dooboolab.github.io/dooboo-ui)

## Contributing to `dooboo-ui`

![dooboo-ui](https://user-images.githubusercontent.com/27461460/73331047-ea876400-42a5-11ea-9c9c-1c997eb961be.png)

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

## Compatability

| package           | version |
|-------------------|---------|
| react             | >=16.9  |
| react-native      | >=0.58  |
| styled-components | >=4.4.0 |

## List of components in `dooboo-ui`

- [Accordion](https://github.com/dooboolab/dooboo-ui/tree/master/main/Accordion)
- [Button](https://github.com/dooboolab/dooboo-ui/tree/master/main/Button)
- [ButtonGroup](https://github.com/dooboolab/dooboo-ui/tree/master/main/ButtonGroup)
- [EditText](https://github.com/dooboolab/dooboo-ui/tree/master/main/EditText)
- [LoadingIndicator](https://github.com/dooboolab/dooboo-ui/tree/master/main/LoadingIndicator)
- [RadioButton](https://github.com/dooboolab/dooboo-ui/tree/master/main/RadioButton)
- [Rating](https://github.com/dooboolab/dooboo-ui/tree/master/main/Rating)
- [SearchInput](https://github.com/dooboolab/dooboo-ui/tree/master/main/SearchInput)
- [Slider](https://github.com/dooboolab/dooboo-ui/tree/master/main/Slider)
- [SwitchToggle](https://github.com/dooboolab/dooboo-ui/tree/master/main/SwitchToggle)

> You can use most light weight components in `dooboo-ui` by importing it which are listed above. However, we also support individual imports using seperate installation which are more UI heavy. Those packages start with `@dooboo-ui/*` like `@dooboo-ui/gifted-chat` and is listed below.

## List of independent components in `@dooboo-ui/*`

> Below elements are not included in `dooboo-ui` package since it depends on other packages that may overload its package.

- [CalendarCarousel](https://github.com/dooboolab/dooboo-ui/tree/master/packages/CalendarCarousel)
- [GiftedChat](https://github.com/dooboolab/dooboo-ui/tree/master/packages/GiftedChat)
- [Snackbar](https://github.com/dooboolab/dooboo-ui/tree/master/packages/Snackbar)
- [theme](https://github.com/dooboolab/dooboo-ui/tree/master/packages/theme)
- [TinderCard](https://github.com/dooboolab/dooboo-ui/tree/master/packages/TinderCard)

## Troubleshoot

#### Workaround when you face error in expo web

You need to set webpack for using "dooboo-ui" in expo-web.
1. Install @expo/webpack-config in your expo's project.
```yarn add @expo/webpack-config``` 
or ```npm install @expo/webpack-config```

2. Create webpack.config.js in root path and Add below code.
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


## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://p-iknow.netlify.app/"><img src="https://avatars0.githubusercontent.com/u/35516239?v=4" width="100px;" alt=""/><br /><sub><b>Youngchang Lee</b></sub></a><br /><a href="https://github.com/dooboolab/dooboo-ui/commits?author=P-iknow" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!