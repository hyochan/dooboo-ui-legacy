import { Modal, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';

import Calendar from './Calendar/Calendar';
import CalendarDate from './Calendar/CalendarDate';
import styled from 'styled-components/native';

const ModalContainer = styled.TouchableWithoutFeedback`
  /* flex: 1; */
  /* align-items: center;
  justify-content: center;
  background-color: 'rgba(0,0,0,0.4)';
  border-width: 1px;
  border-color: blue; */
`;
const ModalContentsWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: 'rgba(0,0,0,0.4)';
  border-width: 0px;
  border-color: blue;
`;
const CalendarContainer = styled.TouchableWithoutFeedback``;
const CalendarContentsWrapper = styled.View`
  background-color: white;
  border-radius: 10px;
  align-items: center;
  padding: 10px;
  border-width: 0px;
  border-color: red;
  width: 210px;
  height: 250px;
`;
const TempText = styled.Text``;

interface Props {
  visible: boolean;
  selectedDate?: Date;
  onSelectDate: (date: Date) => void;
  containerStyle?: ViewStyle;
  onBackdropPress?: () => void;
}

const PickerCalendar: FC<Props> = (props) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>();
  const [pickerOpen, setPickerOpen] = React.useState<boolean>(false);
  const [contentWidth, setContentWidth] = React.useState<number>(210);
  const [contentHeight, setContentHeight] = React.useState<number>(210);
  return (
    <Modal visible={props.visible} transparent={true} animationType={'fade'}>
      <ModalContainer onPress={props.onBackdropPress}>
        <ModalContentsWrapper pointerEvents={'auto'}>
          <CalendarContainer>
            <CalendarContentsWrapper
              style={props.containerStyle}
              onLayout={(e): void => {
                setContentWidth(e.nativeEvent.layout.width);
                setContentHeight(e.nativeEvent.layout.height);
              }}>
              <Calendar
                calendarWidth={contentWidth}
                calendarHeight={contentHeight}
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
                        backgroundColor: 'yellow',
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
                      onPress={(date: Date): void => {
                        console.log('Pressed a Datehhh : ', date.toLocaleString());
                        props.onSelectDate(date);
                      }}
                      date={date}
                      style={{
                        ...style,
                        // width: 30,
                        // flex: 1,
                        // height: 35,
                        borderBottomWidth: 1,
                        borderBottomColor: '#efefef',
                      }}
                      dailyData={dailyData}
                      isCurMonth={isCurMonth}
                      // datas={dailyCalDatas[date.format('YYYYMMDD')]}
                      isToday={isToday}
                    />
                  );
                }}
              />
              {/* <TempText>{'가나다라..'}</TempText>
              <TouchableOpacity>
                <TempText>{'123123123'}</TempText>
              </TouchableOpacity> */}
            </CalendarContentsWrapper>
          </CalendarContainer>
        </ModalContentsWrapper>
      </ModalContainer>
    </Modal>
  );
};

export default PickerCalendar;
