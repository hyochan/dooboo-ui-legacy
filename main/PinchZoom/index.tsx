import { Animated, PanResponder, ViewStyle } from 'react-native';
import React, { useRef, useState } from 'react';
import { number } from '@storybook/addon-knobs';

interface Props {
  style: ViewStyle,
  children?: React.ReactChild,
}

interface VectorType {
  x: number;
  y: number;
}

class Vector implements VectorType {
  x: number;
  y: number;

  constructor(vector: VectorType = { x: 0, y: 0 }) {
    this.set(vector);
  }

  toString(): string {
    return JSON.stringify({ x: this.x, y: this.y });
  }

  distance = (v1: Vector, v2: Vector = this): number => {
    const diffX = v1.x - v2.x;
    const diffY = v1.y - v2.y;
    return Math.sqrt(diffX ** 2 + diffY ** 2);
  }

  set = (vector: VectorType): void => {
    this.x = vector.x;
    this.y = vector.y;
  }

  plus = (a: VectorType, b: VectorType = this): Vector => {
    return new Vector({ x: a.x + b.x, y: a.y + b.y });
  }

  multiply = (n: number, b: VectorType = this): Vector => {
    return new Vector({ x: n * b.x, y: n * b.y });
  }

  center = (a: VectorType, b: VectorType = this): Vector => {
    return new Vector({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  }

  subtract = (a: VectorType): Vector => {
    return new Vector({ x: this.x - a.x, y: this.y - a.y });
  }
}

class TouchPosition {
  offset: Vector;
  current: Vector;
  constructor({ offset = new Vector(), current = new Vector() }: {offset?: Vector, current?: Vector} = {}) {
    this.offset = offset;
    this.current = current;
  }

  setOffset = ({ x, y }: VectorType): void => {
    this.offset.x = x;
    this.offset.y = y;
  }

  setCurrent = ({ x, y }: VectorType): void => {
    this.current.x = x;
    this.current.y = y;
  }

  get relativePosition() : Vector {
    return this.current.subtract(this.offset);
  }
}

function PinchZoom({ children, style }: Props): React.ReactElement {
  const touches = useRef([new TouchPosition(), new TouchPosition()]).current;
  const touchCenter = useRef(new TouchPosition()).current;
  const layoutCenter = useRef(new Vector()).current;
  const scale = useRef(new Animated.Value(1)).current;
  const translate = useRef(new Animated.ValueXY(new Vector())).current;
  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () =>
        true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () =>
        true,

      onPanResponderGrant: ({ nativeEvent }, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        const [touch1, touch2] = touches;
        touch1.setOffset({ x: nativeEvent.locationX, y: nativeEvent.locationY });
        touch2.setOffset({ x: 0, y: 0 });
      },
      onPanResponderMove: ({ nativeEvent }, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}evt
        const [touch1, touch2] = touches;
        touch1.setCurrent({ x: nativeEvent.locationX, y: nativeEvent.locationY });
        if (nativeEvent.touches.length === 2) {
          const secondEvent = nativeEvent.touches[1];
          if (touch2.offset.x === 0 && touch2.offset.y === 0) {
            touch2.setOffset({ x: secondEvent.locationX, y: secondEvent.locationY });
            touchCenter.setOffset(touch1.offset.center(touch2.offset));
          }
          touch2.setCurrent({ x: secondEvent.locationX, y: secondEvent.locationY });
          touchCenter.setCurrent(touch1.current.center(touch2.current));
          const scaleValue = touch1.current.distance(touch2.current) / touch1.offset.distance(touch2.offset);
          scale.setValue(scaleValue);
          translate.setValue(layoutCenter.subtract(touchCenter.offset).multiply(scaleValue - 1));
        } else {
          touch2.offset = new Vector();
        }
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        Animated.timing(scale, {
          useNativeDriver: true,
          toValue: 1,
        }).start();
        Animated.timing(translate, {
          useNativeDriver: true,
          toValue: new Vector(),
        }).start();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;
  return <Animated.View
    onLayout={({ nativeEvent: { layout } }): void => {
      layoutCenter.x = layout.width / 2;
      layoutCenter.y = layout.height / 2;
    }}
    style={[
      style,
      {
        transform: [
          { translateX: translate.x },
          { translateY: translate.y },
          { scale },
        ],
      },
    ]}
    {...panResponder.panHandlers}
  >
    {children}
  </Animated.View>;
}

export default PinchZoom;
