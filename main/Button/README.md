# Button

> [Button] component that can be used inside product. Has basic features like `loading` state, `disabled` state and also has ability to put `img` to left-hand which is used very often.

![image](https://user-images.githubusercontent.com/34743425/87122708-6a3b4500-c2c0-11ea-985c-a77a1fa90e8d.png)

## Props

|                       | required | types                 | default   |
| --------------------- | -------- | --------------------- | --------- |
| testID                |          | string                |           |
| disabled              |          | boolean               |           |
| loading               |          | boolean               |           |
| style                 |          | StylesType            |           |
| indicatorColor        |          | string                | '#ffffff' |
| leftElement           |          | ReactElement          |           |
| rightElement          |          | ReactElement          |           |
| activeOpacity         |          | number                | 0.7       |
| text                  |          | string                |           |
| onPress               |          | () => void            |           |
| touchableOpacityProps |          | TouchableOpacityProps |           |

## Installation

```sh
yarn add dooboo-ui
```

## Getting started

- Import

  ```javascript
  import { Button } from 'dooboo-ui';
  ```

- Usage

  ```tsx
  <Button
    testID="sampleButton"
    style={{
      button: {
        backgroundColor: 'red',
        borderColor: 'blue',
      },
      text: {
        color: 'white',
      },
    }}
    onPress={(): void => {}}
  >
    Sample button
  </Button>
  ```

  ```tsx
  <Button
    testID="sampleButton"
    style={{
      button: {
        backgroundColor: 'red',
        borderColor: 'blue',
      },
    }}
    onPress={(): void => {}}
  >
    <SampleText>Sample button</SampleText>
  </Button>
  ```

- Example

  ```tsx
  function Page(props: Props) {
    return (
      <Container>
        <Button
          loading={false}
          text="😀 😎 👍 💯"
          onPress={action('Clicked')}
          style={{
            button: {
              marginVertical: 40,
              borderWidth: 0.5,
            },
          }}
        />
        <Button
          style={{
            button: {
              backgroundColor: '#109CF1',
            },
            text: {
              color: '#FFFFFF',
            },
          }}
          onPress={action('Clicked')}
          text={'Hovered button in web'}
        />

        <Button
          style={{
            button: {
              marginVertical: 40,
              borderWidth: 0.5,
            },
            text: {
              color: '#109CF1',
            },
          }}
          outlined
          color={'idea'}
          onPress={action('Clicked')}
          text={'Outlined button'}
        />
        <Button
          disabled={true}
          text={text('button text', 'this is disabled')}
        />
        <Button
          leftElement={
            <View
              style={{
                position: 'absolute',
                left: 16,
              }}>
              <Image style={{ width: 20, height: 20 }} source={IC_GOOGLE} />
            </View>
          }
          loading={googleLoading}
          indicatorColor="#023059"
          style={{
            root: {
              marginTop: 32,
            },
            button: {
              backgroundColor: '#ccc',
            },
          }}
          onPress={(): void => {
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
          leftElement={
            <View
              style={{
                position: 'absolute',
                left: 16,
              }}>
              <Image style={{ width: 15, height: 28 }} source={IC_FACEBOOK} />
            </View>
          }
          indicatorColor="#023059"
          loading={facebookLoading}
          style={{
            root: {
              marginTop: 32,
            },
            button: {
              backgroundColor: '#ccc',
              borderWidth: 0.5,
              borderRadius: 0,
            },
          }}
          onPress={(): void => {
            setFacebookLoading(true);

            const timeout = setTimeout(() => {
              setFacebookLoading(false);
              clearTimeout(timeout);
            }, 2000);
          }}
          text="FACEBOOK SIGN IN"
        />
      </Container>
    );
  }
  ```
