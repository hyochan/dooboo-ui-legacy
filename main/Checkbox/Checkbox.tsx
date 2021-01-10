import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { GroupCheckboxContext } from './GroupCheckboxContext';
import { TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';

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
  justify-content: flex-start;
  align-items: center;
`;

const MarkerContainer = styled.View<MarkerContainerProps>`
  padding: 1px;
  width: ${({ boxSize }): number => boxSize || 20}px;
  height: ${({ boxSize }): number => boxSize || 20}px;
  background-color: ${({ boxColor }): string => boxColor || COLOR.BLUE_SKY};
`;

const Marker = styled.View<MarkerProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ isChecked }): string =>
    isChecked ? 'transparent' : '#ffffff'};
`;

const MarkerImg = styled.Image`
  width: 85%;
  height: 85%;
`;

const Markerindeterminate = styled.View<MarkerIndeterminateProps>`
  width: 55%;
  height: 55%;
  background-color: ${({ boxColor }): string => boxColor || COLOR.BLUE_SKY};
`;

const Label = styled.Text<LabelProps>`
  font-size: 20px;
  padding-left: ${({ labelLeft }): number => (labelLeft ? 0 : 10)}px;
  padding-right: ${({ labelLeft }): number => (labelLeft ? 10 : 0)}px;
  color: ${({ labelColor }): string => labelColor || COLOR.BLACK};
`;

interface MarkerContainerProps {
  boxSize?: number;
  boxColor?: string;
}

interface LabelProps {
  disabled?: boolean;
  labelSize?: number;
  labelColor?: string;
  labelLeft?: boolean;
}

interface MarkerProps {
  isChecked: boolean;
}

interface MarkerIndeterminateProps {
  boxColor?: string;
}

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
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  // @ts-ignore
  onChange?: (event: OnChangeEvent) => void;
  customStyle?: CustomStyle;
}

export const Checkbox: FC<CheckboxProps> = ({
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange, setIsChecked, label, groupCheckboxContext?.toggleOption]);

  useEffect(() => {
    // for only componenUpdate not in mount
    if (isMounted.current) setIsChecked(checked);
    else isMounted.current = true;
  }, [checked]);

  useEffect(() => {
    if (value && groupCheckboxContext?.registerValue)
      groupCheckboxContext.registerValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labelColor = disabled ? COLOR.LIGHTGRAY : customStyle?.labelColor;

  return (
    <TouchableHighlight
      onPress={handleChange}
      underlayColor="transparent"
      style={{ margin: 10 }}
      disabled={disabled}>
      <Container>
        {customStyle?.labelLeft && (
          <Label
            labelColor={labelColor}
            labelSize={customStyle?.labelSize}
            labelLeft={customStyle?.labelLeft}>
            {label}
          </Label>
        )}
        <MarkerContainer
          boxSize={customStyle?.boxSize}
          boxColor={disabled ? COLOR.LIGHTGRAY : customStyle?.boxColor}>
          <Marker isChecked={isChecked}>
            {!indeterminate && isChecked && (
              <MarkerImg source={{ uri: checkboxImg }} />
            )}
            {indeterminate && (
              <Markerindeterminate
                boxColor={disabled ? COLOR.LIGHTGRAY : customStyle?.boxColor}
              />
            )}
          </Marker>
        </MarkerContainer>
        {!customStyle?.labelLeft && (
          <Label
            labelColor={labelColor}
            labelSize={customStyle?.labelSize}
            labelLeft={customStyle?.labelLeft}>
            {label}
          </Label>
        )}
      </Container>
    </TouchableHighlight>
  );
};
