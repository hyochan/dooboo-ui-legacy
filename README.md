# dooboo-ui

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

We currently love [react-hooks](https://code.fb.com/open-source/react-hooks) and willing to share our [react-native](https://facebook.github.io/react-native) widgets built in [Functional Component](https://logrocket.com/blog/pure-functional-components) using hooks.

## Contributing to `dooboo-ui`

![dooboo-ui](https://user-images.githubusercontent.com/27461460/73331047-ea876400-42a5-11ea-9c9c-1c997eb961be.png)

- See also
  - dooboolab's [vision-and-mission](https://github.com/dooboolab/dooboolab.com/blob/master/vision-and-mission.md)
  - dooboolab's [code of conduct](https://github.com/dooboolab/dooboolab.com/blob/master/code-of-conduct.md)
- [Contributing](CONTRIBUTING.md)
  - Please run `yarn pre` so that the packages are prepared.
    - If you are having trouble try to run `yarn install-packages`.
  - Try to make good `shared` component and test it in `storybook` or in `sample` screen. Then it's all good to go for `pull request`. Give it a try :blossom:.
- While implementing [Shared] component you should run `yarn watch` in order to build typescript file dynamically while developing. This is currently the best solution to sync with your typescript code using `package.json`. If you find something more efficient, please give a pull request.

## Usage

You can use all components in `dooboo-ui` by importing it. However, we also support individual imports using seperate installation.

If you want to use only `SwitchToggle`, you can install it by running `yarn add dooboo-ui-switch-toggle` or `npm install`.

## Compatability
| package           | version |
|-------------------|---------|
| react             | >=16.9  |
| react-native      | >=0.59  |
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

## List of independent components in `@dooboo-ui/*`

> Below elements are not included in `dooboo-ui` package since it depends on other packages that may overload its package.

- [CalendarCarousel](https://github.com/dooboolab/dooboo-ui/tree/master/packages/CalendarCarousel)
- [GiftedChat](https://github.com/dooboolab/dooboo-ui/tree/master/packages/GiftedChat)
- [Snackbar](https://github.com/dooboolab/dooboo-ui/tree/master/packages/Snackbar)
- [theme](https://github.com/dooboolab/dooboo-ui/tree/master/packages/theme)
- [TinderCard](https://github.com/dooboolab/dooboo-ui/tree/master/packages/TinderCard)
