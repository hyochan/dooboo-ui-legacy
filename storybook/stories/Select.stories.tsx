import { IC_FACEBOOK, IC_GOOGLE } from '../../src/components/shared/Icons';
import React, { useState } from 'react';

import { ContainerDeco } from '../decorators';
import { Image } from 'react-native';
import Select from '../../src/components/shared/Select';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';
import { text } from '@storybook/addon-knobs';

storiesOf('Select', module)
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
  width: 100%;
  margin-top: 28;
  padding-top: 80;

  flex-direction: column;
`;

function Default(): React.ReactElement {
  const [facebookLoading, setFacebookLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  return (
    <Container>
      <Select
        isLoading={false}
        text="😀 😎 👍 💯"
        onClick={action('Clicked')}
      />
    </Container>
  );
}
