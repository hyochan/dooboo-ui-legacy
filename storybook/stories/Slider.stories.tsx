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
  width: 100%;
  margin-top: 28;
  padding-top: 80;

  flex-direction: column;
`;

function Default(): React.ReactElement {
  return (
    <Container>
      <SubTitle>Temperature</SubTitle>
      <Slider
        hideMark
        minValue={0}
        maxValue={100}
        onChange={(value): void => {
          setTemperature(value);
        }}
      />
      <Value>temperature: {temperature}</Value>
      <SubTitle>small Step</SubTitle>
      <Slider
        defaultValue={smallStep}
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
        sliderStyle={{
          markStyle: { backgroundColor: 'yellow' },
          trackStyle: { backgroundColor: 'green' },
          railStyle: { backgroundColor: 'blue' },
        }}
      />
      <Value>big step: {bigStep}</Value>
      <SubTitle>Display Label</SubTitle>
      <Slider
        minValue={0}
        maxValue={5}
        step={1}
        hideLabel={false}
        onChange={(value): void => {
          setDisplayLabel(value);
        }}
        sliderStyle={{
          railStyle: { backgroundColor: 'gray' },
          trackStyle: { backgroundColor: 'black' },
        }}
      />
      <Value>big step: {displayLabel}</Value>
      <SubTitle>Label Auto Display</SubTitle>
      <Slider
        minValue={0}
        maxValue={5}
        step={1}
        hideLabel={false}
        autoLabel
        onChange={(value): void => {
          setDisplayLabelAuto(value);
        }}
        sliderStyle={{
          railStyle: { backgroundColor: 'gray' },
          trackStyle: { backgroundColor: 'black' },
        }}
        labelProps={{
          labelStyle: { backgroundColor: 'red', height: 32 },
          textStyle: { color: 'black', fontSize: 20 },
        }}
      />
      <Value>big step: {displayLabelAuto}</Value>
    </Container>
  );
}
