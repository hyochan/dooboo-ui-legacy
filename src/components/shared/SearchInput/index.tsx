import * as React from 'react';

import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

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
  onDebounceOrOnReset?: (value: string) => void;
  style?: StyleProp<ViewStyle>;
  debounceDelay?: number;
  customIcon?: React.ReactNode;
  placeholderText?: string;
}

// reference : https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
function useDebounce(value: string, delay = 400): string {
  const [debouncedValue, setDebouncedValue] = React.useState<string>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return (): void => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const [value, setValue] = React.useState<string>(props.value);
  const debouncedValue = useDebounce(value, props.debounceDelay);

  React.useEffect(() => {
    if (props.onDebounceOrOnReset) {
      props.onDebounceOrOnReset(debouncedValue);
    }
  }, [debouncedValue]);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Container
      style={StyleSheet.flatten(props.style)}
    >
      {props.customIcon ? props.customIcon : <View style={{ width: 10 }} />}
      <Input
        testID={'SEARCH_INPUT'}
        value={value}
        onChangeText={(text): void => {
          setValue(text);
        }}
        placeholder={props.placeholderText || 'placehoder...'}
        placeholderTextColor={'#cdd2d7'}
      />
      {props.value !== '' && (
        <ResetContainer>
          <Reset
            testID={props.testID}
            onPress={(): void => {
              if (props.onDebounceOrOnReset) {
                props.onDebounceOrOnReset('');
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
