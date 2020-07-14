import React, { ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Button from '../../main/Button';
import { ContainerDeco } from '../../storybook/decorators';
import EditText from '../../main/EditText';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Default = ():React.ReactElement => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: 8,
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 100,
        }}
      >
        <Container>
          <View>
            <StyledTitle>
              Default style
            </StyledTitle>
            <EditText
              numberOfLines={1}
            />
          </View>

          <View style={{ marginTop: 50 }}>
            <StyledTitle>
              Border Bottom
            </StyledTitle>
            <EditText
              numberOfLines={1}
              secureTextEntry={true}
              labelText={'Label'}
              placeholder={'text'}
              textInputStyle={{
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderRadius: 0,
                borderColor: '#BDBDBD',
              }}
            />
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const RowType = ():React.ReactElement => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: 8,
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 100,
        }}
      >
        <Container>
          <View>
            <StyledTitle>
              Row Type
            </StyledTitle>
            <EditText
              labelPosition={'row'}
              numberOfLines={1}
              placeholder={'text'}
              labelText={'Label'}
            />
          </View>
          <View style={{ marginTop: 50 }}>
            <StyledTitle style={{ marginBottom: 10 }}>
                Border Bottom
            </StyledTitle>
            <EditText
              labelPosition={'row'}
              numberOfLines={1}
              placeholder={'text'}
              labelText={'Label'}
              containerStyle={{
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderRadius: 0,
                borderColor: '#BDBDBD',
              }}
            />
          </View>
        </Container>

      </ScrollView>
    </SafeAreaView>
  );
};

const UseCase = ():React.ReactElement => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailErrored, setEmailError] = useState<boolean>(false);
  const [isPswErrored, setPswError] = useState<boolean>(false);

  const onSignIn = (): void => {
    if (email === '' && password === '') {
      setEmailError(true);
      setPswError(true);
    } else if (email === '') {
      setEmailError(true);
    } else if (password === '') {
      setPswError(true);
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
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 20,
            paddingTop: 10,
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 36,
              lineHeight: 53,
              color: '#1B1B21',
            }}
          >
            SignUp
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <EditText
            labelText={'Email'}
            value={email}
            isErrored={isEmailErrored}
            errorStyle={{ borderColor: '#E54E4E' }}
            errorMessage={
              <Text style={{ color: '#E54E4E', marginTop: 8 }}>
                Invaild Email address
              </Text>
            }
            placeholder={'dooboolab@gmail.com'}
            placeholderTextColor={'#707683'}
            onChangeText={(email): void => { setEmail(email); }}
            containerStyle={{
              marginBottom: 30,
              width: 528,
            }}
            labelTextStyle={{
              color: '#323C47',
            }}
            onFocus={(): void => setEmailError(false)}
          />
          <EditText
            labelText={'Password'}
            value={password}
            isErrored={isPswErrored}
            errorStyle={{ borderColor: '#E54E4E' }}
            errorMessage={
              <Text style={{ color: '#E54E4E', marginTop: 8 }}>
                Invaild Password
              </Text>
            }
            placeholder={'********'}
            placeholderTextColor={'#707683'}
            onChangeText={(password): void => { setPassword(password); }}
            secureTextEntry={true}
            containerStyle={{
              width: 528,
            }}
            labelTextStyle={{
              color: '#323C47',
            }}
            onFocus={(): void => setPswError(false)}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 25,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              lineHeight: 18,
              color: '#231F20',
            }}
          >
            Agree to terms and conditions
          </Text>
        </View>
        <Button
          style={{
            borderWidth: 1,
            borderColor: '#609FFF',
            borderRadius: 6,
            marginTop: 40,
            width: 528,
          }}
          text="이메일 인증하기"
          textStyle={{
            color: '#609FFF',
            fontWeight: 'bold',
            fontSize: 10,
            lineHeight: 15,
            letterSpacing: -0.1,
          }}
          onPress={(): void => onSignIn()}
        />
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
export const toStorybook2 = (): ReactElement => <RowType />;
export const toStorybook3 = (): ReactElement => <UseCase />;

toStorybook1.story = {
  name: 'default',
  notes: 'Basic TextInput style',
};
toStorybook2.story = {
  name: 'RowType',
  notes: 'You can change the label position.',
};

toStorybook3.story = {
  name: 'UseCase',
  notes: 'Login example',
};

/**
 * Below are stories for app
 */
storiesOf('EditText', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />, {
    notes: 'Basic TextInput style',
  })
  .add('RowType', () => <RowType />, {
    notes: 'You can change the label position.',
  })
  .add('UseCase', () => <UseCase />, {
    notes: 'Login example',
  });
