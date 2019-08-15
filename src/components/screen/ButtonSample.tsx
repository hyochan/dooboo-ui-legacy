import { IC_FACEBOOK, IC_GOOGLE } from '../../utils/Icons';
import React, { useState } from 'react';

import Button from '../shared/Button';
import { NavigationScreenProp } from 'react-navigation';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 28;
  padding-top: 80;

  flex-direction: column;
`;

interface Props {
  navigation?: NavigationScreenProp<any, any>;
}

function Page(props: Props) {
  const [facebookLoading, setFacebookLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  return (
    <Container>
      <Button
        testID='btn'
        isLoading={false}
        text='😀 😎 👍 💯'
        onClick={() => {}}
      />
      <Button
        style={{
          marginVertical: 40,
        }}
        isDisabled={true}
        text='This is disabled!!'
        onClick={() => {}}
      />
      <Button
        testID='btnGoogle'
        imgLeftSrc={IC_GOOGLE}
        isLoading={googleLoading}
        indicatorColor='#023059'
        onClick={() => {
          setGoogleLoading(true);
          const timeout = setTimeout(() => {
            setGoogleLoading(false);
            clearTimeout(timeout);
          }, 2000);
        }}
        text='GOOGLE SIGN IN'
      />
      <Button
        testID='btnFacebook'
        imgLeftSrc={IC_FACEBOOK}
        indicatorColor='#023059'
        isLoading={facebookLoading}
        imgLeftStyle={{
          height: 28,
          width: 16,
        }}
        style={{
          marginTop: 40,
          backgroundColor: '#ccc',
          borderWidth: 0.5,
          borderRadius: 0,
        }}
        onClick={() => {
          setFacebookLoading(true);
          const timeout = setTimeout(() => {
            setFacebookLoading(false);
            clearTimeout(timeout);
          }, 2000);
        }}
        text='FACEBOOK SIGN IN'
      />
    </Container>
  );
}

export default Page;
