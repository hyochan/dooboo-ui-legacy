import { Dimensions, Image } from 'react-native';
import { ContainerDeco } from '../../storybook/decorators';
import PinchZoom from '../../main/PinchZoom';
import React from 'react';
import { storiesOf } from '@storybook/react-native';

const images = [
  // IC_LOGO,
  { uri: 'https://images.unsplash.com/photo-1519335337423-a3357c2cd12e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2168&q=80' },
  { uri: 'https://www.housingwire.com/wp-content/uploads/2019/09/Purple-technology-data-internet-3.jpg' },
  { uri: 'https://images.unsplash.com/photo-1543007354-0bc99b7d096b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' },
  { uri: 'https://p.bigstockphoto.com/eIdTXLbqQilMs9xbjvcs_bigstock-Aerial-View-Of-Sandy-Beach-Wit-256330393.jpg' },
  { uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460' },
];

function Default(): React.ReactElement {
  const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
  const minScreenSize = Math.min(screenWidth, screenHeight);
  return <PinchZoom style={{ width: minScreenSize, height: minScreenSize }}>
    <Image source={images[0]} style={{ width: minScreenSize, height: minScreenSize }} resizeMode={'contain'} />
  </PinchZoom>;
}

storiesOf('PinchZoom', module)
  .addDecorator(ContainerDeco)
  .add('default', Default);
