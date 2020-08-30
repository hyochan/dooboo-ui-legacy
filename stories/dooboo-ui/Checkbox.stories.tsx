import React, { ReactElement } from 'react';

import { Checkbox } from '../../main';
import { ContainerDeco } from '../../storybook/decorators';

import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const ScrollContainer = styled.ScrollView`
  width: 100%;
`;

const Container = styled.View`
  background-color: transparent;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-direction: column;
`;

function Default(): React.ReactElement {
  return (
    <ScrollContainer>
      <Container>
        <Checkbox/>
      </Container>
    </ScrollContainer>
  );
}

export default {
  title: 'Checkbox',
};

export const toStorybook = (): ReactElement => <Default />;

/**
 * Below are stories for app
 */
storiesOf('Checkbox', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ));
