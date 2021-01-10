import { CheckboxOptionType, CheckboxValueType, CustomStyle } from './types';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';

import { Checkbox } from './Checkbox';
import { GroupCheckboxContext } from './GroupCheckboxContext';
import styled from 'styled-components/native';

interface CheckboxGroupProps {
  defaultValues?: Array<CheckboxValueType>;
  values?: Array<CheckboxValueType>;
  options?: Array<CheckboxOptionType | string>;
  disabled?: boolean;
  onChange?: (checkedValue: Array<CheckboxValueType>) => void;
  commonCustomStyle?: CustomStyle;
  direction?: 'column' | 'row';
}

interface ContainerProps {
  direction?: 'row' | 'column';
}

const Container = styled.View<ContainerProps>`
  flex-direction: ${({ direction }): 'row' | 'column' => direction || 'column'};
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  defaultValues,
  values,
  options,
  disabled,
  onChange,
  commonCustomStyle,
  direction,
}) => {
  const isMounted = useRef(false);

  const [groupValues, setGroupValues] = useState<CheckboxValueType[]>(
    values || defaultValues || [],
  );

  const [registeredValues, setRegisteredValues] = useState<CheckboxValueType[]>(
    [],
  );

  useEffect(() => {
    // for only componenUpdate not in mount
    if (isMounted.current) setGroupValues(values || []);
    else isMounted.current = true;
  }, [values]);

  const getOptions = useCallback((): Array<CheckboxOptionType> => {
    return (options as Array<CheckboxOptionType>).map((option) => {
      if (typeof option === 'string')
        return {
          label: option,
          value: option,
        } as CheckboxOptionType;

      return option;
    });
  }, [options]);

  const registerValue = useCallback(
    (value: string): void => {
      setRegisteredValues((prevRegisteredValues) => {
        return [...prevRegisteredValues, value];
      });
    },
    [setRegisteredValues],
  );

  const toggleOption = (option: CheckboxOptionType): void => {
    const optionIndex = groupValues.indexOf(option.value);
    const _values = [...groupValues];

    if (optionIndex === -1) _values.push(option.value);
    else _values.splice(optionIndex, 1);

    if (!values) setGroupValues(_values);

    if (onChange) {
      const currentOptions = getOptions();

      const filterdValues = _values
        .filter((val) => registeredValues.indexOf(val) !== -1)
        .sort((a, b) => {
          const indexA = currentOptions.findIndex((opt) => opt.value === a);
          const indexB = currentOptions.findIndex((opt) => opt.value === b);

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
    <Container direction={direction}>
      <GroupCheckboxContext.Provider value={context}>
        {getOptions().map((option) => (
          <Checkbox
            key={option.value.toString()}
            label={option.label}
            disabled={'disabled' in option ? option.disabled : disabled}
            value={option.value}
            checked={groupValues.indexOf(option.value) !== -1}
            onChange={option.onChange}
            customStyle={
              'customStyle' in option ? option.customStyle : commonCustomStyle
            }>
            {option.label}
          </Checkbox>
        ))}
      </GroupCheckboxContext.Provider>
    </Container>
  );
};
