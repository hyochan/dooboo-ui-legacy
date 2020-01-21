import {
  Animated,
  Dimensions,
  LayoutAnimation,
  PanResponder,
  Text,
  UIManager,
  View,
} from 'react-native';
import React, {
  ReactElement,
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
  LEFT = 'left'
}

interface DataProps {
  [key: string]: any;
}

interface Props {
  testID?: string;
  onSwipeRight?: (item: DataProps) => void;
  onSwipeLeft?: (item: DataProps) => void;
  onCancel?: () => void;
  data: DataProps[];
  renderCards: (item: DataProps, type?: number) => ReactElement;
  renderNoMoreCards: () => ReactElement;
  renderCardLabel?: (type: number) => ReactElement;
  rotate?: boolean;
  stackSize?: number;
}

const Container = styled.View`
  width: ${SCREEN_WIDTH};
  align-items: center;
`;

const TextArea = styled.View`
  width: ${SCREEN_WIDTH};
  height: 100%;
  z-index: 99;
  position: absolute;
  top: 20;
`;

const NoCard = styled.View`
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

function TinderCard(props: Props, ref): ReactElement {
  const [cardIndex, setCardIndex] = useState(0);
  const [type, setType] = useState(0);
  const position = useMemo(() => new Animated.ValueXY(), []);

  const resetPosition = (): void => {
    setType(0);
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
    }).start();
  };

  const onSwipeCompleted = useCallback((direction: TinderCardDirection): void => {
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

    if (direction === TinderCardDirection.RIGHT) {
      onSwipeRight && onSwipeRight(data[currentIndex]);
    } else {
      onSwipeLeft && onSwipeLeft(data[currentIndex]);
    }
  }, []);

  const forceSwipe = (direction: TinderCardDirection): void => {
    const x = direction === TinderCardDirection.RIGHT ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => {
      onSwipeCompleted(direction);
      setType(0);
    });
  };

  const _panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          if (gestureState.dx > 0) {
            setType(2);
          } else if (gestureState.dx < 0) {
            setType(1);
          }
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

  const _renderCards = (): ReactElement | (ReactElement | null)[] => {
    if (!props.data || cardIndex >= props.data.length) {
      if (props.renderNoMoreCards) {
        return props.renderNoMoreCards();
      } else {
        return <View/>;
      }
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
                top: 0,
                width: SCREEN_WIDTH,
                zIndex: 99,
              },
            ]}
            {..._panResponder.panHandlers}>
            {props.renderCards(item, type)}
            <TextArea>
              {props.renderCardLabel && props.renderCardLabel(type)}
            </TextArea>
          </Animated.View>
        );
      }

      const indexGap = idx - cardIndex;
      const stackSize = props.stackSize || 3;
      const behindHeight =
        indexGap <= stackSize ? 10 * indexGap : 10 * stackSize;

      return (
        <Animated.View
          key={`card__${idx}`}
          style={[
            {
              position: 'absolute',
              width: SCREEN_WIDTH - 10 * indexGap,
              top: behindHeight,
              zIndex: 5,
            },
          ]}>
          {props.renderCards(item)}
        </Animated.View>
      );
    });
    return dataSet.reverse();
  };

  const handleCancel = (): void => {
    if (cardIndex > 0 && props.onCancel) {
      setCardIndex((index) => index - 1);
      props.onCancel();
    }
  };

  useImperativeHandle(ref, () => ({
    forceSwipe,
    handleCancel,
  }));

  return (
    <Container>
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

export default forwardRef(TinderCard);
