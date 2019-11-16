import { IC_FACEBOOK, IC_GOOGLE } from '../../src/components/shared/Icons';
import React, { useState } from 'react';

import Button from '../../src/components/shared/Button';
import { ContainerDeco } from '../decorators';
import { Image } from 'react-native';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';
import { text } from '@storybook/addon-knobs';

storiesOf('Button', module)
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
      <Button
        isLoading={false}
        text="😀 😎 👍 💯"
        onClick={action('Clicked')}
      />
      <Button
        style={{
          marginVertical: 40,
        }}
        isDisabled={true}
        // text='This is disabled!!'
        text={text('button text', 'this is disabled')}
      />
      <Button
        iconLeft={<Image source={IC_GOOGLE} />}
        isLoading={googleLoading}
        indicatorColor="#023059"
        onClick={(): void => {
          setGoogleLoading(true);
          const timeout = setTimeout(() => {
            setGoogleLoading(false);
            clearTimeout(timeout);
          }, 2000);
        }}
        text="GOOGLE SIGN IN"
      />
      <Button
        testID="btnFacebook"
        iconLeft={<Image source={IC_FACEBOOK} />}
        indicatorColor="#023059"
        isLoading={facebookLoading}
        style={{
          marginTop: 40,
          backgroundColor: '#ccc',
          borderWidth: 0.5,
          borderRadius: 0,
        }}
        onClick={(): void => {
          setFacebookLoading(true);
          const timeout = setTimeout(() => {
            setFacebookLoading(false);
            clearTimeout(timeout);
          }, 2000);
        }}
        text="FACEBOOK SIGN IN"
      />
    </Container>
  );
}
