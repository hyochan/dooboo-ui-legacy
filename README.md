# dooboo-ui

> React Native UI components built by `dooboolab`

[![CircleCI](https://circleci.com/gh/dooboolab/dooboo-ui/core.svg?style=shield)](https://circleci.com/gh/dooboolab/dooboo-ui)
[![codecov](https://codecov.io/gh/dooboolab/dooboo-ui/branch/master/graph/badge.svg)](https://codecov.io/gh/dooboolab/dooboo-ui)
![License](http://img.shields.io/npm/l/@dooboo-ui/core.svg?style=flat-square)

## Package

* Core

  [![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/core.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/core)
  [![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/core.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/core)

  - Accordion
  - Button
  - ButtonGroup
  - EditText
  - LoadingIndicator
  - RadioButton
  - Rating
  - SearchInput
  - Slider
  - SwitchToggle

* Plugins

  - [@dooboo-ui/gifted-chat]()
    * WIP
  - [@dooboo-ui/tinder-card]()
    * WIP
  - [@dooboo-ui/pinch-zoom-slider-modal]()
    * WIP
  - [@dooboo-ui/snack-bar]()
    * WIP
  - [@dooboo-ui/calendar-carousel]()
    * WIP

* Theme

  [![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/theme.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/theme)
  [![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/theme.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/theme)

#### Plugins

We love [react-hooks](https://code.fb.com/open-source/react-hooks) and willing to share our [react-native](https://facebook.github.io/react-native) widgets built in [Functional Component](https://logrocket.com/blog/pure-functional-components) using hooks.


## Contributing to `@dooboo-ui`

![dooboo-ui](https://user-images.githubusercontent.com/27461460/73331047-ea876400-42a5-11ea-9c9c-1c997eb961be.png)

- See also
  - dooboolab's [vision-and-mission](https://github.com/dooboolab/dooboolab.com/blob/master/vision-and-mission.md)
  - dooboolab's [code of conduct](https://github.com/dooboolab/dooboolab.com/blob/master/code-of-conduct.md)
- [Contributing](CONTRIBUTING.md)
  - Try to make good `shared` component and test it in `storybook` or in `sample` screen. Then it's all good to go for `pull request`. Give it a try :blossom:.
- While implementing [Shared] component you should run `yarn watch` in order to build typescript file dynamically while developing. This is currently the best solution to sync with your typescript code using `package.json`. If you find something more efficient, please give a pull request.

## Usage

Our libraries are distinguised into three concepts.
First, `@dooboo-ui/core` contains all the light weight ui components listed [above](#Package).
Secondly, the list of plugins are individual packages that is not a light weight.
Finally, we have `@dooboo-ui/theme` package that controls theming more easily.


## Compatability
| package           | version |
|-------------------|---------|
| react             | >=16.9  |
| react-native      | >=0.58  |
| styled-components | >=4.4.0 |

