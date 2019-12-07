import React, { useState } from 'react';

import Button from '../../src/components/shared/Button';
import { ContainerDeco } from '../decorators';
import Snackbar from '../../src/components/shared/Snackbar';
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

function Default(): React.ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <Snackbar text={text('Snackbar Text', 'Simple Snackbar is opened')} />
      )}
    </Container>
  );
}
