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
  align-items: center;
  position: absolute;
  font-size: 16;
  padding: 10px 16px;
  bottom: 50px;
  background-color: #303235;
  border-radius: 10;
`;

const ActionContainer = styled.View`
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: -5px;
  padding-left: 16px;
`;

const Touchable = styled.TouchableOpacity``;

const ActionButton = styled.View`
  padding: 4px 4px 2px 2px;
`;

export interface SnackbarProps {
  testID?: string;
  ref?: any;
}

interface Content {
  text: string;
  actionText?: string;
  timer?: Timer;
  actionStyle?: TextStyle;
  containerStyle?: ViewStyle;
  messageStyle?: TextStyle;
  onPressAction?: () => void;
}

interface ShowingState {
  isVisible?: boolean;
  isShowing?: boolean;
  timeout?: any;
}

export interface SnackbarRef {
  show(content: Content): void;
}

export enum Timer {
  SHORT = 1500,
  LONG = 3000,
}

const Snackbar: React.FC<SnackbarProps> = React.forwardRef<SnackbarRef, SnackbarProps>((props, ref) => {
  const { testID } = props;
  const [showingState, setShowingState] = React.useState<ShowingState>({ isVisible: false, isShowing: false });
  const [content, setContent] = React.useState<Content>({ text: '', timer: Timer.SHORT });
  const { text, actionText, messageStyle, actionStyle, containerStyle, timer = Timer.SHORT, onPressAction } = content;
  const { isShowing, isVisible, timeout } = showingState;
  const show = (content): void => {
    setContent(content);
    clearTimeout(timeout);
    setShowingState({ isShowing: true });
  };
  React.useEffect(() => {
    if (isShowing) {
      if (isVisible) {
        setShowingState({ isVisible: false });
      } else {
        const timeout = setTimeout(() => {
          setShowingState({ isVisible: false });
        }, timer);

        setShowingState({ isShowing: false, isVisible: true, timeout });
      }
    }
  }, [showingState]);
  React.useImperativeHandle(ref, () => ({
    show,
  }));
  return (
    <>
      {showingState.isVisible && (
        <Container testID={testID} style={containerStyle}>
        <Text style={messageStyle}>{text}</Text>
        {actionText && (
          <ActionContainer>
            <Touchable onPress={onPressAction}>
              <ActionButton>
                <Text style={actionStyle}>{actionText}</Text>
              </ActionButton>
            </Touchable>
          </ActionContainer>
        )}
        </Container>
      )}
    </>
  );
});

export default Snackbar;
