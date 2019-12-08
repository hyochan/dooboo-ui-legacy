import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native'; 
import styled from 'styled-components/native';
import RadioButton from '../../src/components/shared/RadioButton';

const Container = styled.SafeAreaView`
  flex: 1;
`;

const Title = styled.Text`
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const Divider = styled.View`
  display: flex;
  margin: 10px;
  border: 0.5px solid lightgray;
`;

storiesOf('RadioButton', module).add('default', () => (
  <>
    <Default />
  </>
));

function Default(): React.ReactElement {
  const [selectedGender, setSelectedGender] = React.useState('female');
  const [selectedStandAlone, setSelectedStandAlone] = React.useState('1');
  const [selectedLabelPlacement, setSelectedLabelPlacement] = React.useState('top');

  const handlePressGender = value => {
    setSelectedGender(value);
  };

  const handlePressStandAlone = value => {
    setSelectedStandAlone(value);
  };

  const handlePressLabelPlacement = value => {
    setSelectedLabelPlacement(value);
  };

  return (
    <Container>

      <Title>Gender</Title>
      {/* <Text>{selectedGender}</Text> */}
      <RadioButton 
        value={'female'} 
        label={'Female'} 
        color={'orange'} 
        selectedValue={selectedGender} 
        onPress={handlePressGender}
      />
      <RadioButton 
        value={'male'} 
        label={'Male'} 
        color={'orange'} 
        selectedValue={selectedGender} 
        onPress={handlePressGender}
      />
      <RadioButton 
        value={'other'} 
        label={'Other'} 
        color={'orange'} 
        selectedValue={selectedGender} 
        onPress={handlePressGender}
      />
      <RadioButton 
        value={''} 
        label={'(Disabled Value)'} 
        color={'#0000ff'} 
        selectedValue={selectedGender} 
        onPress={handlePressGender}
        isDisabled={true}
      />

      <Divider />

      <Title>StandAlone</Title>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <RadioButton 
          value={'1'} 
          label={''} 
          selectedValue={selectedStandAlone} 
          onPress={handlePressStandAlone}
          color={'orchid'}
          size={17}
        />
        <RadioButton 
          value={'2'} 
          label={''} 
          selectedValue={selectedStandAlone} 
          onPress={handlePressStandAlone}
          color={'mediumorchid'} 
          size={22}
        />
        <RadioButton 
          value={'3'} 
          label={''} 
          selectedValue={selectedStandAlone} 
          onPress={handlePressStandAlone}
          color={'darkorchid'} 
          size={27}
        />
        <RadioButton 
          value={'4'} 
          label={''} 
          selectedValue={selectedStandAlone} 
          onPress={handlePressStandAlone}
          color={'darkmagenta'} 
          size={32}
        />
        <RadioButton 
          value={'5'} 
          label={''} 
          selectedValue={selectedStandAlone} 
          onPress={handlePressStandAlone}
          color={'indigo'} 
          size={37}
        />
      </View>
      
      <Divider />
      
      <Title>labelPlacement</Title>
      {/* <Text>{selectedLabelPlacement}</Text> */}
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <RadioButton 
          value={'top'} 
          label={'Top'} 
          selectedValue={selectedLabelPlacement} 
          onPress={handlePressLabelPlacement}
          color={'green'}
          labelPlacement={'top'} 
        />
        <RadioButton 
          value={'start'} 
          label={'Start'} 
          selectedValue={selectedLabelPlacement} 
          onPress={handlePressLabelPlacement}
          color={'green'} 
          labelPlacement={'start'} 
        />
        <RadioButton 
          value={'bottom'} 
          label={'Bottom'} 
          selectedValue={selectedLabelPlacement} 
          onPress={handlePressLabelPlacement}
          color={'green'} 
          labelPlacement={'bottom'} 
        />
        <RadioButton 
          value={'end'} 
          label={'End'} 
          selectedValue={selectedLabelPlacement} 
          onPress={handlePressLabelPlacement}
          color={'green'} 
          labelPlacement={'end'} 
        />
      </View>

    </Container>
  )
}