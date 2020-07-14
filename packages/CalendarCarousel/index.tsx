import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { ReactElement, useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '40px',
  },
  scrollView: {
    width: '330px',
    height: '388px',
  },
  title: {
    fontFamily: 'Avenir',
    fontWeight: '900',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    left: '150px',
    width: '300px',
  },
  main_title: {
    display: 'flex',
    flexDirection: 'column',
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '30px',
  },
  year_style: {
    fontSize: 12,
  },
  week: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Avenir',
    fontWeight: '1000',
    fontSize: 14,
    textAlign: 'center',
  },
  weekday: {
    display: 'flex',
    flexDirection: 'row',
    color: '#4F4F4F',
    fontWeight: '1000',
  },
  dates: {
    fontFamily: 'Avenir',
    fontSize: 12,
    lineHeight: 16,
    width: '330px',
  },
  days: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image_before_style: {
    marginLeft: '10px',
    marginTop: '15px',
    width: '28px',
    height: '28px',
  },
  image_after_style: {
    marginRight: '10px',
    marginTop: '10px',
    width: '28px',
    height: '28px',
  },
  today: {
    borderRadius: 50,
    backgroundColor: '#109CF1',
    width: '36px',
    height: '36px',
  },
  nopress: {
    width: '47px',
    height: '33.5px',
    textAlign: 'center',
    paddingTop: '13.5px',
    alignItems: 'center',
    fontFamily: 'Avenir',
  },
  onpress: {
    width: '47px',
    height: '33.5px',
    textAlign: 'center',
    paddingTop: '13.5px',
    alignItems: 'center',
    fontFamily: 'Avenir',
    backgroundColor: 'red',
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
  status?: number;
  pressStatus?: () => void;
}

function CalendarCarousel<T>(props: Props<T>): React.ReactElement {
  const {
    month,
    status,
    pressStatus,
    onPrevMonth,
    onNextMonth,
    swipeLeft,
    swipeRight,
  } = props;
  const firstDay = new Date(new Date().getFullYear(), month, 1).getDay();
  const year = new Date().getFullYear();

  if (((year % 4 && year % 100) || year % 400 === 0) !== 0) {
    const dates = (data.dates[1] = 29);
  } else {
    const dates = data.dates;
  }

  const week = [];
  for (let d = 0; d < 7; d++) {
    week.push(data.week[d]);
  }
  const weekdays = week.map((d) => {
    return (
      <td
        key={d}
        style={{
          textAlign: 'center',
          width: '97px',
          fontWeight: 900,
          fontSize: 20,
          paddingBottom: '10px',
        }}>
        {d}
      </td>
    );
  });

  const currentMonth = data.month[month];
  const thisDate = data.dates[month];
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

  const blanksD = [];
  blankDays.forEach((i) => {
    blanksD.push(
      <td
        style={{
          width: '47px',
          height: '33.5px',
          paddingTop: '13.5px',
          alignItems: 'center',
          textAlign: 'center',
          fontFamily: 'Avenir',
          color: 'lightgray',
        }}
        key={i * 80}>
        {i}
      </td>,
    );
  });

  const daysInMonth = [];
  for (let d = 1; d <= thisDate; d++) {
    if (d === data.Day && currentMonth === data.month[new Date().getMonth()]) {
      daysInMonth.push(
        <td
          style={{
            borderRadius: '50%',
            backgroundColor: '#109CF1',
            width: '47px',
            height: '33.5px',
            paddingTop: '13.5px',
            textAlign: 'center',
            alignItems: 'center',
            fontFamily: 'Avenir',
            color: 'white',
          }}>
          {d}
        </td>,
      );
    } else {
      const [count, setCount] = useState(1);
      const [selectedDate, setDate] = useState(1);
      const selectDate = (): void => {
        setCount((count) => count + 1);
        if (count % 2 === 0) {
          setDate((selectedDate) => 100);
        } else {
          setDate((selectedDate) => 1);
        }
      };
      if (selectedDate === 100) {
        daysInMonth.push(
          <TouchableOpacity onPress={selectDate}>
            <td
              style={{
                borderRadius: 50,
                backgroundColor: '#F0F8FD',
                color: '#109CF1',
                textAlign: 'center',
                alignItems: 'center',
                fontFamily: 'Avenir',
                paddingTop: '13.5px',
                width: '47px',
                height: '33.5px',
              }}>
              {d}
            </td>
          </TouchableOpacity>,
        );
      } else {
        daysInMonth.push(
          <TouchableOpacity onPress={selectDate}>
            <td
              style={{
                width: '47px',
                height: '33.5px',
                paddingTop: '13.5px',
                textAlign: 'center',
                alignItems: 'center',
                fontFamily: 'Avenir',
              }}
              key={d}>
              {d}
            </td>
          </TouchableOpacity>,
        );
      }
    }

    const frontSlots = [...blanksD, ...daysInMonth];
    const rowNum = Math.ceil((blanksD.length + daysInMonth.length) / 7);
    const endBlank = rowNum * 7 - frontSlots.length;
    const endSlots = [];
    for (let e = 1; e <= endBlank; e++) {
      endSlots.push(
        <td
          style={{
            width: '47px',
            height: '33.5px',
            textAlign: 'center',
            paddingTop: '13.5px',
            alignItems: 'center',
            fontFamily: 'Avenir',
            color: 'lightgray',
          }}>
          {e}
        </td>,
      );
    }

    const totalSlots = [...blanksD, ...daysInMonth, ...endSlots];
    const rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row);
      } else {
        const insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        const insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    const days = rows.map((d, i) => {
      return (
        <tr key={d} style={{ display: 'flex' }}>
          {' '}
          {d}{' '}
        </tr>
      );
    });

    return (
      <>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.top}>
              <TouchableOpacity onPress={swipeLeft}>
                <View style={styles.image_before_style}>&LT;</View>
              </TouchableOpacity>
              <Text style={styles.title}>
                <View style={styles.main_title}>
                  <View>
                    <Text>{currentMonth}</Text>
                  </View>
                  <Text style={styles.year_style}>{year}</Text>
                </View>
              </Text>
              <View>
                <TouchableOpacity onPress={swipeRight}>
                  <View style={styles.image_after_style}>&GT;</View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.week}>
              <tr>
                <View style={styles.weekday}></View>
              </tr>
            </View>
            <tr>{days}</tr>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

export default CalendarCarousel;
