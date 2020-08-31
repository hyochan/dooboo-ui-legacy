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

const Selected = styled.Text`
  padding: 10px;
  font-size: 13px;
  font-weight: bold;
`;

function Default(): React.ReactElement {
  const [selected, setSelected] = React.useState<Array<string|number>>([]);

  const onPressItem = (value : string): void => {
    if (selected.indexOf(value) > -1) { setSelected(selected.filter((item) => item !== value)); } else {
      setSelected((prevArray) => [...prevArray, value]);
    }
  };

  return (
    <ScrollContainer>
      <Container>

        <Selected>Selected: {selected}</Selected>

        <Checkbox
          value={'female'}
          labelText={'Female'}
          boxColor={'orange'}
          selectedValue={selected}
          onPress={(value: string): void => onPressItem(value)}
        />

        <Checkbox
          value={'male'}
          labelText={'male'}
          boxColor={'orange'}
          selectedValue={selected}
          onPress={(value: string): void => onPressItem(value)}
        />

        <Checkbox
          value={'animal'}
          labelText={'animal'}
          boxColor={'orange'}
          selectedValue={selected}
          onPress={(value: string): void => onPressItem(value)}
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
