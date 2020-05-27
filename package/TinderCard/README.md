# TinderCard

## Preview

![TinderCard](https://user-images.githubusercontent.com/31176502/73652277-e4402000-46c9-11ea-9139-b1e453c95a6e.gif)

## Props

|                        | types                     | description          | required | default |
| ---------------------- | ------------------------- | -------------------- | -------- | ------- |
| testID                 | string                    |                      |          |         |
| errorTestID            | string                    |                      |          |         |
| data                   | T[ ]                      |                      |          |         |
| renderCards            | (item: T) => ReactElement |                      |          |         |
| renderNoMoreCards      | ( ) => ReactElement       |                      |          |         |
| onSwipeRight           | (item: T) => void         |                      |          |         |
| onSwipeLeft            | (item: T) => void         |                      |          |         |
| onCancel               | ( ) => void               |                      |          |         |
| swipeRightLabelElement | ( ) => ReactElement       |                      |          |         |
| swipeLeftLabelElement  | ( ) => ReactElement       |                      |          |         |
| swipeRightLabelStyle   | ViewStyle                 |                      |          |         |
| swipeLeftLabelStyle    | ViewStyle                 |                      |          |         |
| swipeLabelAlignStyle   | ViewStyle                 |                      |          |         |
| containerStyle         | ViewStyle                 |                      |          |         |
| frontCardStyle         | ViewStyle                 |                      |          |         |
| backCardsStyle         | ViewStyle                 |                      |          |         |
| shouldRotate           | ViewStyle                 |                      |          |         |

## Getting started

### Installation

```sh
yarn add @dooboo-ui/core
```

### Import

  ```javascript
  import { TinderCard } from '@dooboo-ui/core';
  import { TinderCardDirection, TinderCardRef } from '@dooboo-ui/core/lib/TinderCard';
  ```

  ##### TinderCard
  - TinderCard Component
  - Example

    ```
    <TinderCard
        testID="tinderCard"
        ref={tinderCard}
        onSwipeRight={handleUnlike}
        onSwipeLeft={handleLike}
        onCancel={handleCancel}
        data={data}
        renderCards={_renderCards}
        renderNoMoreCards={_renderNoMoreCards}
        containerStyle={{ width: 300, height: 500 }}
        shouldRotate
        swipeRightLabelElement={(): ReactElement => <LikeLabel>Like!</LikeLabel>}
        swipeLeftLabelElement={(): ReactElement => 
          <UnlikeLabel>Unlike!</UnlikeLabel>
        }
        swipeLabelAlignStyle={{ justifyContent: 'center', alignItems: 'center' }}
    />
    ```

  ##### TinderCardDirection
  - You can use this by importing on `@dooboo-ui/core/lib/TinderCard` 
  - Structure
      if you put swiping direction on event function, you can use this. For example, `TinderCardDirection.RIGHT` or `TinderCardDirection.LEFT`

      ```
      {
        RIGHT = 'right',
        LEFT = 'left'
      }
      ```

  ##### TinderCardRef
  - This make us to use function in `TinderCard`.

    ```
      {
        handleCancel: () => void;
        forceSwipe: (direction: TinderCardDirection) => void;
      }
    ```
  - Usage
    
    1. Import module `TinderCardRef` 
        First of all, you should import module `TinderCardRef` in `@dooboo-ui/core/lib/TinderCard`.
        ```
        import { TinderCardRef } from '@dooboo-ui/core/lib/TinderCard';
        ```
    2. Allocate `useRef()` having type `TinderCardRef` Object.
        ```
        import React, { useRef } from 'react';

        ...

        const tinderCard = useRef<TinderCardRef>(null);
        ```
    3. Write this where you want to use.
        ```
        <TouchableOpacity
          onPress={(): void => {
            tinderCard.current.forceSwipe(TinderCardDirection.LEFT);
          }}
        >
          Button
        </TouchableOpacity>
        ```

        If you are difficult to understand `useRef`, you can read [this tutorial](https://medium.com/dooboolab/vexposing-child-functions-using-imperativehandle-and-forwardref-69b3687808bb).

#### Declare interface `T` for props `data`.
  ```
  interface Item {
    id: string;
    title: string;
    content: string;
    image: ImageSourcePropType;
  }
  ``` 

### Full code of example

  ```javascript
  import { TinderCard } from '@dooboo-ui/core';
  import { TinderCardDirection, TinderCardRef } from '@dooboo-ui/core/lib/TinderCard';

  interface Item {
    id: string;
    title: string;
    content: string;
    image: ImageSourcePropType;
  }

  function Page(): React.ReactElement {
      const tinderCard = useRef<TinderCardRef>(null);

      return (
        <Container>
          <TinderCard
            testID="tinderCard"
            ref={tinderCard}
            onSwipeRight={handleUnlike}
            onSwipeLeft={handleLike}
            onCancel={handleCancel}
            data={data}
            renderCards={_renderCards}
            renderNoMoreCards={_renderNoMoreCards}
            containerStyle={{ width: 300, height: 500 }}
            shouldRotate
            swipeRightLabelElement={(): ReactElement => <LikeLabel>Like!</LikeLabel>}
            swipeLeftLabelElement={(): ReactElement => <UnlikeLabel>Unlike!</UnlikeLabel>}
            swipeLabelAlignStyle={{ justifyContent: 'center', alignItems: 'center' }}
          />
          <View style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>

            <ButtonWrapper
              style={{ backgroundColor: '#ff7676' }}
              onPress={(): void => {
                tinderCard.current.forceSwipe(TinderCardDirection.LEFT);
              }}
            >
              <StyledText style={{ fontSize: 15 }}>UNLIKE</StyledText>
            </ButtonWrapper>

            <ButtonWrapper
              onPress={(): void => {
                tinderCard.current.handleCancel();
              }}
            >
              <StyledText style={{ fontSize: 15 }}>UNDO</StyledText>
            </ButtonWrapper>

            <ButtonWrapper
              style={{ backgroundColor: '#44d1a6' }}
              onPress={(): void => {
                tinderCard.current.forceSwipe(TinderCardDirection.RIGHT);
              }}
            >
              <StyledText style={{ fontSize: 15 }}>LIKE</StyledText>
            </ButtonWrapper>
          </View>
        </Container>
      );
  }

  export default Page;
  ```
