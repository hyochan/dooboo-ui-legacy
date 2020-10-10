import { Animated, NativeTouchEvent, PanResponder, ViewStyle } from 'react-native';
import React, {
  PropsWithChildren,
  ReactElement,
  useEffect,
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

function getTouchesCenterLocation(
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
  const transformCache = useRef({ scale: 1, translateX: 0, translateY: 0 }).current;
  const lastTransform = useRef({ scale: 1, translateX: 0, translateY: 0 });
  const initialDistance = useRef<number>();
  const initialLocation = useRef<{x: number, y: number}>();
  const layout = useRef<{width: number, height: number, x: number, y: number}>();

  useEffect(() => {
    scale.addListener(({ value }) => { transformCache.scale = value; });

    const id = translate.addListener(({ x, y }) => {
      transformCache.translateX = x;
      transformCache.translateY = y;
    });

    return () => {
      scale.removeAllListeners();
      translate.removeListener(id);
    };
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: ({ nativeEvent }) => {
        const { touches } = nativeEvent;

        lastTransform.current = { ...transformCache };

        if (touches.length === 2 && layout.current != null) {
          initialDistance.current = getDistanceFromTouches(touches);

          const center = getTouchesCenterLocation(touches);

          initialLocation.current = {
            x: center.x - layout.current.width / 2,
            y: center.y - layout.current.height / 2,
          };
        } else {
          initialDistance.current = undefined;
        }
      },
      onPanResponderMove: ({ nativeEvent }) => {
        const { touches } = nativeEvent;

        if (touches.length === 2) {
          if (initialDistance.current && initialLocation.current && layout.current) {
            const newScale = getDistanceFromTouches(touches) / initialDistance.current * lastTransform.current.scale;

            scale.setValue(newScale);

            translate.setValue({
              x: initialLocation.current.x * (lastTransform.current.scale - newScale) +
                lastTransform.current.translateX,
              y: initialLocation.current.y * (lastTransform.current.scale - newScale) +
                lastTransform.current.translateY,
            });
          } else if (layout.current != null) {
            initialDistance.current = getDistanceFromTouches(touches);

            const center = getTouchesCenterLocation(touches);

            initialLocation.current = {
              x: center.x - layout.current.width / 2,
              y: center.y - layout.current.height / 2,
            };
          }
        }
      },
      onPanResponderRelease: ({ nativeEvent }) => {
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
      layout.current = nativeEvent.layout;
    }}
    {...panResponder.panHandlers}
  >
    {children}
  </Animated.View>;
}

export default PinchZoom;
