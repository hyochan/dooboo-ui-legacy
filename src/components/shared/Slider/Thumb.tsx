import { Animated, StyleProp, ViewStyle } from 'react-native';
import React, { FC } from 'react';

import styled from 'styled-components/native';

const StyledThumb = styled.View`
  width: 12;
  height: 12;
  background-color: #0b21e8;
  border-radius: 6;
  transform: translate(-6px);
`;

interface Props {
  testID?: string;
  size?: number;
  opacityValue: Animated.Value;
  scaleValue: Animated.Value;
  style?: StyleProp<ViewStyle>;
}

const Thumb: FC<Props> = ({
  testID,
  size = 12,
  scaleValue,
  opacityValue,
  style,
}) => {
  const rippleSize = size * 2;

  return (
    <StyledThumb testID={testID} style={style}>
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
    </StyledThumb>
  );
};

export default Thumb;
