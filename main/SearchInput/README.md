# Search Input

> [SearchInput] component is for searchbar made with [TextInput].

## Preview
![SearchInput](https://user-images.githubusercontent.com/58724686/87272975-ceedde00-c512-11ea-82d0-80f3d90e1adf.gif)

## Installation

```sh
yarn add @dooboo-ui/core
```

## Getting started

- Import

  ```javascript
  import { EditText } from '@dooboo-ui/core';

- Props
```tsx
interface Props {
  testID?: string;
  value: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: TextStyle;
  focusColor?: string;
  debounceDelay?: number;
  customIcon?: React.ReactElement;
  placeholder?: TextInputProps['placeholder'];
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  resetIndicator?: React.ReactElement;
  resetIndicatorStyle?: ViewStyle;
  onFocus?: () => void
  onBlur?: () => void
  onDebounceOrOnReset?: (value: string) => void;
}
```

|                      | necessary | types                                  | default              |
| -------------------- | --------- | -------------------------------------- | -------------------- |
| testID               |           | string                                 |                      |
| value                | ✓         | string                                 |                      |
| containerStyle       |           | `StyleProp<ViewStyle>`                 |                      |
| inputStyle           |           | `TextStyle`                            |                      |
| focusColor           |           | string                                 |                      |
| debounceDelay        |           | number                                 |                      |
| customIcon           |           | `ReactElement`                         |                      |
| placeholder          |           | TextInputProps['placeholder']          |                      |
| placeholderTextColor |           | TextInputProps['placeholderTextColor'] |                      |
| resetIndicator       |           | `ReactElement`                         |                      |
| resetIndicatorStyle  |           | `ViewStyle`                            |                      |
| onFocus              |           | () => {}                               |                      |
| onBlur               |           | () => {}                               |                      |
| onDebounceOrOnReset  |           | (value) => void                        |                      |

## Usage

  ```tsx
const Default = (): React.ReactElement => {
  const [value, setValue] = useState<string>('');
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: 8,
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 100,
        }}
      >
        <Container>
          <SearchInput
            value={value}
            containerStyle={{
              borderColor: '#E0E0E0',
            }}
            inputStyle={{
              color: 'black',
            }}
            focusColor="#109CF1"
            placeholder={text('placeholder', 'Search for anything')}
            placeholderTextColor={'#BDBDBD'}
            customIcon={
              <MagContainer>
                <Magnifier source={IC_MAGNIFIER} />
              </MagContainer>
            }
            debounceDelay={number('delay', 400)}
            onDebounceOrOnReset={(str): void => {
              setValue(str);
            }}
          />
          <Value>{`value (after debounced delay) : ${value}`}</Value>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};
  ```
