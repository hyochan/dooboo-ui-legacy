import {
  ActivityIndicator,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import React, { useRef } from 'react';

import styled from 'styled-components/native';
import { useHover } from 'react-native-web-hooks';
import { useThemeContext } from '@dooboo-ui/theme';

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

type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'google'
  | 'facebook'
  | 'gray';
type ButtonType = 'secondary' | 'tertiary';

export interface Props {
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
  touchableOpacityProps?: TouchableOpacityProps;
  /** hover */
  /** Secondary */
  hoverStyle?: ViewStyle;
  /** Tertiary */
  hoverTextStyle?: TextStyle;
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
    touchableOpacityProps,
    hoverStyle,
    hoverTextStyle,
  } = props;

  const ref = useRef(null);
  const isHovered = useHover(ref);

  if (isDisabled) {
    return (
      <Container testID={testID} style={containerStyle}>
        <StyledDisabled disabled testID={testID} style={disabledStyle}>
          <StyledDisabledText style={[textStyle, disabledTextStyle]}>
            {text}
          </StyledDisabledText>
        </StyledDisabled>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container testID={testID} style={containerStyle}>
        <StyledButton testID={testID} style={style}>
          <ActivityIndicator size="small" color={indicatorColor} />
        </StyledButton>
      </Container>
    );
  }
  return (
    <Container testID={testID} style={containerStyle}>
      <StyledButton
        activeOpacity={activeOpacity}
        onPress={onPress}
        delayPressIn={30}
        ref={ref}
        style={isHovered && hoverStyle ? hoverStyle : style}
        {...touchableOpacityProps}
      >
        {leftElement || null}
        <StyledText
          style={[isHovered && hoverTextStyle ? hoverTextStyle : textStyle]}
        >
          {text}
        </StyledText>
        {rightElement || null}
      </StyledButton>
    </Container>
  );
}

interface CustomProps extends Props {
  customColor?: ButtonColor | string;

  // prime use props
  type?: ButtonType;
}
/** customButton  */
export const CustomButtons = (props: CustomProps): React.ReactElement => {
  const { theme } = useThemeContext();
  const {
    testID,
    type,
    containerStyle,
    textStyle,
    text,
    onPress,
    touchableOpacityProps,
    customColor,
    leftElement,
    rightElement,
    isLoading,
    style,
  } = props;

  const colorSet = customColor || '#6DA6FC';
  const buttonStyle = {
    backgroundColor: props.customColor || '#609FFF',
    width: 'auto',
    height: 40,
    ...style,
  };

  if (type === 'secondary') {
    const secondaryStyle = {
      backgroundColor: theme.whiteDark2,
      borderColor: colorSet,
      borderWidth: 1,
      width: 'auto',
      height: 40,
      ...style,
    };

    const secondaryTextStyle = {
      color: customColor || '#6DA6FC',
      ...textStyle,
    };
    return (
      <Button
        testID={testID}
        style={secondaryStyle}
        containerStyle={containerStyle}
        textStyle={secondaryTextStyle}
        text={text}
        leftElement={leftElement}
        rightElement={rightElement}
        onPress={onPress}
        isLoading={isLoading}
        isDisabled={props.isDisabled}
        disabledTextStyle={props.disabledTextStyle}
        touchableOpacityProps={touchableOpacityProps}
      />
    );
  }
  return (
    <Button
      testID={testID}
      style={buttonStyle}
      containerStyle={containerStyle}
      textStyle={textStyle}
      text={text}
      leftElement={leftElement}
      rightElement={rightElement}
      disabledStyle={props.disabledStyle}
      isDisabled={props.isDisabled}
      disabledTextStyle={props.disabledTextStyle}
      onPress={onPress}
      isLoading={isLoading}
      touchableOpacityProps={touchableOpacityProps}
    />
  );
};

Button.CustomType = CustomButtons;

export { Button };
