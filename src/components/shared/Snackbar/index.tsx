import * as React from 'react';

import { Text, TextStyle, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  text-align: left;
  position: absolute;
  font-size: 16;
  padding: 16px;
  bottom: 50;
  background-color: #303235;
  border-radius: 10;
`;

export interface SnackbarProps {
  text: string;
  testID?: string;
  containerStyle?: ViewStyle;
  messageStyle?: TextStyle;
}

const Snackbar: React.FC<SnackbarProps> = (props) => {
  return (
    <Container
      testID={props.testID}
      style={props.containerStyle}
    >
      <Text
        style={props.messageStyle}
      >
        {props.text}
      </Text>
    </Container>
  );
};

export default Snackbar;
