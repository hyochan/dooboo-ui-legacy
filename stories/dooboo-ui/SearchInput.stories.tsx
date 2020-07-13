import React, { useState } from 'react';
import { number, text } from '@storybook/addon-knobs';

import { IC_MAGNIFIER } from '../Icon';
import SearchInput from '../../main/SearchInput';
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

const Default = (): React.ReactElement => {
  const [value, setValue] = useState<string>('');
  return (
    <Container>
      <SearchInput
        value={value}
        onDebounceOrOnReset={(str): void => {
          setValue(str);
        }}
        debounceDelay={number('delay', 400)}
        placeholder={text('placeholder', 'Search for anything')}
        placeholderTextColor={'#BDBDBD'}
        customIcon={
          <MagContainer>
            <Magnifier source={IC_MAGNIFIER} />
          </MagContainer>
        }
      />
      <Value>{`value (after debounced delay) : ${value}`}</Value>
    </Container>
  );
};

/**
 * Below are stories for web
 */

export default {
  title: 'SearchInput',
};

export const toStorybook = (): React.ReactElement => <Default />;

toStorybook.story = {
  name: 'default',
  notes: 'Basic SearchInput style',
};
/**
 * Below are stories for app
 */

const ContainerDeco = (storyFn: any): React.ReactElement => (
  <Container>{storyFn()}</Container>
);

storiesOf('SearchInput', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />);
