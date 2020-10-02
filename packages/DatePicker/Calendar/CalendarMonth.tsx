import React, { PropsWithChildren, ReactElement } from 'react';
import { View, ViewStyle } from 'react-native';

const convertDateString = (date: Date): string => {
  const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

  return dateString;
};

interface Props<T> {
  monthDate: Date; // first Date of month
  style?: ViewStyle;
  renderDay: ({
    date,
    dailyData,
    isCurrentMonth,
    isToday,
    style,
  }: {
    date: Date;
    dailyData?: T;
    isCurrentMonth: boolean;
    isToday: boolean;
    style?: ViewStyle;
  }) => React.ReactElement;
  calendarWidth: number;
  today: Date; // init Date
  dailyCalData?: { [key: string]: T }; // key format : YYYY-MM-DD
}

/**
 * Month component
 */
function CalendarMonth<T>(props: PropsWithChildren<Props<T>>): ReactElement {
  const thisYear = props.monthDate.getFullYear(); // year number of this month's calendar
  const thisMonth = props.monthDate.getMonth(); // month number of this month's calendar

  const startDate = new Date(
    props.monthDate.getFullYear(),
    props.monthDate.getMonth(),
    1,
  );

  startDate.setDate(startDate.getDate() - startDate.getDay());

  const sYear = startDate.getFullYear();
  const sMonth = startDate.getMonth();
  const sDate = startDate.getDate();

  const datesOfMonth: Date[] = []; // Dates to be displayed on this month's calendar

  for (let i = 0; i < 42; i++) {
    const date = new Date(sYear, sMonth, sDate + i);

    datesOfMonth.push(date);
  }

  // render a week
  const renderWeek = (dates: Date[], key: number): React.ReactElement => {
    const week = dates.map((date) => {
      const isCurMonth =
        date.getFullYear() === thisYear && date.getMonth() === thisMonth;

      return (
        <View key={date.getDate()}>
          {props.renderDay({
            date: date,
            dailyData:
              props.dailyCalData &&
              props.dailyCalData[`${convertDateString(date)}`],
            isCurrentMonth: isCurMonth,
            isToday: convertDateString(props.today) === convertDateString(date),
            style: {
              width: props.calendarWidth / 7,
              height: props.calendarWidth / 7,
            },
          })}
        </View>
      );
    });

    return (
      <View
        key={key}
        style={{
          flexDirection: 'row',
          width: props.calendarWidth,
          justifyContent: 'space-between',
          paddingHorizontal: 0,
        }}>
        {week}
      </View>
    );
  };

  const weeks: React.ReactElement[] = [];

  for (let week = 0; week < 6; week++) {
    const week = renderWeek(datesOfMonth.splice(0, 7), weeks.length);

    weeks.push(week);
  }

  return (
    <>
      <View
        style={{
          ...props.style,
        }}>
        {weeks}
      </View>
    </>
  );
}

export default CalendarMonth;
