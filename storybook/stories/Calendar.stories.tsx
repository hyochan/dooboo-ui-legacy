import {
  addDays,
  addMonths,
  subDays,
} from 'date-fns';
import Calendar from '../../src/components/shared/Calendar/Calendar';
import React from 'react';
import { WeekOfDay } from '../../src/components/shared/Calendar/CalendarUtil';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const today = new Date();
const oneWeekAgo = subDays(today, 7);
const twoWeeksAgo = subDays(today, 14);
const threeDaysLater = addDays(today, 3);
const oneMonthLater = addMonths(today, 1);

storiesOf('CalendarSample', module)
  .add('default', () => (
    <Container>
      <Calendar
        locale="en"
        weekStartsOn={WeekOfDay.Thu}
        selectedDates={[
          oneWeekAgo,
          twoWeeksAgo,
          threeDaysLater,
          oneMonthLater,
        ]} />
    </Container>
  ));
