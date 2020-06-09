import { IC_ARR_DOWN, IC_ARR_UP } from '../Icon';
import React, { ReactElement } from 'react';
import { ScrollView, Text, View } from 'react-native';

import Accordion from '../../main/Accordion';
import { ContainerDeco } from '../../storybook/decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AccordionContainer = styled.ScrollView`
  width: 280px;
  background-color: transparent;
  flex-direction: column;
  margin: 0 20px;
  border-radius: 3px;
`;

const CustomHeaderContainer = styled.View`
  padding: 10px;
  background-color: darkgrey;
`;

const CustomBodyContainer = styled.View`
  padding: 10px;
  background-color: #ddd;
`;

const StyledImage = styled.Image`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 8px;
  right: 16px;
`;

const Default = (): React.ReactElement => {
  const contents = [
    {
      title: 'Title 1',
      body: 'Hi. I love this component. What do you think?',
    },
    {
      title: 'Title 2',
      body: 'Hi. I love this component. What do you think?',
    },
    {
      title: 'Title 3',
      body:
        'Hi. I love this component. What do you think? Hi. I love this component. What do you think?',
    },
    {
      title: 'Title 4',
      body: 'Hi. I love this component. What do you think?',
    },
    {
      title: 'Title 5',
      body: 'Hi. I love this component. What do you think?',
    },
  ];

  return (
    <Container>
      <AccordionContainer>
        {contents.map((param, i) => {
          return (
            <Accordion
              key={i}
              contentVisible={true}
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
                <CustomHeaderContainer>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#fff',
                    }}>
                    {param.title}
                  </Text>
                </CustomHeaderContainer>
              }>
              <CustomBodyContainer>
                <Text>{param.body}</Text>
              </CustomBodyContainer>
            </Accordion>
          );
        })}
      </AccordionContainer>
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
