# Checkbox

> Simple Checkbox for react-native.  
> Refer : <https://ant.design/components/checkbox/>

## Preview

| Checkbox | CheckboxGroup | CheckAll |   
|---------|-------------|------------|
| ![Checkbox](https://user-images.githubusercontent.com/45163013/92544089-fdc0d000-f287-11ea-9b46-1843566faad9.png) | ![CheckboxGroup](hhttps://user-images.githubusercontent.com/45163013/92544095-00bbc080-f288-11ea-8d1d-cf95ab21bd22.png) | ![CheckAll](https://user-images.githubusercontent.com/45163013/92544100-01eced80-f288-11ea-8a29-557670e06c1d.png) |   

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
| labelLeft  |          | `boolean` | `#`        |

### CheckboxGroup
| Property          | Required | Type                                                | Default |
| ----------------- | :------: | --------------------------------------------------- | ------- |
| values            |          | `Array<CheckboxValueType>`                          |         |
| defaultValues     |          | `Array<CheckboxValueType>`                          |         |
| options           |          | `Array<CheckboxOptionType | string>`                |         |
| disabled          |          | `boolean`                                           |         |
| onChange          |          | `(event: onChangeEvent) => void;`                   |         |
| commonCustomStyle |          | `customStyle`                                       |         |


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
        <Checkbox label="defaultChecked" defaultChecked ></Checkbox>

      </Container>

      <Container>
        <Title>disabled</Title>
        <Checkbox label="disabled" disabled />
      </Container>

      <Container>
        <Title>indeterminate</Title>
        <Checkbox label="indeterminate" indeterminate />
      </Container>

      <Container>
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
    { label: 'Mango', value: 'Mango' },
  ];
  const optionsWithDisabled = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange', disabled: true },
  ];

  const onChange = (checkedValues): void => {
    console.log('checked = ', checkedValues);
  };
  return (
    <ScrollContainer>

      <Container>
        <Title>plainOption</Title>
        <CheckboxGroup options={plainOptions} onChange={onChange} />
      </Container>
      <Container>
        <Title>Default</Title>
        <CheckboxGroup options={options} onChange={onChange} />
      </Container>

      <Container>
        <Title>option with disabled</Title>
        <CheckboxGroup options={optionsWithDisabled} onChange={onChange} />
      </Container>

      <Container>
        <Title>with disabled props</Title>
        <CheckboxGroup options={options} disabled onChange={onChange} />
      </Container>

    </ScrollContainer>
  );
}
```
