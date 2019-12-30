import React, { useState } from 'react';
import Snackbar, { Timer } from '../../src/components/shared/Snackbar';
import Button from '../../src/components/shared/Button';
import { ContainerDeco } from '../decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';
import { text } from '@storybook/addon-knobs';

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

const ActionButton = styled(Button)`
    width: auto;
    border: none;
    height: auto;
    background-color: transparent;
`;

function Default(): React.ReactElement {
  const [show, setShow] = useState<boolean>(false);
  const [timer, setTimer] = useState<Timer>(Timer.SHORT);

  const action = (
    <ActionButton text = "action"
      onClick={(): void => {
        setShow(false);
      }}/>
  );

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
        text={text('Snackbar Text', 'Simple Snackbar is opened')}
        show={show}
        setShow={setShow}
        timer={timer}
        action={action}
      />
    </Container>
  );
}
