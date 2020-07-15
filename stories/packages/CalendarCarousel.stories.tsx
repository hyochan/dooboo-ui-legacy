import React, { ReactElement, useState } from 'react';

import CalendarCarousel from '../../packages/CalendarCarousel';
import { ContainerDeco } from '../../storybook/decorators';
import { ScrollView } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

function Default(): React.ReactElement {
  const [month, setMonth] = useState(new Date().getMonth());
  const prevMonth = (): void => {
    if (month === 0) {
      setMonth((month) => 12);
    }
    setMonth((month) => month - 1);
  };
  const nextMonth = (): void => {
    if (month === 11) {
      setMonth((month) => -1);
    }
    setMonth((month) => month + 1);
  };
  return (
    <Container>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={true}
        scrollIndicatorInsets={{ top: 10, left: 10, bottom: 10, right: 10 }}
        onScrollBeginDrag={prevMonth}>
        <CalendarCarousel
          month={month}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
          swipeLeft={prevMonth}
          swipeRight={nextMonth}
        />
      </ScrollView>
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
