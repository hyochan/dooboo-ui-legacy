# EditText

> [EditText] component is an enhanced version on pure react-native [TextInput] component.

![image](https://user-images.githubusercontent.com/27461460/62299053-28e6c680-b4af-11e9-8c59-61b79ad82c4d.png)

## Props

|                      | necessary | types     | default |
| -------------------- | --------- | --------- | ------- |
| pararentTestId       |           | string    |         |
| testID               |           | string    |         |
| errorTestID          |           | string    |         |
| style                |           | ViewStyle |         |
| label                |           | string    |         |
| textStyle            |           | TextStyle |         |
| errorText            |           | string    |         |
| text                 |           | string    |         |
| placeholder          |           | string    |         |
| placeholderTextColor |           | string    |         |
| secureTextEntry      |           | boolean   |         |
| onSubmitEditing      |           | func      |         |
| onTextChanged        |           | (e) => {} |         |

## Getting started

- Import

  ```javascript
  import { EditText } from '@dooboo-ui/native';
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
            testID='EMAIL_INPUT'
            textStyle={{
              color: '#495057',
            }}
            label='Email'
            placeholder='Write email address'
            placeholderTextColor='#ADB5BD'
            text={email}
            onTextChanged={(text: string) => onTextChanged('EMAIL', text)}
            style={{ marginTop: 50 }}
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
            text={password}
            onTextChanged={(text: string) => onTextChanged('PASSWORD', text)}
            style={{ marginTop: 36 }}
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
            <StyledText testID='NO_ACCOUNT'>
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
