import { CalendarDefaultProps, CalendarProps } from './Calendar/types';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import actionCreatorFactory, {
  Action,
  isType,
} from 'typescript-fsa';
import {
  addDays,
  addMonths,
  subDays,
  subMonths,
} from 'date-fns';
import Calendar from './Calendar';
import { WeekOfDay } from './Calendar/CalendarUtil';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// const actionCreator = actionCreatorFactory();

// const PreviousActionCreator = actionCreator<void>('CALENDAR_PREVIOUS');
// const NextActionCreator = actionCreator<void>('CALENDAR_NEXT');

type CalendarCarouselProps = CalendarProps;
type CalendarCarouselDefaultProps = CalendarDefaultProps;
const { width } = Dimensions.get('window');
// const reducer = (state: CalendarState, action: Action<void>): CalendarState => {
//   if (isType(action, PreviousActionCreator)) {
//     return {
//       ...state,
//       ...calendarStateFromDate(subMonths(state.currentDate, 1)),
//     };
//   } else if (isType(action, NextActionCreator)) {
//     return {
//       ...state,
//       ...calendarStateFromDate(addMonths(state.currentDate, 1)),
//     };
//   } else {
//     return state;
//   }
// };

// const init = (date: Date): CalendarState => {
//   return calendarStateFromDate(date);
// };

const CalendarCarousel: React.FC<CalendarProps> = (props: CalendarCarouselProps) => {
  const { date } = props as CalendarCarouselDefaultProps;
  // const [{
  //   currentDate,
  //   currentStartOfMonth,
  //   currentEndOfMonth,
  //   currentNextStartOfMonth,
  // }, dispatch] = useReducer(reducer, date, init);
  // const onPreviousMonth = useCallback((): void => {
  //   dispatch(PreviousActionCreator());
  // }, []);

  // const onNextMonth = useCallback((): void => {
  //   dispatch(NextActionCreator());
  // }, []);

  // <TouchableOpacity onPress={onPreviousMonth}>
  //   <Text>Back</Text>
  // </TouchableOpacity>

  // <TouchableOpacity onPress={onNextMonth}>
  //   <Title>Next</Title>
  // </TouchableOpacity>
  const makeCalendar = (date: Date): JSX.Element => {
    return (
      <Calendar
        {...props}
        date={date}
      />
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={10}
        pagingEnabled
        decelerationRate={0}
        snapToInterval={width}
        snapToAlignment={'center'}
      >
        {makeCalendar(subMonths(date, 2))}
        {makeCalendar(subMonths(date, 1))}
        {makeCalendar(date)}
        {makeCalendar(addMonths(date, 1))}
        {makeCalendar(addMonths(date, 2))}
      </ScrollView>
    </View>
  );
};

CalendarCarousel.defaultProps = {
  onPress: (): void => {},
  date: new Date(),
  locale: 'en',
  selectedDates: [],
  weekStartsOn: WeekOfDay.Sun,
} as CalendarCarouselProps;

export default CalendarCarousel;
