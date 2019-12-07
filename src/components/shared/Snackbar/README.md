# Snackbar

[![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-snackbar.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-snackbar)
[![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native-snackbar.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-snackbar)

> Simple snackbar for react-native.

## Installation

```sh
yarn add @dooboo-ui/native
```

or

```sh
yarn add @dooboo-ui/native-snackbar
```

## Usage

# Props

```ts
export interface SnackbarProps {
  text: string;
  testID: string;
}
```

|        | necessary | types  | default   | info |
| ------ | :-------: | ------ | --------- | ---- |
| text   |     ✓     | string | undefined |      |
| testID |           | string | undefined |      |

# Getting started

- Import

  ```tsx
  import { Snackbar } from '@dooboo-ui/native';
  // or
  import Snackbar from '@dooboo-ui/native-snackbar';
  ```

- Usage
  ```tsx
  const SnackbarWithState = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button
          text="OPEN SIMPLE SNACKBAR"
          onClick={(): void => setIsOpen(true)}
        />
        {isOpen && (
          <Snackbar text={text('Snackbar Text', 'Simple Snackbar is opened')} />
        )}
      </>
    );
  };
  ```
