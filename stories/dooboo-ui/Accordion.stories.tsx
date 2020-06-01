import { IC_ARR_DOWN, IC_ARR_UP } from '../Icon';
import React, { ReactElement } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Accordion from '../../main/Accordion';
import { ContainerDeco } from '../../storybook/decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.Image`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 16px;
`;

const Default = (): React.ReactElement => {
  const contents = [
    {
      title: 'Title 1',
      body: 'Hi. I love this component. What do you think?',
    },
    {
      title: 'See this one too',
      body: 'Yes. You can have more items.',
    },
    {
      title: 'Thrid thing',
      body: `What about very long text? What about very long text?
        What about very long text? What about very long text?
        What about very long text? What about very long text?
        What about very long text? What about very long text?
        What about very long text? What about very long text?
        What about very long text? What about very long text?`,
    },
  ];

  return (
    <Container>
      <ScrollView style={{ alignSelf: 'stretch', paddingHorizontal: 20 }}>
        {contents.map((param, i) => {
          return (
            <Accordion
              key={i}
              contentVisible={false}
              visibleElement={
                <StyledImage
                  source={IC_ARR_UP}
                />
              }
              invisibleElement={
                <StyledImage
                  source={IC_ARR_DOWN}
                />
              }
              header={
                <View style={{ height: 28 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'blue',
                    }}
                  >
                    {param.title}
                  </Text>
                </View>
              }
            >
              <Text style={{ fontSize: 20 }}>{param.body}</Text>
            </Accordion>
          );
        })}
      </ScrollView>
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
