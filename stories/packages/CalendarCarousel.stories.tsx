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

function Default(): React.ReactElement {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());

  const setNextMonth = (): void => {
    if (month === 11) {
      setMonth((month) => (month = 0));
      setYear((year) => year + 1);
    } else {
      setMonth((month) => month + 1);
    }
  };

  const setPrevMonth = (): void => {
    if (month === 0) {
      setMonth((month) => (month = 11));
      setYear((year) => year - 1);
    } else {
      setMonth((month) => month - 1);
    }
  };

  return (
    <Container>
      <CalendarCarousel
        date={new Date()}
        year={year}
        month={month}
        swipeLeft={setPrevMonth}
        swipeRight={setNextMonth}
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
