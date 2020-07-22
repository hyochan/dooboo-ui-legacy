
const COLOR: {
  [key: string]: string;
} = {
  WHITE: '#ffffff',
  DODGERBLUE: '#3a8bff',
  VERYLIGHTGRAY: '#cccccc',
  LIGHTGRAY: '#c8c8c8',
  BLUE: '#0000ff',
  LIGHTBLUE: '#c9e9fc',
  STRONGBLUE: '#069ccd',
  GRAY3: '#080808',
  GRAY7: '#121212',
  GRAY59: '#969696',
};

interface ThemeType {
  backgroundColor: string;
  borderColor: string;
  fontColor: string;
}
interface StatefulThemeType extends ThemeType {
  INVERTED: ThemeType;
  DISABLED: ThemeType;
}

export const THEME: {
  LIGHT: StatefulThemeType;
  DARK: StatefulThemeType;
} = {
  LIGHT: {
    backgroundColor: COLOR.WHITE,
    borderColor: COLOR.LIGHTGRAY,
    fontColor: COLOR.GRAY7,
    INVERTED: {
      backgroundColor: COLOR.WHITE,
      borderColor: COLOR.LIGHTGRAY,
      fontColor: COLOR.GRAY7,
    },
    DISABLED: {
      backgroundColor: COLOR.VERYLIGHTGRAY,
      borderColor: COLOR.LIGHTGRAY,
      fontColor: COLOR.GRAY59,
    },
  },
  DARK: {
    backgroundColor: COLOR.GRAY7,
    borderColor: COLOR.LIGHTGRAY,
    fontColor: COLOR.WHITE,
    INVERTED: {
      backgroundColor: COLOR.GRAY59,
      borderColor: COLOR.LIGHTGRAY,
      fontColor: COLOR.WHITE,
    },
    DISABLED: {
      backgroundColor: COLOR.VERYLIGHTGRAY,
      borderColor: COLOR.LIGHTGRAY,
      fontColor: COLOR.GRAY59,
    },
  },
};
