import { EditText, EditTextInputType } from '../EditText';
import { Image, Modal, Platform, Text, TextInput, TouchableHighlight, ViewStyle } from 'react-native';
import React, { FC, useState } from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: center;
`;

const StyledLabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin:2px 0;
`;

const StyledLabel = styled.Text`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #b9b9c4;
`;

const StyledRowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-color: blue;
  border-bottom-width: 2px;
  margin: 0 0 2px 0;
  padding : 2px;
  width:70%;
`;

const StyledRowContent = styled.View`
  align-items: center;
  width:80%;
`;

const StyledDateInput = styled.TextInput`
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 15px;
  font-weight: 500;
  flex: 1;
  ${Platform.OS === 'web' && { 'outline-style': 'none' }}
`;

const StyledIcon = styled.TouchableHighlight`
  width:20%;
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
  labelTextStyle?: void;
  labelStyle?: void;
  placeholder?: string;
  placeholderTextColor?:void;
  underlineColor?:void;
  errorText?:string;
  errorTextStyle?:void;
  textStyle?:void;
  value?:string;
}

const DateInput: FC<Props> = (props) => {
  const [error, setError] = useState(false);
  const [date, setDate] = useState('');
  const [show, setShow] = useState(false);

  const {
    style = { color: 'blue' },
    label = 'Date picker',
    labelTextStyle,
    labelStyle,
    placeholder = 'YYYY-MM-DD',
    placeholderTextColor,
    underlineColor,
    errorText = 'Invalid Date',
    errorTextStyle,
    textStyle,
    value = '2020-08-29',
  } = props;

  const validateDate = (date):void => {
    const valid = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
    setDate(date);
    if (valid.test(date)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Container style={style}>

      <StyledLabelContainer>

        <StyledLabel style={style}>{label}</StyledLabel>

      </StyledLabelContainer>

      <StyledRowContainer>

        <StyledRowContent>
          <StyledDateInput
            value={date}
            onChangeText={(input):void => validateDate(input)}
            // onSubmitEditing={(input) => validateDate(input)}
            placeholder={placeholder}
          />
        </StyledRowContent>

        <StyledIcon onPress={():void => { setShow(true); }}>
          <Image style={{ width: 40, height: 40 }} source={require('../__assets__/calendar.png')}/>
        </StyledIcon>

      </StyledRowContainer>

      {error &&
      <StyledErrorContainer>
        <StyledError>{errorText}</StyledError>
      </StyledErrorContainer>
      }

      <Modal visible={show} animationType="slide" transparent={true} >
        <Container style={{ backgroundColor: '#79B3F5' }}>
          <Text>Calendar</Text>
          <TouchableHighlight onPress={():void => { setShow(false); }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </Container>
      </Modal>
    </Container>
  );
};

export default DateInput;
