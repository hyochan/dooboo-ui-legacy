import React, { ReactElement, useEffect, useState } from 'react';

import { Animated } from 'react-native';
import { Input } from './styles';

const RenderInput = (props): ReactElement => {
  const { on, label, onFocus, onBlur } = props;
  const [animatedIsFocused] = useState(new Animated.Value(on ? 1 : 0));
  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: on ? 1 : 0,
      duration: 200,
    }).start();
  }, [on]);

  return (
    <>
      <Animated.Text
        style={{
          paddingLeft: 4,
          paddingRight: 4,
          position: 'absolute',
          top: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [18, -10],
          }),
          left: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [7, 10],
          }),
          fontSize: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 14],
          }),
          color: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: ['#cdd2d7', 'royalblue'],
          }),
          backgroundColor: 'white',
          marginBottom: 2,
        }}
      >
        {label}
      </Animated.Text>
      <Input {...props} onFocus={onFocus} onBlur={onBlur} />
    </>
  );
};

export default RenderInput;
