# LoadingIndicator
> Simple [LoadingIndicator] that overlaps screen indicating that it is doing something.
![image](https://user-images.githubusercontent.com/27461460/62273345-49475e80-b478-11e9-8717-ce97f6f71230.png)

## Props
|              | necessary | types     | default                      |
|--------------|-----------|-----------|------------------------------|
|containerStyle|           | ViewStyle |                              |
|style         |           | ViewStyle |                              |
|color         |           | string    |                              |
|size          |           | string    | `number | 'small' | 'large'` |

## Getting started

* Import
  ```javascript
  import { LoadingIndicator } from 'dooboo-native-widgets';
  ```

* Usage
  ```javascript
  function Page(props: Props) {
    return (
      <LoadingIndicator />
    );
  }
  ```
