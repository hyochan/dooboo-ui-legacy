import { DefaultTheme } from 'styled-components/native';

export enum ThemeType {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

const colors = {
  clearBlue: '#29bdff',
  dark: '#09071d',
  paperWhite: '#f8f8f8',
  paperDark: '#22202f',
};

export const light = {
  brand: colors.clearBlue,
  brandLight: '#2973FF',
  title: colors.clearBlue,
  background: '#FFFFFF',
  backgroundPaper: colors.paperWhite,
  disabled: '#E5E5E5',
  gray: '#9A9AA0',
  fontPrimary: colors.dark,
  font: '#2E2E2E',
  good: '#50E3C2',
  warning: '#FC540A',
  error: '#E86459',
  underline: 'rgb(229, 229, 229)',
};

export type Theme = typeof light;

export const dark = {
  brand: colors.dark,
  brandLight: '#29BDFF',
  title: colors.dark,
  background: colors.dark,
  backgroundPaper: colors.paperDark,
  disabled: '#969696',
  gray: '#E5E5E5',
  fontPrimary: '#FFFFFF',
  font: '#FFFFFF',
  good: '#50E3C2',
  warning: '#FC540A',
  error: '#E86459',
  underline: 'rgba(229, 229, 229, 0.3)',
};

export const theme = {
  light,
  dark,
};

export interface ThemeParam {
  light: Partial<Theme>;
  dark: Partial<Theme>;
}

export const createDoobooTheme = (
  themes: ThemeParam = {
    light,
    dark,
  },
  type?: ThemeType,
): Partial<Theme> & Partial<DefaultTheme> => {
  switch (type) {
    case ThemeType.LIGHT:
      return { ...theme.light, ...themes.light };
    case ThemeType.DARK:
      return { ...theme.dark, ...themes.dark };
  }
  return theme.light;
};
