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
import styled from 'styled-components/native';

const Container = styled.View``;

interface Props {
  defaultValue?: number;
  maxValue?: number;
  minValue?: number;
  onChange?: (value: number) => void;
  step?: number;
  labelDisplay?: LabelDisplay;
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
    if (labelDisplay === 'on') {
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
        onPanResponderGrant: (evt, gestureState) => {
          console.log(gestureState);
        },
      }),
    [],
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
        <Thumb scaleValue={scaleValue} opacityValue={opacityValue} style={{ backgroundColor: trackColor }}/>
      </ThumbPositioner>
      {isVisibleLabel && <Label percentValue={percentValue} value={value} />}
    </Container>
  );
};

export default Slider;
