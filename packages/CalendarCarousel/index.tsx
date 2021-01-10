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
import React, {
  PropsWithChildren,
  ReactElement,
  useRef,
  useState,
} from 'react';

interface Style {
  wrapperContainer: ViewStyle;
  calendarContainer: ViewStyle;
  headerStyle: ViewStyle;
  arrowText: TextStyle;
  titleContainer: ViewStyle;
  titleText: TextStyle;
  yearText: TextStyle;
  rowContainer: ViewStyle;
  weekdayText: TextStyle;
  dayContainer: ViewStyle;
  defaultView: ViewStyle;
  otherDaysText: TextStyle;
  currentDayView: ViewStyle;
  currentDayText: TextStyle;
  notActiveText: TextStyle;
  activeView: ViewStyle;
  activeText: TextStyle;
  mark: ViewStyle;
  eventContainer: ViewStyle;
  eventText: TextStyle;
  eventDate: TextStyle;
}

const styles = StyleSheet.create<Style>({
  wrapperContainer: {
    paddingTop: 40,
    width: 330,
    height: 470,
    paddingBottom: 40,
  },
  calendarContainer: {
    height: 390,
  },
  dayContainer: {
    width: 330,
    height: 350,
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
  rowContainer: {
    flexDirection: 'row',
  },
  weekdayText: {
    textAlign: 'center',
    color: '#4F4F4F',
    fontSize: 20,
  },
  defaultView: {
    width: 47,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherDaysText: {
    color: 'lightgray',
    textAlign: 'center',
  },
  currentDayView: {
    width: 47,
    height: 47,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#109CF1',
  },
  activeView: {
    width: 47,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#F0F8FD',
  },
  currentDayText: {
    color: 'white',
    textAlign: 'center',
  },
  notActiveText: {
    textAlign: 'center',
  },
  activeText: {
    color: '#109CF1',
    textAlign: 'center',
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
  eventDate: {
    fontWeight: '900',
    paddingLeft: 25,
    color: 'white',
  },
});

interface Props {
  date?: Date;
  onDateChanged?: (date: Date) => void;
  selectedDate?: Date;
  selectDate?: (date: Date) => void;
  markedDayEvents?: Record<string, Date>[];
  monthFormatter?: { format: (date: Date) => string };
}
function CalendarCarousel({
  date = new Date(),
  onDateChanged,
  selectDate,
  selectedDate,
  markedDayEvents = [],
  monthFormatter = new Intl.DateTimeFormat('en', { month: 'long' }),
}: PropsWithChildren<Props>): ReactElement {
  const scrollRef = useRef<ScrollView>(null);
  const [layoutWidth, setLayoutWidth] = useState<number>(330);
  const [eventDay, setEventDay] = useState(0);
  const [currentDate, setCurrentDate] = useState<Date>(date);

  const prevMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    currentDate.getDate(),
  );

  const nextMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDate(),
  );

  const scrollToMiddleCalendar = (): void => {
    scrollRef.current.scrollTo({
      x: Math.floor(layoutWidth),
      animated: false,
    });
  };

  const scrollEffect = (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const xValue = Math.floor(e.nativeEvent.contentOffset.x);
    const maxLayoutFloor = Math.floor(layoutWidth) * 2;

    if (!layoutWidth || layoutWidth === 1) return;

    if (xValue === 0) {
      if (scrollRef && scrollRef.current) {
        scrollToMiddleCalendar();
        setCurrentDate(prevMonth);
      }
    } else if (xValue === maxLayoutFloor)
      if (scrollRef && scrollRef.current) {
        scrollToMiddleCalendar();
        setCurrentDate(nextMonth);
      }
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

  const renderCalendars = (): ReactElement => {
    const renderCalendar = (displayDate: Date): ReactElement => {
      const monthName = monthFormatter.format(displayDate);
      const year = displayDate.getFullYear();
      const month = displayDate.getMonth();

      const lastDate = new Date(year, month + 1, 0).getDate();
      const firstWeekday = new Date(year, month, 1).getDay();
      const lastWeekday = new Date(year, month, lastDate).getDay();

      const weekdays = [];

      for (let idx = 0; idx <= 6; idx++) {
        const matchMonth = new Date(2020, 5, idx);

        const weekDay = matchMonth.toLocaleString('default', {
          weekday: 'narrow',
        });

        weekdays.push(
          <View style={{ width: 47.14 }} key={idx}>
            <Text style={styles.weekdayText}>{weekDay}</Text>
          </View>,
        );
      }

      const prevDates = [];

      for (let idx = 0; idx < firstWeekday; idx++) {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const date = new Date(year, month, 0);

        date.setDate(date.getDate() - idx);
        prevDates.unshift(date);
      }

      const dates = [];

      for (let idx = 1; idx <= lastDate; idx++)
        dates.push(new Date(year, month, idx));

      const nextDates = [];

      if (6 - lastWeekday >= 1)
        for (let idx = 1; idx <= 6 - lastWeekday; idx++)
          nextDates.push(new Date(year, month + 1, idx));

      const calendarDates = [...prevDates, ...dates, ...nextDates];

      const markedDates = markedDayEvents.map((markeddates) =>
        markeddates.selectedEventDate.getDate(),
      );

      const markedMonths = markedDayEvents.map(
        (markedmonths) => markedmonths.selectedEventDate.getMonth() - 1,
      );

      const markedYears = markedDayEvents.map((markedyears) =>
        markedyears.selectedEventDate.getFullYear(),
      );

      const renderDates = (dateItem: Date): ReactElement => {
        const itemYear = dateItem.getFullYear();
        const itemMonth = dateItem.getMonth();
        const itemDay = dateItem.getDate();
        const setItemDay = new Date(itemYear, itemMonth, itemDay);

        // eslint-disable-next-line @typescript-eslint/no-shadow
        const isToday = (dateItem: Date): boolean => {
          const today = new Date();

          return (
            dateItem.getDate() === today.getDate() &&
            dateItem.getMonth() === today.getMonth() &&
            dateItem.getFullYear() === today.getFullYear()
          );
        };

        const hasEvent = (): boolean => {
          return (
            markedDates.includes(itemDay) &&
            markedMonths.includes(itemMonth) &&
            markedYears.includes(itemYear)
          );
        };

        // eslint-disable-next-line @typescript-eslint/no-shadow
        const isSelected = (dateItem: Date): boolean => {
          return (
            dateItem.getDate() === selectedDate?.getDate() &&
            dateItem.getMonth() === selectedDate?.getMonth() &&
            dateItem.getFullYear() === selectedDate?.getFullYear()
          );
        };

        if (itemMonth !== month)
          return (
            <View style={styles.defaultView} key={itemDay}>
              <Text style={styles.otherDaysText}>{`${itemDay}`}</Text>
            </View>
          );
        else if (isToday(dateItem))
          return (
            <View style={styles.currentDayView} key={itemDay}>
              <Text style={styles.currentDayText}>{`${itemDay}`}</Text>
            </View>
          );
        else if (hasEvent() && isSelected(dateItem))
          return (
            <TouchableOpacity
              onPress={(): void => {
                selectDate(setItemDay);
                setEventDay(itemDay);
              }}>
              <View style={styles.activeView} key={itemDay}>
                <Text style={styles.activeText}>{`${itemDay}`}</Text>
                <View style={styles.mark} key={itemDay} />
              </View>
            </TouchableOpacity>
          );
        else if (hasEvent())
          return (
            <TouchableOpacity onPress={(): void => selectDate(setItemDay)}>
              <View style={styles.defaultView} key={itemDay}>
                <Text style={styles.notActiveText}>{`${itemDay}`}</Text>
                <View style={styles.mark} key={itemDay} />
              </View>
            </TouchableOpacity>
          );
        else if (isSelected(dateItem))
          return (
            <TouchableOpacity onPress={(): void => selectDate(setItemDay)}>
              <View style={styles.activeView}>
                <Text style={styles.activeText}>{`${itemDay}`}</Text>
              </View>
            </TouchableOpacity>
          );

        return (
          <TouchableOpacity onPress={(): void => selectDate(setItemDay)}>
            <View style={styles.defaultView}>
              <Text style={styles.notActiveText}>{`${itemDay}`}</Text>
            </View>
          </TouchableOpacity>
        );
      };

      const renderEvent = (): ReactElement[] => {
        return markedDayEvents.map((markedDayEvent, i) => {
          if (
            markedDates[i] === eventDay &&
            markedMonths.includes(month) &&
            markedYears.includes(year)
          )
            return (
              <View style={styles.eventContainer} key={i}>
                <Text style={styles.eventDate}>
                  {markedDayEvents[i].selectedEventDate.getDate()}
                </Text>
                <Text style={styles.eventText}>
                  {markedDayEvents[i].events}
                </Text>
              </View>
            );
        });
      };

      return (
        <View style={styles.calendarContainer}>
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
          <View style={styles.rowContainer}>{weekdays}</View>
          <FlatList
            style={styles.dayContainer}
            data={calendarDates}
            numColumns={7}
            renderItem={({ item }): ReactElement => renderDates(item)}
            keyExtractor={(item, id): string => id.toString()}
            scrollEnabled={false}
          />
          {renderEvent()}
        </View>
      );
    };

    return (
      <View style={styles.rowContainer}>
        {renderCalendar(prevMonth)}
        {renderCalendar(currentDate)}
        {renderCalendar(nextMonth)}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={styles.wrapperContainer}
      onLayout={(e): void => {
        setLayoutWidth(e.nativeEvent.layout.width);
        scrollToMiddleCalendar();
      }}>
      <ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        contentOffset={{ x: layoutWidth, y: 0 }}
        ref={scrollRef}
        onMomentumScrollEnd={scrollEffect}>
        {renderCalendars()}
      </ScrollView>
    </SafeAreaView>
  );
}

export default CalendarCarousel;
