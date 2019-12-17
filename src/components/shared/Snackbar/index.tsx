import * as React from 'react';

import { Text } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  text-align: left;
  position: absolute;
  font-size: 16;
  padding: 16px;
  bottom: 50px;
  background-color: #303235;
`;

export interface SnackbarProps {
  text: string;
  testID?: string;
  show: boolean;
  setShow: (show: boolean) => void;
  timer?: Timer;
}

export enum Timer {
  SHORT = 1500,
  LONG = 3000,
}

const Snackbar: React.FC<SnackbarProps> = (props) => {
  const { testID, show, setShow, timer = Timer.SHORT } = props;
  React.useEffect(() => {
    let timeout;
    if (show === true) {
      timeout = setTimeout(() => {
        setShow(false);
      }, timer);
    }
    return (): void => clearTimeout(timeout);
  }, [show]);
  return (
    <>
      {show && (
        <Container testID={testID}>
          <Text
            style={{
              color: '#ffffff',
            }}
          >
            {props.text}
          </Text>
        </Container>
      )}
    </>
  );
};

export default Snackbar;
