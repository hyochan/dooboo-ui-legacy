# EditText

> [EditText] component is an enhanced version on pure react-native [TextInput] component.

## Preview
![EditText](https://user-images.githubusercontent.com/58724686/87130683-4121b100-c2ce-11ea-8663-3f6e7d380a6d.gif)

## Installation

```sh
yarn add @dooboo-ui/core
```

## Getting started

- Import

  ```javascript
  import { EditText } from '@dooboo-ui/core';

## Props

```ts
interface Props {
  labelPosition?: labelPositionType;
  placeholder?: TextInputProps['placeholder'];
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  containerStyle?: ViewStyle;
  textInputStyle?: ViewStyle;
  focusColor?: string;
  labelText?: string;
  labelTextStyle?: TextStyle;
  value?: TextInputProps['value'];
  isErrored?: boolean;
  errorMessage?: React.ReactElement;
  errorStyle?: ViewStyle;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: TextInputProps['onChangeText'];
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
}
```

|                      | necessary | types                  | default              |
| -------------------- | --------- | ---------------------- | -------------------- |
| labelPosition        |           | 'row'                  |                      |
| placeholder          |           | string                 |         `text`       |
| placeholderTextColor |           | object                 |                      |
| containerStyle       |           | `ViewStyle`            |                      |
| textInputStyle       |           | `ViewStyle`            |                      |
| focusColor           |           | string                 |                      |
| labelText            |           | string                 |                      |
| labelTextStyle       |           | `TextStyle`            |                      |
| value                |           | `TextInputProps`       |                      |
| isErrored            |           | boolean                |        `false`       |
| errorMessage         |           | `React.ReactElement`   |                      |
| errorStyle           |           | `ViewStyle`            |                      |
| numberOfLine         |           |  number                |                      |
| secureTextEntry      |           |  boolean               |                      |
| onFocus              |           |  ()=> {}               |                      |
| onBlur               |           |  ()=> {}               |                      |
| onChangeText         |           |  ()=> {}               |                      |
| onSubmitEditing      |           |  ()=> {}               |                      |


## Description
- When you want to use Row type, you should set labelPosition props to 'row'. 
  You can remove the border with containerStyle porps in row type. but In default, you can remove the border with textInputStyle props. 

- Usage
  This is for login use case.

  ```ts
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
  ```
