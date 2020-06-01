# Snackbar

> Simple snackbar for react-native.

## Installation

At this point, this component has not yet been published, and after it has been published, it may be installed with the command below.

```sh
yarn add @dooboo-ui
```

or

```sh
yarn add @dooboo-ui/snackbar
```
## Usage
### Types

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

### Getting started

- Import

  ```tsx
  import Snackbar from '@dooboo-ui/snackbar';
  ```

- Using Component
  ```tsx

  function Container(): React.ReactElement {
    const snackbar = useRef<SnackbarRef>(null);
    const onPress = (): void => {
      snackbar.current && snackbar.current.show({
        text: 'Simple Snackbar is opened',
      });
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity onPress={onPress} style={{ borderWidth: 1, padding: 10 }}>
            <Text>Show Snackbar</Text>
          </TouchableOpacity>
          <Snackbar ref={snackbar}/>
        </View>
      </SafeAreaView>
    );
  }

  ```

To show a `Snackbar` component, just provide `ref` props to the component and call the `show` function  (with a `Content` type parameter) of it.
This component will appear at the bottom of the parent view, **not at the bottom of the screen**.

![Feb-25-2020 00-12-07](https://user-images.githubusercontent.com/17980230/75164088-961bbb00-5763-11ea-8e89-096b15a3e787.gif)

- Using Provider

You can also set SnackbarProvider to use Snackbar component. 
``` tsx
  function Container(): React.ReactElement {
    const snackbar = useSnackbarContext();
    const onPress = (): void => {
      snackbar.show({
        text: 'Simple Snackbar is opened',
      });
    };
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={onPress} style={{ borderWidth: 1, padding: 10 }}>
          <Text>Show Snackbar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function Provider(): React.ReactElement {
    return (
      <SnackbarProvider>
        <Container/>
      </SnackbarProvider>
    );
  }

```
For versions after iPhone x, Snackbar will overlap with the gesture bar. Previously, Snackbar was put in SafeAreaView, but this could be a problem and changed to use View. We recommend that using 'defaultContent' like below.

```typescript
  function Provider(): React.ReactElement {
    return (
      <SnackbarProvider
        defaultContent={{ containerStyle: { bottom: safeAreaBottom + 10 }}}
      >
        <Container/>
      </SnackbarProvider>
    );
  }
```

- Using some Action

To add some action to the Snackbar, just add options about the action to the show function.

``` tsx
    snackbar.show({
      text: 'Simple Snackbar is opened',
      actionText: 'Some action',
      onPressAction: () => Alert.alert('Some action occurs!!'),
    });
```

![Feb-25-2020 00-16-47](https://user-images.githubusercontent.com/17980230/75164429-265a0000-5764-11ea-9c6f-12bf362dc32b.gif)

- More Complex Examples

You can find more complex usages on this [storybook codes](storybook/stories/Snackbr.stories.tsx). 
