import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  Platform,
  Text,
  UIManager,
} from 'react-native';
import React, { ReactElement, useCallback, useMemo, useState } from 'react';

import styled from 'styled-components/native';

const SCREEN_WIDTH = Dimensions.get('screen').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

interface DataProps {
  [key: string]: any;
}

interface Props {
  testID?: string;
  onSwipeRight?: (item: DataProps) => void;
  onSwipeLeft?: (item: DataProps) => void;
  onCancel?: () => void;
  data: Array<DataProps>;
  renderCards: (item: DataProps) => ReactElement;
  renderNoMoreCards: () => ReactElement;
  rotate?: boolean;
  stackSize?: number;
}

const Container = styled.View`
  width: ${SCREEN_WIDTH};
`;

const CancelButton = styled.Button`
  background-color: blue;
  color: blue;
`;

const NoCard = styled.View`
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

function TinderCard(props: Props): ReactElement {
  const [cardIndex, setCardIndex] = useState(0);
  const position = useMemo(() => new Animated.ValueXY(), []);

  const resetPosition = (): void => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

  const onSwipeCompleted = useCallback((direction: string): void => {
    const { onSwipeLeft, onSwipeRight, data } = props;

    position.setValue({ x: 0, y: 0 });

    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();

    let currentIndex = 0;

    setCardIndex((idx) => {
      currentIndex = idx;
      return idx + 1;
    });

    if (direction === 'right') {
      onSwipeRight && onSwipeRight(data[currentIndex]);
    } else {
      onSwipeLeft && onSwipeLeft(data[currentIndex]);
    }
  }, []);

  const forceSwipe = (direction: string): void => {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => onSwipeCompleted(direction));
  };

  const _panResponder = useMemo(
    () =>
      PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          position.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (evt, gesture) => {
          if (gesture.dx > SWIPE_THRESHOLD) {
            forceSwipe('right');
          } else if (gesture.dx < -SWIPE_THRESHOLD) {
            forceSwipe('left');
          } else {
            resetPosition();
          }
        },
      }),
    [],
  );

  const getCardStyle = (): {} => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-45deg', '0deg', '45deg'],
    });

    const rotateStyle = props.rotate ? { transform: [{ rotate }] } : {};

    return {
      ...position.getLayout(),
      ...rotateStyle,
    };
  };

  const _renderCards = (): ReactElement | (ReactElement|null)[] => {
    if (!props.data || cardIndex >= props.data.length) {
      return props.renderNoMoreCards();
    }

    const dataSet = props.data.map((item, idx) => {
      if (idx < cardIndex) return null;
      if (idx === cardIndex) {
        return (
          <Animated.View
            key={`card__${idx}`}
            style={[
              getCardStyle(),
              {
                position: 'absolute',
                top: 40,
                width: SCREEN_WIDTH,
                zIndex: 99,
              },
            ]}
            {..._panResponder.panHandlers}
          >
            {props.renderCards(item)}
          </Animated.View>
        );
      }

      const behindHeight =
        props.stackSize && idx - cardIndex < props.stackSize
          ? 40 + 15 * (idx - cardIndex)
          : 55;

      return (
        <Animated.View
          key={`card__${idx}`}
          style={[
            {
              position: 'absolute',
              width: SCREEN_WIDTH,
              top: behindHeight,
              zIndex: 5,
            },
          ]}
        >
          {props.renderCards(item)}
        </Animated.View>
      );
    });

    return Platform.OS === 'android' ? dataSet : dataSet.reverse();
  };

  const handleCancel = (): void => {
    if (cardIndex > 0 && props.onCancel) {
      setCardIndex((index) => index - 1);
      props.onCancel();
    }
  };

  return (
    <Container>
      {cardIndex > 0 && props.onCancel && (
        <CancelButton title="Undo" onPress={handleCancel} />
      )}
      {_renderCards()}
    </Container>
  );
}

const _renderNoMoreCards = (): ReactElement => (
  <NoCard>
    <Text>No more cards</Text>
  </NoCard>
);

TinderCard.defaultProps = {
  onSwipeRight: (): void => {},
  onSwipeLeft: (): void => {},
  onCancel: (): void => {},
  renderNoMoreCards: _renderNoMoreCards,
  rotate: false,
  stackSize: 3,
};

export default TinderCard;
