import { AutoCompleteProps, DummyDatum } from './types';
import { CaretContainer, InputContainer, StyledImage, Wrapper } from './styles';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { IC_ARR_DOWN, IC_ARR_UP } from '../Icons';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Options from './renderOptions';
import RenderInput from './renderInput';
import dummyData from './dummyData';
import { useSafeArea } from 'react-native-safe-area-context';

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
  const [selectedData, setSelectedData] = useState<DummyDatum | null>(null);
  const [isOptionsOpen, toggleOptions] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedValue = useDebounce(innerValue, debounceDelay);
  const [fetchedData] = useState<DummyDatum[]>(dummyData);

  const screenWidth = useMemo(() => Dimensions.get('screen').width, []);
  const inSets = useSafeArea();

  useEffect(() => {
    if (onDebounceOrOnReset) {
      onDebounceOrOnReset(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const onPressCaret = useCallback((): void => {
    setTimeout(() => {
      toggleOptions((prevStatus) => !prevStatus);
      setIsFocused((prevStatus) => {
        console.log({ prevStatus });
        if (inputRef.current && !prevStatus) {
          inputRef.current.blur();
        }
        return !prevStatus;
      });
    }, 80);
  }, []);

  const onPressOption = useCallback((data: DummyDatum) => {
    if (data && data.label) {
      setInnerValue(data.label);
    }
    setSelectedData(data);

    onPressCaret();
  }, []);

  const handleFocus = useCallback(
    ({ isFocus }): void => {
      console.log('onFocus');
      setIsFocused(isFocus);
    },
    [isFocused],
  );

  const filteredData: DummyDatum[] = fetchedData.filter(
    ({ id, label, value }) => {
      const innerValueLower = innerValue ? innerValue.toLowerCase() : null;
      return innerValueLower
        ? id.toLowerCase().includes(innerValueLower) ||
            label.toLowerCase().includes(innerValueLower) ||
            value.toLowerCase().includes(innerValueLower)
        : fetchedData;
    },
  );

  const adjustedStyle = useMemo(
    () => ({
      ...(style as any),
      width: isOptionsOpen ? screenWidth - 40 : style.width,
    }),
    [style, isOptionsOpen],
  );

  return (
    <TouchableWithoutFeedback onPress={onPressCaret}>
      <Wrapper on={isOptionsOpen} width={screenWidth} inSets={inSets}>
        <InputContainer
          style={adjustedStyle}
          on={isOptionsOpen || isFocused || innerValue !== ''}>
          <RenderInput
            ref={inputRef}
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
        {isOptionsOpen && (
          <Options
            data={filteredData}
            underlayColor={underlayColor}
            onPress={onPressOption}
            onPressOutside={onPressCaret}
            selectedData={selectedData}
          />
        )}
      </Wrapper>
    </TouchableWithoutFeedback>
  );
}
