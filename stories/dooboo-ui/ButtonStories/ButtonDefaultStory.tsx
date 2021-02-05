import {IC_FACEBOOK, IC_GOOGLE} from '../../Icon';
import {Image, View} from 'react-native';
import React, {useState} from 'react';

import {Button} from '../../../main';
import type {FC} from 'react';
import {action} from '@storybook/addon-actions';
import {light} from '../../../main/theme';
import styled from 'styled-components/native';
import {text} from '@storybook/addon-knobs';

const ScrollContainer = styled.ScrollView`
  width: 100%;
`;

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-direction: column;
`;

const Default: FC = () => {
  const [facebookLoading, setFacebookLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  return (
    <ScrollContainer>
      <Container>
        <Button
          loading={false}
          text="😀 😎 👍 💯"
          onPress={action('Clicked')}
          style={{marginVertical: 40}}
          styles={{
            container: {
              borderRadius: 20,
              borderWidth: 0.5,
              backgroundColor: 'white',
            },
          }}
        />
        <Button
          styles={{
            container: {
              borderRadius: 20,
              paddingVertical: 11,
              paddingHorizontal: 52,
            },
            text: {
              fontSize: 16,
            },
          }}
          onPress={action('Clicked')}
          text={'Hovered button in web'}
        />

        <Button
          style={{marginVertical: 40}}
          styles={{
            container: {
              borderWidth: 0.5,
            },
          }}
          onPress={action('Clicked')}
          text={'Outlined button'}
        />
        <Button
          disabled={true}
          text={text('button text', 'this is disabled')}
        />
        <Button
          leftElement={
            <View style={{marginRight: 12}}>
              <Image style={{width: 20, height: 20}} source={IC_GOOGLE} />
            </View>
          }
          loading={googleLoading}
          style={{marginBottom: 20, marginTop: 30}}
          styles={{
            container: {
              height: 52,
              width: 300,
              borderWidth: 0.5,
              borderColor: light.dialog,
              borderRadius: 40,
              backgroundColor: light.googleBackground,
            },
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
                left: 24,
              }}>
              <Image style={{width: 15, height: 28}} source={IC_FACEBOOK} />
            </View>
          }
          loading={facebookLoading}
          styles={{
            container: {
              height: 52,
              width: 300,
              borderWidth: 0.5,
              borderColor: light.dialog,
              borderRadius: 40,
              backgroundColor: light.secondary,
            },
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
    </ScrollContainer>
  );
};

export default Default;
