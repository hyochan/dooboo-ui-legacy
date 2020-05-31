import { ContainerDeco } from '../../.storybook/decorators';
import LoadingIndicator from '../../main/LoadingIndicator';
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

storiesOf('LoadingIndicator', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  )).add('imgVersion', () => (
    <>
      <ImgVersion />
    </>
  ));

const Container = styled.View`
  flex: 1;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const StyledText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 120px;
`;

function Default(): React.ReactElement {
  return (
    <Container>
      <LoadingIndicator />
    </Container>
  );
}

function ImgVersion(): React.ReactElement {
  return (
    <Container>
      <LoadingIndicator imgSource="https://user-images.githubusercontent.com/31176502/71331734-ca61d800-2576-11ea-8934-6a260a1d714e.gif" containerStyle={{ backgroundColor: 'white' }} />
      <StyledText>Loading ... </StyledText>
    </Container>
  );
}
