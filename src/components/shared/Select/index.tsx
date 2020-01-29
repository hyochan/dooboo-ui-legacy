import {
  Animated,
  Image,
  Modal,
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import { BOX_SHADOW, COLOR, Mode, ThemeEnum } from './constants';
import { IC_ARR_DOWN, IC_ARR_UP } from '../Icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { DefaultTheme } from 'styled-components/native';

import Dialog from './Dialog';
import DropDown from './DropDown';
import { FlattenSimpleInterpolation } from 'styled-components';
import Picker from './Picker';

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

interface Item {
  value: string;
  label?: string;
}

interface NullableItem extends Omit<Item, 'value'> {
  value: string | null;
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
  CLOSELIST: 'close-list',
  DROPDOWN: 'dropdown',
  DIALOG: 'dialog',
  PICKER: 'picker',
};

export const themeStylePropCollection: ThemeStyle<
  ThemeEnum,
  RootBoxTheme | TextTheme
> = {
  disabled: {
    rootbox: {
      backgroundColor: COLOR.TRANSPARENT,
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
      backgroundColor: COLOR.TRANSPARENT,
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
  none: {
    rootbox: {
      backgroundColor: COLOR.WHITE,
      boxShadow: BOX_SHADOW,
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
        borderWidth: 1,
      },
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
  underbar: {
    rootbox: {
      backgroundColor: COLOR.TRANSPARENT,
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

const Title = styled(Animated.Text)`
  position: absolute;
  align-self: center;
  font-size: 14px;
  color: ${COLOR.GRAY75};
`;

const RootText = styled.Text<ThemeType>`
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
  width: 120px;
  height: 40px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 6px 0 14px;
`;

const ModalBackground = styled.TouchableOpacity<ThemeType>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export interface Props {
  testID?: string;
  items: Item[];
  theme?: ThemeEnum;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  selectedValue: string | null;
  onSelect?: (item: NullableItem, index: number) => void;
  onValueChange?: (item: NullableItem, index: number) => void;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  mode?: Mode;
  nullable?: boolean;
  nullableLabel?: string;
  listStyle?: ItemListStyle;
  listTitleStyle?: TextStyle;
  itemViewStyle?: ItemViewStyle;
  itemTextStyle?: TextStyle;
  selectedItemViewStyle?: ItemViewStyle;
  selectedItemTextStyle?: TextStyle;
  showsVerticalScrollIndicator?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onItemPressIn?: () => void;
  onItemPressOut?: () => void;
}

function Select(props: Props): React.ReactElement {
  const {
    testID,
    theme,
    title,
    titleStyle,
    disabled,
    mode,
    style,
    textStyle,
    placeholder,
    selectedValue,
    onOpen,
    onClose,
    nullable,
    nullableLabel,
  } = props;

  const items = nullable
    ? [{ value: null, label: nullableLabel || '' }, ...props.items]
    : props.items;

  const selectedItem = items.find((item) => item.value === selectedValue);

  const rootEl = useRef<any>();

  const openValue = new Animated.Value(0);
  const [listOpen, setListOpen] = useState<ListOpen>({
    isOpen: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const titleAnimatedValue = new Animated.Value(
    placeholder || selectedValue ? 1 : 0,
  );

  const titleAnimatedStyle = {
    transform: [
      {
        translateX: titleAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [14, 6],
        }),
      },
      {
        translateY: titleAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
        }),
      },
    ],
    fontSize: titleAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    color: titleAnimatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        COLOR.GRAY75,
        theme === ThemeEnum.none ? COLOR.DODGERBLUE : COLOR.GRAY59,
      ],
    }),
  };

  const open = useCallback((): void => {
    if (rootEl && rootEl.current) {
      rootEl.current.measureInWindow((x, y, width, height) => {
        const nextState = {
          ...listOpen,
          isOpen: true,
        };

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

  useEffect(() => {
    Animated.parallel([
      Animated.timing(openValue, {
        toValue: listOpen.isOpen ? 1 : 0,
        duration: 200,
      }),
      Animated.timing(titleAnimatedValue, {
        toValue: listOpen.isOpen || placeholder || selectedValue ? 1 : 0,
        duration: 200,
      }),
    ]).start();
  }, [listOpen.isOpen]);

  const rootViewTheme = style ? ThemeEnum.blank : theme;
  const rootTextTheme = textStyle ? ThemeEnum.blank : theme;
  return (
    <>
      <TouchableWithoutFeedback
        testID={`${testID}-${TESTID.ROOTBUTTON}`}
        onPress={open}
        disabled={disabled}
      >
        <RootSelect
          ref={rootEl}
          theme={disabled ? ThemeEnum.disabled : rootViewTheme}
          style={style}
        >
          <RootText
            theme={disabled ? ThemeEnum.disabled : rootTextTheme}
            style={[
              (!selectedItem || !selectedItem.value) && { color: COLOR.GRAY75 },
              textStyle,
            ]}
            testID={`${testID}-${TESTID.ROOTTEXT}`}
          >
            {selectedItem && selectedItem.value
              ? selectedItem.label || selectedItem.value
              : placeholder}
          </RootText>
          {mode === Mode.dropdown && (
            <Image
              source={!listOpen.isOpen ? IC_ARR_DOWN : IC_ARR_UP}
              testID={`${testID}-${TESTID.ROOTARROW}`}
            />
          )}
          {title && (
            <Title
              style={[titleAnimatedStyle, disabled ? null : titleStyle]}
              testID={`${testID}-${TESTID.TITLETEXT}`}
            >
              {title}
            </Title>
          )}
        </RootSelect>
      </TouchableWithoutFeedback>

      <Modal
        visible={listOpen.isOpen}
        onShow={onOpen}
        onDismiss={onClose}
        transparent
      >
        <ModalBackground
          testID={`${testID}-${TESTID.CLOSELIST}`}
          activeOpacity={1}
          onPress={close}
          style={
            mode === Mode.dialog && { backgroundColor: 'rgba(0, 0, 0, 0.3)' }
          }
        >
          {mode === Mode.dropdown && (
            <DropDown
              {...props}
              items={items}
              listOpen={listOpen}
              close={close}
              openValue={openValue}
            />
          )}
          {/* Todo dialog */}
          {mode === Mode.dialog && (
            <Dialog
              {...props}
              items={items}
              close={close}
              openValue={openValue}
            />
          )}
          {mode === Mode.picker && (
            <Picker
              {...props}
              items={items}
              listOpen={listOpen}
              close={close}
              openValue={openValue}
            />
          )}
        </ModalBackground>
      </Modal>
    </>
  );
}

Select.defaultProps = {
  theme: ThemeEnum.none,
  placeholder: '',
  mode: Mode.dropdown,
  showsVerticalScrollIndicator: false,
  nullable: false,
  nullableLabel: '',
  selectedValue: null,
};

export default Select;
