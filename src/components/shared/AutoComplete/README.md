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

- Look for src/components/screen/AutoCompleteSample.tsx and src/components/shared/AutoComplete
- in \$PROJECT/App.js, please disable storybook by `const STORYBOOK_START = false;` for now before work on this component.

# Todo

- fulfill the goals and requirements of each sub-components as written on [Issue #50](https://github.com/dooboolab/dooboo-ui-native/issues/50).
