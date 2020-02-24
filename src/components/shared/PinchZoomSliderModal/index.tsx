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
  ViewStyle,
} from 'react-native';
import React, { ReactElement, useCallback, useState } from 'react';

import ImageZoom from 'react-native-image-pan-zoom';
import ViewPager from '@react-native-community/viewpager';
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
  renderCloseElement?: () => ReactElement;
  renderIndicator?: () => ReactElement;
  onClose?: () => void;
  onPageChanged?: (page: number) => void;
  images?: ImageSourcePropType[];
  defaultImageSource?: ImageURISource;
  containerStyle?: ViewStyle;
  shouldPinch?: boolean;
}

function PinchZoomModal(props: Props): ReactElement {
  const {
    visible = true,
    images = [],
    renderCloseElement = (): ReactElement | null => null,
    onClose,
    defaultImageSource,
    onPageChanged,
    renderIndicator = (): ReactElement | null => null,
    containerStyle,
    shouldPinch = true,
  } = props;
  const [dimensionWidth, setDimensionWidth] = useState<number>(Dimensions.get('window').width);
  const [dimensionHeight, setDimensionHeight] = useState<number>(Dimensions.get('window').height);

  const renderPinchableImage = useCallback(() => (image: ImageSourcePropType, i: number): ReactElement => {
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

  const renderImage = useCallback(() => (image: ImageSourcePropType, i: number): ReactElement => {
    return <View
      key={i}
      style={{
        width: dimensionWidth,
        height: dimensionHeight,
      }}
    >
      <View style={{ position: 'absolute' }}>
        <Image
          defaultSource={defaultImageSource}
          style={{ width: dimensionWidth, height: dimensionHeight }}
          source={image}
          resizeMode={'contain'}
        />
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
    <Container
      style={[
        { flex: 1 },
        containerStyle,
      ]}
    >
      {
        images.length < 2
          ? renderPinchableImage(images[0], 1)
          : shouldPinch
            ? <ViewPager style={{ flex: 1, width: '100%', height: '100%' }}>
              { images.map((image, i) => renderPinchableImage(image, i)) }
            </ViewPager>
            : <ScrollView
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
      }
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

export default PinchZoomModal;
