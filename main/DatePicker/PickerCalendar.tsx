import {
  Modal,
  SafeAreaView,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC } from 'react';

import Calendar from './Calendar/Calendar';
import CalendarDate from './Calendar/CalendarDate';
import DateInput from './DateInput';
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
  border-width: 5px;
  border-color: blue;
`;
const CalendarContainer = styled.TouchableWithoutFeedback``;
const CalendarContentsWrapper = styled.View`
  background-color: white;
  border-radius: 10px;
  align-items: center;
  padding: 10px;
  border-width: 1px;
  border-color: red;
  width: 300;
  height: 300;
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

  return (
    <Modal visible={props.visible} transparent={true} animationType={'fade'}>
      <ModalContainer
        style={props.containerStyle}
        onPress={props.onBackdropPress}>
        <ModalContentsWrapper pointerEvents={'auto'}>
          <CalendarContainer>
            <CalendarContentsWrapper>
              <Calendar
                calendarHeight={210}
                calendarWidth={210}
                onChangeMonth={(month): void => {
                  console.log('Changed Month : ', month);
                }}
                initDate={new Date()}
                containerStyle={{
                  // width: screenWidth,
                  // height: calendarHeight,
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: 'red',
                }}
                dayComponent={({
                  date,
                  dailyData,
                  isCurMonth,
                  isToday,
                }: {
                  date: Date;
                  dailyData: { [key: string]: any };
                  isCurMonth: boolean;
                  isToday: boolean;
                }): React.ReactElement => {
                  return (
                    <CalendarDate
                      onPress={(date: Date): void => {
                        console.log('Pressed a Date : ', date.toLocaleString());
                      }}
                      date={date}
                      style={{
                        width: 40,
                        // flex: 1,
                        height: 35,
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
              <TempText>{'가나다라..'}</TempText>
              <TouchableOpacity>
                <TempText>{'123123123'}</TempText>
              </TouchableOpacity>
            </CalendarContentsWrapper>
          </CalendarContainer>
        </ModalContentsWrapper>
      </ModalContainer>
    </Modal>
  );
};

export default PickerCalendar;
