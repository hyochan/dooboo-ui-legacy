import { Animated, Dimensions, Easing } from 'react-native';
import React, { ReactElement, useEffect, useRef } from 'react';

import styled from 'styled-components/native';

export interface Props {
  style?: React.CSSProperties;
  round?: 'round' | 'square';
  barColor?: string | undefined;
  bgColor?: string | undefined;
  height?: number | undefined;
  animationType?:
    | 'default'
    | 'determinate'
    | 'indeterminate'
    | 'indeterminate-flex';
  animationSpeed?: number | undefined;
}

interface roundProps {
  borderRadius: number | string;
}
const handleRound = (round: string | undefined): roundProps => {
  if (round === 'round') {
    return { borderRadius: 10 };
  }
  if (round === 'square') {
    return { borderRadius: 0 };
  }
  return { borderRadius: 0 };
};

const ProgressBar = ({
  barColor,
  bgColor,
  round,
  style,
  height,
  animationType,
  animationSpeed,
}: Props): React.ReactElement => {
  const defaultAnimation = useRef(new Animated.Value(0)).current;
  const determinateAnimation = useRef(new Animated.Value(0)).current;
  const indeterminateAnimation = useRef(new Animated.Value(0)).current;
  const widthAnimation = useRef(new Animated.Value(200)).current;
  const windowWidth = Dimensions.get('window').width;
  const width = Dimensions.get('window').width / 4;

  useEffect((): void => {
    if (animationType === 'default') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(defaultAnimation, {
            toValue: windowWidth,
            delay: 500,
            duration: animationSpeed,
            useNativeDriver: true,
            easing: Easing.quad,
          }),
        ]),
      ).start();
    }

    if (animationType === 'determinate') {
      Animated.loop(
        Animated.timing(determinateAnimation, {
          toValue: windowWidth,
          duration: animationSpeed,
          useNativeDriver: true,
          easing: Easing.quad,
        }),
      ).start();
    }

    if (animationType === 'indeterminate') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(indeterminateAnimation, {
            toValue: windowWidth,
            duration: animationSpeed,
            useNativeDriver: true,
            easing: Easing.quad,
          }),
        ]),
      ).start();
    }

    if (animationType === 'indeterminate-flex') {
      Animated.loop(
        Animated.sequence([
          Animated.timing(indeterminateAnimation, {
            toValue: windowWidth,
            duration: animationSpeed,
            useNativeDriver: true,
            easing: Easing.quad,
          }),
        ]),
      ).start();
    }
  }, []);

  Animated.loop(
    Animated.sequence([
      Animated.timing(widthAnimation, {
        toValue: windowWidth / 4,
        duration: animationSpeed,
        useNativeDriver: true,
        easing: Easing.quad,
      }),
    ]),
  ).start();

  return (
    <Container>
      <ProgressBars
        as={Animated.View}
        style={[
          handleRound(round),
          { backgroundColor: bgColor },
          { height: height },
        ]}>
        <Filler
          as={Animated.View}
          style={[
            handleRound(round),
            { backgroundColor: barColor },
            animationType === 'default' ? { width: defaultAnimation } : null,
            animationType === 'determinate'
              ? { width: determinateAnimation }
              : null,
            animationType === 'indeterminate'
              ? {
                  transform: [{ translateX: indeterminateAnimation }],
                  width: width,
                }
              : null,
            animationType === 'indeterminate-flex'
              ? {
                  transform: [{ translateX: indeterminateAnimation }],
                  width: widthAnimation,
                }
              : null,
          ]}></Filler>
      </ProgressBars>
    </Container>
  );
};

export default ProgressBar;

const Container = styled.View`
  flex: 1;
  width: 100%;
  margin-bottom: 20px;
  flex-direction: row;
  padding: 20px;
`;

const ProgressBars = styled.View`
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

const Filler = styled.View`
  height: 100%;
  justify-content: center;
`;

ProgressBar.defaultProps = {
  borderRadius: 0,
  bgColor: '#d0e3ff',
  barColor: '#609FFF',
  height: 5,
  animationType: 'default',
  animationSpeed: 1000,
};
