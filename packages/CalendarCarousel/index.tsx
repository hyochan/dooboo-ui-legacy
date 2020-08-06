import 'intl';
import 'intl/locale-data/jsonp/en';

import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { Fragment, PropsWithChildren, ReactElement, useEffect, useRef, useState } from 'react';

interface Style {
  container: ViewStyle;
  headerStyle: ViewStyle;
  arrowText: TextStyle;
  titleContainer: ViewStyle;
  titleText: TextStyle;
  yearText: TextStyle;
  weekdayStyle: ViewStyle;
  weekdayText: TextStyle;
  dayContainer: ViewStyle;
  otherDaysView: ViewStyle;
  otherDaysText: TextStyle;
  currentDayView: ViewStyle;
  currentDayText: TextStyle;
  notActiveView: ViewStyle;
  notActiveText: TextStyle;
  activeView: ViewStyle;
  activeText: TextStyle;
  markView: ViewStyle;
  mark: ViewStyle;
  eventContainer: ViewStyle;
  eventText: TextStyle;
  selectedMarkView: ViewStyle;
  dayEvent: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    width: 330,
    height: 388,
    paddingTop: 40,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  arrowText: {
    color: 'royalblue',
    fontSize: 30,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    width: 300,
  },
  yearText: {
    fontSize: 12,
    textAlign: 'center',
    justifyContent: 'center',
  },
  weekdayStyle: {
    flexDirection: 'row',
  },
  weekdayText: {
    color: '#4F4F4F',
    fontSize: 20,
    textAlign: 'center',
  },
  dayContainer: {
    width: 330,
    height: 338,
  },
  otherDaysView: {
    width: 47,
    height: 47,
    paddingTop: 13.5,
  },
  otherDaysText: {
    color: 'lightgray',
    textAlign: 'center',
  },
  currentDayView: {
    borderRadius: 50,
    backgroundColor: '#109CF1',
    width: 47,
    height: 47,
    alignItems: 'center',
    paddingTop: 13.5,
  },
  currentDayText: {
    color: 'white',
    textAlign: 'center',
  },
  notActiveView: {
    width: 47,
    height: 47,
    paddingTop: 13.5,
    alignItems: 'center',
  },
  notActiveText: {
    textAlign: 'center',
  },
  activeView: {
    width: 47,
    height: 47,
    paddingTop: 13.5,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#F0F8FD',
  },
  activeText: {
    textAlign: 'center',
    color: '#109CF1',
  },
  markView: {
    paddingTop: 13.5,
    alignItems: 'center',
    width: 47,
    height: 47,
  },
  mark: {
    width: 4,
    height: 4,
    borderRadius: 50,
    backgroundColor: '#109CF1',
  },
  eventContainer: {
    width: 320,
    height: 50,
    backgroundColor: '#109CF1',
    borderRadius: 30,
    paddingTop: 15,
    flexDirection: 'row',
  },
  eventText: {
    color: 'white',
    fontWeight: '600',
    paddingLeft: 30,
    fontSize: 14,
  },
  selectedMarkView: {
    width: 47,
    height: 47,
    paddingTop: 13.5,
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#F0F8FD',
  },
  dayEvent: {
    fontWeight: '900',
    paddingLeft: 25,
    color: 'white',
  },
});

