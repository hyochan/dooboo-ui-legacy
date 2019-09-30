import React, { useState } from 'react';
import { number, text } from '@storybook/addon-knobs';

import SearchInput from '../../src/components/shared/SearchInput';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Value = styled.Text`
  padding-top: 5;
  align-self: center;
`;

const SearchInputWithState = (): React.ReactElement => {
  const [value, setValue] = useState<string>('');
  return (
    <>
      <SearchInput
        value={value}
        onDebounceOrOnReset={setValue}
        debounceDelay={number('delay', 400)}
        placeholderText={text('placeholder', '')}
      />
      <Value>{`value (after debounced delay) : ${value}`}</Value>
    </>
  );
};

const ContainerDeco = (storyFn): React.ReactElement => (
  <Container>{storyFn()}</Container>
);

storiesOf('SearchInput', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <SearchInputWithState />);
