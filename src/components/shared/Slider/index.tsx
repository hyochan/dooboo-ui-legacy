import React, { FC, useRef, useState } from 'react';
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

const Slider: FC<Props> = ({ maxValue = 100, minValue = 0 }) => {
  const sliderRef = useRef<any>();
  const [sliderLength, setSliderLength] = useState(0);
  const [sliderPositionX, setSliderPositionX] = useState(0);
  const [positionX, setPositionX] = useState(0);

  const getPercent = (): number => {
    const percent = (positionX / sliderLength) * 100;
    if (percent <= 0) return 0;
    else if (percent >= 100) return 100;
    else return percent;
  };

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          // the latest screen coordinates of the recently-moved touch
          const moveX = gestureState.moveX;
          setPositionX(moveX - sliderPositionX);
        },
      }),
    [sliderPositionX],
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
      <Thumb percent={getPercent()} />
    </Container>
  );
};

export default Slider;
