import React, { useState } from 'react';
import {
  View, Text,
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import styled from 'styled-components/native';
import ButtonGroup from '../shared/ButtonGroup';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;

interface Props {
  navigation?: NavigationScreenProp<any, any>;
}

function Page(props: Props) {
  const data = [
    'Option 1', 'Option 2',
    'Option 3', 'Option 4',
  ];

  const [option, setOption] = useState('Option 1');

  const selectOption = (index: number) => {
    setOption(data[index]);
    switch (index) {
      case 0:
        setOption('Option 1');
        break;
      case 1:
        setOption('Option 2');
        break;
    }
  };

  return (
    <Container>
      <ButtonGroup
        testID='BTN_GROUP'
        style={{ marginTop: 40 }}
        onPress={(index: number) => selectOption(index)}
        data={data}
      />
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 32,
        }}>{option}</Text>
      </View>
    </Container>
  );
}

export default Page;
