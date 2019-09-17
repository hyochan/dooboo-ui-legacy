import React, { useContext, useState } from 'react';
import { boolean, number, text, withKnobs } from '@storybook/addon-knobs';

import SearchInput from '../../src/components/shared/SearchInput';
import { Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Value = styled.Text`
  padding-top: 5;
  align-self: center;
`;

const SearchInputWithState = () => {
  const [value, setValue] = useState('');
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

const ContainerDeco = (storyFn) => <Container>{storyFn()}</Container>;

storiesOf('SearchInput', module)
  .addDecorator(withKnobs)
  .addDecorator(ContainerDeco)
  .add('default', () => <SearchInputWithState />);
