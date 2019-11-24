# Search Input

[![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-search-input.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-search-input)
[![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native-search-input.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-search-input)

> Simple search input for react-native.

## Installation

```sh
yarn add @dooboo-ui/native
```

or

```sh
yarn add @dooboo-ui/native-search-input
```

## Usage

![](https://i.imgur.com/t84mZ1e.gif)

- debounced input
- reset button
- customizable icon

# Props

```ts
export interface SearchInputProps {
  value: string;
  onDebounceOrOnReset?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  debounceDelay?: number;
  customIcon?: React.ReactNode;
  placeholderText?: string;
}
```

|                   | necessary | types                  | default                  | info            |
| ----------------- | :-------: | ---------------------- | ------------------------ | --------------- |
| value             |     ✓     | string                 | undefined                |                 |
| onDebounceOrReset |     ✓     | (string) => void       | undefined                |                 |
| style             |           | `StyleProp<ViewStyle>` | undefined                | container style |
| debounceDelay     |           | number                 | 400                      |                 |
| customIcon        |           | React.ReactNode        | magnifier icon component |                 |
| placeholderText   |           | string                 | 검색어를 입력해주세요.   |                 |

# Getting started

- Import

  ```tsx
  import { SearchInput } from '@dooboo-ui/native';
  // or
  import SearchInput from '@dooboo-ui/native-search-input';
  ```

- Usage
  ```tsx
  const SearchInputWithState = () => {
    const [value, setValue] = useState('');
    return (
      <>
        <SearchInput
          value={value}
          onDebounceOrOnReset={setValue}
          debounceDelay={number('delay', 400)}
          placeholderText={text('placeholder', '')}
        />
        <Value>{`value (after debounced delay) : ${value}`}</Value>
      </>
    );
  };
  ```
