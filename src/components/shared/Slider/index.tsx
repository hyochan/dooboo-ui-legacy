import React, { FC, useMemo, useRef, useState } from 'react';
import { getPercent, percentToValue, valueToPercent } from './utils';

import Marks from './Marks';
import { PanResponder } from 'react-native';
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
}

const Slider: FC<Props> = ({
  hideMark = false,
  maxValue = 100,
  minValue = 0,
  defaultValue = 0,
  onChange,
  step,
}) => {
  const sliderRef = useRef<any>();
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [sliderPositionX, setSliderPositionX] = useState(0);
  const [percent, setPercent] = useState(
    defaultValue ? valueToPercent(defaultValue, maxValue, minValue) : 0,
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          // the latest screen coordinates of the recently-moved touch
          const moveX = gestureState.moveX;
          const percent = Math.round(getPercent(moveX - sliderPositionX, sliderWidth));
          setPercent(percent);

          if (onChange) {
            const value = percentToValue(percent, maxValue, minValue);
            onChange(Math.round(value));
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
      <Rail />
      <Track percent={percent} />
      {!hideMark && step && (
        <Marks
          sliderWidth={sliderWidth}
          minValue={minValue}
          maxValue={maxValue}
          step={step}
        />
      )}
      <ThumbPositioner percent={percent}>
        <Thumb />
      </ThumbPositioner>
    </Container>
  );
};

export default Slider;
