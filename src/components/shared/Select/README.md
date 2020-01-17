# Select

- [![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-select.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-select)
- [![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native-select.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-select)

![Select Component themes](https://user-images.githubusercontent.com/33364619/70374774-fd328c00-1939-11ea-9af4-776c6885bd41.png)

## Types

| name | describe                         | required |
| ---- | -------------------------------- | -------- |
| Item | { value: string, label: string } | value    |

## Props

|                                 | necessary | types                                | default    |
| ------------------------------- | --------- | ------------------------------------ | ---------- |
| testID                          |           | string                               |            |
| items                           | ✓         | Item[ ]                              |            |
| style                           |           | ViewStyle                            |            |
| [theme](#theme)                 |           | enum('none', 'underbar', 'box')      | 'none'     |
| title                           |           | string                               |            |
| titleStyle                      |           | TextStyle                            |            |
| selectedValue                   |           | string                               |            |
| placeholder                     |           | string                               | ''         |
| activeOpacity                   |           | number(0 - 1.0)                      | 0.8        |
| rootViewStyle                   |           | ViewStyle                            |            |
| rootTextStyle                   |           | TextStyle                            |            |
| mode                            |           | enum('dropdown', 'dialog', 'picker') | 'dropdown' |
| itemListStyle                   |           | ViewStyle                            |            |
| itemViewStyle                   |           | ViewStyle                            |            |
| itemTextStyle                   |           | TextStyle                            |            |
| showsVerticalScrollIndicator    |           | boolean                              |            |
| disabled                        |           | boolean                              | `false`    |
| [onSelect](#onSelect)           |           | (item: Item) => void                 |            |
| [onShow](#onShow)               |           | ( ) => void                          |            |
| [onDismiss](#onDismiss)         |           | ( ) => void                          |            |
| [onValueChange](#onValueChange) |           | (item: Item, index: number) => void  |            |

### Description of `Props`

#### theme

- injecting some value to prop `theme`, the other prop `rootViewStyle` doesn't work.
  - `theme` & `rootTextStyle` props work
- if you want to `rootViewStyle` work, make `theme` prop empty

#### title

- This text data will appear on the top of select box as title or label.

#### titleTextStyle

- This text style will be applied to Title section.

#### onSelect

...

#### onShow

The **onShow** prop allows passing a function that will be called once the item list has been shown.

| type     | required |
| -------- | -------- |
| function | No       |

#### onDismiss

The **onDismiss** prop allows passing a function that will be called once the item list has been dismissed.

| type     | required |
| -------- | -------- |
| function | No       |

#### onValueChange

(mode **picker** only)
Callback for when an item is changes in picker mode. This is called with the following parameters:

item: the value prop of the item that was selected,
index: the index of the selected item in this picker

| type     | required |
| -------- | -------- |
| function | No       |

> > > > > > > add picker component and test code for picker mode

## Installation

```sh
yarn add @dooboo-ui/native
```

or

```sh
yarn add @dooboo-ui/native-select
```

## Getting started

- Import

  ```javascript
  import { Select } from '@dooboo-ui/native';
  ```

- Usage

  ```typescript
  const ITEMS = [
    { value: 'Category1', text: 'Category1' },
    { value: 'Category2', text: 'Category2' },
    { value: 'Category3', text: 'Category3' },
    { value: 'Category4', text: 'Category4' },
    { value: 'Category5', text: 'Category5' },
  ];

  const [selectedItem, setSelectedItem] = useState<Item>(null);
  const onSelect = useCallback(
    (item: Item) => {
      setSelectedItem(item);
    },
    [selectedItem],
  );
  ```

  ```jsx
  <Container>
    <Select
      theme={'underbar'}
      rootViewStyle={{
        borderBottomColor: 'black',
        borderBottomWidth: 2,
      }}
      rootTextStyle={{
        color: 'orange',
      }}
      itemStyle={{
        list: {},
        defaultItem: {
          color: 'grey',
        },
        selectedItem: {
          color: 'black',
        },
      }}
      placeholder={'select'}
      onClick={action('Clicked')}
      items={ITEMS}
      onSelect={onSelect}
      selectedItem={selectedItem}
    />
  </Container>
  ```
