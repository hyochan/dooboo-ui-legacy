import {Button, EditText} from '../../../main';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {useTheme} from '../../../main/theme/ThemeProvider';

const EditTextRowWithTheme = (): React.ReactElement => {
  const {theme} = useTheme();

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');

  const onSignIn = (): void => {
    if (!validateEmail(email)) setErrorEmail('Not a valid email address');
  };

  const onTextChanged = (type: string, text: string): void => {
    type === 'EMAIL' ? setEmail(text) : setPassword(text);

    if (type === 'EMAIL' && text === '') setErrorEmail('');
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: theme.background,
      }}>
      <ScrollView
        contentContainerStyle={{
          alignSelf: 'stretch',
          paddingHorizontal: 40,
          paddingVertical: 80,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: Platform.OS === 'web' ? 438 : '100%',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              lineHeight: 35,
              color: theme.text,
            }}>
            Sign in with Email
          </Text>
          <EditText
            type="row"
            labelText="email"
            placeholder="your@email.com"
            value={email}
            onChangeText={(text: string): void => onTextChanged('EMAIL', text)}
            style={{marginTop: 50}}
            styles={{
              errorText: {
                color: '#661111',
              },
            }}
            errorText={errorEmail}
            onSubmitEditing={onSignIn}
          />
          <EditText
            type="row"
            secureTextEntry={true}
            labelText="Password"
            placeholder="Write your password"
            value={password}
            onChangeText={(text: string): void =>
              onTextChanged('PASSWORD', text)
            }
            style={{marginTop: 20}}
            onSubmitEditing={onSignIn}
          />
          <Button
            styles={{
              container: {
                borderRadius: 6,
                borderWidth: 0,
                marginTop: 40,
                width: 184,
                height: 48,
                backgroundColor: '#6DA6FC',
              },
              text: {
                color: '#FFFFFF',
              },
            }}
            testID="btn-default"
            onPress={(): void => onSignIn()}
            text="Login"
          />
          {/* Email SignUp text */}
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              testID="no-account"
              style={{
                fontSize: 14,
                color: '#495057',
              }}>
              Do not have and account?{' '}
            </Text>
            <TouchableOpacity onPress={(): null => null} style={{padding: 4}}>
              <Text
                style={{
                  color: '#6772e5',
                  fontWeight: 'bold',
                }}>
                Find
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditTextRowWithTheme;
