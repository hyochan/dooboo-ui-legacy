import { Animated, Dimensions, FlatList, Image, ImageProps, ImageSourcePropType } from 'react-native';
import PinchZoom, { PinchZoomRef } from './';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const ImageSliderContainer = styled.View`
  flex: 1;
  width: 300;
  height: 400;
  justify-content: center;
  max-width: ${():number => Dimensions.get('screen').width};
  overflow: hidden;
  background-color: #ededed;
`;

const ItemContainer = styled.View`
  padding: 10px 0;
  max-width: ${(): number => Dimensions.get('screen').width - 20}px;
  min-height: 200px;
`;

const TitleText = styled.Text`
  font-size: 16px;
`;

const ContentText = styled.Text`
  font-size: 14px;
`;

const ImageContainer = styled.View`
  background-color: #CCC;
  width: 100%;
  height: 200px;
  align-items: center;
`;

const images = [
  // IC_LOGO,
  { uri: 'https://images.unsplash.com/photo-1519335337423-a3357c2cd12e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2168&q=80' },
  { uri: 'https://www.housingwire.com/wp-content/uploads/2019/09/Purple-technology-data-internet-3.jpg' },
  { uri: 'https://images.unsplash.com/photo-1587628736664-fdc50efb57b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
  { uri: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg' },
  { uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460' },
];

interface ImageItemProps {
  source: ImageSourcePropType,
  title: string,
  content: string,
}

function ImageItem({ source, title, content }: ImageItemProps): React.ReactElement {
  const [width, setWidth] = React.useState<string | number>('100%');

  return <ItemContainer>
    <TitleText>{title}</TitleText>
    <ContentText>{content}</ContentText>
    <ImageContainer style={{ overflow: 'hidden'/** It may be important! */ }}>
      <PinchZoom style={{ width, height: 200 }}>
        <Image
          style={{ width, height: 200, backgroundColor: '#fff' }}
          onLoad={({ nativeEvent: { source } }): void => {
            if (source && source.width && source.height) {
              setWidth(200 * source.width / source.height);
            }
          }}
          source={source}
          resizeMode={'contain'}
        />
      </PinchZoom>
    </ImageContainer>
  </ItemContainer>;
}

export function ImageList(): React.ReactElement {
  return <Container>
    <FlatList
      data={images}
      style={{ flex: 1 }}
      keyExtractor={ (item):string => item.uri}
      renderItem={({ item, index }): React.ReactElement =>
        <ImageItem
          source={item}
          title={`Image ${(index + 1)}`}
          content="This line is for the description of the image" />
      } />
  </Container>;
}

function AutoHeightImage(props: ImageProps): React.ReactElement {
  const { style = {} } = props;
  const [heightPerWidth, setHightPerWidth] = React.useState(1);
  const [layoutWidth, setLayoutWidth] = React.useState(1);

  return <Image
    {...props}
    style={[style, { height: heightPerWidth * layoutWidth }]}
    onLoad={({ nativeEvent: { source } }): void => {
      if (source && source.width && source.height) {
        setHightPerWidth(source.height / source.width);
      }
    }}
    onLayout={({ nativeEvent }): void => {
      setLayoutWidth(nativeEvent.layout.width);
    }}/>;
}

const WIDTH = 300;

export function ImageSlider({ imageSources = images }:{ imageSources?: ImageSourcePropType[] }): React.ReactElement {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const animValues = React.useRef({
    scale: 1,
    x: 0,
    y: 0,
    nextTranslateX: 0,
    prevTranslateX: 0,
  }).current;
  const pinchZoom = React.useRef<PinchZoomRef>(null);
  const nextImageTranslateX = React.useRef(new Animated.Value(0)).current;
  const prevImageTranslateX = React.useRef(new Animated.Value(0)).current;
  const translateOtherImages = React.useCallback(() => {
    animValues.nextTranslateX = (animValues.scale - 1) * WIDTH / 2 + animValues.x;
    animValues.prevTranslateX = (1 - animValues.scale) * WIDTH / 2 + animValues.x;
    nextImageTranslateX.setValue(animValues.nextTranslateX);
    prevImageTranslateX.setValue(animValues.prevTranslateX);
  }, []);
  const onRelease = React.useCallback(() => {
    const moveNext = animValues.nextTranslateX < -WIDTH / 2 && currentIndex < imageSources.length - 1;
    const movePrev = animValues.prevTranslateX > WIDTH / 2 && currentIndex > 0;
    if (moveNext && pinchZoom.current) {
      Animated.timing(pinchZoom.current.animatedValue.translate.x, {
        toValue: -WIDTH,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(currentIndex + 1);
      });
    } else if (movePrev && pinchZoom.current) {
      Animated.timing(pinchZoom.current.animatedValue.translate.x, {
        toValue: WIDTH,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(currentIndex - 1);
      });
    }
  }, [currentIndex]);
  return <Container style={{ backgroundColor: '#000' }}>
    <ImageSliderContainer>
      { currentIndex > 0
        ? <Animated.View
          style={{
            width: WIDTH,
            position: 'absolute',
            left: -WIDTH,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            transform: [{ translateX: prevImageTranslateX }],
          }}
        >
          <AutoHeightImage
            source={imageSources[currentIndex - 1]}
            style={{ width: WIDTH, bottom: 0 }}
            resizeMode="contain"/>
        </Animated.View>
        : null
      }
      <PinchZoom
        key={`${currentIndex}`}
        ref={pinchZoom}
        onScaleChanged={(value):void => {
          animValues.scale = value;
          translateOtherImages();
        }}
        onTranslateChanged={(value):void => {
          animValues.x = value.x;
          translateOtherImages();
        }}
        onRelease={onRelease}
        style={{
          width: WIDTH,
          position: 'absolute',
          top: 0,
          bottom: 0,
          justifyContent: 'center',
        }}>
        <AutoHeightImage
          source={imageSources[currentIndex]}
          style={{ width: WIDTH, bottom: 0 }}
          resizeMode="contain"/>
      </PinchZoom>
      {
        currentIndex < imageSources.length - 1
          ? <Animated.View
            style={{
              width: WIDTH,
              position: 'absolute',
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              left: WIDTH,
              transform: [{ translateX: nextImageTranslateX }],
            }}>
            <AutoHeightImage
              source={imageSources[currentIndex + 1]}
              style={{ width: WIDTH, bottom: 0 }}
              resizeMode="contain"/>
          </Animated.View>
          : null
      }
    </ImageSliderContainer>
  </Container>;
}

export function Article(): React.ReactElement {
  return <PinchZoom style={{ width: '100%', backgroundColor: '#eee', padding: 10 }}>
    <TitleText>Article Title</TitleText>
    <ContentText style={{ minHeight: 100, textAlignVertical: 'center' }}>
      {
`This block is for the content of the article. \
PinchZoom works at only Image but also other views. So, let's zoom in with your fingers.
`
      }
    </ContentText>
  </PinchZoom>;
}
