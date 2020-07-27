import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Platform,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { ReactElement, useState } from 'react';

import styled from 'styled-components/native';

const RowContainer = styled.View`
  flex-direction: column;
  align-self: stretch;
`;

const StyledRowContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledRowLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #b9b9c4;
`;

const StyledRowInput = styled.TextInput`
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 14px;
  font-weight: bold;
  flex: 1;
  height: 100%;
  color: #2c374e;
  ${Platform.OS === 'web' && { 'outline-style': 'none' }}
`;

const ColumnContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-self: stretch;
`;

const StyledLine = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const StyledLabel = styled.Text`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #b9b9c4;
`;

const StyledIcon = styled.View`
  align-items: center;
  justify-content: center;
`;

const StyledTextInput = styled.TextInput`
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 15px;
  font-weight: 500;
  ${Platform.OS === 'web' && { 'outline-style': 'none' }}
`;

const StyledInvalidText = styled.Text`
  margin: 0px 2px;
  font-size: 12px;
  font-weight: 500;
  margin-top: 5px;
  color: #ff8989;
`;

interface Props {
  testID?: string;
  errorTestID?: string;
  type?: string;
  isRow?: boolean;
  style?: ViewStyle;
  label?: string;
  labelTextStyle?: TextStyle;
  labelWidth?: number;
  value?: TextInputProps['value'];
  inputContainerType?: string;
  inputContainerRadius?: number;
  borderStyle?: ViewStyle;
  borderWidth?: number;
  borderColor?: string;
  textStyle?: TextStyle;
  placeholder?: TextInputProps['placeholder'];
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  secureTextEntry?: TextInputProps['secureTextEntry'];
  onChangeText?: TextInputProps['onChangeText'];
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  leftElement?: ReactElement;
  leftElementStyle?: ViewStyle;
  rightElement?: ReactElement;
  rightElementStyle?: ViewStyle;
  focusedLabelStyle?: TextStyle;
  focusedBorderWidth?: number;
  focusColor?: string;
  errorColor?: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  textInputProps?: TextInputProps | any;
  onFocus?: () => void;
  onBlur?: () => void;
  errorText?: string;
  errorTextStyle?: TextStyle;
  keyboardType?: KeyboardTypeOptions;
  numberOfLines?: number;
  multiline?: boolean;
}

export enum EditTextInputType {
  DEFAULT = 'default',
  ROW = 'row',
  BOX = 'box',
  ROW_BOX = 'rowBox',
}

