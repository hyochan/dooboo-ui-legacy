import React, { useState } from 'react';
import { Text, View } from 'react-native';

import ButtonGroup from '../../src/components/shared/ButtonGroup';
import { ContainerDeco } from '../decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

storiesOf('ButtonGroup', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));

const Default = (): React.ReactElement => {
  const data = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const [option, setOption] = useState('Option 1');

  const selectOption = (index: number): void => {
    setOption(data[index]);
    // prettier-ignore
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
        style={{ marginTop: 40 }}
        onPress={(index: number): void => selectOption(index)}
        data={data}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 32,
          }}
        >
          {option}
        </Text>
      </View>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
  flex-direction: column;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  margin: 0 24px;
`;
