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
  calendarHeight?: number;
}

const PickerCalendar: FC<Props> = (props) => {
  // const [selectedDate, setSelectedDate] = React.useState<Date>();
  // const [pickerOpen, setPickerOpen] = React.useState<boolean>(false);
  // const [contentWidth, setContentWidth] = React.useState<number>(210);
  // const [contentHeight, setContentHeight] = React.useState<number>(210);
  const { calendarWidth = 300, calendarHeight = 450 } = props;
  return (
    <Modal visible={props.visible} transparent={true} animationType={'fade'}>
      <ModalContainer onPress={props.onBackdropPress}>
        <ModalContentsWrapper pointerEvents={'auto'}>
          <CalendarContainer>
            <CalendarContentsWrapper style={props.containerStyle}>
              <Calendar
                calendarWidth={calendarWidth}
                calendarHeight={calendarHeight}
                onChangeMonth={(month): void => {
                  console.log('Changed Month : ', month);
                }}
                yearMonthComponent={(monthFirst: Date): React.ReactElement => {
                  return (
                    <View
                      style={{
                        height: 50,
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
                initDate={new Date()}
                containerStyle={{
                  // width: screenWidth,
                  // height: calendarHeight,
                  overflow: 'hidden',
                  borderWidth: 0,
                  borderColor: 'red',
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
              />
            </CalendarContentsWrapper>
          </CalendarContainer>
        </ModalContentsWrapper>
      </ModalContainer>
    </Modal>
  );
};

export default PickerCalendar;
