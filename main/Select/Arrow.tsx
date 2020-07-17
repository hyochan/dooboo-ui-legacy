import Svg, { Line } from 'react-native-svg';

import React from 'react';
import { View } from 'react-native';

export default function Arrow(props): React.ReactElement {
  return (
    <View>
      <Svg height="20" width="20" viewBox="0 0 20 20">
        <Line
          x1={5}
          y1={7}
          x2={10}
          y2={12}
          stroke={props.color}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={0.95}
        />
        <Line
          x1={10}
          y1={12}
          x2={15}
          y2={7}
          stroke={props.color}
          strokeWidth="1"
          strokeLinecap="round"
          opacity={0.95}
        />
      </Svg>
    </View>
  );
}
