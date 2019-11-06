import {
  ActivityIndicator,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {
  ButtonType,
  StatefulThemeType,
  TextType,
  ThemeType,
} from './index.d';

import React from 'react';
import styled from 'styled-components/native';

interface Props {
  testID: string;
  style?: StyleProp<ViewStyle>;
  theme?: ThemeType;
  dark?: boolean;
  inverted?: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  iconLeft?: ImageSourcePropType;
  iconLeftStyle?: StyleProp<ImageStyle>;
  iconRight?: ImageSourcePropType;
  iconRightStyle?: StyleProp<ImageStyle>;
  indicatorColor: string;
  activeOpacity: number;
  children?: string;
  text?: string;
  onClick: () => void;
}

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
  height: 52;
  background-color: ${({ theme }): string => theme.backgroundColor};
  border-color: ${({ theme }): string => theme.borderColor};
  border-radius: 4px;
  border-width: 2px;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text<TextType>`
  font-size: 14px;
  color: ${({ theme }): string => theme.fontColor};
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 16px;
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

const getTheme = ({
  theme,
  dark,
  inverted,
  isDisabled,
}: {
  theme?: ThemeType;
  dark?: boolean;
  inverted?: boolean;
  isDisabled?: boolean;
}): ThemeType => {
  const defaultTheme = getDefaultTheme({
    dark,
    inverted,
    isDisabled,
  });

  if (!theme) {
    return defaultTheme;
  }

  return {
    ...defaultTheme,
    ...theme,
  };
};

const getText = ({
  children,
  text,
}: {
  children?: string;
  text?: string;
}): string | undefined => {
  if (typeof children === 'undefined') {
    return text;
  }

  return children;
};

function Button(props: Props): React.ReactElement {
  const {
    testID,
    style,
    theme,
    dark,
    inverted,
    isLoading,
    isDisabled,
    iconLeft,
    iconLeftStyle,
    iconRight,
    iconRightStyle,
    indicatorColor,
    activeOpacity,
    children,
    text,
    onClick,
  } = props;

  const themeToApply = getTheme({
    theme,
    dark,
    inverted,
    isDisabled,
  });

  const textToRender = getText({
    children,
    text,
  });

  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={activeOpacity}
      onPress={onClick}
      disabled={isDisabled}
    >
      <StyledButton
        style={style}
        theme={themeToApply}
      >
        {iconLeft && <Icon source={iconLeft} style={iconLeftStyle} />}
        {!isLoading && <Text theme={themeToApply}>{textToRender}</Text>}
        {iconRight && <Icon source={iconRight} style={iconRightStyle} />}
        {isLoading && <ActivityIndicator size='small' color={indicatorColor} />}
      </StyledButton>
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  isLoading: false,
  isDisabled: false,
  indicatorColor: COLOR.WHITE,
  activeOpacity: 0.5,
};

export default Button;
