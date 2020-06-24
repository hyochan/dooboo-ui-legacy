import { Animated, LayoutChangeEvent, Text } from 'react-native';
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

const BodyContainer = styled.View`
  color: #000;
`;

const StyledItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width : 100%;
  padding-left: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
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

  const [arrowPosition, setArrowPosition] = useState('down');

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
    if (itemVisibleState.value) {
      setArrowPosition('up');
    } else setArrowPosition('down');
  }, [itemVisibleState.value]);

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
        activeOpacity={activeOpacity}>
        <Text style={{ fontWeight: 'bold', color: '#FFFFFF' }}>
          {itemData.itemTitle}
        </Text>
        <Arrow arrowPosition={arrowPosition}/>
      </TitleContainer>

      <BodyContainer onLayout={handleBodyLayout}>
        {itemData.itemBodies.map((itemBody, itemBodyKey) => {
          return (
            <StyledItem key={itemBodyKey}>
              <Text style={{ fontWeight: 'bold', color: '#141414' }}>
                {itemBody}
              </Text>
            </StyledItem>
          );
        })}
      </BodyContainer>
    </Animated.View>
  );
};

export default AccordionItem;
