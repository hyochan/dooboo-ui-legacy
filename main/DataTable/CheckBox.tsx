import { Image, TouchableOpacity, View } from 'react-native';
import React, { ReactElement } from 'react';
import styled from 'styled-components/native';

const CheckView = styled.View`
  height: 20px;
  width: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #d5d5d5;
  align-items: center;
  justify-content: center;
`;

interface Props {
  checked?: boolean;
  onClick?: () => void;
}

function CheckBox(props: Props): ReactElement {
  const { checked, onClick } = props;
  return (
    <TouchableOpacity testID="checkbox-test-id" onPress={onClick}>
      <View style={{ flexDirection: 'row' }}>
        <CheckView>
          {checked ? (
            <Image
              source={require('../__assets__/check.png')}
              style={{
                width: 14,
                height: 14,
              }}
            />
          ) : null}
        </CheckView>
      </View>
    </TouchableOpacity>
  );
}

export default CheckBox;
