import { AutoCompleteProps, DummyDatum } from './types';
import { CaretContainer, InputContainer, StyledImage, Wrapper } from './styles';
import { IC_ARR_DOWN, IC_ARR_UP } from '../Icons';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import Options from './renderOptions';
import RenderInput from './RenderInput';
import dummyData from './dummyData';

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

export default function AutoComplete({
  renderInputTestID = 'RenderInput_test',
  caretBtnTestID = 'CaretBtn_test',
  value,
  style,
  placeholderText,
  debounceDelay,
  onDebounceOrOnReset,
}: AutoCompleteProps): ReactElement {
  const [innerValue, setInnerValue] = useState<string>(value);
  const [isOptionsOpen, toggleOptions] = useState(false);
  const debouncedValue = useDebounce(innerValue, debounceDelay);
  const [filteredData] = useState<DummyDatum[]>(dummyData);

  useEffect(() => {
    if (onDebounceOrOnReset) {
      onDebounceOrOnReset(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const onPressCaret = useCallback((): void => {
    toggleOptions((prevStatus) => !prevStatus);
  }, []);

  const onPressOption = useCallback((label: string) => {
    setInnerValue(label);
    setTimeout(() => {
      toggleOptions((prevStatus) => !prevStatus);
    }, 80);
  }, []);

  return (
    <Wrapper>
      <InputContainer style={style} on={isOptionsOpen}>
        <RenderInput
          testID={renderInputTestID}
          value={innerValue}
          onChangeText={(text: string): void => {
            setInnerValue(text);
          }}
          placeholder={placeholderText || 'search...'}
          placeholderTextColor={'#cdd2d7'}
        />
        <CaretContainer testID={caretBtnTestID} onPress={onPressCaret}>
          <StyledImage source={isOptionsOpen ? IC_ARR_UP : IC_ARR_DOWN} />
        </CaretContainer>
      </InputContainer>
      {isOptionsOpen && <Options data={filteredData} onPress={onPressOption} />}
    </Wrapper>
  );
}
