import { Animated, Easing, PanResponder, Platform } from 'react-native';
import React, { FC, useMemo, useRef, useState } from 'react';
import { getNearestPercentByValue, getPercentByPositionX, getStepPercent, getStepValueByPercent } from './utils';

import Marks from './Marks';
import Rail from './Rail';
import Thumb from './Thumb';
import Track from './Track';
import styled from 'styled-components/native';

interface ThumbPositionerType {
  percent: number;
}

const Container = styled.View`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const ThumbPositioner = styled.View<ThumbPositionerType>`
  position: absolute;
  left: ${({ percent }): string => `${percent}%`};
`;

interface Props {
  hideMark?: boolean;
  defaultValue?: number;
  maxValue?: number;
  minValue?: number;
  onChange?: (value: number) => void;
  step?: number;
  markColor?: string;
  railColor?: string;
  trackColor?: string;
}

const Slider: FC<Props> = ({
  hideMark = false,
  maxValue = 100,
  minValue = 0,
  defaultValue = 0,
  onChange,
  step = 1,
  markColor = '#4163f4',
  railColor = '#bcdbfb',
  trackColor = '#0b21e8',
}) => {
  const sliderRef = useRef<any>();
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [sliderPositionX, setSliderPositionX] = useState(0);
  const [percent, setPercent] = useState(
    getNearestPercentByValue({
      value: defaultValue || minValue,
      minValue,
      maxValue,
      step,
    }),
  );
  const [scaleValue] = useState(new Animated.Value(0.01));
  const [opacityValue] = useState(new Animated.Value(0.12));

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderTerminationRequest: () => true,
        onPanResponderGrant: () => {
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
          }).start();
        },
        onPanResponderRelease: () => {
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
          }).start();
        },
        onPanResponderMove: (evt, gestureState) => {
          // the latest screen coordinates of the recently-moved touch
          const stepPercent = getStepPercent({
            minValue,
            maxValue,
            step,
          });
          const percent = getPercentByPositionX({
            positionX: gestureState.moveX - sliderPositionX,
            sliderWidth,
            stepPercent,
          });
          setPercent(percent);

          if (onChange) {
            const value = getStepValueByPercent({
              percent,
              stepPercent,
              step,
            });
            onChange(value);
          }
        },
      }),
    [sliderPositionX, sliderWidth, onChange],
  );
  return (
    <Container
      ref={sliderRef}
      {...panResponder.panHandlers}
      onLayout={(): void => {
        if (sliderRef) {
          sliderRef.current.measure((x, y, width, height, pageX) => {
            setSliderPositionX(pageX);
            setSliderWidth(width);
          });
        }
      }}
    >
      <Rail style={{ backgroundColor: railColor }}/>
      <Track percent={percent} style={{ backgroundColor: trackColor }}/>
      {!hideMark && step && (
        <Marks
          sliderWidth={sliderWidth}
          minValue={minValue}
          maxValue={maxValue}
          step={step}
          style={{ backgroundColor: markColor }}
        />
      )}
      <ThumbPositioner percent={percent}>
        <Thumb scaleValue={scaleValue} opacityValue={opacityValue} style={{ backgroundColor: trackColor }} />
      </ThumbPositioner>
    </Container>
  );
};

export default Slider;
