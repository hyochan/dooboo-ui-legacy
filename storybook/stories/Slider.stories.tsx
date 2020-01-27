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
        markColor={'yellow'}
        trackColor={'green'}
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
        railColor={'gray'}
        trackColor={'black'}
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
          setDisplayLabelAuto(displayLabelAuto);
        }}
        railColor={'gray'}
        trackColor={'black'}
      />
      <Value>big step: {bigStep}</Value>
    </Container>
  );
}
