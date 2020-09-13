import React from 'react';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

const DaysRow = styled.View`
  width: 100%;
  height: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #efefef;
`;

const DayColumn = styled.View`
  width: 30px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const DayTitle = styled.Text`
  font-size: 12px;
  color: #565656;
  line-height: 16px;
`;

interface Props {
  style?: ViewStyle;
  calendarWidth: number;
  weekdayFormat?: 'narrow' | 'short';
}

/**
 * render weekdays
 */
function CalendarWeekDays(props: Props): React.ReactElement {
  const weekDays: string[] = [];

  for (let idx = 0; idx <= 6; idx++) {
    const matchMonth = new Date(2020, 8, 6 + idx);
    const weekDay = matchMonth.toLocaleString('default', {
      weekday: props.weekdayFormat || 'narrow', // 'narrow',
    });

    weekDays.push(weekDay);
  }

  return (
    <DaysRow style={{ ...props.style }}>
      {weekDays.map((day, index) => {
        const textColor = index === 0 ? '#ff424c' : '#565656';

        return (
          <DayColumn style={{ width: props.calendarWidth / 7 }} key={index}>
            <DayTitle style={{ color: textColor }}>{day}</DayTitle>
          </DayColumn>
        );
      })}
    </DaysRow>
  );
}

export default CalendarWeekDays;
