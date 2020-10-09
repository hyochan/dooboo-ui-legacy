import { Animated, NativeTouchEvent, PanResponder, ViewStyle } from 'react-native';
import React, {
  PropsWithChildren,
  ReactElement,
  useRef,
} from 'react';

type Props = PropsWithChildren<{
  style?: ViewStyle,
}>

function getDistanceFromTouches(
  touches: NativeTouchEvent[]): number {
  const [touch1, touch2] = touches;

  return Math.sqrt((touch1.pageX - touch2.pageX) ** 2 +
    (touch1.pageY - touch2.pageY) ** 2);
}

function PinchZoom(props: Props): ReactElement {
  const { style, children } = props;
  const scale = useRef(new Animated.Value(1)).current;
  const initialDistance = useRef<number>();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: ({ nativeEvent }) => {
        const { touches } = nativeEvent;

        if (touches.length === 2) {
          initialDistance.current = getDistanceFromTouches(touches);
        } else {
          initialDistance.current = undefined;
        }
      },
      onPanResponderMove: ({ nativeEvent }) => {
        const { touches } = nativeEvent;

        if (touches.length === 2) {
          if (initialDistance.current) {
            scale.setValue(
              getDistanceFromTouches(touches) / initialDistance.current,
            );
          } else {
            initialDistance.current = getDistanceFromTouches(touches);
          }
        }
      },
      onPanResponderRelease: ({ nativeEvent }) => {
        console.log('onPanResponderRelease', nativeEvent);
      },
    }),
  ).current;

  return <Animated.View
    style={[style, {
      transform: [{
        scale,
      }],
    }]}
    {...panResponder.panHandlers}
  >
    {children}
  </Animated.View>;
}

export default PinchZoom;
