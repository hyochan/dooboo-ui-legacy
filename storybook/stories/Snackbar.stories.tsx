import React, { useState } from 'react';
import Snackbar, { Timer } from '../../src/components/shared/Snackbar';
import { color, text } from '@storybook/addon-knobs';
import Button from '../../src/components/shared/Button';
import { ContainerDeco } from '../decorators';
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

function Default(): React.ReactElement {
  const [show, setShow] = useState<boolean>(false);
  const [timer, setTimer] = useState<Timer>(Timer.SHORT);
  const snackbarText = text('Snackbar Text', 'Simple Snackbar is opened');
  const actionText = text('action text', 'close');
  const containerColor = color('container color', '#1976D1');
  const messageColor = color('message color', '#ffffff');
  const actionColor = color('action color', '#5F04B4');

  return (
    <Container>
      <Button
        style={{
          marginVertical: 40,
        }}
        text="OPEN SNACKBAR (SHORT TIMER)"
        onClick={(): void => {
          setShow(true);
          setTimer(Timer.SHORT);
        }}
      />
      <Button
        text="OPEN SNACKBAR (LONG TIMER)"
        style={{
          marginVertical: 40,
        }}
        onClick={(): void => {
          setShow(true);
          setTimer(Timer.LONG);
        }}
      />
      <Snackbar
        text={snackbarText}
        actionText={actionText}
        show={show}
        setShow={setShow}
        timer={timer}
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
