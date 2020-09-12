import React, { FC, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { GroupCheckboxContext } from './CheckboxGroup';
import { TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';

interface CustomStyle {
  labelSize?: number;
  labelColor?: string;
  boxSize?: number;
  boxColor?: string;
  labelLeft?: boolean;
}

interface OnChangeEvent {
  checked: boolean;
  label: string | number;
}

export interface CheckboxProps {
  id?: string;
  label: string | number;
  value?: string | number | boolean;
  checked?: boolean
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean
  onChange?: (event: OnChangeEvent) => void;
  customStyle?: CustomStyle;
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  value,
  checked = false,
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  customStyle,

}) => {
  const groupCheckboxContext = useContext(GroupCheckboxContext);
  const isMounted = useRef(false);
  const checkboxImg = 'https://i.imgur.com/tC6YqOV.png';
  const [isChecked, setIsChecked] = useState(defaultChecked || checked);

  const handleChange = useCallback(() => {
    setIsChecked((prevChecked) => {
      onChange && onChange({ checked: !prevChecked, label });
      return !prevChecked;
    });
    groupCheckboxContext?.toggleOption({ label, value: value || '' });
  }, [onChange, setIsChecked, label, groupCheckboxContext?.toggleOption]);

  useEffect(() => {
    // for only componenUpdate not in mount
    if (isMounted.current) {
      setIsChecked(checked);
    } else {
      isMounted.current = true;
    }
  }, [checked]);

  useEffect(() => {
    if (value && groupCheckboxContext?.registerValue) {
      groupCheckboxContext.registerValue(value);
    }
  }, []);

  const labelColor = disabled ? COLOR.LIGHTGRAY : customStyle?.labelColor;

  return (
    <TouchableHighlight
      onPress={handleChange}
      underlayColor="transparent"
      style={{ marginHorizontal: 20, paddingBottom: 20 }}
      disabled={disabled}>
      <Container labelLeft={customStyle?.labelLeft}>
        <MarkerContainer
          boxSize={customStyle?.boxSize}
          boxColor={disabled ? COLOR.LIGHTGRAY : customStyle?.boxColor}
        >
          <Marker isChecked={isChecked}>
            {!indeterminate && isChecked && <MarkerImg
              source={{ uri: checkboxImg }}
            />}
            {
              indeterminate && <Markerindeterminate
                boxColor={disabled ? COLOR.LIGHTGRAY : customStyle?.boxColor}
              />
            }
          </Marker>
        </MarkerContainer>
        <Label
          labelColor={labelColor}
          labelSize={customStyle?.labelSize}
          labelLeft={customStyle?.labelLeft}
        >
          {label}
        </Label>
      </Container>
    </TouchableHighlight>
  );
};

interface ContainerProps {
  labelLeft?: boolean;
}

interface MarkerContainerProps {
  boxSize?: number
  boxColor?: string
}

interface LabelProps {
  disabled?: boolean;
  labelSize?: number;
  labelColor?: string;
  labelLeft?: boolean;
}

interface MarkerProps {
  isChecked: boolean
}

interface MarkerindeterminateProps {
  boxColor?: string
}

const COLOR: {
  [key: string]: string;
} = {
  BLUE_SKY: '#1890FF',
  LIGHTGRAY: '#E0E0E0',
  GRAY59: '#969696',
  BLACK: '#000000',
};

const Container = styled.View<ContainerProps>`
  flex-direction: ${({ labelLeft }): string => labelLeft ? 'row-reverse' : 'row'};
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

const Markerindeterminate = styled.View<MarkerindeterminateProps>`
  width: 55%;
  height: 55%;
  background-color: ${({ boxColor }): string => boxColor || COLOR.BLUE_SKY};
`;

const Label = styled.Text<LabelProps>`
  font-size: 20px;
  padding-left:  ${({ labelLeft }): number => labelLeft ? 0 : 10}px;
  padding-right: ${({ labelLeft }): number => labelLeft ? 10 : 0}px;
  color: ${({ labelColor }): string => labelColor || COLOR.BLACK};
`;

export default Checkbox;
