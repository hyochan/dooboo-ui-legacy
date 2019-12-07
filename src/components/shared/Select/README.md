# Select

- [![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-select.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-select)
- [![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native-select.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-select)

(Image Area: coming soon)

## Props

|                | necessary | types                      | default |
| -------------- | --------- | -------------------------- | ------- |
| testID         |           | string                     |         |
| label          |           | string                     |         |
| items          | ✓         | array                      |         |
| placeholder    |           | string                     |         |
| theme          |           | 'underbar', 'box', 'none'  | `none`  |
| rootStyle      |           | ViewStyle | TextStyle      |         |
| itemStyle      |           | ViewStyle | TextStyle      |         |
| disabled       |           | boolean                    | `false` |
| [onFocus](#onFocus)   |           | func                       |         |
| [onBlur](#onBlur)     |           | func                       |         |
| [onSelect](#onSelect) |           | func                       |         |

## description
### onFocus
...onFocus

### onBlur
...onFocus

### onSelect
...onFocus

## Installation

```sh
yarn add @dooboo-ui/native
```

or

```sh
yarn add @dooboo-ui/native-select
```

## Getting started

- Import

  ```javascript
  import { Select } from '@dooboo-ui/native';
  ```

- Usage
  ```jsx
  function Page(props: Props) {
    return (
      <Container>
        <Button
          testID="btn"
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
          testID="btnGoogle"
          iconLeft={<Image source={IC_GOOGLE} />}
          isLoading={googleLoading}
          indicatorColor="#023059"
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