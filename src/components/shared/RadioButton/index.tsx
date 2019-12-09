import { Animated, Easing } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';

interface ICircleProps {
  color: string;
  size: number;
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
  circleColor: 'rgba(0, 0, 0, 0.54)',
  circleBorderRadius: '12',
};

const COLOR: {
  [key: string]: string;
} = {
  LIGHTGRAY: '#c8c8c8',
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
  borderRadius: Math.round(props.size / 2),
  borderWidth: Math.round(props.size / 10),
}))<ICircleProps>`
  width: ${({ size }): string => size.toString()};
  height: ${({ size }): string => size.toString()};
  border-color: ${({ color }): string => color};
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
        x: props.size - Math.round(props.size / 2),
        y: props.size - Math.round(props.size / 2),
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
        borderRadius: Math.round(props.size / 2),
        backgroundColor: props.color,
      }}
    />
  );
};

function RadioButton(props: IRadioButtonProps): React.ReactElement {
  const {
    onPress,
    value,
    selectedValue,
    disabled,
    selected,
    label,
    labelPlacement,
    color = defaultValue.circleColor,
    size = parseInt(defaultValue.outerCircleSize),
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
        <LabelText isDisabled={disabled}>{label}</LabelText>
      )}
      <OuterCircle color={circleColor} size={size}>
        {isSelected && <InnerCircleAnim color={circleColor} size={size} />}
      </OuterCircle>
      {(labelPlacement === 'end' || labelPlacement === 'bottom') && (
        <LabelText isDisabled={disabled}>{label}</LabelText>
      )}
    </InputRow>
  );
}

RadioButton.defaultProps = {
  disabled: false,
  label: '',
  labelPlacement: 'end',
};

export default RadioButton;
