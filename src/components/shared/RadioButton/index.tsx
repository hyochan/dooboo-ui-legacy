import { Animated, Easing } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components/native';

interface ICircleProps {
  color: string;
  size: number;
  innerSize: number;
  borderRadius: number;
  borderWidth: number;
}

interface ILabelTextProps {
  disabled?: boolean;
}

interface IInputRowProps {
  isLabelColumn: boolean;
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

const DEFAULT_CIRCLE: {
  [key: string]: string;
} = {
  OUTER_SIZE: '23',
  COLOR: 'rgba(0, 0, 0, 0.54)',
  BORDER_RADIUS: '12',
};

const COLOR: {
  [key: string]: string;
} = {
  LIGHTGRAY: '#c8c8c8',
  GRAY59: '#969696',
  BLACK: '#000000',
};

const SCInputRow = styled.TouchableOpacity<IInputRowProps>`
  justify-content: ${({ isLabelColumn }): string =>
    isLabelColumn ? 'center' : 'flex-start'};
  flex-direction: ${({ isLabelColumn }): string =>
    isLabelColumn ? 'column' : 'row'};
  align-items: center;
  padding: 8px 0;
`;

const SCOuterCircle = styled.View.attrs(
  ({ borderRadius, borderWidth }: ICircleProps) => ({
    borderRadius,
    borderWidth,
  }),
)<ICircleProps>`
  width: ${({ size }): string => size.toString()};
  height: ${({ size }): string => size.toString()};
  border-color: ${({ color }): string => color};
  align-items: center;
  justify-content: center;
  margin: 7px;
`;

const SCLabelText = styled.Text<ILabelTextProps>`
  color: ${({ disabled }): string => (disabled ? COLOR.GRAY59 : COLOR.BLACK)};
`;

const getCircleStyles = (size: number, color: string): ICircleProps => {
  return {
    color,
    size,
    innerSize: Math.round(size / 2),
    borderRadius: Math.round(size / 2),
    borderWidth: Math.round(size / 10),
  };
};

const InnerCircleAnim = ({
  innerSize,
  borderRadius,
  color,
}: ICircleProps): React.ReactElement => {
  const [circleAnim] = useState(new Animated.ValueXY());

  React.useEffect(() => {
    Animated.timing(circleAnim, {
      toValue: {
        x: innerSize,
        y: innerSize,
      },
      easing: Easing.ease,
      duration: 80,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        borderRadius,
        width: circleAnim.x,
        height: circleAnim.y,
        backgroundColor: color,
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
    color = DEFAULT_CIRCLE.COLOR,
    size = parseInt(DEFAULT_CIRCLE.OUTER_SIZE),
  } = props;

  const isSelected = selected || value === selectedValue;
  const isLabelFront = labelPlacement === 'start' || labelPlacement === 'top';
  const isLabelColumn = labelPlacement === 'top' || labelPlacement === 'bottom';

  const circleStyles = getCircleStyles(
    size,
    disabled ? COLOR.LIGHTGRAY : isSelected ? color : DEFAULT_CIRCLE.COLOR,
  );

  return (
    <SCInputRow
      activeOpacity={1}
      disabled={disabled}
      isLabelColumn={isLabelColumn}
      onPress={(): void => onPress(value)}
    >
      {isLabelFront && <SCLabelText disabled={disabled}>{label}</SCLabelText>}
      <SCOuterCircle {...circleStyles}>
        {isSelected && <InnerCircleAnim {...circleStyles} />}
      </SCOuterCircle>
      {!isLabelFront && <SCLabelText disabled={disabled}>{label}</SCLabelText>}
    </SCInputRow>
  );
}

RadioButton.defaultProps = {
  disabled: false,
  label: '',
  labelPlacement: 'end',
};

export default RadioButton;
