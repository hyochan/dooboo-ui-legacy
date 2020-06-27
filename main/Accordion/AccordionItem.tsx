import {
  Animated,
  LayoutChangeEvent,
  Platform,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';

import Arrow from './Arrow';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: transparent;
  overflow: hidden;
  width: 300px;
`;

const TitleContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #141414;
  padding-left: 40px;
  padding-right: 20px;
  height: 50px;
  border-bottom-width: 1px;
  border-bottom-color: white;
  z-index: 10;
`;

const StyledItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 20px 40px;
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
`;

type ItemType = {
  itemTitle: string;
  itemBodies: Array<string>;
};

interface Props {
  testID: string;
  itemData: ItemType;
  shouldAnimate?: boolean;
  collapseOnStart: boolean;
  animDuration?: number;
  activeOpacity?: number;
  titleStyle?: ViewStyle;
  itemStyle?: ViewStyle;
  itemTitleLeft?: React.ReactElement;
  itemBodyLeft?: React.ReactElement;
}

const AccordionItem: FC<Props> = (props) => {
  const {
    testID,
    itemData,
    shouldAnimate,
    collapseOnStart,
    animDuration,
    activeOpacity,
    titleStyle,
    itemStyle,
    itemTitleLeft,
    itemBodyLeft,
  } = props;

  const animValue = useRef(new Animated.Value(1000)).current;

  const [isItemVisible, setItemVisible] = useState<boolean>(collapseOnStart);
  const [isBodyMounted, setBodyMounted] = useState<boolean>(false);

  const [bodyHeight, setBodyHeight] = useState<number>(0);

  const [arrowDirection, setarrowDirection] = useState('down');

  const handleBodyLayout = (e: LayoutChangeEvent): void => {
    if (isBodyMounted && Platform.OS === 'ios') return;
    const { height } = e.nativeEvent.layout;

    setBodyMounted(true);
    setBodyHeight(height);
  };

  const handleVisibleState = (): void => {
    setItemVisible(!isItemVisible);
  };

  useEffect((): void => {
    if (isBodyMounted) {
      animValue.setValue(
        isItemVisible
          ? bodyHeight
          : 0,
      );
    }
  }, [isBodyMounted]);

  useEffect((): void => {
    if (isItemVisible) {
      setarrowDirection('up');
    } else setarrowDirection('down');
  }, [isItemVisible]);

  useEffect((): void => {
    const targetValue = isItemVisible
      ? 1
      : 0;
    if (shouldAnimate) {
      Animated.timing(animValue, {
        useNativeDriver: true,
        toValue: targetValue,
        duration: animDuration || 300,
      }).start();
      return;
    }
    animValue.setValue(targetValue);
  }, [isItemVisible]);

  useEffect(() => {}, [itemBodyLeft]);

  return (
    <Container>
      <TitleContainer
        testID={`itemTitle_${testID}`}
        onPress={handleVisibleState}
        activeOpacity={activeOpacity}
        style={titleStyle}
      >
        <View>{itemTitleLeft}</View>
        <Text style={{ fontWeight: 'bold', color: '#FFFFFF' }}>
          {itemData.itemTitle}
        </Text>
        <Arrow arrowDirection={arrowDirection} />
      </TitleContainer>
      <View
        style={{
          height: !isBodyMounted
            ? undefined
            : !isItemVisible
              ? bodyHeight
              : 0,
        }}
        onLayout={handleBodyLayout}
      >
        <Animated.View
          testID={`itemBody_${testID}`}
          style={{
            transform: [{
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -bodyHeight],
              }),
            }],
          }}
        >
          {itemData.itemBodies.map((itemBody, itemBodyKey) => {
            return (
              <StyledItem key={itemBodyKey} style={itemStyle}>
                <View>{itemBodyLeft}</View>
                <Text style={{ fontWeight: 'bold', color: '#141414' }}>
                  {itemBody}
                </Text>
              </StyledItem>
            );
          })}
        </Animated.View>
      </View>
    </Container>
  );
};

export default AccordionItem;
