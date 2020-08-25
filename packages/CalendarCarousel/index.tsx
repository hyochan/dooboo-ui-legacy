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
import React, { Fragment, PropsWithChildren, ReactElement, useRef, useState } from 'react';

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
    paddingTop: 40,
    width: 330,
    height: 388,
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
  date = new Date(), onDateChanged, selectDate, selectedDate,
  markedDayEvents = [],
}: PropsWithChildren<Props<T>>): ReactElement {
  const [currentDate, setCurrentDate] = useState<Date>(date);
  const [layoutWidth, setLayoutWidth] = useState<number>(330);
  const scrollRef = useRef<ScrollView>(null);

  const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const isToday = (dateItem: Date): boolean => {
    const today = new Date();
    return dateItem.getDate() === today.getDate() &&
        dateItem.getMonth() === today.getMonth() &&
        dateItem.getFullYear() === today.getFullYear();
  };

  const changeMonth = (toPrevMonth?: boolean): void => {
    if (toPrevMonth) {
      const update = prevMonth;

      setCurrentDate(update);
      return onDateChanged?.(update);
    }
    const update = nextMonth;

    setCurrentDate(update);
    return onDateChanged?.(update);
  };

  const renderCalendar = (): ReactElement => {
    const monthName = new Date(year, month, 1).toLocaleString('default', {
      month: 'long',
    });
    const lastDate = new Date(year, month + 1, 0).getDate();
    const firstWeekday = new Date(year, month, 1).getDay();
    const lastWeekday = new Date(year, month, lastDate).getDay();
    const weekdays = [];
    const prevDates = [];
    const dates = [];
    const nextDates = [];

    for (let idx = 0; idx <= 6; idx++) {
      const matchMonth = new Date(2020, 5, idx);
      const weekDay = matchMonth.toLocaleString('default', { weekday: 'narrow' });
      weekdays.push(
        <View style={{ width: 47.14 }} key={idx}>
          <Text style={styles.weekdayText}>{weekDay}</Text>
        </View>,
      );
    }

    for (let idx = 0; idx < firstWeekday; idx++) {
      const date = new Date(year, month, 0);
      date.setDate(date.getDate() - idx);
      prevDates.unshift(date);
    }

    for (let idx = 1; idx <= lastDate; idx++) {
      dates.push(new Date(year, month, idx));
    }

    if (6 - lastWeekday >= 1) {
      for (let idx = 1; idx <= 6 - lastWeekday; idx++) {
        nextDates.push(new Date(year, month + 1, idx));
      }
    }

    const calendarDates = [...prevDates, ...dates, ...nextDates];

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
        {renderEvent()}
      </View>
    );
  };

  const [eventDay, setEventDay] = useState(0);
  const markedDates = markedDayEvents.map((markeddates) => markeddates.selectedEventDate.getDate());
  const markedMonths = markedDayEvents.map((markedmonths) => markedmonths.selectedEventDate.getMonth() - 1);
  const markedYears = markedDayEvents.map((markedyears) => markedyears.selectedEventDate.getFullYear());

  const renderEvent = (): ReactElement[] => {
    return markedDayEvents.map((markedDayEvent, i) => {
      if (markedDates[i] === eventDay && markedMonths.includes(month) && markedYears.includes(year)) {
        return (
          <View style = {styles.eventContainer} key ={i}>
            <Text style= {styles.dayEvent}>{markedDayEvents[i].selectedEventDate.getDate()}</Text>
            <Text style = {styles.eventText}>{markedDayEvents[i].events}</Text>
          </View>
        );
      }
    });
  };

  const isSelected = (itemDay: number): boolean => {
    return itemDay === selectedDate?.getDate() &&
    month === selectedDate?.getMonth() &&
    year === selectedDate?.getFullYear();
  };

  const hasEvent = (itemDay: number) : boolean => {
    return markedDates.includes(itemDay) && markedMonths.includes(month) && markedYears.includes(year);
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
    } else if (hasEvent(itemDay) && isSelected(itemDay)) {
      return (
        <TouchableOpacity onPress={(): void => { selectDate(setItemDay); setEventDay(itemDay); }}>
          <View style={styles.selectedMarkView} key ={itemDay}>
            <Text style={styles.activeText}>{`${itemDay}`}</Text>
            <View style={styles.mark} key ={itemDay}></View>
          </View>
        </TouchableOpacity>
      );
    } else if (hasEvent(itemDay)) {
      return (
        <TouchableOpacity onPress={(): void => selectDate(setItemDay)}>
          <View style={styles.markView} key={itemDay}>
            <Text style={styles.notActiveText}>{`${itemDay}`}</Text>
            <View style={styles.mark} key={itemDay}></View>
          </View>
        </TouchableOpacity>
      );
    } else if (isSelected(itemDay)) {
      return (
        <TouchableOpacity onPress={(): void => selectDate(setItemDay)}>
          <View style={styles.activeView}>
            <Text style={styles.activeText}>{`${itemDay}`}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={(): void => selectDate(setItemDay)}>
        <View style={styles.notActiveView}>
          <Text style={styles.notActiveText}>{`${itemDay}`}</Text>
        </View>
      </TouchableOpacity>
    );
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
        setCurrentDate(prevMonth);
      }
    } else if (xValue === maxLayoutFloor) {
      if (scrollRef && scrollRef.current) {
        scrollToMiddleCalendar();
        setCurrentDate(nextMonth);
      }
    }
  };

  const renderCalendars = (currentDate: Date): ReactElement => {
    return <Fragment>
      {renderCalendar()}
      {renderCalendar()}
      {renderCalendar()}
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
