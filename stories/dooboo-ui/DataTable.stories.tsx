import * as React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import DataTable from '../../main/DataTable';
import { ContainerDeco } from '../../storybook/decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';
import { withKnobs, boolean, array, object } from '@storybook/addon-knobs';
export default {
    title: 'DataTable',
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
        sponsorCode: true,
        autoCheck: true,
        autoInvoice: true,
        partialDelivery: true,
        autoCancelB: true,
        autoCancelA: true,
        cancelAble: true,
        agreeCancel: true,
        csLink: true,
        noticeBoard: true,
    },
    {
        id: 2,
        unitCode: 10081,
        unitCompany: '어디야',
        unitName: '감자',
        useId: 'reasm04',
        groupName: 'apple',
        sponsorCode: true,
        autoCheck: true,
        autoInvoice: true,
        partialDelivery: true,
        autoCancelB: true,
        autoCancelA: true,
        cancelAble: true,
        agreeCancel: true,
        csLink: true,
        noticeBoard: true,
    },
    {
        id: 3,
        unitCode: 10081,
        unitCompany: '어디야',
        unitName: '당근',
        useId: 'reasm04',
        groupName: 'abc',
        sponsorCode: true,
        autoCheck: true,
        autoInvoice: true,
        partialDelivery: true,
        autoCancelB: true,
        autoCancelA: true,
        cancelAble: true,
        agreeCancel: true,
        csLink: true,
        noticeBoard: true,
    },
    {
        id: 4,
        unitCode: 10081,
        unitCompany: '어디야',
        unitName: '어디야',
        useId: 'reasm04',
        groupName: 'abc',
        sponsorCode: true,
        autoCheck: true,
        autoInvoice: true,
        partialDelivery: true,
        autoCancelB: true,
        autoCancelA: true,
        cancelAble: true,
        agreeCancel: true,
        csLink: true,
        noticeBoard: true,
    },
    {
        id: 5,
        unitCode: 10081,
        unitCompany: '이디야',
        unitName: '어디야',
        useId: 'reasm04',
        groupName: 'abc',
        sponsorCode: true,
        autoCheck: true,
        autoInvoice: true,
        partialDelivery: true,
        autoCancelB: true,
        autoCancelA: true,
        cancelAble: true,
        agreeCancel: true,
        csLink: true,
        noticeBoard: true,
    },
    {
        id: 6,
        unitCode: 10081,
        unitCompany: '어디야',
        unitName: '고구마',
        useId: 'reasm04',
        groupName: 'apple',
        sponsorCode: true,
        autoCheck: true,
        autoInvoice: true,
        partialDelivery: true,
        autoCancelB: true,
        autoCancelA: true,
        cancelAble: true,
        agreeCancel: true,
        csLink: true,
        noticeBoard: true,
    },
    {
        id: 7,
        unitCode: 10081,
        unitCompany: '어디야',
        unitName: '감자',
        useId: 'reasm04',
        groupName: 'apple',
        sponsorCode: true,
        autoCheck: true,
        autoInvoice: true,
        partialDelivery: true,
        autoCancelB: true,
        autoCancelA: true,
        cancelAble: true,
        agreeCancel: true,
        csLink: true,
        noticeBoard: true,
    },
    {
        id: 8,
        unitCode: 10081,
        unitCompany: '어디야',
        unitName: '당근',
        useId: 'reasm04',
        groupName: 'abc',
        sponsorCode: true,
        autoCheck: true,
        autoInvoice: true,
        partialDelivery: true,
        autoCancelB: true,
        autoCancelA: true,
        cancelAble: true,
        agreeCancel: true,
        csLink: true,
        noticeBoard: true,
    },
    {
        id: 9,
        unitCode: 10081,
        unitCompany: '어디야',
        unitName: '어디야',
        useId: 'reasm04',
        groupName: 'abc',
        sponsorCode: true,
        autoCheck: true,
        autoInvoice: true,
        partialDelivery: true,
        autoCancelB: true,
        autoCancelA: true,
        cancelAble: true,
        agreeCancel: true,
        csLink: true,
        noticeBoard: true,
    },
    {
        id: 10,
        unitCode: 10081,
        unitCompany: '이디야',
        unitName: '어디야',
        useId: 'reasm04',
        groupName: 'abc',
        sponsorCode: true,
        autoCheck: true,
        autoInvoice: true,
        partialDelivery: true,
        autoCancelB: true,
        autoCancelA: true,
        cancelAble: true,
        agreeCancel: true,
        csLink: true,
        noticeBoard: true,
    },
];
const DataTableExample = () => {
    const checkAble = boolean('isCheckAble', false);
    return (
        <DataTable
            data={items}
            isCheckAble={checkAble}
        />
    );
};
function CheckAble(): React.ReactElement {
    const arrayData = object('data', items);
    return (
        <DataTable
            isCheckAble={true}
            data={arrayData}
        />
    );
}
function CustomGroup(): React.ReactElement {
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
    })
