import React, { ReactElement } from 'react';

// eslint-disable-next-line sort-imports
import { CheckboxGroup } from '../../main';
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

const Selected = styled.Text`
  padding: 20px;
  font-size: 13px;
  font-weight: bold;
`;

let defaultCheckboxData: any[] = [
  {
    label: 'first',
    value: 1,
    selected: true,
  },
  {
    label: 'second',
    value: 2,
    selected: false,
  },
  {
    label: 'third',
    value: 3,
    selected: false,
  },
];

let disabledCheckboxData: any[] = [
  {
    label: 'first',
    value: 1,
    selected: true,
  },
  {
    label: 'second',
    value: 2,
    selected: false,
  },
  {
    label: 'checked disabled value',
    value: 3,
    selected: true,
    disabled: true,
  },
  {
    label: 'unchecked disabled value',
    value: 4,
    selected: false,
    disabled: true,
  },
];


function Default(): React.ReactElement {
  return (
    <ScrollContainer>
      <Container>

        <Selected>Selected: {1}</Selected>

        <CheckboxGroup
          boxSize={20}
          boxColor={'orange'}
          labelSize={20}
          labelColor={'#000000'}
          selectedValue={defaultCheckboxData}
        />

        <Selected>checkbox disabled</Selected>

        <CheckboxGroup
          boxSize={20}
          boxColor={'orange'}
          labelSize={20}
          labelColor={'#000000'}
          selectedValue={disabledCheckboxData}
        />

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
