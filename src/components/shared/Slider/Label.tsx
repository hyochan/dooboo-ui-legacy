import { Animated, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import React from 'react';
import styled from 'styled-components/native';

interface Props {
  percentValue: Animated.Value;
  value: number;
  testID?: string;
  size: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Value = styled.Text`
  transform: rotate(45deg);
`;

const Label: React.FC<Props> = (props) => {
  return (
    <Animated.View
      testID={props.testID}
      style={[{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: props.size,
        height: props.size,
        borderTopRightRadius: props.size / 2,
        borderTopLeftRadius: props.size / 2,
        borderBottomRightRadius: props.size / 2,
        transform: [
          { rotate: '-45deg' },
          { translateX: -((Math.sqrt(2) * props.size) / 2) },
        ],
        top: -props.size * 2,
        left: props.percentValue.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%'],
        }),
      },
      props.style, // '#4163f4',
      ]}
    >
      <Value style={ props.textStyle }>{props.value}</Value>
    </Animated.View>
  );
};

export default Label;
