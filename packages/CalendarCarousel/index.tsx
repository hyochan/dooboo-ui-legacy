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
import React, { ReactElement, useState } from 'react';

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
  noPressView: ViewStyle;
  noPressText: TextStyle;
  onPressView: ViewStyle;
  onPressText: TextStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    paddingTop: 40,
    width: 330,
    height: 488,
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
  noPressView: {
    width: 47,
    height: 47,
    paddingTop: 13.5,
    alignItems: 'center',
  },
  noPressText: {
    textAlign: 'center',
    fontFamily: 'Avenir',
  },
  onPressView: {
    width: 47,
    height: 47,
    paddingTop: 13.5,
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#F0F8FD',
  },
  onPressText: {
    textAlign: 'center',
    fontFamily: 'Avenir',
    color: '#109CF1',
  },
});

interface Props<T> {
  date?: Date;
  year?: number;
  month?: number;
  swipeLeft?: () => void;
  swipeRight?: () => void;
}

function CalendarCarousel<T>(props: Props<T>): React.ReactElement {
  const { date, year, month, swipeLeft, swipeRight } = props;
  const monthName = new Date(year, month, 1).toLocaleString('default', {
    month: 'long',
  });

  const weekdays = [];

  const currentMonthDays = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const lastWeekday = new Date(year, month, currentMonthDays).getDay();
  let numPrevMonthDays = new Date(year, month - 1, 0).getDate();

  const [selectedDay, setSelectedDay] = useState(32);

  for (let idx = 0; idx <= 6; idx++) {
    const someDay = new Date(2020, 5, idx);
    const wd = someDay.toLocaleString('default', { weekday: 'narrow' });
    weekdays.push(
      <View style={{ width: 47.14 }} key={idx}>
        <Text style={styles.weekdayText}>{wd}</Text>
      </View>,
    );
  }
  const frontBlanks = [];
  for (let idx = 0; idx < firstWeekday; idx++) {
    frontBlanks.unshift(
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
          {`${numPrevMonthDays}`}
        </Text>
      </View>,
    );
    numPrevMonthDays--;
  }

  const days = [];
  for (let d = 1; d <= currentMonthDays; d++) {
    if (
      date.getDate() === d &&
      date.getMonth() === month &&
      date.getFullYear() === year
    ) {
      days.push(
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
    } else if (d === selectedDay) {
      days.push(
        <TouchableOpacity onPress={(): void => setSelectedDay(d)}>
          <View style={styles.onPressView}>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: 'Avenir',
                color: '#109CF1',
              }}>
              {`${d}`}
            </Text>
          </View>
        </TouchableOpacity>,
      );
    } else {
      days.push(
        <TouchableOpacity onPress={(): void => setSelectedDay(d)}>
          <View style={styles.noPressView}>
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

  const endBlanks = [];
  if (6 - lastWeekday >= 1) {
    for (let idx = 1; idx <= 6 - lastWeekday; idx++) {
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
            {`${idx}`}
          </Text>
        </View>,
      );
    }
  }

  const calendarDays = [...frontBlanks, ...days, ...endBlanks];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerFlex}>
        <TouchableOpacity onPress={swipeLeft}>
          <Text style={styles.beforeArrowText}> &#8249;</Text>
        </TouchableOpacity>
        <View style={styles.titleFlex}>
          <Text style={styles.titleText}>{monthName}</Text>
          <Text style={styles.yearText}>{year}</Text>
        </View>
        <TouchableOpacity onPress={swipeRight}>
          <Text style={styles.nextArrowText}>&#8250;</Text>
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
        keyExtractor={(item, id): string => id.toString()}
      />
    </SafeAreaView>
  );
}
export default CalendarCarousel;
