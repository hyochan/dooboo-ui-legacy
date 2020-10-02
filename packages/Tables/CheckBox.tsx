import React, { ReactElement } from 'react';

import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const CheckView = styled.View<{ checked: boolean }>`
  height: 20px;
  width: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #d5d5d5;
  align-items: center;
  justify-content: center;
  background-color: ${({ checked }): string =>
    !checked ? '#ffffff' : '#d5d5d5'};
`;

const CheckMark = styled.Image`
  width: 14px;
  height: 14px;
`;

interface Props {
  value?: boolean;
  onClick?: () => void;
}

function CheckBox(props: Props): ReactElement {
  const { value, onClick } = props;

  return (
    <TouchableOpacity testID="checkbox-test-id" onPress={onClick}>
      <CheckView checked={value}>
        <CheckMark source={require('../assets/mark.png')} />
      </CheckView>
    </TouchableOpacity>
  );
}

export default CheckBox;
