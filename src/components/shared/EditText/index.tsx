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
  width: 100%;
`;

const StyledRowLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #b9b9c4;
  position: absolute;
  left: 0;
`;

const StyledRowInput = Platform.select({
  ios: styled.TextInput`
  padding-top: 16px;
  padding-bottom: 16px;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  color: #2c374e;
`,
  android: styled.TextInput`
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  color: #2c374e;
`,
});

const Container = styled.View`
  flex-direction: column;
  align-self: stretch;
  width: 100%;
`;

const StyledLine = styled.View`  
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const StyledLabel = styled.Text`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #b9b9c4;
`;

const StyledTextInput = Platform.select({
  ios: styled.TextInput`
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 15px;
    font-weight: 500;
    width: 100%;
    height: 100%;
    color: #2c374e;
  `,
  android: styled.TextInput`
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 15px;
    font-weight: 500;
    width: 100%;
    height: 100%;
    color: #2c374e;
  `,
});

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

function EditText(props: Props): ReactElement {
  const [focused, setFocus] = useState(false);

  const {
    testID,
    errorTestID,
    isRow = false,
    style,
    label,
    labelTextStyle,
    labelWidth = 110,
    value,
    inputContainerType = 'underlined',
    inputContainerRadius = 3,
    borderStyle,
    borderWidth = 0.6,
    borderColor = '#eaeaf9',
    textStyle,
    placeholder,
    placeholderTextColor,
    secureTextEntry,
    onChangeText,
    onSubmitEditing,
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

  if (isRow) {
    return (
      <StyledRowContainer style={style}>
        <StyledRowContent
          style={[
            borderStyle,
            { borderColor: borderColor },
            focused
              ? { borderColor: focusColor }
              : errorText
                ? { borderColor: errorColor }
                : null,
            inputContainerType === 'underlined' || !inputContainerType
              ? [{ borderBottomWidth: borderWidth }]
              : { borderWidth: borderWidth, borderRadius: inputContainerRadius },
          ]}
        >
          {label ? (
            <StyledRowLabel
              style={[
                labelTextStyle,
                errorText
                  ? { color: errorColor }
                  : focused
                    ? { color: focusColor }
                    : null,
                inputContainerType === 'box'
                  ? { marginLeft: 15 }
                  : null,
              ]}>
              {label}
            </StyledRowLabel>
          ) : null}
          <StyledRowInput
            {...textInputProps}
            testID={testID}
            style={[
              textStyle,
              label
                ? { paddingLeft: labelWidth }
                : { paddingLeft: 15 },
              inputContainerType === 'underlined' || !inputContainerType
                ? { textAlign: 'right' }
                : { paddingRight: 15 },
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
      <StyledLine
        style={[
          borderStyle,
          { borderColor: borderColor },
          focused
            ? { borderColor: focusColor }
            : errorText
              ? { borderColor: errorColor }
              : null,
          inputContainerType === 'underlined' || !inputContainerType
            ? { borderBottomWidth: borderWidth }
            : { borderWidth: borderWidth, borderRadius: inputContainerRadius, paddingLeft: 15, paddingRight: 15 },
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
}

export default EditText;
