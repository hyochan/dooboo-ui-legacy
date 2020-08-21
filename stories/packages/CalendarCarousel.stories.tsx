import 'intl';
import 'intl/locale-data/jsonp/en';

import React, { ReactElement, useState } from 'react';

import CalendarCarousel from '../../packages/CalendarCarousel';
import { ContainerDeco } from '../../storybook/decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;

const date = new Date();

function Default(): React.ReactElement {
  const [currentDate, setCurrentDate] = useState<Date>(date);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const monthFormatter = new Intl.DateTimeFormat('default', { month: 'long' });

  const markedDayEvents = [
    {
      selectedEventDate: new Date(2020, 7, 7),
      events: 'Walk Dog with Neighbor',
    },
    {
      selectedEventDate: new Date(2020, 7, 17),
      events: 'Birthday Party for Camerine',
    },
    {
      selectedEventDate: new Date(2020, 7, 27),
      events: 'Cooking for Mom',
    },
  ];

  return (
    <Container>
      <CalendarCarousel
        date={currentDate}
        onDateChanged={(date: Date): void => setCurrentDate(date)}
        selectedDate={selectedDate}
        selectDate={(date: Date): void => setSelectedDate(date)}
        markedDayEvents={markedDayEvents}
        monthFormatter={monthFormatter}
      />
    </Container>
  );
}

/**
 * Below are stories for web
 */
export default {
  title: 'Calendar',
};

export const toStorybook = (): ReactElement => (
  <>
    <Default />
  </>
);

toStorybook.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */

storiesOf('Calendar', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));
