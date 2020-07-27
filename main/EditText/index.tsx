import {
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  width: 100%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-radius: 6px;
  border-color: #e0e0e0;
  padding-left: 20px;
  width: 100%;
`;

const StyledLabel = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  color: #828282;
  margin-bottom: 6px;
`;

const StyledRowLabel = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  color: #828282;
`;

const StyledTextInput = styled.TextInput`
  width: 100%;
  height: 56px;
  border-width: 1px;
  border-radius: 6px;
  border-color: #e0e0e0;
  padding-top: 14px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  color: #4f4f4f;
  ${Platform.OS === 'web' && { 'outline-style': 'none' }}
`;

const StyledRowTextInput = styled.TextInput`
  width: 100%;
  height: 56px;
  padding-top: 14px;
  padding-bottom: 15px;
  padding-left: 20px;
  padding-right: 20px;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
  color: #4f4f4f;
  ${Platform.OS === 'web' && { 'outline-style': 'none' }}
`;

export enum EditTextInputType {
  DEFAULT = 'default',
  ROW = 'row',
}

interface Props {
  testID?: string;
  labelPosition?: EditTextInputType;
  placeholder?: TextInputProps['placeholder'];
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  containerStyle?: ViewStyle;
  textInputStyle?: ViewStyle;
  focusColor?: string;
  labelText?: string;
  labelTextStyle?: TextStyle;
  value?: TextInputProps['value'];
  isErrored?: boolean;
  errorMessage?: React.ReactElement;
  errorStyle?: ViewStyle;
  numberOfLines?: number;
  secureTextEntry?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: TextInputProps['onChangeText'];
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
}

const EditText: FC<Props> = (props) => {
  const {
    testID,
    labelPosition = 'default',
    placeholder = 'text',
    placeholderTextColor = '#BDBDBD',
    containerStyle,
    textInputStyle,
    focusColor = '#109CF1',
    labelText = 'Label',
    labelTextStyle,
    value,
    isErrored = false,
    errorMessage = (
      <Text style={{ color: '#E54E4E', marginTop: 8 }}>
        Default error message
      </Text>
    ),
    errorStyle = {
      borderColor: '#E54E4E',
    },
    numberOfLines,
    secureTextEntry = false,
    onFocus,
    onBlur,
    onChangeText,
    onSubmitEditing,
  } = props;

  const [focused, setFocus] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<boolean>(isErrored);

  useEffect(() => {
    setErrorState(isErrored);
  }, [isErrored]);

  switch (labelPosition) {
    case EditTextInputType.DEFAULT:
    default:
      return (
        <Container
          testID={testID}
          style={containerStyle}
        >
          <StyledLabel style={labelTextStyle}>{labelText}</StyledLabel>
          <StyledTextInput
            testID={'TextInput-test'}
            value={value}
            style={[
              textInputStyle,
              errorState ? errorStyle : focused && { borderColor: focusColor },
            ]}
            numberOfLines={numberOfLines}
            onFocus={(): void => {
              setFocus(true);
              setErrorState(false);
              onFocus && onFocus();
            }}
            onBlur={(): void => {
              setFocus(false);
              setErrorState(false);
              onBlur && onBlur();
            }}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
          {errorState && errorMessage}
        </Container>
      );
    case EditTextInputType.ROW:
      return (
        <>
          <RowContainer
            testID={testID}
            style={[
              containerStyle,
              errorState ? errorStyle : focused && { borderColor: focusColor },
            ]}>
            <StyledRowLabel style={labelTextStyle}>{labelText}</StyledRowLabel>
            <StyledRowTextInput
              testID={'TextInput-row-test'}
              value={value}
              style={textInputStyle}
              onFocus={(): void => {
                setFocus(true);
                setErrorState(false);
              }}
              onBlur={(): void => {
                setFocus(false);
                setErrorState(false);
              }}
              numberOfLines={numberOfLines}
              secureTextEntry={secureTextEntry}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmitEditing}
            />
          </RowContainer>
          {errorState && errorMessage}
        </>
      );
  }
};

export default EditText;
