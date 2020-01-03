# EditText

[![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-edit-text.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-edit-text)
[![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native-edit-text.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-edit-text)

> [EditText] component is an enhanced version on pure react-native [TextInput] component.

## Preview

| | Default | Row |
|--|---------------|--------------|
| `underlined` |![underlined_default](https://user-images.githubusercontent.com/31176502/71721202-8bc9f880-2e67-11ea-8ffd-b6bf81814a26.gif) | ![underlined_row](https://user-images.githubusercontent.com/31176502/71721235-ad2ae480-2e67-11ea-914f-dc74ea4c6e7f.gif) |
| <center>`box`</center> |![default](https://user-images.githubusercontent.com/31176502/71720764-26c1d300-2e66-11ea-9b21-27de441e727d.gif) | ![row](https://user-images.githubusercontent.com/31176502/71720737-1873b700-2e66-11ea-9b6b-1cdc175cbc0a.gif) |

## Props

|                      | necessary | types                  | default      |
| -------------------- | --------- | ---------------------- | ------------ |
| testID               |           | string                 |              |
| errorTestID          |           | string                 |              |
| isRow                |           | boolean                |    `false`   |
| style                |           | `StyleProp<ViewStyle>` |              |
| label                |           | string                 |              |
| labelTextStyle       |           | `StyleProp<TextStyle>` |              |
| value                |           | `TextInputProps`       |              |
| inputContainerType   |           | string                 | `underlined` |
| inputContainerRadius |           | string                 |      `3`     |
| borderColor          |           | string                 |   `#eaeaf9`  |
| inputLeftMargin      |           | number                 |     `110`    |
| textStyle            |           | `StyleProp<TextStyle>` |              |
| placeholder          |           | string                 |              |
| placeholderTextColor |           | string                 |              |
| secureTextEntry      |           | boolean                |              |
| onChangeText         |           | (e) => {}              |              |
| onSubmitEditing      |           | func                   |              |
| textInputProps       |           | `TextInputProps`       |              |
| errorText            |           | string                 |              |
| errorTextStyle       |           | `StyleProp<TextStyle>` |              |

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
            value={email}
            onChangeText={(text: string) => onTextChanged('EMAIL', text)}
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
            value={password}
            onChangeText={(text: string) => onTextChanged('PASSWORD', text)}
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
