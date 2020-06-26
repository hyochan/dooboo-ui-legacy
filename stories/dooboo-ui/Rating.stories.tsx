import React, { ReactElement } from 'react';
// eslint-disable-next-line sort-imports
import { boolean, number } from '@storybook/addon-knobs';

import { ContainerDeco } from '../../storybook/decorators';
import Rating from '../../main/Rating';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
`;

const Result = styled.Text`
  width: 200px;
  font-size: 15px;
  text-align: center;
  margin: 10px 0;
`;

function Default(): React.ReactElement {
  const [value, setValue] = React.useState(0);
  const disabled = boolean('disabled', false);

  const handleChange = (value: number): void => {
    setValue(value);
  };

  React.useEffect(() => {
    setValue(number('initValue', 3) || 0);
  }, [number('initValue', 3)]);

  return (
    <Container>
      <Rating
        total={number('total', 5)}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
      <Result>Selected: {value} stars</Result>
    </Container>
  );
}

/**
 * Below are stories for web
 */

export default {
  title: 'Rating',
};

export const toStorybook = (): ReactElement => <Default />;

toStorybook.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */
storiesOf('Rating', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));
