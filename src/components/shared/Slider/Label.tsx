import { Animated, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import React from 'react';
import styled from 'styled-components/native';

interface Props {
  testID?: string;
  percentValue: Animated.Value;
  value: number;
  size?: number;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Value = styled.Text`
  transform: rotate(45deg);
`;

const Label: React.FC<Props> = ({
  testID,
  percentValue,
  value,
  size = 32,
  style,
  textStyle,
}) => {
  return (
    <Animated.View
      testID={testID}
      style={[{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderTopRightRadius: size / 2,
        borderTopLeftRadius: size / 2,
        borderBottomRightRadius: size / 2,
        backgroundColor: '#4163f4',
        transform: [
          { rotate: '-45deg' },
          { translateX: -((Math.sqrt(2) * size) / 2) },
        ],
        top: -size * 2,
        left: percentValue.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%'],
        }),
        ...StyleSheet.flatten(style),
      }]}
    >
      <Value style={{
        color: 'white',
        ...StyleSheet.flatten(textStyle),
      }}>{value}</Value>
    </Animated.View>
  );
};

export default Label;
