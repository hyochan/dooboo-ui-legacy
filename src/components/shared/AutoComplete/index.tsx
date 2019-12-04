import * as React from 'react';

import { Container, Input, Reset, ResetContainer, ResetText } from './styles';

import { SearchInputProps } from './types';
import { View } from 'react-native';

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

export default function AutoComplete(
  props: SearchInputProps,
): React.ReactElement {
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
    <Container style={props.style}>
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
}
