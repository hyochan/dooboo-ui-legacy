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
      Animated.timing(animatedIsFocused, {
        toValue: on ? 1 : 0,
        delay: 300,
        duration: 200,
      }).start();
    }, [on]);

    return (
      <InputInnerContainer>
        <Animated.Text
          style={{
            paddingLeft: 4,
            paddingRight: 4,
            position: 'absolute',
            top: animatedIsFocused.interpolate({
              inputRange: [0, 1],
              outputRange: [17, -10],
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
          {!value && placeholderLabel}
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
