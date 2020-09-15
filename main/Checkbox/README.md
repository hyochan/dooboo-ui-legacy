# Checkbox

> Simple Checkbox for react-native.  
> Refer : <https://ant.design/components/checkbox/>

## Preview

| Checkbox                                                                                                          | CheckboxGroup                                                                                                          | Check All Example                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ![Checkbox](https://user-images.githubusercontent.com/35516239/92756184-8d20cd00-f3c7-11ea-88bc-2e6d65a5551d.png) | ![CheckboxGroup](https://user-images.githubusercontent.com/35516239/92756652-fa346280-f3c7-11ea-90e7-68f45b658acd.png) | ![Check All Example](https://user-images.githubusercontent.com/35516239/92759815-12f24780-f3cb-11ea-8e35-674685022e21.png) |

## Installation

```sh
yarn add dooboo-ui
```

## Props

### Common

```ts
interface customStyle {
  labelSize?: number;
  labelColor?: string;
  boxSize?: number;
  boxColor?: string;
}

interface onChangeEvent {
  checked: boolean;
  label: string | number;
}
```

### Checkbox

```ts

interface CheckboxProps {
  id?: string;
  label: string | number;
  value?: string | number | boolean;
  checked?: boolean
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean
  onChange?: (event: onChangeEvent) => void;
  customStyle?: customStyle;
}
```

### CheckboxGroup
```ts

type CheckboxValueType = string | number | boolean;

interface CheckboxOptionType {
  label: string | number;
  value: CheckboxValueType;
  disabled?: boolean;
  onChange?: (e: onChangeEvent) => void;
  customStyle?: customStyle;
}

interface CheckboxGroupState {
  value: CheckboxValueType[];
  registeredValues: CheckboxValueType[];
}

interface CheckboxGroupProps {
  defaultValues?: Array<CheckboxValueType>;
  values?: Array<CheckboxValueType>;
  options?: Array<CheckboxOptionType | string>;
  disabled?: boolean;
  onChange?: (checkedValue: Array<CheckboxValueType>) => void;
  commonCustomStyle?: customStyle;
}
```
## API

### Checkbox

| Property       |      Required      | Type                              | Default |
| -------------- | :----------------: | --------------------------------- | ------- |
| label          | :white_check_mark: | `string | number`                 |         |
| value          |                    | `string | number | boolean`       |         |
| checked        |                    | `boolean`                         | `fasle` |
| defaultChecked |                    | `boolean`                         | `false` |
| indeterminate  |                    | `boolean`                         | `false` |
| disabled       |                    | `boolean`                         | `false` |
| onChange       |                    | `(event: onChangeEvent) => void;` |         |
| customStyle    |                    | `customStyle type`                |         |


#### customStyle 
| Property   | Required | Type      | Default    |
| ---------- | :------: | --------- | ---------- |
| labelSize  |          | `number`  | `20`       |
| labelColor |          | `string`  | `#000000`, |
| boxSize    |          | `number`  | `20`       |
| boxColor   |          | `string`  | `#1890FF`  |
| labelLeft  |          | `boolean` | `false`    |

### CheckboxGroup
| Property          | Required | Type                                 | Default  |
| ----------------- | :------: | ------------------------------------ | -------- |
| values            |          | `Array<CheckboxValueType>`           |          |
| defaultValues     |          | `Array<CheckboxValueType>`           |          |
| options           |          | `Array<CheckboxOptionType | string>` |          |
| disabled          |          | `boolean`                            |          |
| onChange          |          | `(event: onChangeEvent) => void;`    |          |
| commonCustomStyle |          | `CustomStyle`                        |          |
| direction         |          | `row | column`                       | `column` |


## Getting started

### Import

```tsx
import { Checkbox, CheckboxGroup } from 'dooboo-ui';
```

### Usage

#### Checkbox

```tsx
function DefaultCheckbox(): React.ReactElement {
  const customStyle = {
    labelLeft: true,
  };
  return (
    <ScrollContainer>
      <Container>
        <Title>default</Title>
        <Checkbox label="defaultChecked" defaultChecked></Checkbox>

        <Divider />

        <Title>disabled</Title>
        <Checkbox label="disabled" disabled />

        <Divider />

        <Title>indeterminate</Title>
        <Checkbox label="indeterminate" indeterminate />

        <Divider />

        <Title>labelLeft</Title>
        <Checkbox label="labelLeft" customStyle={customStyle} />
      </Container>
    </ScrollContainer>
  );
}
```

#### CheckboxGroup

```tsx
function DefaultCheckboxGroup(): React.ReactElement {
  const plainOptions = ['Apple', 'Pear', 'Orange'];
  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];
  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: true },
  ];

  const onChange = (checkedValues): void => {
    // eslint-disable-next-line no-console
    console.log('checked = ', checkedValues);
  };
  return (
    <ScrollContainer>
      <Container>
        <Title>plainOption</Title>
        <CheckboxGroup options={plainOptions} onChange={onChange} />

        <Divider />

        <Title>default with Row</Title>
        <CheckboxGroup
          direction={'row'}
          options={options}
          onChange={onChange}
        />

        <Divider />

        <Title>option with disabled</Title>
        <CheckboxGroup options={optionsWithDisabled} onChange={onChange} />

        <Divider />

        <Title>with disabled props</Title>
        <CheckboxGroup options={options} disabled onChange={onChange} />

        <Divider />
      </Container>
    </ScrollContainer>
  );
}
```
