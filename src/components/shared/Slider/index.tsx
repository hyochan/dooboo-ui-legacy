import React, { FC, useState } from 'react';
import Rail from './Rail';
import { Dimensions, PanResponder } from 'react-native';
import styled from 'styled-components/native';

interface TrackType {
  width: number;
  color: string;
}

interface RailType {
  percent: number;
  color: string;
}

interface ThumbType {
  size: number;
  color: string;
}

const { width } = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Track = styled.View<TrackType>`
  width: ${({ width }): number => width};
  height: 2px;
  background-color: ${({ color }): string => color};
  display: flex;
  justify-content: center;
`;

const Rail = styled.View<RailType>`
  width: ${({ percent }): string => `${percent}%`};
  height: 100%;
  background-color: ${({ color }): string => color};
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Steps = styled.View`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Step = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: #90a4f9;
`;

const Thumb = styled.View<ThumbType>`
  width: ${({ size }): number => size};
  height: ${({ size }): number => size};
  border-radius: ${({ size }): number => size / 2};
  background-color: ${({ color }): string => color};
  transform: ${({ size }): string => `translateX(${size / 2}px)`};
`;

interface Props {
  trackWidth?: number;
  trackColor?: string;
  railColor?: string;
  thumbSize?: number;
  stepSize?: number;
  defaultValue?: number;
  minValue: number;
  maxValue: number;
  step?: number;
  onChange?: (value: number) => void;
}

function Slider(props: Props): React.ReactElement {
  const {
    trackWidth = 300,
    trackColor = '#90a4f9',
    railColor = '#0b21e8',
    thumbSize = 20,
    defaultValue,
    minValue,
    maxValue,
    step,
    onChange,
  } = props;

  const [percent, setPercent] = useState(() => {
    return defaultValue
      ? ((defaultValue - minValue) / (maxValue - minValue)) * 100
      : 0;
  });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      let newPercent =
        ((gestureState.moveX - (width - trackWidth) / 2) / trackWidth) * 100;
      if (newPercent < 0) newPercent = 0;
      else if (newPercent > 100) newPercent = 100;

      let newValue;
      if (step) {
        const stepPercent = 100 / ((maxValue - minValue) / step);
        const remainder = newPercent % stepPercent;
        newPercent = stepPercent * Math.floor(newPercent / stepPercent);
        newValue = minValue + Math.floor(newPercent / stepPercent);
        if (remainder >= stepPercent / 2) {
          newPercent += stepPercent;
          newValue += 1;
        }
      } else {
        newValue = minValue + ((maxValue - minValue) * newPercent) / 100;
      }

      setPercent(newPercent);
      if (onChange) onChange(newValue);
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
  });

  return (
    <Container>
      <Track width={trackWidth} color={trackColor}>
        {step && (
          <Steps>
            {[...new Array((maxValue - minValue + 1) / step)].map((_, i) => (
              <Step key={i} />
            ))}
          </Steps>
        )}
        <Rail percent={percent} color={railColor}>
          <Thumb
            size={thumbSize}
            {...panResponder.panHandlers}
            color={railColor}
          />
        </Rail>
      </Track>
    </Container>
  );
}

export default Slider;
