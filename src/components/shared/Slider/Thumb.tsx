import {
  Animated,
  Easing,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { FC, ReactNode, useState } from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  width: 12;
  height: 12;
  background-color: #0B21E8;
  border-radius: 6;
  transform: translate(-6px);
`;

interface Props {
  size?: number;
}

const Thumb: FC<Props> = ({
  size = 12,
}) => {
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
    <TouchableWithoutFeedback
      onPressIn={onPressedIn}
      onPressOut={onPressedOut}
    >
      <Container>
        {renderRippleView()}
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default Thumb;
