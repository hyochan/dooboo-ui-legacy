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
  const [sliderWidth, setSliderWidth] = useState(0);
  const [layoutX, setLayoutX] = useState(0);
  const [positionX, setPositionX] = useState(0);

  const getPercentagePosition = (): number => {
    const percentage = (positionX / sliderWidth) * 100;
    if (percentage <= 0) return 0;
    else if (percentage >= 100) return 100;
    else return percentage;
  };

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          const moveX = gestureState.moveX;
          setPositionX(moveX - layoutX);
        },
      }),
    [layoutX],
  );

  return (
    <Container
      ref={sliderRef}
      {...panResponder.panHandlers}
      onLayout={(): void => {
        if (sliderRef) {
          sliderRef.current.measure((x, y, width, height, pageX) => {
            setLayoutX(pageX);
            setSliderWidth(width);
          });
        }
      }}
    >
      <Rail />
      <Thumb percentagePosition={getPercentagePosition()} />
    </Container>
  );
};

export default Slider;
