import { IC_ARR_DOWN, IC_ARR_UP } from '../../src/utils/Icons';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Accordion from '../../src/components/shared/Accordion';
import { ContainerDeco } from '../decorators';
import SwitchToggle from '../../src/components/shared/SwitchToggle';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

storiesOf('Accordian', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));

const Default = () => {
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
              invisibleImage={IC_ARR_DOWN}
              visibleImage={IC_ARR_UP}
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

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: transparent;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
