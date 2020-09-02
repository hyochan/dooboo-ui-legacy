import { View, ViewStyle } from 'react-native';

import React from 'react';
import styled from 'styled-components/native';

const DateRound = styled.View`
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
`;
const DateText = styled.Text`
  /* font-family: NotoSansCJKkr-Regular; */
  font-size: 12px;
  color: #565656;
  /* line-height: 16; */
`;

const StyledTouchable = styled.TouchableOpacity``;
// 날짜 영역
const DateRow = styled.View`
  width: 100%;
  height: 25px;
  align-items: center;
  justify-content: center;
`;

interface Props<T> {
  onPress?: (date: Date) => void;
  style?: ViewStyle;
  date: Date;
  isCurMonth?: boolean;
  dailyData?: T;
  isToday?: boolean;
}

function CalendarDate<T>(props: Props<T>): React.ReactElement {
  const dateColor = props.date.getDay() === 0 ? 'red' : 'black';
  const dateOpacity = props.isCurMonth ? 1 : 0.6;

  const todayStyle = props.isToday
    ? { borderRadius: 12, backgroundColor: '#efefef' }
    : { borderRadius: 0, backgroundColor: 'white' };
  return (
    <StyledTouchable
      onPress={(): void => {
        props.onPress && props.onPress(props.date);
      }}>
      <View style={{ ...props.style }}>
        <DateRow
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <DateRound
            style={{ ...props.style, opacity: dateOpacity, ...todayStyle }}>
            <DateText style={{ alignSelf: 'center', color: dateColor }}>
              {props.date.getDate()}
            </DateText>
          </DateRound>
        </DateRow>
        {/* DateData Area */}
      </View>
    </StyledTouchable>
  );
}
// export default React.memo(CalendarDate);
export default CalendarDate;
