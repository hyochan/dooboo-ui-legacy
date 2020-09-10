import { FlatList, Text, View, ViewStyle } from 'react-native';
import React from 'react';

import CalendarDaysRow from './CalendarDaysRow';
import CalendarMonth from './CalendarMonth';

const convertDateString = (date: Date): string => {
  const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  return dateString;
};

// 월 데이터 배열 구하기
const getMonthList = (
  initMonthDate: Date,
  pastRange = 36,
  futureRange = 36,
): Date[] => {
  const tmpRows: Date[] = [];
  const year = initMonthDate.getFullYear();
  const month = initMonthDate.getMonth();
  for (let i = -pastRange; i <= futureRange; i++) {
    const monthDate = new Date(year, month + i, 1);
    tmpRows.push(monthDate);
  }
  return tmpRows;
};

interface Props<T> {
  onChangeMonth?: (month: Date) => void; // 스와이프 하여 달 변경시 호출
  initDate?: Date; // initial date, if undefined, it's today
  containerStyle?: ViewStyle; // Calendar 컨테이너 스타일
  dayComponent: ({
    date,
    dailyData,
    isCurMonth,
    isToday,
  }: {
    date: Date;
    dailyData: T; // [YYYY-MM-DD]: dailyData
    isCurMonth: boolean;
    isToday: boolean;
  }) => React.ReactElement;
  pastRange?: number; // 과거 월 개월 수
  futureRange?: number; // 미래 월 개월 수

  calendarWidth: number; // 달 표시 width
  // calendarHeight: number;
  // daysRowHeight: number;
  // monthData: MonthData;
  yearMonthComponent?: (monthFirst: Date) => React.ReactElement;
  weekdayFormat?: 'narrow' | 'short';
}
/**
 * Pure Calendar
 * - using FlatList
 * - infinite months
 * - render a month view in renderItem of Flatlist
 * - 일 컴포넌트는 dayComponent(function). props로 받음
 */

function Calendar<T>(props: Props<T>): React.ReactElement {
  // 요일 row height
  // const daysRowHeight = 22;
  // 금월 (시작월) 날짜
  const { initDate = new Date(), pastRange = 36, futureRange = 36 } = props;
  // const [initDate] = React.useState<Date>(props.initDate || new Date());
  // const initMonth = initDate.getMonth() - 1;

  // init month list (data for FlatList)
  const [monthList] = React.useState<Date[]>(
    getMonthList(initDate, pastRange, futureRange),
  );
  const [curMonthFirst, setCurMonthFirst] = React.useState<Date>(initDate);

  // getItemLayout
  const getItemLayout = React.useCallback((data, index) => {
    return {
      length: props.calendarWidth,
      offset: props.calendarWidth * index,
      index,
    };
  }, []);

  const MemoizedCalendarMonth = React.memo(CalendarMonth, (prev, next) => {
    return true;
  });
  // 월 달력 그리기
  const renderMonthCalendar = React.useCallback(
    ({ item, index }): React.ReactElement => {
      return (
        <MemoizedCalendarMonth
          monthDate={item}
          dayComponent={props.dayComponent}
          // calendarHeight={props.calendarHeight - 22}
          calendarWidth={props.calendarWidth}
          style={{
            width: props.calendarWidth,
          }}
          today={initDate}
        />
      );
    },
    [],
  );
  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems, changed }) => {
      if (viewableItems.length === 0) return; // 없는 경우 있음. 그냥 무시
      const { index, isViewable, item, key } = viewableItems[0];
      props.onChangeMonth && props.onChangeMonth(item);
      setCurMonthFirst(item);
    },
    [],
  );
  const renderYearMonth = React.useCallback(
    (monthFirst): React.ReactElement => {
      console.log('>> monthFirst = ', monthFirst);
      if (props.yearMonthComponent) {
        return props.yearMonthComponent(monthFirst);
      } else {
        return <Text>{`${convertDateString(monthFirst)}`}</Text>;
      }
    },
    [],
  );
  return (
    <View
      style={{
        ...props.containerStyle,
      }}>
      {/** Year & Month */}
      <View>{renderYearMonth(curMonthFirst)}</View>
      {/** Days of Calendar */}
      <CalendarDaysRow
        calendarWidth={props.calendarWidth}
        style={{
          width: props.calendarWidth,
          height: 22,
        }}
        weekdayFormat={props.weekdayFormat}
      />
      <FlatList
        // onLayout={onLayout}
        // ref={(c) => this.listView = c}
        // scrollEventThrottle={1000}
        style={{
          width: props.calendarWidth,
        }}
        data={monthList}
        // snapToAlignment='start'
        // snapToInterval={this.calendarHeight}
        removeClippedSubviews={true}
        initialNumToRender={1}
        windowSize={2}
        horizontal={true}
        pagingEnabled={true}
        onViewableItemsChanged={onViewableItemsChanged} // onViewableItemsChanged}
        // viewabilityConfig={viewConfigRef.current}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={renderMonthCalendar}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index): string => {
          return `${item.getFullYear()} + ${item.getMonth()}`;
        }}
        initialScrollIndex={pastRange}
        getItemLayout={getItemLayout}
        // onEndReachedThreshold={this.props.onEndReachedThreshold}
        // onEndReached={this.props.onEndReached}
        // keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
      />
      {/* {this.renderStaticHeader()} */}
    </View>
  );
}
export default Calendar;