interface Props<T> {
  date?: Date;
  onDateChanged?: (date: Date) => void;
  selectedDate?: Date;
  selectDate?: (date: Date) => void;
  markedDayEvents?: any;
}
function CalendarCarousel<T>({
  date = new Date(), onDateChanged, selectDate, selectedDate, markedDayEvents,
}: PropsWithChildren<Props<T>>): ReactElement {
  const [currentDate, setCurrentDate] = useState<Date>(date);
  const scrollRef = useRef<ScrollView>(null);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const [layoutWidth, setLayoutWidth] = useState<number>(330);

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
  };

  const changeMonth = (toPrevMonth?: boolean): void => {
    if (toPrevMonth) {
      const update = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate(),
      );

      setCurrentDate(update);
      return onDateChanged?.(update);
    }

    const update = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    );

    setCurrentDate(update);
    return onDateChanged?.(update);
  };

  const renderCalendar = (currentDate: Date): ReactElement => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
    const monthName = formatter.format(prevMonth);
    const weekdays = [];
    const currentMonthLastDate = new Date(year, month + 1, 0).getDate();
    const firstWeekdayOfMonth = new Date(year, month, 1).getDay();
    const lastWeekdayOfMonth = new Date(year, month, currentMonthLastDate).getDay();

    for (let idx = 0; idx <= 6; idx++) {
      const matchMonth = new Date(2020, 5, idx);
      const weekDay = matchMonth.toLocaleString('default', { weekday: 'narrow' });
      weekdays.push(
        <View style={{ width: 47.14 }} key={idx}>
          <Text style={styles.weekdayText}>{weekDay}</Text>
        </View>,
      );
    }

    const prevDates = [];
    for (let idx = 0; idx < firstWeekdayOfMonth; idx++) {
      const date = new Date(year, month, 0);
      date.setDate(date.getDate() - idx);
      prevDates.unshift(date);
    }

    const dates = [];
    for (let d = 1; d <= currentMonthLastDate; d++) {
      dates.push(new Date(year, month, d));
    }

    const nextDates = [];
    if (6 - lastWeekdayOfMonth >= 1) {
      for (let idx = 1; idx <= 6 - lastWeekdayOfMonth; idx++) {
        nextDates.push(new Date(year, month + 1, idx));
      }
    }

    const calendarDates = [...prevDates, ...dates, ...nextDates];

    const renderDayEvents = (): ReactElement[] => {
      return markedDayEvents.map((markedDayEvent, i) => {
        if (markedDates[i] === eventSwitch && markedMonths.includes(month)) {
          return <View style = {styles.eventContainer} key ={i}>
            <Text style= {styles.dayEvent}>{markedDayEvents[i].selectedEventDate.getDate()}</Text>
            <Text style = {styles.eventText}>{markedDayEvents[i].events}</Text>
          </View>;
        }
      });
    };

    return (
      <View>
        <View style={styles.headerStyle}>
          <TouchableOpacity onPress={(): void => changeMonth(true)}>
            <Text style={styles.arrowText}> &#8249;</Text>
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{monthName}</Text>
            <Text style={styles.yearText}>{year}</Text>
          </View>
          <TouchableOpacity onPress={(): void => changeMonth(false)}>
            <Text style={styles.arrowText}>&#8250;</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.weekdayStyle}>{weekdays}</View>
        <FlatList
          style={styles.dayContainer}
          data={calendarDates}
          numColumns={7}
          renderItem ={({ item }): ReactElement => renderDates(item)}
          keyExtractor={(item, id): string => id.toString()}
        />
        {renderDayEvents()}
      </View>
    );
  };

  const [eventSwitch, setEventSwitch] = useState(0);
  const markedDates = markedDayEvents.map((markeddates) => markeddates.selectedEventDate.getDate());
  const markedMonths = markedDayEvents.map((markedmonths) => markedmonths.selectedEventDate.getMonth() - 1);

  const onSelected = (d: number): boolean => {
    return d === selectedDate?.getDate() && month === selectedDate?.getMonth();
  };

  const isMarked = (d: number) : boolean => {
    return markedDates.includes(d) && markedMonths.includes(month);
  };

  const renderDates = (dateItem: Date):ReactElement => {
    const itemYear = dateItem.getFullYear();
    const itemMonth = dateItem.getMonth();
    const itemDay = dateItem.getDate();
    const setItemDay = new Date(itemYear, itemMonth, itemDay);

    if (itemMonth !== month) {
      return (
        <View style={styles.otherDaysView} key={itemDay}>
          <Text style={styles.otherDaysText}>{`${itemDay}`}</Text>
        </View>
      );
    } else if (isToday(dateItem)) {
      return (
        <View style={styles.currentDayView} key={itemDay}>
          <Text style={styles.currentDayText}>{`${itemDay}`}</Text>
        </View>
      );
    } else if (isMarked(itemDay) && onSelected(itemDay)) {
      return (
        <TouchableOpacity onPress={(): void => { selectDate(setItemDay); setEventSwitch(itemDay); }}>
          <View style={styles.selectedMarkView} key ={itemDay}>
            <Text style={styles.activeText}>{`${itemDay}`}</Text>
            <View style={styles.mark} key ={itemDay}></View>
          </View>
        </TouchableOpacity>
      );
    } else if (isMarked(itemDay)) {
      return (
        <TouchableOpacity onPress={(): void => selectDate(setItemDay)}>
          <View style={styles.markView} key={itemDay}>
            <Text style={styles.notActiveText}>{`${itemDay}`}</Text>
            <View style={styles.mark} key={itemDay}></View>
          </View>
        </TouchableOpacity>
      );
    } else if (onSelected(itemDay)) {
      return (
        <TouchableOpacity onPress={(): void => selectDate(setItemDay)}>
          <View style={styles.activeView}>
            <Text style={styles.activeText}>{`${itemDay}`}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={(): void => selectDate(setItemDay)}>
          <View style={styles.notActiveView}>
            <Text style={styles.notActiveText}>{`${itemDay}`}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const scrollToMiddleCalendar = (): void => {
    scrollRef.current.scrollTo({
      x: Math.floor(layoutWidth),
      animated: false,
    });
  };

  const scrollEffect = (e: NativeSyntheticEvent<NativeScrollEvent>) : void => {
    const xValue = Math.floor(e.nativeEvent.contentOffset.x);
    const maxLayoutFloor = Math.floor(layoutWidth) * 2;
    if (!layoutWidth || layoutWidth === 1) return;

    if (xValue === 0) {
      if (scrollRef && scrollRef.current) {
        scrollToMiddleCalendar();
        setCurrentDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            currentDate.getDate()));
      }
    } else if (xValue === maxLayoutFloor) {
      if (scrollRef && scrollRef.current) {
        scrollToMiddleCalendar();
        setCurrentDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate()),
        );
      }
    }
  };

  const renderCalendars = (currentDate: Date): ReactElement => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

    return <Fragment>
      {renderCalendar(prevMonth)}
      {renderCalendar(currentMonth)}
      {renderCalendar(nextMonth)}
    </Fragment>;
  };

  return (
    <SafeAreaView
      style={styles.container}
      onLayout={(e): void => {
        setLayoutWidth(e.nativeEvent.layout.width);
        scrollToMiddleCalendar();
      }}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        contentOffset = {{ x: layoutWidth, y: 0 }}
        ref={scrollRef}
        onMomentumScrollEnd={scrollEffect}
      >
        {renderCalendars(currentDate)}
      </ScrollView>
    </SafeAreaView>);
}

export default CalendarCarousel;
