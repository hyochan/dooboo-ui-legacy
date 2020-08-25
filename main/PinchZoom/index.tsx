import { Animated, PanResponder, PanResponderInstance, ViewStyle } from 'react-native';
import React, { useRef } from 'react';
import { TouchPosition, Vector, getClamppedVector, getOriginScaleTargetPosition, getTranslate } from './utils';

interface Props {
  style?: ViewStyle,
  children: React.ReactNode,
  blockNativeResponder?: boolean,
}

function PinchZoom({ children, style, blockNativeResponder = true }: Props): React.ReactElement {
  const touches = useRef([new TouchPosition(), new TouchPosition()]).current;
  const targetPosition = useRef(new Vector()).current;
  const layoutCenter = useRef(new Vector()).current;
  const scaleValue = useRef({ offset: 1, current: 1 }).current;
  const translateValue = useRef({ offset: new Vector(), current: new Vector() }).current;
  const scale = useRef(new Animated.Value(1)).current;
  const translate = useRef(new Animated.ValueXY(new Vector())).current;
  const release = (): void => {
    Animated.timing(scale, {
      useNativeDriver: true,
      toValue: 1,
    }).start();
    Animated.timing(translate, {
      useNativeDriver: true,
      toValue: new Vector(),
    }).start();
  };
  const createPanresponder = (): PanResponderInstance => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: ({ nativeEvent }) => {
        const [touch1, touch2] = touches;
        touch1.setOffset({ x: nativeEvent.locationX, y: nativeEvent.locationY });
        touch2.setOffset({ x: 0, y: 0 });
        scaleValue.offset = scaleValue.current;
        translateValue.offset.set(translateValue.current);
      },
      onPanResponderMove: ({ nativeEvent }, gestureState) => {
        const [touch1, touch2] = touches;
        touch1.setCurrent({ x: nativeEvent.locationX, y: nativeEvent.locationY });
        if (nativeEvent.touches.length === 2) {
          const secondEvent = nativeEvent.touches[1];
          if (touch2.offset.x === 0 && touch2.offset.y === 0) {
            touch2.setOffset({ x: secondEvent.locationX, y: secondEvent.locationY });
            targetPosition.set(
              getOriginScaleTargetPosition({
                currentPosition: touch1.offset.center(touch2.offset),
                layoutCenter,
                scale: scaleValue.offset,
                translate: translateValue.offset,
              }),
            );
          }
          touch2.setCurrent({ x: secondEvent.locationX, y: secondEvent.locationY });
          scaleValue.current = Math.max(
            1,
            scaleValue.offset * touch1.current.distance(touch2.current) / touch1.offset.distance(touch2.offset),
          );
          scale.setValue(scaleValue.current);
          translateValue.current.set(getTranslate({
            targetPosition,
            layoutCenter,
            scale: scaleValue.current,
          }));
          console.log(translateValue.current.toString());
          translate.setValue(translateValue.current);
        } else {
          if (
            touch2.offset.x === 0 && touch2.offset.y === 0 &&
            nativeEvent.touches.length === 1 && scaleValue.offset > 1) {
            const maxValue = layoutCenter.multiply(scaleValue.current - 1);
            translateValue.current = getClamppedVector({
              vector: translateValue.offset.add({ x: gestureState.dx, y: gestureState.dy }),
              max: maxValue,
              min: maxValue.multiply(-1),
            });
            translate.setValue(translateValue.current);
          }
        }
      },
      onPanResponderTerminationRequest: () => {
        return true;
      },
      onShouldBlockNativeResponder: () => {
        return blockNativeResponder;
      },
    });
  };
  const [panResponder, setPanResponder] = React.useState<PanResponderInstance>(createPanresponder());
  React.useEffect(() => {
    release();
    setPanResponder(createPanresponder());
  }, [blockNativeResponder]);

  return <Animated.View
    testID="PINCH_ZOOM_CONTAINER"
    onLayout={({ nativeEvent: { layout } }): void => {
      layoutCenter.x = layout.width / 2;
      layoutCenter.y = layout.height / 2;
    }}
    style={[
      style,
      {
        transform: [
          {
            translateX: translate.x,
          },
          { translateY: translate.y },
          { scale },
        ],
      },
    ]}
    {...(panResponder?.panHandlers || {})}
  >
    {children}
  </Animated.View>;
}

export default PinchZoom;
