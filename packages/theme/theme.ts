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
  white2: 'rgba(237, 237, 237, 0.2)',
  white1: 'rgba(255, 255, 255, 0.7)',
  white0: 'rgba(255, 255, 255, 0.6)',
  primary9: '#506FD6',
  primary8: '#5f88ea',
  primary7: '#6397F9',
  primary6: '#6DA6FC',
  primary5: '#76B1FF',
  primary4: '#9AC7FF',
  primary3: '#A1CBFF',
  primary2: '#c4dfff',
  primary1: '#e6f2ff',
  dark7: '#1B1B21',
  dark6: '#1E1E1E',
  dark5: '#252525',
  dark4: '#272727',
  dark3: '#2F2F2F',
  dark2: '#353535',
  dark1: '#383838',
  gray9: '#4F4F4F',
  gray8: '#323C47',
  gray7: '#707683',
  gray6: '#90A0B7',
  gray5: '#CBD7E5',
  gray4: '#BDBDBD',
  gray3: '#F2F2F2',
  gray2: '#E0E0E0',
  gray1: '#ECF0F5',
  gray0: '#E5E5E5',
  red4: '#D84910',
  red3: '#DD4B39',
  red2: '#DE5250',
  red1: '#E54E4E',
  red0: '#FCEDE8',
  green1: '#009C36',
  green0: '#E7FAEB',
  blue2: '#3B5998',
  blue1: '#609FFF',
  blue0: '#109CF1',
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
  layout: colors.gray0,
  btnPrimary: colors.blue1,
  btnGoogle: colors.red2,
  btnFacebook: colors.blue2,
  btnFont: '#FFFFFF',
  btnGray: colors.gray5,
  btnWhite: '#ffffff',
  text: colors.gray7,
  whiteText: '#ffffff',
  blueText: colors.blue1,
  darkText: colors.dark7,
  grayText: colors.gray7,
  line: colors.gray1,
  darkLine: colors.gray6,
  thickLine: colors.primary6,
  mediumLine: colors.primary8,
  border: '#EDEDED',
  grayBorder0: colors.gray1,
  grayBorder1: colors.gray2,
  grayBorder2: colors.gray4,
  grayBorder3: colors.gray5,
  disableColor: colors.white2,
  warnBackground: colors.red0,
  warnColor: colors.red4,
  tealBackGround: colors.green0,
  tealColor: colors.green1,
  labelInput: {
    border: colors.gray2,
    label: colors.gray8,
    background: '#FFFFFF',
  },
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
  layout: colors.dark6,
  btnPrimary: colors.primary5,
  btnGoogle: colors.red2,
  btnFont: colors.dark6,
  btnFacebook: colors.primary9,
  btnGray: colors.dark1,
  btnWhite: colors.dark1,
  text: colors.white1,
  whiteText: colors.white1,
  blueText: colors.primary5,
  darkText: colors.white1,
  grayText: colors.white1,
  line: colors.white1,
  darkLine: colors.gray5,
  thickLine: colors.primary5,
  mediumLine: colors.primary8,
  border: '#EDEDED',
  grayBorder0: colors.gray1,
  grayBorder1: colors.gray2,
  grayBorder2: colors.gray4,
  grayBorder3: colors.gray5,
  disableColor: colors.white2,
  warnBackground: colors.red0,
  warnColor: colors.red4,
  tealBackGround: colors.green0,
  tealColor: colors.green1,
  labelInput: {
    border: colors.white0,
    label: colors.white0,
    background: colors.dark6,
  },
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
): Partial<DefaultTheme> => {
  switch (type) {
    case ThemeType.LIGHT:
      return { ...theme.light, ...themes.light };
    case ThemeType.DARK:
      return { ...theme.dark, ...themes.dark };
  }
};
