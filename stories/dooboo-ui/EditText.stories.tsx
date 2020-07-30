import EditText, { EditTextInputType } from '../../main/EditText';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { ReactElement, useState } from 'react';

import Button from '../../main/Button';
import { ContainerDeco } from '../../storybook/decorators';
import { IC_CHECK } from '../Icon';
import { storiesOf } from '@storybook/react-native';

const Default = (): React.ReactElement => {
  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorEmail, setErrorEmail] = useState<string>('');

  const onSignIn = (): void => {
    if (!validateEmail(email)) {
      setErrorEmail('Not a valid email address');
    }
  };

  const onTextChanged = (type: string, text: string): void => {
    type === 'EMAIL' ? setEmail(text) : setPassword(text);

    if (type === 'EMAIL' && text === '') {
      setErrorEmail('');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: 8,
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: Platform.OS === 'web' ? 438 : '100%',
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 24,
              lineHeight: 35,
              color: '#495057',
            }}>
            Sign in with Email
          </Text>
          <EditText
            testID="email-input-defualt"
            textStyle={{
              color: '#495057',
            }}
            label="Email"
            placeholder="Email address"
            placeholderTextColor="#ADB5BD"
            value={email}
            onChangeText={(text: string): void => onTextChanged('EMAIL', text)}
            style={{
              marginTop: 50,
            }}
            errorText={errorEmail}
            onSubmitEditing={onSignIn}
          />
          <EditText
            testID="password-input-default"
            textStyle={{
              color: '#ADB5BD',
            }}
            secureTextEntry={true}
            label="Password"
            placeholder="Your password"
            placeholderTextColor="#ADB5BD"
            value={password}
            onChangeText={(text: string): void =>
              onTextChanged('PASSWORD', text)
            }
            style={{ marginTop: 36 }}
            onSubmitEditing={onSignIn}
          />
          <Button
            style={{
              borderRadius: 6,
              borderWidth: 0,
              marginTop: 40,
              width: 184,
              height: 48,
              backgroundColor: '#6DA6FC',
            }}
            testID="btn-default"
            onPress={(): void => onSignIn()}
            textStyle={{
              color: '#FFFFFF',
            }}
            text="Login"
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
              testID="no-account"
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
    </SafeAreaView>
  );
};

const RowEditText = (): React.ReactElement => {
  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const [email, setEmail] = useState<string>('');
  const [emailErrorText, setEmailErrorText] = useState<string>('');
  const [passwordErrorText, setPasswordErrorText] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSignIn = (): void => {
    if (!validateEmail(email)) {
      setEmailErrorText('Not a valid email address');
    } else {
      setEmailErrorText('');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: 8,
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: Platform.OS === 'web' ? 438 : '100%',
          }}
        >
          <Text
            style={{
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: 32,
              lineHeight: 47,
              letterSpacing: -0.05,
              color: '#323C47',
            }}
          >
            Sign in with Email
          </Text>
          <EditText
            testID="email-input-row"
            errorTestID="email-input-error"
            type={EditTextInputType.ROW}
            value={email}
            numberOfLines={1}
            style={{
              marginTop: 50,
            }}
            onBlur={(): void => {
              if (!validateEmail(email)) {
                setEmailErrorText('Not a valid email address');
                return;
              }
              setEmailErrorText('');
            }}
            label="E-mail"
            autoCapitalize="none"
            onChangeText={(text: string): void => {
              setEmailErrorText('');
              setEmail(text);
            }}
            placeholder="Write email address."
            keyboardType="email-address"
            onSubmitEditing={onSignIn}
            errorText={emailErrorText}
            errorTextStyle={{
              fontSize: 12,
            }}
          />
          <EditText
            testID="password-input-row"
            errorTestID="password-input-error"
            type={EditTextInputType.ROW}
            autoCapitalize="none"
            style={{
              marginTop: 10,
              marginBottom: 24,
            }}
            label="Password"
            value={password}
            numberOfLines={1}
            onChangeText={(text): void => {
              setPasswordErrorText('');
              setPassword(text);
            }}
            placeholder="Write password"
            secureTextEntry={true}
            onSubmitEditing={onSignIn}
            errorText={passwordErrorText}
            errorTextStyle={{
              fontSize: 12,
            }}
          />
          <Button
            style={{
              borderRadius: 6,
              borderWidth: 0,
              marginTop: 40,
              width: 184,
              height: 48,
              backgroundColor: '#6DA6FC',
            }}
            testID="btn-row"
            onPress={(): void => onSignIn()}
            textStyle={{
              color: '#FFFFFF',
            }}
            text="Login"
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
              testID="no-account"
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
    </SafeAreaView>
  );
};

