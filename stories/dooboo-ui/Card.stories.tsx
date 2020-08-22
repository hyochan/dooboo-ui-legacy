import React, { ReactElement } from 'react';
import { Text } from 'react-native';

// @TODO
// eslint-disable-next-line sort-imports
import { Card } from '../../main';
import { ContainerDeco } from '../../storybook/decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 28px;
  padding-top: 80px;
  flex-direction: column;
`;

function Default(): React.ReactElement {
  return (
    <Container>
      <Card
        titleContainerStyle={{ width: '100%', height: '40px', display: 'flex', flexDirection: 'column' }}
        title={'This is title'}
        titleStyle={{ display: 'flex', flexDirection: 'column' }}
        subTitle={'This is subTitle'}
        subTitleStyle={{ width: '100%', color: '#e4e4e4' }}
      >
        <Text>hi hello</Text>
      </Card>
    </Container>
  );
}

/**
 * Below are stories for web
 */
export default {
  title: 'Card',
};

export const toStorybook = (): ReactElement => <Default />;

toStorybook.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */
storiesOf('Card', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));
