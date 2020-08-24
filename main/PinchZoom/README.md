# Pinch Zoom

> Simple pinch zoom component for react-native.  

## Preview

![Aug-24-2020 16-14-55](https://user-images.githubusercontent.com/17980230/91014922-3c6a4f80-e625-11ea-86a4-75e88d284b46.gif)

## Installation
It may included to next version of dooboo-ui.
Next line is not working currently.

```sh
yarn add dooboo-ui
```

## Props

| Property             |      Required      | Type                           | Default               |
| -------------------- | :----------------: | ------------------------------ | --------------------- |
| style                |                    | `ViewStyle`                    |                       |
| children             | :white_check_mark: | `ReactNode`                    |                       |
| blockNativeResponder |                    | `boolean`                      | `true`                |

- blockNativeResponder

The PinchZoom consumes native gesture event. So, during it working, the parent component using gesture event (ScrollView, FlatList, etc ... ) may not work. 
If you set this value to false, then the parent component will work but it may prevent zoom action.

## Getting started

### Import

```tsx
import { PinchZoom } from 'dooboo-ui';
```

### Usage
Just wrap the children with PinchZoom!

```tsx
function PinchZoomImage(): React.ReactElement {
  const [width, setWidth] = React.useState<string | number>('100%');

  return <PinchZoom style={{ width, height: 200 }}>
    <Image
      style={{ width, height: 200, backgroundColor: '#fff' }}
      onLoad={({ nativeEvent: { source } }): void => {
        if (source.width && source.height) {
          setWidth(200 * source.width / source.height);
        }
      }}
      source={source}
      resizeMode={'contain'}
    />
  </PinchZoom>
}
```
