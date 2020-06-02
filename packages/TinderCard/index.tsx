import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  Text,
  UIManager,
  ViewStyle,
} from 'react-native';
import React, {
  PropsWithChildren,
  ReactElement,
  Ref,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

import styled from 'styled-components/native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export enum TinderCardDirection {
  RIGHT = 'right',
  LEFT = 'left',
}

export interface TinderCardRef {
  handleCancel: () => void;
  forceSwipe: (direction: TinderCardDirection) => void;
}

interface Props<T> {
  testID?: string;
  errorTestID?: string;
  data?: T[];
  renderCards?: (item: T) => ReactElement;
  renderNoMoreCards?: () => ReactElement;
  onSwipeRight?: (item: T) => void;
  onSwipeLeft?: (item: T) => void;
  onCancel?: () => void;
  swipeRightLabelElement?: () => ReactElement | null;
  swipeLeftLabelElement?: () => ReactElement | null;
  swipeRightLabelStyle?: ViewStyle;
  swipeLeftLabelStyle?: ViewStyle;
  swipeLabelAlignStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  frontCardStyle?: ViewStyle;
  backCardsStyle?: ViewStyle;
  shouldRotate?: boolean;
}

const Container = styled.View`
  width: 100%;
  height: 100%;
`;

const SwipeLabelWrapper = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const NoCardWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-color: black;
  border-width: 1px;
`;

function TinderCard<T>(
  props: PropsWithChildren<Props<T>>,
  ref: Ref<TinderCardRef>,
): ReactElement {
  const {
    data,
    renderCards,
    renderNoMoreCards,
    onSwipeLeft,
    onSwipeRight,
    onCancel,
    swipeRightLabelElement,
    swipeLeftLabelElement,
    swipeRightLabelStyle,
    swipeLeftLabelStyle,
    swipeLabelAlignStyle,
    containerStyle,
    frontCardStyle,
    backCardsStyle,
    shouldRotate,
  } = props;

  const [cardIndex, setCardIndex] = useState(0);
  const [timeBreak, setTimeBreak] = useState(false);
  const position = useMemo(() => new Animated.ValueXY(), []);

  const swipeRightOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
  });

  const swipeLeftOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
  });

  const resetPosition = (): void => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const onSwipeCompleted = useCallback(
    (direction: TinderCardDirection): void => {
      position.setValue({ x: 0, y: 0 });

      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
      LayoutAnimation.spring();

      let currentIndex = 0;

      setCardIndex((idx) => {
        currentIndex = idx;
        return idx + 1;
      });

      if (direction === TinderCardDirection.RIGHT) {
        onSwipeRight && data && onSwipeRight(data[currentIndex]);
      } else {
        onSwipeLeft && data && onSwipeLeft(data[currentIndex]);
      }
      setTimeBreak(false);
    },
    [],
  );

  const forceSwipe = (direction: TinderCardDirection): void => {
    setTimeBreak(true);
    const x =
      direction === TinderCardDirection.RIGHT ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: true,
    }).start(() => {
      onSwipeCompleted(direction);
    });
  };

  const _panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
          position.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (evt, gesture) => {
          if (gesture.dx > SWIPE_THRESHOLD) {
            forceSwipe(TinderCardDirection.RIGHT);
          } else if (gesture.dx < -SWIPE_THRESHOLD) {
            forceSwipe(TinderCardDirection.LEFT);
          } else {
            resetPosition();
          }
        },
      }),
    [],
  );

  const getCardStyle = (): Record<string, any> => {
    const rotateValue = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-45deg', '0deg', '45deg'],
    });

    const rotateStyle = shouldRotate
      ? { transform: [{ rotate: rotateValue }] }
      : {};

    return {
      ...position.getLayout(),
      ...rotateStyle,
    };
  };

  const _renderCards = (): ReactElement | (ReactElement | null)[] => {
    if (!data || cardIndex >= data.length) {
      if (renderNoMoreCards) {
        return renderNoMoreCards();
      }
      return (
        <NoCardWrapper>
          <Text>No more cards</Text>
        </NoCardWrapper>
      );
    }

    const dataSet = data.map((item, idx) => {
      if (!renderCards || idx < cardIndex) return null;
      if (idx === cardIndex) {
        return (
          <Animated.View
            key={`card__${idx}`}
            style={[
              getCardStyle(),
              {
                position: 'absolute',
                top: 0,
                zIndex: 99,
                width: '100%',
                height: '100%',
              },
              frontCardStyle,
            ]}
            {..._panResponder.panHandlers}>
            {renderCards && renderCards(item)}
            <SwipeLabelWrapper style={swipeLabelAlignStyle}>
              <Animated.View
                style={[
                  { position: 'absolute', opacity: swipeRightOpacity },
                  swipeRightLabelStyle,
                ]}>
                {swipeRightLabelElement && swipeRightLabelElement()}
              </Animated.View>
              <Animated.View
                style={[
                  { position: 'absolute', opacity: swipeLeftOpacity },
                  swipeLeftLabelStyle,
                ]}>
                {swipeLeftLabelElement && swipeLeftLabelElement()}
              </Animated.View>
            </SwipeLabelWrapper>
          </Animated.View>
        );
      }

      return (
        <Animated.View
          key={`card__${idx}`}
          style={[
            {
              position: 'absolute',
              top: 0,
              zIndex: 5,
              width: '100%',
              height: '100%',
            },
            backCardsStyle,
          ]}>
          {renderCards(item)}
        </Animated.View>
      );
    });
    return dataSet.reverse();
  };

  const handleCancel = (): void => {
    if (cardIndex > 0 && onCancel) {
      setCardIndex((index) => index - 1);
      onCancel();
    }
  };

  const refForceSwipe = (direction: TinderCardDirection): void => {
    if (timeBreak) return;
    return forceSwipe(direction);
  };

  useImperativeHandle(ref, () => ({
    forceSwipe: refForceSwipe,
    handleCancel,
  }));

  return <Container style={containerStyle}>{_renderCards()}</Container>;
}

export default forwardRef(TinderCard);
