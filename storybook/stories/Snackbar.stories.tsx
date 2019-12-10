import React, { useState } from 'react';

import Button from '../../src/components/shared/Button';
import { ContainerDeco } from '../decorators';
import Snackbar from '../../src/components/shared/Snackbar';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';
import { text, color } from '@storybook/addon-knobs';

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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const snackbarText = text('Snackbar Text', 'Simple Snackbar is opened');
  const containerColor = color('container color', '#1976D1');
  const messageColor = color('message color', '#ffffff');

  return (
    <Container>
      <Button
        style={{
          marginVertical: 40,
        }}
        text="OPEN SIMPLE SNACKBAR"
        onClick={(): void => setIsOpen(true)}
      />
      <Button
        text="CLOSE SIMPLE SNACKBAR"
        style={{
          marginVertical: 40,
        }}
        onClick={(): void => setIsOpen(false)}
      />
      {isOpen && (
        <Snackbar text={snackbarText}
          containerStyle={{
            backgroundColor: containerColor,
          }}
          messageStyle={{
            color: messageColor,
          }}
        />
      )}
    </Container>
  );
}
