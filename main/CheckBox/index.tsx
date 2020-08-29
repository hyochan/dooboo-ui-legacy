import React from 'react';
import styled from 'styled-components/native';

interface Props {
  testID?: string;
  color?: string;
  reverse?: boolean;
  checked?: boolean;
  onChange?(state): void;
}

const Container = styled.TouchableOpacity.attrs({ activeOpacity: 1 })<{
  reverse: boolean;
}>`
  align-items: center;
  flex-direction: ${({ reverse }): string => (reverse ? 'row-reverse' : 'row')};
  justify-content: ${({ reverse }): string =>
    reverse ? 'flex-end' : 'flex-start'};
`;

const Label = styled.View`
  padding: 5px;
`;

const CustomCheckBox = styled.View<{
  checked: boolean;
  color: string;
  onPress?: (state) => void;
}>`
  width: 20px;
  height: 20px;
  padding: 2px;
  border: 1px solid;
  background-color: ${({ checked, color }): string =>
    checked ? color : '#ffffff'};
  border-color: ${({ checked, color }): string =>
    checked ? color : '#bababa'};
  border-radius: 2px;
`;

const MarkWrppaer = styled.View``;

const CustomCheckMark = styled.Image`
  width: 100%;
  height: 100%;
`;

const CheckBox: React.FC<Props> = ({
  testID,
  children,
  checked = false,
  color = '#609FFF',
  reverse = false,
  onChange,
}) => {
  return (
    <Container testID={testID} reverse={reverse} onPress={onChange}>
      <MarkWrppaer>
        <CustomCheckBox checked={checked} color={color}>
          <CustomCheckMark source={require('../__assets__/checkbox-mark.png')} />
        </CustomCheckBox>
      </MarkWrppaer>
      <Label>{children}</Label>
    </Container>
  );
};

export { CheckBox };
