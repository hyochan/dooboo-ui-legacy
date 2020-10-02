import { Article, ImageList, ImageSlider } from '../../packages/PinchZoom/PinchZoom.example';

import { ContainerDeco } from '../../storybook/decorators';
import React from 'react';
import { storiesOf } from '@storybook/react-native';

storiesOf('PinchZoom', module)
  .addDecorator(ContainerDeco)
  .add('Image list', () => <ImageList />)
  .add('Text block', () => <Article />)
  .add('Image Slider', () => <ImageSlider />);
