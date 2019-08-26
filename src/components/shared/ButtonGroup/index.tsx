import React, { useState } from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  testID?: string;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  selectedViewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  data: string[];
  onPress?: (i: number) => void;
}

function Shared(props: Props) {
  const [selectedOption, setSelectedOption] = useState(0);

  return (
    <View
      testID={props.testID}
      style={[props.containerStyle, props.style]}
    >
      {props.data.map((text, i) => {
        return (
          <TouchableOpacity
            key={i}
            testID={`CHILD_${i}`}
            style={{ flex: 1 }}
            onPress={() => {
              setSelectedOption(i);
              if (props.onPress) {
                props.onPress(i);
              }
            }}
          >
            <View
              style={[
                selectedOption === i
                  ? props.selectedViewStyle
                  : props.viewStyle,
                i !== props.data.length - 1
                  ? {
                    borderRightWidth: 1,
                  }
                  : null,
              ]}
            >
              <Text
                style={
                  selectedOption === i
                    ? props.selectedTextStyle
                    : props.textStyle
                }
              >
                {text}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

Shared.defaultProps = {
  containerStyle: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgb(62,126,255)',
    alignSelf: 'stretch',
    height: 32,
    marginTop: 24,
  },
  viewStyle: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    height: 30,
    borderColor: 'rgb(62,126,255)',

    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedViewStyle: {
    backgroundColor: 'rgb(62,126,255)',
    alignSelf: 'stretch',
    height: 30,
    borderColor: 'rgb(62,126,255)',

    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: 'rgb(62,126,255)',
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
  },
  selectedTextStyle: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'center',
  },
  selectedOption: {
    index: 0,
  },
  data: ['option 1', 'option 2'],
};

export default Shared;
