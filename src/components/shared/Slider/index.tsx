import { Animated, Easing, PanResponder, Platform } from 'react-native';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  getNearestPercentByValue,
  getPercentByPositionX,
  getStepPercent,
  getStepValueByPercent,
} from './utils';

import Label from './Label';
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
  hideLabel?: boolean;
  autoLabel?: boolean;
  step?: number;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
  step?: number;
  labelDisplay?: LabelDisplay;
  markColor?: string;
  railColor?: string;
  trackColor?: string;
}

const Slider: FC<Props> = ({
  hideMark = false,
  hideLabel = true,
  autoLabel = false,
  step = 1,
  defaultValue = 0,
  minValue = 0,
  maxValue = 100,
  onChange,
  step = 1,
  labelDisplay = 'off',
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
  const [value, setValue] = useState(defaultValue);
  const [scaleValue] = useState(new Animated.Value(0.01));
  const [opacityValue] = useState(new Animated.Value(0.12));
  const [isVisibleLabel, setIsVisibleLabel] = useState(false);
  const [percentValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (!hideLabel && !autoLabel) {
      setIsVisibleLabel(true);
    }
  }, []);

  useEffect(() => {
    // Set Label percent animated Value
    Animated.timing(percentValue, {
      toValue: percent,
      duration: 255,
      easing: Easing.elastic(1),
      useNativeDriver: Platform.OS === 'android',
    }).start();
  }, [percent]);

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
          if (!hideLabel && autoLabel) {
            setIsVisibleLabel(true);
          }
        },
        onPanResponderRelease: () => {
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
          }).start();
          if (!hideLabel && autoLabel) {
            setIsVisibleLabel(false);
          }
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
          const value = getStepValueByPercent({
            percent,
            stepPercent,
            step,
          });

          setPercent(percent);
          setValue(value);

          if (onChange) {
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
          testID="marks-test-id"
          sliderWidth={sliderWidth}
          minValue={minValue}
          maxValue={maxValue}
          step={step}
          style={{ backgroundColor: markColor }}
        />
      )}
      <ThumbPositioner percent={percent}>
        <Thumb scaleValue={scaleValue} opacityValue={opacityValue} style={{ backgroundColor: trackColor }}/>
      </ThumbPositioner>
      {isVisibleLabel && <Label percentValue={percentValue} value={value} />}
    </Container>
  );
};

export default Slider;
