import {
  Image,
  Platform,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';

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
  ${Platform.OS === 'web' && {'outline-style': 'none'}}
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
  placeholder?: string;
  placeholderTextColor?: string;
  errorText?: string;
  errorTextStyle?: TextStyle;
  dateTextStyle?: TextStyle;
  value?: string;
  onPressCalendar: () => void;
  selectedDate?: Date;
}

const convertDateString = (date: Date): string => {
  const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

  return dateString;
};

const DateInput: FC<Props> = (props) => {
  const [error, setError] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const validateDate = (input: string): void => {
    const validDate = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;

    if (validDate.test(input) || input === '') setError(false);
    else setError(true);
  };

  const {
    label = '',
    labelTextStyle = {color: '#000', textAlign: 'left'},
    placeholder = 'YYYY-MM-DD',
    placeholderTextColor,
    errorText = 'Invalid Date',
    errorTextStyle = {color: '#F00', textAlign: 'left'},
    dateTextStyle,
    selectedDate,
    onPressCalendar,
  } = props;

  useEffect(() => {
    setValue(convertDateString(selectedDate || new Date()));
  }, [selectedDate]);

  useEffect(() => {
    validateDate(value);
  });

  return (
    <Container>
      <StyledLabelContainer>
        <StyledLabel style={labelTextStyle}>{label}</StyledLabel>
      </StyledLabelContainer>

      <StyledRowContainer>
        <StyledRowContent>
          <StyledDateInput
            value={value}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={(input: string): void => {
              setValue(input);
            }}
            style={dateTextStyle}
          />
        </StyledRowContent>
        <TouchableOpacity onPress={onPressCalendar}>
          <Image
            style={{width: 20, height: 20}}
            source={require('./assets/calendar.png')}
          />
        </TouchableOpacity>
      </StyledRowContainer>

      {error && (
        <StyledErrorContainer>
          <StyledError style={errorTextStyle}>{errorText}</StyledError>
        </StyledErrorContainer>
      )}
    </Container>
  );
};

export default DateInput;
