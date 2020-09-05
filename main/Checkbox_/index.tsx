import React, { FC, useCallback, useState } from 'react';
import {
  TouchableHighlight,
} from 'react-native';

import styled from 'styled-components/native';

interface customStyle {
  labelSize?: number;
  labelColor?: string;
  boxSize?: number;
  boxColor?: string;
}

interface onChangeEvent {
  checked: boolean;
  label: string;
}

interface CheckboxProps {
  label: string | number;
  checked?: boolean
  defaultChecked?: boolean;
  disabled?: boolean
  onChange?: (event: onChangeEvent) => void;
  customStyle?: customStyle;
}

const Checkbox_: FC<CheckboxProps> = ({
  label,
  checked = false,
  defaultChecked = false,
  disabled,
  onChange,
  customStyle,
}) => {
  const [isChecked, setIsChecked] = useState(checked || defaultChecked);

  const handleChange = useCallback(() => {
    setIsChecked((prevChecked) => !prevChecked);
    onChange && onChange({ checked: !isChecked, label });
  }, [onChange, setIsChecked]);

  const labelColor = disabled ? COLOR.LIGHTGRAY : customStyle?.labelColor;

  return (
    <TouchableHighlight
      onPress={handleChange}
      underlayColor="transparent"
      style={{ marginHorizontal: 20, paddingBottom: 20 }}
      disabled={disabled}>
      <Container>
        <MarkerContainer
          boxSize={customStyle?.boxSize}
          boxColor={disabled ? COLOR.LIGHTGRAY : customStyle?.boxColor}
        >
          <Marker isChecked={isChecked}>
            {isChecked && <MarkerImg
              source={require('../__assets__/check_tick.png')}
            />}
          </Marker>
        </MarkerContainer>
        <Label labelColor={labelColor} labelSize={customStyle?.labelSize}>
          {label}
        </Label>
      </Container>
    </TouchableHighlight>
  );
};

interface MarkerContainerProps {
  boxSize?: number
  boxColor?: string
}

interface LabelProps {
  disabled?: boolean;
  labelSize?: number;
  labelColor?: string;
}

interface MarkerProps {
  isChecked: boolean
}

const COLOR: {
  [key: string]: string;
} = {
  BLUE_SKY: '#1890FF',
  LIGHTGRAY: '#E0E0E0',
  GRAY59: '#969696',
  BLACK: '#000000',
};

const Container = styled.View`
 flex-direction: row;
 justify-content: center;
 align-items: center;
`;

const MarkerContainer = styled.View<MarkerContainerProps>`
 padding: 1.5px;
 width: ${({ boxSize }):number => boxSize || 20}px;
 height: ${({ boxSize }):number => boxSize || 20}px;
 background-color: ${({ boxColor }): string => boxColor || COLOR.BLUE_SKY};
`;

const Marker = styled.View<MarkerProps>`
 flex: 1;
 justify-content: center;
 align-items: center;
 background-color: ${({ isChecked }): string => isChecked ? 'transparent' : '#ffffff'};
`;

const MarkerImg = styled.Image`
 width: 85%;
 height: 85%;
 tint-color: #ffffff;
 resize-mode: contain;
`;

const Label = styled.Text<LabelProps>`
 font-size: 20px;
 padding-left: 10px;
 color: ${({ labelColor }): string => labelColor || COLOR.BLACK};
`;

export { Checkbox_ };
