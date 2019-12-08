import React, { useState } from 'react';
import { number, object, text } from '@storybook/addon-knobs';

import AutoComplete from '../../src/components/shared/AutoComplete';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

export const ContainerDeco = (storyFn): React.ReactElement => (
  <Wrapper>{storyFn()}</Wrapper>
);

const Wrapper = styled.SafeAreaView`
  height: 200;
`;

storiesOf('AutoComplete', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (<Default />));

function Default(): React.ReactElement {
  const [value] = useState<string>();

  return (
    // if Wrapper Style height is 50?
    <Wrapper style={{ height: number('wrapperHeight', 300) }}>
      <AutoComplete
        value={value}
        style={object('inputStyle', { backgroundColor: '#f3f5f7' })}
        debounceDelay={number('debounceDelay', 400)}
        placeholderText={text('placeholder', 'Choose a country')}
      />
    </Wrapper>
  );
}
