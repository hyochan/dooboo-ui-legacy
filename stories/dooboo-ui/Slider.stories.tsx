import React, {ReactElement, useState} from 'react';

import {ContainerDeco} from '../../storybook/decorators';
import {Slider} from '../../main';
import {Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import styled from '@emotion/native';

const StyledScrollView = styled.ScrollView`
  width: 100%;
  padding: 30px;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  padding: 30px;
  display: flex;
  background-color: transparent;
  margin-top: 28px;
  margin-bottom: 30px;
`;

const SubTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 18px;
  margin-bottom: 18px;
`;

const Value = styled.Text`
  margin-top: 16px;
`;

function Default(): React.ReactElement {
  const [defaultSlider, setDefaultSlider] = useState(0);

  return (
    <Container>
      <SubTitle>Default</SubTitle>
      <Slider
        onChange={(value): void => {
          setDefaultSlider(value);
        }}
      />
      <Value>default: {defaultSlider}</Value>
    </Container>
  );
}

function NoMark(): React.ReactElement {
  const [noMarks, setNoMarks] = useState(0);

  return (
    <Container>
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
    </Container>
  );
}

function SmallStep(): React.ReactElement {
  const [smallStep, setSmallStep] = useState(10);

  return (
    <Container>
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
    </Container>
  );
}

function BigStep(): React.ReactElement {
  const [bigStep, setBigStep] = useState(0);

  return (
    <Container>
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

function DisplayLabel(): React.ReactElement {
  const [displayLabel, setDisplayLabel] = useState(3);

  return (
    <Container>
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
    </Container>
  );
}

function DisplayLabelAuto(): React.ReactElement {
  const [displayLabelAuto, setDisplayLabelAuto] = useState(0);

  return (
    <Container>
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
    </Container>
  );
}

function BigLabel(): React.ReactElement {
  const [bigLabel, setBigLabel] = useState(0);

  return (
    <Container>
      <SubTitle>Big Label</SubTitle>
      <Slider
        minValue={0}
        maxValue={5}
        step={1}
        hideLabel={false}
        autoLabel
        labelSize={50}
        labelTextStyle={{fontSize: 30}}
        onChange={(value): void => {
          setBigLabel(value);
        }}
      />
      <Value>big label: {bigLabel}</Value>
    </Container>
  );
}

function Colored(): React.ReactElement {
  const [colored, setColored] = useState(2);

  return (
    <Container>
      <SubTitle>Colored</SubTitle>
      <Slider
        minValue={0}
        maxValue={5}
        defaultValue={2}
        step={1}
        hideLabel={false}
        railStyle={{backgroundColor: 'blue'}}
        trackStyle={{backgroundColor: 'black'}}
        markStyle={{backgroundColor: 'white'}}
        thumbStyle={{backgroundColor: 'green'}}
        labelStyle={{backgroundColor: 'red'}}
        labelTextStyle={{color: 'white'}}
        onChange={(value): void => {
          setColored(value);
        }}
      />
      <Value>colored: {colored}</Value>
    </Container>
  );
}

function CustomMarks(): React.ReactElement {
  const [customMarks, setCustomMarks] = useState(2);

  return (
    <Container>
      <SubTitle>Custom Marks</SubTitle>
      <Slider
        minValue={0}
        maxValue={5}
        step={1}
        labelSize={50}
        labelTextStyle={{fontSize: 30}}
        mark={<Text>1</Text>}
        customMarkWidth={2}
        onChange={(value): void => {
          setCustomMarks(value);
        }}
      />
      <Value>custom marks: {customMarks}</Value>
    </Container>
  );
}

function CustomThumb(): React.ReactElement {
  const [customThumb, setCustomThumb] = useState(2);

  return (
    <Container>
      <SubTitle>Custom Thumb</SubTitle>
      <Slider
        minValue={0}
        maxValue={5}
        step={1}
        labelSize={50}
        labelTextStyle={{fontSize: 30}}
        thumb={<Text>1</Text>}
        onChange={(value): void => {
          setCustomThumb(value);
        }}
      />
      <Value>custom thumb: {customThumb}</Value>
    </Container>
  );
}

function DesignBlack(): React.ReactElement {
  const [designBlack, setDesignBlack] = useState(2);

  return (
    <Container>
      <SubTitle>Design - Black</SubTitle>
      <Slider
        hideMark
        minValue={0}
        maxValue={10}
        defaultValue={2}
        step={1}
        railStyle={{backgroundColor: '#BCC1D1'}}
        trackStyle={{backgroundColor: '#232A3A'}}
        thumbStyle={{backgroundColor: '#232A3A'}}
        onChange={(value): void => {
          setDesignBlack(value);
        }}
      />
      <Value>design black: {designBlack}</Value>
    </Container>
  );
}

function DesignLightBlue(): React.ReactElement {
  const [designLightBlue, setDesignLightBlue] = useState(4);

  return (
    <Container>
      <SubTitle>Design - Light blue</SubTitle>
      <Slider
        hideMark
        minValue={0}
        maxValue={10}
        defaultValue={4}
        step={1}
        railStyle={{backgroundColor: '#BCDBFB'}}
        trackStyle={{backgroundColor: '#4199F4'}}
        thumbStyle={{backgroundColor: '#4199F4'}}
        thumbSize={8}
        onChange={(value): void => {
          setDesignLightBlue(value);
        }}
      />
      <Value>design light blue: {designLightBlue}</Value>
    </Container>
  );
}

function DesignBlue(): React.ReactElement {
  const [designBlue, setDesignBlue] = useState(6);

  return (
    <Container>
      <SubTitle>Design - Blue</SubTitle>
      <Slider
        minValue={0}
        maxValue={10}
        defaultValue={6}
        step={1}
        railStyle={{backgroundColor: '#90A4F9'}}
        trackStyle={{backgroundColor: '#0B21E8'}}
        thumbSize={8}
        thumbStyle={{backgroundColor: '#0B21E8'}}
        markStyle={{backgroundColor: '#4163F4'}}
        labelSize={15}
        labelStyle={{backgroundColor: '#0B21E8'}}
        labelTextStyle={{color: '#FFFFFF', fontSize: 12}}
        onChange={(value): void => {
          setDesignBlue(value);
        }}
      />
      <Value>design blue: {designBlue}</Value>
    </Container>
  );
}

/**
 * Below are stories for web
 */

export default {
  title: 'Slider',
};

export const toStorybook = (): ReactElement => <Default />;

toStorybook.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */

storiesOf('Slider', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <StyledScrollView>
        <Default />
        <NoMark />
        <SmallStep />
        <BigStep />
        <DisplayLabel />
        <DisplayLabelAuto />
        <BigLabel />
        <Colored />
        <CustomMarks />
        <CustomThumb />
      </StyledScrollView>
    </>
  ))
  .add('design', () => (
    <>
      <StyledScrollView>
        <DesignBlack />
        <DesignLightBlue />
        <DesignBlue />
      </StyledScrollView>
    </>
  ));
