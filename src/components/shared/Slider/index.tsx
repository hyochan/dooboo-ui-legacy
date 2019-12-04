import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

interface Props {
  children?: any;
}

function Shared(props: Props): React.ReactElement {
  const [current, useCurrent] = useState(0);

  return (
    <Container>
      <View
        style={{
          width: '90%',
          height: 10,
          backgroundColor: 'skyblue',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((s, index) => (
            <TouchableOpacity
              onPress={(): void => useCurrent(index)}
              key={index}
              style={{
                width: current === index ? 20 : 8,
                height: current === index ? 20 : 8,
                borderWidth: 1,
                borderColor: current === index ? 'skyblue' : 'transparent',
                borderRadius: 10,
                backgroundColor: 'white',
              }}
            />
          ))}
      </View>
    </Container>
  );
}

export default Shared;
