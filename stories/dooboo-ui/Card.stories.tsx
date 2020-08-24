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
        imageStyle={{ width: 200 }}
        titleContainerStyle={{
          width: '100%',
          height: '40px',
          display: 'flex',
          flexDirection: 'column',
        }}
        title={'This is title'}
        titleStyle={{ display: 'flex', flexDirection: 'column' }}
        subTitle={'This is subTitle'}
        subTitleStyle={{ width: '100%', color: '#e4e4e4' }}>
        <Text>I have Image</Text>
      </Card>

      <Card
        containerStyle={{ marginBottom: 30 }}
        image={{
          uri:
            'https://image.shutterstock.com/z/stock-vector-api-application-programming-interface-software-integration-vector-illustration-1079814893.jpg',
        }}
        imageStyle={{ width: 200 }}
        raised>
        <Text>{'I\'m raised'}</Text>
      </Card>
      <Card
        containerStyle={{ marginBottom: 30 }}
        image={require('../assets/images/dummy_image_1.jpg')}
        titleContainerStyle={{
          width: '100%',
          height: '40px',
          display: 'flex',
          flexDirection: 'column',
        }}
        title={'This is title'}
        titleStyle={{ display: 'flex', flexDirection: 'column' }}
        subTitle={'This is subTitle'}
        subTitleStyle={{ width: '100%', color: '#e4e4e4' }}
      />

      <Card
        titleContainerStyle={{
          width: '100%',
          height: '40px',
          display: 'flex',
          flexDirection: 'column',
        }}
        title={'This is title'}
        titleStyle={{ display: 'flex', flexDirection: 'column' }}
        subTitle={'This is subTitle'}
        subTitleStyle={{ width: '100%', color: '#e4e4e4' }}>
        <Text>I don't have Image</Text>
      </Card>

      <Card
        titleContainerStyle={{
          width: '100%',
          height: '40px',
          display: 'flex',
          flexDirection: 'column',
        }}
        title={'This is title'}
        titleStyle={{ display: 'flex', flexDirection: 'column' }}>
        <Text>I don't have Image</Text>
      </Card>

      <Card
        titleContainerStyle={{
          width: '100%',
          height: '40px',
          display: 'flex',
          flexDirection: 'column',
        }}
        subTitle={'This is subTitle'}
        subTitleStyle={{ width: '100%', color: '#e4e4e4' }}>
        <Text>I don't have Image</Text>
      </Card>

      <Card
        titleContainerStyle={{
          width: '100%',
          height: '40px',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Text>I don't have Image</Text>
      </Card>
      <Card
        titleContainerStyle={{
          width: '100%',
          height: '40px',
          display: 'flex',
          flexDirection: 'column',
        }}
        loading={true}>
        <Text>I don't have Image</Text>
      </Card>
    </Container>
  );
}

function Divider(): React.ReactElement {
  return (
    <Container>
      <Card
        containerStyle={{ marginBottom: 30 }}
        image={{
          uri:
            'https://image.shutterstock.com/z/stock-vector-api-application-programming-interface-software-integration-vector-illustration-1079814893.jpg',
        }}
        imageStyle={{
          width: '200px',
        }}
        title="Title"
        subTitle="subTitle">
        <Text>I have Image</Text>
      </Card>
      <Card>
        <Text>I don't have Image</Text>
      </Card>

      <Card title="Title">
        <Text>I don't have Image</Text>
      </Card>

      <Card subTitle="subTitle">
        <Text>I don't have Image</Text>
      </Card>

      <Card title="title" subTitle="subTitle">
        <Text>I don't have Image</Text>
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
export const toStorybook1 = (): ReactElement => <Divider />;

toStorybook.story = {
  name: 'default',
};

toStorybook1.story = {
  name: 'divider',
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
  ))
  .add('divider', () => (
    <>
      <Divider />
    </>
  ));
