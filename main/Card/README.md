# Card

> [Card] component that can be used inside product.

![Card](https://user-images.githubusercontent.com/48555121/92322267-3f286400-f06b-11ea-9831-39fdb70a1d34.png)

## Props

|                        | required | types                     | default |
| ---------------------- | -------- | ------------------------- | ------- |
| testID                 |          | string                    |         |
| containerStyle         |          | ViewStyle                 |         |
| children               |          | ReactNode, ReactNodeArray |         |
| image                  |          | ImageSourcePropType       |         |
| imageStyle             |          | ImageStyle                |         |
| contentsContainerStyle |          | ViewStyle                 |         |
| loading                |          | boolean                   |         |
| title                  |          | string                    |         |
| titleStyle             |          | TextStyle                 |         |
| subTitle               |          | string                    |         |
| subTitleStyle          |          | TextStyle                 |         |
| hasDivider             |          | boolean                   | `true`  |
| dividerStyle           |          | ViewStyle                 |         |
| outlined               |          | boolean                   |         |
| raised                 |          | boolean                   |         |
| disabled               |          | boolean                   |         |

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
        <Card
          testID="CARD"
          containerStyle={{ marginBottom: 30 }}
          image={{
            uri:
              'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
          }}
          title="Title"
          subTitle="subTitle">
          <Text>{'children'}</Text>
        </Card>
      </Container>
    );
  }
  ```
