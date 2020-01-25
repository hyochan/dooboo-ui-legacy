import { Animated, TextInput } from 'react-native';
import { Input, InputInnerContainer, ResetCircle, ResetContainer, ResetText } from './styles';
import React, { forwardRef, useEffect, useState } from 'react';

import { RenderInputProps } from './types';

const RenderInput =
  forwardRef<TextInput, RenderInputProps>((props, ref?) => {
    const {
      focused,
      placeholderLabel,
      onFocus,
      onDebounceOrOnReset,
      testID,
      value: label,
      onChangeText,
      bgColor,
    } = props;

    const [animatedIsFocused] = useState(new Animated.Value(focused ? 1 : 0));

    useEffect(() => {
      const config = {
        toValue: focused ? 1 : label ? 2 : 0,
        delay: label ? 0 : 300,
        duration: label ? 0 : 200,
      };
      Animated.timing(animatedIsFocused, config).start();
    }, [focused, label]);

    return (
      <InputInnerContainer>
        <Animated.Text
          style={{
            paddingLeft: 4,
            paddingRight: 4,
            position: 'absolute',
            top: animatedIsFocused.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [17, -10, -10],
            }),
            left: animatedIsFocused.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [7, 10, 10],
            }),
            fontSize: animatedIsFocused.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [20, 14, 14],
            }),
            color: animatedIsFocused.interpolate({
              inputRange: [0, 1, 2],
              outputRange: ['#cdd2d7', 'royalblue', '#000000'],
            }),
            backgroundColor: bgColor || 'white',
            marginBottom: 2,
          }}
        >
          {placeholderLabel}
        </Animated.Text>
        <Input {...props} onFocus={onFocus} ref={ref} />
        {!!label && (
          <ResetContainer
            testID={testID}
            onPress={(): void => {
              if (onDebounceOrOnReset) {
                onDebounceOrOnReset('');
              }
              if (onChangeText) {
                onChangeText('');
              }
            }}>
            <ResetCircle>
              <ResetText>X</ResetText>
            </ResetCircle>
          </ResetContainer>
        )}
      </InputInnerContainer>
    );
  });

RenderInput.displayName = 'RenderInput';

export default RenderInput;
