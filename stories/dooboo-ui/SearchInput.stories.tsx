import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { number, text } from '@storybook/addon-knobs';

import { IC_MAGNIFIER } from '../Icon';
import { SearchInput } from '../../main';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Value = styled.Text`
  padding-top: 5px;
  align-self: center;
`;

const MagContainer = styled.View`
  height: 24px;
  width: 24px;
  margin-left: 12px;
  margin-right: 23px;
  margin-top: 19px;
  margin-bottom: 21px;
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
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: 8,
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 100,
        }}
      >
        <Container>
          <SearchInput
            value={value}
            containerStyle={{
              borderColor: '#E0E0E0',
            }}
            inputStyle={{
              color: 'black',
            }}
            focusColor="#109CF1"
            placeholder={text('placeholder', 'Search for anything')}
            placeholderTextColor={'#BDBDBD'}
            customIcon={
              <MagContainer>
                <Magnifier source={IC_MAGNIFIER} />
              </MagContainer>
            }
            debounceDelay={number('delay', 400)}
            onDebounceOrOnReset={(str): void => {
              setValue(str);
            }}
          />
          <Value>{`value (after debounced delay) : ${value}`}</Value>
        </Container>
      </ScrollView>
    </SafeAreaView>
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
