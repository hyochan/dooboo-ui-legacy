import { ContainerDeco } from '../decorators';
import React, { useState } from 'react';
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
  flex: 1;
  width: 100%;
  padding: 30px;
  display: flex;
  background-color: transparent;
  margin-top: 28;
`;

const SubTitle = styled.Text`
  font-size: 16;
  font-weight: bold;
  margin-top: 18px;
  margin-bottom: 18px;
`;

const Value = styled.Text`
  margin-top: 16;
`;
function Default(): React.ReactElement {
  const [temperature, setTemperature] = useState(0);
  const [smallStep, setSmallStep] = useState(0);
  const [bigStep, setBigStep] = useState(0);
  return (
    <Container>
      <SubTitle>Temperature</SubTitle>
      <Slider
        minValue={0}
        maxValue={100}
        onChange={(value): void => {
          setTemperature(value);
        }}
      />
      <Value>temperature: {temperature}</Value>
      <SubTitle>small Step</SubTitle>
      <Slider
        minValue={0}
        maxValue={100}
        step={10}
        onChange={(value): void => {
          setSmallStep(value);
        }}
      />
      <Value>small step: {smallStep}</Value>
      <SubTitle>Big Step</SubTitle>
      <Slider
        minValue={0}
        maxValue={5}
        step={1}
        onChange={(value): void => {
          setBigStep(value);
        }}
      />
      <Value>big step: {bigStep}</Value>
    </Container>
  );
}
