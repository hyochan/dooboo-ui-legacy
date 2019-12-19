# EditText

[![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-edit-text.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-edit-text)
[![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native-edit-text.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-edit-text)

> [EditText] component is an enhanced version on pure react-native [TextInput] component.

![upload_default](https://user-images.githubusercontent.com/31176502/71159083-64c8cf80-2288-11ea-89a5-c5e865653265.gif)
![upload_row](https://user-images.githubusercontent.com/31176502/71159943-fc7aed80-2289-11ea-88fd-fc139fe65d10.gif)

## Props

|                      | necessary | types                  | default |
| -------------------- | --------- | ---------------------- | ------- |
| testID               |           | string                 |         |
| errorTestID          |           | string                 |         |
| isRow                |           | boolean                |         |
| style                |           | `StyleProp<ViewStyle>` |         |
| underlineStyle       |           | `StyleProp<ViewStyle>` |         |
| label                |           | string                 |         |
| textStyle            |           | `StyleProp<TextStyle>` |         |
| labelTextStyle       |           | `StyleProp<TextStyle>` |         |
| errorTextStyle       |           | `StyleProp<TextStyle>` |         |
| errorText            |           | string                 |         |
| value                |           | string                 |         |
| placeholder          |           | string                 |         |
| placeholderTextColor |           | string                 |         |
| secureTextEntry      |           | boolean                |         |
| onSubmitEditing      |           | func                   |         |
| onChangeText         |           | (e) => {}              |         |
| textInpuProps        |           | `TextInputProps`       |         |

## Installation

```sh
yarn add @dooboo-ui/native
```

or

```sh
yarn add @dooboo-ui/native-edit-text
```

## Getting started

- Import

  ```javascript
  import { EditText } from '@dooboo-ui/native';
  // or
  import EditText from '@dooboo-ui/native-edit-text';
  ```

- Usage

  ```javascript
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
            testID="EMAIL_INPUT"
            textStyle={{
              color: '#495057',
            }}
            label="Email"
            placeholder="Write email address"
            placeholderTextColor="#ADB5BD"
            text={email}
            onTextChanged={(text: string) => onTextChanged('EMAIL', text)}
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
            onTextChanged={(text: string) => onTextChanged('PASSWORD', text)}
            style={{ marginTop: 36 }}
            onSubmitEditing={onSignIn}
          />
          <StyledSignInButton
            testID="btnEmail"
            onClick={() => onSignIn()}
            textStyle={fontStyle}
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
            <StyledText testID="NO_ACCOUNT">
              Do not have and account?{' '}
            </StyledText>
            <TouchableOpacity onPress={() => null} style={{ padding: 4 }}>
              <StyledAccentText>Find</StyledAccentText>
            </TouchableOpacity>
          </View>
        </Container>
      </StyledScrollView>
    );
  }
  ```

```

```
