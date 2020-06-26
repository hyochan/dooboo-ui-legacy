import Svg, { Line } from 'react-native-svg';
import React from 'react';
import { View } from 'react-native';

interface Props {
  arrowDirection: string;
}

export default function Arrow(props: Props): React.ReactElement {
  return (
    <View
      style={
        props.arrowDirection === 'up' && { transform: [{ rotate: '180deg' }] }
      }>
      <Svg height="20" width="20" viewBox="0 0 20 20">
        <Line
          x1={5}
          y1={7}
          x2={10}
          y2={12}
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <Line
          x1={10}
          y1={12}
          x2={15}
          y2={7}
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}
