import React, { ReactElement } from 'react';
import { ScrollView, View } from 'react-native';
import { boolean, color, number, select, text } from '@storybook/addon-knobs';

import { ContainerDeco } from '../../storybook/decorators';
import RadioButton from '../../main/RadioButton';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const groupId = 'RadioButton';

const Title = styled.Text`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const Selected = styled.Text`
  padding: 10px;
  font-size: 13px;
  font-weight: bold;
`;

const Divider = styled.View`
  display: flex;
  margin: 10px;
  border: 0.5px solid lightgray;
`;

const Normal = (): React.ReactElement => {
  const [selectedGender, setSelectedGender] = React.useState<string>('');

  return (
    <View>
      <Title>Gender</Title>
      <View>
        <Selected>Selected: {selectedGender}</Selected>
        <RadioButton
          value={'female'}
          label={'Female'}
          color={'orange'}
          selectedValue={selectedGender}
          onPress={(value: string): void => setSelectedGender(value)}
        />
        <RadioButton
          value={'male'}
          label={'Male'}
          color={'orange'}
          selectedValue={selectedGender}
          onPress={(value: string): void => setSelectedGender(value)}
        />
        <RadioButton
          value={'other'}
          label={'Other'}
          color={'orange'}
          selectedValue={selectedGender}
          onPress={(value: string): void => setSelectedGender(value)}
        />
        <RadioButton
          value={''}
          label={'(Disabled Value)'}
          color={'#0000ff'}
          selectedValue={selectedGender}
          onPress={(value: string): void => setSelectedGender(value)}
          disabled={true}
        />
        <RadioButton
          value={''}
          label={'(Selected Disabled Value)'}
          color={'#0000ff'}
          selectedValue={selectedGender}
          onPress={(value: string): void => setSelectedGender(value)}
          disabled={true}
          selected={true}
        />
      </View>
    </View>
  );
};

const StandAlone = (): React.ReactElement => {
  const [selectedStandAlone, setSelectedStandAlone] = React.useState<string>('');

  return (
    <View>
      <Title>StandAlone</Title>
      <Selected>Selected: {selectedStandAlone}</Selected>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <RadioButton
          value={'1'}
          selectedValue={selectedStandAlone}
          onPress={(value: string): void => setSelectedStandAlone(value)}
          color={'orchid'}
          size={18}
        />
        <RadioButton
          value={'2'}
          selectedValue={selectedStandAlone}
          onPress={(value: string): void => setSelectedStandAlone(value)}
          color={'mediumorchid'}
          size={23}
        />
        <RadioButton
          value={'3'}
          selectedValue={selectedStandAlone}
          onPress={(value: string): void => setSelectedStandAlone(value)}
          color={'darkorchid'}
          size={28}
        />
        <RadioButton
          value={'4'}
          selectedValue={selectedStandAlone}
          onPress={(value: string): void => setSelectedStandAlone(value)}
          color={'darkmagenta'}
          size={33}
        />
        <RadioButton
          value={'5'}
          selectedValue={selectedStandAlone}
          onPress={(value: string): void => setSelectedStandAlone(value)}
          color={'indigo'}
          size={38}
        />
      </View>
    </View>
  );
};

const Controllable = (): React.ReactElement => {
  const [controllable, setControllable] = React.useState<string>('');

  return (
    <View>
      <Title>Controllable Example(Use knobs)</Title>
      <Selected>Selected: {controllable}</Selected>
      <View style={{ alignItems: 'center' }}>
        <RadioButton
          value={text('value1', 'value1', groupId)}
          label={text('label1', 'value1', groupId)}
          selectedValue={controllable}
          onPress={setControllable}
          color={color('color1', 'red', groupId)}
          labelPlacement={select(
            'labelPlacement1',
            ['start', 'top', 'bottom', 'end'],
            'start',
            groupId,
          )}
          size={number('size', 20, { min: 0 }, groupId)}
          disabled={boolean('disabled', false, groupId)}
          selected={boolean('selected', false, groupId)}
        />
      </View>
    </View>
  );
};

function LabelPlacement(): React.ReactElement {
  const [selectedLabelPlacement, setSelectedLabelPlacement] = React.useState(
    'top',
  );

  return (
    <View>
      <Title>labelPlacement</Title>
      <Selected>Selected: {selectedLabelPlacement}</Selected>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <RadioButton
          value={'top'}
          label={'Top'}
          selectedValue={selectedLabelPlacement}
          onPress={(value: string): void => setSelectedLabelPlacement(value)}
          color={'green'}
          labelPlacement={'top'}
        />
        <RadioButton
          value={'start'}
          label={'Start'}
          selectedValue={selectedLabelPlacement}
          onPress={(value: string): void => setSelectedLabelPlacement(value)}
          color={'green'}
          labelPlacement={'start'}
        />
        <RadioButton
          value={'bottom'}
          label={'Bottom'}
          selectedValue={selectedLabelPlacement}
          onPress={(value: string): void => setSelectedLabelPlacement(value)}
          color={'green'}
          labelPlacement={'bottom'}
        />
        <RadioButton
          value={'end'}
          label={'End'}
          selectedValue={selectedLabelPlacement}
          onPress={(value: string): void => setSelectedLabelPlacement(value)}
          color={'green'}
          labelPlacement={'end'}
        />
      </View>
    </View>
  );
}

/**
 * Below are stories for web
 */
export default {
  title: 'RadioButton',
};
export const toStorybook = (): ReactElement => <Normal />;
export const toStorybook2 = (): ReactElement => <StandAlone />;
export const toStorybook3 = (): ReactElement => <LabelPlacement />;
export const toStorybook4 = (): ReactElement => <Controllable />;

toStorybook.story = {
  name: 'Normal',
};
toStorybook2.story = {
  name: 'StandAlone',
};
toStorybook3.story = {
  name: 'LabelPlacement',
};
toStorybook4.story = {
  name: 'Controllable',
};

/**
 * Below are stories for app
 */
storiesOf('RadioButton', module)
  .addDecorator(ContainerDeco)
  .add('default', () => (
    <ScrollView>
      <Normal />
      <Divider />
      <StandAlone />
      <Divider />
      <LabelPlacement />
      <Divider />
      <Controllable />
      <Divider />
    </ScrollView>
  ))
  .add('Normal', () => (
    <Normal />
  ))
  .add('StandAlone', () => (
    <StandAlone />
  ))
  .add('LabelPlacement', () => (
    <LabelPlacement />
  ))
  .add('Controllable', () => (
    <Controllable />
  ));
