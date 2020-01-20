import * as React from 'react';

import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  background-color: #f3f5f7;
  height: 42;
  margin-left: 20;
  margin-right: 20;
  border-radius: 8;

  flex-direction: row;
`;

const Input = styled.TextInput`
  flex-grow: 1;
  align-self: center;
  font-size: 16;
`;

const ResetContainer = styled.View`
  height: 24;
  width: 24;
  margin-left: 2;
  margin-right: 11;
  margin-top: 9;
  margin-bottom: 9;
  justify-content: center;
  align-items: center;
`;

const Reset = styled.TouchableOpacity`
  background-color: #c6ccd1;
  border-radius: 20;
  width: 20;
  height: 20;
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
