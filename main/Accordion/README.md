# Accordion

> Simple drop down item component for react-native. This component supports drop down toggle with animation.<br/>

![image](https://user-images.githubusercontent.com/58724686/91258142-9fcfbb00-e7a6-11ea-8ab3-af03760ed8c9.gif)

## Props

|                      | necessary | types                                | default               |
| -------------------- | --------- | ------------------------------------ | ----------------------|
| data                 | ✓         | array                                | `Default Data`        |
| isAnimated           |           | boolean                              | `true`                |
| collapseOnStart      | ✓         | boolean                              | `false`               |
| animDuration         |           | number                               | `300`                 |
| activeOpacity        |           | number                               | `1`                   |
| toggleElement        |           | React.ReactElement                   | `default arrow image` |
| renderTitle          |           | (item: string) => React.ReactElement | default component     |
| renderBody           |           | (item: string) => React.ReactElement | default component     |
| titleContainerStyle  |           | ViewStyle                            | ``                    |
| bodyContainerStyle   |           | ViewStyle                            | ``                    |

## Installation

```sh
yarn add dooboo-ui
```

## Usage
```javascript
import { Accordion } from 'dooboo-ui';

const Default = (): React.ReactElement => {
const data = [
  {
    title: 'title1',
    bodies: [
      'body1',
      'body2',
      'body3',
    ],
  },
  {
    title: 'title2',
    bodies: [
      'body1',
      'body2',
      'body3',
    ],
  },
  {
    title: 'title3',
    bodies: [
      'body1',
      'body2',
      'body3',
    ],
  },
];

  return (
    <SafeAreaView style={{ top: 200 }}>
      <Container>
        <Accordion
          data={data}
          shouldAnimate={true}
          collapseOnStart={true}
          animDuration={300}
          activeOpacity={1}
          renderTitle = {(item): React.ReactElement =>
            <CustomStyledTitle>
              <LeftElement source={IC_FACEBOOK} />
              {item}
            </CustomStyledTitle>
          }
          renderBody = {(item): React.ReactElement =>
            <CustomStyledItem>
              <LeftElement source={IC_GOOGLE}/>
              {item}
              <RightElement source={IC_GOOGLE}/>
            </CustomStyledItem>
          }
          toggleElement={<ArrowDown />}
          titleContainerStyle={{
            backgroundColor: 'gray',
          }}
          bodyContainerStyle={{
            backgroundColor: 'lightgray',
          }}
        />
      </Container>
    </SafeAreaView>
  );
};
```
