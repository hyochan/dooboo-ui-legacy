import { ArrowDown, IC_FACEBOOK, IC_GOOGLE } from '../Icon';
import React, { ReactElement } from 'react';

import { Accordion } from '../../main';
import { ContainerDeco } from '../../storybook/decorators';
import { SafeAreaView } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;

const CustomStyledTitle = styled.Text`
  font-weight: bold;
`;

const CustomStyledItem = styled.Text`
  padding-left: 10px;
  font-weight: bold;
`;

const LeftElement = styled.Image`
  width: 22px;
  height: 22px;
  position: absolute;
  left: 20px;
`;

const RightElement = styled.Image`
  width: 22px;
  height: 22px;
  position: absolute;
  right: 20px;
`;

const data = [
  {
    title: 'title1',
    bodies: [
      'body1',
      'body2',
      'body3',
    ],
  },
  {
    title: 'title2',
    bodies: [
      'body1',
      'body2',
      'body3',
    ],
  },
  {
    title: 'title3',
    bodies: [
      'body1',
      'body2',
      'body3',
    ],
  },
];

const Default = (): ReactElement => {
  return (
    <SafeAreaView style={{ top: 200 }}>
      <Container>
        <Accordion
          data={data}
          shouldAnimate={true}
          collapseOnStart={true}
          animDuration={400}
          activeOpacity={1}
          toggleElement={<ArrowDown />}
        />
      </Container>
    </SafeAreaView>
  );
};

const CustomStyle = (): React.ReactElement => {
  return (
    <SafeAreaView style={{ top: 200 }}>
      <Container>
        <Accordion
          data={data}
          shouldAnimate={true}
          collapseOnStart={true}
          animDuration={300}
          activeOpacity={1}
          renderTitle = {(item): React.ReactElement =>
            <CustomStyledTitle>
              <LeftElement source={IC_FACEBOOK} />
              {item}
            </CustomStyledTitle>
          }
          renderBody = {(item): React.ReactElement =>
            <CustomStyledItem>
              <LeftElement source={IC_GOOGLE}/>
              {item}
              <RightElement source={IC_GOOGLE}/>
            </CustomStyledItem>
          }
          toggleElement={<ArrowDown />}
          titleContainerStyle={{
            backgroundColor: 'gray',
          }}
          bodyContainerStyle={{
            backgroundColor: 'lightgray',
          }}
        />
      </Container>
    </SafeAreaView>
  );
};

/**
 * Below are stories for web
 */
export default {
  title: 'Accordion',
};

export const toStorybook1 = (): ReactElement => <Default />;
export const toStorybook2 = (): ReactElement => <CustomStyle />;

toStorybook1.story = {
  name: 'default',
};

toStorybook2.story = {
  name: 'CustomStyle',
};

/**
 * Below are stories for app
 */
storiesOf('Accordion', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />, {
    notes: 'Simple explanation',
  })
  .add('CustomStyle', () => <CustomStyle />, {
    notes: 'Can custom component',
  });
