import React, { ReactElement, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ContainerDeco } from '../decorators';
import PinchZoomSliderModal from '../../src/components/shared/PinchZoomSliderModal';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

storiesOf('PinchZoomSliderModal', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ))
  .add('single', () => (
    <>
      <Single />
    </>
  ))
;

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const images = [
  { uri: 'https://images.unsplash.com/photo-1519335337423-a3357c2cd12e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2168&q=80' },
  { uri: 'https://www.housingwire.com/wp-content/uploads/2019/09/Purple-technology-data-internet-3.jpg' },
  { uri: 'https://images.unsplash.com/photo-1543007354-0bc99b7d096b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
  { uri: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg' },
];

const image = [
  { uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460' },
];

function Default(): ReactElement {
  const [visible, setVisible] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(0);

  return (
    <Container>
      <TouchableOpacity
        onPress={(): void => setVisible(true)}
      >
        <Text
          style={{
            fontSize: 24,
            color: 'blue',
          }}
        >Open PinchZoomSliderModal!</Text>
      </TouchableOpacity>
      <PinchZoomSliderModal
        renderCloseElement={
          (): ReactElement =>
            <Text
              style={{
                fontSize: 24,
                color: 'blue',
              }}
            >Close</Text>
        }
        images={images}
        visible={visible}
        onClose={(): void => setVisible(false)}
        onPageChanged={(page: number): void => setPageNum(page)}
        renderIndicator={(): ReactElement => <View style={[
          {
            position: 'absolute',
            bottom: 80,
          },
        ]}>
          <Text>{pageNum + 1} / {images.length}</Text>
        </View>}
      />
    </Container>
  );
}

function Single(): ReactElement {
  const [visible, setVisible] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(0);

  return (
    <Container>
      <TouchableOpacity
        onPress={(): void => setVisible(true)}
      >
        <Text
          style={{
            fontSize: 24,
            color: 'blue',
          }}
        >Open PinchZoomSliderModal!</Text>
      </TouchableOpacity>
      <PinchZoomSliderModal
        renderCloseElement={
          (): ReactElement =>
            <Text
              style={{
                fontSize: 24,
                color: 'blue',
              }}
            >Close</Text>
        }
        images={image}
        visible={visible}
        onClose={(): void => setVisible(false)}
        onPageChanged={(page: number): void => setPageNum(page)}
        renderIndicator={(): ReactElement => <View style={[
          {
            position: 'absolute',
            bottom: 80,
          },
        ]}>
          <Text>{pageNum + 1} / {image.length}</Text>
        </View>}
      />
    </Container>
  );
}
