import React, { FC, useRef, useState } from 'react';
import { getPercent, percentToValue, valueToPercent } from './utils';
import { PanResponder } from 'react-native';
import Rail from './Rail';
import Thumb from './Thumb';
import styled from 'styled-components/native';

const Container = styled.View`
  position: relative;
`;

interface Props {
  defaultValue?: number;
  maxValue?: number;
  minValue?: number;
  onChange?: (value: number) => void;
  step?: number;
}

const Slider: FC<Props> = ({
  maxValue = 100,
  minValue = 0,
  defaultValue,
  onChange,
}) => {
  const sliderRef = useRef<any>();
  const [sliderLength, setSliderLength] = useState<number>(0);
  const [sliderPositionX, setSliderPositionX] = useState(0);
  const [percent, setPercent] = useState(
    defaultValue ? valueToPercent(defaultValue, maxValue, minValue) : 0,
  );

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          // the latest screen coordinates of the recently-moved touch
          const moveX = gestureState.moveX;
          const percent = getPercent(moveX - sliderPositionX, sliderLength);
          setPercent(percent);
          if (onChange) {
            onChange(percentToValue(percent, maxValue, minValue));
          }
        },
      }),
    [sliderPositionX, sliderLength, onChange],
  );

  return (
    <Container
      ref={sliderRef}
      {...panResponder.panHandlers}
      onLayout={(): void => {
        if (sliderRef) {
          sliderRef.current.measure((x, y, width, height, pageX) => {
            setSliderPositionX(pageX);
            setSliderLength(width);
          });
        }
      }}
    >
      <Rail />
      <Thumb percent={percent} />
    </Container>
  );
};

export default Slider;
