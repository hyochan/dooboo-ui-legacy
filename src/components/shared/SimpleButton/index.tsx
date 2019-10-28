import {
  ActivityIndicator,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import styled, { ThemeProps } from 'styled-components/native';

import React from 'react';

const COLOR = {
  WHITE: 'white',
  DODGERBLUE: 'rgb(58, 139, 255)',
};

export const THEME_TYPE = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const THEME = {
  [THEME_TYPE.LIGHT]: {
    backgroundColor: COLOR.DODGERBLUE,
    borderColor: COLOR.WHITE,
    fontColor: COLOR.WHITE,
    INVERTED: {
      backgroundColor: COLOR.WHITE,
      borderColor: COLOR.DODGERBLUE,
      fontColor: COLOR.DODGERBLUE,
    },
  },
  [THEME_TYPE.DARK]: {
    backgroundColor: COLOR.DODGERBLUE,
    borderColor: COLOR.WHITE,
    fontColor: COLOR.WHITE,
    INVERTED: {
      backgroundColor: COLOR.WHITE,
      borderColor: COLOR.DODGERBLUE,
      fontColor: COLOR.DODGERBLUE,
    },
  },
};

interface Props {
  testID: string;
  themeType: string;
  width: number;
  height: number;
  inverted?: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  iconSrc?: ImageSourcePropType;
  indicatorColor: string;
  activeOpacity: number;
  children: string;
  onPress: () => void;
}

interface TextTheme {
  fontColor: string;
}
interface Text extends ThemeProps<TextTheme>{
  theme: TextTheme;
}

interface ButtonTheme {
  backgroundColor: string;
  borderColor: string;
}
interface Button extends ThemeProps<ButtonTheme> {
  width?: number;
  height?: number;
}

const StyledButton = styled.View<Button>`
  width: ${({ width }): string => `${width}px`};
  height: ${({ height }): string => `${height}px`};
  background-color: ${({ theme }): string => theme.backgroundColor};
  border-color: ${({ theme }): string => theme.borderColor};
  border-radius: 4px;
  border-width: 1px;
  justify-content: center;
  align-items: center;
`;

const StyledButtonDisabled = styled.View<Button>`
  width: ${({ width }): string => `${width}px`};
  height: ${({ height }): string => `${height}px`};
  background-color: rgb(243, 243, 243);
  align-self: center;
  border-radius: 4px;
  border-width: 2px;
  border-color: #333;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text<Text>`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }): string => theme.fontColor};
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 16px;
`;

function SimpleButton(props: Props): React.ReactElement {
  const {
    testID,
    isDisabled,
    inverted,
    indicatorColor,
    iconSrc,
    activeOpacity,
    onPress,
    isLoading,
    width,
    height,
    children: text,
    themeType,
  } = props;

  const theme = inverted ? THEME[themeType].INVERTED : THEME[themeType];

  if (isDisabled) {
    return (
      <StyledButtonDisabled
        testID={testID}
        theme={theme}
        width={width}
        height={height}
      >
        {<Text theme={theme}>{text}</Text>}
      </StyledButtonDisabled>
    );
  }

  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={activeOpacity}
      onPress={onPress}
    >
      <StyledButton
        theme={theme}
        width={width}
        height={height}
      >
        {iconSrc && <Icon source={iconSrc} />}
        {!isLoading && <Text theme={theme}>{text}</Text>}
        {isLoading && <ActivityIndicator size='small' color={indicatorColor} />}
      </StyledButton>
    </TouchableOpacity>
  );
}

SimpleButton.defaultProps = {
  themeType: THEME_TYPE.LIGHT,
  width: 136,
  height: 60,
  isLoading: false,
  isDisabled: false,
  indicatorColor: 'white',
  activeOpacity: 0.5,
};

export default SimpleButton;
