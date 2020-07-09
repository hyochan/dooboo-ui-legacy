import {
  NativeSyntheticEvent,
  Platform,
  Text,
  TextInputProps,
  TextInputSubmitEditingEventData,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { FC, useState } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  width: 335px;
`;

const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 1px;
  border-radius: 6px;
  border-color: #e0e0e0;
  padding-left: 20px;
  width: 335px;
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
  font-weight: bold;
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
  font-weight: bold;
  color: #4f4f4f;
  ${Platform.OS === 'web' && { 'outline-style': 'none' }}
`;

type labelPositionType = 'row';
interface Props {
  labelPosition?: labelPositionType;
  placeholder?: TextInputProps['placeholder'];
  placeholderTextColor?: TextInputProps['placeholderTextColor'];
  containerStyle?: ViewStyle;
  focusColor?: string;
  labelText?: string;
  labelTextStyle?: TextStyle;
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
    labelPosition = 'default',
    placeholder = 'text',
    placeholderTextColor = '#BDBDBD',
    containerStyle,
    focusColor = '#109CF1',
    labelText = 'Label',
    labelTextStyle,
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

  switch (labelPosition) {
    case 'default':
    default:
      return (
        <Container
          style={containerStyle}
        >
          <StyledLabel style={labelTextStyle}>{labelText}</StyledLabel>
          <StyledTextInput
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
            style={[
              errorState ? errorStyle : focused && { borderColor: focusColor },
            ]}
            numberOfLines={numberOfLines}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
          />
          {errorState && errorMessage}
        </Container>
      );
    case 'row':
      return (
        <>
          <RowContainer
            style={[
              containerStyle,
              errorState ? errorStyle : focused && { borderColor: focusColor },
            ]}>
            <StyledRowLabel style={labelTextStyle}>{labelText}</StyledRowLabel>
            <StyledRowTextInput
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
