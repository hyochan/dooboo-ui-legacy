import {Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import type {StyleProp, TextInputProps, ViewStyle} from 'react-native';

import {useHover} from 'react-native-web-hooks';

const defaultStyle: ViewStyle = {
  alignSelf: 'stretch',

  flexDirection: 'column',
};

const defaultRowStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: '#666666',
  },
  hovered: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#9A77FF',
  },
  labelText: {
    fontSize: 14,
    color: '#b9b9c4',
    width: 100,
  },
  labelTextHovered: {
    color: '#9A77FF',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    color: '#2c374e',
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: '#991111',
  },
});

const defaultColumnStyles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    borderBottomColor: '#666666',

    flexDirection: 'column',
  },
  hovered: {
    borderBottomWidth: 0.3,
    borderBottomColor: '#9A77FF',
  },
  labelText: {
    fontSize: 14,
    color: '#b9b9c4',
  },
  labelTextHovered: {
    color: '#9A77FF',
  },
  input: {
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c374e',
  },
  errorText: {
    marginTop: 8,
    fontSize: 12,
    color: '#991111',
  },
});

type StylesType = Partial<StyleSheet.NamedStyles<typeof defaultRowStyles>>;

type Props = {
  testID?: TextInputProps['testID'];
  textInputProps?: TextInputProps;
  style?: StyleProp<ViewStyle>;
  styles?: StylesType;
  labelText?: string;
  errorText?: string;
  value?: TextInputProps['value'];
  onChange?: TextInputProps['onChange'];
  onChangeText?: TextInputProps['onChangeText'];
  placeholder?: TextInputProps['placeholder'];
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  onFocus?: TextInputProps['onFocus'];
  onBlur?: TextInputProps['onBlur'];
  editable?: TextInputProps['editable'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  secureTextEntry?: TextInputProps['secureTextEntry'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  focusColor?: string;
  errorColor?: string;
  disableColor?: string;
  type?: 'row' | 'column';
};

const EditText: FC<Props> = ({
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
  focusColor = '#9A77FF',
  errorColor = '#ff7676',
  disableColor = '#999999',
  type = 'column',
}) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef<View>(null);

  const defaultStyles = type === 'row' ? defaultRowStyles : defaultColumnStyles;
  const hovered = useHover(ref);

  return (
    <View
      ref={ref}
      style={[
        editable && hovered && [defaultStyles.hovered, styles?.hovered],
        defaultStyle,
        style,
      ]}>
      <View
        style={[
          defaultStyles.container,
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
              defaultStyles.labelText,
              styles?.labelText,
              editable && hovered
                ? [defaultStyles.labelTextHovered, styles?.labelTextHovered]
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
            defaultStyles.input,
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
            defaultStyles.errorText,
            styles?.errorText,
            {color: errorColor},
          ]}>
          {errorText}
        </Text>
      ) : null}
    </View>
  );
};

export {EditText};
