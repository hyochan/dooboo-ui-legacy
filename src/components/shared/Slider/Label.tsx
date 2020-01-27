import { Animated } from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

interface Props {
  percentValue: Animated.Value;
  value: number;
  size?: number;
  testID?: string;
}

const Value = styled.Text`
  transform: rotate(45deg);
  color: white;
`;

const Label: React.FC<Props> = ({ percentValue, value, size = 32, testID }) => {
  return (
    <Animated.View
      testID={testID}
      style={{
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
      }}
    >
      <Value>{value}</Value>
    </Animated.View>
  );
};

export default Label;
