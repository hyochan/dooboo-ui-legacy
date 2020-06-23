import { Animated, LayoutChangeEvent, Text } from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';

const TitleContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  background-color: #141414;
  width: 388px;
  height: 50px;
`;

const BodiesContainer = styled.View`
  display: flex;
  flex-direction: colomn;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledItem = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px;
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
  itemData: ItemType;
  isAnimated?: boolean;
  collapsedWhenRedered: boolean;
  animDuration?: number;
  activeOpacity?: number;
}

const AccordionItem: FC<Props> = (props) => {
  const {
    itemData,
    isAnimated,
    collapsedWhenRedered,
    animDuration,
    activeOpacity,
  } = props;

  const animValue = useRef(new Animated.Value(1000)).current;

  const [itemVisibleState, setItemVisibleState] = useState<ItemVisibleState>({
    value: collapsedWhenRedered,
  });

  const [itemTitleHeight, setItemTitleHeight] = useState<LayoutProps>({
    value: 0,
    mounted: false,
  });

  const [itemBodyHeight, setItemBodyHeight] = useState<LayoutProps>({
    value: 0,
    mounted: false,
  });

  const handleTitleLayout = (e: LayoutChangeEvent): void => {
    if (itemTitleHeight.mounted) return;
    const { height } = e.nativeEvent.layout;
    setItemTitleHeight({
      value: height,
      mounted: true,
    });
  };

  const handleBodyLayout = (e: LayoutChangeEvent): void => {
    if (itemBodyHeight.mounted) return;
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
    const targetValue = itemVisibleState.value
      ? itemTitleHeight.value + itemBodyHeight.value
      : itemTitleHeight.value;

    if (isAnimated) {
      Animated.timing(animValue, {
        toValue: targetValue,
        duration: animDuration || 300,
      }).start();
      return;
    }
    animValue.setValue(targetValue);
  }, [itemVisibleState.value]);

  return (
    <Animated.View
      style={{
        height: animValue,
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}>
      <TitleContainer
        onLayout={handleTitleLayout}
        onPress={handleVisibleState}
        activeOpacity={activeOpacity}
      >
        <Text style={{ fontWeight: 'bold', color: '#FFFFFF' }}>
          {itemData.itemTitle}
        </Text>
      </TitleContainer>

      <BodiesContainer onLayout={handleBodyLayout}>
        {itemData.itemBodies.map((itemBody, itemBodyKey) => {
          return (
            <StyledItem key={itemBodyKey}>
              <Text style={{ fontWeight: 'bold', color: '#141414' }}>
                {itemBody}
              </Text>
            </StyledItem>);
        })}
      </BodiesContainer>
    </Animated.View>
  );
};

export default AccordionItem;
