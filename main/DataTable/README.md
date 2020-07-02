# DataTable


## Props

|                      | necessary | types                  | default       |
| -------------------- | --------- | ---------------------- | ------------- |
| data                 | ✓         | Array<Record<string, any>>| `Default Data`|
| customGroup?         |           | `Array<string>;` |        |
| isCheckAble          |           | boolean                 | `false`           |
| style                |           | `StyleProp<ViewStyle>` |      |
## Installation

```sh
yarn add @dooboo-ui/core
```

## Getting started

- Import

  ```javascript
  import { DataTable } from '@dooboo-ui/core';
  ```
- Usage

  ```javascript
  function Page(props: Props) {
  const items = [
    {
        id: 1,
        unitCode: 10081,
        unitCompany: '어디야',
        unitName: '고구마',
        useId: 'reasm04',
        groupName: 'apple'
    },
    {
        id: 2,
        unitCode: 10081,
        unitCompany: '어디야',
        unitName: '감자',
        useId: 'reasm04',
        groupName: 'apple'
    },
    {
        id: 3,
        unitCode: 10081,
        unitCompany: '어디야',
        unitName: '당근',
        useId: 'reasm04',
        groupName: 'abc'
    },
    {
        id: 4,
        unitCode: 10081,
        unitCompany: '어디야',
        unitName: '어디야',
        useId: 'reasm04',
        groupName: 'abc'
    }];
  function Page(props: Props) {
    return (
        <DataTable
            data={items}
            isCheckAble={true}
        />
    )
  }
  ```
