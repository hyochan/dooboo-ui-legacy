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

const TitleContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #141414;
  padding-left: 40px;
  padding-right: 20px;
  width: 388px;
  height: 50px;
  border-bottom-width: 1px;
  border-bottom-color: white;
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

type LayoutProps = {
  value: number;
  mounted: boolean;
};

type ItemVisibleState = {
  value: boolean;
};

interface Props {
  testID: string;
  itemData: ItemType;
  isAnimated?: boolean;
  collapsedWhenRendered: boolean;
  animDuration?: number;
  activeOpacity?: number;
  customTitleStyle?: ViewStyle;
  customItemStyle?: ViewStyle;
  titleElementLeft?: React.ReactElement;
  itemBodyElementLeft?: React.ReactElement;
}

const AccordionItem: FC<Props> = (props) => {
  const {
    testID,
    itemData,
    isAnimated,
    collapsedWhenRendered,
    animDuration,
    activeOpacity,
    customTitleStyle,
    customItemStyle,
    titleElementLeft,
    itemBodyElementLeft,
  } = props;

  const animValue = useRef(new Animated.Value(1000)).current;

  const [itemVisibleState, setItemVisibleState] = useState<ItemVisibleState>({
    value: collapsedWhenRendered,
  });

  const [itemTitleHeight, setItemTitleHeight] = useState<LayoutProps>({
    value: 0,
    mounted: false,
  });

  const [itemBodyHeight, setItemBodyHeight] = useState<LayoutProps>({
    value: 0,
    mounted: false,
  });

  const [arrowDirection, setarrowDirection] = useState('down');

  const handleTitleLayout = (e: LayoutChangeEvent): void => {
    if (itemTitleHeight.mounted && Platform.OS === 'ios') return;
    const { height } = e.nativeEvent.layout;
    setItemTitleHeight({
      value: height,
      mounted: true,
    });
  };

  const handleBodyLayout = (e: LayoutChangeEvent): void => {
    if (itemBodyHeight.mounted && Platform.OS === 'ios') return;
    const { height } = e.nativeEvent.layout;
    setItemBodyHeight({
      value: height,
      mounted: true,
    });
  };

  const handleVisibleState = (): void => {
    setItemVisibleState({
      value: !itemVisibleState.value,
    });
  };

  useEffect((): void => {
    if (itemTitleHeight.mounted && itemBodyHeight.mounted) {
      animValue.setValue(
        itemVisibleState.value
          ? itemTitleHeight.value + itemBodyHeight.value
          : itemTitleHeight.value,
      );
    }
  }, [itemTitleHeight.mounted, itemBodyHeight.mounted]);

  useEffect((): void => {
    if (itemVisibleState.value) {
      setarrowDirection('up');
    } else setarrowDirection('down');
  }, [itemVisibleState.value]);

  useEffect((): void => {
    const targetValue = itemVisibleState.value
      ? itemTitleHeight.value + itemBodyHeight.value
      : itemTitleHeight.value;

    if (isAnimated) {
      Animated.timing(animValue, {
        toValue: targetValue,
        duration: animDuration || 300,
        useNativeDriver: true,
      }).start();
      return;
    }
    animValue.setValue(targetValue);
  }, [itemVisibleState.value]);

  useEffect(() => {}, [itemBodyElementLeft]);

  return (
    <Animated.View
      style={{
        transform: [{
          translateY: animValue,
        }],
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}>
      <TitleContainer
        testID={`itemTitle_${testID}`}
        onLayout={handleTitleLayout}
        onPress={handleVisibleState}
        activeOpacity={activeOpacity}
        style={customTitleStyle}>
        <View>{titleElementLeft}</View>
        <Text style={{ fontWeight: 'bold', color: '#FFFFFF' }}>
          {itemData.itemTitle}
        </Text>
        <Arrow arrowDirection={arrowDirection} />
      </TitleContainer>

      <View testID={`itemBody_${testID}`} onLayout={handleBodyLayout}>
        {itemData.itemBodies.map((itemBody, itemBodyKey) => {
          return (
            <StyledItem key={itemBodyKey} style={customItemStyle}>
              <View>{itemBodyElementLeft}</View>
              <Text style={{ fontWeight: 'bold', color: '#141414' }}>
                {itemBody}
              </Text>
            </StyledItem>
          );
        })}
      </View>
    </Animated.View>
  );
};

export default AccordionItem;
