# Accordion

> Simple drop down item component for react-native. This component supports drop down toggle with animation.<br/>

![image](https://user-images.githubusercontent.com/27461460/47951961-a7a7e500-dfab-11e8-9189-86c0eddb6e12.gif)

## Props

|                      | necessary | types                  | default               |
| -------------------- | --------- | ---------------------- | ----------------------|
| data                 | ✓         | array                  | `Default Data`        |
| isAnimated           |           | boolean                | `true`                |
| collapseOnStart      |           | boolean                | `false`               |
| animDuration         |           | number                 | `300`                 |
| activeOpacity        |           | number                 | `1`                   |
| toggleElement        |           | React.ReactElement     | `default arrow image` |
| accordionItemStyle   |           | ViewStyle              | ``                    |
| titleStyle           |           | ViewStyle              | ``                    |
| titleStyle           |           | ViewStyle              | ``                    |


## Installation

```sh
yarn add @dooboo-ui/core
```

## Getting started

- Import

  ```javascript
  import { Accordion } from '@dooboo-ui/core';
  ```

- Data

  ```javascript
  state = {
const data = [
    {
      title: {
        name: <StyledTitle>Defualt-title-01</StyledTitle>,
      },
      bodies: [
        {
          name: <StyledItem>Default body01</StyledItem>,
        },
        {
          name: <StyledItem>Default body02</StyledItem>,
        },
      ],
    },
    {
      title: {
        name: <StyledTitle>Defualt-title-02</StyledTitle>,
      },
      bodies: [
        {
          name: <StyledItem>Default body01</StyledItem>,
        },
        {
          name: <StyledItem>Default body02</StyledItem>,
        },
      ],
    },
  ];
}
```

- Usage
  ```tsx
  <Accordion
    data={accordionData}
    isAnimate={true}
    collapseOnStart={false}
    animDuration={300}
    activeOpacity={1}
  />
  ```
