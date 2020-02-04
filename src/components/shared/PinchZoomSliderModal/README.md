# PinchZoomSliderModal

[![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-pinch-zoom-slider-modal.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-pinch-zoom-slider-modal)
[![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native-pinch-zoom-slider-modal.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-pinch-zoom-slider-modal)


> [PinchZoomSliderModal] is a image swiper with pinch zoom functionality.

![pinchzoom](https://user-images.githubusercontent.com/27461460/73713538-22345700-4751-11ea-9a8c-aaca24d0b360.gif)


## Props

|                | necessary | types                | default |
| -------------- | --------- | -------------------- | ------- |
| containerStyle |           | ViewStyle            |         |
| visible        |           | boolean              | true    |
| renderCloseElement      |  | () => ReactElement   | null    |
| renderIndicator|           | () => ReactElement   | null    |
| onClose        |           | () => void           |         |
| onPageChanged  |           | (page: number) => void  |      |
| images         |           | ImageSourcePropType[]| []      |
| defaultImageSource |       | ImageURISource       | null    |

## Installation

```sh
yarn add @dooboo-ui/native
```

or

```sh
yarn add @dooboo-ui/native-button
```

## Getting started
> Note that this ui element does not exist in `@dooboo-ui/native` itself. Please install below package.

  ```sh
  yarn add @dooboo-ui/native-pinch-zoom-slider-modal
  ```

- Import
  ```ts
  import { Button } from '@dooboo-ui/native-pinch-zoom-slider-modal';
  ```

- Example

```tsx
  import {
    Dimensions,
    Image,
    ImageSourcePropType,
    ImageURISource,
    Modal,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { ReactElement, useCallback, useState } from 'react';

  import ImageZoom from 'react-native-image-pan-zoom';
  import styled from 'styled-components/native';

  const Container = styled.View`
    flex: 1;
    background-color: transparent;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `;

  interface Props {
    visible?: boolean;
    renderCloseElement: () => ReactElement;
    renderIndicator: () => ReactElement;
    onClose?: () => void;
    onPageChanged?: (page: number) => void;
    images?: ImageSourcePropType[];
    defaultImageSource: ImageURISource;
  }

  function PinchZoomModal(props: Props): ReactElement {
    const {
      visible = true,
      images = [],
      renderCloseElement = (): ReactElement => <View/>,
      onClose,
      defaultImageSource,
      onPageChanged,
      renderIndicator = (): ReactElement => null,
    } = props;
    const [dimensionWidth, setDimensionWidth] = useState<number>(Dimensions.get('window').width);
    const [dimensionHeight, setDimensionHeight] = useState<number>(Dimensions.get('window').height);

    const renderImage = useCallback(() => (image: ImageSourcePropType, i: number): ReactElement => {
      return <View
        key={i}
        style={{
          width: dimensionWidth,
          height: dimensionHeight,
        }}
      >
        <View style={{ position: 'absolute' }}>
          <ImageZoom
            cropWidth={dimensionWidth}
            cropHeight={dimensionHeight}
            imageHeight={dimensionHeight}
            imageWidth={dimensionWidth}
          >
            <Image
              defaultSource={defaultImageSource}
              style={{ width: dimensionWidth, height: dimensionHeight }}
              source={image}
              resizeMode={'contain'}
            />
          </ImageZoom>
        </View>

      </View>;
    }, [images, dimensionWidth])();

    return <Modal
      onOrientationChange={(): void => {
        setDimensionWidth(Dimensions.get('window').width);
        setDimensionHeight(Dimensions.get('window').height);
      }}
      supportedOrientations={['portrait', 'landscape']}
      visible={visible} transparent={true}
    >
      <Container>
        <ScrollView
          pagingEnabled
          horizontal
          scrollEventThrottle={16}
          onScroll={(e): void => {
            const contentOffset = e.nativeEvent.contentOffset;
            const viewSize = e.nativeEvent.layoutMeasurement;

            const newPage = Math.floor(contentOffset.x / viewSize.width);
            if (onPageChanged) {
              onPageChanged(newPage);
            }
          }}
        >
          {
            images.map((image, i) => renderImage(image, i))
          }
        </ScrollView>
        { renderIndicator() }
        <SafeAreaView
          style={{
            position: 'absolute',
            top: 48,
            right: 24,
          }}
        >
          <TouchableOpacity
            onPress={(): void => {
              if (onClose) onClose();
            }}
          >
            {renderCloseElement()}
          </TouchableOpacity>
        </SafeAreaView>
      </Container>
    </Modal>;
  }
  ```
