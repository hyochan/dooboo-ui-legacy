import React, { ReactElement } from 'react';

import { ContainerDeco } from '../../storybook/decorators';
import Select from '../../main/Select';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 185px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const Default = (): React.ReactElement => {
  return (
    <Container>
      <Select
        testID={'defaultSelect'}
        activeOpacity={1}
        onPress={():void => console.log('YEAHH')}
        dark={true}
        disabled={false}
        placeholder={'New fancy select'}
      />
    </Container>
  );
};

/**
 * Below are stories for web
 */
export default {
  title: 'Select',
};

export const toStorybook1 = (): ReactElement => <Default />;

toStorybook1.story = {
  name: 'default',
};

/**
 * Below are stories for app
 */
storiesOf('Select', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />, {
    notes: 'Simple explanation',
  });
