# Card

> hello i'm card

## Props

|           | required | types                  | default                  |
| --------- | -------- | ---------------------- | ------------------------ |
| propName1 |          | string                 |                          |
| propName2 |          | `StyleProp<ViewStyle>` |                          |
| propName3 |          | string[]               | ['Option 1', 'Option 2'] |
| propName4 |          | (i: number) => void    |                          |

## Installation

```sh
yarn add dooboo-ui
```

## Getting started

- Import

  ```javascript
  import { Card } from 'dooboo-ui';
  ```

- Usage

  ```javascript
  function Page(props: Props) {
    return (
      <Container>
        <Card testID="CARD" />
      </Container>
    );
  }
  ```
