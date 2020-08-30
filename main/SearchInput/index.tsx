import {
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  TextInputKeyPressEventData,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  height: 40px;
  width: 381px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 6px;
  border-width: 1px;
  border-color: #E0E0E0;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.TextInput`
  flex-grow: 1;
  align-self: center;
  font-size: 14px;
  padding-left: 16px;
  ${Platform.OS === 'web' && { 'outline-style': 'none' }}
`;

interface Props {
  value: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: TextStyle;
  focusColor?: string;
  debounceDelay?: number;
  leftElement?: React.ReactElement;
  placeholder?: TextInputProps['placeholder'];
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  resetIndicator?: React.ReactElement;
  resetIndicatorStyle?: ViewStyle;
  rightElement?: React.ReactElement;
  onFocus?: () => void;
  onBlur?: () => void;
  onDebounceOrOnReset?: (value: string) => void;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
}

// reference : https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return (): void => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

const SearchInput: FC<Props> = (props) => {
  const {
    value,
    containerStyle,
    inputStyle,
    focusColor = '#109CF1',
    debounceDelay = 400,
    leftElement,
    placeholder,
    placeholderTextColor = '#BDBDBD',
    onFocus,
    rightElement,
    onBlur,
    onDebounceOrOnReset,
    onKeyPress,
  } = props;

  const [focused, setFocus] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value);
  const debouncedValue = useDebounce(inputValue, debounceDelay);

  useEffect(() => {
    if (onDebounceOrOnReset) {
      onDebounceOrOnReset(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Container
      testID={'SEARCH_CONTAINER'}
      style={[containerStyle, focused && { borderColor: focusColor }]}
    >
      {leftElement || null}
      <Input
        testID={'SEARCH_INPUT'}
        value={inputValue}
        style={inputStyle}
        onChangeText={(text): void => {
          setInputValue(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onFocus={(): void => {
          setFocus(true);
          onFocus && onFocus();
        }}
        onBlur={(): void => {
          setFocus(false);
          onBlur && onBlur();
        }}
        onKeyPress={
          onKeyPress
        }
      />
      {rightElement || null}
    </Container>
  );
};

export { SearchInput };
