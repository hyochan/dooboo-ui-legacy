# BarChart

> Customizable & responsive Bar Chart component for react-native. This component is using `react-native-svg`, `d3` and `styled-components/native` libraries to create the graph.<br/>

## Screen
Web| iOS            |  Android
:-------------------------:|:-------------------------:|:-------------------------:
![BarChart_web](https://user-images.githubusercontent.com/50701501/87108910-4ff06f80-c29e-11ea-8660-3eebc3b61ffb.png) | ![BarChart_ios](https://user-images.githubusercontent.com/50701501/87108967-6d253e00-c29e-11ea-9bf7-5285dc1eff07.png) |  ![BarChart_android](https://user-images.githubusercontent.com/50701501/87109009-8201d180-c29e-11ea-9d12-8e1d8f254455.png)

<br/>

## Installation

```sh
yarn add dooboo-ui
```
<br/>

## Getting started

- Import

  ```javascript
  import { BarChart } from 'dooboo-ui';
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
    <BarChart
        data={this.state.data}
        xAxisKey={'key3'}
        yAxisKey={'key4'}
        yUnit={'200'}
        header={
          <CustomHeaderContainer>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#000',
              }}>
              {'My Bar-chart'}
            </Text>
          </CustomHeaderContainer>
        }
        graphStyle={{
          barWidth: currentWidth < 414 ? 15 : 30,
          color: '#000000',
          strokeWidth: 2,
          strokeColor: 'rgba(0,0,0,0.1)',
          fontSize: currentWidth < 414 ? '8' : '12',
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
          fontSize: currentWidth < 414 ? '7' : '12',
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
          fontSize: currentWidth < 414 ? '7' : '12',
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
| yUnit      |          | string OR number | 10                          | Y-axis value unit                                           |
| header     |          | ReactElement     | undefined                   | custom React element ([Example](#ReactElement)) |
| graphStyle |          | object           | [Graph-Style](#Graph-Style) | fully customizable graph style                              |
| xStyle     |          | object           | [X-Style](#X-Style)         | fully customizable graph style                              |
| yStyle     |          | object           | [Y-Style](#Y-Style)         | fully customizable graph style                              |

<br/>
<br/>

### `ReactElement` Example

```javascript
// Example
<BarChart
  data={mockData}
  xAxisKey={'key5'}
  yAxisKey={'key4'}
  header={
    <CustomHeaderContainer>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#000',
        }}>
        {'My Bar-chart'}
      </Text>
    </CustomHeaderContainer>
  }
/>
```

### `GraphStyle`

```javascript
{
  barWidth: 30, // string OR number
  color: '#000000',
  strokeWidth: 2,
  strokeColor: 'rgba(0,0,0,0.1)',
  fontSize: currentWidth '12',
  fontWeight: 'bold',
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

`BarChart` is wrapped internally with a container that provides the `height` & `width` from the `onLayout` native property of `View` component. This resizes the chart layout based on the current `window` height & width.

If you need the chart to be responsive, wrap the `BarChart` with a **responsive** `container`. The Chart has `{width: 100%, height: 100%}` filling its parent element.

```javascript
// Responsive example
import { BarChart } from 'dooboo-ui';
import styled from 'styled-components/native';

const CustomContainer = styled.View`
  height: 100%;
  width: 100%;
`;

// Recommend to use conditional styling on <CustomContainer> based on width to support other devices
<CustomContainer>
      <BarChart
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
