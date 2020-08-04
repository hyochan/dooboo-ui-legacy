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

const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
};

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

  useEffect(() => {
    return function cleanup(): void {
      if (timeout) clearTimeout(timeout);
    };
  }, []);

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
    const monthName = currentDate.toLocaleString('default', {
      month: 'long',
    });
    const weekdays = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const prevDays = [];
    const days = [];
    const nextDays = [];

    const currentMonthDays = new Date(year, month + 1, 0).getDate();
    const firstWeekdayOfMonth = new Date(year, month, 1).getDay();
    const lastWeekdayOfMonth = new Date(year, month, currentMonthDays).getDay();
    let numPrevMonthDays = new Date(year, month - 1, 0).getDate();

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

    const isMarked = (d: number) : boolean => {
      return markedDates.includes(d) && markedMonths.includes(month);
    };

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

    const onSelected = (d: number): boolean => {
      return d === selectedDate?.getDate() && month === selectedDate?.getMonth();
    };

    for (let idx = 0; idx <= 6; idx++) {
      const matchMonth = new Date(2020, 5, idx);
      const weekDay = matchMonth.toLocaleString('default', { weekday: 'narrow' });
      weekdays.push(
        <View style={{ width: 47.14 }} key={idx}>
          <Text style={styles.weekdayText}>{weekDay}</Text>
        </View>,
      );
    }

    for (let idx = 0; idx < firstWeekdayOfMonth; idx++) {
      prevDays.unshift(
        <View style={styles.otherDaysView} key={idx}>
          <Text style={styles.otherDaysText}>{`${numPrevMonthDays}`}</Text>
        </View>,
      );
      numPrevMonthDays--;
    }

    for (let d = 1; d <= currentMonthDays; d++) {
      const setDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
      if (isToday(setDate)) {
        days.push(
          <View style={styles.currentDayView} key={d}>
            <Text style={styles.currentDayText}>{`${d}`}</Text>
          </View>,
        );
      } else if (isMarked(d) && onSelected(d)) {
        days.push(
          <TouchableOpacity onPress={(): void => { selectDate(setDate); setEventSwitch(d); }}>
            <View style={styles.selectedMarkView} key ={d}>
              <Text style={styles.activeText}>{`${d}`}</Text>
              <View style={styles.mark} key ={d}></View>
            </View>
          </TouchableOpacity>,
        );
      } else if (isMarked(d)) {
        days.push(
          <TouchableOpacity onPress={(): void => selectDate(setDate)}>
            <View style={styles.markView} key={d}>
              <Text style={styles.notActiveText}>{`${d}`}</Text>
              <View style={styles.mark} key={d}></View>
            </View>
          </TouchableOpacity>,
        );
      } else if (onSelected(d)) {
        days.push(
          <TouchableOpacity onPress={(): void => selectDate(setDate)}>
            <View style={styles.activeView}>
              <Text style={styles.activeText}>{`${d}`}</Text>
            </View>
          </TouchableOpacity>,
        );
      } else {
        days.push(
          <TouchableOpacity onPress={(): void => selectDate(setDate)}>
            <View style={styles.notActiveView}>
              <Text style={styles.notActiveText}>{`${d}`}</Text>
            </View>
          </TouchableOpacity>,
        );
      }
    }

    if (6 - lastWeekdayOfMonth >= 1) {
      for (let idx = 1; idx <= 6 - lastWeekdayOfMonth; idx++) {
        nextDays.push(
          <View style={styles.otherDaysView}>
            <Text style={styles.otherDaysText}>
              {`${idx}`}
            </Text>
          </View>,
        );
      }
    }

    const calendarDays = [...prevDays, ...days, ...nextDays];

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
          numColumns={7}
          data={calendarDays}
          renderItem={({ item }): ReactElement => {
            return item;
          }}
          keyExtractor={(item, id): string => id.toString()}
        />
        {renderDayEvents()}
      </View>
    );
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
