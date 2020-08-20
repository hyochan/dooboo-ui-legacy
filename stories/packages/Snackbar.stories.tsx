import { Alert, Text } from 'react-native';
import React, { ReactElement, useCallback, useRef, useState } from 'react';
import Snackbar, {
  SnackbarProvider,
  SnackbarRef,
  Timer,
  useSnackbarContext,
} from '../../packages/Snackbar';
import { color, text } from '@storybook/addon-knobs';

import { ContainerDeco } from '../../storybook/decorators';
import { SwitchToggle } from '../../main';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: 150;
  flex-direction: column;
`;

const ToggleContainer = styled.View`
  margin-bottom: 15px;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Button = styled.TouchableOpacity`
  width: 230px;
  margin-bottom: 15px;
  padding: 10px;
  border-width: 2px;
`;

function Default(): React.ReactElement {
  const snackbar = useSnackbarContext();
  const [shortOrLong, setShortOrLong] = useState<boolean>(false);
  const [longText, setLongText] = useState<boolean>(false);
  const snackbarText = text('Snackbar Text', 'Simple Snackbar is opened');
  const snackbarLongText = text(
    'Snackbar Long Text',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus quia vel maxime nost',
  );
  const containerColor = color('container color', '#1976D1');
  const messageColor = color('message color', '#ffffff');
  const onPress = useCallback((): void => {
    if (snackbar) {
      snackbar.show({
        text: longText ? snackbarLongText : snackbarText,
        timer: shortOrLong ? Timer.LONG : Timer.SHORT,
        containerStyle: {
          backgroundColor: containerColor,
        },
        messageStyle: {
          color: messageColor,
          fontSize: 17,
        },
      });
    }
  }, [shortOrLong, longText, containerColor, messageColor]);

  return (
    <Container>
      <ToggleContainer>
        <Text>Timer</Text>
        <SwitchToggle
          switchOn={shortOrLong}
          onPress={(): void => setShortOrLong((prev) => !prev)}
        />
        <Text>SHORT / LONG</Text>
      </ToggleContainer>
      <ToggleContainer>
        <Text>Text</Text>
        <SwitchToggle
          switchOn={longText}
          onPress={(): void => setLongText((prev) => !prev)}
        />
        <Text>SHORT / LONG</Text>
      </ToggleContainer>
      <Button onPress={onPress}>
        <Text style={{ textAlign: 'center' }}>OPEN SNACKBAR(Default)</Text>
      </Button>
    </Container>
  );
}

function WithAction(): React.ReactElement {
  const snackbar = useRef<SnackbarRef>();
  const [shortOrLong, setShortOrLong] = useState<boolean>(false);
  const [longText, setLongText] = useState<boolean>(false);
  const snackbarText = text('Snackbar Text', 'Simple Snackbar is opened');
  const snackbarLongText = text(
    'Snackbar Long Text',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus quia vel maxime nost',
  );
  const actionText = text('action text', 'Action');
  const containerColor = color('container color', '#2979ff');
  const messageColor = color('message color', '#ffffff');
  const actionColor = color('action color', '#000000');
  const onPressAction = useCallback((): void => {
    Alert.alert('Action!!');
  }, []);
  const onPress = useCallback((): void => {
    snackbar.current && snackbar.current.show({
      text: longText ? snackbarLongText : snackbarText,
      timer: shortOrLong ? Timer.LONG : Timer.SHORT,
      containerStyle: {
        backgroundColor: containerColor,
      },
      messageStyle: {
        color: messageColor,
        fontSize: 17,
      },
      actionText,
      actionStyle: {
        color: actionColor,
        fontSize: 17,
      },
      onPressAction,
    });
  }, [shortOrLong, longText, containerColor, messageColor]);

  return (
    <Container>
      <ToggleContainer>
        <Text>Timer</Text>
        <SwitchToggle
          switchOn={shortOrLong}
          onPress={(): void => setShortOrLong((prev) => !prev)}
        />
        <Text>SHORT / LONG</Text>
      </ToggleContainer>
      <ToggleContainer>
        <Text>Text</Text>
        <SwitchToggle
          switchOn={longText}
          onPress={(): void => setLongText((prev) => !prev)}
        />
        <Text>SHORT / LONG</Text>
      </ToggleContainer>
      <Button onPress={onPress}>
        <Text style={{ textAlign: 'center' }}>OPEN SNACKBAR(With Action)</Text>
      </Button>
      <Snackbar
        // @ts-ignore
        ref={snackbar}
      />
    </Container>
  );
}

/**
 * Below are stories for web
 */
export default {
  title: 'SnackBar',
};

export const toStorybook = (): ReactElement => <>
  <SnackbarProvider>
    <Default />
  </SnackbarProvider>
</>;

toStorybook.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */

storiesOf('Snackbar', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <SnackbarProvider>
      <Default />
    </SnackbarProvider>
  ))
  .add('└with action', () => <WithAction />);
