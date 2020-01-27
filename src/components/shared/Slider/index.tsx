import React, { FC } from 'react';
import { PanResponder } from 'react-native';
import Rail from './Rail';
import styled from 'styled-components/native';

const Container = styled.View``;

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
          console.log(gestureState);
        },
      }),
    [],
  );

  return (
    <Container {...panResponder.panHandlers}>
      <Rail />
    </Container>
  );
};

export default Slider;
