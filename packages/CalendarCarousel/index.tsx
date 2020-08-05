import {
  FlatList,
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
}
let layoutWidth = 0;
let scrolling = false;
let timeout;

function CalendarCarousel<T>({
  date = new Date(), onDateChanged, selectDate, selectedDate,
}: PropsWithChildren<Props<T>>): ReactElement {
  const [currentDate, setCurrentDate] = useState<Date>(date);
  const scrollRef = useRef<ScrollView>(null);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  useEffect(() => {
    return function cleanup(): void {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

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
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const weekdays = [];
    const currentMonthLastDay = new Date(year, month + 1, 0).getDate();
    const firstWeekdayOfMonth = new Date(year, month, 1).getDay();
    const lastWeekdayOfMonth = new Date(year, month, currentMonthLastDay).getDay();
    let numPrevMonthDays = new Date(year, month - 1, 0).getDate();

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
      prevDates.unshift(new Date(year, month - 1, idx));
      numPrevMonthDays--;
    }

    const dates = [];
    for (let d = 1; d <= currentMonthLastDay; d++) {
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
          renderItem ={(item : any): ReactElement => renderDates(item)}
          keyExtractor={(item, id): string => id.toString()}
        />
        {renderDayEvents()}
      </View>
    );
  };

  const markedDayEvents = [
    {
      selectedEventDate: new Date(2020, 7, 7),
      events: 'Walk Dog with Neighbor',
    },
    {
      selectedEventDate: new Date(2020, 7, 17),
      events: 'Birthday Party for Jason',
    },
    {
      selectedEventDate: new Date(2020, 7, 27),
      events: 'Cooking for Mom',
    },
  ];

  const [eventSwitch, setEventSwitch] = useState(0);
  const markedDates = markedDayEvents.map((markeddates) => markeddates.selectedEventDate.getDate());
  const markedMonths = markedDayEvents.map((markedmonths) => markedmonths.selectedEventDate.getMonth() - 1);

  const onSelected = (d: number): boolean => {
    return d === selectedDate?.getDate() && month === selectedDate?.getMonth();
  };

  const isMarked = (d: number) : boolean => {
    return markedDates.includes(d) && markedMonths.includes(month);
  };

  const renderDates = (day :Date) : ReactElement => (Item(day));

  const Item = (day: Date):ReactElement => {
    const getYear = day[Object.keys(day)[0]].getFullYear();
    const getMonth = day[Object.keys(day)[0]].getMonth();
    const getDay = day[Object.keys(day)[0]].getDate();
    const setDate = new Date(getYear, getMonth, getDay);

    if (getMonth !== month) {
      return (
        <View style={styles.otherDaysView} key={getDay}>
          <Text style={styles.otherDaysText}>{`${getDay}`}</Text>
        </View>
      );
    } else if (isToday(day[Object.keys(day)[0]])) {
      return (
        <View style={styles.currentDayView} key={getDay}>
          <Text style={styles.currentDayText}>{`${getDay}`}</Text>
        </View>
      );
    } else if (isMarked(getDay) && onSelected(getDay)) {
      return (
        <TouchableOpacity onPress={(): void => { selectDate(setDate); setEventSwitch(getDay); }}>
          <View style={styles.selectedMarkView} key ={getDay}>
            <Text style={styles.activeText}>{`${getDay}`}</Text>
            <View style={styles.mark} key ={getDay}></View>
          </View>
        </TouchableOpacity>
      );
    } else if (isMarked(getDay)) {
      return (
        <TouchableOpacity onPress={(): void => selectDate(setDate)}>
          <View style={styles.markView} key={getDay}>
            <Text style={styles.notActiveText}>{`${getDay}`}</Text>
            <View style={styles.mark} key={getDay}></View>
          </View>
        </TouchableOpacity>
      );
    } else if (onSelected(getDay)) {
      return (
        <TouchableOpacity onPress={(): void => selectDate(setDate)}>
          <View style={styles.activeView}>
            <Text style={styles.activeText}>{`${getDay}`}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={(): void => selectDate(setDate)}>
          <View style={styles.notActiveView}>
            <Text style={styles.notActiveText}>{`${getDay}`}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const scrollToMiddleCalendar = (): void => {
    scrollRef.current.scrollTo({
      x: layoutWidth,
      animated: false,
    });

    if (timeout) clearTimeout();

    timeout = setTimeout(() => {
      scrolling = false;
    }, 30);
  };

  const scrollEffect = (e : any) : void => {
    if (e.nativeEvent.contentOffset.x === 0) {
      if (scrollRef && scrollRef.current) {
        if (scrolling) return;

        scrolling = true;
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));
        scrollToMiddleCalendar();
      }
    } else if (layoutWidth && e.nativeEvent.contentOffset.x === (layoutWidth * 2)) {
      if (scrollRef && scrollRef.current) {
        if (scrolling) return;

        scrolling = true;
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()));
        scrollToMiddleCalendar();
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
    <SafeAreaView style={styles.container} onLayout={(e): void => {
      layoutWidth = e.nativeEvent.layout.width;
    }}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        contentOffset = {{ x: 330, y: 0 }}
        ref={scrollRef}
        onScroll={(e): void => scrollEffect(e)}
      >
        {renderCalendars(currentDate)}
      </ScrollView>
    </SafeAreaView>);
}

export default CalendarCarousel;
