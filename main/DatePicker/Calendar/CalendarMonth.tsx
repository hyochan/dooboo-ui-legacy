import React, { PropsWithChildren, ReactElement } from 'react';
import { View, ViewStyle } from 'react-native';

const convertDateString = (date: Date): string => {
  const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  return dateString;
};

interface Props<T> {
  monthDate: Date; // 렌더링 할 월의 날짜 (매월 1일)
  style?: ViewStyle; // 스타일
  dayComponent: ({
    date,
    dailyData,
    isCurMonth,
    isToday,
  }: {
    date: Date;
    dailyData: T;
    isCurMonth: boolean;
    isToday: boolean;
  }) => React.ReactElement;
  calendarWidth: number; // 달력 표시 width
  calendarHeight: number;
  today: Date; // init Date
  dailyCalData?: { [key: string]: T }; // key format : YYYY-MM-DD
}
/**
 * Month component
 */

function CalendarMonth<T>(props: PropsWithChildren<Props<T>>): ReactElement {
  // 금월 (시작월) 날짜
  // const monthDate = props.monthDate ? moment(props.monthDate) : moment();
  // 금월 달력의 시작 날짜 (= 금월 1일의 요일 수 만큼 뺌)
  console.log('>>>> calendar width in CalendarMonth = ', props.calendarWidth);
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

  // props.today.getMonth() === thisMonth &&
  // console.log('>> startDate = ', startDate.toLocaleString());
  const datesOfMonth: Date[] = []; // Dates to be displayed on this month's calendar
  for (let i = 0; i < 42; i++) {
    const date = new Date(sYear, sMonth, sDate + i);
    datesOfMonth.push(date);
  }
  // 1 주 렌더링
  const renderWeek = (dates: Date[], key): React.ReactElement => {
    // props.today.getMonth() === thisMonth &&
    //   console.log('>> startDate = ', dates);
    const week = dates.map((date, index) => {
      const isCurMonth =
        date.getFullYear() === thisYear && date.getMonth() === thisMonth;
      return props.dayComponent({
        date: date,
        dailyData:
          props.dailyCalData &&
          props.dailyCalData[`${convertDateString(date)}`],
        isCurMonth: isCurMonth,
        isToday: convertDateString(props.today) === convertDateString(date),
        style: {
          width: props.calendarWidth / 7,
          height: '100%',
        },
      });
    });
    return (
      <View
        key={key}
        style={{
          flexDirection: 'row',
          width: props.calendarWidth,
          height: props.calendarHeight / 6,
          justifyContent: 'space-between',
          paddingHorizontal: 0,
          borderWidth: 0,
          borderColor: 'blue',
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
        {/* {this.renderStaticHeader()} */}
      </View>
    </>
  );
}
export default CalendarMonth;
