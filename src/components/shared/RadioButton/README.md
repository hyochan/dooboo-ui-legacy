# Radio Button

<!--
[![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-search-input.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-search-input)
[![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native-search-input.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-search-input)
-->

> Simple radio button for react-native.  
> Refer : <https://material-ui.com/components/radio-buttons>

## Installation

<!--
```sh
yarn add @dooboo-ui/native
```

or

```sh
yarn add @dooboo-ui/native-search-input
```
-->

## Usage

<!--
![](https://i.imgur.com/t84mZ1e.gif)

- debounced input
- reset button
- customizable icon
-->

## Props

```ts
interface IRadioButtonProps {
  onPress: (value: string) => void;
  value: string;
  selectedValue: string;
  color?: string;
  disabled?: boolean;
  selected?: boolean;
  size?: number;
  label?: string;
  labelPlacement?: string;
}
```

|                |     necessary      | types                   | default                                |
| -------------- | :----------------: | ----------------------- | -------------------------------------- |
| onPress        | :white_check_mark: | (value: string) => void |                                        |
| value          | :white_check_mark: | string                  |                                        |
| selectedValue  | :white_check_mark: | string                  |                                        |
| color          |                    | string                  | 'rgba(0, 0, 0, 0.54)'                  |
| disabled       |                    | boolean                 |                                        |
| selected       |                    | boolean                 |                                        |
| size           |                    | number                  | 23                                     |
| label          |                    | string                  |                                        |
| labelPlacement |                    | string                  | 'end' (option)`|'top'|'start'|'bottom` |

## Getting started

<!--
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
-->
