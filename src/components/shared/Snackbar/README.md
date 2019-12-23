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
export enum Timer {
  SHORT = 1500,
  LONG = 3000,
}

export interface SnackbarProps {
  text: string;
  testID?: string;
  show: boolean;
  setShow: (show: boolean) => void;
  timer?: Timer;
}
```

|         | necessary | types                   | default   | info         |
| ------- | :-------: | ----------------------- | --------- | ------------ |
| text    |     ✓     | string                  | undefined |              |
| testID  |           | string                  | undefined |              |
| timer   |           | number                  | 1500      | closing time |
| show    |     ✓     | boolean                 | undefined |              |
| setSHow |     ✓     | (show: boolean) => void | undefined |              |

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
    const [show, setShow] = useState<boolean>(false);
    const [timer, setTimer] = useState<Timer>(Timer.SHORT);

    return (
      <Container>
        <Button
          style={{
            marginVertical: 40,
          }}
          text="OPEN SNACKBAR (SHORT TIMER)"
          onClick={(): void => {
            setShow(true);
            setTimer(Timer.SHORT);
          }}
        />
        <Button
          text="OPEN SNACKBAR (LONG TIMER)"
          style={{
            marginVertical: 40,
          }}
          onClick={(): void => {
            setShow(true);
            setTimer(Timer.LONG);
          }}
        />
        <Snackbar
          text={text('Snackbar Text', 'Simple Snackbar is opened')}
          show={show}
          setShow={setShow}
          timer={timer}
        />
      </Container>
    );
  };
  ```
