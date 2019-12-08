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
  onPress: (value: string) => void;
  value: string;
  selectedValue: string;
  color?: string;
  disabled?: boolean;
  selected?: boolean;
  size?: number;
  label?: string;
  labelPlacement?: string;
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
  borderRadius: props.size
    ? Math.round(props.size / 2)
    : defaultValue.circleBorderRadius,
  borderWidth: props.size
    ? Math.round(props.size / 10)
    : defaultValue.circleBorderWidth,
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
          ? props.size - Math.round(props.size / 2)
          : parseInt(defaultValue.innerCircleSize),
        y: props.size
          ? props.size - Math.round(props.size / 2)
          : parseInt(defaultValue.innerCircleSize),
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
    onPress,
    value,
    selectedValue,
    color,
    disabled,
    selected,
    size,
    label,
    labelPlacement,
  } = props;

  const isSelected = selected || value === selectedValue;
  const isColumn = labelPlacement === 'top' || labelPlacement === 'bottom';
  const circleColor = disabled
    ? COLOR.LIGHTGRAY
    : isSelected
    ? color
    : defaultValue.circleColor;

  return (
    <InputRow
      activeOpacity={1}
      onPress={(): void => onPress(value)}
      disabled={disabled}
      isColumn={isColumn}
    >
      {(labelPlacement === 'start' || labelPlacement === 'top') && (
        <LabelText isDisabled={disabled}>{label || ''}</LabelText>
      )}
      <OuterCircle color={circleColor} size={size}>
        {isSelected && <InnerCircleAnim color={circleColor} size={size} />}
      </OuterCircle>
      {(!labelPlacement ||
        labelPlacement === 'end' ||
        labelPlacement === 'bottom') && (
        <LabelText isDisabled={disabled}>{label || ''}</LabelText>
      )}
    </InputRow>
  );
}

RadioButton.defaultProps = {
  disabled: false,
};

export default RadioButton;
