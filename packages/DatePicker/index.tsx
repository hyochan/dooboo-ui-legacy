import {TextStyle, ViewStyle} from 'react-native';
import DateInput from './DateInput';
import PickerCalendar from './PickerCalendar';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: center;
`;

interface Props {
  onChangeDate?: (date: Date) => void;
  dateInputStyle?: ViewStyle;
  dateInputTextStyle?: TextStyle;
  calendarStyle?: ViewStyle;
  style?: ViewStyle;
  label?: string;
  labelTextStyle?: TextStyle;
  locale?: string;
  errorText?: string;
  errorTextStyle?: TextStyle;
  dateTextStyle?: TextStyle;
  selectedDate?: Date;
  weekdayFormat?: 'narrow' | 'short';
  titleContent?: (monthFirstDate: Date) => React.ReactElement;
}

const DatePicker = (props: Props): React.ReactElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    props.selectedDate || new Date(),
  );

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
        labelTextStyle={props.labelTextStyle}
        onPressCalendar={(): void => {
          setCalendarVisible(true);
        }}
        errorText={props.errorText}
        errorTextStyle={props.errorTextStyle}
        dateTextStyle={props.dateTextStyle}
      />
      <PickerCalendar
        visible={calendarVisible}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
        onBackdropPress={(): void => {
          setCalendarVisible(false);
        }}
        containerStyle={{width: 300, height: 350}}
        locale={props.locale}
        weekdayFormat={props.weekdayFormat}
        titleContent={props.titleContent}
      />
    </Container>
  );
};

export {DatePicker};
