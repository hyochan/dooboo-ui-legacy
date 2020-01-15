import {
  ActivityIndicator,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import React from 'react';
import styled from 'styled-components/native';

const StyledButton = styled.View`
  align-self: center;
  /* width: 320; */
  height: 52;
  border-color: blue;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const StyledDisabled = styled(StyledButton)`
  background-color: #cccccc;
  border-color: rgb(200,200,200);
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: #069ccd;
`;

const StyledDisabledText = styled(StyledText)`
  color: #969696;
`;

interface Props {
  testID?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  disabledStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabledTextStyle?: TextStyle;
  leftElement?: React.ReactElement;
  rightElement?: React.ReactElement;
  indicatorColor?: string;
  activeOpacity?: number;
  text?: string;
}

function Button(props: Props): React.ReactElement {
  const {
    isDisabled,
    testID,
    disabledStyle,
    containerStyle,
    isLoading,
    style,
    textStyle,
    disabledTextStyle,
    indicatorColor,
    text,
    leftElement,
    rightElement,
    activeOpacity,
    onPress,
  } = props;

  if (isDisabled) {
    return (
      <StyledDisabled
        testID={testID}
        style={[
          containerStyle,
          disabledStyle,
        ]}
      >
        <StyledDisabledText
          style={[textStyle, disabledTextStyle]}
        >{text}</StyledDisabledText>
      </StyledDisabled>
    );
  }
  if (isLoading) {
    return (
      <StyledButton testID={testID} style={[
        containerStyle,
        style,
      ]}>
        <ActivityIndicator
          size="small"
          color={indicatorColor}
        />
      </StyledButton>
    );
  }
  return (
    <TouchableOpacity
      testID={testID}
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={containerStyle}
    >
      <StyledButton style={style}>
        {leftElement || null}
        <StyledText style={textStyle}>{text}</StyledText>
        {rightElement || null}
      </StyledButton>
    </TouchableOpacity>
  );
}

export default Button;
