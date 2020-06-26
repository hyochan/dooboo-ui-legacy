import React, { ReactElement } from 'react';

import Accordion from '../../main/Accordion';
import { ContainerDeco } from '../../storybook/decorators';
import { Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StlyedImage = styled.Image`
  height: 25px;
  width: 25px;
  margin-right: 8px;
`;

const Default = (): React.ReactElement => {
  const accordionData = [
    {
      itemTitle: '커스텀 패널',
      itemBodies: ['패널 커스텀', '패널 커스텀', '패널 커스텀'],
    },
    {
      itemTitle: '판매 관리',
      itemBodies: ['판매처 관리', '공급처 관리', '상품 관리', '재고 관리'],
    },
    {
      itemTitle: '주문 배송 관리',
      itemBodies: ['주문 보기', '주문 보기', '주문 보기', '주문 보기'],
    },
  ];

  return (
    <Container>
      <Accordion
        data={accordionData}
        isAnimated={true}
        collapsedWhenRendered={false}
        animDuration={300}
        activeOpacity={1}
      />
    </Container>
  );
};

const CanAddElement = (): React.ReactElement => {
  const accordionData = [
    {
      itemTitle: 'Sample Title1',
      itemBodies: ['Sample Text1', 'Sample Text2', 'Sample Text3'],
    },
    {
      itemTitle: 'Sample Title2',
      itemBodies: ['Sample Text1', 'Sample Text2', 'Sample Text3'],
    },
    {
      itemTitle: 'Sample Title3',
      itemBodies: ['Sample Text1', 'Sample Text2', 'Sample Text3'],
    },
  ];

  return (
    <Container>
      <Accordion
        data={accordionData}
        isAnimated={true}
        collapsedWhenRendered={false}
        animDuration={300}
        activeOpacity={1}
        customTitleStyle={{
          backgroundColor: 'black',
        }}
        customItemStyle={{
          backgroundColor: 'white',
        }}
        titleElementLeft={
          <StlyedImage
            source={require('../assets/images/dummy_image_1.jpg')}
          />
        }
        itemBodyElementLeft={
          <StlyedImage
            source={require('../assets/images/dummy_image_1.jpg')}
          />
        }
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

export const toStorybook1 = (): ReactElement => <Default />;
export const toStorybook2 = (): ReactElement => <CanAddElement />;

toStorybook1.story = {
  name: 'default',
};

toStorybook2.story = {
  name: 'CanAddElement',
};

/**
 * Below are stories for app
 */
storiesOf('Accordion', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />, {
    notes: 'Simple explanation',
  })
  .add('CanAddElement', () => <CanAddElement />, {
    notes: 'Can add other elements',
  });
