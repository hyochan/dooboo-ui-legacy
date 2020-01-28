import { Animated, StyleProp, TextStyle } from 'react-native';

import React from 'react';
import styled from 'styled-components/native';

interface LabelStyle {
  size: number;
  backgroundColor: string;
  fontStyle: StyleProp<TextStyle>;
}

interface Props {
  percentValue: Animated.Value;
  value: number;
  testID?: string;
  labelStyle: LabelStyle;
}

const Value = styled.Text`
  transform: rotate(45deg);
`;

const Label: React.FC<Props> = (props) => {
  return (
    <Animated.View
      testID={props.testID}
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: props.labelStyle?.size,
        height: props.labelStyle?.size,
        borderTopRightRadius: props.labelStyle?.size / 2,
        borderTopLeftRadius: props.labelStyle?.size / 2,
        borderBottomRightRadius: props.labelStyle?.size / 2,
        backgroundColor: props.labelStyle.backgroundColor, // '#4163f4',
        transform: [
          { rotate: '-45deg' },
          { translateX: -((Math.sqrt(2) * props.labelStyle?.size) / 2) },
        ],
        top: -props.labelStyle?.size * 2,
        left: props.percentValue.interpolate({
          inputRange: [0, 100],
          outputRange: ['0%', '100%'],
        }),
      }}
    >
      <Value style={ props.labelStyle.fontStyle }>{props.value}</Value>
    </Animated.View>
  );
};

export default Label;
