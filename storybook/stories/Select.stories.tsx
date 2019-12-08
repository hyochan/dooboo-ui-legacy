import React, { useState } from 'react';

import { ContainerDeco } from '../decorators';
import Select from '../../src/components/shared/Select';
import { action } from '@storybook/addon-actions';
import { grey } from 'ansi-colors';
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
  const [facebookLoading, setFacebookLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

function Default(): React.ReactElement {
  return (
    <Container>
      <Select
        theme={'underbar'}
        rootViewStyle={{
          borderBottomColor: 'black',
          borderBottomWidth: 2,
        }}
        rootTextStyle={{
          color: 'orange',
        }}
        itemStyle={{
          list: {},
          defaultItem: {
            color: 'grey',
          },
          selectedItem: {
            color: 'black',
          },
        }}
        placeholder={'select'}
        onClick={action('Clicked')}
        items={ITEMS}
      />
    </Container>
  );
}
