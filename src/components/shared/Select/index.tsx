import {
  FlatList,
  Image,
  ListRenderItemInfo,
  Modal,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { IC_ARR_DOWN, IC_ARR_UP } from '../Icons';
import React, { ReactElement, useCallback, useRef, useState } from 'react';
import styled, { DefaultTheme, css } from 'styled-components/native';

import { FlattenSimpleInterpolation } from 'styled-components';
import Picker from './Picker';

export enum ThemeEnum {
  disabled = 'disabled',
  blank = 'blank',
  none = 'none',
  box = 'box',
  underbar = 'underbar',
}

enum CompEnum {
  rootbox = 'rootbox',
  text = 'text',
  item = 'item',
}
enum StylePropEnum {
  bc = 'backgroundColor',
  fc = 'fontColor',
  bs = 'boxShadow',
  border = 'border',
}

export enum Mode {
  dropdown = 'dropdown',
  dialog = 'dialog',
  picker = 'picker',
}

type ThemeStyle<K extends string, T> = {
  [P in K]: T;
};

interface ThemeType {
  theme: ThemeEnum;
}

export interface Item {
  value: string;
  label?: string;
}

interface BorderStyle extends ViewStyle {
  borderColor?: string;
  borderWidth?: number;
  borderBottomColor?: string;
  borderBottomWidth?: number;
  borderLeftColor?: string;
  borderLeftWidth?: number;
  borderRightColor?: string;
  borderRightWidth?: number;
  borderTopColor?: string;
  borderTopWidth?: number;
}

interface ItemListStyle extends ViewStyle {
  height?: number;
}
interface ItemViewStyle extends ViewStyle {
  height?: number;
}

interface RootBoxTheme extends DefaultTheme {
  rootbox: {
    backgroundColor: string;
    boxShadow?: FlattenSimpleInterpolation;
    border?: BorderStyle;
  };
}

interface TextTheme extends DefaultTheme {
  text: {
    fontColor: string;
  };
}

interface ThemeType {
  theme: ThemeEnum;
}
interface Selected {
  selected: boolean;
}

export interface ListOpen {
  isOpen: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const TESTID = {
  TITLETEXT: 'title-text',
  ROOTBUTTON: 'root-button',
  ROOTSELECT: 'root-select',
  ROOTTEXT: 'root-text',
  ROOTARROW: 'root-arrow',
  SELECTLISTVIEW: 'select-list-view',
  LISTITEM: 'list-item',
  MODALCLOSEVIEW: 'modal-close-view',
  PICKER: 'picker',
};

export const COLOR: {
  [key: string]: string;
} = {
  WHITE: '#ffffff',
  DODGERBLUE: '#5364ff',
  VERYLIGHTGRAY: '#cccccc',
  LIGHTGRAY: '#c8c8c8',
  BLUE: '#0000ff',
  STRONGBLUE: '#069ccd',
  GRAY3: '#080808',
  GRAY7: '#121212',
  GRAY59: '#969696',
  DARK: '#09071d',
  LIGHTBLUE: '#bcdbfb',
  BLACK: '#000000',
};

const bsCss = css`
  elevation: 1;
  shadow-color: ${COLOR.DODGERBLUE};
  shadow-offset: {
    width: 2;
    height: 2;
  }
  shadow-opacity: 0.5;
  shadow-radius: 3;
`;

export const themeStylePropCollection: ThemeStyle<
  ThemeEnum,
  RootBoxTheme | TextTheme
> = {
  disabled: {
    rootbox: {
      backgroundColor: 'transparent',
      border: {
        borderBottomColor: COLOR.LIGHTGRAY,
        borderBottomWidth: 2,
      },
    },
    text: {
      fontColor: COLOR.LIGHTGRAY,
    },
  },
  blank: {
    rootbox: {
      backgroundColor: 'transparent',
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
  none: {
    rootbox: {
      backgroundColor: COLOR.WHITE,
      boxShadow: bsCss,
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
  box: {
    rootbox: {
      backgroundColor: COLOR.WHITE,
      border: {
        borderColor: COLOR.GRAY59,
        borderWidth: 2,
      },
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
  underbar: {
    rootbox: {
      backgroundColor: COLOR.WHITE,
      border: {
        borderBottomColor: COLOR.GRAY59,
        borderBottomWidth: 2,
      },
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
};

interface ThemePropParams {
  theme: ThemeEnum;
  comp: CompEnum;
  prop: StylePropEnum;
}
const getThemeProp = ({ theme, comp, prop }: ThemePropParams): string => {
  return themeStylePropCollection[theme][comp][prop];
};

const Title = styled.Text<ThemeType>`
  font-size: 12px;
  margin-bottom: 5px;
  color: ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.text,
      prop: StylePropEnum.fc,
    })};
`;
const Text = styled.Text<ThemeType>`
  font-size: 14px;
  color: ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.text,
      prop: StylePropEnum.fc,
    })};
`;

const RootSelect = styled.View<ThemeType>`
  background-color: ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.bc,
    })};
  ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.bs,
    })}
  ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.border,
    })}
  width: 128px;
  height: 48px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 6px;
`;
const ModalBackground = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const SelectListView = styled.View`
  elevation: 8;
  shadow-color: ${COLOR.DODGERBLUE};
  shadow-offset: {
    width: 0;
    height: 5;
  }
  shadow-opacity: 0.2;
`;
const SelectList = styled(FlatList as new () => FlatList<Item>)`
  background-color: ${COLOR.WHITE};
  padding-top: 8px;
`;

const ItemView = styled.TouchableOpacity<Selected>`
  background-color: ${({ selected }: { selected: boolean }): string =>
    selected ? COLOR.LIGHTBLUE : COLOR.WHITE};
  height: 32px;
  padding: 6px;
  justify-content: center;
`;
const ItemText = styled.Text<Selected>`
  font-size: 14px;
  color: ${COLOR.BLACK};
`;

export type Layout = {
  ox: number;
  oy: number;
  width: number;
  height: number;
};
export interface Props {
  testID?: string;
  items: Item[];
  style?: StyleProp<ViewStyle>;
  theme?: ThemeEnum;
  title?: string;
  selectedValue: string;
  placeholder?: string;
  titleStyle?: StyleProp<TextStyle>;
  activeOpacity: number;
  rootViewStyle?: StyleProp<ViewStyle>;
  rootTextStyle?: StyleProp<TextStyle>;
  mode?: Mode;
  itemListStyle?: ItemListStyle;
  itemViewStyle?: ItemViewStyle;
  itemTextStyle?: StyleProp<TextStyle>;
  showsVerticalScrollIndicator?: boolean;
  disabled?: boolean;
  itemStyle?: StyleProp<ViewStyle>;
  selectedItemStyle?: StyleProp<ViewStyle>;
  onSelect?: (Item) => void;
  onShow?: () => void;
  onDismiss?: () => void;
  onValueChange?: (item: Item, index: number) => void;
}

function Select(props: Props): React.ReactElement {
  const {
    testID,
    theme,
    title,
    titleStyle,
    style,
    activeOpacity,
    disabled,
    mode,
    rootTextStyle,
    rootViewStyle,
    placeholder,
    selectedValue,
    items,
    itemStyle,
    selectedItemStyle,
    onSelect,
  } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rootEl = useRef<any>();

  const [listOpen, setListOpen] = useState<ListOpen>({
    isOpen: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const open = useCallback((): void => {
    const nextState = {
      ...listOpen,
      isOpen: true,
    };
    if (rootEl && rootEl.current) {
      rootEl.current.measureInWindow((x, y, width, height) => {
        nextState.x = x;
        nextState.y = y;
        nextState.width = width;
        nextState.height = height;

        setListOpen(nextState);
      });
    }
  }, []);

  const close = useCallback((): void => {
    setListOpen({ ...listOpen, isOpen: false });
  }, []);

  const defaultTheme = disabled
    ? ThemeEnum.disabled
    : !theme
    ? ThemeEnum.none
    : theme;
  const rootViewTheme = disabled
    ? ThemeEnum.disabled
    : rootViewStyle && Object.keys(rootViewStyle).length > 0
    ? ThemeEnum.blank
    : defaultTheme;
  const rootTextTheme = disabled
    ? ThemeEnum.disabled
    : rootTextStyle && Object.keys(rootTextStyle).length > 0
    ? ThemeEnum.blank
    : defaultTheme;
  const titleTextTheme = disabled
    ? ThemeEnum.disabled
    : titleStyle && Object.keys(titleStyle).length > 0
    ? ThemeEnum.blank
    : defaultTheme;
  const _rootViewStyle = disabled ? null : rootViewStyle;
  const _rootTextStyle = disabled ? null : rootTextStyle;

  const renderItem = ({ item }: ListRenderItemInfo<Item>): ReactElement => {
    const style = selectedValue === item.value ? selectedItemStyle : itemStyle;
    return (
      <ItemView
        style={style}
        selected={selectedValue === item.value}
        activeOpacity={1}
        onPress={(): void => {
          handleSelect(item);
        }}
        testID={`${testID}-${TESTID.LISTITEM}-${item.value}`}
      >
        <ItemText selected={selectedValue === item.value} style={style}>
          {item.label}
        </ItemText>
      </ItemView>
    );
  };
  return (
    <View style={style} testID={testID}>
      {title && (
        <Title
          theme={titleTextTheme}
          style={titleStyle}
          testID={`${testID}-${TESTID.TITLETEXT}`}
        >
          {title}
        </Title>
      )}
      <TouchableOpacity
        testID={`${testID}-${TESTID.ROOTBUTTON}`}
        activeOpacity={activeOpacity}
        onPress={open}
        disabled={disabled}
      >
        <RootSelect
          ref={rootEl}
          theme={rootViewTheme}
          style={_rootViewStyle}
          testID={`${testID}-${TESTID.ROOTSELECT}`}
        >
          <Image
            source={!listOpen.isOpen ? IC_ARR_DOWN : IC_ARR_UP}
            testID={`${testID}-${TESTID.ROOTARROW}`}
          />
        </RootSelect>
      </TouchableOpacity>
      <Modal visible={listOpen.isOpen} transparent={true}>
        <ModalBackground onPress={close} />
        <SelectListView
          style={{
            shadowOffset: { width: 0, height: 5 },
            top: listOpen.y,
            left: listOpen.x,
            width: listOpen.width,
            display: listOpen ? 'flex' : 'none',
          }}
          testID={`${testID}-${TESTID.SELECTLISTVIEW}`}
        >
          <SelectList
            style={itemStyle}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item: Item): string => item.value}
          />
        </SelectListView>
      </Modal>
      {/* Todo dropdown */}
      {mode === Mode.dropdown && listOpen.isOpen && (
        <View style={{ height: 50, width: 100, backgroundColor: 'white' }} />
      )}
      {/* Todo dialog */}
      {mode === Mode.dialog && listOpen.isOpen && (
        <View style={{ height: 50, width: 100, backgroundColor: 'white' }} />
      )}
      {mode === Mode.picker && (
        <Picker
          {...props}
          testID={`${testID}-${TESTID.PICKER}`}
          listOpen={listOpen}
          setListOpen={setListOpen}
        />
      )}
    </View>
  );
}

Select.defaultProps = {
  theme: ThemeEnum.none,
  placeholder: '',
  activeOpacity: 0.8,
  mode: Mode.picker,
  showsVerticalScrollIndicator: false,
};

export default Select;
