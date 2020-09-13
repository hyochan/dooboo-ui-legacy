import { FlatList, Text, View, ViewStyle } from 'react-native';

import CalendarMonth from './CalendarMonth';
import CalendarWeekDays from './CalendarWeekDays';
import React from 'react';

const convertDateString = (date: Date): string => {
  const dateString = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];
  return dateString;
};

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

interface Props {
  onChangeMonth?: (month: Date) => void; // called when changed month
  initDate?: Date; // initial date, if undefined, it's today
  containerStyle?: ViewStyle;
  renderDay: ({
    date,
    isCurrentMonth,
    isToday,
    style,
  }: {
    date: Date;
    isCurrentMonth: boolean;
    isToday: boolean;
    style?: ViewStyle;
  }) => React.ReactElement;
  pastRange?: number; // Number of past months displayed on the calendar
  futureRange?: number; // Number of future months displayed on the calendar
  calendarWidth: number; // calendar width
  titleContent?: (monthFirst: Date) => React.ReactElement;
  weekdayFormat?: 'narrow' | 'short';
}

/**
 * Pure Calendar
 * - using FlatList
 * - infinite months
 * - render a month view in renderItem of Flatlist
 * - renderDay(function) render a day of month
 */
function Calendar(props: Props): React.ReactElement {
  // init date for calendar
  const { initDate = new Date(), pastRange = 36, futureRange = 36 } = props;

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

  const MemoizedCalendarMonth = React.memo(CalendarMonth, () => {
    return true;
  });

  // render a month
  const renderMonthCalendar = React.useCallback(
    ({ item }): React.ReactElement => {
      return (
        <MemoizedCalendarMonth
          monthDate={item}
          renderDay={props.renderDay}
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

  const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
    if (viewableItems.length === 0) return; // 없는 경우 있음. 그냥 무시
    const { item } = viewableItems[0];
    props.onChangeMonth && props.onChangeMonth(item);
    setCurMonthFirst(item);
  }, []);

  const renderYearMonth = React.useCallback(
    (monthFirst): React.ReactElement => {
      if (props.titleContent) {
        return props.titleContent(monthFirst);
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
      <CalendarWeekDays
        calendarWidth={props.calendarWidth}
        style={{
          width: props.calendarWidth,
          height: 22,
        }}
        weekdayFormat={props.weekdayFormat}
      />
      <FlatList
        style={{
          width: props.calendarWidth,
        }}
        data={monthList}
        removeClippedSubviews={true}
        initialNumToRender={1}
        windowSize={2}
        horizontal={true}
        pagingEnabled={true}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={renderMonthCalendar}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item): string => {
          return `${item.getFullYear()} + ${item.getMonth()}`;
        }}
        initialScrollIndex={pastRange}
        getItemLayout={getItemLayout}
      />
    </View>
  );
}

export default Calendar;
