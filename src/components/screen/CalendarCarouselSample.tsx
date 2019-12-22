import { Text, View } from 'react-native';
import {
  addDays,
  addMonths,
  subDays,
} from 'date-fns';
import Calendar from '../shared/CalendarCarousel/Calendar';
import React from 'react';
import { WeekOfDay } from '../shared/CalendarCarousel/Calendar/CalendarUtil';

const today = new Date();
const oneWeekAgo = subDays(today, 7);
const twoWeeksAgo = subDays(today, 14);
const threeDaysLater = addDays(today, 3);
const oneMonthLater = addMonths(today, 1);

function Page(): React.ReactElement {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Calendar
        locale="en"
        weekStartsOn={WeekOfDay.Thu}
        selectedDates={[
          oneWeekAgo,
          twoWeeksAgo,
          threeDaysLater,
          oneMonthLater,
        ]} />
    </View>
  );
}

export default Page;
