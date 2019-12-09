import React, { FC } from 'react';
import { PanResponder } from 'react-native';
import Rail from './Rail';
import styled from 'styled-components/native';
import Thumb from './Thumb';

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

const Slider: FC<Props> = () => {
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: (evt, gestureState) => {
        },
      }),
    [],
  );

  return (
    <Container {...panResponder.panHandlers}>
      <Rail />
      <Thumb />
    </Container>
  );
};

export default Slider;
