import { ContainerDeco } from '../decorators';
import React from 'react';
import Slider from '../../src/components/shared/Slider';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  align-content: center;
  justify-content: space-around;
`;

const ContainerDeco = (storyFn): React.ReactElement => (
  <Container>{storyFn()}</Container>
);

storiesOf('Slider', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));

function Default(): React.ReactElement {
  return (
    <Container>
      <Slider />
    </Container>
  );
}
