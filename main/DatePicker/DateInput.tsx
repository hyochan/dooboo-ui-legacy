import React from 'react';
import { ViewStyle } from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: center;
`;
const DateText = styled.Text``;
interface Props {
  style?: ViewStyle;
  selectedDate?: Date;
}

const DateInput = (props: Props): React.ReactElement => {
  return (
    <Container style={props.style}>
      <DateText>
        {props.selectedDate ? props.selectedDate.toLocaleDateString() : '----'}
      </DateText>
    </Container>
  );
};

export default DateInput;
