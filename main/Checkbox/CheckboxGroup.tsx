
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import Checkbox from './Checkbox';
import styled from 'styled-components/native';

interface customStyle {
  labelSize?: number;
  labelColor?: string;
  boxSize?: number;
  boxColor?: string;
}

interface onChangeEvent {
  checked: boolean;
  label: string;
}

export type CheckboxValueType = string | number | boolean;

export interface CheckboxOptionType {
  label: string | number;
  value: CheckboxValueType;
  disabled?: boolean;
  onChange?: (e: onChangeEvent) => void;
  customStyle?: customStyle;
}

export interface CheckboxGroupState {
  value: CheckboxValueType[];
  registeredValues: CheckboxValueType[];
}

export interface CheckboxGroupContext {
  registerValue?:(value: CheckboxValueType) => void;
  toggleOption?: (option: CheckboxOptionType) => void;
  value?: any;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  defaultValues?: Array<CheckboxValueType>;
  values?: Array<CheckboxValueType>;
  options?: Array<CheckboxOptionType | string>;
  disabled?: boolean;
  onChange?: (checkedValue: Array<CheckboxValueType>) => void;
  commonCustomStyle?: customStyle;
}

export const GroupCheckboxContext = React.createContext<CheckboxGroupContext | null>(null);

const CheckboxGroup: FC<CheckboxGroupProps> = (props) => {
  const isMounted = useRef(false);
  const [values, setValues] = useState<CheckboxValueType[]>(props.values || props.defaultValues || []);
  const [registeredValues, setRegisteredValues] = useState<CheckboxValueType[]>([]);

  useEffect(() => {
    // for only componenUpdate not in mount
    if (isMounted.current) {
      setValues(props.values || []);
    } else {
      isMounted.current = true;
    }
  }, [props.values]);

  const getOptions = useCallback((): Array<CheckboxOptionType> => {
    const { options } = props;

    return (options as Array<CheckboxOptionType>).map((option) => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        } as CheckboxOptionType;
      }
      return option;
    });
  }, [props.options]);

  const registerValue = useCallback((value : string): void => {
    setRegisteredValues((prevRegisteredValues) => {
      return [...prevRegisteredValues, value];
    });
  }, [setRegisteredValues]);

  const toggleOption = (option: CheckboxOptionType): void => {
    const optionIndex = values.indexOf(option.value);
    const _values = [...values];
    if (optionIndex === -1) {
      _values.push(option.value);
    } else {
      _values.splice(optionIndex, 1);
    }
    if (!('values' in props)) {
      setValues(_values);
    }

    const { onChange } = props;
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
    disabled: props.disabled,
  };

  return (
    <Container>
      <GroupCheckboxContext.Provider value={context}>
        {getOptions().map((option) => (
          <Checkbox
            key={option.value.toString()}
            label={option.label}
            disabled={'disabled' in option ? option.disabled : props.disabled}
            value={option.value}
            checked={values.indexOf(option.value) !== -1}
            onChange={option.onChange}
            customStyle={ 'customStyle' in option ? option.customStyle : props.commonCustomStyle}
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
