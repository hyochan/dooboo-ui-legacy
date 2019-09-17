import * as React from 'react';

import { IC_MAGNIFIER } from '../../../utils/Icons';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: #f3f5f7;
  height: 42;
  margin-left: 20;
  margin-right: 20;
  border-radius: 8;

  flex-direction: row;
`;

const MagContainer = styled.View`
  height: 24;
  width: 24;
  margin-left: 8;
  margin-right: 2;
  margin-top: 9;
  margin-bottom: 9;
  justify-content: center;
  align-items: center;
`;

const Magnifier = styled.Image`
  width: 16;
  height: 16;
  margin-bottom: 2;
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
  value: string;
  onDebounceOrOnReset: (value: string) => void;
  style?: any;
  debounceDelay?: number;
  customIcon?: React.ReactNode;
  placeholderText?: string;
}

// reference : https://dev.to/gabe_ragland/debouncing-with-react-hooks-jci
function useDebounce(value: string, delay: number = 400) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
}

function SearchInput(props: SearchInputProps) {
  const [value, setValue] = React.useState(props.value);
  const debouncedValue = useDebounce(value, props.debounceDelay);

  React.useEffect(() => {
    props.onDebounceOrOnReset(debouncedValue);
  }, [debouncedValue]);

  React.useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Container style={props.style}>
      {props.customIcon || (
        <MagContainer>
          <Magnifier source={IC_MAGNIFIER} />
        </MagContainer>
      )}
      <Input
        testID={'SEARCH_INPUT'}
        value={value}
        onChangeText={(text) => {
          setValue(text);
        }}
        placeholder={props.placeholderText || '검색어를 입력해주세요.'}
        placeholderTextColor={'#cdd2d7'}
      />
      {props.value !== '' && (
        <ResetContainer>
          <Reset
            testID='RESET_BUTTON'
            onPress={() => {
              props.onDebounceOrOnReset('');
            }}
          >
            <ResetText>X</ResetText>
          </Reset>
        </ResetContainer>
      )}
    </Container>
  );
}

export default SearchInput;
