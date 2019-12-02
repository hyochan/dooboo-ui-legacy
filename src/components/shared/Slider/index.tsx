import React, { FC } from 'react';
import { PanResponder } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View``;

const Rail = styled.View`
  width: 200;
  height: 6;
  border-radius: 3;
  background-color: gray;
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
