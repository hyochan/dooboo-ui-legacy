import { Animated, StyleProp, ViewStyle } from 'react-native';
import React, { FC } from 'react';

import styled from 'styled-components/native';

interface ThumbPositionerType {
  percent: number;
}

const ThumbPositioner = styled.View<ThumbPositionerType>`
  position: absolute;
  left: ${({ percent }): string => `${percent}%`};
`;

const StyledThumb = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  background-color: #0b21e8;
  border-radius: 6px;
  transform: translate(-6px);
`;

interface Props {
  testID?: string;
  percent: number;
  size?: number;
  scaleValue?: Animated.Value;
  opacityValue?: Animated.Value;
  customThumb?: React.ReactElement;
  style?: StyleProp<ViewStyle>;
}

const Thumb: FC<Props> = ({
  testID,
  percent,
  size = 12,
  scaleValue = new Animated.Value(0.01),
  opacityValue = new Animated.Value(0.12),
  customThumb,
  style,
}) => {
  const rippleSize = (size - 2) * 2 + 48 / size;

  return (
    <ThumbPositioner testID="thumb-positioner-test-id" percent={percent}>
      {customThumb || (
        <StyledThumb testID={testID} style={style}>
          <Animated.View
            style={{
              width: rippleSize,
              height: rippleSize,
              borderRadius: 100,
              transform: [{ scale: scaleValue }],
              opacity: opacityValue,
              backgroundColor: '#0b21e8',
            }}
          />
        </StyledThumb>
      )}
    </ThumbPositioner>
  );
};

export default Thumb;
