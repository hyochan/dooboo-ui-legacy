import {
  ActivityIndicator,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import React, { useRef } from 'react';

import styled from 'styled-components/native';
import { useHover } from 'react-native-web-hooks';

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.TouchableOpacity`
  align-self: center;
  width: 320px;
  height: 52px;
  border-color: blue;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 6px;
`;

const StyledDisabled = styled(StyledButton)`
  background-color: #cccccc;
  border-color: rgb(200, 200, 200);
`;

const StyledText = styled.Text`
  font-size: 14px;
  color: #069ccd;
`;

const StyledDisabledText = styled(StyledText)`
  color: #969696;
`;

interface ChildStyle {
  style?: ViewStyle;
  textStyle?: TextStyle;
}

type ColorType = 'decision' | 'idea' | 'emotion' | 'benefit' | 'facts' | 'criticism';

interface Props {
  testID?: string;
  indicatorColor?: string;
  color?: ColorType;
  loading?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabledStyle?: ChildStyle;
  leftElement?: React.ReactElement;
  rightElement?: React.ReactElement;
  activeOpacity?: number;
  text?: string;
  outlined?: boolean;
  onPress?: () => void;
  touchableOpacityProps?: TouchableOpacityProps & any;
}

const hoveredStyle = {
  shadowColor: 'black',
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.24,
  shadowRadius: 16.0,
  elevation: 10,
  borderRadius: 4,
};

function Button(props: Props): React.ReactElement {
  const {
    testID,
    disabled,
    loading,
    containerStyle,
    disabledStyle,
    style,
    textStyle,
    indicatorColor,
    leftElement,
    rightElement,
    activeOpacity,
    text,
    onPress,
    touchableOpacityProps,
  } = props;

  const ref = useRef(null);
  const isHovered = useHover(ref);

  if (disabled) {
    return (
      <Container style={containerStyle}>
        <StyledDisabled style={disabledStyle?.style}>
          <StyledDisabledText style={[textStyle, disabledStyle?.textStyle]}>
            {text}
          </StyledDisabledText>
        </StyledDisabled>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container style={containerStyle}>
        <StyledButton style={style}>
          <ActivityIndicator size="small" color={indicatorColor} />
        </StyledButton>
      </Container>
    );
  }
  return (
    <Container style={containerStyle}>
      <StyledButton
        testID={testID}
        activeOpacity={activeOpacity || 0.7}
        onPress={onPress}
        delayPressIn={30}
        ref={ref}
        style={[style, (isHovered && hoveredStyle)]}
        {...touchableOpacityProps}
      >
        {leftElement}
        <StyledText
          style={textStyle}
        >
          {text}
        </StyledText>
        {rightElement}
      </StyledButton>
    </Container>
  );
}

export { Button };
