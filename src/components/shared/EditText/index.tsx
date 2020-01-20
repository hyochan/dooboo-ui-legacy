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

const StyledRowContainer = styled.View`
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
`;

const Container = styled.View`
  flex-direction: column;
  align-self: stretch;
`;

const StyledContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StyledLine = styled.View`  
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
  flex: 1;
  height: 100%;
  color: #2c374e;
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
}

export enum EditTextInputType {
  DEFAULT = 'default',
  ROW = 'row',
  BOX = 'box',
  ROW_BOX = 'rowBox'
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
    inputContainerRadius = 3,
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
    leftElement,
    leftElementStyle,
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
  } = props;

  switch (type) {
    case EditTextInputType.DEFAULT:
    default:
      return (
        <Container style={style}>
          <StyledLabel
            // @ts-ignore
            style={[
              labelTextStyle,
              errorText
                ? { color: errorColor }
                : focused
                  ? [{ color: focusColor }, focusedLabelStyle]
                  : null,
            ]}>
            {label}
          </StyledLabel>
          <StyledContent>
            <StyledLine
              style={[
                { borderBottomWidth: borderWidth, borderColor: borderColor },
                borderStyle,
                errorText
                  ? { borderColor: errorColor }
                  : focused
                    ? [{ borderColor: focusColor }, { borderBottomWidth: focusedBorderWidth }]
                    : null,
              ]}
            >
              <StyledTextInput
                {...textInputProps}
                testID={testID}
                autoCapitalize={autoCapitalize}
                onFocus={(): void => setFocus(true)}
                onBlur={(): void => setFocus(false)}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={value}
                style={textStyle}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                onSubmitEditing={onSubmitEditing}
              />
            </StyledLine>
          </StyledContent>

          { errorText ? (
            <StyledInvalidText
              testID={errorTestID}
              style={[
                {
                  color: errorColor,
                },
                errorTextStyle,
              ]}>
              {`${errorText}`}
            </StyledInvalidText>
          ) : null }
        </Container>
      );
    case EditTextInputType.ROW:
      return (
        <StyledRowContainer style={style}>
          <StyledRowContent
            style={[
              { borderColor: borderColor, borderBottomWidth: borderWidth },
              borderStyle,
              errorText
                ? { borderColor: errorColor, borderBottomWidth: focusedBorderWidth }
                : focused
                  ? { borderColor: focusColor, borderBottomWidth: focusedBorderWidth }
                  : null,
            ]}
          >
            {label ? (
              <StyledRowLabel
                // @ts-ignore
                style={[
                  labelTextStyle,
                  errorText
                    ? [{ color: errorColor }, focusedLabelStyle]
                    : focused
                      ? [{ color: focusColor }, focusedLabelStyle]
                      : null,
                  { width: labelWidth },
                ]}>
                {label}
              </StyledRowLabel>
            ) : null}
            <StyledRowInput
              {...textInputProps}
              testID={testID}
              style={[
                textStyle,
                { textAlign: 'right' },
              ]}
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
            />
          </StyledRowContent>
          {errorText ? (
            <StyledInvalidText testID={errorTestID} style={errorTextStyle}>
              {errorText}
            </StyledInvalidText>
          ) : null}
        </StyledRowContainer>
      );

    case EditTextInputType.BOX:
      return (
        <Container style={style}>
          <StyledLabel
            // @ts-ignore
            style={[
              labelTextStyle,
              errorText
                ? { color: errorColor }
                : focused
                  ? [{ color: focusColor }, focusedLabelStyle]
                  : null,
            ]}>
            {label}
          </StyledLabel>
          <StyledContent>
            <StyledLine
              style={[
                { borderWidth: borderWidth, borderRadius: inputContainerRadius, borderColor: borderColor },
                borderStyle,
                errorText
                  ? { borderColor: errorColor }
                  : focused
                    ? [{ borderColor: focusColor }, { borderWidth: focusedBorderWidth }]
                    : null,
                !leftElement
                  ? { paddingLeft: 15 }
                  : null,
                !rightElement
                  ? { paddingRight: 15 }
                  : null,
              ]}
            >
              {
                leftElement
                  ? (
                    <StyledIcon style={[{ width: 40 }, leftElementStyle]}>
                      {leftElement}
                    </StyledIcon>
                  ) : null
              }
              <StyledTextInput
                {...textInputProps}
                testID={testID}
                autoCapitalize={autoCapitalize}
                onFocus={(): void => setFocus(true)}
                onBlur={(): void => setFocus(false)}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={value}
                style={textStyle}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                onSubmitEditing={onSubmitEditing}
              />
              {
                rightElement
                  ? (
                    <StyledIcon style={[{ width: 40 }, rightElementStyle]}>
                      {rightElement}
                    </StyledIcon>
                  ) : null
              }
            </StyledLine>
          </StyledContent>

          { errorText ? (
            <StyledInvalidText
              testID={errorTestID}
              style={[
                {
                  color: errorColor,
                },
                errorTextStyle,
              ]}>
              {`${errorText}`}
            </StyledInvalidText>
          ) : null }
        </Container>
      );

    case EditTextInputType.ROW_BOX:
      return (
        <StyledRowContainer style={style}>
          <StyledRowContent
            style={[
              { borderWidth: borderWidth, borderRadius: inputContainerRadius, borderColor: borderColor },
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
                // @ts-ignore
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
              style={[
                { paddingRight: 15 },
                textStyle,
              ]}
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
            />
          </StyledRowContent>
          {errorText ? (
            <StyledInvalidText testID={errorTestID} style={errorTextStyle}>
              {errorText}
            </StyledInvalidText>
          ) : null}
        </StyledRowContainer>
      );
  }
}

export default EditText;
