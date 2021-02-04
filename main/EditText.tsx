import {Platform, Text, TextInput, View} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Theme, light} from './theme';

import {useHover} from 'react-native-web-hooks';
import {withTheme} from './theme/ThemeProvider';

type Styles = {
  container?: StyleProp<ViewStyle>;
  hovered?: StyleProp<ViewStyle>;
  labelText?: StyleProp<TextStyle>;
  labelTextHovered?: StyleProp<TextStyle>;
  input?: StyleProp<TextStyle>;
  errorText?: StyleProp<TextStyle>;
};

export type EditTextProps = {
  testID?: TextInputProps['testID'];
  theme?: Theme;
  textInputProps?: TextInputProps;
  style?: StyleProp<ViewStyle>;
  styles?: Styles;
  labelText?: string;
  errorText?: string;
  value?: TextInputProps['value'];
  onChange?: TextInputProps['onChange'];
  onChangeText?: TextInputProps['onChangeText'];
  placeholder?: TextInputProps['placeholder'];
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  onFocus?: TextInputProps['onFocus'] | undefined;
  onBlur?: TextInputProps['onBlur'] | undefined;
  editable?: TextInputProps['editable'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: TextInputProps['secureTextEntry'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  focusColor?: string;
  errorColor?: string;
  disableColor?: string;
  type?: 'row' | 'column';
};

const Component: FC<EditTextProps & {theme: Theme}> = ({
  theme,
  testID,
  textInputProps,
  style,
  styles,
  labelText = '',
  errorText = '',
  value = '',
  placeholder,
  placeholderTextColor,
  onChange,
  onChangeText,
  onFocus,
  onBlur,
  autoCapitalize = 'none',
  secureTextEntry = false,
  editable = true,
  focusColor = theme.primary,
  errorColor = theme.negative,
  disableColor = theme.disabled,
  type = 'row',
}) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef<View>(null);

  const borderColor = disableColor;
  const labelColor = disableColor;
  const hoveredColor = theme.primary;
  const textColor = theme.text;

  const compositeStyles: Styles =
    type === 'row'
      ? {
          container: [
            {
              alignSelf: 'stretch',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 0.3,
              borderBottomColor: borderColor,
            },
            styles?.container,
          ],
          hovered: [
            {
              borderBottomWidth: 0.5,
              borderBottomColor: hoveredColor,
            },
            styles?.hovered,
          ],
          labelText: [
            {
              fontSize: 14,
              color: labelColor,
              width: 100,
            },
            styles?.labelText,
          ],
          labelTextHovered: [
            {
              color: hoveredColor,
            },
            styles?.labelTextHovered,
          ],
          input: [
            {
              paddingVertical: 12,
              paddingHorizontal: 8,
              fontSize: 14,
              fontWeight: 'bold',
              flex: 1,
              color: textColor,
            },
            styles?.input,
          ],
          errorText: [
            {
              marginTop: 4,
              fontSize: 12,
              color: errorColor,
            },
            styles?.errorText,
          ],
        }
      : {
          container: [
            {
              alignSelf: 'stretch',
              justifyContent: 'space-between',
              borderBottomWidth: 0.3,
              borderBottomColor: borderColor,

              flexDirection: 'column',
            },
            styles?.container,
          ],
          hovered: [
            {
              borderBottomWidth: 0.3,
              borderBottomColor: hoveredColor,
            },
            styles?.hovered,
          ],
          labelText: [
            {
              fontSize: 14,
              color: labelColor,
            },
            styles?.labelText,
          ],
          labelTextHovered: [
            {
              color: hoveredColor,
            },
            styles?.labelTextHovered,
          ],
          input: [
            {
              paddingVertical: 12,
              fontSize: 14,
              fontWeight: 'bold',
              color: textColor,
            },
            styles?.input,
          ],
          errorText: [
            {
              marginTop: 8,
              fontSize: 12,
              color: errorColor,
            },
            styles?.errorText,
          ],
        };

  const hovered = useHover(ref);

  return (
    <View
      testID="container-id"
      ref={Platform.select({
        web: ref,
        default: undefined,
      })}
      style={[
        editable && hovered && [compositeStyles.hovered, styles?.hovered],
        {alignSelf: 'stretch', flexDirection: 'column'},
        style,
      ]}>
      <View
        style={[
          compositeStyles.container,
          {
            borderColor: errorText
              ? errorColor
              : focused
              ? focusColor
              : disableColor,
            borderBottomColor: errorText
              ? errorColor
              : focused
              ? focusColor
              : disableColor,
          },
        ]}>
        {labelText ? (
          <Text
            style={[
              compositeStyles.labelText,
              styles?.labelText,
              editable && hovered
                ? [compositeStyles.labelTextHovered, styles?.labelTextHovered]
                : {
                    color: errorText
                      ? errorColor
                      : focused
                      ? focusColor
                      : disableColor,
                  },
            ]}>
            {labelText}
          </Text>
        ) : null}
        <TextInput
          {...textInputProps}
          testID={testID}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          style={[
            compositeStyles.input,
            styles?.input,
            // @ts-ignore
            Platform.OS === 'web' && {outlineWidth: 0},
          ]}
          editable={editable}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          onChange={onChange}
          onChangeText={onChangeText}
        />
      </View>
      {errorText ? (
        <Text
          style={[
            compositeStyles.errorText,
            styles?.errorText,
            {color: errorColor},
          ]}>
          {errorText}
        </Text>
      ) : null}
    </View>
  );
};

Component.defaultProps = {theme: light};

export const EditText = withTheme(Component);
