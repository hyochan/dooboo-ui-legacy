import {
  NativeSyntheticEvent,
  Platform,
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
  label?: string;
  textStyle?: TextStyle;
  labelTextStyle?: TextStyle;
  errorTextStyle?: TextStyle;
  error?: boolean;
  errorText?: string;
  value?: string;
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
  focusColor?: string;
  errorColor?: string;
}

function EditText(props: Props): ReactElement {
  const [focused, setFocus] = useState(false);

  const {
    testID,
    errorTestID,
    style,
    label,
    textStyle,
    labelTextStyle,
    errorTextStyle,
    error,
    errorText,
    value,
    placeholder,
    placeholderTextColor,
    secureTextEntry,
    onChangeText,
    onSubmitEditing,
    focusColor,
    errorColor,
  } = props;

  return (
    <Container style={style}>
      <Title
        style={[
          // prettier-ignore
          focused
            ? { color: focusColor }
            : error
              ? { color: errorColor }
              : null,
          labelTextStyle,
        ]}
      >
        {label}
      </Title>
      <StyledTextInput
        testID={testID}
        autoCapitalize={'none'}
        onFocus={(): void => setFocus(true)}
        onBlur={(): void => setFocus(false)}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        style={textStyle}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
      ></StyledTextInput>
      <UnderLine
        style={
          // prettier-ignore
          focused
            ? { borderColor: '' }
            : error
              ? { borderColor: '#FF8989' }
              : null
        }
      />
      {error ? (
        <StyledInvalidText
          testID={errorTestID}
          style={[
            {
              color: errorColor,
            },
            errorTextStyle,
          ]}
        >
          {' '}
          {errorText}{' '}
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
