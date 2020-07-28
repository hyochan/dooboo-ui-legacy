# Radio Button

> Simple radio button for react-native.  
> Refer : <https://material-ui.com/components/radio-buttons>

## Installation

```sh
yarn add dooboo-ui
```

## Props

```ts
interface IRadioButtonProps {
  onPress: (value: string) => void;
  value: string;
  selectedValue: string;
  color?: string;
  disabled?: boolean;
  selected?: boolean;
  size?: number;
  label?: string;
  labelPlacement?: string;
}
```

## API

| Property       |      Required      | Type                           | Default               |
| -------------- | :----------------: | ------------------------------ | --------------------- |
| onPress        | :white_check_mark: | `func`                         |                       |
| value          | :white_check_mark: | `string`                       |                       |
| selectedValue  | :white_check_mark: | `string`                       |                       |
| color          |                    | `string`                       | 'rgba(0, 0, 0, 0.54)' |
| disabled       |                    | `boolean`                      |                       |
| selected       |                    | `boolean`                      |                       |
| size           |                    | `number`                       | 23                    |
| label          |                    | `string`                       |                       |
| labelPlacement |                    | `'end'|'start'|'top'|'bottom'` | 'end'                 |

## Getting started

### Import

```tsx
import { RadioButton } from 'dooboo-ui';
```

### Usage

```tsx
const RadioButtonWithState = () => {
  const [selectedGender, setSelectedGender] = React.useState('female');

  return (
    <>
      <Title>Gender</Title>
      <View>
        <RadioButton
          value={'female'}
          label={'Female'}
          color={'orange'}
          selectedValue={selectedGender}
          onPress={(value: string): void => setSelectedGender(value)}
        />
        <RadioButton
          value={'male'}
          label={'Male'}
          color={'orange'}
          selectedValue={selectedGender}
          onPress={(value: string): void => setSelectedGender(value)}
        />
        <RadioButton
          value={'other'}
          label={'Other'}
          color={'orange'}
          selectedValue={selectedGender}
          onPress={(value: string): void => setSelectedGender(value)}
        />
      </View>
    </>
  );
};
```
