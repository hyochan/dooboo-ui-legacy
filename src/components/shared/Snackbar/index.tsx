import * as React from 'react';

import { Dimensions, Text, TextStyle, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('screen');
const maxWidth = width - 32;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 150px;
  max-width: ${maxWidth};
  text-align: left;
  position: absolute;
  font-size: 16;
  padding: 16px;
  bottom: 50px;
  background-color: #303235;
  border-radius: 10;
`;

const ActionContainer = styled.View`
  display: flex;
  align-items: center;
  margin-left: auto;
  padding-left: 16px;
`;

const ActionButton = styled.TouchableOpacity`
  width: auto;
  border: none;
  height: auto;
  background-color: transparent;
`;

export interface SnackbarProps {
  text: string;
  actionText?: string;
  testID?: string;
  show: boolean;
  setShow: (show: boolean) => void;
  timer?: Timer;
  actionStyle?: TextStyle;
  containerStyle?: ViewStyle;
  messageStyle?: TextStyle;
  onPressAction?: () => void;
}

export enum Timer {
  SHORT = 1500,
  LONG = 3000,
}

const Snackbar: React.FC<SnackbarProps> = (props) => {
  const { testID, show, setShow, timer = Timer.SHORT, actionText } = props;
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
        <Container testID={testID} style={props.containerStyle}>
          <Text style={props.messageStyle}>{props.text}</Text>
          {actionText && (
            <ActionContainer>
              <ActionButton onPress={props.onPressAction}>
                <Text style={props.actionStyle}>{props.actionText}</Text>
              </ActionButton>
            </ActionContainer>
          )}
        </Container>
      )}
    </>
  );
};

export default Snackbar;
