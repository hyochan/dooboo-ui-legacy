import {
  ActivityIndicator,
  Image,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { IC_ARR_DOWN, IC_ARR_UP } from '../Icons';
import styled, { DefaultTheme, ThemeProps } from 'styled-components/native';

import React from 'react';

interface TextThemeType {
  fontColor: string;
}

interface ButtonThemeType {
  backgroundColor: string;
  borderColor: string;
}

interface ButtonType extends ThemeProps<ButtonThemeType> {
  theme: ButtonThemeType;
}

interface TextType extends ThemeProps<TextThemeType> {
  theme: TextThemeType;
}

interface ThemeType extends DefaultTheme {
  backgroundColor: string;
  borderColor: string;
  fontColor: string;
}

interface StatefulThemeType extends ThemeType {
  INVERTED: ThemeType;
  DISABLED: ThemeType;
}

interface Props {
  testID?: string;
  style: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  dark?: boolean;
  inverted?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  iconLeft?: React.ReactElement;
  iconRight?: React.ReactElement;
  indicatorColor: string;
  activeOpacity: number;
  children?: string | React.ReactElement;
  text?: string;
  onClick?: (params?: any) => void | Promise<void>;
}

export const TESTID = {
  BUTTON: 'button',
  ACTIVITYINDICATOR: 'activityIndicator',
  ICONLEFT: 'iconLeft',
  ICONRIGHT: 'iconRight',
  TEXT: 'text',
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
};

export const THEME: {
  LIGHT: StatefulThemeType;
  DARK: StatefulThemeType;
} = {
  LIGHT: {
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.BLUE,
    fontColor: COLOR.STRONGBLUE,
    INVERTED: {
      backgroundColor: COLOR.BLUE,
      borderColor: COLOR.STRONGBLUE,
      fontColor: COLOR.WHITE,
    },
    DISABLED: {
      backgroundColor: COLOR.VERYLIGHTGRAY,
      borderColor: COLOR.LIGHTGRAY,
      fontColor: COLOR.GRAY59,
    },
  },
  DARK: {
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.GRAY7,
    fontColor: COLOR.GRAY3,
    INVERTED: {
      backgroundColor: COLOR.GRAY7,
      borderColor: COLOR.GRAY3,
      fontColor: COLOR.WHITE,
    },
    DISABLED: {
      backgroundColor: COLOR.VERYLIGHTGRAY,
      borderColor: COLOR.LIGHTGRAY,
      fontColor: COLOR.GRAY59,
    },
  },
};

const StyledButton = styled.View<ButtonType>`
  width: 320px;
  height: 52px;
  background-color: ${({ theme }): string => theme.backgroundColor};
  border-color: ${({ theme }): string => theme.borderColor};
  border-radius: 4px;
  border-width: 2px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Text = styled.Text<TextType>`
  font-size: 14px;
  color: ${({ theme }): string => theme.fontColor};
`;

const IconLeft = styled.View`
  position: absolute;
  left: 0;
`;

const IconRight = styled.View`
  position: absolute;
  right: 0;
`;

const getDefaultTheme = ({
  dark,
  inverted,
  isDisabled,
}: {
  dark?: boolean;
  inverted?: boolean;
  isDisabled?: boolean;
}): ThemeType => {
  const theme = dark ? THEME.DARK : THEME.LIGHT;

  if (isDisabled) {
    return theme.DISABLED;
  }

  return inverted ? theme.INVERTED : theme;
};

// const getText = ({
//   children,
//   text,
//   style,
//   theme,
// }: {
//   children?: string | React.ReactElement;
//   text?: string;
//   style: TextStyle;
//   theme: TextThemeType;
// }): string | React.ReactElement | undefined => {
//   if (typeof children === 'undefined') {
//     return (
//       <Text testID={TESTID.TEXT} style={style} theme={theme}>{text}</Text>
//     );
//   }

//   if (typeof children === 'string') {
//     return (
//       <Text testID={TESTID.TEXT} style={style} theme={theme}>{children}</Text>
//     );
//   }

//   return children;
// };
const RootSelect = styled.View`
  background-color: orange;
  width: 128;
  height: 48;
  /* flex: 1; */
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px 6px;
`;

function Select(props: Props): React.ReactElement {
  const {
    testID,
    style,
    textStyle,
    dark,
    inverted,
    isLoading,
    isDisabled,
    iconLeft,
    iconRight,
    indicatorColor,
    activeOpacity,
    children,
    text,
    onClick,
  } = props;

  const buttonStyleToApply = StyleSheet.flatten(style);
  const textStyleToApply = StyleSheet.flatten(textStyle);

  const defaultTheme = getDefaultTheme({
    dark,
    inverted,
    isDisabled,
  });

  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={activeOpacity}
      onPress={onClick}
      disabled={isDisabled}
    >
      <RootSelect>
        <Text theme={{ fontColor: '#000' }}>{'Placeholder'}</Text>
        <Image source={IC_ARR_DOWN} />
      </RootSelect>
    </TouchableOpacity>
  );
}

Select.defaultProps = {
  style: {},
  textStyle: {},
  indicatorColor: COLOR.WHITE,
  activeOpacity: 0.5,
};

export default Select;
