import {
  Image,
  Platform,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
`;

const StyledLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
`;

const StyledRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #000000;
  border-bottom-width: 2px;
  margin: 0 0 2px 0;
  padding: 2px;
  width: 200px;
`;

const StyledRowContent = styled.View`
  align-items: flex-start;
`;

const StyledDateInput = styled.TextInput`
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 15px;
  font-weight: 500;
  flex: 1;
  ${Platform.OS === 'web' && { 'outline-style': 'none' }}
`;

const StyledErrorContainer = styled.View`
  width: 100%;
`;

const StyledError = styled.Text`
  margin: 0px 2px;
  font-size: 12px;
  font-weight: 500;
  margin-top: 5px;
  color: #ff8989;
`;

interface Props {
  style?: ViewStyle;
  label?: string;
  labelTextStyle?: TextStyle;
  // labelStyle?: ViewStyle;
  placeholder?: string;
  placeholderTextColor?: string;
  errorText?: string;
  // errorTextStyle?: TextStyle;
  errorTextColor?: string;
  textStyle?: TextStyle;
  value?: string;
  onPressCalendar: () => void;
  selectedDate?:Date;
}

const DateInput: FC<Props> = (props) => {
  const [error, setError] = useState<boolean>(false);
  const [value, setValue] = useState<string>(props.selectedDate ? props.selectedDate.getFullYear() + '-' + ('0' + (props.selectedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + props.selectedDate.getDate()).slice(-2) : '');

  const {
    style,
    label = 'Date picker',
    labelTextStyle = { color: '#000', textAlign: 'left' },
    // labelStyle,
    placeholder = 'YYYY-MM-DD',
    placeholderTextColor,
    // underlineColor = { borderBottomColor: '#000' },
    errorText = 'Invalid Date',
    errorTextColor = '#f00',
    // textStyle,
  } = props;

  useEffect(() => {
    validateDate(value);
  });

  const validateDate = (input: string): void => {
    const validDate = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
    if (validDate.test(input) || input === '') {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleChangeText = (input: string): void => {
    const validNum = /^[0-9]+$/;
    if (validNum.test(input) || input === '') {
      setValue(input);
    }
  };

  return (
    <Container style={style}>
      <StyledLabelContainer>
        <StyledLabel style={labelTextStyle}>{label}</StyledLabel>
      </StyledLabelContainer>

      <StyledRowContainer>
        <StyledRowContent>
          <StyledDateInput
            value={value}
            onChangeText={(input: string): void => {
              handleChangeText(input);
            }}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            editable={false}
          />
        </StyledRowContent>
        <TouchableOpacity onPress={props.onPressCalendar}>
          <Image
            style={{ width: 20, height: 20 }}
            source={require('../__assets__/calendar.png')}
          />
        </TouchableOpacity>
      </StyledRowContainer>

      {error && (
        <StyledErrorContainer>
          <StyledError
            style={[
              { color: errorTextColor },
            ]}
          >{errorText}</StyledError>
        </StyledErrorContainer>
      )}
    </Container>
  );
};

export default DateInput;
