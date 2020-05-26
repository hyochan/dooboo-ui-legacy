import { ContainerDeco } from '../decorators';
import Rating from '../../src/components/shared/Rating';
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

// eslint-disable-next-line sort-imports
import { boolean, number } from '@storybook/addon-knobs';

storiesOf('Rating', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));

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
