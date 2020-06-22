import React, { ReactElement } from 'react';

import { ContainerDeco } from '../../storybook/decorators';
import Table from '../../main/Table';
import { storiesOf } from '@storybook/react-native';

const Data = [
  {
    Name: 'Dean',
    Address: 'Seoul',
    Profession: 'Developer',
    Phone: '000-0000-0000',
  },
  {
    Name: 'Anne',
    Address: 'Seoul',
    Profession: 'Producer',
    Phone: '000-0000-0000',
  },
  {
    Name: 'Den',
    Address: 'Busan',
    Profession: 'Designer',
    Phone: '000-0000-0000',
  },
  {
    Name: 'Den',
    Address: 'Busan',
    Profession: 'Designer',
    Phone: '000-0000-0000',
  },
  {
    Name: 'Den',
    Address: 'Busan',
    Profession: 'Designer',
    Phone: '000-0000-0000',
  },
  {
    Name: 'Den',
    Address: 'Busan',
    Profession: 'Designer',
    Phone: '000-0000-0000',
  },
  {
    Name: 'Den',
    Address: 'Busan',
    Profession: 'Designer',
    Phone: '000-0000-0000',
  },
];

const Default = (): React.ReactElement => {
  return (
    <Table
      data={Data}
    />
  );
};

/**
 * Below are stories for web
 */

export default {
  title: 'Table',
};

export const toStorybook = (): ReactElement => <Default />;
toStorybook.story = { name: 'default' };

/**
 * Below are stories for app
 */

storiesOf('Table', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />, {
    notes: 'Simple explanation',
  });
