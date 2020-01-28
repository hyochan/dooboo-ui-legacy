import * as Select from './';

import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLOR, ITEM_HEIGHT, LIST_MAX_HEIGHT, LIST_WIDTH } from './constants';
import React, { useRef } from 'react';

import styled from 'styled-components/native';

export enum DIALOG_TEST_ID {
  LIST_WRAPPER = 'dialog-list-wrapper',
  TITLE_WRAPPER = 'dialog-title-wrapper',
  TITLE = 'dialog-title',
  LIST = 'dialog-list',
  ITEM = 'dialog-item',
}

interface Item {
  value: string | null;
  label?: string;
}

interface Props extends Omit<Select.Props, 'items'> {
  close: () => void;
  openValue: Animated.Value;
  items: Item[];
}

type ItemLayout = {
  length: number;
  offset: number;
  index: number;
};

const ItemListWrapper = styled(Animated.View)`
  width: ${LIST_WIDTH};
  background-color: ${COLOR.WHITE};
  box-shadow: 3px 2px 10px ${COLOR.GRAY75};
  border-radius: 3px;
  padding: 5px;
`;

const TitleWrapper = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${COLOR.GRAY59};
`;

const Title = styled.Text`
  margin: 12px 20px;
  font-size: 18;
  font-weight: bold;
`;

const ItemList = styled(FlatList as new () => FlatList<Item>)`
  max-height: ${LIST_MAX_HEIGHT};
  background-color: ${COLOR.WHITE};
`;

const ItemView = styled(Animated.View)`
  height: ${ITEM_HEIGHT};
  padding: 0 14px;
  justify-content: center;
`;

const ItemText = styled(Animated.Text)`
  font-size: 14px;
  color: ${COLOR.BLACK};
`;

function Dialog(props: Props): React.ReactElement {
  const {
    testID,
    title,
    items,
    showsVerticalScrollIndicator,
    selectedValue,
    onSelect,
    listStyle,
    listTitleStyle,
    itemViewStyle,
    selectedItemViewStyle,
    itemTextStyle,
    selectedItemTextStyle,
    close,
    openValue,
    onItemPressIn,
    onItemPressOut,
  } = props;
  const flatListEl = useRef<FlatList<Item>>(null);
  const itemHeight = itemViewStyle
    ? itemViewStyle.height || ITEM_HEIGHT
    : ITEM_HEIGHT;

  let position = items.findIndex((item) => item.value === selectedValue);
  if (position === -1) position = 0;

  const getItemLayout = (data: Item[] | null, index: number): ItemLayout => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<Item>): React.ReactElement => {
    const isSelected = selectedValue === item.value;
    const pressValue = new Animated.Value(0);
    const onPress = (): void => {
      if (onSelect) onSelect(item, index);
      close();
    };
    const onPressIn = (): void => {
      Animated.timing(pressValue, {
        toValue: 1,
        duration: 200,
      }).start();
      if (onItemPressIn) onItemPressIn();
    };
    const onPressOut = (): void => {
      Animated.timing(pressValue, {
        toValue: 0,
        duration: 200,
      }).start();
      if (onItemPressOut) onItemPressOut();
    };

    const animatedBackgroundColor = pressValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        isSelected ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0)',
        'rgba(0, 0, 0, 0.15)',
      ],
    });

    return (
      <TouchableWithoutFeedback
        testID={`${testID}-${DIALOG_TEST_ID.ITEM}-${index}`}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <ItemView
          style={[
            { backgroundColor: animatedBackgroundColor },
            isSelected ? selectedItemViewStyle : itemViewStyle,
          ]}
        >
          <ItemText style={isSelected ? selectedItemTextStyle : itemTextStyle}>
            {item.label || item.value}
          </ItemText>
        </ItemView>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <ItemListWrapper
      testID={`${testID}-${DIALOG_TEST_ID.LIST_WRAPPER}`}
      style={[{ opacity: openValue }, listStyle]}
    >
      {title && (
        <TitleWrapper testID={`${testID}-${DIALOG_TEST_ID.TITLE_WRAPPER}`}>
          <Title
            testID={`${testID}-${DIALOG_TEST_ID.TITLE}`}
            style={listTitleStyle}
          >
            {title}
          </Title>
        </TitleWrapper>
      )}
      <ItemList
        ref={flatListEl}
        testID={`${testID}-${DIALOG_TEST_ID.LIST}`}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        keyExtractor={(item: Item): string => item.value || 'null'}
        data={items}
        renderItem={renderItem}
        initialScrollIndex={position}
        getItemLayout={getItemLayout}
      />
    </ItemListWrapper>
  );
}

export default Dialog;
