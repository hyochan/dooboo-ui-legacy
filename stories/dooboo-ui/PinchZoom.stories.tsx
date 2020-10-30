import { Dimensions, Image, View } from 'react-native';

import { ContainerDeco } from '../../storybook/decorators';
import { ImageSlider } from '../../packages/PinchZoom/PinchZoom.example';
import React from 'react';
import { storiesOf } from '@storybook/react-native';

storiesOf('PinchZoom', module)
  .addDecorator(ContainerDeco)
  .add('Image slider', () => <ImageSlider />);
