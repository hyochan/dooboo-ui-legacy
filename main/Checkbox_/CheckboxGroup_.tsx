
import React, { FC, useCallback, useState } from 'react';
import Checkbox_ from './Checkbox_';
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
  cancelValue?: (value: CheckboxValueType) => void;
  registerValue?:(value: CheckboxValueType) => void;
  toggleOption?: () => void;
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

const CheckboxGroup_: FC<CheckboxGroupProps> = (props) => {
  const [values, setValues] = useState<CheckboxValueType[]>(props.values || props.defaultValues || []);
  const [registeredValues, setRegisteredValues] = useState<CheckboxValueType[]>([]);

  const getOptions = useCallback((): Array<CheckboxOptionType> => {
    const { options } = props;

    return (options as Array<CheckboxOptionType>).map((option) => {
      // for CASE: ['Orange', 'Apple', 'Banna']
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
        } as CheckboxOptionType;
      }
      return option;
    });
  }, [props.options]);

  const cancelValue = useCallback((value: string) : void => {
    setRegisteredValues((prevRegisteredValues) => {
      return prevRegisteredValues.filter((val) => val !== value);
    });
  }, [setRegisteredValues]);

  const registerValue = useCallback((value : string): void => {
    setRegisteredValues((prevRegisteredValues) => {
      return [...prevRegisteredValues, value];
    });
  }, [setRegisteredValues]);

  const toggleOption = useCallback((): void => {
    // const optionIndex = values.indexOf(option.value);
    // const _values = [...values];
    // if (optionIndex === -1) {
    //  _values.push(option.value);
    // } else {
    //  _values.splice(optionIndex, 1);
    // }
    // if (!('values' in props)) {
    //  setValues(_values);
    // }

    const _registerdValues = [...registeredValues];
    const { onChange } = props;
    if (onChange) {
      // const options = getOptions();
      onChange(_registerdValues);
    }
  }, [registeredValues, props.onChange]);

  const context = {
    toggleOption,
    registerValue,
    cancelValue,
    values,
    disabled: props.disabled,
  };

  return (
    <Container>
      <GroupCheckboxContext.Provider value={context}>
        {getOptions().map((option) => (
          <Checkbox_
            key={option.value.toString()}
            label={option.label}
            disabled={'disabled' in option ? option.disabled : props.disabled}
            value={option.value}
            checked={values.indexOf(option.value) !== -1}
            onChange={option.onChange}
            customStyle={ 'customStyle' in option ? option.customStyle : props.commonCustomStyle}
          >
            {option.label}
          </Checkbox_>
        ))}
      </GroupCheckboxContext.Provider>
    </Container>

  );
};

const Container = styled.View`
 flex-direction: row;
 flex-wrap: wrap;
`;

export default CheckboxGroup_;
