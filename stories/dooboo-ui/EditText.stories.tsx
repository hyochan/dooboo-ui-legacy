import React, { ReactElement } from 'react';
import { ContainerDeco } from '../../storybook/decorators';
import EditText from '../../main/EditText';
import { View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
`;

const StyledTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 30px;
`;

const Default = ():React.ReactElement => {
  return (
    <Container>
      <View>
        <StyledTitle>
          Default Type
        </StyledTitle>
      </View>
      <EditText
        numberOfLines={1}
      />

      <View style={{ marginTop: 30 }}>
        <StyledTitle>
          Password Type
        </StyledTitle>
      </View>
      <EditText
        numberOfLines={1}
        secureTextEntry={true}
        placeholder={'password'}
        labelText={'Password'}
      />
    </Container>
  );
};

/**
 * Below are stories for web
 */
export default {
  title: 'EditText',
};

export const toStorybook = (): ReactElement => <Default />;

toStorybook.story = {
  name: 'default',
  notes: 'Simple explanation',
};

/**
 * Below are stories for app
 */
storiesOf('EditText', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />, {
    notes: 'Simple explanation',
  });
