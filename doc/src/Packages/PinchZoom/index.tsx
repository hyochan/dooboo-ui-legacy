import { Image, Text, View } from 'react-native';
import React, { Fragment, ReactElement } from 'react';

import PinchZoom from '@dooboo-ui/pinch-zoom';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 600px;
`;

export const Default = (): ReactElement => {
  return (
    <Container>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: 600,
        }}>
        <View
          style={{
            backgroundColor: '#ccc',
            width: '100%',
            height: 200,
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <PinchZoom style={{ width: 300, height: 200 }}>
            <Image
              style={{ width: 300, height: 200 }}
              source={{
                uri: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
              }}
              resizeMode={'contain'}
            />
          </PinchZoom>
        </View>
      </View>
    </Container>
  );
};
