# DataTable

## Props

|              | necessary | types                      | default        |
| ------------ | --------- | -------------------------- | -------------- |
| data         | ✓         | Array<Record<string, any>> | `Default Data` |
| customGroup? |           | `Array<string>;`           |                |
| isCheckAble  |           | boolean                    | `false`        |
| style        |           | `StyleProp<ViewStyle>`     |                |

## Installation

```sh
yarn add @dooboo-ui
```

or

```sh
yarn add @dooboo-ui/tables
```

## Getting started

- Import

  ```tsx
  import Tables from '@dooboo-ui/tables';
  ```

- Usage

  ```tsx
  const items = [
    {
      id: 1,
      unitCode: 10081,
      unitCompany: '어디야',
      unitName: '고구마',
      useId: 'reasm04',
      groupName: 'apple',
    },
    {
      id: 2,
      unitCode: 10081,
      unitCompany: '어디야',
      unitName: '감자',
      useId: 'reasm04',
      groupName: 'apple',
    },
    {
      id: 3,
      unitCode: 10081,
      unitCompany: '어디야',
      unitName: '당근',
      useId: 'reasm04',
      groupName: 'abc',
    },
    {
      id: 4,
      unitCode: 10081,
      unitCompany: '어디야',
      unitName: '어디야',
      useId: 'reasm04',
      groupName: 'abc',
    },
  ];
  function Page(props: Props) {
    return <DataTable data={items} isCheckAble={true} />;
  }
  ```
