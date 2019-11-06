import { ThemeProps } from 'styled-components';

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

interface ThemeType extends ButtonThemeType, TextThemeType {
  [key: string]: any;
}

interface StatefulThemeType extends ThemeType {
  INVERTED: ThemeType;
  DISABLED: ThemeType;
}
