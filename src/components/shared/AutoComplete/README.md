# AutoComplete

> Versatile AutoComplete for react-native.

## Usage

# Props

| name                | necessary | types                            | default            |
| ------------------- | --------- | -------------------------------- | ------------------ |
| renderInputTestID   |           | string                           | `RenderInput_test` |
| caretBtnTestID      | ✓         | string                           | `CaretBtn_test`    |
| caretBtnTestID      | ✓         | string                           | `CaretBtn_test`    |
| data                | ✓         | Datum[]                          | `dummyData`        |
| style               |           | `StyleProp<ViewStyle>`           | `undefined`        |
| placeholderText     | ✓         | string                           | `search...`        |
| debounceDelay       |           | number                           | `400`              |
| onDebounceOrOnReset |           | Dispatch<SetStateAction<string>> | `undefined`        |
| underlayColor       |           | string                           | `black`            |

# Getting started

- Look for [src/components/screen/AutoCompleteSample.tsx](https://github.com/marsinearth/dooboo-ui-native/blob/feat%2FautoComplete/src/components/screen/AutoCompleteSample.tsx) and [src/components/shared/AutoComplete](https://github.com/marsinearth/dooboo-ui-native/tree/feat%2FautoComplete/src/components/shared/AutoComplete)
- in [\$PROJECT/App.js](https://github.com/marsinearth/dooboo-ui-native/blob/feat%2FautoComplete/App.js#L9), please disable storybook by `const STORYBOOK_START = false;` for now before work on this component.
  _supposed be already done by now but if not, please change it._

## Structures

| name                                                  | content                            | features                                                                         |
| ----------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------- |
| index.tsx                                             | AutoComplete root Component        | props from outside of the components, overall logic                              |
| dummyData.ts                                          | AutoComplete dummy data            | dummy data with types of Datum[], contains country info starting with letter 'A' |
| renderInput.tsx                                       | TextInput Component                | textInput for search, clear, match, placeholder animation                        |
| renderOptions.tsx                                     | OptionList and Option Components   | FlatList for searchItems                                                         |
| styles.ts                                             | Styled-Components and RN Styles    | styles                                                                           |
| types.ts                                              | TypeScript Types & Interfaces      | types for props, state, func params, etc.                                        |
| ../../../storybook/stories/AutoComplete.stories.tsx   | Storybook for AutoComplete         | visual testing / documentation of the component                                  |

# Todo

- fulfill the goals and requirements of each sub-components as written on [Issue #50](https://github.com/dooboolab/dooboo-ui-native/issues/50).

# Storybook

- in [\$PROJECT/App.js](https://github.com/marsinearth/dooboo-ui-native/blob/feat%2FautoComplete/App.js#L9), please enable storybook by `const STORYBOOK_START = true;` to see the AtutoComplete story.
- You can change props value through kobs addon.
