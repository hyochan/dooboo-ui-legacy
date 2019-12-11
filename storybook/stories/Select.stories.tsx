import React, { useCallback, useState } from 'react';

import { ContainerDeco } from '../decorators';
import Select from '../../src/components/shared/Select';
import { Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

storiesOf('Select', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />);
interface Item {
  value: string;
  text: string;
}
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
  const [selectedItem, setSelectedItem] = useState<Item>(null);
  const onSelect = useCallback(
    (item: Item) => {
      setSelectedItem(item);
    },
    [selectedItem],
  );
  return (
    <Container>
      <Select
        itemStyle={{
          color: 'grey',
        }}
        selectedItemStyle={{
          color: 'black',
        }}
        placeholder={'select'}
        onClick={action('Clicked')}
        items={ITEMS}
        onSelect={onSelect}
        selectedItem={selectedItem}
      />
      <Select
        theme={ThemeEnum.box}
        itemStyle={{
          color: 'grey',
        }}
        selectedItemStyle={{
          color: 'black',
        }}
        placeholder={'select'}
        onClick={action('Clicked')}
        items={ITEMS}
        onSelect={onSelect}
        selectedItem={selectedItem}
      />
      <Select
        theme={ThemeEnum.underbar}
        itemStyle={{
          color: 'grey',
        }}
        selectedItemStyle={{
          color: 'black',
        }}
        placeholder={'select'}
        onClick={action('Clicked')}
        items={ITEMS}
        onSelect={onSelect}
        selectedItem={selectedItem}
      />
      <Select
        rootViewStyle={{
          borderBottomColor: 'black',
          borderBottomWidth: 2,
        }}
        rootTextStyle={{
          color: 'orange',
        }}
        itemStyle={{
          color: 'grey',
        }}
        selectedItemStyle={{
          color: 'black',
        }}
        placeholder={'select'}
        onClick={action('Clicked')}
        items={ITEMS}
        onSelect={onSelect}
        selectedItem={selectedItem}
      />
    </Container>
  );
}
