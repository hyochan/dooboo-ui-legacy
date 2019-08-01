# LoadingIndicator
> Simple drop down item component for react-native. This component supports drop down toggle with animation.<br/>
<img src="https://user-images.githubusercontent.com/27461460/47951961-a7a7e500-dfab-11e8-9189-86c0eddb6e12.gif"/>

  containerStyle?: ViewStyle,
  style?: ViewStyle,
  color?: string;
  size?: number | 'small' | 'large';
  children?: any;

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
