import React, { useState } from 'react';
import { color, number, object, text } from '@storybook/addon-knobs';

import AutoComplete from '../../src/components/shared/AutoComplete';
import dummyData from '../../src/components/shared/AutoComplete/dummyData';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Wrapper = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const InnerWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContainerDeco = (storyFn): React.ReactElement => (
  <Wrapper>{storyFn()}</Wrapper>
);

storiesOf('AutoComplete', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />, {
    notes: 'Simple AutoComplete',
  })
  .add('multiple', () => <Multiple />, {
    notes: 'multiple AutoCompletes',
  });

const debounceOptions = {
  range: false,
  min: 0,
  max: 3000,
  step: 50,
};

function Default(): React.ReactElement {
  const [value] = useState<string>();

  return (
    <InnerWrapper>
      <AutoComplete
        value={value}
        data={object('data', dummyData)}
        style={object('inputStyle', { backgroundColor: '#ffffff' })}
        debounceDelay={number('debounceDelay', 400, debounceOptions)}
        placeholderText={text('placeholder', 'Choose a country')}
        underlayColor={color('underlayColor', 'black')}
        storybook
      />
    </InnerWrapper>
  );
}

const orderLabel = ['first', 'second', 'third'];

const containerStyles = [{
  width: 250,
  backgroundColor: '#ffffff',
}, {
  width: 300,
  backgroundColor: '#fdfddd',
}, {
  width: 390,
  backgroundColor: '#daaaaa',
}];

function Multiple(): React.ReactElement {
  const [values] = useState<string[]>(['', '', '']);

  return (
    <InnerWrapper>
      {values.map((value, index) => (
        <AutoComplete
          key={index}
          value={value}
          data={object('data', dummyData, 'inputs')}
          style={object(`${orderLabel[index]} inputStyle`, containerStyles[index], 'inputs')}
          debounceDelay={number(`${orderLabel[index]} debounceDelay`, 400, debounceOptions, 'inputs')}
          placeholderText={text(`${orderLabel[index]} placeholder`, 'Choose a country', 'inputs')}
          underlayColor={color(`${orderLabel[index]} underlayColor`, 'black', 'inputs')}
          storybook
        />
      ))}
    </InnerWrapper>
  );
}
