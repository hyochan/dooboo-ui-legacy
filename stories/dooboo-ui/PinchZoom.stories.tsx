import { Dimensions, FlatList, Image, ImageSourcePropType } from 'react-native';
import { ContainerDeco } from '../../storybook/decorators';
import PinchZoom from '../../main/PinchZoom';
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding: 10px;
`;

const ItemContainer = styled.View`
  padding: 10px 0;
  width: ${(): number => Dimensions.get('screen').width - 20}px;
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
  height: 200;
  align-items: center;
`;

const images = [
  // IC_LOGO,
  { uri: 'https://images.unsplash.com/photo-1519335337423-a3357c2cd12e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2168&q=80' },
  { uri: 'https://www.housingwire.com/wp-content/uploads/2019/09/Purple-technology-data-internet-3.jpg' },
  { uri: 'https://images.unsplash.com/photo-1543007354-0bc99b7d096b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
  { uri: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg' },
  { uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460' },
];

function ImageItem({ source, title, content }
:{ source: ImageSourcePropType, title: string, content: string }): React.ReactElement {
  const [width, setWidth] = React.useState<string | number>('100%');
  return <ItemContainer>
    <TitleText>{title}</TitleText>
    <ContentText>{content}</ContentText>
    <ImageContainer>
      <PinchZoom style={{ width, height: 200 }}>
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
    </ImageContainer>
  </ItemContainer>;
}

function Default(): React.ReactElement {
  return <Container>
    <FlatList
      data={images}
      style={{ flex: 1 }}
      keyExtractor={ (item):string => item.uri}
      renderItem={({ item, index }): React.ReactElement =>
        <ImageItem source={item} title={'그림' + (index + 1)} content="이것은 그림에 대한 설명 입니다." />
      } />
  </Container>;
}

storiesOf('PinchZoom', module)
  .addDecorator(ContainerDeco)
  .add('default', Default);
