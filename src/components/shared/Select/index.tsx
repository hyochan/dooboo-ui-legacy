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
import React, { ReactElement, useCallback, useState } from 'react';
import styled, { DefaultTheme, css } from 'styled-components/native';

import { FlattenSimpleInterpolation } from 'styled-components';

export type Item = {
  value: string;
  text: string;
};

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

type ThemeStyle<K extends string, T> = {
  [P in K]: T;
};

interface ThemeType {
  theme: ThemeEnum;
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

export const TESTID = {
  ROOTBTN: 'root-btn',
  ROOTSELECT: 'root-select',
  ROOTTEXT: 'root-text',
  ROOTARROW: 'root-arrow',
  SELECTLISTVIEW: 'select-list-view',
  SELECTLIST: 'select-list',
  MODALCLOSEVIEW: 'modal-close-view',
};

const COLOR: {
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
    width: 3;
    height: 3;
  }
  shadow-opacity: 0.5;
  shadow-radius: 5;
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
    })}
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

const RootCloseView = styled.TouchableOpacity`
  width: 100%;
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
  theme?: ThemeEnum;
  rootViewStyle?: StyleProp<ViewStyle>;
  rootTextStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  activeOpacity: number;
  disabled?: boolean;
  itemStyle?: StyleProp<ViewStyle>;
  selectedItemStyle?: StyleProp<ViewStyle>;
  onSelect: (Item) => void;
  selectedItem: Item;
}

function Select(props: Props): React.ReactElement {
  const {
    testID,
    theme,
    title,
    titleTextStyle,
    style,
    rootViewStyle,
    rootTextStyle,
    placeholder,
    activeOpacity,
    disabled,
    items,
    itemStyle,
    selectedItemStyle,
    onSelect,
    selectedItem,
  } = props;

  const selectRef = React.useRef<View>(null);
  const [layout, setLayout] = useState<Layout>({
    ox: 0,
    oy: 0,
    width: 0,
    height: 0,
  });
  const getLayout = (): void => {
    if (selectRef.current) {
      selectRef.current.measureInWindow((ox, oy, width, height) => {
        setLayout({ ox, oy, width, height });
      });
    }
  };
  const [listOpen, setListOpen] = useState<boolean>(false);
  const toggleList = useCallback(() => {
    getLayout();
    setListOpen(!listOpen);
  }, [listOpen]);

  const handleSelect = (item: Item): void => {
    onSelect(item);
    setListOpen(false);
  };

  const defaultTheme = disabled ? 'disabled' : !theme ? 'none' : theme;
  const rootViewTheme = disabled
    ? 'disabled'
    : rootViewStyle && Object.keys(rootViewStyle).length > 0
    ? 'blank'
    : defaultTheme;
  const rootTextTheme = disabled
    ? 'disabled'
    : rootTextStyle && Object.keys(rootTextStyle).length > 0
    ? 'blank'
    : defaultTheme;
  const _rootViewStyle = disabled ? null : rootViewStyle;
  const _rootTextStyle = disabled ? null : rootTextStyle;

  const renderItem = ({ item }: ListRenderItemInfo<Item>): ReactElement => {
    const style =
      selectedItem && selectedItem.value === item.value
        ? selectedItemStyle
        : itemStyle;
    return (
      <ItemView
        style={style}
        selected={selectedItem && selectedItem.value === item.value}
        activeOpacity={1}
        onPress={(): void => {
          handleSelect(item);
        }}
      >
        <ItemText
          selected={selectedItem && selectedItem.value === item.value}
          style={style}
        >
          {item.text}
        </ItemText>
      </ItemView>
    );
  };
  return (
    <>
      <TouchableOpacity
        testID={`${testID}-${TESTID.TOUCHABLEOPACITY}`}
        activeOpacity={activeOpacity}
        onPress={toggleList}
        disabled={disabled}
        testID={`${testID}-${TESTID.ROOTBTN}`}
      >
        <RootSelect
          theme={rootViewTheme}
          style={_rootViewStyle}
          testID={`${testID}-${TESTID.ROOTSELECT}`}
          ref={selectRef as any}
          onLayout={getLayout}
        >
          <Text
            theme={rootTextTheme}
            style={_rootTextStyle}
            testID={`${testID}-${TESTID.ROOTTEXT}`}
          >
            {selectedItem ? selectedItem.text : placeholder}
          </Text>
          <Image
            source={!listOpen ? IC_ARR_DOWN : IC_ARR_UP}
            testID={`${testID}-${TESTID.ROOTARROW}`}
          />
        </RootSelect>
      </TouchableOpacity>
      <Modal
        visible={listOpen}
        onRequestClose={(): void => {
          setListOpen(false);
        }}
        transparent={true}
      >
        <SelectListView
          style={{
            shadowOffset: { width: 0, height: 5 },
            top: layout.oy,
            left: layout.ox,
            width: layout.width,
            display: listOpen ? 'flex' : 'none',
          }}
          testID={`${testID}-${TESTID.SELECTLISTVIEW}`}
        >
          <RootCloseView
            testID={`${testID}-${TESTID.MODALCLOSEVIEW}`}
            onPress={toggleList}
            style={{ height: layout.height }}
          ></RootCloseView>
          <SelectList
            style={itemStyle}
            data={items}
            renderItem={renderItem}
            keyExtractor={(item: Item): string => item.value}
            testID={`${testID}-${TESTID.SELECTLIST}`}
          />
        </SelectListView>
      </Modal>
    </>
  );
}

Select.defaultProps = {
  theme: 'none',
  placeholder: '',
  activeOpacity: 0.5,
  rootViewStyle: null,
  rootTextStyle: null,
};

export default Select;
