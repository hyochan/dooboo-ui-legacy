import { Modal, Text, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';

import Calendar from './Calendar/Calendar';
import CalendarDate from './Calendar/CalendarDate';
import styled from 'styled-components/native';

const ModalContainer = styled.TouchableWithoutFeedback``;
const ModalContentsWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: 'rgba(0,0,0,0.4)';
`;
const CalendarContainer = styled.TouchableWithoutFeedback``;
const CalendarContentsWrapper = styled.View`
  background-color: white;
  border-radius: 6px;
  align-items: center;
  padding: 10px;
`;

interface Props {
  visible: boolean;
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
  containerStyle?: ViewStyle;
  onBackdropPress?: () => void;
  calendarWidth?: number;
  weekdayFormat?: 'narrow' | 'short';
}

const PickerCalendar: FC<Props> = (props) => {
  // const [pickerOpen, setPickerOpen] = React.useState<boolean>(false);
  // const [contentWidth, setContentWidth] = React.useState<number>(210);
  // const [contentHeight, setContentHeight] = React.useState<number>(210);
  const { calendarWidth = 300 } = props;
  return (
    <Modal visible={props.visible} transparent={true} animationType={'fade'}>
      <ModalContainer onPress={props.onBackdropPress}>
        <ModalContentsWrapper pointerEvents={'auto'}>
          <CalendarContainer>
            <CalendarContentsWrapper style={props.containerStyle}>
              <Calendar
                calendarWidth={calendarWidth}
                // calendarHeight={calendarHeight - 40}
                onChangeMonth={(month): void => {
                  console.log('Changed Month : ', month);
                }}
                yearMonthComponent={(monthFirst: Date): React.ReactElement => {
                  return (
                    <View
                      style={{
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                      }}>
                      <Text>{`${monthFirst.getFullYear()}년 ${
                        monthFirst.getMonth() + 1
                      }월`}</Text>
                    </View>
                  );
                }}
                initDate={props.selectedDate}
                containerStyle={{
                  overflow: 'hidden',
                }}
                dayComponent={({
                  date,
                  dailyData,
                  isCurMonth,
                  isToday,
                  style,
                }: {
                  date: Date;
                  dailyData: { [key: string]: any };
                  isCurMonth: boolean;
                  isToday: boolean;
                  style: ViewStyle;
                }): React.ReactElement => {
                  return (
                    <CalendarDate
                      key={date.getDate()}
                      onPress={(date: Date): void => {
                        props.onSelectDate(date);
                      }}
                      date={date}
                      style={{
                        ...style,
                      }}
                      dailyData={dailyData}
                      isCurMonth={isCurMonth}
                      isToday={isToday}
                    />
                  );
                }}
                weekdayFormat={props.weekdayFormat}
              />
            </CalendarContentsWrapper>
          </CalendarContainer>
        </ModalContentsWrapper>
      </ModalContainer>
    </Modal>
  );
};

export default PickerCalendar;
