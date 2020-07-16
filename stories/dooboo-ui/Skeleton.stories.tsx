import { Image, Text, View } from 'react-native';
import React, { ReactElement } from 'react';
import {
  boolean,
  number,
  radios,
  text,
  withKnobs,
} from '@storybook/addon-knobs';

import { ContainerDeco } from '../../storybook/decorators';
import Skeleton from '../../main/Skeleton';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  background-color: transparent;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 28px 0 ;
  flex-direction: column;
`;

const Title = styled.Text`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const Divider = styled.View`
  display: flex;
  margin: 20px 0;
  border: 0.5px solid lightgray;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

function Default(): React.ReactElement {
  return (
    <Container>
      <Title>Example</Title>

      <View >
        <Row>
          <Skeleton shape="circle" width={30} height={30} />
          <Skeleton width={80} style={{ marginLeft: 10 }} />
        </Row>
        <Skeleton
          shape="rect"
          width={300}
          height={120}
          style={{ marginTop: 10 }}
        />
      </View>
      <View style={{ marginTop: 10 }}>
        <Row>
          <Image
            style={{ height: 30, width: 30, borderRadius: 50 }}
            source={{
              uri:
                  'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
            }}
          />
          <Text style={{ marginLeft: 10 }}>Dooboolab</Text>
        </Row>
        <View style={{ width: 300, height: 120, marginTop: 10 }}>
          <Text style={{ color: 'gray', textAlign: 'justify' }}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
              fugit reprehenderit laudantium delectus, consectetur ut voluptatem
              dicta possimus culpa praesentium exercitationem adipisci,
              distinctio quidem necessitatibus sapiente excepturi architecto
              vel. Ipsam.
          </Text>
        </View>
      </View>

      <Divider />

      <Title>Inferring dimensions of children</Title>

      <Text>Lorem ipsum dolor sit</Text>

      <Skeleton>
        <Text>Lorem ipsum dolor sit</Text>
      </Skeleton>

      <Row>
        <Image
          style={{ height: 100, width: 100 }}
          source={{
            uri: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
          }}
        />

        <Skeleton shape="rect">
          <Image
            style={{ height: 100, width: 100 }}
            source={{
              uri: 'https://avatars2.githubusercontent.com/u/45788556?s=200&v=4',
            }}
          />
        </Skeleton>
      </Row>
    </Container>
  );
}

function Customize(): React.ReactElement {
  const animation = boolean('animation', true);
  const shape = radios('shape', ['text', 'circle', 'rect'], 'text');
  const width = number('width', 300);
  const height = number('height', 20);
  const color = text('color', 'lightgray');

  return (
    <Container>
      <Skeleton
        animation={animation}
        shape={shape}
        width={width}
        height={height}
        color={color}></Skeleton>
    </Container>
  );
}

export default {
  title: 'Skeleton',
  component: Skeleton,
  decorators: [withKnobs],
};

export const toStorybook = (): ReactElement => <Default />;

export const toStorybook1 = (): ReactElement => <Customize />;

toStorybook.story = {
  name: 'Example',
};

toStorybook1.story = {
  name: 'CanCustomize',
};

/**
 * Below are stories for app
 */
storiesOf('Skeleton', module)
  .addDecorator(ContainerDeco)
  .add('Example', () => <Default />, {
    notes: 'Example',
  })
  .add('Customize', () => <Customize />, {
    notes: 'Can customize',
  });
