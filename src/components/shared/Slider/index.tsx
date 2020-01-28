import { Animated, Easing, PanResponder, Platform, StyleProp, TextStyle, ViewStyle } from 'react-native';
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

interface SliderStyle {
  markStyle?: StyleProp<ViewStyle>;
  railStyle?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
}

interface LabelProps {
  labelStyle: StyleProp<ViewStyle>;
  // size: number;
  // backgroundColor: string;
  textStyle: StyleProp<TextStyle>;
}

interface Props {
  hideMark?: boolean;
  hideLabel?: boolean;
  autoLabel?: boolean;
  step?: number;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number) => void;
  sliderStyle?: SliderStyle;
  labelProps?: LabelProps;
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
  sliderStyle = {
    markStyle: { backgroundColor: '#4163f4' },
    railStyle: { backgroundColor: '#bcdbfb' },
    trackStyle: { backgroundColor: '#0b21e8' },
  },
  labelProps = { labelStyle: { backgroundColor: '#4163f4', height: 32 }, textStyle: { color: 'white', fontSize: 15 } },
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
      <Rail testID="rail-test-id" style={sliderStyle.railStyle}/>
      <Track testID="track-test-id" percent={percent} style={sliderStyle.trackStyle}/>
      {!hideMark && (step > 0) && (
        <Marks
          testID="marks-test-id"
          sliderWidth={sliderWidth}
          minValue={minValue}
          maxValue={maxValue}
          step={step}
          style={sliderStyle.markStyle}
        />
      )}
      <ThumbPositioner testID="thumb-positioner-test-id" percent={percent}>
        <Thumb
          testID="thumb-test-id"
          scaleValue={scaleValue}
          opacityValue={opacityValue}
          style={sliderStyle.trackStyle}
        />
      </ThumbPositioner>
      {isVisibleLabel && <Label
        percentValue={percentValue}
        value={value}
        labelProps={labelProps}/>}
    </Container>
  );
};

export default Slider;
