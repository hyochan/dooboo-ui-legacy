import * as Select from './index';

import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';
import { COLOR, ITEM_HEIGHT, PICKER_LIST_HEIGHT, ThemeEnum } from './constants';
import React, { useCallback, useRef } from 'react';

import styled from 'styled-components/native';

export const ERR_MSG_ITEMS_REQUIRED = `items is required. 
Please put items of the form [{value: string, label?: string}, ...].`;

export enum PICKER_TEST_ID {
  MODAL = 'modal',
  CLOSE = 'close',
  LIST_WRAPPER = 'list-wrapper',
  LIST = 'list',
  ITEM = 'item',
}

/**
 * interfaces
 */
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

type ItemLayout = {
  length: number;
  offset: number;
  index: number;
};

/**
 * styled components
 */

const ItemListWrapper = styled(Animated.View)`
  height: 240px;
  width: 200px;
  border-radius: 1px;
`;

const ItemList = styled(FlatList as new () => FlatList<Item>)`
  width: 100%;
  height: 100%;
`;

const ItemView = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

const ItemText = styled.Text`
  font-size: 14px;
`;

const EmptyView = styled.View`
  height: 80px;
  width: 100%;
`;

const Line = styled.View`
  position: absolute;
  height: 1px;
  width: 100%;
  background-color: grey;
`;

const getListStyle = ({
  theme,
  itemListStyle,
  listOpen,
  itemHeight,
  openValue,
}): ViewStyle => {
  const listStyle: ViewStyle = {
    position: 'absolute',
    top: listOpen.y - itemHeight * 2.5,
    left: listOpen.x,
    width: listOpen.width,
    backgroundColor: COLOR.WHITE,
    opacity: openValue,
  };

  if (itemListStyle) {
    if (itemListStyle.bottom !== undefined) delete listStyle.top;
    if (itemListStyle.right !== undefined) delete listStyle.left;
    return { ...listStyle, ...itemListStyle };
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
    return { ...listStyle, ...themeStyle };
  }
};

function Picker({
  listOpen,
  onValueChange,
  selectedValue,
  items,
  itemListStyle,
  itemViewStyle,
  itemTextStyle,
  showsVerticalScrollIndicator,
  testID,
  theme,
  close,
  openValue,
}: Props): React.ReactElement {
  const flatListEl = useRef<FlatList<Item>>(null);

  // constants
  const itemHeight = (itemViewStyle && itemViewStyle.height) || ITEM_HEIGHT;
  const itemListHeight =
    (itemListStyle && itemListStyle.height) || PICKER_LIST_HEIGHT;
  const itemThreshold = itemHeight / 2;
  let position = items.findIndex((item) => item.value === selectedValue);
  if (position === -1) position = 0;
  let newPosition = position;
  let isScrolling = false;

  const emptyViewHeight = (itemListHeight - itemHeight) / 2;
  console.log(itemListHeight, itemHeight, emptyViewHeight);

  const scrollToOffset = ({ offset }): void => {
    if (flatListEl && flatListEl.current) {
      flatListEl.current.scrollToOffset({ offset });
    }
  };

  const scrollToPosition = (position): void => {
    const offset = position * itemHeight;
    scrollToOffset({ offset });
  };

  const renderItem = ({
    item: { value, label },
    index,
  }: ListRenderItemInfo<Item>): React.ReactElement => {
    const onPress = (): void => {
      if (value === selectedValue) close();
      else scrollToPosition(index);
    };
    return (
      <ItemView
        testID={`${testID}-${PICKER_TEST_ID.ITEM}-${index}`}
        style={itemViewStyle}
        onPress={onPress}
      >
        <ItemText style={itemTextStyle}>{label || value}</ItemText>
      </ItemView>
    );
  };

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>): void => {
      const {
        nativeEvent: {
          contentOffset: { y },
        },
      } = e;
      newPosition = Math.floor(y / itemHeight);
      if (y % itemHeight > itemThreshold) newPosition++;
      if (newPosition < 0) newPosition = 0;
      else if (newPosition >= items.length) newPosition = items.length - 1;
      if (position !== newPosition) {
        position = newPosition;
        if (onValueChange) onValueChange(items[position], position);
      }
    },
    [],
  );

  const onScrollBeginDrag = useCallback((): void => {
    isScrolling = true;
  }, []);

  const onScrollEndDrag = useCallback((): void => {
    isScrolling = false;
    setTimeout(() => {
      if (!isScrolling) scrollToPosition(position);
    }, 0);
  }, []);

  const onMomentumScrollBegin = useCallback((): void => {
    isScrolling = true;
  }, []);

  const onMomentumScrollEnd = useCallback((): void => {
    if (!isScrolling) return;
    isScrolling = false;
    setTimeout(() => {
      if (!isScrolling) scrollToPosition(position);
    }, 0);
  }, []);

  const getItemLayout = (data: Item[] | null, index: number): ItemLayout => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  const listStyle = getListStyle({
    theme,
    itemListStyle,
    listOpen,
    itemHeight,
    openValue,
  });

  return (
    <ItemListWrapper
      testID={`${testID}-${PICKER_TEST_ID.LIST_WRAPPER}`}
      style={listStyle}
    >
      <ItemList
        ref={flatListEl}
        testID={`${testID}-${PICKER_TEST_ID.LIST}`}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        ListHeaderComponent={<EmptyView style={{ height: emptyViewHeight }} />}
        ListFooterComponent={<EmptyView style={{ height: emptyViewHeight }} />}
        keyExtractor={(item: Item): string => item.value || 'null'}
        data={items}
        renderItem={renderItem}
        onScroll={onScroll}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        initialScrollIndex={position}
        getItemLayout={getItemLayout}
      />
      <Line style={{ top: emptyViewHeight }} />
      <Line style={{ bottom: emptyViewHeight }} />
    </ItemListWrapper>
  );
}

export default Picker;
