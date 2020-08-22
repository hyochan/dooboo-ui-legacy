import React, { FC } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

import DateInput from './DateInput';
import PickerCalendar from './PickerCalendar';
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
}

const DatePicker = (props: Props): React.ReactElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [pickerOpen, setPickerOpen] = React.useState<boolean>(false);

  const onSelectDate = (date: Date): void => {
    setSelectedDate(date);
    setPickerOpen(false);
    props.onChangeDate && props.onChangeDate(date);
  };
  return (
    <Container style={props.dateInputStyle}>
      <DateInput style={props.dateInputStyle} selectedDate={selectedDate} />
      {/* <PickerCalendar
        open={pickerOpen}
        selectedDate={selectedDate}
        onSelectDate={onSelectDate}
      /> */}
    </Container>
  );
};

export { DatePicker };
