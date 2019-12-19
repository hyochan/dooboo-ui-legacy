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
  width: 100%;
`;

const StyledRowContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const StyledRowLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #b9b9c4;
  position: absolute;
  left: 0;
`;

const StyledRowInput = styled.TextInput`
  text-align: right;
  padding: 16px 0 16px 120px;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  color: #2c374e;
`;

const Container = styled.View`
  flex-direction: column;
  align-self: stretch;
  width: 100%;
`;

const UnderLine = styled.View`
  border: 0.6px solid #eaeaf9;
`;

const StyledLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #b9b9c4;
`;

const StyledTextInput = Platform.select({
  ios: styled.TextInput`
    padding: 15px 0 10px 0;
    font-size: 15px;
    font-weight: 500;
    color: #2c374e;
  `,
  android: styled.TextInput`
    padding-left: 0px;
    padding-bottom: 5px;
    font-size: 15px;
    font-weight: 500;
    color: #2c374e;
  `,
});

const StyledInvalidText = styled.Text`
  font-size: 12px;
  font-weight: 500;
  margin-top: 5px;
  color: #ff8989;
`;

interface Props {
  testID?: string;
  isRow?: boolean;
  errorTestID?: string;
  style?: ViewStyle;
  underlineStyle?: ViewStyle;
  label?: string;
  textStyle?: TextStyle;
  labelTextStyle?: TextStyle;
  errorTextStyle?: TextStyle;
  errorText?: string;
  keyboardType?: KeyboardTypeOptions;
  numberOfLines?: number;
  value?: TextInputProps['value'];
  placeholder?: TextInputProps['placeholder'];
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  secureTextEntry?: TextInputProps['secureTextEntry'];
  onChangeText?: TextInputProps['onChangeText'];
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  focusColor?: string;
  errorColor?: string;
  borderColor?: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  textInputProps?: TextInputProps | any;
  onFocus?: () => void;
  onBlur?: () => void;
}

function EditText(props: Props): ReactElement {
  const [focused, setFocus] = useState(false);

  const {
    testID,
    errorTestID,
    style,
    underlineStyle,
    label,
    textStyle,
    labelTextStyle,
    errorTextStyle,
    errorText,
    keyboardType,
    numberOfLines,
    value,
    placeholder,
    placeholderTextColor,
    secureTextEntry,
    onChangeText,
    onSubmitEditing,
    focusColor,
    errorColor,
    borderColor = '#eaeaf9',
    autoCapitalize = 'none',
    isRow = false,
    textInputProps,
    onFocus,
    onBlur,
  } = props;

  if (isRow) {
    return (
      <StyledRowContainer style={style}>
        <StyledRowContent>
          {label ? (
            <StyledRowLabel
              style={[
                labelTextStyle,
                errorText
                  ? { color: errorColor }
                  : focused
                    ? { color: focusColor }
                    : null,
              ]}>
              {label}
            </StyledRowLabel>
          ) : null}
          <StyledRowInput
            {...textInputProps}
            testID={testID}
            style={textStyle}
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
        <UnderLine
          // prettier-ignore
          style={[
            { borderColor: borderColor },
            focused
              ? { borderColor: focusColor }
              : errorText
                ? { borderColor: errorColor }
                : null,
          ]}
        />
        {errorText ? (
          <StyledInvalidText testID={errorTestID} style={errorTextStyle}>
            {errorText}
          </StyledInvalidText>
        ) : null}
      </StyledRowContainer>
    );
  }

  return (
    <Container style={style}>
      <StyledLabel
        style={[
          // prettier-ignore
          focused
            ? { color: focusColor }
            : errorText
              ? { color: errorColor }
              : null,
          labelTextStyle,
        ]}>
        {label}
      </StyledLabel>
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
      <UnderLine
        style={[
          // prettier-ignore
          focused
            ? { borderColor: focusColor }
            : errorText
              ? { borderColor: errorColor }
              : null,
          underlineStyle,
        ]}
      />
      {errorText ? (
        <StyledInvalidText
          testID={errorTestID}
          style={[
            {
              color: errorColor,
            },
            errorTextStyle,
          ]}>
          {` ${errorText} `}
        </StyledInvalidText>
      ) : null}
    </Container>
  );
}

EditText.defaultProps = {
  focusColor: '#79B3F5',
  errorColor: '#FF8989',
};

export default EditText;
