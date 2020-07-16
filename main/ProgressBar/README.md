# ProgressBar
> Simple linear progressbar component for react-native, express an unspecified wait time or display the length of a process.

# Preview
<img src="https://media.giphy.com/media/PiQnbisje7tBTyopUC/giphy.gif"/>

## Installation

```sh
yarn add @dooboo-ui/core
```

## Props
```javascript
interface Props {
  style?: StyleProp<ViewStyle>;
  round?: 'round' | 'square';
  barColor?: string;
  bgColor?: string;
  height?: number;
  animationType?:
    | 'default'
    | 'determinate'
    | 'indeterminate'
    | 'indeterminate-flex';
  animationSpeed?: number;
}
```

|                      | necessary | types                  | default                                                  |
| -------------------- | --------- | ---------------------- | -------------------------------------------------------- |
| round                |           | boolean                | `square`                                                 |
| barColor             |           | string                 |`#609FFF`                                                 |
| bgColor              |           | string                 | `#d0e3ff`                                                |
| height               |           | number                 | `5`                                                      |
| animationType        |           | string                 | `default`                                                |
| animationSpeed       |           | string                 | `1000`                                                   |


## Usage

```javascript
<ProgressBar
  barColor={'#609FFF'}
  bgColor={'#D0E3FF'}
  round={'square'}
  height={10}
  animationType={'indeterminate'}
  animationSpeed={1000}
/>
```

## Example
```javascript
const ProgressBar = (): void => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Default</Text>
      <ProgressBar />

      <Text>Rounded border radius</Text>
      <ProgressBar round={'round'} />

      <Text>limited determinate ProgressBar</Text>
      <ProgressBar
        barColor={'#A055FF'}
        bgColor={'#e3ccff'}
        height={10}
        animationType={'determinate'}
        animationSpeed={3000}
      />

      <Text>Infinite determinate ProgressBar</Text>
      <ProgressBar
        barColor={'#A055FF'}
        bgColor={'#e3ccff'}
        round={'square'}
        height={10}
        animationType={'default'}
        animationSpeed={1000}
      />

      <Text>Infinite indeterminate ProgressBar</Text>
      <ProgressBar
        barColor={'#609FFF'}
        bgColor={'#D0E3FF'}
        round={'square'}
        height={10}
        animationType={'indeterminate'}
        animationSpeed={1000}
      />

      <Text>Infinite indeterminate-flex ProgressBar</Text>
      <ProgressBar
        barColor={'#609FFF'}
        bgColor={'#D0E3FF'}
        round={'square'}
        height={10}
        animationType={'indeterminate-flex'}
        animationSpeed={1000}
      />
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 60,
  },
});
```
