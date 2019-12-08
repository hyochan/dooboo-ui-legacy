import { Animated, Easing } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';

interface ICircleProps {
  color?: string;
  size?: number;
}

interface IInputRowProps {
  isColumn: boolean;
}

interface ILabelTextProps {
  isDisabled?: boolean;
}

interface IRadioButtonProps {
  testID?: string;
  selectedValue: string;
  value: string;
  label: string;
  size?: number;
  color?: string;
  labelPlacement?: string;
  isDisabled?: boolean;
  onPress: (value: string) => void;
}

const defaultValue: {
  [key: string]: string;
} = {
  outerCircleSize: '23',
  innerCircleSize: '12',
  circleColor: 'rgba(0, 0, 0, 0.54)',
  circleBorderRadius: '12',
  circleBorderWidth: '2',
};

const COLOR: {
  [key: string]: string;
} = {
  WHITE: '#ffffff',
  DODGERBLUE: '#3a8bff',
  VERYLIGHTGRAY: '#cccccc',
  LIGHTGRAY: '#c8c8c8',
  BLUE: '#0000ff',
  STRONGBLUE: '#069ccd',
  GRAY3: '#080808',
  GRAY7: '#121212',
  GRAY59: '#969696',
};

const InputRow = styled.TouchableOpacity<IInputRowProps>`
  justify-content: ${({ isColumn }): string =>
    isColumn ? 'center' : 'flex-start'};
  flex-direction: ${({ isColumn }): string => (isColumn ? 'column' : 'row')};
  align-items: center;
  padding-vertical: 8px;
`;

const OuterCircle = styled.View.attrs((props: ICircleProps) => ({
  borderRadius: props.size ? props.size / 2 : defaultValue.circleBorderRadius,
  borderWidth: props.size ? props.size / 10 : defaultValue.circleBorderWidth,
}))<ICircleProps>`
  width: ${({ size }): string =>
    size ? size.toString() : defaultValue.outerCircleSize + 'px'};
  height: ${({ size }): string =>
    size ? size.toString() : defaultValue.outerCircleSize + 'px'};
  border-color: ${({ color }): string => color || defaultValue.circleColor};
  border-radius: ${({ borderRadius }): string => borderRadius + 'px'};
  border-width: ${({ borderWidth }): string => borderWidth + 'px'};
  align-items: center;
  justify-content: center;
  margin: 7px;
`;

const LabelText = styled.Text<ILabelTextProps>`
  color: ${({ isDisabled }): string => (isDisabled ? COLOR.GRAY59 : 'black')};
`;

const InnerCircleAnim = (props: ICircleProps): React.ReactElement => {
  const [circleAnim] = useState(new Animated.ValueXY());

  React.useEffect(() => {
    Animated.timing(circleAnim, {
      toValue: {
        x: props.size
          ? props.size - props.size / 2
          : parseInt(defaultValue.circleBorderRadius),
        y: props.size
          ? props.size - props.size / 2
          : parseInt(defaultValue.circleBorderRadius),
      },
      easing: Easing.ease,
      duration: 80,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: circleAnim.x,
        height: circleAnim.y,
        borderRadius: parseInt(defaultValue.circleBorderRadius),
        backgroundColor: props.color || defaultValue.circleColor,
      }}
    />
  );
};

function RadioButton(props: IRadioButtonProps): React.ReactElement {
  const {
    value,
    label,
    selectedValue,
    isDisabled,
    color,
    size,
    labelPlacement,
    onPress,
  } = props;

  const isSelected = value === selectedValue;
  const isColumn = labelPlacement === 'top' || labelPlacement === 'bottom';
  const circleColor = isDisabled
    ? COLOR.LIGHTGRAY
    : isSelected
    ? color
    : defaultValue.circleColor;

  return (
    <InputRow
      activeOpacity={1}
      onPress={(): void => onPress(value)}
      disabled={isDisabled}
      isColumn={isColumn}
    >
      {(labelPlacement === 'start' || labelPlacement === 'top') && (
        <LabelText isDisabled={isDisabled}>{label}</LabelText>
      )}
      <OuterCircle color={circleColor} size={size}>
        {isSelected && <InnerCircleAnim color={circleColor} size={size} />}
      </OuterCircle>
      {(!labelPlacement ||
        labelPlacement === 'end' ||
        labelPlacement === 'bottom') && (
        <LabelText isDisabled={isDisabled}>{label}</LabelText>
      )}
    </InputRow>
  );
}

RadioButton.defaultProps = {
  isDisabled: false,
};

export default RadioButton;
