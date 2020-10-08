import { ContainerDeco } from '../../storybook/decorators';
import { Dimensions, Image } from 'react-native';
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import PinchZoom from '../../packages/PinchZoom';

const imageSource = 'https://user-images.githubusercontent.com/17980230/95435131-29210280-098d-11eb-92e6-8b6dd49032b3.jpeg'

storiesOf('PinchZoom', module)
  .addDecorator(ContainerDeco)
  .add('Image', () => <PinchZoom style={{ width: '100%' }}>
    <Image
      source={{ uri: imageSource }}
      style={{ width: '100%', height: Dimensions.get('screen').width * 4 / 3 }} />
  </PinchZoom>)
