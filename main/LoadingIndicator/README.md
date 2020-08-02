# LoadingIndicator

[![Npm Version](http://img.shields.io/npm/v/dooboo-ui.svg?style=flat-square)](https://npmjs.org/package/dooboo-ui)
[![Downloads](http://img.shields.io/npm/dm/dooboo-ui.svg?style=flat-square)](https://npmjs.org/package/dooboo-ui)

> Simple [LoadingIndicator] that overlaps screen indicating that it is doing something.

## Props

|                | necessary | types                          | default     | options                      |
| -------------- | --------- | ------------------------------ | ----------- | ---------------------------- |
| containerStyle |           | `StyleProp<ViewStyle>`         |             |                              |
| style          |           | `StyleProp<ViewStyle>`         |             |                              |
| color          |           | string                         | `'#969696'` |                              |
| size           |           | string                         | `large`     | `number`, `small`, `large`   |
| imgSource      |           | `ImageSourcePropType`          | `string`    |                              |

## Installation

```sh
yarn add dooboo-ui
```

## Usage

## Getting started

- Import

  ```javascript
  import { LoadingIndicator } from 'dooboo-ui';
  ```
  
- Usage
  - Default

    ```javascript
    function Page(props: Props) {
      return <LoadingIndicator />;
    }
    ```

      ![loading_blue](https://user-images.githubusercontent.com/31176502/71320019-16663b80-24e9-11ea-8ec0-3a463d5c4632.gif)
      ![loading_purple](https://user-images.githubusercontent.com/31176502/71320020-16663b80-24e9-11ea-8c34-0392f476d371.gif)
      ![loading_default](https://user-images.githubusercontent.com/31176502/71320021-16663b80-24e9-11ea-8eac-e488c47eae1d.gif)
      ![loading_pink](https://user-images.githubusercontent.com/31176502/71320022-16663b80-24e9-11ea-9f8b-39408cfb918f.gif)

  - Image

    ```javascript
    function Page(props: Props) {
      return (
        <View>
          <LoadingIndicator
            imgSource="https://user-images.githubusercontent.com/31176502/71331734-ca61d800-2576-11ea-8934-6a260a1d714e.gif"
            containerStyle={{ backgroundColor: 'white' }}
          />
          <Text>Loading ... </Text>
        </View>
      );
    }
    ```

    or

    ```javascript
    import { ImageName } from '[imgRoute]'
    function Page(props: Props) {
      return (
        <View>
          <LoadingIndicator
            imgSource={ImageName}
            containerStyle={{ backgroundColor: 'white' }}
          />
          <Text>Loading ... </Text>
        </View>
      );
    }
    ```

      ![is_img_true](https://user-images.githubusercontent.com/31176502/71334983-be304780-2583-11ea-9d22-fa92453e68e3.gif)
