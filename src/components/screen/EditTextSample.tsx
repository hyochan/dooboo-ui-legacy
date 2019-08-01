import React, { useState } from 'react';
import {
  View,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

import { DefaultTheme } from 'styled-components';
import styled from 'styled-components/native';

import Button from '../shared/Button';
import EditText from '../shared/EditText';

const StyledScrollView = styled.ScrollView`
  background-color: white;
`;

const HeaderTitle = styled.Text`
  font-weight: bold;
  font-size: 24px;
  line-height: 35px;
  color: #495057;
`;

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  padding: 20px;
  padding-top: 10px;
`;

const StyledSignInButton = styled(Button)`
  border-radius: 26;
  border-width: 0;
  margin-top: 40;
  width: 100%;
  background-color: rgb(36,205,151);
`;

const StyledText = styled.Text`
  font-size: 14;
  color: #495057;
`;

const StyledAccentText = styled(StyledText)`
  color: #6772E5;
  font-weight: bold;
`;

interface Props {
  navigation?: any;
  screenProps: {
    theme: DefaultTheme,
  };
}

function Page(props: Props) {
  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const fontStyle: TextStyle = {
    fontWeight: 'bold',
    fontSize: 13,
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const onSignIn = () => {
    if (!validateEmail(email)) {
      setErrorEmail('Not a valid email address');
    } else {
      setErrorEmail('');
    }
  };

  const onTextChanged = (type: string, text: string) => {
    type === 'EMAIL' ? setEmail(text) : setPassword(text);

    if (type === 'EMAIL' && text === '') {
      setErrorEmail('');
    }
  };

  return (
    <StyledScrollView
      contentContainerStyle={{
        marginTop: 8,
        paddingHorizontal: 20,
        paddingBottom: 40,
      }}
    >
      <Container>
        <HeaderTitle>Sign in with Email</HeaderTitle>
        <EditText
          testID='EMAIL_INPUT'
          textStyle={{
            color: '#495057',
          }}
          label='Email'
          placeholder='Write email address'
          placeholderTextColor='#ADB5BD'
          text={ email }
          onTextChanged={ (text: string) => onTextChanged('EMAIL', text) }
          style={ { marginTop: 50 } }
          errorText={errorEmail}
          onSubmitEditing={onSignIn}
        />
        <EditText
          testID='PASSWORD_INPUT'
          textStyle={{
            color: '#ADB5BD',
          }}
          secureTextEntry={true}
          label='Password'
          placeholder='Please write your password'
          placeholderTextColor='#ADB5BD'
          text={ password }
          onTextChanged={ (text: string) => onTextChanged('PASSWORD', text) }
          style={ { marginTop: 36 } }
          onSubmitEditing={onSignIn}
        />
        <StyledSignInButton
          testID='btnEmail'
          onClick={() => onSignIn()}
          textStyle={fontStyle}
          text='Login'
        />
        {/* Email SignUp text */}
        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <StyledText testID='NO_ACCOUNT'>Do not have and account? </StyledText>
          <TouchableOpacity
            onPress={() => null}
            style={{ padding: 4 }}
          >
            <StyledAccentText>Find</StyledAccentText>
          </TouchableOpacity>
        </View>
      </Container>
    </StyledScrollView>
  );
}

export default Page;
