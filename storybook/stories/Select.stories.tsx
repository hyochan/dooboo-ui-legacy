import React, { useCallback, useState } from 'react';

import { ContainerDeco } from '../decorators';
import Select from '../../src/components/shared/Select';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

storiesOf('Select', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));
interface Item {
  value: string;
  text: string;
}
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
  const [selectedValue, setSelectedValue] = useState<string>(ITEMS[0].value);
  const onSelect = useCallback((item: Item) => {
    setSelectedValue(item.value);
  }, []);
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
        items={ITEMS}
        onSelect={onSelect}
        selectedValue={selectedValue}
      />
      <Select
        theme={'underbar'}
        itemStyle={{
          color: 'grey',
        }}
        selectedItemStyle={{
          color: 'black',
        }}
        title={'Title'}
        titleTextStyle={{
          color: 'green',
        }}
        placeholder={'select'}
        onClick={action('Clicked')}
        items={ITEMS}
        onSelect={onSelect}
        selectedValue={selectedValue}
      />
      <Select
        placeholder={'select'}
        onClick={action('Clicked')}
        title={'Title'}
        titleTextStyle={{
          color: 'blue',
        }}
        items={ITEMS}
        onSelect={onSelect}
        selectedValue={selectedValue}
      />
      <Select
        theme={'box'}
        title={'Title'}
        titleTextStyle={{
          color: 'black',
        }}
        itemStyle={{
          color: 'grey',
        }}
        selectedItemStyle={{
          color: 'pink',
        }}
        placeholder={'select'}
        onClick={action('Clicked')}
        items={ITEMS}
        onSelect={onSelect}
        selectedValue={selectedValue}
      />
    </Container>
  );
}
