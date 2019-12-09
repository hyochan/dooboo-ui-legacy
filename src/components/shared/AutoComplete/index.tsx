import { AutoCompleteProps, DummyDatum } from './types';
import { CaretContainer, InputContainer, StyledImage, Wrapper } from './styles';
import { IC_ARR_DOWN, IC_ARR_UP } from '../Icons';
import React, { ReactElement, useCallback, useEffect, useState } from 'react';

import Options from './renderOptions';
import RenderInput from './renderInput';
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
  underlayColor,
}: AutoCompleteProps): ReactElement {
  const [innerValue, setInnerValue] = useState<string>(value);
  const [selectedData, setSelectedData] = useState<DummyDatum>();
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

  const onPressOption = useCallback((data: DummyDatum) => {
    if (data && data.label) {
      setInnerValue(data.label);
    }
    setSelectedData(data);

    setTimeout(() => {
      toggleOptions((prevStatus) => !prevStatus);
    }, 80);
  }, []);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = useCallback(
    ({ isFocus }): void => {
      setIsFocused(isFocus);
    },
    [isFocused],
  );

  const filterData: DummyDatum[] = filteredData.filter(
    ({ id, label, value }) => {
      const innerValueLower = innerValue ? innerValue.toLowerCase() : null;
      return innerValueLower ? (
        id.toLowerCase().includes(innerValueLower) ||
        label.toLowerCase().includes(innerValueLower) ||
        value.toLowerCase().includes(innerValueLower)
      ) : filteredData;
    },
  );

  return (
    <Wrapper>
      <InputContainer
        style={style}
        on={isOptionsOpen || isFocused || innerValue !== ''}
      >
        <RenderInput
          on={isFocused || isOptionsOpen || innerValue !== ''}
          testID={renderInputTestID}
          value={innerValue}
          onChangeText={(text: string): void => {
            setInnerValue(text);
          }}
          label={placeholderText || 'Choose a country'}
          onFocus={(): void => handleFocus(true)}
          onBlur={(): void => handleFocus(false)}
        />
        <CaretContainer testID={caretBtnTestID} onPress={onPressCaret}>
          <StyledImage source={isOptionsOpen ? IC_ARR_UP : IC_ARR_DOWN} />
        </CaretContainer>
      </InputContainer>
      {
        isOptionsOpen && (
          <Options
            data={filterData}
            underlayColor={underlayColor}
            onPress={onPressOption}
            selectedData={selectedData}
          />
        )
      }
    </Wrapper >
  );
}
