import { Platform, StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import React, { FC, useEffect, useState } from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  height: 56px;
  width: 335px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #E0E0E0;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.TextInput`
  flex-grow: 1;
  align-self: center;
  font-size: 16px;
  ${Platform.OS === 'web' && { 'outline-style': 'none' }}
`;

const ResetContainer = styled.TouchableOpacity`
  border-radius: 20px;
  background-color: #BDBDBD;
  width: 24px;
  height: 24px;
  margin-top: 18px;
  margin-bottom: 18px;
  margin-right: 11px;
  justify-content: center;
  align-items: center;
`;

const ResetText = styled.Text`
  color: white;
  font-weight: 800; 
`;

interface Props {
  value: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: TextStyle;
  focusColor?: string;
  debounceDelay?: number;
  customIcon?: React.ReactElement;
  placeholder?: TextInputProps['placeholder'];
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  resetIndicator?: React.ReactElement;
  resetIndicatorStyle?: ViewStyle;
  onFocus?: () => void
  onBlur?: () => void
  onDebounceOrOnReset?: (value: string) => void;
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
    customIcon,
    placeholder = 'Search for anything',
    placeholderTextColor = '#BDBDBD',
    resetIndicator,
    resetIndicatorStyle,
    onFocus,
    onBlur,
    onDebounceOrOnReset,
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
      style={[
        containerStyle,
        focused && { borderColor: focusColor },
      ]}
    >
      {customIcon || null}
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
      />
      {
        value !== '' &&
          (
            <ResetContainer
              testID={'RESET_INDICATOR'}
              style={resetIndicatorStyle}
              activeOpacity={1}
              onPress={(): void => {
                setInputValue('');
              }}
            >
              {resetIndicator ?? <ResetText>X</ResetText>}
            </ResetContainer>
          )
      }
    </Container>
  );
};

export { SearchInput };
