import { ContainerDeco } from '../decorators';
import React from 'react';
import Slider from '../../src/components/shared/Slider';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

storiesOf('Slider', module)
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
  width: 250;
  margin-top: 28;
  padding-top: 80;

  flex-direction: column;
`;

function Default(): React.ReactElement {
  return (
    <Container>
      <Slider
        defaultValue={50}
        onChange={(value): void => {
          console.log(value);
        }}
      />
    </Container>
  );
}
