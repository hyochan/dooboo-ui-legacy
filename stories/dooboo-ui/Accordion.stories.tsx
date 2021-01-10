import { ArrowDown, IC_MAGNIFIER } from '../Icon';
import React, { Fragment, ReactElement } from 'react';

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
  position: absolute;
  left: 60px;
`;

const CustomStyledItem = styled.Text`
  padding-left: 10px;
  font-weight: bold;
  position: absolute;
  left: 40px;
`;

const LeftElement = styled.Image`
  width: 22px;
  height: 22px;
  position: absolute;
  left: 20px;
`;

const data = [
  {
    title: 'Lists',
    bodies: ['user', 'mail', 'plan'],
  },
  {
    title: 'mail',
    bodies: ['mail list', 'category', 'bin'],
  },
  {
    title: 'Reports',
    bodies: ['report list', 'statistics'],
  },
];

const Default = (): ReactElement => {
  return (
    <SafeAreaView style={{ top: 100 }}>
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
    <SafeAreaView style={{ top: 100 }}>
      <Container>
        <Accordion
          data={data}
          shouldAnimate={true}
          collapseOnStart={true}
          animDuration={300}
          activeOpacity={1}
          renderTitle={(item): React.ReactElement => {
            return (
              <Fragment>
                <LeftElement source={IC_MAGNIFIER} />
                <CustomStyledTitle>{item}</CustomStyledTitle>
              </Fragment>
            );
          }}
          renderBody={(item): React.ReactElement => {
            return (
              <Fragment>
                <CustomStyledItem>{item}</CustomStyledItem>
              </Fragment>
            );
          }}
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
