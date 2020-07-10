# LineChart

> Customizable & responsive Line Chart component for react-native. This component is using `react-native-svg`, `d3` and `styled-components/native` libraries to create the graph.<br/>

## Screen
Web| iOS            |  Android
:-------------------------:|:-------------------------:|:-------------------------:
![image](https://i.ibb.co/QmHp4K9/2020-07-02-19-18-56.png) | ![iOS](https://user-images.githubusercontent.com/50701501/86733899-8777d580-c06c-11ea-8b9f-b9ffff50edd0.png) |  ![Android](https://user-images.githubusercontent.com/50701501/86735833-0ae5f680-c06e-11ea-82f4-749f58f5366f.png)

<br/>

## Installation

```sh
yarn add @dooboo-ui/core
```

<br/>

## Getting started

- Import

  ```javascript
  import { LineChart } from '@dooboo-ui/core';
  ```

- Data

  ```javascript
  state = {
    data: [
      {
        id: 'abcd1234efgh5674',
        key1: 'D-6',
        key2: Math.trunc(Math.random() * 10),
        key3: '06/30',
        key4: Math.trunc(Math.random() * 1000),
        key5: 'A',
        key6: Math.trunc(Math.random() * 10000),
      },
      {
        id: 'abcd1234efgh5675',
        key1: 'D-5',
        key2: Math.trunc(Math.random() * 10),
        key3: '06/29',
        key4: Math.trunc(Math.random() * 1000),
        key5: 'B',
        key6: Math.trunc(Math.random() * 10000),
      },
      {
        id: 'abcd1234efgh5676',
        key1: 'D-4',
        key2: Math.trunc(Math.random() * 10),
        key3: '06/28',
        key4: Math.trunc(Math.random() * 1000),
        key5: 'C',
        key6: Math.trunc(Math.random() * 10000),
      },
      {
        id: 'abcd1234efgh5677',
        key1: 'D-3',
        key2: Math.trunc(Math.random() * 10),
        key3: '06/27',
        key4: Math.trunc(Math.random() * 1000),
        key5: 'D',
        key6: Math.trunc(Math.random() * 10000),
      },
      {
        id: 'abcd1234efgh5678',
        key1: 'D-2',
        key2: Math.trunc(Math.random() * 10),
        key3: '06/26',
        key4: Math.trunc(Math.random() * 1000),
        key5: 'E',
        key6: Math.trunc(Math.random() * 10000),
      },
      {
        id: 'abcd1234efgh5677',
        key1: 'D-1',
        key2: Math.trunc(Math.random() * 10),
        key3: '06/25',
        key4: Math.trunc(Math.random() * 1000),
        key5: 'F',
        key6: Math.trunc(Math.random() * 10000),
      },
      {
        id: 'abcd1234efgh5678',
        key1: 'D-day',
        key2: Math.trunc(Math.random() * 10),
        key3: '06/24',
        key4: Math.trunc(Math.random() * 1000),
        key5: 'G',
        key6: Math.trunc(Math.random() * 10000),
      },
    ],
  };
  ```

- Usage

  ```tsx
  <View style={styles.container}>
    <LineChart
        data={this.state.data}
        xAxisKey={'key1'}
        yAxisKey={'key2'}
        yUnit={'10'}
        header={
          <CustomHeaderContainer>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#fff',
              }}>
              {'my header'}
            </Text>
          </CustomHeaderContainer>
        }
        graphStyle={{
          withLine: true,
          lineColor: '#000000',
          lineWidth: 2,
          withDots: true,
          dotColor: '#ffffff',
          dotStrokeColor: '#000000',
          dotStrokeWidth: 2,
          withText: true,
          textColor: '#000000',
          textStrokeColor: 'none',
          fontSize: '12',
          fontWeight: 'bold',
        }}
        xStyle={{
          withLabel: true,
          withIndicator: true,
          withLine: true,
          lineColor: '#000000',
          lineStrokeWidth: 1,
          withText: true,
          textColor: '#000000',
          textStrokeColor: 'none',
          fontSize: '12',
          fontWeight: 'bold',
        }}
        yStyle={{
          withLabel: true,
          withIndicator: true,
          withLine: true,
          lineColor: '#000000',
          lineStrokeWidth: 1,
          withText: true,
          textColor: '#000000',
          textStrokeColor: 'none',
          fontSize: '12',
          fontWeight: 'bold',
        }}
      />
  </View>
  });
  ```
<br/>

## Props

| Property   | Required | Types            | Default                     | Description                                                 |
| ---------- | -------- | ---------------- | --------------------------- | ----------------------------------------------------------- |
| data       | ✓        | Array<'Data'>    |                             | Array of objects                                            |
| xAxisKey   | ✓        | string           |                             | X-axis parameter existing "key" name in \${"data"}          |
| yAxisKey   | ✓        | string           |                             | Y-axis parameter existing "key" name in \${"data"}          |
| yUnit      |          | string Or number | 10                          | Y-axis value unit                                           |
| header     |          | ReactElement     | undefined                   | fully customizable React element ([Example](#ReactElement)) |
| graphStyle |          | object           | [Graph-Style](#Graph-Style) | fully customizable graph style                              |
| xStyle     |          | object           | [X-Style](#X-Style)         | fully customizable graph style                              |
| yStyle     |          | object           | [Y-Style](#Y-Style)         | fully customizable graph style                              |

<br/>
<br/>

### `ReactElement` Example

```javascript
// Example
<LineChart
  data={mockData}
  xAxisKey={'key1'}
  yAxisKey={'key2'}
  header={
    <CustomHeaderContainer>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#000',
        }}>
        {'My Line-chart'}
      </Text>
    </CustomHeaderContainer>
  }
/>
```

### `GraphStyle`

```javascript
{
  withLine: true,
  lineColor: '#000000',
  lineWidth: 2,
  withDots: true,
  dotColor: '#ffffff',
  dotStrokeColor: '#000000',
  dotStrokeWidth: 2,
  withText: true,
  textColor: '#000000',
  textStrokeColor: 'none',
  fontSize: '12',
  fontWeight: 'bold'
}
```

### `X-Style`

```javascript
{
  withLabel: true,
  withIndicator: true,
  withLine: true,
  lineColor: '#000000', // hex | rgba | string: 'red' | 'black'
  lineStrokeWidth: 1,
  withText: true,
  textColor: '#000000', // hex | rgba | string: 'red' | 'black'
  textStrokeColor: 'none',
  fontSize: '12',
  fontWeight: 'bold',
}
```

### `Y-Style`

```javascript
{
  withLabel: true,
  withIndicator: true,
  withLine: true,
  lineColor: '#000000', // hex | rgba | string: 'red' | 'black'
  lineStrokeWidth: 1,
  withText: true,
  textColor: '#000000', // hex | rgba | string: 'red' | 'black'
  textStrokeColor: 'none', // hex | rgba | string: 'red' | 'black'
  fontSize: '12',
  fontWeight: 'bold',
}
```
<br/>

## `Responsive Feature` (WEB)

`LineChart` is wrapped internally with a container that provides the `height` & `width` from the `onLayout` native property of `View` component. This resizes the chart layout based on the current `window` height & width.

If you need the chart to be responsive, wrap the `LineChart` with a **responsive** `container`. The Chart has `{width: 100%, height: 100%}` filling its parent element.

```javascript
// Responsive example
import { LineChart } from '@dooboo-ui/core';
import styled from 'styled-components/native';

const CustomContainer = styled.View`
  height: 100%;
  width: 100%;
`;

// Recommend to use conditional styling based on width to support other devices
<CustomContainer>
      <LineChart
        data={this.state.data}
        xAxisKey={'key1'}
        yAxisKey={'key2'}
        yUnit={'10'}
        header={...}
        graphStyle={{...}}
        xStyle={{...}}
        yStyle={{...}}
      />
</CustomContainer>
```
