import * as React from 'react';

import { Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  text-align: left;
  position: absolute;
  font-size: 16;
`;

export interface SnackbarProps {
  text: string;
  testID?: string;
}

function Snackbar(props: SnackbarProps): React.ReactElement {
  return (
    <Container
      testID={props.testID}
      style={{
        padding: 16,
        bottom: 50,
        backgroundColor: '#303235',
      }}
    >
      <Text
        style={{
          color: '#ffffff',
        }}
      >
        {props.text}
      </Text>
    </Container>
  );
}

export default Snackbar;
