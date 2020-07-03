import React, { ReactElement } from 'react';
import Svg, { Line } from 'react-native-svg';
import { TouchableOpacity, View } from 'react-native';

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
            <View>
              <Svg height="20" width="20" viewBox="0 0 20 20">
                <Line
                  x1={5}
                  y1={7}
                  x2={10}
                  y2={12}
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <Line
                  x1={10}
                  y1={12}
                  x2={15}
                  y2={5}
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </Svg>
            </View>
          ) : null}
        </CheckView>
      </View>
    </TouchableOpacity>
  );
}

export default CheckBox;
