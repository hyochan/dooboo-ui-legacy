import * as Select from './index';

import {
  FlatList,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewStyle,
} from 'react-native';
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
  label?: string;
  value: string;
}

interface Props extends Partial<Select.Props> {
  listOpen: Select.ListOpen;
  setListOpen: (listOpen: Select.ListOpen) => void;
}

type ItemLayout = {
  length: number;
  offset: number;
  index: number;
};

/**
 * constants
 */
const ITEM_HEIGHT = 40;
const ITEM_LIST_HEIGHT = 240;

/**
 * styled components
 */
const CloseTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #efefef55;
`;

const ItemListContainer = styled.View`
  height: 240px;
  width: 200px;
  border-radius: 1px;
`;

const ItemFlatList = styled(FlatList as new () => FlatList<Item>)`
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
}): ViewStyle => {
  const listStyle: ViewStyle = {
    position: 'absolute',
    top: listOpen.y - itemHeight * 2.5,
    left: listOpen.x,
    width: listOpen.width,
    backgroundColor: Select.COLOR.WHITE,
  };

  if (itemListStyle) {
    if (itemListStyle.bottom !== undefined) delete listStyle.top;
    if (itemListStyle.right !== undefined) delete listStyle.left;
    return { ...listStyle, ...itemListStyle };
  } else {
    let themeStyle;
    switch (theme) {
      case Select.ThemeEnum.none: {
        themeStyle = {
          shadowColor: Select.COLOR.DODGERBLUE,
          shadowOffset: { width: 2, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 6,
        };
        break;
      }
      case Select.ThemeEnum.box: {
        themeStyle = {
          borderColor: Select.COLOR.GRAY59,
          borderWidth: 2,
        };
        break;
      }
      default: {
        themeStyle = {
          shadowColor: Select.COLOR.GRAY59,
          shadowOffset: { width: 2, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          elevation: 6,
        };
        break;
      }
    }
    return { ...listStyle, ...themeStyle };
  }
};

function Picker({
  listOpen,
  onShow,
  onDismiss,
  setListOpen,
  onValueChange,
  selectedValue,
  items,
  itemListStyle,
  itemViewStyle,
  itemTextStyle,
  showsVerticalScrollIndicator,
  testID,
  theme,
}: Props): React.ReactElement {
  // check valid props;
  if (!items || !items.length) throw new Error(ERR_MSG_ITEMS_REQUIRED);
  const flatListEl = useRef<FlatList<Item>>(null);

  // constants
  const itemHeight = itemViewStyle
    ? itemViewStyle.height || ITEM_HEIGHT
    : ITEM_HEIGHT;
  const itemListHeight = itemListStyle
    ? itemListStyle.height || ITEM_LIST_HEIGHT
    : ITEM_LIST_HEIGHT;
  const itemThreshold = itemHeight / 2;
  let position = items.findIndex((item) => item.value === selectedValue);
  if (position === -1) position = 0;
  let newPosition = position;
  let isScrolling = false;

  const emptyViewHeight = (itemListHeight - itemHeight) / 2;

  const close = (): void => {
    setListOpen({
      ...listOpen,
      isOpen: false,
    });
  };

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
  }: {
    item: Item;
    index: number;
  }): React.ReactElement => {
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
    length: 0,
    offset: itemHeight * index,
    index,
  });

  const listStyle = getListStyle({
    theme,
    itemListStyle,
    listOpen,
    itemHeight,
  });

  return (
    <Modal
      visible={listOpen.isOpen}
      onShow={onShow}
      onDismiss={onDismiss}
      transparent
    >
      <CloseTouchableOpacity
        testID={`${testID}-${PICKER_TEST_ID.CLOSE}`}
        onPress={close}
        activeOpacity={1}
      />
      <ItemListContainer
        testID={`${testID}-${PICKER_TEST_ID.LIST_WRAPPER}`}
        style={listStyle}
      >
        <ItemFlatList
          ref={flatListEl}
          testID={`${testID}-${PICKER_TEST_ID.LIST}`}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          ListHeaderComponent={
            <EmptyView style={{ height: emptyViewHeight }} />
          }
          ListFooterComponent={
            <EmptyView style={{ height: emptyViewHeight }} />
          }
          keyExtractor={({ value }: Item): string => value}
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
      </ItemListContainer>
    </Modal>
  );
}

export default Picker;
