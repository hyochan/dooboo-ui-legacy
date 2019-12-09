import React, { ReactElement, useCallback, useState, useEffect } from 'react';
import { Text, View, Animated } from 'react-native';

import { Input, InputContainer } from './styles';

const RenderInput = (props): ReactElement => {
  
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleFocus = useCallback((): void => {
    setIsFocused(true);
  }, [isFocused]);
  const handleBlur = useCallback((): void => {
    setIsFocused(false);
  }, [isFocused]);
  const [animatedIsFocused] = useState(new Animated.Value(props.value === '' ? 0 : 1))
  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: (isFocused || props.value !== '') ? 1 : 0,
      duration: 200,
    }).start();
   }, [isFocused, props.value]) 
   
  return (
   <>
    <Animated.Text style={
      { 
        position: 'absolute',
        top: animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [18, -10],
        }),
        left: animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 10],
        }),
        fontSize: animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 14],
        }),
        color: animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: ['#cdd2d7', '#1976d2'],
        })
      }
    }>
      {props.label}
    </Animated.Text>
    <Input {...props} onFocus={handleFocus} onBlur={handleBlur} />
   </>
  );
};

export default RenderInput;
