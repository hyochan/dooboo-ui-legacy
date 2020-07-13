# Button

> [Button] component that can be used inside product. Has basic features like `loading` state, `disabled` state and also has ability to put `img` to left-hand which is used very often.

![image](https://user-images.githubusercontent.com/34743425/87122708-6a3b4500-c2c0-11ea-985c-a77a1fa90e8d.png)

## Props

|                       | necessary             | types        | default   |
| --------------------- | --------------------- | ------------ | --------- |
| testID                |                       | string       |           |
| containerStyle        |                       | ViewStyle    |           |
| style                 |                       | ViewStyle    |           |
| disabledStyle         |                       | ViewStyle    |           |
| textStyle             |                       | TextStyle    |           |
| didsabledTextStyle    |                       | TextStyle    |           |
| isLoading             |                       | boolean      |           |
| isDisabled            |                       | boolean      |           |
| leftElement           |                       | ReactElement |           |
| rightElement          |                       | ReactElement |           |
| indicatorColor        |                       | string       | '#ffffff' |
| activeOpacity         |                       | number       | 0.5       |
| text                  |                       | string       |           |
| onPress               |                       | func         |           |
| touchableOpacityProps | TouchableOpacityProps |              |
| hoverStyle            | ViewStyle             |              |
| Accent                | ViewStyle             |              |
| hoverTextStyle        | TextStyle             |              |
| Secondary             | ViewStyle             |              |

## Installation

```sh
yarn add @dooboo-ui/core
```

## Getting started

- Import

  ```javascript
  import { Button } from 'dooboo-ui/core';
  ```

- Usage

  - with `StyleSheet`

  ```jsx
  <Button
    testID="sampleButton"
    style={{
      backgroundColor: 'red',
      borderColor: 'blue',
    }}
    textStyle={{
      color: 'white',
    }}
    onPress={(): void => {}}
  >
    Sample button
  </Button>
  ```

  ```jsx
  <Button
    testID="sampleButton"
    style={{
      backgroundColor: 'red',
      borderColor: 'blue',
    }}
    onPress={(): void => {}}
  >
    <SampleText>Sample button</SampleText>
  </Button>
  ```

  - with `styled-components`

  ```jsx
  const SampleButton = styled(Button)`
    width: 136px;
    height: 60px;
    background-color: black;
    border-color: red;
    border-width: 1px;
  `;
  const SampleText = styled.Text`
    color: white;
  `;
  <SampleButton
    testID="sampleButton"
    textStyle={{
      color: 'white',
    }}
    onPress={(): void => {}}
  >
    Sample button
  </SampleButton>
  ```

  ```jsx
  const SampleButton = styled(Button)`
    width: 136px;
    height: 60px;
    background-color: black;
    border-color: red;
    border-width: 1px;
  `;
  const SampleText = styled.Text`
    color: white;
  `;
  <SampleButton testID="sampleButton" onPress={(): void => {}}>
    <SampleText>Sample button</SampleText>
  </SampleButton>
  ```

  - example

  ```tsx
  function Page(props: Props) {
    return (
      <Container>
        <Button testID="btn" isLoading={false} onPress={() => {}}>
          😀 😎 👍 💯
        </Button>
        {/* Button Style Accent  */}
        <Button
          style={{
            backgroundColor: '#109CF1',
          }}
          hoverStyle={{
            backgroundColor: '#34AFF9',
          }}
          Accent={{
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.24,
            shadowRadius: 16.0,
            elevation: 10,
            borderRadius: 4,
          }}
          textStyle={{ color: '#FFFFFF' }}
          onPress={action('Clicked')}
          text={'Accent button '}
        />
        {/* Button Style Secondary   */}
        <Button
          hoverTextStyle={{
            color: '#34AFF9',
          }}
          Secondary={{
            borderColor: '#109CF1',
            borderWidth: 2,
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.24,
            shadowRadius: 16.0,
            elevation: 10,
            borderRadius: 4,
          }}
          style={{
            marginVertical: 40,
          }}
          textStyle={{ color: '#109CF1' }}
          onPress={action('Clicked')}
          text={'Secondary'}
        />
        <Button
          style={{
            marginVertical: 40,
          }}
          isDisabled={true}
          onPress={() => {}}>
          This is disabled!!
        </Button>
        <Button
          testID="btnGoogle"
          iconLeft={<Image source={IC_GOOGLE} />}
          isLoading={googleLoading}
          indicatorColor="#023059"
          onPress={() => {
            setGoogleLoading(true);
            const timeout = setTimeout(() => {
              setGoogleLoading(false);
              clearTimeout(timeout);
            }, 2000);
          }}
        >
          GOOGLE SIGN IN
        </Button>
        <Button
          testID="btnFacebook"
          iconLeft={<Image source={IC_FACEBOOK} />}
          indicatorColor="#023059"
          isLoading={facebookLoading}
          style={{
            marginTop: 40,
            backgroundColor: '#ccc',
            borderWidth: 0.5,
            borderRadius: 0,
          }}
          onPress={() => {
            setFacebookLoading(true);
            const timeout = setTimeout(() => {
              setFacebookLoading(false);
              clearTimeout(timeout);
            }, 2000);
          }}
        >
          FACEBOOK SIGN IN
        </Button>
      </Container>
    );
  }
  ```
