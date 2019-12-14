import {
  Animated,
  Easing,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { FC, ReactNode, useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View<{ percent: number }>`
  position: absolute;
  width: 12;
  height: 12;
  background-color: #0b21e8;
  border-radius: 6;
  top: -4.5;
  transform: translate(-6px);
  left: ${({ percent }): string => `${percent}%`};
`;

interface Props {
  size?: number;
  percent: number;
}

const Thumb: FC<Props> = ({ size = 12, percent }) => {
  const [scaleValue, setScaleValue] = useState(new Animated.Value(0.01));
  const [opacityValue, setOpacityValue] = useState(new Animated.Value(0.12));
  const onPressedIn = (): void => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === 'android',
    }).start();
  };

  const onPressedOut = (): void => {
    Animated.timing(opacityValue, {
      toValue: 0,
    }).start(() => {
      setOpacityValue(new Animated.Value(0.12));
      setScaleValue(new Animated.Value(0.01));
    });
  };

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

  return (
    <TouchableWithoutFeedback onPressIn={onPressedIn} onPressOut={onPressedOut}>
      <Container percent={percent}>
        {renderRippleView()}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Thumb;
