import {
  Dimensions,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { FC } from 'react';

import DateInput from './DateInput';
import PickerCalendar from './PickerCalendar';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: center;
`;
const DateText = styled.Text``;

interface Props {
  onChangeDate?: (date: Date) => void;
  dateInputStyle?: ViewStyle;
  dateInputTextStyle?: TextStyle;
  calendarStyle?: ViewStyle;
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

const { width, height } = Dimensions.get('window');

const DatePicker = (props: Props): React.ReactElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [calendarVisible, setCalendarVisible] = React.useState<boolean>(false);

  const onSelectDate = (newDate: Date): void => {
    setSelectedDate(newDate);
    setCalendarVisible(false);
    props.onChangeDate && props.onChangeDate(newDate);
  };
  return (
    <Container style={props.dateInputStyle}>
      <DateInput
        style={props.dateInputStyle}
        selectedDate={selectedDate}
        label={props.label}
        placeholder={props.placeholder}
        onPressCalendar={(): void => {
          setCalendarVisible(true);
        }}
      />
      <PickerCalendar
        visible={calendarVisible}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        onBackdropPress={(): void => {
          setCalendarVisible(false);
        }}
      />
      {/* <TouchableOpacity
        onPress={(): void => {
          setCalendarVisible(true);
        }}>
        <DateText>{'캘린더 표시'}</DateText>
      </TouchableOpacity>
    </Container>
  );
};

export { DatePicker };
