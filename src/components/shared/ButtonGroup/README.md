# ButtonGroup
> [ButtonGroup] is an `ios` section like component. You can have as may selectors as you want.

![ButtonGroup](https://user-images.githubusercontent.com/27461460/62305265-8c2a2600-b4ba-11e9-83df-af0ac2f4a3f6.gif)

## Props
|                      | necessary | types        | default                      |
|----------------------|-----------|--------------|------------------------------|
| testID               |           | string       |                              |
| containerStyle       |           | ViewStyle    |                              |
| style                |           | ViewStyle    |                              |
| viewStyle            |           | ViewStyle    |                              |
| selectedViewStyle    |           | ViewStyle    |                              |
| textStyle            |           | TextStyle    |                              |
| selectedTextStyle    |           | TextStyle    |                              |
| data                 |           | string[]     | ['Option 1', 'Option 2']     |
| onPress              |           | (i: number) => void     |                   |

## Getting started

* Import
  ```javascript
  import { ButtonGroup } from 'dooboo-native-widgets';
  ```

* Usage
  ```javascript
  function Page(props: Props) {
    const data = [
      'Option 1', 'Option 2',
      'Option 3', 'Option 4',
    ];

    const [option, setOption] = useState('Option 1');

    const selectOption = (index: number) => {
      setOption(data[index]);
      switch (index) {
        case 0:
          setOption('Option 1');
          break;
        case 1:
          setOption('Option 2');
          break;
      }
    };

    return (
      <Container>
        <ButtonGroup
          testID='BTN_GROUP'
          style={{ marginTop: 40 }}
          onPress={(index: number) => selectOption(index)}
          data={data}
        />
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 32,
          }}>{option}</Text>
        </View>
      </Container>
    );
  }
  ```