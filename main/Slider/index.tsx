import {
  Animated,
  Easing,
  PanResponder,
  Platform,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC, useEffect, useMemo, useState} from 'react';
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

const Container = styled.View`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`;

interface Props {
  hideMark?: boolean;
  hideLabel?: boolean;
  autoLabel?: boolean;
  step?: number;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  thumb?: React.ReactElement;
  thumbSize?: number;
  mark?: React.ReactElement;
  customMarkWidth?: number;
  startMark?: boolean;
  endMark?: boolean;
  markStyle?: StyleProp<ViewStyle>;
  railStyle?: StyleProp<ViewStyle>;
  trackStyle?: StyleProp<ViewStyle>;
  thumbStyle?: StyleProp<ViewStyle>;
  labelSize?: number;
  labelStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  onChange?: (value: number) => void;
}

const Slider: FC<Props> = ({
  hideMark = false,
  hideLabel = true,
  autoLabel = false,
  step = 1,
  defaultValue = 0,
  minValue = 0,
  maxValue = 100,
  thumb,
  thumbSize,
  mark,
  customMarkWidth,
  startMark = true,
  endMark = true,
  markStyle,
  railStyle,
  trackStyle,
  thumbStyle,
  labelSize,
  labelStyle,
  labelTextStyle,
  onChange,
}) => {
  const sliderRef = React.useRef<View>();
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
    if (!hideLabel && !autoLabel) setIsVisibleLabel(true);
  }, [autoLabel, hideLabel]);

  useEffect(() => {
    // Set Label percent animated Value
    Animated.timing(percentValue, {
      toValue: percent,
      duration: 255,
      easing: Easing.elastic(1),
      useNativeDriver: Platform.OS === 'android',
    }).start();
  }, [percent, percentValue]);

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

          if (!hideLabel && autoLabel) setIsVisibleLabel(true);
        },
        onPanResponderRelease: () => {
          Animated.timing(scaleValue, {
            toValue: 0,
            duration: 225,
            easing: Easing.bezier(0.0, 0.0, 0.2, 1),
            useNativeDriver: Platform.OS === 'android',
          }).start();

          if (!hideLabel && autoLabel) setIsVisibleLabel(false);
        },
        onPanResponderMove: (evt, gestureState) => {
          // the latest screen coordinates of the recently-moved touch
          const stepPercent = getStepPercent({
            minValue,
            maxValue,
            step,
          });

          // eslint-disable-next-line @typescript-eslint/no-shadow
          const percent = getPercentByPositionX({
            positionX: gestureState.moveX - sliderPositionX,
            sliderWidth,
            stepPercent,
          });

          // eslint-disable-next-line @typescript-eslint/no-shadow
          const value = getStepValueByPercent({
            percent,
            stepPercent,
            step,
          });

          setPercent(percent);
          setValue(value);

          if (onChange) onChange(value);
        },
      }),
    [
      scaleValue,
      hideLabel,
      autoLabel,
      minValue,
      maxValue,
      step,
      sliderPositionX,
      sliderWidth,
      onChange,
    ],
  );

  if (sliderRef.current)
    sliderRef.current.measure((x, y, width, height, pageX) => {
      setSliderPositionX(pageX);
      setSliderWidth(width);
    });

  return (
    // @ts-ignore
    <Container ref={sliderRef} {...panResponder.panHandlers}>
      <Rail testID="rail-test-id" style={railStyle} />
      <Track testID="track-test-id" percent={percent} style={trackStyle} />
      {!hideMark && step > 0 && (
        <Marks
          testID="marks-test-id"
          sliderWidth={sliderWidth}
          minValue={minValue}
          maxValue={maxValue}
          step={step}
          mark={mark}
          customMarkWidth={customMarkWidth}
          startMark={startMark}
          endMark={endMark}
          style={markStyle}
        />
      )}
      <Thumb
        testID="thumb-test-id"
        scaleValue={scaleValue}
        opacityValue={opacityValue}
        size={thumbSize}
        percent={percent}
        customThumb={thumb}
        style={thumbStyle}
      />
      {isVisibleLabel && (
        <Label
          testID="label-test-id"
          percentValue={percentValue}
          value={value}
          size={labelSize}
          style={labelStyle}
          textStyle={labelTextStyle}
        />
      )}
    </Container>
  );
};

export {Slider};
