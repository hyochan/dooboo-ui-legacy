import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  getISODay,
  startOfWeek,
  subDays,
} from 'date-fns';

export enum WeekOfDay {
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
  Sun
}

export type WeekOfDayNumber = (0 | 1 | 2 | 3 | 4 | 5 | 6);

function weekOfDayConvertToNumber(weekOfDay: WeekOfDay): WeekOfDayNumber {
  return weekOfDay as WeekOfDayNumber;
}

// startOfISOWeek is monday
export const getWeekDates = (date: Date, weekOfday: WeekOfDay = WeekOfDay.Mon): Date[] => {
  const weekStartsOn = weekOfDayConvertToNumber(weekOfday);
  return eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn }),
    end: endOfWeek(date, { weekStartsOn }),
  });
};

export const getHeadPaddingOfMonth = (
  thisMonthStartDate: Date,
  weekStartsOn: WeekOfDay = WeekOfDay.Mon,
): Array<Date> => {
  const offset = (getISODay(thisMonthStartDate) - weekStartsOn + 7) % 7;
  if (offset <= 0) return [];
  return eachDayOfInterval({
    start: subDays(thisMonthStartDate, offset),
    end: subDays(thisMonthStartDate, 1),
  });
};

export const getTailPaddingOfMonth = (
  nextMonthStartDate: Date,
  weekStartsOn: WeekOfDay = WeekOfDay.Mon,
): Array<Date> => {
  const nextMonthOffset = (getISODay(nextMonthStartDate) - weekStartsOn + 7) % 7;
  const restOffset = 7 - nextMonthOffset;
  if (restOffset >= 7) return [];
  return eachDayOfInterval({
    start: nextMonthStartDate,
    end: addDays(nextMonthStartDate, restOffset - 1),
  });
};
