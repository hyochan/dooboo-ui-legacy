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
        containerStyle={{ marginBottom: 30 }}
        image={{
          uri:
            'https://image.shutterstock.com/z/stock-vector-api-application-programming-interface-software-integration-vector-illustration-1079814893.jpg',
        }}
        imageStyle={{ width: 200 }}>
        <Text style={{ padding: 10 }}>I have Image</Text>
      </Card>
      <Card
        containerStyle={{ marginBottom: 30 }}
        image={require('../assets/images/dummy_image_1.jpg')}
      />
      <Card>
        <Text style={{ padding: 10 }}>I don't have Image</Text>
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
