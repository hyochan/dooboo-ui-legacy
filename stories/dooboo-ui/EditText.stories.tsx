import React, { ReactElement } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { ContainerDeco } from '../../storybook/decorators';
import EditText from '../../main/EditText';
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
  const errorMessage = (
    <Text style={{ color: '#E54E4E', marginTop: 8 }}>
      This is custom error message
    </Text>
  );
  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <View>
            <StyledTitle>
              Default Type
            </StyledTitle>
            <EditText
              numberOfLines={1}
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <StyledTitle>
              Password Type
            </StyledTitle>
            <EditText
              numberOfLines={1}
              secureTextEntry={true}
              placeholder={'password'}
              labelText={'Password'}
              isErrored={true}
              errorMessage={errorMessage}
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <StyledTitle>
              Row Type
            </StyledTitle>
            <EditText
              labelPosition={'row'}
              numberOfLines={1}
              placeholder={'Row'}
              labelText={'Label'}
              isErrored={true}
            />
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
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
