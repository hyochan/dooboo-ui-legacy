import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import Button from '../shared/Button';
import EditText from '../shared/EditText';

function Page(): React.ReactElement {
  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const fontStyle: TextStyle = {
    fontWeight: 'bold',
    fontSize: 13,
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');

  const onSignIn = (): void => {
    if (!validateEmail(email)) {
      setErrorEmail('Not a valid email address');
    } else {
      setErrorEmail('');
    }
  };

  const onTextChanged = (type: string, text: string): void => {
    type === 'EMAIL' ? setEmail(text) : setPassword(text);

    if (type === 'EMAIL' && text === '') {
      setErrorEmail('');
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: 'white' }}
      contentContainerStyle={{
        marginTop: 8,
        paddingHorizontal: 20,
        paddingBottom: 40,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          padding: 20,
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            lineHeight: 35,
            color: '#495057',
          }}
        >
          Sign in with Email
        </Text>
        <EditText
          testID="EMAIL_INPUT"
          textStyle={{
            color: '#495057',
          }}
          label="Email"
          placeholder="Write email address"
          placeholderTextColor="#ADB5BD"
          text={email}
          onTextChanged={(text: string): void => onTextChanged('EMAIL', text)}
          style={{ marginTop: 50 }}
          errorText={errorEmail}
          onSubmitEditing={onSignIn}
        />
        <EditText
          testID="PASSWORD_INPUT"
          textStyle={{
            color: '#ADB5BD',
          }}
          secureTextEntry={true}
          label="Password"
          placeholder="Please write your password"
          placeholderTextColor="#ADB5BD"
          text={password}
          onTextChanged={(text: string): void =>
            onTextChanged('PASSWORD', text)
          }
          style={{ marginTop: 36 }}
          onSubmitEditing={onSignIn}
        />
        <Button
          style={{
            borderRadius: 26,
            borderWidth: 0,
            marginTop: 40,
            width: '100%',
            backgroundColor: 'rgb(36, 205, 151)',
          }}
          testID="btnEmail"
          onClick={(): void => onSignIn()}
          text="Login"
          theme={{
            fontStyle,
          }}
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
          <Text
            testID="NO_ACCOUNT"
            style={{
              fontSize: 14,
              color: '#495057',
            }}
          >
            Do not have and account?{' '}
          </Text>
          <TouchableOpacity onPress={(): null => null} style={{ padding: 4 }}>
            <Text
              style={{
                color: '#6772e5',
                fontWeight: 'bold',
              }}
            >
              Find
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Page;
