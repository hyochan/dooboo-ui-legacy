export enum ThemeType {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export const colors = {
  helioTrope: '#9A77FF',
  mauve: '#cfa7ff',
  fuchsiaBlue: '#664acb',
  eastBay: '#3d3f77',
  scampi: '#6b6aa6',
  downRiver: '#0c194b',
  magicMint: '#a5f4cc',
  babyBlue: '#d8ffff',
  deYork: '#74c19b',
  aquaMarine: '#44D1A6',
  salmon: '#FF7676',
  charcoalGray: '#48454D',
  brownGray: '#999999',
  white: '#FFFFFF',
  black: '#000000',
  darkGray: '#00000070',
  mediumGray: '#00000030',
  lightGray: '#CFCED0',
  paleViolet: '#F2F2F2',
  mineShaftDark: '#222222',
  mineShaft: '#333333',
  light: '#F3F3F3',
  negative: '#ff7676',
  apple: '#151E22',
  google: '#E04238',
  facebook: '#345997',
  success: '#00BA90',
};

export type Colors = typeof colors;

export const light = {
  background: '#FFFFFF',
  paper: '#EAEBF4',
  primary: '#393D7A',
  accent: '#B446BF',
  link: '#393D7A',
  heading: '#393D7A',
  titleText: '#000000',
  subText: '#404040',
  text: '#000000',
  textContrast: '#D3D8E8',
  disabled: colors.mediumGray,
  border: '#EDEDED',
  placeholder: '#999999',
};

export type Theme = typeof light;

export const dark = {
  background: '#232323',
  paper: '#2C2C2C',
  primary: '#8A96DC',
  accent: '#8A96DC',
  link: '#E0E0E0',
  heading: '#FFFFFF',
  titleText: '#8A96DC',
  subText: '#D3D8E8',
  text: '#D3D8E8',
  textContrast: '#000000',
  disabled: colors.mediumGray,
  border: '#333333',
  placeholder: '#444444',
};

export const theme = {
  light,
  dark,
};
