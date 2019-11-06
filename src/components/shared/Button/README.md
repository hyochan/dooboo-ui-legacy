# Button

> [Button] component that can be used inside product. Has basic features like `loading` state, `disabled` state and also has ability to put `img` to left-hand which is used very often.

![image](https://user-images.githubusercontent.com/27461460/62291727-9be84100-b49f-11e9-8ce5-ceaa1dc3153e.png)

## Props

|                | necessary | types                | default |
| -------------- | --------- | -------------------- | ------- |
| testID         |           | string               |         |
| style          |           | StyleProp<ViewStyle> |         |
| theme          |           | ThemeType            |         |
| dark           |           | boolean              |         |
| inverted       |           | boolean              |         |
| inverted       |           | boolean              |         |
| width          |           | number               |   320   |
| height         |           | number               |    52   |
| isLoading      |           | boolean              |  false  |
| isDisabled     |           | boolean              |  false  |
| iconLeft       |           | ImageSourcePropType  |         |
| iconLeftStyle  |           | StyleProp<ImageStyle>|         |
| iconRight      |           | ImageSourcePropType  |         |
| iconRightStyle |           | StyleProp<ImageStyle>|         |
| indicatorColor |           | string               |'#ffffff'|
| activeOpacity  |           | number               |   0.5   |
| children       |           | string               |         |
| text           |           | string               |         |
| onClick        |           | func                 |         |

## Getting started

- Import

  ```javascript
  import { Button } from '@dooboo-ui/native';
  ```

- Usage
  ```javascript
  function Page(props: Props) {
    return (
      <Container>
        <Button
          testID='btn'
          isLoading={false}
          onClick={() => {}}
        >
          😀 😎 👍 💯
        </Button>
        <Button
          style={{
            marginVertical: 40,
          }}
          isDisabled={true}
          onClick={() => {}}
        >
          This is disabled!!
        </Button>
        <Button
          testID='btnGoogle'
          iconLeft={IC_GOOGLE}
          isLoading={googleLoading}
          indicatorColor='#023059'
          onClick={() => {
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
          testID='btnFacebook'
          iconLeft={IC_FACEBOOK}
          indicatorColor='#023059'
          isLoading={facebookLoading}
          style={{
            marginTop: 40,
            backgroundColor: '#ccc',
            borderWidth: 0.5,
            borderRadius: 0,
          }}
          onClick={() => {
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

```

```
