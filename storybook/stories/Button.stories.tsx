import { IC_FACEBOOK, IC_GOOGLE } from '../../src/Icons';
import { Image, View } from 'react-native';
import React, { useState } from 'react';

import Button from '../../src/components/shared/Button';
import { ContainerDeco } from '../decorators';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';
import { text } from '@storybook/addon-knobs';

;

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
  margin-top: 28px;
  padding-top: 80px;

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
        onPress={action('Clicked')}
      />
      <Button
        style={{
          marginVertical: 40,
        }}
        containerStyle={{
          marginTop: 32,
        }}
        isDisabled={true}
        text={text('button text', 'this is disabled')}
      />
      <Button
        leftElement={<Image width={12} height={12} source={IC_GOOGLE} />}
        isLoading={googleLoading}
        indicatorColor="#023059"
        containerStyle={{
          marginTop: 32,
        }}
        onPress={(): void => {
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
        leftElement={
          <View style={{
            position: 'absolute',
            left: 16,
          }}>
            <Image width={12} height={12} source={IC_FACEBOOK} />
          </View>
        }
        indicatorColor="#023059"
        isLoading={facebookLoading}
        containerStyle={{
          marginTop: 32,
        }}
        style={{
          backgroundColor: '#ccc',
          borderWidth: 0.5,
          borderRadius: 0,
        }}
        onPress={(): void => {
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
