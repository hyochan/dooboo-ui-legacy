import { WeekOfDay } from './CalendarUtil';
export interface ICalendarProps {
  onPress?(date: Date): void;
  date?: Date;
  locale?: 'en' | 'ko' | 'ja';
  selectedDates?: Date[];
  weekStartsOn?: WeekOfDay;
}
export interface ICalendarDefaultProps {
  onPress(date: Date): void;
  date: Date;
  locale: 'en' | 'ko' | 'ja';
  selectedDates: Date[];
  weekStartsOn: WeekOfDay;
}

export interface IWeekOfayItemProps {
  backgroundColor: string;
}

export interface IWeekOfDayItemTextProps {
  color: string;
}

export interface ICalendarState {
  currentDate: Date;
  currentStartOfMonth: Date;
  currentEndOfMonth: Date;
  currentNextStartOfMonth: Date;
}

export interface Action<P> {
  readonly type: string;
  readonly payload?: P;
}

interface IActionCreator<P> {
  (payload: P): Action<P>;
}

function actionCreator<P>(type: string): IActionCreator<P> {
  return (payload: P): Action<P> => ({ type, payload });
}

export const Previous = actionCreator<void>('previous');
export const Next = actionCreator<void>('next');
