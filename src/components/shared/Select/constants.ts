import { Dimensions } from 'react-native';
import { css } from 'styled-components/native';

export const COLOR = {
  WHITE: '#ffffff',
  DODGERBLUE: '#5364ff',
  VERYLIGHTGRAY: '#cccccc',
  LIGHTGRAY: '#c8c8c8',
  BLUE: '#0000ff',
  STRONGBLUE: '#069ccd',
  GRAY3: '#080808',
  GRAY7: '#121212',
  GRAY59: '#969696',
  GRAY75: '#757575',
  DARK: '#09071d',
  LIGHTBLUE: '#bcdbfb',
  DEEPBLUE: '#b0d0ff',
  BLACK: '#000000',
  TRANSPARENT: 'transparent',
};

export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get(
  'screen',
);
export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get(
  'window',
);
export const ITEM_HEIGHT = 40;
export const LIST_WIDTH = SCREEN_WIDTH * 0.8;
export const LIST_MAX_HEIGHT = SCREEN_HEIGHT * 0.8;
export const PICKER_LIST_HEIGHT = 240;

export const FONT_SIZE = 14;

export const BOX_SHADOW = css`
  box-shadow: 3px 2px 4px ${COLOR.DODGERBLUE};
  shadow-opacity: 0.5;
  elevation: 10;
`;

export enum ThemeEnum {
  disabled = 'disabled',
  blank = 'blank',
  none = 'none',
  box = 'box',
  underbar = 'underbar',
}

export enum Mode {
  dropdown = 'dropdown',
  dialog = 'dialog',
  picker = 'picker',
}
