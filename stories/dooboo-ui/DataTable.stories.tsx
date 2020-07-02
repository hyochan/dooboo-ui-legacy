import React, { ReactElement } from 'react';
import { array, boolean, object, withKnobs } from '@storybook/addon-knobs';

import { ContainerDeco } from '../../storybook/decorators';
import DataTable from '../../main/DataTable';
import { items } from '../../main/DataTable/Contants';
import { storiesOf } from '@storybook/react-native';

export default {
  title: 'DataTable',
  decorators: [withKnobs],
};

const DataTableExample = (): ReactElement => {
  const checkAble = boolean('isCheckAble', false);
  return <DataTable data={items} isCheckAble={checkAble} />;
};
function CheckAble(): ReactElement {
  const arrayData = object('data', items);
  return <DataTable isCheckAble={true} data={arrayData} />;
}
function CustomGroup(): ReactElement {
  const arrayData = object('data', items);
  const customGroupData = array('customGroup', [
    '번호',
    '판매처 코드',
    '판매처',
    '판매처명',
    '로그인아이디',
    '그룹',
    '보안코드/협력사코드',
    '자동확인',
    '자동발주송장',
    '부분배송',
    '자동취소 (배송전)',
    '자동취소 (배송후)',
    '취소구분',
    '취소철회확인',
    'CS링크',
    '게시판연동',
  ]);
  return (
    <DataTable
      customGroup={customGroupData}
      isCheckAble={true}
      data={arrayData}
    />
  );
}
DataTableExample.title = 'Data Table';

export const toStorybook1 = (): React.ReactElement => <DataTableExample />;
export const toStorybook2 = (): React.ReactElement => <CheckAble />;
export const toStorybook3 = (): React.ReactElement => <CustomGroup />;
/**
 * Below are stories for app
 */
toStorybook1.story = {
  name: 'default',
};

toStorybook2.story = {
  name: 'CanAddCheck',
};
toStorybook3.story = {
  name: 'CanAddCustomGroup',
};
storiesOf('DataTable', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <DataTableExample />
    </>
  ))
  .add('check', () => <CheckAble />, {
    notes: 'Table CheckType',
  })
  .add('Customgroup', () => <CustomGroup />, {
    notes: 'Table CustomGroup',
  });
