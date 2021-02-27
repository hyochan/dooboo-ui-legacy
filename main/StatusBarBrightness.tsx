import {Theme, ThemeType, useTheme, withTheme} from './theme';

import type {FC} from 'react';
import React from 'react';
import {StatusBar} from 'react-native';
import type {StatusBarStyle} from 'react-native';

type Props = {};

/**
 * This component should be rendered inside `ThemeProvider` provided by `dooboo-ui`.
 */

const Component: FC<Props & {theme?: Theme; themeType?: ThemeType}> = ({
  themeType,
}) => {
  const {themeType: currentThemeType} = useTheme();

  const statusColor: StatusBarStyle =
    (themeType || currentThemeType) === ThemeType.LIGHT
      ? 'dark-content'
      : 'light-content';

  return <StatusBar barStyle={statusColor} />;
};

Component.defaultProps = {themeType: ThemeType.LIGHT};

export const StatusBarBrightness = withTheme(Component);
