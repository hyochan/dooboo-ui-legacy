# AutoComplete

> Versatile AutoComplete for react-native.

## Usage

# Props

| name                | necessary | types                            | default            |
| ------------------- | --------- | -------------------------------- | ------------------ |
| renderInputTestID   |           | string                           | `RenderInput_test` |
| caretBtnTestID      | ✓         | string                           | `CaretBtn_test`    |
| value               |           | string                           | `''`               |
| style               |           | `StyleProp<ViewStyle>`           | `undefined`        |
| placeholderText     | ✓         | string                           | `search...`        |
| debounceDelay       |           | number                           | `400`              |
| onDebounceOrOnReset |           | Dispatch<SetStateAction<string>> | `undefined`        |

# Getting started

- Look for [src/components/screen/AutoCompleteSample.tsx](https://github.com/marsinearth/dooboo-ui-native/blob/feat%2FautoComplete/src/components/screen/AutoCompleteSample.tsx) and [src/components/shared/AutoComplete](https://github.com/marsinearth/dooboo-ui-native/tree/feat%2FautoComplete/src/components/shared/AutoComplete)
- in [\$PROJECT/App.js](https://github.com/marsinearth/dooboo-ui-native/blob/feat%2FautoComplete/App.js#L9), please disable storybook by `const STORYBOOK_START = false;` for now before work on this component.
  _supposed be already done by now but if not, please change it._

# Todo

- fulfill the goals and requirements of each sub-components as written on [Issue #50](https://github.com/dooboolab/dooboo-ui-native/issues/50).

# Storybook

- in [\$PROJECT/App.js](https://github.com/marsinearth/dooboo-ui-native/blob/feat%2FautoComplete/App.js#L9), please enable storybook by `const STORYBOOK_START = true;` to see the AtutoComplete story.
- You can change props value through kobs addon.