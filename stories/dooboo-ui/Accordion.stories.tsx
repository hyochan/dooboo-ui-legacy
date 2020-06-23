import React, { ReactElement } from 'react';
import Accordion from '../../main/Accordion';
import { ContainerDeco } from '../../storybook/decorators';
import { storiesOf } from '@storybook/react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Default = (): React.ReactElement => {
  const accordionData = [
    {
      itemTitle: '커스텀 패널',
      itemBodies: [
        '패널 커스텀',
        '패널 커스텀',
        '패널 커스텀',
      ],
    },
    {
      itemTitle: '판매 관리',
      itemBodies: [
        '판매처 관리',
        '공급처 관리',
        '상품 관리',
        '재고 관리',
      ],
    },
    {
      itemTitle: '주문 배송 관리',
      itemBodies: [
        '주문 보기',
        '주문 보기',
        '주문 보기',
        '주문 보기',
      ],
    },
  ];

  return (
    <Container>
      <Accordion
        data={accordionData}
        isAnimated={true}
        collapsedWhenRedered={false}
        animDuration={300}
        activeOpacity={1}
      />
    </Container>
  );
};

/**
 * Below are stories for web
 */
export default {
  title: 'Accordion',
};

export const toStorybook = (): ReactElement => <Default />;

toStorybook.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */
storiesOf('Accordion', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />, {
    notes: 'Simple explanation',
  });
