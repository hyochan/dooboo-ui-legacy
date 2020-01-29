import * as Select from './';

import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import {
  COLOR,
  ITEM_HEIGHT,
  LIST_MAX_HEIGHT,
  ThemeEnum,
  WINDOW_HEIGHT,
} from './constants';
import React, { useMemo } from 'react';

import styled from 'styled-components/native';

type ItemLayout = {
  length: number;
  offset: number;
  index: number;
};

export enum DROPDOWN_TEST_ID {
  LIST_WRAPPER = 'list-wrapper',
  LIST = 'list',
  ITEM = 'item',
}

interface Item {
  value: string | null;
  label?: string;
}

interface Props extends Omit<Select.Props, 'items'> {
  listOpen: Select.ListOpen;
  close: () => void;
  openValue: Animated.Value;
  items: Item[];
}

const ItemListWrapper = styled(Animated.View)`
  max-height: ${LIST_MAX_HEIGHT};
  border-radius: 3px;
`;

const ItemList = styled(FlatList as new () => FlatList<Item>)`
  background-color: ${COLOR.WHITE};
`;

const ItemView = styled(Animated.View)`
  height: ${ITEM_HEIGHT};
  padding: 6px;
  justify-content: center;
`;

const ItemText = styled(Animated.Text)`
  font-size: 14px;
  color: ${COLOR.BLACK};
`;

const createListWrapperStyle = ({
  theme,
  listStyle,
  listOpen,
  itemHeight,
  itemCount,
  openValue,
  position,
}): ViewStyle => {
  const listMaxHeight = (listStyle && listStyle.height) || LIST_MAX_HEIGHT;
  const listHeight = Math.min(itemHeight * itemCount, listMaxHeight);

  const listWrapperStyle: ViewStyle = {
    position: 'absolute',
    left: listOpen.x,
    width: listOpen.width,
    height: listHeight,
    maxHeight: listMaxHeight,
    backgroundColor: COLOR.WHITE,
    opacity: openValue,
  };

  if (WINDOW_HEIGHT > listHeight + listOpen.y - position * itemHeight) {
    listWrapperStyle.top = listOpen.y - position * itemHeight;
    if (listWrapperStyle.top < 30) listWrapperStyle.top = 30;
  } else {
    listWrapperStyle.bottom = 30;
  }

  if (listStyle) {
    if (listStyle.bottom !== undefined) delete listWrapperStyle.top;
    if (listStyle.right !== undefined) delete listWrapperStyle.left;
    return { ...listWrapperStyle, ...listStyle };
  } else {
    let themeStyle;
    switch (theme) {
      case ThemeEnum.box: {
        themeStyle = {
          borderColor: COLOR.GRAY59,
          borderWidth: 1,
        };
        break;
      }
      default: {
        themeStyle = {
          shadowColor:
            theme === ThemeEnum.none ? COLOR.DODGERBLUE : COLOR.GRAY75,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.5,
          shadowRadius: 5,
          elevation: 10,
        };
        break;
      }
    }
    return { ...listWrapperStyle, ...themeStyle };
  }
};

function DropDown(props: Props): React.ReactElement {
  const {
    theme,
    items,
    listOpen,
    testID,
    onSelect,
    listStyle,
    itemViewStyle,
    itemTextStyle,
    selectedItemViewStyle,
    selectedItemTextStyle,
    selectedValue,
    close,
    openValue,
    showsVerticalScrollIndicator,
    onItemPressIn,
    onItemPressOut,
  } = props;

  const itemHeight = (itemViewStyle && itemViewStyle.height) || ITEM_HEIGHT;
  const itemCount = useMemo(() => items.length, []);

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
        testID={`${testID}-${DROPDOWN_TEST_ID.ITEM}-${index}`}
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

  const listWrapperStyle = createListWrapperStyle({
    theme,
    listStyle,
    listOpen,
    itemHeight,
    itemCount,
    openValue,
    position,
  });

  return (
    <ItemListWrapper
      style={listWrapperStyle}
      testID={`${testID}-${DROPDOWN_TEST_ID.LIST}`}
    >
      <ItemList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item: Item): string => item.value || 'null'}
        initialScrollIndex={position}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      />
    </ItemListWrapper>
  );
}

export default DropDown;
