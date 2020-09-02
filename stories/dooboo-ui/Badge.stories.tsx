import React, { ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Badge } from '../../main/Badge';
import { ContainerDeco } from '../../storybook/decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ShowContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const StyledTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
`;

const StyledView: any = styled.View`
  margin : 20px;
  width : 100px;
  height : 100px;
  background-color : gray;
`;

const Badge1 = (): React.ReactElement => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: 8,
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 100,
        }}
      >
        <Container>
          <View style={{ marginTop: 50 }}>
            <StyledTitle>
              Badge (default)
            </StyledTitle>
            <StyledView>
              <Badge />
            </StyledView>
          </View>

          <View>
            <StyledTitle>
              Badge (showZero)
            </StyledTitle>
            <ShowContainer>
              <StyledView>
                <Badge color="blue" count={0} maximumValue={0} />
              </StyledView>
              <StyledView>
                <Badge color="pink" count={0} maximumValue={0} showZero />
              </StyledView>
            </ShowContainer>
          </View>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

const Badge2 = (): React.ReactElement => {
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          marginTop: 8,
          alignSelf: 'stretch',
          paddingHorizontal: 20,
          paddingVertical: 100,
        }}
      >
        <Container>
          <View>
            <StyledTitle>
              Badge 3
            </StyledTitle>
            <StyledView>
              <Badge color="blue" count={0} maximumValue={0} />
            </StyledView>
          </View>
          <View style={{ marginTop: 50 }}>
            <StyledTitle style={{ marginBottom: 10 }}>
              Badge 4
            </StyledTitle>
            <StyledView>
              <Badge color="red" count={0} maximumValue={0} showZero />
            </StyledView>
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
  title: 'Badge',
};

export const toStorybook1 = (): ReactElement => <Badge1 />;
export const toStorybook2 = (): ReactElement => <Badge2 />;

toStorybook1.story = {
  name: 'Badge',
  notes: 'Basic TextInput style',
};
toStorybook2.story = {
  name: 'Badge2',
  notes: 'You can change the label position.',
};

/**
 * Below are stories for app
 */
storiesOf('Badge', module)
  .addDecorator(ContainerDeco)
  .add('Badge11', () => <Badge1 />, {
    notes: 'Basic TextInput style',
  })
  .add('Badge22', () => <Badge2 />, {
    notes: 'You can change the label position.',
  });
