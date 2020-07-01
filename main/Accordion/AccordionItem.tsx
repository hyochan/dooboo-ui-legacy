import {
  Animated,
  LayoutChangeEvent,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: transparent;
  overflow: hidden;
  width: 300px;
`;

const TitleContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #141414;
  height: 50px;
  border-bottom-width: 1px;
  border-bottom-color: white;
  z-index: 10;
`;

const ToggleIndicator = styled.View`
  position: absolute;
  right: 20px;
`;

const StyledItem = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 20px 40px;
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
`;

enum DirectionIndicator {
  'UP' = 'up',
  'DOWN' = 'down',
}

type titleType = {
  leftElement?: React.ReactElement;
  name: React.ReactElement;
  rightElement?: React.ReactElement;
};

type bodyType = {
  leftElement?: React.ReactElement;
  name: React.ReactElement;
  rightElement?: React.ReactElement;
};

type datumType = {
  title: titleType;
  bodies: Array<bodyType>;
};
interface Props {
  testID: string;
  datum: datumType;
  shouldAnimate?: boolean;
  collapseOnStart: boolean;
  animDuration?: number;
  activeOpacity?: number;
  toggleElement?: React.ReactElement;
  accordionItemStyle?: ViewStyle;
  titleStyle?: ViewStyle;
  bodyStyle?: ViewStyle;
}

const AccordionItem: FC<Props> = (props) => {
  const {
    testID,
    datum,
    shouldAnimate,
    collapseOnStart,
    animDuration,
    activeOpacity,
    toggleElement,
    accordionItemStyle,
    titleStyle,
    bodyStyle,
  } = props;

  const animValue = useRef(new Animated.Value(0)).current;

  const [isItemVisible, setItemVisible] = useState<boolean>(collapseOnStart);
  const [isBodyMounted, setBodyMounted] = useState<boolean>(false);

  const [bodyHeight, setBodyHeight] = useState<number>(1);

  const [directionIndicator, setDirectionIndicator] = useState(DirectionIndicator.DOWN);

  const handleBodyLayout = (e: LayoutChangeEvent): void => {
    if (isBodyMounted) return;
    const { height } = e.nativeEvent.layout;
    setBodyMounted(true);
    setBodyHeight(height);
  };

  const handleVisibleState = (): void => {
    setItemVisible(!isItemVisible);
  };

  useCallback((): void => {
    if (isBodyMounted) {
      animValue.setValue(isItemVisible ? bodyHeight : 0);
    }
  }, [isBodyMounted]);

  useEffect((): void => {
    if (isItemVisible) {
      setDirectionIndicator(DirectionIndicator.UP);
    } else setDirectionIndicator(DirectionIndicator.DOWN);
  }, [isItemVisible]);

  useEffect((): void => {
    const targetValue = isItemVisible ? 1 : 0;
    if (shouldAnimate) {
      Animated.timing(animValue, {
        toValue: targetValue,
        duration: animDuration || 300,
        useNativeDriver: true,
      }).start();
      return;
    }
    animValue.setValue(targetValue);
  }, [isItemVisible]);

  return (
    <Container
      style={accordionItemStyle}
    >
      <TitleContainer
        testID={`title_${testID}`}
        onPress={handleVisibleState}
        activeOpacity={activeOpacity}
        style={titleStyle}
      >
        {datum.title.leftElement && datum.title.leftElement}
        {datum.title.name}
        {datum.title.rightElement ? (
          datum.title.rightElement
        ) : (
          <ToggleIndicator
            style={{
              transform: [
                directionIndicator === 'up'
                  ? { rotate: '180deg' }
                  : { rotate: '0deg' },
              ],
            }}>
            {toggleElement || null}
          </ToggleIndicator>
        )}
      </TitleContainer>
      <Animated.View
        testID={`body_${testID}`}
        style={{
          height: !isBodyMounted
            ? undefined
            : !isItemVisible
              ? bodyHeight
              : 0,
          transform: [
            {
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -bodyHeight],
              }),
            },
          ],
        }}
        onLayout={handleBodyLayout}
      >
        {datum.bodies.map((body, bodyKey) => {
          return (
            <StyledItem key={bodyKey} style={bodyStyle}>
              {body.leftElement && body.leftElement}
              {body.name}
              {body.rightElement && body.rightElement}
            </StyledItem>
          );
        })}
      </Animated.View>
    </Container>
  );
};

export default AccordionItem;
