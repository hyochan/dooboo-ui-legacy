import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  testID?: string;
  borderRadius?: number;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  selectedViewStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  data: string[];
  onPress?: (i: number) => void;
  initialIndex?: number;
}

function Shared(props: Props): React.ReactElement {
  const {
    borderRadius = 0,
    initialIndex = 0,
    testID,
    containerStyle,
    style,
    selectedViewStyle,
    viewStyle,
    selectedTextStyle,
    textStyle,
    data,
    onPress,
  } = props;
  const [selectedOption, setSelectedOption] = useState(initialIndex);

  return (
    <View testID={testID} style={StyleSheet.flatten([containerStyle, style])}>
      {data.map((text, i) => {
        return (
          <TouchableOpacity
            key={i}
            testID={`CHILD_${i}`}
            style={{ flex: 1 }}
            onPress={(): void => {
              setSelectedOption(i);
              if (onPress) {
                onPress(i);
              }
            }}
          >
            <View
              style={
                StyleSheet.flatten([
                  selectedOption === i
                    ? selectedViewStyle
                    : viewStyle,
                  i === 0 ? {
                    borderTopLeftRadius: borderRadius,
                    borderBottomLeftRadius: borderRadius,
                  } : {},
                  i === data.length - 1 ? {
                    borderBottomRightRadius: borderRadius,
                    borderTopRightRadius: borderRadius,
                  } : {},
                ])
              }
            >
              <Text
                style={
                  selectedOption === i
                    ? selectedTextStyle
                    : textStyle
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
    minHeight: 40,
    marginTop: 24,
  },
  viewStyle: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    minHeight: 40,
    borderColor: 'rgb(62,126,255)',

    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedViewStyle: {
    backgroundColor: 'rgb(62,126,255)',
    alignSelf: 'stretch',
    minHeight: 40,
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
