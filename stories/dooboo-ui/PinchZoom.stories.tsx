import { Article, ImageList } from '../../main/PinchZoom/PinchZoom.example';
import { ContainerDeco } from '../../storybook/decorators';
import { PinchZoom } from '../../main';
import React from 'react';
import { storiesOf } from '@storybook/react-native';

storiesOf('PinchZoom', module)
  .addDecorator(ContainerDeco)
  .add('Image list', () => <ImageList PinchZoom={PinchZoom} />)
  .add('Text block', () => <Article PinchZoom={PinchZoom} />);
