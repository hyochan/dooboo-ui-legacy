import { Animated, PanResponder, PanResponderInstance, TransformsStyle, ViewStyle } from 'react-native';
import React, {
  PropsWithChildren, ReactElement, Ref, forwardRef,
  useCallback, useEffect, useImperativeHandle, useRef, useState,
} from 'react';
import {
  TouchPosition, Vector, VectorType,
  getClamppedVector,
  getOriginScaleTargetPosition,
  getTranslate,
} from './utils';

type Props = PropsWithChildren <{
  style?: ViewStyle | { transform: Animated.WithAnimatedValue<TransformsStyle> },
  blockNativeResponder?: boolean,
  onScaleChanged?(value: number): void,
  onTranslateChanged?(valueXY: VectorType): void,
  onRelease?(): void,
}>

export interface PinchZoomRef {
  animatedValue: { scale: Animated.Value, translate: Animated.ValueXY },
  setValues(_:{ scale?: number, translate?: VectorType }): void,
}

function PinchZoom(props: Props, ref: Ref<PinchZoomRef>): ReactElement {
  const {
    children,
    style,
    blockNativeResponder = true, onScaleChanged, onTranslateChanged,
    onRelease,
  } = props;
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
  const createPanResponder = (): PanResponderInstance => {
    return PanResponder.create({
      onStartShouldSetPanResponder: /* istanbul ignore next */ () => true,
      onStartShouldSetPanResponderCapture: /* istanbul ignore next */ () => true,
      onMoveShouldSetPanResponder: /* istanbul ignore next */ () => true,
      onMoveShouldSetPanResponderCapture: /* istanbul ignore next */ () => true,
      onPanResponderGrant: () => {
        const [touch1, touch2] = touches;

        touch1.setOffset({ x: 0, y: 0 });
        touch2.setOffset({ x: 0, y: 0 });
        scaleValue.offset = scaleValue.current;
        translateValue.offset.set(translateValue.current);
      },
      onPanResponderMove: ({ nativeEvent }, gestureState) => {
        const [touch1, touch2] = touches;

        if (nativeEvent.touches.length === 2) {
          const secondEvent = nativeEvent.touches[1];

          if (touch2.offset.x === 0 && touch2.offset.y === 0) {
            touch1.setOffset({ x: nativeEvent.locationX, y: nativeEvent.locationY });
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

          touch1.setCurrent({ x: nativeEvent.locationX, y: nativeEvent.locationY });
          touch2.setCurrent({ x: secondEvent.locationX, y: secondEvent.locationY });
          scaleValue.current = scaleValue.offset *
            touch1.current.distance(touch2.current) / touch1.offset.distance(touch2.offset);

          scaleValue.current = Math.max(1, Math.sqrt(scaleValue.current * scaleValue.offset));
          scale.setValue(scaleValue.current);
          translateValue.current.set(getTranslate({
            targetPosition,
            layoutCenter,
            scale: scaleValue.current,
          }));
          translate.setValue(translateValue.current);
        } else if (
          touch2.offset.x === 0 && touch2.offset.y === 0 &&
            nativeEvent.touches.length === 1
        ) {
          const maxValue = layoutCenter.multiply(scaleValue.current + 1);

          translateValue.current = getClamppedVector({
            vector: translateValue.offset.add({ x: gestureState.dx, y: gestureState.dy }),
            max: maxValue,
            min: maxValue.multiply(-1),
          });
          translate.setValue(translateValue.current);
        }
      },
      onPanResponderRelease: () => {
        onRelease && onRelease();
      },
      onPanResponderTerminationRequest: /* istanbul ignore next */ () => {
        return true;
      },
      onShouldBlockNativeResponder: /* istanbul ignore next */ () => {
        return blockNativeResponder;
      },
    });
  };

  const [panResponder, setPanResponder] = useState<PanResponderInstance>(createPanResponder());

  useEffect(() => {
    if (!onTranslateChanged) return;

    const id = translate.addListener(onTranslateChanged);

    return ():void => {
      translate.removeListener(id);
    };
  }, [onTranslateChanged]);

  useEffect(() => {
    if (!onScaleChanged) return;

    const id = scale.addListener(({ value }) => onScaleChanged(value));

    return ():void => {
      scale.removeListener(id);
    };
  }, [onScaleChanged]);

  useEffect(() => {
    release();
    setPanResponder(createPanResponder());
  }, [blockNativeResponder, onRelease, onScaleChanged, onTranslateChanged]);

  const setValues = useCallback(({ scale, translate }:{ scale?: number, translate?: VectorType }) => {
    if (scale != null) { scaleValue.current = scale; }

    if (translate != null) { translateValue.current = new Vector(translate); }
  }, [scaleValue, translateValue]);

  useEffect(() => {
    scaleValue.offset = 1;
    translateValue.offset = new Vector();
  }, [children]);

  useImperativeHandle(ref, () => ({
    animatedValue: { scale, translate },
    setValues,
  }));

  return <Animated.View
    testID="PINCH_ZOOM_CONTAINER"
    onLayout={({ nativeEvent: { layout } }): void => {
      layoutCenter.x = layout.width / 2;
      layoutCenter.y = layout.height / 2;
    }}
    style={[
      style,
      {
        transform: style?.transform || [
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

export { PinchZoom };

export default forwardRef<PinchZoomRef, Props>(PinchZoom);
