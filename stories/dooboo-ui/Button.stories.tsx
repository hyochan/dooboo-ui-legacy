import { IC_FACEBOOK, IC_GOOGLE } from '../Icon';
import { Image, View } from 'react-native';
import React, { ReactElement, useState } from 'react';

import Button from '../../main/Button';
import { ContainerDeco } from '../../storybook/decorators';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';
import { text } from '@storybook/addon-knobs';

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
        style={{
          marginVertical: 40,
        }}
      />
      <Button
        style={{
          backgroundColor: '#109CF1',
        }}
        hoverStyle={{
          backgroundColor: '#34AFF9',
        }}
        Accent={{
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.24,
          shadowRadius: 16.0,
          elevation: 10,
          borderRadius: 4,
        }}
        textStyle={{ color: '#FFFFFF' }}
        onPress={action('Clicked')}
        text={'Accent button '}
      />

      <Button
        hoverTextStyle={{
          color: '#34AFF9',
        }}
        Secondary={{
          borderColor: '#109CF1',
          borderWidth: 2,
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.24,
          shadowRadius: 16.0,
          elevation: 10,
          borderRadius: 4,
        }}
        style={{
          marginVertical: 40,
        }}
        textStyle={{ color: '#109CF1' }}
        onPress={action('Clicked')}
        text={'Secondary'}
      />
      <Button
        style={{
          marginVertical: 40,
        }}
        isDisabled={true}
        text={text('button text', 'this is disabled')}
      />
      <Button
        leftElement={
          <View
            style={{
              position: 'absolute',
              left: 16,
            }}>
            <Image style={{ width: 20, height: 20 }} source={IC_GOOGLE} />
          </View>
        }
        isLoading={googleLoading}
        indicatorColor="#023059"
        containerStyle={{
          marginTop: 32,
        }}
        style={{
          backgroundColor: '#ccc',
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
          <View
            style={{
              position: 'absolute',
              left: 16,
            }}>
            <Image style={{ width: 15, height: 28 }} source={IC_FACEBOOK} />
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

/**
 * Below are stories for web
 */
export default {
  title: 'Button',
};

export const toStorybook = (): ReactElement => <Default />;

toStorybook.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */
storiesOf('Button', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));
