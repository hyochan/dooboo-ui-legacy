# Pinch Zoom

> Simple pinch zoom component for react-native.  

## Preview

![Aug-25-2020 00-01-58](https://user-images.githubusercontent.com/17980230/91060740-46f90900-e666-11ea-809c-e54899f97d75.gif)

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
| onScaleChanged       |                    | `function`                     | undefined             |
| onTranslateChanged   |                    | `function`                     | undefined             |
| onRelease            |                    | `function`                     | undefined             |

- blockNativeResponder

The PinchZoom consumes native gesture event. So, during it working, the parent component using gesture event (ScrollView, FlatList, etc ... ) may not work. 
If you set this value to false, then the parent component will work but it may prevent zoom action.

- onScaleChanged, onTranslateChanged

This two props are called if the animated values of PinchZoom changed. So, it's usefull if you want to add other animations. It is not recommended to change state always if those callbacks are called because it may very frequently occur. 

- onRelease

This callback will called when gesture handler released.

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

#### Image Slider
You can implement Image Slider using the PinchZoom.

![Aug-31-2020 15-29-39](https://user-images.githubusercontent.com/17980230/91690195-7cd74980-eba0-11ea-8e3f-eac76777fdc3.gif)

If you want to see the implementation see [here](https://github.com/dooboolab/dooboo-ui/tree/master/main/PinchZoom/PinchZoom.example.tsx)

## Caution
Be careful with setting the PinchZoom style. It using onLayout of the View to get layout width and height. Some styling options make it not correct(Ex: setting both top and bottom options). Incorrect layout values make the incorrect zooming center. 