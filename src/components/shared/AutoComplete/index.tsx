import { AutoCompleteProps, Datum, ScreenSizeState } from './types';
import { CaretContainer, InputContainer, StyledImage, Wrapper, inputMargin } from './styles';
import { Dimensions, ScaledSize, TextInput, TouchableWithoutFeedback } from 'react-native';
import { IC_ARR_DOWN, IC_ARR_UP } from '../Icons';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

import Options from './renderOptions';
import RenderInput from './renderInput';

const DEFAULT_WIDTH = 240;

export const defaultPlaceholder = 'Choose a country';

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

function useScreenDimensions(): ScaledSize {
  const [screenData, setScreenData] = useState(Dimensions.get('screen'));

  useEffect(() => {
    const onChange = ({ screen }: { screen: ScaledSize }): void => {
      setScreenData(screen);
    };

    Dimensions.addEventListener('change', onChange);

    return (): void => Dimensions.removeEventListener('change', onChange);
  });

  return screenData;
};

export default function AutoComplete({
  renderInputTestID = 'RenderInput_test',
  caretBtnTestID = 'CaretBtn_test',
  value,
  style,
  data,
  placeholderText,
  debounceDelay,
  onDebounceOrOnReset,
  underlayColor,
  storybook,
}: AutoCompleteProps): ReactElement {
  const [innerValue, setInnerValue] = useState<string>(value);
  const [selectedData, setSelectedData] = useState<Datum | null>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [{ screenWidth, screenHeight }, setScreenSize] = useState<ScreenSizeState>({
    screenWidth: 0,
    screenHeight: 0,
  });
  const inputRef = useRef<TextInput>(null);

  const debouncedValue = useDebounce(innerValue, debounceDelay);
  const [fetchedData] = useState<Datum[]>(data);

  const { width: sWidth, height: sHeight } = { ...useScreenDimensions() };

  useEffect(() => {
    const statusBarHeight = getStatusBarHeight();
    const bottomSpace = getBottomSpace();

    if (sWidth > sHeight) {
      setScreenSize({
        screenWidth: sWidth - (statusBarHeight + bottomSpace),
        screenHeight: sHeight - (2 * inputMargin + (storybook ? 38.5 : 0)),
      });
    } else {
      setScreenSize({
        screenWidth: sWidth,
        screenHeight: sHeight - (statusBarHeight + bottomSpace + (2 * inputMargin + (storybook ? 38.5 : 0))),
      });
    }
  }, [storybook, sWidth, sHeight]);

  useEffect(() => {
    if (onDebounceOrOnReset) {
      onDebounceOrOnReset(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  useEffect(() => {
    if (inputRef.current) {
      if (isFocused) {
        inputRef.current.focus();
      } else {
        inputRef.current.blur();
      }
    }
  }, [isFocused]);

  const onPressCaret = useCallback((): void => {
    setTimeout(() => {
      setIsFocused((prevStatus) => !prevStatus);
    }, 200);
  }, []);

  const onPressOption = useCallback((data: Datum) => {
    setTimeout(() => {
      if (data?.label) {
        setInnerValue(data.label);
      }
      setSelectedData(data);
    }, 300);
    onPressCaret();
  }, []);

  const handleFocus = useCallback(
    (isFocus: boolean): void => {
      setIsFocused(isFocus);
    },
    [],
  );

  const filteredData: Datum[] = fetchedData.filter(
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
      ...style,
      width: isFocused ? screenWidth - (2 * inputMargin) : (style?.width ?? DEFAULT_WIDTH),
    }),
    [style, isFocused],
  );

  return (
    <TouchableWithoutFeedback onPress={onPressCaret}>
      <Wrapper focused={isFocused} width={screenWidth} height={screenHeight}>
        <InputContainer
          style={adjustedStyle}
          focus={isFocused}
        >
          <RenderInput
            ref={inputRef}
            focused={isFocused}
            testID={renderInputTestID}
            value={innerValue}
            onChangeText={(text: string): void => {
              setInnerValue(text);
            }}
            placeholderLabel={placeholderText || defaultPlaceholder}
            onFocus={(): void => handleFocus(true)}
            onDebounceOrOnReset={onDebounceOrOnReset}
            bgColor={style?.backgroundColor}
          />
          <CaretContainer testID={caretBtnTestID} onPress={onPressCaret}>
            <StyledImage source={isFocused ? IC_ARR_UP : IC_ARR_DOWN} />
          </CaretContainer>
        </InputContainer>
        {isFocused && (
          <Options
            data={filteredData}
            underlayColor={underlayColor}
            onPress={onPressOption}
            selectedData={selectedData}
            bgColor={style?.backgroundColor}
          />
        )}
      </Wrapper>
    </TouchableWithoutFeedback>
  );
}
