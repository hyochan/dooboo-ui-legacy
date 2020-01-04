import React, { useCallback, useState } from 'react';
import Snackbar, { Timer } from '../../src/components/shared/Snackbar';
import { color, text } from '@storybook/addon-knobs';

import { ContainerDeco } from '../decorators';
import { Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

storiesOf('Snackbar', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: 28;
  flex-direction: column;
`;

const Button = styled.TouchableOpacity`
  width: 230px;
  margin-bottom: 15px;
  padding: 10px;
  borderWidth: 2px;
`;

function Default(): React.ReactElement {
  const [show, setShow] = useState<boolean>(false);
  const [timer, setTimer] = useState<Timer>(Timer.SHORT);
  const snackbarText = text('Snackbar Text', 'Simple Snackbar is opened');
  const actionText = text('action text', 'close');
  const containerColor = color('container color', '#1976D1');
  const messageColor = color('message color', '#ffffff');
  const actionColor = color('action color', '#5F04B4');
  const onPressAction = useCallback((): void => {
    setShow(false);
  }, []);
  const onPress = useCallback((props: string): void => {
    setShow(true);
    props === 'Long' ? setTimer(Timer.LONG) : setTimer(Timer.SHORT);
  }, []);

  return (
    <Container>
      <Button onPress={(): void => onPress('Short')}>
        <Text>OPEN SNACKBAR(Short Timer)</Text>
      </Button>
      <Button onPress={(): void => onPress('Long')}>
        <Text>OPEN SNACKBAR(Long Timer)</Text>
      </Button>
      <Snackbar
        text={snackbarText}
        actionText={actionText}
        show={show}
        setShow={setShow}
        timer={timer}
        onPressAction={onPressAction}
        actionStyle={{
          color: actionColor,
        }}
        containerStyle={{
          backgroundColor: containerColor,
        }}
        messageStyle={{
          color: messageColor,
        }}
      />
    </Container>
  );
}
