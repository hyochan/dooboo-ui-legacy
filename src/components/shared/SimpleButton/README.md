# SimpleButton

> [SimpleButton] component that can be used inside product. Has basic features like `loading` state, `disabled` state and also has ability to put `img` to left-hand which is used very often.

## Props

|                | necessary | types               | default |
| -------------- | --------- | ------------------- | ------- |
| testID         |           | string              |         |
| themeType      |           | string              |         |
| width          |           | number              |         |
| height         |           | number              |         |
| inverted       |           | boolean             |         |
| isLoading      |           | boolean             |         |
| isDisabled     |           | boolean             |         |
| iconSrc        |           | ImageSourcePropType |         |
| indicatorColor |           | string              |         |
| activeOpacity  |           | number              |         |
| children       |           | string              |         |
| onClick        |           | func                |         |

## Getting started

- Import

  ```javascript
  import { SimpleButton } from '@dooboo-ui/native';
  ```

- Usage
  ```javascript
  function Page(props: Props) {
    return (
      <Container>
        <SimpleButton
          testID='btn'
          isLoading={false}
          onPress={() => {}}
        >
          😀 😎 👍 💯
        </SimpleButton>
        <SimpleButton
          style={{
            marginVertical: 40,
          }}
          isDisabled={true}
          onPress={() => {}}
        >
          This is disabled!!
        </SimpleButton>
        <Button
          testID='btnGoogle'
          iconSrc={IC_GOOGLE}
          isLoading={googleLoading}
          indicatorColor='#023059'
          onPress={() => {
            setGoogleLoading(true);
            const timeout = setTimeout(() => {
              setGoogleLoading(false);
              clearTimeout(timeout);
            }, 2000);
          }}
        >
          GOOGLE SIGN IN
        </SimpleButton>
        <SimpleButton
          testID='btnFacebook'
          icon={IC_FACEBOOK}
          indicatorColor='#023059'
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
        </SimpleButton>
      </Container>
    );
  }
  ```

```

```
