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
  flex-direction: column;
`;
const Title = styled.Text`
  width: 100%;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  padding-left: 20px;
`;
const Result = styled.Text`
  width: 200px;
  font-size: 15px;
  text-align: center;
  margin: 10px 0;
`;
const Divider = styled.View`
  width: 100%;
  height: 1px;
  margin: 15px 0;
  background-color: lightgrey;
`;

interface RatingChangeProps {
  stars: number;
}

function Default(): React.ReactElement {
  const [stars1, setstars1] = React.useState(3);
  const [stars2, setstars2] = React.useState(0);
  const handleChange1 = (props: RatingChangeProps): void => {
    setstars1(props.stars);
  };
  const handleChange2 = (props: RatingChangeProps): void => {
    setstars2(props.stars);
  };
  return (
    <Container>
      <Title>Controlled</Title>
      <Rating total={5} value={stars1} onChange={handleChange1} />
      <Result>Selected: {stars1} stars</Result>
      <Divider />
      <Title>Read only</Title>
      <Rating total={5} value={3} readonly />
      <Divider />
      <Title>Disabled</Title>
      <Rating total={5} value={2} disabled />
      <Divider />
      <Title>10 Stars</Title>
      <Rating total={10} value={stars2} onChange={handleChange2} />
      <Result>Selected: {stars2} stars</Result>
      <Divider />
    </Container>
  );
}
