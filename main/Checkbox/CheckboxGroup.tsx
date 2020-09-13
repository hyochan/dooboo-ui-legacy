import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Checkbox from './Checkbox';
import styled from 'styled-components/native';

interface CustomStyle {
  labelSize?: number;
  labelColor?: string;
  boxSize?: number;
  boxColor?: string;
}

interface OnChangeEvent {
  checked: boolean;
  label: string;
}

export type CheckboxValueType = string | number | boolean;

export interface CheckboxOptionType {
  label: string | number;
  value: CheckboxValueType;
  disabled?: boolean;
  onChange?: (e: OnChangeEvent) => void;
  customStyle?: CustomStyle;
}

export interface CheckboxGroupState {
  value: CheckboxValueType[];
  registeredValues: CheckboxValueType[];
}

export interface CheckboxGroupContext {
  registerValue?:(value: CheckboxValueType) => void;
  toggleOption: (option: CheckboxOptionType) => void;
  value?: CheckboxValueType[];
  disabled?: boolean;
}

interface CheckboxGroupProps {
  defaultValues?: Array<CheckboxValueType>;
  values?: Array<CheckboxValueType>;
  options?: Array<CheckboxOptionType | string>;
  disabled?: boolean;
  onChange?: (checkedValue: Array<CheckboxValueType>) => void;
  commonCustomStyle?: CustomStyle;
}

export const GroupCheckboxContext = React.createContext<CheckboxGroupContext | null>(null);

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  defaultValues,
  values,
  options,
  disabled,
  onChange,
  commonCustomStyle,
}) => {
  const isMounted = useRef(false);
  const [groupValues, setGroupValues] = useState<CheckboxValueType[]>(values || defaultValues || []);
  const [registeredValues, setRegisteredValues] = useState<CheckboxValueType[]>([]);

  useEffect(() => {
    // for only componenUpdate not in mount
    if (isMounted.current) {
      setGroupValues(values || []);
    } else {
      isMounted.current = true;
    }
  }, [values]);

  const getOptions = useCallback((): Array<CheckboxOptionType> => {
    return (options as Array<CheckboxOptionType>).map((option) => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        } as CheckboxOptionType;
      }

      return option;
    });
  }, [options]);

  const registerValue = useCallback((value : string): void => {
    setRegisteredValues((prevRegisteredValues) => {
      return [...prevRegisteredValues, value];
    });
  }, [setRegisteredValues]);

  const toggleOption = (option: CheckboxOptionType): void => {
    const optionIndex = groupValues.indexOf(option.value);
    const _values = [...groupValues];

    if (optionIndex === -1) {
      _values.push(option.value);
    } else {
      _values.splice(optionIndex, 1);
    }

    if (!(values)) {
      setGroupValues(_values);
    }

    if (onChange) {
      const options = getOptions();
      const filterdValues = _values
        .filter((val) => registeredValues.indexOf(val) !== -1)
        .sort((a, b) => {
          const indexA = options.findIndex((opt) => opt.value === a);
          const indexB = options.findIndex((opt) => opt.value === b);

          return indexA - indexB;
        });

      onChange(filterdValues);
    }
  };

  const context = {
    toggleOption,
    registerValue,
    values,
    disabled: disabled,
  };

  return (
    <Container>
      <GroupCheckboxContext.Provider value={context}>
        {getOptions().map((option) => (
          <Checkbox
            key={option.value.toString()}
            label={option.label}
            disabled={'disabled' in option ? option.disabled : disabled}
            value={option.value}
            checked={groupValues.indexOf(option.value) !== -1}
            onChange={option.onChange}
            customStyle={ 'customStyle' in option ? option.customStyle : commonCustomStyle}
          >
            {option.label}
          </Checkbox>
        ))}
      </GroupCheckboxContext.Provider>
    </Container>

  );
};

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export default CheckboxGroup;