function EditText(props: Props): ReactElement {
  const [focused, setFocus] = useState(false);

  const {
    testID,
    errorTestID,
    type = EditTextInputType.DEFAULT,
    style,
    label,
    labelTextStyle,
    labelWidth = 110,
    value,
    borderStyle,
    borderWidth = 0.6,
    borderColor = '#eaeaf9',
    textStyle = Platform.select({
      ios: {
        paddingVertical: 16,
      },
      android: {
        paddingVertical: 10,
      },
    }),
    placeholder,
    placeholderTextColor,
    secureTextEntry,
    onChangeText,
    onSubmitEditing,

    rightElement,
    rightElementStyle,
    focusedLabelStyle = { fontWeight: 'bold' },
    focusedBorderWidth = 1,
    focusColor = '#79B3F5',
    errorColor = '#FF8989',
    autoCapitalize = 'none',
    textInputProps,
    onFocus,
    onBlur,
    errorText,
    errorTextStyle,
    keyboardType,
    numberOfLines,
    multiline = false,
  } = props;

  switch (type) {
    case EditTextInputType.DEFAULT:
    default:
      return (
        <ColumnContainer style={style}>
          <StyledLabel
            style={[
              labelTextStyle,
              errorText
                ? { color: errorColor }
                : focused
                  ? [{ color: focusColor }, focusedLabelStyle]
                  : null,
            ]}
          >
            {label}
          </StyledLabel>
          <StyledTextInput
            {...textInputProps}
            testID={testID}
            autoCapitalize={autoCapitalize}
            onFocus={(): void => {
              setFocus(true);
              onFocus && onFocus();
            }}
            onBlur={(): void => {
              setFocus(false);
              onBlur && onBlur();
            }}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            style={textStyle}
            numberOfLines={numberOfLines}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            onSubmitEditing={onSubmitEditing}
            multiline={multiline}
          />
          {borderWidth ? (
            <StyledLine
              style={[
                borderStyle,
                { borderBottomWidth: borderWidth, borderColor: borderColor },
                errorText
                  ? { borderColor: errorColor }
                  : focused
                    ? [
                      { borderColor: focusColor },
                      { borderBottomWidth: focusedBorderWidth },
                    ]
                    : null,
              ]}
            />
          ) : null}
          {errorText ? (
            <StyledInvalidText
              testID={errorTestID}
              style={[{ color: errorColor }, errorTextStyle]}>
              {`${errorText}`}
            </StyledInvalidText>
          ) : null}
        </ColumnContainer>
      );
    case EditTextInputType.ROW:
      return (
        <RowContainer style={style}>
          <StyledRowContent
            style={[
              { borderColor: borderColor, borderBottomWidth: borderWidth },
              borderStyle,
              errorText
                ? {
                  borderColor: errorColor,
                  borderBottomWidth: focusedBorderWidth,
                }
                : focused
                  ? {
                    borderColor: focusColor,
                    borderBottomWidth: focusedBorderWidth,
                  }
                  : null,
            ]}
          >
            {label ? (
              <StyledRowLabel
                style={[
                  labelTextStyle,
                  errorText
                    ? [{ color: errorColor }, focusedLabelStyle]
                    : focused
                      ? [{ color: focusColor }, focusedLabelStyle]
                      : null,
                  { width: labelWidth },
                ]}
              >
                {label}
              </StyledRowLabel>
            ) : null}
            <StyledRowInput
              {...textInputProps}
              testID={testID}
              style={[textStyle, { textAlign: 'left' }]}
              autoCapitalize={autoCapitalize}
              onFocus={(): void => {
                setFocus(true);
                if (onFocus) {
                  onFocus();
                }
              }}
              onBlur={(): void => {
                setFocus(false);
                if (onBlur) {
                  onBlur();
                }
              }}
              onSubmitEditing={onSubmitEditing}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              value={value}
              numberOfLines={numberOfLines}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              multiline={multiline}
            />
          </StyledRowContent>
          {errorText ? (
            <StyledInvalidText testID={errorTestID} style={errorTextStyle}>
              {errorText}
            </StyledInvalidText>
          ) : null}
        </RowContainer>
      );

    case EditTextInputType.BOX:
      return (
        <ColumnContainer style={style}>
          <StyledLabel
            style={[
              labelTextStyle,
              errorText
                ? { color: errorColor }
                : focused
                  ? [{ color: focusColor }, focusedLabelStyle]
                  : null,
            ]}
          >
            {label}
          </StyledLabel>
          <StyledRowContent
            style={[
              {
                borderWidth: borderWidth,
                borderColor: borderColor,
              },
              borderStyle,
              errorText
                ? { borderColor: errorColor, borderWidth: focusedBorderWidth }
                : focused
                  ? { borderColor: focusColor, borderWidth: focusedBorderWidth }
                  : null,
            ]}
          >
            <StyledTextInput
              {...textInputProps}
              testID={testID}
              autoCapitalize={autoCapitalize}
              onFocus={(): void => {
                setFocus(true);
                if (onFocus) {
                  onFocus();
                }
              }}
              onBlur={(): void => {
                setFocus(false);
                if (onBlur) {
                  onBlur();
                }
              }}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              value={value}
              style={textStyle}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              onSubmitEditing={onSubmitEditing}
              multiline={multiline}
            />
            {rightElement && (
              <StyledIcon style={[{ width: 40 }, rightElementStyle]}>
                {rightElement}
              </StyledIcon>
            )}

          </StyledRowContent>
          {errorText ? (
            <StyledInvalidText
              testID={errorTestID}
              style={[
                {
                  color: errorColor,
                },
                errorTextStyle,
              ]}
            >
              {`${errorText}`}
            </StyledInvalidText>
          ) : null}
        </ColumnContainer>
      );

    case EditTextInputType.ROW_BOX:
      return (
        <RowContainer style={style}>
          <StyledRowContent
            style={[
              {
                borderWidth: borderWidth,
                borderColor: borderColor,
              },
              borderStyle,
              errorText
                ? { borderColor: errorColor, borderWidth: focusedBorderWidth }
                : focused
                  ? { borderColor: focusColor, borderWidth: focusedBorderWidth }
                  : null,
            ]}
          >
            {label ? (
              <StyledRowLabel
                style={[
                  labelTextStyle,
                  errorText
                    ? [{ color: errorColor }, focusedLabelStyle]
                    : focused
                      ? [{ color: focusColor }, focusedLabelStyle]
                      : null,
                  { marginLeft: 15, width: labelWidth },
                ]}>
                {label}
              </StyledRowLabel>
            ) : null}
            <StyledRowInput
              {...textInputProps}
              testID={testID}
              style={[{ paddingRight: 15 }, textStyle]}
              autoCapitalize={autoCapitalize}
              onFocus={(): void => {
                setFocus(true);
                if (onFocus) {
                  onFocus();
                }
              }}
              onBlur={(): void => {
                setFocus(false);
                if (onBlur) {
                  onBlur();
                }
              }}
              onSubmitEditing={onSubmitEditing}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              value={value}
              numberOfLines={numberOfLines}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              multiline={multiline}
            />
          </StyledRowContent>
          {errorText ? (
            <StyledInvalidText testID={errorTestID} style={errorTextStyle}>
              {errorText}
            </StyledInvalidText>
          ) : null}
        </RowContainer>
      );
  }
}

export default EditText;
