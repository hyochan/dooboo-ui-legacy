import {
  NativeSyntheticEvent,
  Platform,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { ReactElement, useState } from 'react';

import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-self: stretch;
  width: 100%;
`;

const UnderLine = styled.View`
  border: 0.6px solid #eaeaf9;
`;

const Title = styled.Text`
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
  errorTestID?: string;
  style?: ViewStyle;
  underlineStyle?: ViewStyle;
  label?: string;
  textStyle?: TextStyle;
  labelTextStyle?: TextStyle;
  errorTextStyle?: TextStyle;
  errorText?: string;
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
  autoCapitalize?: TextInputProps['autoCapitalize'];
  textInputProps?: TextInputProps;
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
    value,
    placeholder,
    placeholderTextColor,
    secureTextEntry,
    onChangeText,
    onSubmitEditing,
    focusColor,
    errorColor,
    autoCapitalize = 'none',
    textInputProps,
  } = props;

  return (
    <Container style={style}>
      <Title
        style={[
          // prettier-ignore
          focused
            ? { color: focusColor }
            : errorText
              ? { color: errorColor }
              : null,
          labelTextStyle,
        ]}
      >
        {label}
      </Title>
      // @ts-ignore
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
          ]}
        >
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
