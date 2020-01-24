# Theme

> The `theme` module easily provides ability to make `light` and `dark` theme.

[![Npm Version](http://img.shields.io/npm/v/@dooboo-ui/native-theme.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-theme)
[![Downloads](http://img.shields.io/npm/dm/@dooboo-ui/native-switch-toggle.svg?style=flat-square)](https://npmjs.org/package/@dooboo-ui/native-theme)

![theme](https://user-images.githubusercontent.com/27461460/69912924-08864300-1474-11ea-90aa-e815063fe7e6.gif)

## Installation

1. Install via yarn or npm.
   `npm install @dooboo-ui/theme` or `yarn add @dooboo-ui/native`.

2. Import

   ```ts
   import { ThemeProvider } from '@dooboo-ui/native-theme';
   ```

3. Create `light` and `dark` theme

   ```ts
   export const colors = {
     whiteGray: '#f7f6f3',
     dusk: 'rgb(65,77,107)',
     dodgerBlue: 'rgb(58,139,255)',
     skyBlue: 'rgb(100,199,255)',
     mellowBlue: '#80b8f0',
     green: 'rgb(29,211,168)',
     greenBlue: 'rgb(36,205,151)',
     greenishCyan: '#50e3c2',
     mediumGray: 'rgb(134,154,183)',
     paleGray: 'rgb(221,226,236)',
     lightBackground: '#ffffff',
     lightBackgroundLight: '#f7f6f3',
     darkBackground: '#323739',
     darkBackgroundLight: '#393241',
     cloudyBlue: 'rgb(175,194,219)',
     lightSalmon: '#f5aeae',
     google: 'rgb(224,66,56)',
     facebook: 'rgb(52,89,151)',
   };

   export const light = {
     background: colors.lightBackground,
     backgroundDark: colors.dodgerBlue,
     btnPrimary: colors.dodgerBlue,
     btnPrimaryFont: 'white',
     btnPrimaryLight: 'white',
     btnPrimaryLightFont: colors.dodgerBlue,
     textDisabled: '#969696',
     btnDisabled: 'rgb(224,224,224)',
     fontColor: 'black',
     fontSubColor: colors.dusk,
     labelColor: colors.mediumGray,
     tintColor: colors.dodgerBlue,
     lineColor: colors.paleGray,
     indicatorColor: colors.dodgerBlue,
     inactiveColor: '#a3a3a3',
     primary: colors.dodgerBlue,
     primaryLight: colors.skyBlue,
     searchBackground: 'rgb(247,248,251)',
     status: colors.greenishCyan,
     placeholder: colors.cloudyBlue,
     focused: colors.dodgerBlue,
     placeholderFocused: colors.mellowBlue,
   };

   export type Theme = typeof light;

   export const dark = {
     background: colors.darkBackground,
     backgroundDark: '#262A2C',
     btnPrimary: '#262A2C',
     btnPrimaryFont: 'white',
     btnPrimaryLight: '#696969',
     btnPrimaryLightFont: '#262A2C',
     textDisabled: '#969696',
     btnDisabled: 'rgb(224,224,224)',
     fontColor: 'white',
     fontSubColor: colors.paleGray,
     labelColor: colors.mediumGray,
     tintColor: '#a3a3a3',
     lineColor: '#515557',
     indicatorColor: 'white',
     inactiveColor: colors.paleGray,
     primary: '#1F2324',
     primaryLight: '#262A2C',
     searchBackground: '#243447',
     status: colors.greenishCyan,
     placeholder: colors.cloudyBlue,
     focused: 'lightcoral',
     placeholderFocused: colors.lightSalmon,
   };
   ```

4. Wrap your component with `ThemeProvider` with given customTheme.
   ```tsx
   <ThemeProvider customTheme={{ light, dark }}>
     <App />
   </ThemeProvider>
   ```

## Usage

1. Import `useThemeContext`

   ```ts
   import { useThemeContext } from '@dooboo-ui/native-theme';
   ```

2. Retrive theme.

   ```ts
   const { theme } = useThemeContext();
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
     background-color: ${({ theme }): string => theme.background};
     flex-direction: column;
     align-items: center;
   `;
   ```

## Typescript with `styled-components`

> Inside `src` dir, add `styled.d.ts`.

```ts
import 'styled-components';
import { DoobooTheme } from '@dooboo-ui/native-theme';
import { Theme } from './theme';

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

- colors

  | param           | light   | dark                 |
  | --------------- | ------- | -------------------- |
  | brand           | #29BDFF | #09071D              |
  | brandLight      | #2973FF | #29BDFF              |
  | title           | #29BDFF | #09071D              |
  | background      | #FFFFFF | #09071D              |
  | backgroundPaper | #F8F8F8 | #22202F              |
  | disabled        | #E5E5E5 | #969696              |
  | gray            | #9A9AA0 | #E5E5E5              |
  | fontPrimary     | #09071D | #FFFFFF              |
  | font            | #2E2E2E | #FFFFFF              |
  | good            | #50E3C2 | #50E3C2              |
  | warning         | #FC540A | #FC540A              |
  | error           | #E86459 | #E86459              |
  | underline       | #E5E5E5 | rgb(229,229,229,0.3) |
