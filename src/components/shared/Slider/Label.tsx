import { Animated, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import React from 'react';
import styled from 'styled-components/native';

interface LabelProps {
  // size: number;
  // backgroundColor: string;
  labelStyle: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
}

interface Props {
  percentValue: Animated.Value;
  value: number;
  testID?: string;
  labelProps: LabelProps;
}

const Value = styled.Text`
  transform: rotate(45deg);
`;

const Label: React.FC<Props> = (props) => {
  const labelSize = StyleSheet.flatten(props.labelProps?.labelStyle)?.height;

  return (
    <Animated.View
      testID={props.testID}
      style={[{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: labelSize,
        height: labelSize,
        borderTopRightRadius: labelSize / 2,
        borderTopLeftRadius: labelSize / 2,
        borderBottomRightRadius: labelSize / 2,
        transform: [
          { rotate: '-45deg' },
          { translateX: -((Math.sqrt(2) * labelSize) / 2) },
        ],
        top: -labelSize * 2,
        left: props.percentValue.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%'],
        }),
      },
      props.labelProps?.labelStyle, // '#4163f4',
      ]}
    >
      <Value style={ props.labelProps?.textStyle }>{props.value}</Value>
    </Animated.View>
  );
};

export default Label;
