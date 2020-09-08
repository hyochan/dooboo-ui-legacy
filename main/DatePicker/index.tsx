import React from 'react';
import {
  DatePickerAndroidOpenOptions,
  Dimensions,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';

import DateInput from './DateInput';
import PickerCalendar from './PickerCalendar';

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
  labelTextStyle?: TextStyle;
  errorText?: string;
  errorTextStyle?:TextStyle;
  dateTextStyle?: TextStyle;
  selectedDate?:Date;
}

const { width, height } = Dimensions.get('window');

const DatePicker = (props: Props): React.ReactElement => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(props.selectedDate || new Date());
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
        containerStyle={{ width: 300, height: 350 }}
        // calendarWidth={300}
        // calendarHeight={450}
      />
    </Container>
  );
};

export { DatePicker };
