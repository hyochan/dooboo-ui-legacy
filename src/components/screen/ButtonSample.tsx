import { IC_FACEBOOK, IC_GOOGLE } from '../shared/Icons';
import { Image, View } from 'react-native';
import React, { useState } from 'react';

import Button from '../shared/Button';

function Page(): React.ReactElement {
  const [facebookLoading, setFacebookLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  return (
    <View
      style={{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 28,
        paddingTop: 80,
        flexDirection: 'column',
      }}
    >
      <Button
        testID="btn"
        isLoading={false}
        text="😀 😎 👍 💯"
        onClick={(): void => {}}
      />
      <Button
        style={{
          marginVertical: 40,
        }}
        isDisabled={true}
        text="This is disabled!!"
        onClick={(): void => {}}
      />
      <Button
        testID="btnGoogle"
        leftComponent={<Image source={IC_GOOGLE} />}
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
        leftComponent={<Image source={IC_FACEBOOK} />}
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
    </View>
  );
}

export default Page;
