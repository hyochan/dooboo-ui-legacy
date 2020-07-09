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
      />
      <Button
        style={{
          marginVertical: 40,
          backgroundColor: 'gray',
        }}
        containerStyle={{
          marginTop: 32,
        }}
        isHoverAble={true}
        hoverStyle={{
          opacity: 0.5,
        }}
        text={'HoverButton'}
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
