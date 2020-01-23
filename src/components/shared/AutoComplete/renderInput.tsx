import { Animated, TextInput } from 'react-native';
import { Input, InputInnerContainer, ResetCircle, ResetContainer, ResetText } from './styles';
import React, { forwardRef, useEffect, useState } from 'react';

import { RenderInputProps } from './types';

const RenderInput =
  forwardRef<TextInput, RenderInputProps>((props, ref) => {
    const {
      on,
      placeholderLabel,
      onFocus,
      onBlur,
      onDebounceOrOnReset,
      testID,
      value,
      onChangeText,
    } = props;

    const [animatedIsFocused] = useState(new Animated.Value(on ? 1 : 0));

    useEffect(() => {
      const config = {
        toValue: on ? 1 : value ? 2 : 0,
        delay: value ? 0 : 300,
        duration: value ? 0 : 200,
      };
      Animated.timing(animatedIsFocused, config).start();
    }, [on, value]);

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
            backgroundColor: 'white',
            marginBottom: 2,
          }}
        >
          {placeholderLabel}
        </Animated.Text>
        <Input {...props} onFocus={onFocus} onBlur={onBlur} ref={ref as any} />
        {!!value && (
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
