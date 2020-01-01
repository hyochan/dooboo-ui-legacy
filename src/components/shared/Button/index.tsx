import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
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

interface TextType extends ThemeProps<TextThemeType>{
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
  onClick?: (e?: GestureResponderEvent) => void | Promise<void>;
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

const getText = ({
  children,
  text,
  style,
  theme,
}: {
  children?: string | React.ReactElement;
  text?: string;
  style: TextStyle;
  theme: TextThemeType;
}): string | React.ReactElement | undefined => {
  if (typeof children === 'undefined') {
    return (
      <Text testID={TESTID.TEXT} style={style} theme={theme}>{text}</Text>
    );
  }

  if (typeof children === 'string') {
    return (
      <Text testID={TESTID.TEXT} style={style} theme={theme}>{children}</Text>
    );
  }

  return children;
};

function Button(props: Props): React.ReactElement {
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

  const buttonThemeToApply: ButtonThemeType = {
    backgroundColor: buttonStyleToApply.backgroundColor || defaultTheme.backgroundColor,
    borderColor: buttonStyleToApply.borderColor || defaultTheme.borderColor,
  };

  const textThemeToApply: TextThemeType = {
    fontColor: textStyleToApply.color || defaultTheme.fontColor,
  };

  const textToRender = getText({
    children,
    text,
    style: textStyleToApply,
    theme: textThemeToApply,
  });

  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={activeOpacity}
      onPress={onClick}
      disabled={isDisabled}
    >
      <StyledButton
        style={buttonStyleToApply}
        theme={buttonThemeToApply}
      >
        {!isLoading && <IconLeft testID={TESTID.ICONLEFT}>{iconLeft}</IconLeft>}
        {!isLoading && textToRender}
        {!isLoading && <IconRight testID={TESTID.ICONRIGHT}>{iconRight}</IconRight>}
        {isLoading && <ActivityIndicator testID="activityIndicator" size="small" color={indicatorColor} />}
      </StyledButton>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  style: {},
  textStyle: {},
  indicatorColor: COLOR.WHITE,
  activeOpacity: 0.5,
};

export default Button;
