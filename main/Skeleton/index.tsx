import { Animated, StyleProp, ViewStyle } from 'react-native';
import React, { ReactElement, useEffect } from 'react';

import styled from 'styled-components/native';

export interface Props {
  shape?: 'text' | 'circle' | 'rect';
  width?: number | string;
  height?: number | string;
  color?: string;
  animation?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const handleShape = (shape: Props['shape']): ViewStyle | undefined => {
  if (shape === 'text') {
    return { borderRadius: 10 };
  }
  if (shape === 'circle') {
    return { borderRadius: 100 };
  }
  return undefined;
};

// Inferring dimensions
const hasChildren = (children: React.ReactNode): ViewStyle | undefined => {
  // inline style 있을때
  if (children && children.props.style) {
    return {
      width: children.props.style.width,
      height: children.props.style.height,
    };
  } else if (children) {
    return {
      // width: 'fit-content', height: 'fit-content',
      width: 'auto', height: 'auto',
    };
  }
  return undefined;
};

const renderChildren = (
  children: Props['children'],
):React.DetailedReactHTMLElement<any, HTMLElement>[] | null | undefined => {
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      style: {
        // visibility: 'hidden',
        opacity: 0,
      },
    });
  },
  );
};

const Skeleton = ({
  shape,
  width,
  height,
  color,
  animation,
  children,
  style,
}: Props): ReactElement => {
  const opacity = new Animated.Value(0.3);

  useEffect((): void => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Skeletons
      as={Animated.View}
      style={[
        { width },
        { height },
        handleShape(shape),
        hasChildren(children),
        animation ? { opacity } : undefined,
        { backgroundColor: color },
        style,
      ]}>
      {renderChildren(children)}
    </Skeletons>
  );
};

export default Skeleton;

Skeleton.defaultProps = {
  shape: 'text',
  width: '100%',
  height: 12,
  color: '#e7e7e7',
  animation: true,
};

const Skeletons = styled.View``;
