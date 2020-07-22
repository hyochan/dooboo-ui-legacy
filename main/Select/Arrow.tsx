import Svg, { Line } from 'react-native-svg';
import { TextStyle, View } from 'react-native';

import React from 'react';

interface Props {
  color: string;
  customColor?: TextStyle;
}

export default function Arrow(props: Props): React.ReactElement {
  const { color, customColor = { color: color } } = props;
  return (
    <View>
      <Svg height="20" width="20" viewBox="0 0 20 20">
        <Line
          x1={5}
          y1={7}
          x2={10}
          y2={12}
          stroke={customColor.color || color}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.95}
        />
        <Line
          x1={10}
          y1={12}
          x2={15}
          y2={7}
          stroke={customColor.color || color}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity={0.95}
        />
      </Svg>
    </View>
  );
}
