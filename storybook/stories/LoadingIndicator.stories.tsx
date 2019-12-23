import { IC_FACEBOOK, IC_GOOGLE, IC_KAKAO_LOADING } from '../../src/components/shared/Icons';

import { ContainerDeco } from '../decorators';
import LoadingIndicator from '../../src/components/shared/LoadingIndicator';
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
      <LoadingIndicator isImg={true} ImgSourceTypeUri={true} imgSource={{ uri: 'https://user-images.githubusercontent.com/27461460/62273345-49475e80-b478-11e9-8717-ce97f6f71230.png' }} containerStyle={{ backgroundColor: 'white' }} />
    </Container>
  );
}
