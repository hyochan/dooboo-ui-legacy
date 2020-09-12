# DatePicker

> [DatePicker] Simple datepicker component for react-native. This componenet supports select the date on the calendar.

## Preview

![dooboo_datepicker](https://user-images.githubusercontent.com/38123162/92732197-11b42100-f3b1-11ea-9c11-ac9dd7aec5e5.gif)

## Props

|                      | necessary | types                                         | default                                |
| -------------------- | --------- | --------------------------------------------- | -------------------------------------- |
| onChangeDate         |           | (date:Date)=>void                             |                                        |
| selectedDate         |           | Date                                          | `new Date()`                           |
| dateInputStyle       |           | ViewStyle                                     | `true`                                 |
| style                |           | ViewStyle                                     |                                        |
| label                |           | string                                        | `default arrow image`                  |
| labelTextStyle       |           | TextStyle                                     | ``                                     |
| errorText            |           | string                                        | `Invalid Date`                         |
| errorTextStyle       |           | TextStyle                                     | `{ color: '#F00', textAlign: 'left' }` |
| dateTextStyle        |           | TextStyle                                     |
| placeholder          |           | string                                        | `YYYY-MM-DD`                           |
| placeholderTextColor |           | string                                        |                                        |
| titleContent         |           | (monthFirstDate: Date) => React.ReactElement; |                                        |
| weekdayFormat        |           | 'narrow' \| 'short'                           | 'narrow'                               |

## Selecting weekday format

> There are two types of weekday format.

- short : Sun, Mon, Tue, ...
- narrow : S, M, T, ...

## Custom titleContent

> You can render titleContent in your own style

```tsx
titleContent={(monthFirst: Date): React.ReactElement => {
  return (
    <View
      style={{
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text>{`${monthFirstDate.toLocaleString('default', {year: 'numeric',month: 'long',})}`}</Text>
    </View>
  );
}}
```

## Installation

```sh
yarn add dooboo-ui
```

## Getting started

- Import

```tsx
import { Datepicker } from 'dooboo-ui';
```
