import React, {ReactElement} from 'react';

import {Card} from '../../main';
import {ContainerDeco} from '../../storybook/decorators';
import {Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import styled from 'styled-components/native';

const ScrollContainer = styled.ScrollView`
  width: 100%;
`;

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 28px;
  padding-top: 80px;
  flex-direction: column;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;

function Default(): React.ReactElement {
  return (
    <ScrollContainer>
      <Container>
        <Title>{'Image & Title & SubTitle & Children'}</Title>
        <Card
          containerStyle={{marginBottom: 30}}
          image={{
            uri:
              'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
          }}
          title="Title"
          subTitle="subTitle">
          <Text>{'children'}</Text>
        </Card>
        <Title>{'Image'}</Title>
        <Card
          containerStyle={{marginBottom: 30}}
          image={{
            uri:
              'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
          }}
        />
        <Title>{'Title'}</Title>
        <Card containerStyle={{marginBottom: 30}} title="Title" />
        <Title>{'SubTitle'}</Title>
        <Card containerStyle={{marginBottom: 30}} subTitle="subTitle" />
        <Title>{'Title & SubTitle'}</Title>
        <Card
          containerStyle={{marginBottom: 30}}
          title="Title"
          subTitle="subTitle"
        />
        <Title>{'Children'}</Title>
        <Card containerStyle={{marginBottom: 30}}>
          <Text>{'children'}</Text>
        </Card>
        <Title>{'Title & SubTitle & Children'}</Title>
        <Card
          containerStyle={{marginBottom: 30}}
          title="Title"
          subTitle="subTitle">
          <Text>{'children'}</Text>
        </Card>
      </Container>
    </ScrollContainer>
  );
}

function Style(): React.ReactElement {
  return (
    <ScrollContainer>
      <Container>
        <Title>{'default'}</Title>
        <Card
          containerStyle={{marginBottom: 30}}
          image={{
            uri:
              'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
          }}
          title="Title"
          subTitle="subTitle">
          <Text>{'children'}</Text>
        </Card>
        <Title>{'raised'}</Title>
        <Card
          containerStyle={{marginBottom: 30}}
          image={{
            uri:
              'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
          }}
          title="Title"
          subTitle="subTitle"
          raised={true}>
          <Text>{'children'}</Text>
        </Card>
        <Title>{'outlined'}</Title>
        <Card
          containerStyle={{marginBottom: 30}}
          image={{
            uri:
              'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
          }}
          title="Title"
          subTitle="subTitle"
          outlined={true}>
          <Text>{'children'}</Text>
        </Card>
      </Container>
    </ScrollContainer>
  );
}

/**
 * Below are stories for web
 */
export default {
  title: 'Card',
};

export const toStorybook = (): ReactElement => <Default />;
export const toStorybook1 = (): ReactElement => <Style />;

toStorybook.story = {
  name: 'default',
};

toStorybook1.story = {
  name: 'Style',
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
  .add('Style', () => (
    <>
      <Style />
    </>
  ));
