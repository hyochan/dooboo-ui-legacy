import React, { useState } from 'react';
import { number, text } from '@storybook/addon-knobs';

import { IC_MAGNIFIER } from '../../src/components/shared/Icons';
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

const MagContainer = styled.View`
  height: 24;
  width: 24;
  margin-left: 8;
  margin-right: 2;
  margin-top: 9;
  margin-bottom: 9;
  justify-content: center;
  align-items: center;
`;

const Magnifier = styled.Image`
  width: 16;
  height: 16;
  margin-bottom: 2;
`;

const CustomIcon: React.FC = () => (
  <MagContainer>
    <Magnifier source={IC_MAGNIFIER} />
  </MagContainer>
);

const SearchInputWithState: React.FC<{ customIcon?: React.ReactNode }> = ({
  customIcon,
}) => {
  const [value, setValue] = useState<string>('');
  return (
    <>
      <SearchInput
        value={value}
        onDebounceOrOnReset={(str): void => {
          setValue(str);
        }}
        debounceDelay={number('delay', 400)}
        placeholderText={text('placeholder', '')}
        customIcon={customIcon}
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
  .add('default', () => <SearchInputWithState />)
  .add('custom icon', () => (
    <SearchInputWithState customIcon={<CustomIcon />} />
  ));
