import React, { useState } from 'react';

import { ContainerDeco } from '../decorators';
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

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  padding: 30px;
  display: flex;
  background-color: transparent;
  margin-top: 28px;
  margin-bottom: 150px;
`;

const StyledScrollView = styled.ScrollView`
  width: 100%;
  padding: 30px;
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
  const [noMarks, setNoMarks] = useState(0);
  const [smallStep, setSmallStep] = useState(10);
  const [bigStep, setBigStep] = useState(0);
  const [displayLabel, setDisplayLabel] = useState(3);
  const [displayLabelAuto, setDisplayLabelAuto] = useState(0);
  const [bigLabel, setBigLabel] = useState(0);
  const [colored, setColored] = useState(2);
  const [designBlack, setDesignBlack] = useState(2);
  const [designLightBlue, setDesignLightBlue] = useState(4);
  const [designBlue, setDesignBlue] = useState(6);

  return (
    <Container>
      <StyledScrollView>
        <SubTitle>No marks</SubTitle>
        <Slider
          hideMark
          minValue={0}
          maxValue={100}
          onChange={(value): void => {
            setNoMarks(value);
          }}
        />
        <Value>no marks: {noMarks}</Value>

        <SubTitle>Small Step</SubTitle>
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
        />
        <Value>big step: {bigStep}</Value>

        <SubTitle>Display Label</SubTitle>
        <Slider
          minValue={0}
          maxValue={5}
          defaultValue={3}
          step={1}
          hideLabel={false}
          onChange={(value): void => {
            setDisplayLabel(value);
          }}
        />
        <Value>big step: {displayLabel}</Value>

        <SubTitle>Display Label Auto</SubTitle>
        <Slider
          minValue={0}
          maxValue={5}
          step={1}
          hideLabel={false}
          autoLabel
          onChange={(value): void => {
            setDisplayLabelAuto(value);
          }}
        />
        <Value>big step: {displayLabelAuto}</Value>

        <SubTitle>Big Label</SubTitle>
        <Slider
          minValue={0}
          maxValue={5}
          step={1}
          hideLabel={false}
          autoLabel
          labelSize={50}
          labelTextStyle={{ fontSize: 30 }}
          onChange={(value): void => {
            setBigLabel(value);
          }}
        />
        <Value>big label: {bigLabel}</Value>

        <SubTitle>Colored</SubTitle>
        <Slider
          minValue={0}
          maxValue={5}
          defaultValue={2}
          step={1}
          hideLabel={false}
          railStyle={{ backgroundColor: 'blue' }}
          trackStyle={{ backgroundColor: 'black' }}
          markStyle={{ backgroundColor: 'white' }}
          thumbStyle={{ backgroundColor: 'green' }}
          labelStyle={{ backgroundColor: 'red' }}
          labelTextStyle={{ color: 'white' }}
          onChange={(value): void => {
            setColored(value);
          }}
        />
        <Value>colored: {colored}</Value>

        <SubTitle>Design - Black</SubTitle>
        <Slider
          hideMark
          minValue={0}
          maxValue={10}
          defaultValue={2}
          step={1}
          railStyle={{ backgroundColor: '#BCC1D1' }}
          trackStyle={{ backgroundColor: '#232A3A' }}
          thumbStyle={{ backgroundColor: '#232A3A' }}
          onChange={(value): void => {
            setDesignBlack(value);
          }}
        />
        <Value>design black: {designBlack}</Value>

        <SubTitle>Design - Light blue</SubTitle>
        <Slider
          hideMark
          minValue={0}
          maxValue={10}
          defaultValue={4}
          step={1}
          railStyle={{ backgroundColor: '#BCDBFB' }}
          trackStyle={{ backgroundColor: '#4199F4' }}
          thumbStyle={{ backgroundColor: '#4199F4' }}
          thumbSize={8}
          onChange={(value): void => {
            setDesignLightBlue(value);
          }}
        />
        <Value>design light blue: {designLightBlue}</Value>

        <SubTitle>Design - Blue</SubTitle>
        <Slider
          minValue={0}
          maxValue={10}
          defaultValue={6}
          step={1}
          railStyle={{ backgroundColor: '#90A4F9' }}
          trackStyle={{ backgroundColor: '#0B21E8' }}
          thumbSize={8}
          thumbStyle={{ backgroundColor: '#0B21E8' }}
          markStyle={{ backgroundColor: '#4163F4' }}
          labelSize={15}
          labelStyle={{ backgroundColor: '#0B21E8' }}
          labelTextStyle={{ color: '#FFFFFF', fontSize: 12 }}
          onChange={(value): void => {
            setDesignBlue(value);
          }}
        />
        <Value>design blue: {designBlue}</Value>
      </StyledScrollView>
    </Container>
  );
}
