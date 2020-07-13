import { Platform, StyleProp, StyleSheet, TextInputProps, View, ViewStyle } from 'react-native';
import React, { FC, useEffect, useState } from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  background-color: #f3f5f7;
  height: 42px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 8px;

  flex-direction: row;
`;

const Input = styled.TextInput`
  flex-grow: 1;
  align-self: center;
  font-size: 16px;
  ${Platform.OS === 'web' && { 'outline-style': 'none' }}
`;

const ResetContainer = styled.View`
  height: 24px;
  width: 24px;
  margin-left: 2px;
  margin-right: 11px;
  margin-top: 9px;
  margin-bottom: 9px;
  justify-content: center;
  align-items: center;
`;

const Reset = styled.TouchableOpacity`
  background-color: #c6ccd1;
  border-radius: 20px;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;

const ResetText = styled.Text`
  color: white;
`;

export interface SearchInputProps {
  testID?: string;
  value: string;
  style?: StyleProp<ViewStyle>;
  debounceDelay?: number;
  customIcon?: React.ReactElement;
  placeholder?: TextInputProps['placeholder'];
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  onFocus?: () => void
  onBlur?: () => void
  onDebounceOrOnReset?: (value: string) => void;
}

// reference : https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
function useDebounce(value: string, delay = 400): string {
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

const SearchInput: FC<SearchInputProps> = (props) => {
  const {
    testID,
    value,
    style,
    debounceDelay,
    customIcon,
    placeholder = 'Search for anything',
    placeholderTextColor = '#BDBDBD',
    onFocus,
    onBlur,
    onDebounceOrOnReset,
  } = props;

  const [inputValue, setInputValue] = useState<string>(value);
  const debouncedValue = useDebounce(value, debounceDelay);

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
      style={StyleSheet.flatten(style)}
    >
      {customIcon || <View style={{ width: 10 }} />}
      <Input
        testID={'SEARCH_INPUT'}
        value={inputValue}
        onChangeText={(text): void => {
          setInputValue(text);
        }}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {value !== '' && (
        <ResetContainer>
          <Reset
            testID={testID}
            onPress={(): void => {
              if (onDebounceOrOnReset) {
                onDebounceOrOnReset('');
              }
            }}
          >
            <ResetText>X</ResetText>
          </Reset>
        </ResetContainer>
      )}
    </Container>
  );
};

export default SearchInput;
