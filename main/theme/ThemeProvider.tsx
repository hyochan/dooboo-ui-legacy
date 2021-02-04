import {
  DefaultTheme,
  ThemeProvider as OriginalThemeProvider,
  withTheme,
} from 'styled-components/native';
import React, {useEffect, useState} from 'react';
import {ThemeType, colors, dark, light} from './index';

import {Appearance} from 'react-native';
import type {Colors} from './index';
import createCtx from './createCtx';
import {useMediaQuery} from 'react-responsive';

interface Context {
  themeType: ThemeType;
  media: {
    isDesktop: boolean;
    isTablet: boolean;
    isMobile: boolean;
  };
  theme: DefaultTheme;
  changeThemeType: () => void;
  colors: Colors;
}

const [useCtx, Provider] = createCtx<Context>();

interface Props {
  children?: React.ReactElement;
  // Using initial ThemeType is essential while testing apps with consistent ThemeType
  initialThemeType?: ThemeType;
}

function ThemeProvider({
  children,
  initialThemeType,
}: Props): React.ReactElement {
  const isMobile = useMediaQuery({maxWidth: 767});
  const isTablet = useMediaQuery({minWidth: 767, maxWidth: 992});
  const isDesktop = useMediaQuery({minWidth: 992});

  const [themeType, setThemeType] = useState(
    initialThemeType || ThemeType.LIGHT,
  );

  useEffect(() => {
    const listener = ({colorScheme}): void => {
      setThemeType(colorScheme === 'light' ? ThemeType.LIGHT : ThemeType.DARK);
    };

    Appearance.addChangeListener(listener);

    return function cleanup() {
      Appearance.removeChangeListener(listener);
    };
  }, []);

  const changeThemeType = (): void => {
    const newThemeType =
      themeType === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;

    setThemeType(newThemeType);
  };

  const defaultTheme = themeType === ThemeType.DARK ? dark : light;

  const media = {
    isMobile,
    isTablet,
    isDesktop,
  };

  const theme: DefaultTheme = {...defaultTheme, ...media};

  return (
    <Provider
      value={{
        media,
        themeType,
        changeThemeType,
        theme: defaultTheme,
        colors,
      }}>
      <OriginalThemeProvider theme={theme}>{children}</OriginalThemeProvider>
    </Provider>
  );
}

export {useCtx as useTheme, ThemeProvider, ThemeType, withTheme};
