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
import React, { Fragment, PropsWithChildren, ReactElement, useState } from 'react';

enum MonthType {
  prev,
  current,
  next,
}

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
}

const styles = StyleSheet.create<Style>({
  container: {
    paddingTop: 40,
    width: 330,
    height: 488,
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
    height: 388,
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

function CalendarCarousel<T>({
  date = new Date(), onDateChanged, selectDate, selectedDate,
}: PropsWithChildren<Props<T>>): React.ReactElement {
  const [currentDate, setCurrentDate] = useState<Date>(date);

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

  const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
  const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

  const renderCalendar = (currentDate: Date): any => {
    const monthName = currentDate.toLocaleString('default', {
      month: 'long',
    });
    const weekdays = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const currentMonthDays = new Date(year, month + 1, 0).getDate();
    const firstWeekday = new Date(year, month, 1).getDay();
    const lastWeekday = new Date(year, month, currentMonthDays).getDay();
    let numPrevMonthDays = new Date(year, month - 1, 0).getDate();

    // TODO: Provide drawing calendar as a one single function to reuse it in other pages.
    for (let idx = 0; idx <= 6; idx++) {
      const matchMonth = new Date(2020, 5, idx);
      const weekDay = matchMonth.toLocaleString('default', { weekday: 'narrow' });
      weekdays.push(
        <View style={{ width: 47.14 }} key={idx}>
          <Text style={styles.weekdayText}>{weekDay}</Text>
        </View>,
      );
    }

    const prevDays = [];
    for (let idx = 0; idx < firstWeekday; idx++) {
      prevDays.unshift(
        <View style={styles.otherDaysView}>
          <Text style={styles.otherDaysText}>{`${numPrevMonthDays}`}</Text>
        </View>,
      );
      numPrevMonthDays--;
    }

    const days = [];
    for (let d = 1; d <= currentMonthDays; d++) {
      if (isToday(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          d,
        ),
      )) {
        days.push(
          <View
            style={styles.currentDayView}>
            <Text style={styles.currentDayText}>{`${d}`}</Text>
          </View>,
        );
      } else if (d === selectedDate?.getDate() && month === selectedDate?.getMonth()) {
        days.push(
          <TouchableOpacity onPress={(): void => selectDate?.(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            d,
          ),
        )}>
            <View style={styles.activeView}>
              <Text style={styles.activeText}>{`${d}`}</Text>
            </View>
          </TouchableOpacity>,
        );
      } else {
        days.push(
          <TouchableOpacity onPress={(): void => selectDate?.(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            d,
          ),
        )}>
            <View style={styles.notActiveView}>
              <Text style={styles.notActiveText}>{`${d}`}</Text>
            </View>
          </TouchableOpacity>,
        );
      }
    }

    const nextDays = [];
    if (6 - lastWeekday >= 1) {
      for (let idx = 1; idx <= 6 - lastWeekday; idx++) {
        nextDays.push(
          <View
            style={styles.otherDaysView}>
            <Text
              style={styles.otherDaysText}>
              {`${idx}`}
            </Text>
          </View>,
        );
      }
    }

    const calendarDays = [...prevDays, ...days, ...nextDays];

    return (
      <Fragment>
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
      </Fragment>

    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onMomentumScrollBegin={(e): void => {
          console.log('momentScroll', e);
        }}
        onScroll= {(e): void => {
          // TODO: You can see targetContentOffset to check current page
          console.log('onScroll', e);
        }
        onScrollEndDrag={(e): void => {
          // TODO: You can see targetContentOffset to check current page
          console.log('onScrollEndDrag', e);
        }}
        onScrollBeginDrag= {(e): void => {
          // TODO: You can see targetContentOffset to check current page

        }}
      >
        {renderCalendar(prevMonth)}
        {renderCalendar(currentMonth)}
        {renderCalendar(nextMonth)}
      </ScrollView>
    </SafeAreaView>
  );
}
export default CalendarCarousel;
