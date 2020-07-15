# Modal

> [Modal] component is that provides a simple foundation for creating popovers, modal-picker. Has Basic features like `closable` for making modal closable and `animationType` property which is controlling animation style. And also can choose modal's mode with `mode` property to be able to switch mode from default mode to modalPicker mode.

## Props

|                  | necessary | types     | default   |
| ---------------- | --------- | --------- | --------- |
| style            |           | ViewStyle |           |
| textStyle        |           | TextStyle |           |
| visible          |           | boolean   | false     |
| backdropClosable |           | boolean   | true      |
| closable         |           | boolean   | true      |
| isAnimated       |           | boolean   | true      |
| animationType    |           | number    | 'default' |
| mode             |           | string    | 'default' |
| data             |           | array     |           |
| value            |           | string    |           |
| setValue         |           | func      |           |

## Installation

```sh
yarn add @dooboo-ui/core
```

## Getting started

- Import

  ```javascript
  import { Modal } from '@dooboo-ui/core';
  ```

## Usage

```jsx
<Modal
  visible={modalVisible}
  closable={true}
  backDropClosable={true}
  onClose={closeModal}
  style={style}
  isAnimated={isAnimated}
  animationType={'default'}
  animationSpeed={700}
  mode={'default'}
  data={data}
  value={value}
  setValue={setValue}>
  <Text
    style={[
      textStyle,
      { color: '#088EDF', fontWeight: '600', textAlign: 'center' },
    ]}>
    Hello, I am Modal 🤘🏻
  </Text>
</Modal>
```

- example

```jsx
function ModalPage(props: Props) {
  const { style, textStyle } = props;

  const [modalVisible, setModalVisible] = useState < boolean > false;
  const [isAnimated, setIsAnimated] = useState < boolean > false;
  const [value, setValue] = useState('DoobooLab');

  const openModal = (): void => {
    setModalVisible(true);
  };
  const closeModal = (): void => {
    setModalVisible(false);
  };

  const data = [
    { section: true, label: 'DoobooLab' },
    { label: 'Hyo' },
    { label: 'Daniel' },
    { label: 'Sarah' },
    { label: 'Clark' },
    { label: 'Dean' },
    { label: 'Rosie' },
    { label: 'Song' },
  ];

  return (
    <>
      <TouchableOpacity
        style={[
          {
            width: 250,
            height: 70,
            backgroundColor: '#088EDF',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: -9,
          },
        ]}
        onPress={() => {
          setIsAnimated(true);
          openModal();
        }}>
        <Text
          style={[
            textStyle,
            { color: '#ffff', fontWeight: '600', fontSize: '17px' },
          ]}>
          {value}
        </Text>
      </TouchableOpacity>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          backDropClosable={true}
          onClose={closeModal}
          style={style}
          isAnimated={isAnimated}
          animationType={'default'}
          animationSpeed={700}
          mode={'modalPicker'}
          data={data}
          value={value}
          setValue={setValue}></Modal>
      )}
    </>
  );
}
```
