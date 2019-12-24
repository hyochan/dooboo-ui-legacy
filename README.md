# dooboo-ui-native

> React Native UI components built by `dooboolab`

[![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native)
[![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native)
[![CircleCI](https://circleci.com/gh/dooboolab/dooboo-ui-native.svg?style=shield)](https://circleci.com/gh/dooboolab/dooboo-ui-native)
[![codecov](https://codecov.io/gh/dooboolab/dooboo-ui-native/branch/master/graph/badge.svg)](https://codecov.io/gh/dooboolab/dooboo-ui-native)
![License](http://img.shields.io/npm/l/@dooboo-ui/native.svg?style=flat-square)

We currently love [react-hooks](https://code.fb.com/open-source/react-hooks) and willing to share our [react-native](https://facebook.github.io/react-native) widgets built in [Functional Component](https://logrocket.com/blog/pure-functional-components) using hooks.

## Contributing to `@dooboo-ui/native`

- See also
  - dooboolab's [vision-and-mission](https://github.com/dooboolab/dooboolab.com/blob/master/vision-and-mission.md)
  - dooboolab's [code of conduct](https://github.com/dooboolab/dooboolab.com/blob/master/code-of-conduct.md)
- [Contributing](CONTRIBUTING.md)
  - Try to make good `shared` component and test it in `storybook` or in `sample` screen. Then it's all good to go for `pull request`. Give it a try :blossom:.
- While implementing [Shared] component you should run `yarn watch` in order to build typescript file dynamically while developing. This is currently the best solution to sync with your typescript code using `package.json`. If you find something more efficient, please give a pull request.

## Usage

You can use all components in `@dooboo-ui/native` by importing it. However, we also support individual imports using seperate installation.

If you want to use only `SwitchToggle`, you can install it by running `yarn add @dooboo-ui/native-switch-toggle` or `npm install`.

## Compatability
| package           | version |
|-------------------|---------|
| react             | >=16.9.0  |
| react-native      | >=0.59  |
| styled-components | >=4.4.0 |

## List of widgets

- [Accordion](https://github.com/dooboolab/dooboo-ui-native/tree/master/src/components/shared/Accordion)
  - `@dooboo-ui/native-accordion`
- [Button](https://github.com/dooboolab/dooboo-ui-native/tree/master/src/components/shared/Button)
  - `@dooboo-ui/native-button`
- [ButtonGroup](https://github.com/dooboolab/dooboo-ui-native/tree/master/src/components/shared/ButtonGroup)
  - `@dooboo-ui/native-button-group`
- [CalendarCarousel](https://github.com/dooboolab/dooboo-ui-native/tree/master/src/components/shared/CalendarCarousel)
  - WIP
- [EditText](https://github.com/dooboolab/dooboo-ui-native/tree/master/src/components/shared/EditText)
  - `@dooboo-ui/native-edit-text`
- [GiftedChat](https://github.com/dooboolab/dooboo-ui-native/tree/master/src/components/shared/GiftedChat)
  - `@dooboo-ui/native-gifted-chat`
- [LoadingIndicator](https://github.com/dooboolab/dooboo-ui-native/tree/master/src/components/shared/LoadingIndicator)
  - `@dooboo-ui/native-loading-indicator`
- [SearchInput](https://github.com/dooboolab/dooboo-ui-native/tree/master/src/components/shared/SearchInput)
  - `@dooboo-ui/native-search-input`
- [SwitchToggle](https://github.com/dooboolab/dooboo-ui-native/tree/master/src/components/shared/SwitchToggle)
  - `@dooboo-ui/native-switch-toggle`
