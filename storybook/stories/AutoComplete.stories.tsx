import React, { useState } from 'react';
import { number, object, text } from '@storybook/addon-knobs';

import AutoComplete from '../../src/components/shared/AutoComplete';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

export const ContainerDeco = (storyFn): React.ReactElement => (
  <Wrapper>{storyFn()}</Wrapper>
);

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

storiesOf('AutoComplete', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />);

function Default(): React.ReactElement {
  const [value] = useState<string>();

  return (
    <SafeAreaProvider>
      <Wrapper>
        <AutoComplete
          value={value}
          style={object('inputStyle', { backgroundColor: '#ffffff' })}
          debounceDelay={number('debounceDelay', 400)}
          placeholderText={text('placeholder', 'Choose a country')}
          underlayColor={text('underlayColor', 'black')}
        />
      </Wrapper>
    </SafeAreaProvider>
  );
}
