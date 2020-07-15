import React, { useState } from 'react';
import { Picker } from 'react-native';
import styled from 'styled-components/native';

interface ModalPickerProps {
  value?: string | undefined;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnimated: React.Dispatch<React.SetStateAction<boolean>>;
  data?: [] | undefined;
}

function ModalPicker(props: ModalPickerProps): React.ReactElement {
  const [options, setOptions] = useState(props.data);

  const { value, setValue, setIsAnimated } = props;

  return (
    <>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue, itemIndex) => {
          setValue(itemValue);
          alert('Selected!');
          setIsAnimated(false);
        }}>
        {options.map((option, index) => {
          return (
            <Picker.Item
              value={option.label}
              label={option.label}
              key={index}
            />
          );
        })}
      </Picker>
    </>
  );
}

export default ModalPicker;
