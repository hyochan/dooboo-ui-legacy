import { IC_ARR_DOWN, IC_ARR_UP } from '../Icons';
import {
  Image,
  ShadowStyleIOS,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import styled, { DefaultTheme, css } from 'styled-components/native';

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

interface BoxShadowType extends ShadowStyleIOS {
  elevation: number;
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

interface RootBoxThemeType extends DefaultTheme {
  rootbox: {
    backgroundColor: string;
    boxShadow?: BoxShadowType;
    border?: BorderStyle;
  };
}
interface TextThemeType extends DefaultTheme {
  text: {
    fontColor: string;
  };
}
// interface CompStyleType {
//   rootbox: RootBoxThemeType;
//   text: TextThemeType;
// }
interface ThemeType<T> extends DefaultTheme {
  blank: T;
  none: T;
  box: T;
  underbar: T;
}
interface ViewType {
  theme: ThemeEnum;
}
interface TextType {
  theme: ThemeEnum;
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

const bsCss = css`
  elevation: 1;
  shadow-color: ${COLOR.DODGERBLUE};
  shadow-offset: {width: 3, height: 3};
  shadow-opacity: 0.5;
  shadow-radius: 5;
`;
export const themeStylePropCollection: ThemeType<
  RootBoxThemeType | TextThemeType
> = {
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

type ThemeStylePropType = BoxShadowType | BorderStyle;
interface ThemePropParams {
  theme: ThemeEnum;
  comp: CompEnum;
  prop: StylePropEnum;
}
const getThemeProp = ({ theme, comp, prop }: ThemePropParams): string | ThemeStylePropType => {
  return themeStylePropCollection[theme][comp][prop];
};
const getThemeTextProp = ({ theme, comp, prop }: ThemePropParams): string => {
  return themeStylePropCollection[theme][comp][prop];
};

const Text = styled.Text<TextType>`
  font-size: 14px;
  color: ${(props): string =>
    getThemeTextProp({
      theme: props.theme,
      comp: CompEnum.text,
      prop: StylePropEnum.fc,
    })};
`;

const RootSelect = styled.View<ViewType>`
  background-color: ${(props): string =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.bc,
    })}
  ${(props): BoxShadowType =>
    getThemeProp({
      theme: props.theme,
      comp: CompEnum.rootbox,
      prop: StylePropEnum.bs,
    })}
  ${(props): BorderStyle =>
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

interface Props {
  testID?: string;
  items: string;
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

  const defaultTheme = !theme ? 'none' : theme;
  const rootViewTheme =
    rootViewStyle && Object.keys(rootViewStyle).length > 0
      ? 'blank'
      : defaultTheme;
  const rootTextTheme =
    rootTextStyle && Object.keys(rootTextStyle).length > 0
      ? 'blank'
      : defaultTheme;

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
  rootViewStyle: null,
  rootTextStyle: null,
};

export default Select;
