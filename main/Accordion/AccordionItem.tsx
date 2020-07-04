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

let layoutHeight = 0;

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

  const [opened, setItemVisible] = useState<boolean>(collapseOnStart);
  const [bodyMounted, setBodyMounted] = useState<boolean>(false);

  const [bodyHeight, setBodyHeight] = useState<number>(1);

  const [directionIndicator, setDirectionIndicator] = useState(DirectionIndicator.DOWN);

  const handleBodyLayout = (e: LayoutChangeEvent): void => {
    if (bodyMounted) return;
    const { height } = e.nativeEvent.layout;
    layoutHeight = height;
    setBodyMounted(true);
    setBodyHeight(height);
  };

  const handleVisibleState = (): void => {
    setItemVisible(!opened);
  };

  useEffect((): void => {
    if (bodyMounted) {
      animValue.setValue(opened ? layoutHeight : 0);
    }
  }, [bodyMounted]);

  useEffect((): void => {
    if (bodyHeight === layoutHeight) {
      Animated.timing(animValue, {
        toValue: 0,
        duration: animDuration || 300,
        useNativeDriver: true,
        delay: 10,
      }).start();

      setDirectionIndicator(DirectionIndicator.UP);
    }
  }, [bodyHeight]);

  useEffect((): void => {
    if (shouldAnimate) {
      if (!opened) {
        setBodyHeight(layoutHeight);
        return;
      }

      // setBodyHeight(0);
      Animated.timing(animValue, {
        toValue: 1,
        duration: animDuration || 300,
        useNativeDriver: true,
      }).start(() => {
        setBodyHeight(0);
      });

      setDirectionIndicator(DirectionIndicator.DOWN);
    } else {
      const targetValue = opened ? 1 : 0;
      animValue.setValue(targetValue);

      if (opened) {
        setDirectionIndicator(DirectionIndicator.UP);
        return;
      }

      setDirectionIndicator(DirectionIndicator.DOWN);
    }
  }, [opened]);

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
          height: !bodyMounted
            ? undefined
            : bodyHeight,
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
