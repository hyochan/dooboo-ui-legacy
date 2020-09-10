# DatePicker

> [DatePicker] Simple datepicker component for react-native. This componenet supports select the date on the calendar.

## Preview

## Props
|                      | necessary | types                  | default               |
| -------------------- | --------- | ---------------------- | ----------------------|
| onChangeDate                 |          |                   |         |
|selectedDate          |                |Date               |`new Date()`
| dateInputStyle           |           | ViewStyle                | `true`                |
| style        |           | ViewStyle                 | `1`                   |
| label        |           | string     | `default arrow image` |
| labelTextStyle   |           | TextStyle              | ``                    |
| errorText           |           | string              | `Invalid Date`                    |
| errorTextStyle            |           | TextStyle              | `{ color: '#F00', textAlign: 'left' }`                    |
|dateTextStyle        |                  | TextStyle            |
|placeholder        |       |string|`YYYY-MM-DD`|
|placeholderTextColor|      |string|            |

## Installation
```sh
yarn add dooboo-ui
```

## Getting started
- Import

```typescript
import { Datepicker } from 'dooboo-ui';
```