const BoxEditText = (): React.ReactElement => {
  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: 8,
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: Platform.OS === 'web' ? 438 : '100%',
          }}
        >
          <Text
            style={{
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: 32,
              lineHeight: 47,
              letterSpacing: -0.05,
              color: '#323C47',
            }}
          >
            Sign Up
          </Text>
          <EditText
            testID="email-input-box"
            type={EditTextInputType.BOX}
            labelTextStyle= {{
              color: '#333333',
              fontSize: 14,
              lineHeight: 24,
            }}
            focusedLabelStyle= {{
              color: '#333333',
            }}
            inputContainerRadius={30}
            textStyle={{
              color: '#495057',
            }}
            label="Email"
            placeholder="Email address"
            placeholderTextColor="#707683"
            value={email}
            onChangeText={(text: string): void => onTextChanged('EMAIL', text)}
            style={{
              marginTop: 30,
            }}
            contentStyle={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
            errorText={errorEmail}
            onSubmitEditing={onSignIn}
            borderStyle={{
              height: 60,
              borderRadius: 4,
              borderColor: '#ECF0F5',
            }}
            borderWidth={1}
            rightElement={<Image source={IC_CHECK} style={{ width: 16, height: 16 }} />}
          />
          <EditText
            testID="password-input-box"
            type={EditTextInputType.BOX}
            labelTextStyle= {{
              color: '#333333',
              fontSize: 14,
              lineHeight: 24,
            }}
            focusedLabelStyle= {{
              color: '#333333',
            }}
            inputContainerRadius={30}
            textStyle={{
              color: '#495057',
            }}
            secureTextEntry={true}
            label="Password"
            placeholder="Write your password"
            placeholderTextColor="#707683"
            value={password}
            onChangeText={(text: string): void =>
              onTextChanged('PASSWORD', text)
            }
            style={{
              marginTop: 20,
            }}
            contentStyle={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
            onSubmitEditing={onSignIn}
            borderStyle={{
              height: 60,
              borderRadius: 4,
              borderColor: '#ECF0F5',
            }}
          />
          <EditText
            testID="password-input-confirm"
            type={EditTextInputType.BOX}
            labelTextStyle= {{
              color: '#333333',
              fontSize: 14,
              lineHeight: 24,
            }}
            focusedLabelStyle= {{
              color: '#333333',
            }}
            inputContainerRadius={30}
            textStyle={{
              color: '#495057',
            }}
            secureTextEntry={true}
            label="Password Confirm"
            placeholder="Confirm password"
            placeholderTextColor="#707683"
            style={{
              marginTop: 20,
              width: `${Platform.OS === 'web' ? 438 : '100%'}`,
            }}
            contentStyle={{
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
            onSubmitEditing={onSignIn}
            borderStyle={{
              height: 60,
              borderRadius: 4,
              borderColor: '#ECF0F5',
            }}
          />
          <Button
            style={{
              borderRadius: 6,
              borderWidth: 0,
              marginTop: 40,
              width: 184,
              height: 48,
              backgroundColor: '#6DA6FC',
            }}
            testID="btn-box"
            onPress={(): void => onSignIn()}
            textStyle={{
              color: '#FFFFFF',
            }}
            text="Verify Email"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const BoxRowEditText = (): React.ReactElement => {
  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: 8,
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: Platform.OS === 'web' ? 438 : '100%',
          }}
        >
          <Text
            style={{
              fontStyle: 'normal',
              fontWeight: 'bold',
              fontSize: 32,
              lineHeight: 47,
              letterSpacing: -0.05,
              color: '#323C47',
            }}
          >
            Sign in with Email
          </Text>
          <EditText
            testID="email-input-boxrow"
            type="rowBox"
            textStyle={{
              color: '#495057',
            }}
            label="Email"
            placeholder="Eail address"
            placeholderTextColor="#ADB5BD"
            value={email}
            onChangeText={(text: string): void => onTextChanged('EMAIL', text)}
            style={{
              marginTop: 50,
            }}
            errorText={errorEmail}
            onSubmitEditing={onSignIn}
            borderStyle={{
              height: 60,
            }}
          />
          <EditText
            testID="password-input-boxrow"
            type={EditTextInputType.ROW_BOX}
            inputContainerRadius={25}
            textStyle={{
              color: '#ADB5BD',
            }}
            secureTextEntry={true}
            label="Password"
            placeholder="Write your password"
            placeholderTextColor="#ADB5BD"
            value={password}
            onChangeText={(text: string): void =>
              onTextChanged('PASSWORD', text)
            }
            style={{
              marginTop: 36,
            }}
            onSubmitEditing={onSignIn}
          />
          <Button
            style={{
              borderRadius: 6,
              borderWidth: 0,
              marginTop: 40,
              width: 184,
              height: 48,
              backgroundColor: '#6DA6FC',
            }}
            testID="btn-boxrow"
            onPress={(): void => onSignIn()}
            textStyle={{
              color: '#FFFFFF',
            }}
            text="SignIn"
          />
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
            <TouchableOpacity onPress={(): null => null} style={{ padding: 4 }}>
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

/**
 * Below are stories for web
 */
export default {
  title: 'EditText',
};

export const toStorybook1 = (): ReactElement => <Default />;
export const toStorybook2 = (): ReactElement => <RowEditText />;
export const toStorybook3 = (): ReactElement => <BoxEditText />;
export const toStorybook4 = (): ReactElement => <BoxRowEditText />;

toStorybook1.story = {
  name: 'default',
  notes: 'Simple explanation',
};

toStorybook2.story = {
  name: 'row',
  notes: 'EditText in row',
};

toStorybook3.story = {
  name: 'boxType',
  notes: 'Box shape EditText',
};

toStorybook4.story = {
  name: 'boxRowType',
  notes: 'Box shape EditText in row',
};

/**
 * Below are stories for app
 */
storiesOf('EditText', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />, {
    notes: 'Simple explanation',
  })
  .add('row', () => <RowEditText />, {
    notes: 'EditText in row',
  })
  .add('boxType', () => <BoxEditText />, {
    notes: 'Box shape EditText',
  })
  .add('boxRowType', () => <BoxRowEditText />, {
    notes: 'Box shape EditText in row',
  });
