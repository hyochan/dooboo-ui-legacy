import { WeekOfDay } from './CalendarUtil';

export interface CalendarProps {
  onPress?(date: Date): void;
  date?: Date;
  locale?: 'en' | 'ko' | 'ja';
  selectedDates?: Date[];
  weekStartsOn?: WeekOfDay;
}
export interface CalendarDefaultProps {
  onPress(date: Date): void;
  date: Date;
  locale: 'en' | 'ko' | 'ja';
  selectedDates: Date[];
  weekStartsOn: WeekOfDay;
}

export interface WeekOfayItemProps {
  backgroundColor: string;
}

export interface WeekOfDayItemTextProps {
  color: string;
}

export interface CalendarState {
  currentDate: Date;
  currentStartOfMonth: Date;
  currentEndOfMonth: Date;
  currentNextStartOfMonth: Date;
}
