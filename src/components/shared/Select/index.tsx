import { IC_ARR_DOWN, IC_ARR_UP } from '../Icons';
import {
  Image,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import styled, { DefaultTheme, ThemeProps } from 'styled-components/native';

enum ThemeEnum {
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
interface BoxShadowType {
  elevation: number;
  shadowOffset: { width: number; height: number };
  shadowColor: string;
  shadowOpacity: number;
  shadowRadius: number;
}

interface ViewThemeType extends BoxShadowType {
  backgroundColor: string;
  borderColor?: string;
}
interface ViewType extends ThemeProps<ViewThemeType> {
  theme: ViewThemeType;
}
interface TextThemeType {
  fontColor: string;
}
interface TextType extends ThemeProps<TextThemeType> {
  theme: TextThemeType;
}

interface BorderStyle extends ViewStyle {
  borderBottomColor?: string;
  borderBottomEndRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;
  borderBottomStartRadius?: number;
  borderBottomWidth?: number;
  borderColor?: string;
  borderEndColor?: string;
  borderLeftColor?: string;
  borderLeftWidth?: number;
  borderRadius?: number;
  borderRightColor?: string;
  borderRightWidth?: number;
  borderStartColor?: string;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  borderTopColor?: string;
  borderTopEndRadius?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderTopStartRadius?: number;
  borderTopWidth?: number;
  borderWidth?: number;
}

interface RootBoxThemeType extends DefaultTheme {
  backgroundColor: string;
  boxShadow?: BoxShadowType;
  border?: BorderStyle;
}

interface CompStyleType {
  rootbox: RootBoxThemeType;
  text: TextThemeType;
}

interface StatefulThemeType {
  blank: CompStyleType;
  none: CompStyleType;
  box: CompStyleType;
  underbar: CompStyleType;
}

export const TESTID = {
  ROOTSELECT: 'root-select',
  ROOTTEXT: 'root-text',
  ROOTARROW: 'root-arrow',
};

const COLOR: {
  [key: string]: string;
} = {
  WHITE: '#ffffff',
  DODGERBLUE: '#3a8bff',
  VERYLIGHTGRAY: '#cccccc',
  LIGHTGRAY: '#c8c8c8',
  BLUE: '#0000ff',
  STRONGBLUE: '#069ccd',
  GRAY3: '#080808',
  GRAY7: '#121212',
  GRAY59: '#969696',
  DARK: '#09071d',
};

export const themeStylePropCollection: StatefulThemeType = {
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
      boxShadow: {
        elevation: 1,
        shadowColor: COLOR.DODGERBLUE,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
    },
    text: {
      fontColor: COLOR.DARK,
    },
  },
  box: {
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
  underbar: {
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
};

const getThemeProp = ({
  theme,
  comp,
  prop,
}: {
  theme: ThemeEnum;
  comp: CompEnum;
  prop: StylePropEnum;
}): string => {
  return themeStylePropCollection[theme][comp][prop];
};

const Text = styled.Text`
  font-size: 14px;
  color: ${({ theme }): string =>
    getThemeProp({ theme, comp: CompEnum.text, prop: StylePropEnum.fc })};
`;

const RootSelect = styled.View`
  background-color: ${({ theme }): string =>
    getThemeProp({
      theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.bc,
    })};
  ${({ theme }): string =>
    getThemeProp({
      theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.bs,
    })};
  ${({ theme }): string =>
    getThemeProp({
      theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.border,
    })};
  width: 128px;
  height: 48px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 6px;
`;

interface Props {
  testID?: string;
  items: string;
  text?: string;
  theme?: ThemeEnum;
  rootViewStyle?: StyleProp<ViewStyle>;
  rootTextStyle?: StyleProp<TextStyle>;
  placeholder?: boolean;
  activeOpacity: number;
  disabled?: boolean;
}

function Select(props: Props): React.ReactElement {
  const {
    testID,
    theme,
    rootViewStyle,
    rootTextStyle,
    placeholder,
    activeOpacity,
    disabled,
  } = props;

  const [listOpen, setListOpen] = useState<boolean>(false);
  const toggleList = useCallback(
    (e) => {
      setListOpen(!listOpen);
    },
    [listOpen],
  );

  const isThemeEmpty = theme === null || theme === undefined || theme === '';
  const defaultTheme = isThemeEmpty ? 'none' : theme;
  const rootViewTheme =
    Object.keys(rootViewStyle).length > 0 ? 'blank' : defaultTheme;
  const rootTextTheme =
    Object.keys(rootTextStyle).length > 0 ? 'blank' : defaultTheme;

  return (
    <>
      <TouchableOpacity
        testID={testID}
        activeOpacity={activeOpacity}
        onPress={toggleList}
        disabled={disabled}
      >
        <RootSelect
          theme={rootViewTheme}
          style={rootViewStyle}
          testID={`${testID}-${TESTID.ROOTSELECT}`}
        >
          <Text
            theme={rootTextTheme}
            style={rootTextStyle}
            testID={`${testID}-${TESTID.ROOTTEXT}`}
          >
            {placeholder}
          </Text>
          <Image
            source={!listOpen ? IC_ARR_DOWN : IC_ARR_UP}
            testID={`${testID}-${TESTID.ROOTARROW}`}
          />
        </RootSelect>
      </TouchableOpacity>
      {listOpen && <Text theme={rootTextTheme}>{'list item here!!'}</Text>}
    </>
  );
}

Select.defaultProps = {
  theme: 'none',
  placeholder: '',
  activeOpacity: 0.5,
  rootViewStyle: {},
  rootTextStyle: {},
};

export default Select;
