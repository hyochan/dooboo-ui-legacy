import { IC_FACEBOOK, IC_GOOGLE } from '../Icon';
import { Image, View } from 'react-native';
import React, { ReactElement, useState } from 'react';

import { ContainerDeco } from '../../storybook/decorators';
import { DatePicker } from '../../main';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';
import { text } from '@storybook/addon-knobs';

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
  const [facebookLoading, setFacebookLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  return (
    <ScrollContainer>
      <Container>
        <DatePicker />
      </Container>
    </ScrollContainer>
  );
}

function DateInput(): React.ReactElement {
  return (
    <ScrollContainer>
      <Container>
        <DatePicker />
      </Container>
    </ScrollContainer>
  );
}

/**
 * Below are stories for web
 */
export default {
  title: 'DatePicker',
};

export const toStorybook1 = (): ReactElement => <Default />;
export const toStorybook2 = (): ReactElement => <DateInput />;
toStorybook1.story = {
  name: 'default',
};
toStorybook2.story = {
  name: 'input',
};

/**
 * Below are stories for app
 */
storiesOf('DatePicker', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <>
      <Default />
    </>
  ))
  .add('input', () => <DateInput />, {
    notes: 'Datapicker Input',
  });
