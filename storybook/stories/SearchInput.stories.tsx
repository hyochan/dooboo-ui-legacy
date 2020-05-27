import React, { useState } from 'react';
import { number, text } from '@storybook/addon-knobs';

import { IC_MAGNIFIER } from '../../src/Icons';
import SearchInput from '../../src/components/shared/SearchInput';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Value = styled.Text`
  padding-top: 5px;
  align-self: center;
`;

const MagContainer = styled.View`
  height: 24px;
  width: 24px;
  margin-left: 8px;
  margin-right: 2px;
  margin-top: 9px;
  margin-bottom: 9px;
  justify-content: center;
  align-items: center;
`;

const Magnifier = styled.Image`
  width: 16px;
  height: 16px;
  margin-bottom: 2px;
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
