import { ContainerDeco } from '../decorators';
import Rating from '../../src/components/shared/Rating';
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

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
  margin-top: 28;
  padding-top: 80;

  flex-direction: column;
`;
const Title = styled.Text`
  width: 200px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const Divider = styled.View`
  width: 200px;
  height: 2px;
  margin: 15px 0;
  background-color: lightgrey;
`;

function Default(): React.ReactElement {
  return (
    <Container>
      <Title>Controlled</Title>
      <Rating total={5} />
      <Divider />
      {/* <Title>Read only</Title>
      <Rating />
      <Divider />
      <Title>Disabled</Title>
      <Rating /> */}
    </Container>
  );
}
