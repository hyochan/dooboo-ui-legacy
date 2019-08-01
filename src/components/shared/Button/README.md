# Button
> Simple [Button] that overlaps screen indicating that it is doing something.
![image](https://user-images.githubusercontent.com/27461460/62291727-9be84100-b49f-11e9-8ce5-ceaa1dc3153e.png)

## Props
|                      | necessary | types        | default                      |
|----------------------|-----------|--------------|------------------------------|
| testID               |           | string       |                              |
| isLoading            |           | boolean      |                              |
| isDisabled           |           | boolean      |                              |
| onClick              |           | func         |                              |
| style                |           | ViewStyle    |                              |
| disabledStyle        |           | ViewStyle    |                              |
| textStyle            |           | TextStyle    |                              |
| imgLeftSrc           |           | ImageSourcePropType |                       |
| imgLeftStyle         |           | ImageSourcePropType |                       |
| indicatorColor       |           | string       |                              |
| activeOpacity        |           | number       |                              |
| text                 |           | string       |                              |

## Getting started

* Import
  ```javascript
  import { Button } from 'dooboo-native-widgets';
  ```

* Usage
  ```javascript
  function Page(props: Props) {
    return (
      <Container>
        <Button
          testID='btn'
          isLoading={false}
          text='😀 😎 👍 💯'
          onClick={() => {}}
        />
        <Button
          style={{
            marginVertical: 40,
          }}
          isDisabled={true}
          text='This is disabled!!'
          onClick={() => {}}
        />
        <Button
          testID='btnGoogle'
          imgLeftSrc={IC_GOOGLE}
          isLoading={googleLoading}
          indicatorColor='#023059'
          onClick={() => {
            setGoogleLoading(true);
            const timeout = setTimeout(() => {
              setGoogleLoading(false);
              clearTimeout(timeout);
            }, 2000);
          }}
          text='GOOGLE SIGN IN'
        />
        <Button
          testID='btnFacebook'
          imgLeftSrc={IC_FACEBOOK}
          indicatorColor='#023059'
          isLoading={facebookLoading}
          imgLeftStyle={{
            height: 28,
            width: 16,
          }}
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
          text='FACEBOOK SIGN IN'
        />
      </Container>
    );
  }
```
