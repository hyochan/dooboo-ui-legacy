import type {FC, ReactElement} from 'react';
import {ThemeType, useTheme} from './theme';

import React from 'react';
import {StatusBar} from 'react-native';
import type {StatusBarStyle} from 'react-native';

type Props = {
  themeType?: ThemeType;
};

/**
 * This component should be rendered inside `ThemeProvider` provided by `dooboo-ui`.
 */

const StatusBarBrightness: FC<Props> = ({themeType}): ReactElement => {
  const {themeType: currentThemeType} = useTheme();

  const statusColor: StatusBarStyle =
    (themeType || currentThemeType) === ThemeType.LIGHT
      ? 'dark-content'
      : 'light-content';

  return <StatusBar barStyle={statusColor} />;
};

export {StatusBarBrightness};
