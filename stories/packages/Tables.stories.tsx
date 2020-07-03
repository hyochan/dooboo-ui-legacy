import React, { ReactElement } from 'react';
import { array, boolean, object, withKnobs } from '@storybook/addon-knobs';

import { ContainerDeco } from '../../storybook/decorators';
import Table from '../../packages/Tables/lib';
import { storiesOf } from '@storybook/react-native';

export default {
  title: 'Tables',
  decorators: [withKnobs],
};

const items = [
  {
    id: 1,
    unitCode: 10081,
    unitCompany: '어디야',
    unitName: '고구마',
    useId: 'reasm04',
    groupName: 'apple',
    sponsorCode: 'Y',
    autoCheck: 'Y',
    autoInvoice: 'Y',
    partialDelivery: 'Y',
    autoCancelB: 'Y',
    autoCancelA: 'Y',
    cancelAble: 'Y',
    agreeCancel: 'N',
    csLink: 'N',
    noticeBoard: 'N',
  },
  {
    id: 2,
    unitCode: 10081,
    unitCompany: '어디야',
    unitName: '감자',
    useId: 'reasm04',
    groupName: 'apple',
    sponsorCode: 'Y',
    autoCheck: 'Y',
    autoInvoice: 'Y',
    partialDelivery: 'Y',
    autoCancelB: 'Y',
    autoCancelA: 'Y',
    cancelAble: 'Y',
    agreeCancel: 'N',
    csLink: 'N',
    noticeBoard: 'N',
  },
  {
    id: 3,
    unitCode: 10081,
    unitCompany: '어디야',
    unitName: '당근',
    useId: 'reasm04',
    groupName: 'abc',
    sponsorCode: 'Y',
    autoCheck: 'Y',
    autoInvoice: 'Y',
    partialDelivery: 'Y',
    autoCancelB: 'Y',
    autoCancelA: 'Y',
    cancelAble: 'Y',
    agreeCancel: 'N',
    csLink: 'N',
    noticeBoard: 'N',
  },
  {
    id: 4,
    unitCode: 10081,
    unitCompany: '어디야',
    unitName: '어디야',
    useId: 'reasm04',
    groupName: 'abc',
    sponsorCode: 'Y',
    autoCheck: 'Y',
    autoInvoice: 'Y',
    partialDelivery: 'Y',
    autoCancelB: 'Y',
    autoCancelA: 'Y',
    cancelAble: 'Y',
    agreeCancel: 'N',
    csLink: 'N',
    noticeBoard: 'N',
  },
  {
    id: 5,
    unitCode: 10081,
    unitCompany: '이디야',
    unitName: '어디야',
    useId: 'reasm04',
    groupName: 'abc',
    sponsorCode: 'Y',
    autoCheck: 'Y',
    autoInvoice: 'Y',
    partialDelivery: 'Y',
    autoCancelB: 'Y',
    autoCancelA: 'Y',
    cancelAble: 'Y',
    agreeCancel: 'N',
    csLink: 'N',
    noticeBoard: 'N',
  },
  {
    id: 6,
    unitCode: 10081,
    unitCompany: '어디야',
    unitName: '고구마',
    useId: 'reasm04',
    groupName: 'apple',
    sponsorCode: 'Y',
    autoCheck: 'Y',
    autoInvoice: 'Y',
    partialDelivery: 'Y',
    autoCancelB: 'Y',
    autoCancelA: 'Y',
    cancelAble: 'Y',
    agreeCancel: 'N',
    csLink: 'N',
    noticeBoard: 'N',
  },
  {
    id: 7,
    unitCode: 10081,
    unitCompany: '어디야',
    unitName: '감자',
    useId: 'reasm04',
    groupName: 'apple',
    sponsorCode: 'Y',
    autoCheck: 'Y',
    autoInvoice: 'Y',
    partialDelivery: 'Y',
    autoCancelB: 'Y',
    autoCancelA: 'Y',
    cancelAble: 'Y',
    agreeCancel: 'N',
    csLink: 'N',
    noticeBoard: 'N',
  },
  {
    id: 8,
    unitCode: 10081,
    unitCompany: '어디야',
    unitName: '당근',
    useId: 'reasm04',
    groupName: 'abc',
    sponsorCode: 'Y',
    autoCheck: 'Y',
    autoInvoice: 'Y',
    partialDelivery: 'Y',
    autoCancelB: 'Y',
    autoCancelA: 'Y',
    cancelAble: 'Y',
    agreeCancel: 'N',
    csLink: 'N',
    noticeBoard: 'N',
  },
  {
    id: 9,
    unitCode: 10081,
    unitCompany: '어디야',
    unitName: '어디야',
    useId: 'reasm04',
    groupName: 'abc',
    sponsorCode: 'Y',
    autoCheck: 'Y',
    autoInvoice: 'Y',
    partialDelivery: 'Y',
    autoCancelB: 'Y',
    autoCancelA: 'Y',
    cancelAble: 'Y',
    agreeCancel: 'N',
    csLink: 'N',
    noticeBoard: 'N',
  },
  {
    id: 10,
    unitCode: 10081,
    unitCompany: '이디야',
    unitName: '어디야',
    useId: 'reasm04',
    groupName: 'abc',
    sponsorCode: 'Y',
    autoCheck: 'Y',
    autoInvoice: 'Y',
    partialDelivery: 'Y',
    autoCancelB: 'Y',
    autoCancelA: 'Y',
    cancelAble: 'Y',
    agreeCancel: 'N',
    csLink: 'N',
    noticeBoard: 'N',
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
