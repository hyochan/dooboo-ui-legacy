# Theme

> The `theme` module easily provides ability to make `light` and `dark` theme.

[![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/theme.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/theme)
[![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/theme.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/theme)

![theme](https://user-images.githubusercontent.com/27461460/69912924-08864300-1474-11ea-90aa-e815063fe7e6.gif)

## Installation

1. Install via yarn or npm.
   `npm install @dooboo-ui/theme` or `yarn add @dooboo-ui/theme`.

2. Import

   ```ts
   import {ThemeProvider} from '@dooboo-ui/theme';
   ```

3. Create `light` and `dark` theme

   ```ts
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
   };

   export const light = {
     background: colors.white,
     primary: colors.helioTrope,
     primaryLight: colors.mauve,
     primaryDark: colors.fuchsiaBlue,
     secondary: colors.eastBay,
     secondaryLight: colors.scampi,
     secondaryDark: colors.downRiver,
     tertiary: colors.downRiver,
     tertiaryLight: colors.magicMint,
     tertiaryDark: colors.babyBlue,
     positive: colors.aquaMarine,
     negative: colors.salmon,
     text: colors.mineShaftDark,
     primaryText: colors.charcoalGray,
     secondaryText: colors.brownGray,
     conntrastBackground: colors.darkGray,
     contrastText: colors.white,
     dialog: colors.lightGray,
     disabled: colors.mediumGray,
     placeholder: colors.lightGray,
     paper: colors.paleViolet,
     appleIcon: colors.apple,
     appleText: colors.apple,
     appleBackground: colors.light,
     facebookIcon: colors.light,
     facebookText: colors.light,
     facebookBackground: colors.facebook,
     googleIcon: colors.light,
     googleText: colors.light,
     googleBackground: colors.google,
   };

   export type Theme = typeof light;

   export const dark = {
     background: colors.mineShaftDark,
     primary: colors.helioTrope,
     primaryLight: colors.fuchsiaBlue,
     primaryDark: colors.mauve,
     secondary: colors.downRiver,
     secondaryLight: colors.scampi,
     secondaryDark: colors.eastBay,
     tertiary: colors.downRiver,
     tertiaryLight: colors.babyBlue,
     tertiaryDark: colors.magicMint,
     positive: colors.aquaMarine,
     negative: colors.salmon,
     text: colors.white,
     primaryText: colors.white,
     secondaryText: colors.brownGray,
     contrastBackground: colors.white,
     contrastText: colors.mineShaftDark,
     dialog: colors.lightGray,
     disabled: colors.mediumGray,
     placeholder: colors.lightGray,
     paper: colors.mineShaft,
     appleIcon: colors.apple,
     appleText: colors.apple,
     appleBackground: colors.light,
     facebookIcon: colors.light,
     facebookText: colors.light,
     facebookBackground: colors.facebook,
     googleIcon: colors.light,
     googleText: colors.light,
     googleBackground: colors.google,
   };
   ```

4. Wrap your component with `ThemeProvider` with given customTheme.
   ```tsx
   <ThemeProvider customTheme={{light, dark}}>
     <App />
   </ThemeProvider>
   ```

## Usage

1. Import `useThemeContext`

   ```ts
   import {useThemeContext} from '@dooboo-ui/theme';
   ```

2. Retrive theme.

   ```ts
   const {theme} = useThemeContext();
   ```

3. Use it in style.

   ```ts
   {
     backgroundColor: theme.background,
     borderBottomColor: theme.primaryLight,
   }
   ```

4. Also availabe with `styled-components`.
   ```ts
   const StyledContainer = styled.SafeAreaView`
     flex: 1;
     background-color: ${({theme}): string => theme.background};
     flex-direction: column;
     align-items: center;
   `;
   ```

## Typescript with `styled-components`

> Inside `src` dir, add `styled.d.ts`.

```ts
import 'styled-components';
import {DoobooTheme} from '@dooboo-ui/theme';
import {Theme} from './theme';

type AllTheme = Theme & DoobooTheme;

interface CustomTheme extends AllTheme {
  background: string;
}

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {
    background: string;
  }
}
```

## Default colors

> Although you can extend your colors, above variables are defined as defaulted.
