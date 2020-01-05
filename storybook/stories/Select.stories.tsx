import React, { useState } from 'react';

import { ContainerDeco } from '../decorators';
import Select from '../../src/components/shared/Select';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';
import { text } from '@storybook/addon-knobs';

storiesOf('Select', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 100px;
  padding-bottom: 100px;

  flex-direction: column;
  justify-content: space-around;
`;

const ITEMS = [
  { value: 'Category1', text: 'Category1' },
  { value: 'Category2', text: 'Category2' },
  { value: 'Category3', text: 'Category3' },
  { value: 'Category4', text: 'Category4' },
  { value: 'Category5', text: 'Category5' },
];

function Default(): React.ReactElement {
  return (
    <Container>
      <Select
        rootViewStyle={{
          borderBottomColor: 'black',
          borderBottomWidth: 2,
        }}
        rootTextStyle={{
          color: 'orange',
        }}
        placeholder={'select'}
        onClick={action('Clicked')}
      />
      <Select
        theme={'underbar'}
        itemStyle={{
          list: {
            shadowOffset: { width: 0, height: 5 },
          },
          defaultItem: {
            color: 'grey',
          },
          selectedItem: {
            color: 'black',
          },
        }}
        title={'Title'}
        titleTextStyle={{
          color: 'green',
        }}
        placeholder={'select'}
        onClick={action('Clicked')}
        items={ITEMS}
      />
      <Select
        placeholder={'select'}
        onClick={action('Clicked')}
        title={'Title'}
        titleTextStyle={{
          color: 'blue',
        }}
        items={ITEMS}
      />
      <Select
        theme={'box'}
        itemStyle={{
          list: {
            shadowOffset: { width: 0, height: 5 },
          },
          defaultItem: {
            color: 'grey',
          },
          selectedItem: {
            color: 'black',
          },
        }}
        title={'Title'}
        titleTextStyle={{
          color: 'black',
        }}
        placeholder={'select'}
        onClick={action('Clicked')}
        items={ITEMS}
      />
    </Container>
  );
}
