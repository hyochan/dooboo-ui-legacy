# Accordion

> Simple drop down item component for react-native. This component supports drop down toggle with animation.<br/>

![image](https://user-images.githubusercontent.com/27461460/47951961-a7a7e500-dfab-11e8-9189-86c0eddb6e12.gif)

## Props

|                      | necessary | types                  | default       |
| -------------------- | --------- | ---------------------- | ------------- |
| data                 | ✓         | array                  | `Default Data`|
| shouldAnimate        |           | boolean                | `true`        |
| collapseOnStart      |           | boolean                | `false`       |
| animDuration         |           | number                 | `300`         |
| activeOpacity        |           | number                 | `1`           |

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
    Data = [
      {
        itemTitle: 'Custom Panel',
        itemBodies: [
          'Custom Panel',
          'Custom Panel',
          'Custom Panel',
        ],
      },
      {
        itemTitle: '판매 관리',
        itemBodies: [
          '판매처 관리',
          '공급처 관리',
          '상품 관리',
          '재고 관리',
        ],
      },
      {
        itemTitle: '주문 배송 관리',
        itemBodies: [
          '주문 보기',
          '주문 보기',
          '주문 보기',
          '주문 보기',
        ],
      },
    ];
  };
  ```

- Usage
  ```tsx
  <Accordion
    data={accordionData}
    shouldAnimate={true}
    collapseWhenReders={false}
    animDuration={300}
    activeOpacity={1}
  />
  ```
