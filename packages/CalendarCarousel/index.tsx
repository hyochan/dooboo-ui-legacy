import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { ReactElement } from 'react';

interface Style {
  container: ViewStyle;
  headerFlex: ViewStyle;
  beforeArrowText: TextStyle;
  titleFlex: ViewStyle;
  titleText: TextStyle;
  yearText: TextStyle;
  nextArrowText: TextStyle;
  weekdayFlex: ViewStyle;
  weekdayText: TextStyle;
  calendarContainerSize: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    paddingTop: 40,
    width: 330,
    height: 388,
  },
  headerFlex: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  beforeArrowText: {
    color: 'royalblue',
    fontSize: 30,
  },
  titleFlex: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleText: {
    fontFamily: 'Avenir',
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
  nextArrowText: {
    color: 'royalblue',
    fontSize: 30,
  },
  weekdayFlex: {
    flexDirection: 'row',
  },
  weekdayText: {
    color: '#4F4F4F',
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
  },
  calendarContainerSize: {
    width: 330,
    height: 388,
  },
});

const data = {
  dates: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  week: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  month: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  Day: new Date().getDate(),
};

interface Props<T> {
  month?: number;
  onPrevMonth?: () => void;
  onNextMonth?: () => void;
  swipeLeft?: () => void;
  swipeRight?: () => void;
}

function CalendarCarousel<T>(props: Props<T>): React.ReactElement {
  const { month, onPrevMonth, onNextMonth, swipeLeft, swipeRight } = props;
  const firstDay = new Date(new Date().getFullYear(), month, 1).getDay();
  const year = new Date().getFullYear();

  if (((year % 4 && year % 100) || year % 400 === 0) !== 0) {
    const dates = (data.dates[1] = 29);
  } else {
    const dates = data.dates;
  }

  const weekdays = [];
  for (let idx = 0; idx <= 6; idx++) {
    const d = data.week[idx];
    weekdays.push(
      <View style={{ width: 47.14 }} key={idx}>
        <Text style={styles.weekdayText}>{d}</Text>
      </View>,
    );
  }

  const currentMonth = data.month[month];
  const numDays = data.dates[month];

  let prevDate = data.dates[month - 1];
  if (month === 0) {
    prevDate = data.dates[11];
  }

  const prevMonthDays = [];
  for (let idx = 0; idx < 10; idx++) {
    prevMonthDays.push(prevDate);
    prevDate--;
  }

  const blanks = [];
  for (let i = 0; i < firstDay; i++) {
    blanks.push(i);
  }
  const numBlanks = blanks.length;
  const blankDays = prevMonthDays.slice(0, numBlanks).reverse();

  const frontBlanks = [];
  blankDays.forEach((i) => {
    frontBlanks.push(
      <View
        style={{
          width: 47,
          height: 47,
          paddingTop: 13.5,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Avenir',
            color: 'lightgray',
          }}>
          {`${i}`}
        </Text>
      </View>,
    );
  });

  const daysInMonth = [];
  for (let d = 1; d <= numDays; d++) {
    if (d === data.Day && currentMonth === data.month[new Date().getMonth()]) {
      daysInMonth.push(
        <View
          style={{
            borderRadius: 50,
            backgroundColor: '#109CF1',
            width: 47,
            height: 47,
            alignItems: 'center',
            paddingTop: 13.5,
          }}>
          <Text
            style={{
              fontFamily: 'Avenir',
              color: 'white',
              textAlign: 'center',
            }}>
            {`${d}`}
          </Text>
        </View>,
      );
    } else {
      daysInMonth.push(
        <TouchableOpacity>
          <View
            style={{
              width: 47,
              height: 47,
              paddingTop: 13.5,
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Avenir',
              }}>
              {`${d}`}
            </Text>
          </View>
        </TouchableOpacity>,
      );
    }
  }

  const frontSlots = [...frontBlanks, ...daysInMonth];
  const rowNum = Math.ceil((frontBlanks.length + daysInMonth.length) / 7);
  const endBlank = rowNum * 7 - frontSlots.length;
  const endBlanks = [];
  for (let e = 1; e <= endBlank; e++) {
    endBlanks.push(
      <View
        style={{
          width: 47,
          height: 47,
          paddingTop: 13.5,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Avenir',
            color: 'lightgray',
            textAlign: 'center',
          }}>
          {`${e}`}
        </Text>
      </View>,
    );
  }

  const calendarDays = [...frontBlanks, ...daysInMonth, ...endBlanks];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerFlex}>
        <TouchableOpacity onPress={swipeLeft}>
          <View>
            <Text style={styles.beforeArrowText}> &#8249;</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.titleFlex}>
          <Text style={styles.titleText}>{currentMonth}</Text>
          <Text style={styles.yearText}>{year}</Text>
        </View>
        <TouchableOpacity onPress={swipeRight}>
          <View>
            <Text style={styles.nextArrowText}>&#8250;</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.weekdayFlex}>{weekdays}</View>
      <FlatList
        style={styles.calendarContainerSize}
        numColumns={7}
        data={calendarDays}
        renderItem={({ item }): ReactElement => {
          return item;
        }}
      />
    </SafeAreaView>
  );
}

export default CalendarCarousel;
