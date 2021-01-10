import { Animated, Easing } from 'react-native';
import React, { useRef } from 'react';

import styled from 'styled-components/native';

interface CircleProps {
  color: string;
  size: number;
  innerSize: number;
  borderRadius: number;
  borderWidth: number;
}

interface LabelTextProps {
  disabled?: boolean;
}

interface InputRowProps {
  isLabelColumn: boolean;
}

interface RadioButtonProps {
  onPress?: (value: string) => void;
  value: string;
  selectedValue: string;
  color?: string;
  disabled?: boolean;
  selected?: boolean;
  size?: number;
  label?: string;
  labelPlacement?: 'start' | 'top' | 'bottom' | 'end';
}

const DEFAULT_CIRCLE: {
  [key: string]: string;
} = {
  OUTER_SIZE: '24',
  COLOR: 'rgba(0, 0, 0, 0.54)',
  BORDER_RADIUS: '12',
};

const COLOR: {
  [key: string]: string;
} = {
  LIGHTGRAY: '#E0E0E0',
  GRAY59: '#969696',
  BLACK: '#000000',
};

const SCInputRow = styled.TouchableOpacity<InputRowProps>`
  justify-content: ${({ isLabelColumn }): string =>
    isLabelColumn ? 'center' : 'flex-start'};
  flex-direction: ${({ isLabelColumn }): string =>
    isLabelColumn ? 'column' : 'row'};
  align-items: center;
  padding: 8px 0;
`;

const SCOuterCircle = styled.View<CircleProps>`
  border-radius: ${({ borderRadius }): number => borderRadius}px;
  border-width: ${({ borderWidth }): number => borderWidth}px;
  width: ${({ size }): number => size}px;
  height: ${({ size }): number => size}px;
  border-color: ${({ color }): string => color};
  align-items: center;
  justify-content: center;
  margin: 7px;
`;

const SCLabelText = styled.Text<LabelTextProps>`
  color: ${({ disabled }): string => (disabled ? COLOR.GRAY59 : COLOR.BLACK)};
`;

const getCircleStyles = (size: number, color: string): CircleProps => {
  return {
    color,
    size,
    innerSize: Math.floor(size - size / 3),
    borderRadius: size / 2,
    borderWidth: size / 10,
  };
};

const InnerCircleAnim = ({
  innerSize,
  borderRadius,
  color,
}: CircleProps): React.ReactElement => {
  const circleAnim = useRef(new Animated.ValueXY()).current;

  React.useEffect(() => {
    Animated.timing(circleAnim, {
      toValue: {
        x: innerSize,
        y: innerSize,
      },
      easing: Easing.ease,
      duration: 80,
      useNativeDriver: true,
    }).start();
  }, [circleAnim, innerSize]);

  return (
    <Animated.View
      style={{
        borderRadius,
        width: innerSize,
        height: innerSize,
        backgroundColor: color,
      }}
    />
  );
};

function RadioButton(props: RadioButtonProps): React.ReactElement {
  const {
    onPress,
    value,
    selectedValue,
    disabled,
    selected,
    label,
    labelPlacement = 'end',
    color = DEFAULT_CIRCLE.COLOR,
    // eslint-disable-next-line radix
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
      onPress={(): void => onPress?.(value)}>
      {isLabelFront && <SCLabelText disabled={disabled}>{label}</SCLabelText>}
      <SCOuterCircle
        {...circleStyles}
        style={disabled && { backgroundColor: COLOR.LIGHTGRAY }}>
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

export { RadioButton };
