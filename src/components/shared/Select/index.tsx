import {
  Image,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import styled, { DefaultTheme, ThemeProps } from 'styled-components/native';

import { IC_ARR_DOWN } from '../Icons';
import React from 'react';

interface TextThemeType {
  fontColor: string;
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

const Text = styled.Text<TextType>`
  font-size: 14px;
  color: ${({ theme }): string => theme.fontColor};
`;

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
    isDisabled,
    activeOpacity,
    onClick,
  } = props;

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
