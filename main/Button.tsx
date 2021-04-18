import {
  ActivityIndicator,
  LayoutRectangle,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import type {
  StyleProp,
  TextProps,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {DoobooTheme, light} from './theme';

import type {FC} from 'react';
import styled from '@emotion/native';
import {useHover} from 'react-native-web-hooks';
import {withTheme} from './theme/ThemeProvider';

type Styles = {
  container?: StyleProp<ViewStyle>;
  text?: StyleProp<TextStyle>;
  disabledButton?: StyleProp<ViewStyle>;
  disabledText?: StyleProp<TextStyle>;
  hovered?: StyleProp<ViewStyle>;
};

const Container = styled.View`
  align-self: stretch;
  padding: 8px 12px;
  background-color: ${({theme}) => theme.primary || light.primary};

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 14px;
  color: white;
`;

export interface ButtonProps {
  testID?: string;
  indicatorColor?: string;
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  styles?: Styles;
  leftElement?: React.ReactElement;
  rightElement?: React.ReactElement;
  activeOpacity?: TouchableOpacityProps['activeOpacity'];
  text?: string;
  onPress?: TouchableOpacityProps['onPress'];
  touchableOpacityProps?: Partial<TouchableOpacityProps>;
  textProps?: Partial<TextProps>;
}

const Component: FC<ButtonProps & {theme: DoobooTheme}> = ({
  testID,
  theme,
  disabled,
  loading,
  style,
  styles,
  indicatorColor = theme.contrastText,
  leftElement,
  rightElement,
  activeOpacity = 0.7,
  text,
  onPress,
  touchableOpacityProps,
  textProps,
}) => {
  const ref = useRef<TouchableOpacity>(null);
  const hovered = useHover(ref);
  const [layout, setLayout] = useState<LayoutRectangle>();

  const compositeStyles: Styles = {
    disabledButton: {
      backgroundColor: theme.disabled,
      borderColor: theme.primary,
    },
    disabledText: {
      color: theme.disabledText,
    },
    hovered: {
      borderColor: theme.primary,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.24,
      shadowRadius: 16,
      elevation: 10,
    },
    ...styles,
  };

  return (
    <TouchableOpacity
      testID={testID}
      ref={Platform.select({
        web: ref,
        default: undefined,
      })}
      activeOpacity={activeOpacity}
      onPress={onPress}
      delayPressIn={50}
      disabled={disabled}
      style={style}
      {...touchableOpacityProps}>
      {loading ? (
        <Container
          testID="loading-view"
          style={[
            compositeStyles.container,
            {
              width: layout?.width,
              height: layout?.height,
            },
            hovered && !disabled && compositeStyles.hovered,
            disabled && compositeStyles.disabledButton,
          ]}>
          <ActivityIndicator size="small" color={indicatorColor} />
        </Container>
      ) : (
        <Container
          testID="button-view"
          style={[
            compositeStyles.container,
            hovered && !disabled && compositeStyles.hovered,
            disabled && compositeStyles.disabledButton,
          ]}
          onLayout={(e) => setLayout(e.nativeEvent.layout)}>
          {leftElement}
          <Text
            style={[
              compositeStyles.text,
              disabled && compositeStyles.disabledText,
            ]}
            {...textProps}>
            {text}
          </Text>
          {rightElement}
        </Container>
      )}
    </TouchableOpacity>
  );
};

Component.defaultProps = {theme: light};

export const Button = withTheme(Component);
