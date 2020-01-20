import React, { FC, ReactNode } from 'react';
import { Animated } from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  width: 12;
  height: 12;
  background-color: #0b21e8;
  border-radius: 6;
  transform: translate(-6px);
`;

interface Props {
  size?: number;
  opacityValue: Animated.Value;
  scaleValue: Animated.Value;
}

const Thumb: FC<Props> = ({ size = 12, scaleValue, opacityValue }) => {
  const rippleSize = size * 2;
  const renderRippleView = (): ReactNode => {
    return (
      <Animated.View
        style={{
          position: 'absolute',
          top: -6,
          left: -6,
          width: rippleSize,
          height: rippleSize,
          borderRadius: rippleSize / 2,
          transform: [{ scale: scaleValue }],
          opacity: opacityValue,
          backgroundColor: 'black',
        }}
      />
    );
  };

  return <Container>{renderRippleView()}</Container>;
};

export default Thumb;
