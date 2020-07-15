import React, { ReactElement } from 'react';
import { array, boolean, object, withKnobs } from '@storybook/addon-knobs';

import { ContainerDeco } from '../../storybook/decorators';
// import Table from '../../packages/Tables/lib';
import { storiesOf } from '@storybook/react-native';

export default {
  title: 'Tables',
  decorators: [withKnobs],
};

const items = [
  {
    id: 1,
    name: 'Frozen yogurt',
    type: 'Ice cream',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: 14,
    iron: 1,
  },
  {
    id: 2,
    name: 'Ice cream sandwhich',
    type: 'Ice cream',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: 8,
    iron: 1,
  },
  {
    id: 3,
    name: 'Eclair',
    type: 'Pastry',
    calories: 262,
    fat: 16.0,
    carbs: 37,
    protein: 6.0,
    sodium: 337,
    calcium: 6,
    iron: 7,
  },
  {
    id: 4,
    name: 'Cupcake',
    type: 'Pastry',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: 3,
    iron: 8,
  },
  {
    id: 5,
    name: 'Gingerbread',
    type: 'Pastry',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: 7,
    iron: 16,
  },
  {
    id: 6,
    name: 'Jelly bean',
    type: 'Other',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: 0,
    iron: 0,
  },
  {
    id: 7,
    name: 'Lollipop',
    type: 'Other',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0.0,
    sodium: 38,
    calcium: 0,
    iron: 2,
  },
  {
    id: 8,
    name: 'Honeycomb',
    type: 'Other',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: 0,
    iron: 45,
  },
  {
    id: 9,
    name: 'Donut',
    type: 'Pastry',
    calories: 52,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: 2,
    iron: 22,
  },
  {
    id: 10,
    name: 'KitKat',
    type: 'Other',
    calories: 16,
    fat: 6.0,
    carbs: 65,
    protein: 7.0,
    sodium: 54,
    calcium: 12,
    iron: 6,
  },
];
const TableDefault = (): ReactElement => {
  const checkAble = boolean('isCheckAble', false);
  return <Table data={items} isCheckAble={checkAble} />;
};
function CheckAble(): ReactElement {
  const arrayData = object('data', items);
  return <Table isCheckAble={true} data={arrayData} />;
}
function CustomGroup(): ReactElement {
  const arrayData = object('data', items);
  const customGroupData = array('customGroup', [
    'ID',
    'NAME',
    'KIND',
    'CAL',
    'FAT',
    'CARBS',
    'PROTEIN',
    'SODIUM',
    'CALCIUM',
    'IRON',
  ]);
  return (
    <Table customGroup={customGroupData} isCheckAble={true} data={arrayData} />
  );
}
TableDefault.title = 'Tables';

export const toStorybook1 = (): ReactElement => <TableDefault />;
export const toStorybook2 = (): ReactElement => <CheckAble />;
export const toStorybook3 = (): ReactElement => <CustomGroup />;
/**
 * Below are stories for app
 */
toStorybook1.story = {
  name: 'default',
};

toStorybook2.story = {
  name: 'CheckAble Type',
};
toStorybook3.story = {
  name: 'CustomGroup Type',
};
storiesOf('Tables', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <TableDefault />
    </>
  ))
  .add('check', () => <CheckAble />, {
    notes: 'Tables CheckType',
  })
  .add('Customgroup', () => <CustomGroup />, {
    notes: 'Tables CustomGroup',
  });
