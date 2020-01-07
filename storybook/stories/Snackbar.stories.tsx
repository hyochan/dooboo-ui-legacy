import React, { useCallback, useState } from 'react';
import Snackbar, { Timer } from '../../src/components/shared/Snackbar';
import { color, text } from '@storybook/addon-knobs';

import { ContainerDeco } from '../decorators';
import SwitchToggle from '../../src/components/shared/SwitchToggle';
import { Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

storiesOf('Snackbar', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ))
  .add('└with action', () => <WithAction />);

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: 28;
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
  const [show, setShow] = useState<boolean>(false);
  const [timer, setTimer] = useState<Timer>(Timer.SHORT);
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
    setShow(true);
    shortOrLong ? setTimer(Timer.LONG) : setTimer(Timer.SHORT);
  }, [shortOrLong]);

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
      <Snackbar
        text={longText ? snackbarLongText : snackbarText}
        show={show}
        setShow={setShow}
        timer={timer}
        containerStyle={{
          backgroundColor: containerColor,
        }}
        messageStyle={{
          color: messageColor,
          fontSize: 17,
        }}
      />
    </Container>
  );
}

function WithAction(): React.ReactElement {
  const [show, setShow] = useState<boolean>(false);
  const [timer, setTimer] = useState<Timer>(Timer.SHORT);
  const [shortOrLong, setShortOrLong] = useState<boolean>(false);
  const [longText, setLongText] = useState<boolean>(false);
  const snackbarText = text('Snackbar Text', 'Simple Snackbar is opened');
  const snackbarLongText = text(
    'Snackbar Long Text',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus quia vel maxime nost',
  );
  const actionText = text('action text', 'close');
  const containerColor = color('container color', '#2979ff');
  const messageColor = color('message color', '#ffffff');
  const actionColor = color('action color', '#000000');
  const onPressAction = useCallback((): void => {
    setShow(false);
  }, []);
  const onPress = useCallback((): void => {
    setShow(true);
    shortOrLong ? setTimer(Timer.LONG) : setTimer(Timer.SHORT);
  }, [shortOrLong]);

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
        text={longText ? snackbarLongText : snackbarText}
        actionText={actionText}
        show={show}
        setShow={setShow}
        timer={timer}
        onPressAction={onPressAction}
        actionStyle={{
          color: actionColor,
          fontSize: 17,
        }}
        containerStyle={{
          backgroundColor: containerColor,
        }}
        messageStyle={{
          color: messageColor,
          fontSize: 17,
        }}
      />
    </Container>
  );
}
