import { Platform, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import React, { FC, useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
`;

const Label = styled.Text`
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 6px;
  color: #828282;
`;

const TextInput = styled.TextInput`
  width: 335px;
  height: 56px;
  border-width: 1px;
  border-radius: 6px;
  border-color: #E0E0E0;
  padding-top: 14px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;
  font-family: Avenir;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  font-weight: bold;
  color: #4F4F4F;
  ${Platform.OS === 'web' && { 'outline-style': 'none' }}
`;

interface Props {
  numberOfLines?: number;
  secureTextEntry?: boolean;
  placeholder?: TextInputProps['placeholder'];
  focusColor?: string;
  labelText?:string;
}

const EditText: FC<Props> = (props) => {
  const {
    numberOfLines,
    secureTextEntry = false,
    placeholder = 'text',
    focusColor = '#109CF1',
    labelText = 'Label',
  } = props;

  const [focused, setFocus] = useState(false);

  return (
    <Container>
      <Label>
        {labelText}
      </Label>
      <TextInput
        onFocus={():void => setFocus(true)}
        onBlur={():void => setFocus(false)}
        style={[
          focused && { borderColor: focusColor },
        ]}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
      />
    </Container>
  );
};

export default EditText;
