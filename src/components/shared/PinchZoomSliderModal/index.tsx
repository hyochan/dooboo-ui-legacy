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
    <Container
      style={containerStyle}
    >
      {
        images.length < 2
          ? renderImage(images[0], 1)
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
