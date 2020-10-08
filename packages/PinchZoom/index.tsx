import { Animated, ViewStyle } from 'react-native';
import React, {
  PropsWithChildren,
  ReactElement,
} from 'react';

type Props = PropsWithChildren<{
  style?: ViewStyle,
}>

function PinchZoom(props: Props): ReactElement {
  const { style, children } = props;
  return <Animated.View
    style={style}
  >
    {children}
  </Animated.View>;
}

export default PinchZoom;
