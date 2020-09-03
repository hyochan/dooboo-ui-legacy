import {
  Image,
  Modal,
  Platform,
  Text,
  TextStyle,
  TouchableHighlight,
  ViewStyle,
  TouchableOpacity,
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
  border-bottom-color: #79b3f5;
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
  labelStyle?: void;
  placeholder?: string;
  placeholderTextColor?: void;
  underlineColor?: void;
  errorText?: string;
  errorTextStyle?: void;
  textStyle?: void;
  value?: string;
  onPressCalendar: () => void;
}

const DateInput: FC<Props> = (props) => {
  const [error, setError] = useState(false);
  const [date, setDate] = useState<string>('');
  const [show, setShow] = useState(false);

  const {
    style,
    label = 'Date picker',
    labelTextStyle = { color: '#000', textAlign: 'left' },
    labelStyle,
    placeholder = 'YYYY-MM-DD',
    placeholderTextColor,
    underlineColor = { borderBottomColor: '#000' },
    errorText = 'Invalid Date',
    errorTextStyle,
    textStyle,
    value = '2020-08-29',
  } = props;

  useEffect(() => {
    validateDate(date);
  });

  const validateDate = (input: string): void => {
    const validDate = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;

    if (validDate.test(input) || input === '') {
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleInput = (input: string): void => {
    const validNum = /^[0-9]+$/;
    if (validNum.test(input) || input === '') {
      setDate(input);
    }
  };

  return (
    <Container style={style}>
      <Text>{date}</Text>
      <StyledLabelContainer>
        <StyledLabel style={labelTextStyle}>{label}</StyledLabel>
      </StyledLabelContainer>

      <StyledRowContainer style={underlineColor}>
        <StyledRowContent>
          <StyledDateInput
            value={date}
            onChangeText={(input: string): void => handleInput(input)}
            placeholder={placeholder}
            editable={Platform.OS === 'web'}
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
          <StyledError>{errorText}</StyledError>
        </StyledErrorContainer>
      )}
      {/*
      <Modal visible={show} animationType="slide" transparent={true}>
        <Container style={{ backgroundColor: '#79B3F5' }}>
          <Text>Calendar</Text>
          <TouchableHighlight
            onPress={(): void => {
              setShow(false);
            }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </Container>
      </Modal> */}
    </Container>
  );
};

export default DateInput;
