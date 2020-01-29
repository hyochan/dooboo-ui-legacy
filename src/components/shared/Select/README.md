# Select

- [![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-select.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-select)
- [![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native-select.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-select)

<div>
  <img src="https://user-images.githubusercontent.com/33364619/73326221-cff8bf00-4294-11ea-9e3b-bed483305bd8.gif" alt="ios_all" width="200">
  <img src="https://user-images.githubusercontent.com/33364619/73326222-d0915580-4294-11ea-880e-4511956359e2.gif" alt="android_all" width="200">
</div>

## Installation

```sh
yarn add @dooboo-ui/native
```

or

```sh
yarn add @dooboo-ui/native-select
```

## Getting started

- Usage

```jsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Select } from '@dooboo-ui/native';

const ITEMS = [
  { value: '10', label: 'Ten' },
  { value: '20', label: 'Twenty' },
  { value: '30', label: 'Thirty' },
  { value: '40', label: 'Forty' },
  { value: '50', label: 'Fifty' },
];

const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const onSelect = useCallback((item, index) => {
    setSelectedValue(item.value);
  }, []}

  return (
    <View>
      <Select
        items={ITEMS}
        selectedValue={selectedValue}
        onSelect={onSelect}
      />
    </View>
  );
};
```

## Types

| name | describe                         | required |
| ---- | -------------------------------- | -------- |
| Item | { value: string, label: string } | value    |

## Props

| name                                                          | necessary | types                                | default    |
| ------------------------------------------------------------- | --------- | ------------------------------------ | ---------- |
| testID                                                        |           | string                               |            |
| [items](#items)                                               | ✓         | Item[ ]                              |            |
| [theme](#theme)                                               |           | enum('none', 'underbar', 'box')      | 'none'     |
| [disabled](#disabled)                                         |           | boolean                              | `false`    |
| [style](#style)                                               |           | ViewStyle                            |            |
| [textStyle](#textstyle)                                       |           | TextStyle                            |            |
| [placeholder](#placeholder)                                   |           | string                               | ''         |
| [selectedValue](#selectedvalue)                               |           | string, null                         | null       |
| [onSelect](#onselect)                                         |           | (item: Item, index: number) => void  |            |
| [onValueChange](#onvaluechange)                               |           | (item: Item, index: number) => void  |            |
| [title](#title)                                               |           | string                               |            |
| [titleStyle](#titlestyle)                                     |           | TextStyle                            |            |
| [mode](#mode)                                                 |           | enum('dropdown', 'dialog', 'picker') | 'dropdown' |
| [nullable](#nullable)                                         |           | boolean                              | `false`    |
| [nullableLabel](#nullablelabel)                               |           | string                               | ''         |
| [listStyle](#liststyle)                                       |           | ViewStyle                            |            |
| [listTitleStyle](#listtitlestyle)                             |           | TextStyle                            |            |
| [itemViewStyle](#itemviewstyle)                               |           | ViewStyle                            |            |
| [itemTextStyle](#itemtextstyle)                               |           | TextStyle                            |            |
| [selectedItemViewStyle](#selecteditemviewstyle)               |           | ViewStyle                            |            |
| [selectedItemTextStyle](#selecteditemtextstyle)               |           | TextStyle                            |            |
| [showsVerticalScrollIndicator](#showsverticalscrollindicator) |           | boolean                              |            |
| [onOpen](#onopen)                                             |           | ( ) => void                          |            |
| [onClose](#onclose)                                           |           | ( ) => void                          |            |
| [onItemPressIn](#onitempressin)                               |           | ( ) => void                          |            |
| [onItemPressOut](#onitempressout)                             |           | ( ) => void                          |            |

### Description of `Props`

#### testID

Used to locate this component in end-to-end tests.

| type   | required |
| ------ | -------- |
| string | No       |

#### items

The array of data to select. In each element, **value** must be a unique, and if there is a **label** value, the **label** is displayed on the screen.

| type    | required |
| ------- | -------- |
| Item[ ] | Yes      |

- example

```ts
const items = [
  { value: '10', label: 'Ten' },
  { value: '20', label: 'Twenty' },
  { value: '30', label: 'Thirty' },
];
```

#### theme

The default theme provided by the _Select_ component. Themes include **'none'**, **'underbar'**, and **'box'**. If you use the _style_ prop value, the theme will not be applied.

<img src="https://user-images.githubusercontent.com/33364619/70374774-fd328c00-1939-11ea-9af4-776c6885bd41.png" alt="theme" height="100"/>

| type                            | required | default |
| ------------------------------- | -------- | ------- |
| enum('none', 'underbar', 'box') | No       | 'none'  |

- Usage

```jsx
<Select
  ...
  theme='none' // choose 'none', 'underbar', 'box'
  ...
/>
```

#### disabled

Used to deactivate the Select component. The default value is false

| type    | required | default |
| ------- | -------- | ------- |
| boolean | No       | false   |

- Usage

```jsx
<Select
  ...
  disabled // default : false
  ...
/>
```

#### style

Used to customize the view part of the root. Inherit ViewStyle.

| type      | required |
| --------- | -------- |
| ViewStyle | No       |

#### textStyle

Used to customize the text part of the root. Inherit TextStyle.

| type      | required |
| --------- | -------- |
| ViewStyle | No       |

#### placeholder

Text to display when the selected value is null, title is undefined, or null.

| type   | required | default |
| ------ | -------- | ------- |
| string | No       | ' '     |

#### selectedValue

The **value** of the currently selected item. You can change the value when you select an item from the list by defining an onSelect or onValueChange callback function.

| type           | required | default |
| -------------- | -------- | ------- |
| string or null | No       | null    |

#### onSelect

(mode **'dropdown'** or **'dialog'**)
Callback for when an item is changes in picker mode. This is called with the following parameters:

item: the value prop of the item that was selected,
index: the index of the selected item in this picker

| type     | required | mode                   |
| -------- | -------- | ---------------------- |
| function | No       | 'dropdown' or 'dialog' |

- Usage

```jsx
const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const onSelect = useCallback((item, index) => {
    setSelectedValue(item.value);
  }, []}

  return (
    <View>
      <Select
        theme='dropdown' // choose 'dropdown' or 'dialog'
        items={ITEMS}    // ITEMS = [{ value: '10', label: 'ten'}, ... ]
        selectedValue={selectedValue}
        onSelect={onSelect}
      />
    </View>
  );
};

```

#### onValueChange

(mode **'picker'** only)
Callback for when an item is changes in picker mode. This is called with the following parameters:

item: the value prop of the item that was selected,
index: the index of the selected item in this picker

| type     | required | mode     |
| -------- | -------- | -------- |
| function | No       | 'picker' |

- Usage

```jsx
const App = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const onValueChange = useCallback((item, index) => {
    setSelectedValue(item.value);
  }, []}

  return (
    <View>
      <Select
        theme='picker' // choose 'picker'
        items={ITEMS}  // ITEMS = [{ value: '10', label: 'ten'}, ... ]
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      />
    </View>
  );
};

```

#### title

If you enter a title value, it appears at the top of Select and where the value is displayed.

| type   | required |
| ------ | -------- |
| string | No       |

#### titleStyle

Used to customize the title. Inherit TextStyle.

| type      | required |
| --------- | -------- |
| TextStyle | No       |

#### mode

Prop to select the type of item list. The modes are **'dropdown'**, **'dialog'** and **'picker'**.

| type                                 | required | default    |
| ------------------------------------ | -------- | ---------- |
| enum('dropdown', 'dialog', 'picker') | No       | 'dropdown' |

- **dropdown**

  <div>
    <img style={{marginRight: 100}} src="https://user-images.githubusercontent.com/33364619/73326238-d850fa00-4294-11ea-8049-4e02b67b33da.gif" alt="ios_dropdown" width="200">
    <img src="https://user-images.githubusercontent.com/33364619/73326239-d8e99080-4294-11ea-9ca9-f57a97671422.gif" alt="android_dropdown" width="200">
  </div>

- **dialog**

  <div>
    <img src="https://user-images.githubusercontent.com/33364619/73326247-dc7d1780-4294-11ea-8fa3-8725b67c76a3.gif" alt="ios_dialog" width="200">
    <img src="https://user-images.githubusercontent.com/33364619/73326246-dbe48100-4294-11ea-94c9-29189657d467.gif" alt="android_dialog" width="200">
  </div>

- **picker**
  <div>
    <img src="https://user-images.githubusercontent.com/33364619/73326250-df780800-4294-11ea-926e-9fb3d8329989.gif" alt="ios_picker" width="200">
    <img src="https://user-images.githubusercontent.com/33364619/73326252-e0109e80-4294-11ea-952b-78e7dd3c0b9a.gif" alt="android_picker" width="200">
  </div>

#### nullable

If you set this value to true, you can select selectedValue to null.

| type    | required | default |
| ------- | -------- | ------- |
| boolean | No       | false   |

- Usage

```jsx
<Select
  ...
  nullable // default : false
  ...
/>
```

#### nullableLabel

The label value of the list if nullable is true.

| type   | required | default |
| ------ | -------- | ------- |
| string | No       | ' '     |

- Usage

```jsx
<Select
  ...
  nullable // default : false
  nullableLabel='none' // If nullable is false, nullableLabel is not working
  ...
/>
```

#### listStyle

Used to customize the view part of the list. Inherit ViewStyle.

| type      | required |
| --------- | -------- |
| ViewStyle | No       |

#### listTitleStyle

(mode **'dialog'** only)
Used to customize the title of the list. Inherit TextStyle.

| type      | required | mode     |
| --------- | -------- | -------- |
| TextStyle | No       | 'dialog' |

#### itemViewStyle

Used to customize the view part of the item. Inherit ViewStyle.

| type      | required |
| --------- | -------- |
| ViewStyle | No       |

#### itemTextStyle

Used to customize the text part of the item. Inherit TextStyle.

| type      | required |
| --------- | -------- |
| TextStyle | No       |

#### selectedItemViewStyle

(mode **'dropdown'** or **'dialog'**)
Used to customize the view part of the item when item is selected. Inherit ViewStyle.

| type      | required | mode                   |
| --------- | -------- | ---------------------- |
| ViewStyle | No       | 'dropdown' or 'dialog' |

#### selectedItemTextStyle

(mode **'dropdown'** or **'dialog'**)
Used to customize the text part of the item when item is selected. Inherit TextStyle.

| type     | required | mode                   |
| -------- | -------- | ---------------------- |
| TextView | No       | 'dropdown' or 'dialog' |

#### showsVerticalScrollIndicator

If you set the value to true, the scrolling indicator is displayed in the list.

| type    | required | default |
| ------- | -------- | ------- |
| boolean | No       | false   |

#### onOpen

Callback for when item list has been shown.

| type        | required |
| ----------- | -------- |
| ( ) => void | No       |

#### onClose

Callback for when item list has been dismiss.

| type        | required |
| ----------- | -------- |
| ( ) => void | No       |

#### onItemPressIn

(mode **'dropdown'** or **'dialog'**)
Callback for when mode is **'dropdown'** or **'dialog'** and an item is pressed in.

| type        | required | mode                   |
| ----------- | -------- | ---------------------- |
| ( ) => void | No       | 'dropdown' or 'dialog' |

#### onItemPressOut

(mode **'dropdown'** or **'dialog'**)
Callback for when mode is **'dropdown'** or **'dialog'** and an item is pressed out.

| type        | required | mode                   |
| ----------- | -------- | ---------------------- |
| ( ) => void | No       | 'dropdown' or 'dialog' |

- Usage

```jsx
const App = () => {
  const pressValue = new Animated.Value(0);
  const onItemPressIn = useCallback(() => {
    Animated.timing(pressValue, {
      toValue: 1,
      duration: 200
    })
  })
  const onItemPressOut = useCallback(() => {
    Animated.timing(pressValue, {
      toValue: 0,
      duration: 200
    })
  })
  const itemViewStyle = {
    backgroundColor: pressValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.15)']
    })
  }
  const selectedItemViewStyle = {
    backgroundColor: pressValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.15)']
    })
  }

  return (
    <View>
      <Select
        ...
        mode='dropdown' // choose 'dropdown' or 'dialog'
        onItemPressIn={onItemPressIn}
        onItemPressOut={onItemPressOut}
        itemViewStyle={itemViewStyle}
        selectedItemViewStyle={selectedItemViewStyle}
        ...
      />
    </View>
  );
};

```
