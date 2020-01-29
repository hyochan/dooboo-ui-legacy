# Snackbar

[![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-snackbar.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-snackbar)
[![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native-snackbar.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-snackbar)

> Simple snackbar for react-native.

![Jan-28-2020 15-59-38](https://user-images.githubusercontent.com/17980230/73242107-548d0400-41e7-11ea-946b-630ba7053584.gif)

## Installation

At this point, this component has not yet been published, and after it has been published, it may be installed with the command below.

```sh
yarn add @dooboo-ui/native
```

or

```sh
yarn add @dooboo-ui/native-snackbar
```

## Usage

# Types

```ts
export enum Timer {
  SHORT = 1500,
  LONG = 3000,
}

export interface SnackbarProps {
  testID?: string;
  ref: React.MutableRefObject<SnackbarRef>;
}

export interface SnackbarRef {
  show(content: Content): void;
}

export interface Content {
  text: string;
  actionText?: string;
  timer?: Timer;
  actionStyle?: TextStyle;
  containerStyle?: ViewStyle;
  messageStyle?: TextStyle;
  onPressAction?: () => void;
}
```

- SnackbarProps

|         | necessary | types                   | default   | info         |
| ------- | :-------: | ----------------------- | --------- | ------------ |
| ref     |     v     | MutableRefObject        | undefined |              |
| testID  |           | string                  | undefined |              |

- Content

An object of this type is needed to show an Snackbar. 

|                | necessary | types            | default            | info               |
| -------------- | :-------: | ---------------- | ------------------ | ------------------ |
| text           |     v     | string           | undefined          |                    |
| timer          |           | number           | 1500 (Timer.SHORT) | Closing time       |
| messageStyle   |           | TextStyle        | undefined          | Message text style |
| containerStyle |           | ViewStyle        | undefined          |                    |
| actionText     |           | string           | undefined          |                    |
| actionStyle    |           | TextStyle        | undefined          | Action text style  |
| onPressAction  |           | function         | undefined          |                    |

# Getting started

- Import

  ```tsx
  import { Snackbar } from '@dooboo-ui/native';
  // or
  import Snackbar from '@dooboo-ui/native-snackbar';
  ```

- Usage
  ```tsx

  function Container(): React.ReactElement {
    const snackbar = useRef<SnackbarRef>();
    const onPress = (): void => {
      snackbar.current && snackbar.current.show({
        text: 'Simple Snackbar is opened',
        timer: Timer.LONG,
        containerStyle: {
          backgroundColor: '#ccccff',
        },
        messageStyle: {
          color: '#ffffff',
          fontSize: 17,
        },
      actionText: 'ACTION',
      actionStyle: {
        color: '#0066ff',
        fontSize: 17,
      },
      onPressAction: () => Alert.alert('Action!!'),
      });
    };

    return (
      <Container>
        <Button onPress={onPress}>
          <Text style={{ textAlign: 'center' }}>OPEN SNACKBAR</Text>
        </Button>
        <Snackbar ref={snackbar}/>
      </Container>
    );
  }

  ```
To show a `SnackBar` component, just provide `ref` props to the component and call the `show` function  (with a `Content` type parameter) of it.
This component will appear at the bottom of the parent view, **not at the bottom of the screen**.
