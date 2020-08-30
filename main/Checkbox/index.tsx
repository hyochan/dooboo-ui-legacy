import React, { FC, useCallback, useState } from 'react';
import {
  TouchableHighlight,
} from 'react-native';

import styled from 'styled-components/native';

interface MarkerContainerProps {
  boxSize?: number
  boxColor?: string
}

interface LabelProps {
  labelColor?: string
  labelSize?: number
}

interface MarkerProps {
  isChecked: boolean
}

const Container = styled.View`
 flex-direction: row;
 align-items: center;
`;

const MarkerContainer = styled.View<MarkerContainerProps>`
 padding: 3px;
 width: ${({ boxSize }):number => boxSize || 20}px;
 height: ${({ boxSize }):number => boxSize || 20}px;
 background-color: ${({ boxColor }): string => boxColor || '#cecece'};
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
 font-size: ${({ labelSize }):number => labelSize || 20}px;
 padding-left: 10px;
 color: ${({ labelColor }): string => labelColor || '#000000'};
`;

interface Props {
  boxSize?: number
  boxColor?: string
  defaultChecked?: boolean
  disabled?: boolean
  onStateChange?(): void
  labelText?: string
  labelSize?: number
  labelColor?: string
}

const Checkbox: FC<Props> = ({
  boxSize = 20,
  boxColor = '#cecece',
  labelText = 'default',
  labelSize = 20,
  labelColor = '#000000',
  defaultChecked = false,
  onStateChange = ():void => {},
  /* TODO  */
  // disabled = false,
}) => {
  const [isChecked, setIstChecked] = useState<boolean>(defaultChecked);
  const onPress = useCallback(() => {
    setIstChecked((prevIsChecked) => !prevIsChecked);
    onStateChange();
  }, [onStateChange]);
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="transparent"
      style={{ marginVertical: 20 }}>
      <Container>
        <MarkerContainer
          boxSize={boxSize}
          boxColor={boxColor}
        >
          <Marker isChecked={isChecked}>
            {isChecked && <MarkerImg
              source={require('../__assets__/check_tick.png')}
            />}
          </Marker>
        </MarkerContainer>
        <Label labelSize={labelSize} labelColor={labelColor}>
          {labelText}
        </Label>
      </Container>
    </TouchableHighlight>
  );
};

export { Checkbox };
