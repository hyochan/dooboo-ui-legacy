# Checkbox

> Simple Checkbox for react-native.  
> Refer : <https://ant.design/components/checkbox/>

## Preview


## Installation

```sh
yarn add dooboo-ui
```

## Props
### Checkbox

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

export interface CheckboxProps {
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

### CheckboxGrop
```ts
interface customStyle {
  labelSize?: number;
  labelColor?: string;
  boxSize?: number;
  boxColor?: string;
}

interface onChangeEvent {
  checked: boolean;
  label: string;
}

export type CheckboxValueType = string | number | boolean;

export interface CheckboxOptionType {
  label: string | number;
  value: CheckboxValueType;
  disabled?: boolean;
  onChange?: (e: onChangeEvent) => void;
  customStyle?: customStyle;
}

export interface CheckboxGroupState {
  value: CheckboxValueType[];
  registeredValues: CheckboxValueType[];
}

export interface CheckboxGroupContext {
  cancelValue?: (value: CheckboxValueType) => void;
  registerValue?:(value: CheckboxValueType) => void;
  toggleOption?: () => void;
  value?: any;
  disabled?: boolean;
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
| customStyle    |                    | `customStyle type` look below     |         |


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
| onChange          |          | `(checkedValue: Array<CheckboxValueType>) => void;` |         |
| commonCustomStyle |          | `boolean`                                           |         |
| onChange          |          | `(event: onChangeEvent) => void;`                   |         |
| commonCustomStyle |          | `customStyle` look upside                           |         |


## Getting started

### Import

### Usage

#### Checkbox_

```tsx
function DefaultCheckbox(): React.ReactElement {
  return (
    <ScrollContainer>

      <Container>
        <Title>default</Title>
        <Checkbox_ label="defaultChecked" defaultChecked ></Checkbox_>

      </Container>

      <Container>
        <Title>disabled</Title>
        <Checkbox_ label="disabled" disabled />
      </Container>

      <Container>
        <Title>indeterminate</Title>
        <Checkbox_ label="indeterminate" indeterminate />
      </Container>

    </ScrollContainer>
  );
}
```

#### CheckboxGroup_

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
        <CheckboxGroup_ options={plainOptions} onChange={onChange} />
      </Container>
      <Container>
        <Title>Default</Title>
        <CheckboxGroup_ options={options} onChange={onChange} />
      </Container>

      <Container>
        <Title>option with disabled</Title>
        <CheckboxGroup_ options={optionsWithDisabled} onChange={onChange} />
      </Container>

      <Container>
        <Title>with disabled props</Title>
        <CheckboxGroup_ options={options} disabled onChange={onChange} />
      </Container>

    </ScrollContainer>
  );
}
```
