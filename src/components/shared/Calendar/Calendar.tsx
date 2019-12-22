import {
  Action,
  ICalendarDefaultProps,
  ICalendarProps,
  ICalendarState,
  IWeekOfDayItemTextProps,
  IWeekOfayItemProps,
} from './types';
import {
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  WeekOfDay,
  getHeadPaddingOfMonth,
  getTailPaddingOfMonth,
  getWeekDates,
} from './CalendarUtil';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isEqual,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  subMonths,
} from 'date-fns';
import _chunk from 'lodash/chunk';
import _findIndex from 'lodash/findIndex';
import { getLocaleFromLocaleString } from './CalendarLocale';
import styled from 'styled-components/native';

const CalendarContainer = styled.View`
  padding: 0 15px;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  padding: 10px;
  font-size: 14;
  font-weight: 500;
  color: black;
`;

const RowContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const TitleContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const WeekOfDayHeaderCnt = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
`;
const WeekOfDayHeader = styled.View`
  max-width: 40px;
  max-height: 40px;
`;

const WeekOfDayHeaderText = styled.Text`
  font-size: 14;
  text-align: center;
  font-weight: 500;
`;

const WeekOfDayItemCnt = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const WeekOfDayItem = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40;
  background-color: ${(props: IWeekOfayItemProps): string => props.backgroundColor};
`;
const WeekOfDayItemText = styled.Text`
  color: ${(props: IWeekOfDayItemTextProps): string => props.color};
  font-size: 14;
  text-align: center;
  font-weight: 500;
`;

const colors = {
  pink: '#ff4d6c',
  lightBlue: '#3e7eff',
  lightGray: '#c6ccd1',
  darkGray: '#323b43',
  paleGray: '#e1e4e7',
};

const calendarStateFromDate = (date: Date): ICalendarState => {
  return {
    currentDate: date,
    currentStartOfMonth: startOfMonth(date),
    currentEndOfMonth: endOfMonth(date),
    currentNextStartOfMonth: addMonths(startOfMonth(date), 1),
  };
};

const reducer = (state: ICalendarState, action: Action<void>): ICalendarState => {
  const { type } = action;

  switch (type) {
    case 'previous':
      return {
        ...state,
        ...calendarStateFromDate(subMonths(state.currentDate, 1)),
      };
    case 'next':
      return {
        ...state,
        ...calendarStateFromDate(addMonths(state.currentDate, 1)),
      };
    default:
      return state;
  }
};

const init = (date: Date): ICalendarState => {
  return calendarStateFromDate(date);
};

const Calendar: React.FC<ICalendarProps> = (props: ICalendarProps) => {
  const { date, locale, selectedDates, onPress, weekStartsOn } = props as ICalendarDefaultProps;
  const [today, setToday] = useState<Date>(startOfDay(date));
  const [pressedDate, setPressedDate] = useState<Date | null>(null);
  const [{
    currentDate,
    currentStartOfMonth,
    currentEndOfMonth,
    currentNextStartOfMonth,
  }, dispatch] = useReducer(reducer, date, init);
  const [localeObj, setLocale] = useState<Locale>(getLocaleFromLocaleString(locale));

  useEffect(() => {
    setLocale(getLocaleFromLocaleString(locale));
  }, [locale]);

  const dates = [
    ...getHeadPaddingOfMonth(currentStartOfMonth, weekStartsOn),
    ...eachDayOfInterval({
      start: currentStartOfMonth,
      end: currentEndOfMonth,
    }),
    ...getTailPaddingOfMonth(currentNextStartOfMonth, weekStartsOn),
  ];

  const isSelectedDate = (date: Date): boolean => {
    return _findIndex(selectedDates, (selectedDate) => isSameDay(selectedDate, date)) !== -1;
  };
  const isPressedDate = (date: Date): boolean => {
    if (pressedDate == null || date == null) {
      return false;
    }
    return isEqual(pressedDate, date);
  };
  const isToday = (date: Date): boolean => isEqual(date, today);

  const getTextColor = (date: Date): string => {
    if (!isSameMonth(date, currentDate)) {
      return colors.lightGray;
    } else if (isToday(date)) {
      if (isPressedDate(date)) {
        return 'white';
      }
      return colors.pink;
    } else {
      if (isSelectedDate(date)) {
        if (isPressedDate(date)) {
          return 'white';
        }
        return colors.lightBlue;
      }
      return colors.darkGray;
    }
  };

  const getBackgroundColor = (date: Date): string => {
    if (isSelectedDate(date)) {
      if (isPressedDate(date)) {
        return colors.lightBlue;
      }
      return colors.paleGray;
    } else if (isToday(date)) {
      if (isPressedDate(date)) {
        return colors.pink;
      }
    } else {
      if (isPressedDate(date)) {
        return colors.paleGray;
      }
    }
    return 'white';
  };

  const onPressDate = useCallback((date: Date): (() => void) => {
    return (): void => {
      setPressedDate(date);
      onPress(date);
    };
  }, []);

  const onPreviousMonth = useCallback((): void => {
    dispatch({ type: 'previous' });
  }, []);

  const onNextMonth = useCallback((): void => {
    dispatch({ type: 'next' });
  }, []);

  const renderHeader = (): JSX.Element => {
    return (
      <RowContainer>
        {getWeekDates(date, weekStartsOn).map((day) => {
          return (
            <WeekOfDayHeaderCnt key={format(day, 'eee', { locale: localeObj })}>
              <WeekOfDayHeader>
                <WeekOfDayHeaderText>
                  {format(day, 'eee', { locale: localeObj })}
                </WeekOfDayHeaderText>
              </WeekOfDayHeader>
            </WeekOfDayHeaderCnt>
          );
        })}
      </RowContainer>
    );
  };

  const renderDates = (): JSX.Element => {
    const chunkedDates = _chunk(dates, 7);
    return (
      <>
        {chunkedDates.map((week) => {
          return (
            <RowContainer key={format(week[0], 'yyyy-ww')}>
              {week.map((day) => {
                return (
                  <WeekOfDayItemCnt key={format(day, 'yyyy.MM.dd')}>
                    <WeekOfDayItem
                      backgroundColor={getBackgroundColor(day)}
                      onPress={onPressDate(day)}
                    >
                      <WeekOfDayItemText color={getTextColor(day)}>
                        {format(day, 'd ')}
                      </WeekOfDayItemText>
                    </WeekOfDayItem>
                  </WeekOfDayItemCnt>
                );
              })}
            </RowContainer>
          );
        })}
      </>
    );
  };

  const renderTitle = (): JSX.Element => {
    return (
      <TitleContainer>
        <TouchableOpacity onPress={onPreviousMonth}>
          <Text>Back</Text>
        </TouchableOpacity>
        <Title>
          { format(currentDate, 'yyyy.MM') }
        </Title>
        <TouchableOpacity onPress={onNextMonth}>
          <Title>Next</Title>
        </TouchableOpacity>
      </TitleContainer>
    );
  };

  return (
    <CalendarContainer>
      { renderTitle() }
      { renderHeader() }
      { renderDates() }
    </CalendarContainer>
  );
};

Calendar.defaultProps = {
  onPress: (): void => {},
  date: new Date(),
  locale: 'en',
  selectedDates: [],
  weekStartsOn: WeekOfDay.Sun,
} as ICalendarProps;

export default Calendar;
