import React, { ReactElement } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '40px',
  },
  calendarSize: {
    width: '330px',
    height: '388px',
  },
  title: {
    fontFamily: 'Avenir',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    left: '150px',
    width: '300px',
  },
  titleFlex: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: '30px',
  },
  year: {
    fontSize: 12,
  },
  week: {
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'Avenir',
    fontWeight: 1000,
    fontSize: 14,
    textAlign: 'center',
  },
  weekday: {
    display: 'flex',
    flexDirection: 'row',
    color: '#4F4F4F',
    fontWeight: 1000,
  },
  beforeArrow: {
    marginLeft: '10px',
    paddingLeft: '20px',
    paddingBottom: '24px',
    paddingTop: '3px',
    width: '28px',
    height: '28px',
    fontSize: 40,
    color: 'royalblue',
  },
  nextArrow: {
    marginRight: '10px',
    width: '28px',
    paddingBottom: '20px',
    height: '28px',
    fontSize: 40,
    color: 'royalblue',
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

  // check leap year
  if (((year % 4 && year % 100) || year % 400 === 0) !== 0) {
    const dates = (data.dates[1] = 29);
  } else {
    const dates = data.dates;
  }

  // print weekday: sun,mon,tues...
  const week = [];
  for (let d = 0; d < 7; d++) {
    week.push(data.week[d]);
  }
  const weekdays = week.map((d) => {
    return (
      <View
        key={d}
        style={{
          width: '97px',
          paddingBottom: '10px',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
          }}>
          {d}
        </Text>
      </View>
    );
  });

  // get month to print title
  const currentMonth = data.month[month];
  // 이 달은 며칠이 있지? : 달과 일 매칭하기
  const numDays = data.dates[month];

  // 이제부터 달력 일,days 프린트 하기
  // 지난 달은 며칠이 있지?
  let prevDate = data.dates[month - 1];
  // 1월일 경우 12월을 가져오기
  if (month === 0) {
    prevDate = data.dates[11];
  }

  // 전달의 일수
  const prevMonthDays = [];
  for (let idx = 0; idx < 10; idx++) {
    prevMonthDays.push(prevDate);
    prevDate--;
  }

  // 달력 앞쪽에 회색으로 프린트될 전달 마지막 days
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
          width: '47px',
          height: '47px',
          paddingTop: '13.5px',
          alignItems: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Avenir',
            color: 'lightgray',
          }}>
          {i}
        </Text>
      </View>,
    );
  });

  // 현재 달의 날들을 프린트 해주기
  const daysInMonth = [];
  for (let d = 1; d <= numDays; d++) {
    let count = 1;
    let selectedDate = 1;
    const selectDate = (): void => {
      count++;
      if (count % 2 === 0) {
        selectedDate = 100;
      } else {
        selectedDate = 1;
      }
    };
    if (d === data.Day && currentMonth === data.month[new Date().getMonth()]) {
      daysInMonth.push(
        <View
          style={{
            borderRadius: 50,
            backgroundColor: '#109CF1',
            width: '47px',
            height: '47px',
            alignItems: 'center',
            paddingTop: '13.5px',
          }}>
          <Text
            style={{
              fontFamily: 'Avenir',
              color: 'white',
              textAlign: 'center',
            }}>
            {d}
          </Text>
        </View>,
      );
    } else if (selectedDate === 100) {
      daysInMonth.push(
        <TouchableOpacity onPress={selectDate}>
          <View
            style={{
              borderRadius: 50,
              backgroundColor: '#F0F8FD',
              alignItems: 'center',
              paddingTop: '13.5px',
              width: '47px',
              height: '47px',
            }}>
            <Text
              style={{
                color: '#109CF1',
                textAlign: 'center',
                fontFamily: 'Avenir',
              }}>
              {d}
            </Text>
          </View>
        </TouchableOpacity>,
      );
    } else {
      daysInMonth.push(
        <TouchableOpacity onPress={selectDate}>
          <View
            style={{
              width: '47px',
              height: '47px',
              paddingTop: '13.5px',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Avenir',
              }}>
              {d}
            </Text>
          </View>
        </TouchableOpacity>,
      );
    }
  }

  // 밑에 회색 프린트될 다음 달 첫날들
  const frontSlots = [...frontBlanks, ...daysInMonth];
  const rowNum = Math.ceil((frontBlanks.length + daysInMonth.length) / 7);
  const endBlank = rowNum * 7 - frontSlots.length;
  const endBlanks = [];
  for (let e = 1; e <= endBlank; e++) {
    endBlanks.push(
      <View
        style={{
          width: '47px',
          height: '47px',
          paddingTop: '13.5px',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Avenir',
            color: 'lightgray',
            textAlign: 'center',
          }}>
          {e}
        </Text>
      </View>,
    );
  }

  // 7개씩 끊어서 달프린트해주기
  const totalSlots = [...frontBlanks, ...daysInMonth, ...endBlanks];
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
      <View key={d} style={{ display: 'flex', flexDirection: 'row' }}>
        {' '}
        {d}{' '}
      </View>
    );
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.calendarSize}>
          <View style={styles.headerFlex}>
            <TouchableOpacity onPress={swipeLeft}>
              <View style={styles.beforeArrow}> &#8249;</View>
            </TouchableOpacity>
            <Text style={styles.title}>
              <View style={styles.titleFlex}>
                <View>
                  <Text>{currentMonth}</Text>
                </View>
                <Text style={styles.year}>{year}</Text>
              </View>
            </Text>
            <View>
              <TouchableOpacity onPress={swipeRight}>
                <View style={styles.nextArrow}> &#8250;</View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.week}>
            <View style={styles.weekday}></View>
          </View>
          {days}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default CalendarCarousel;
