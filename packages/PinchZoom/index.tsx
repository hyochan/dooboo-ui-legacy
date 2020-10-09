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
  touches: NativeTouchEvent[],
): number {
  const [touch1, touch2] = touches;

  return Math.sqrt((touch1.pageX - touch2.pageX) ** 2 +
    (touch1.pageY - touch2.pageY) ** 2);
}

function getTouchesCenter(
  touches: NativeTouchEvent[],
): {x: number, y: number} {
  return {
    x: (touches[0].locationX + touches[1].locationX) / 2,
    y: (touches[0].locationY + touches[1].locationY) / 2,
  };
}

function PinchZoom(props: Props): ReactElement {
  const { style, children } = props;
  const scale = useRef(new Animated.Value(1)).current;
  const translate = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const initialDistance = useRef<number>();
  const targetPosition = useRef<{x: number, y: number}>();
  const layoutSize = useRef<{width: number, height: number}>();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: ({ nativeEvent }) => {
        const { touches } = nativeEvent;

        if (touches.length === 2 && layoutSize.current != null) {
          initialDistance.current = getDistanceFromTouches(touches);

          const centerLocation = getTouchesCenter(touches);

          targetPosition.current = {
            x: centerLocation.x - layoutSize.current.width / 2,
            y: centerLocation.y - layoutSize.current.height / 2,
          };
          console.log('targetPosition', targetPosition.current);
          console.log('layoutSize', layoutSize.current);
        } else {
          initialDistance.current = undefined;
        }
      },
      onPanResponderMove: ({ nativeEvent }) => {
        const { touches } = nativeEvent;

        if (touches.length === 2) {
          if (initialDistance.current && targetPosition.current) {
            const scaleValue = getDistanceFromTouches(touches) / initialDistance.current;

            scale.setValue(scaleValue);

            translate.setValue({
              x: targetPosition.current.x * (1 - scaleValue),
              y: targetPosition.current.y * (1 - scaleValue),
            });
            console.log('targetPosition', targetPosition.current);
          } else if (layoutSize.current != null) {
            initialDistance.current = getDistanceFromTouches(touches);

            const centerLocation = getTouchesCenter(touches);

            targetPosition.current = {
              x: centerLocation.x - layoutSize.current.width / 2,
              y: centerLocation.y - layoutSize.current.height / 2,
            };
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
      transform: [
        { translateX: translate.x },
        { translateY: translate.y },
        { scale },
      ],
    }]}
    onLayout={({ nativeEvent }) => {
      const { layout: { width, height } } = nativeEvent;

      layoutSize.current = { width, height };
    }}
    {...panResponder.panHandlers}
  >
    {children}
  </Animated.View>;
}

export default PinchZoom;
