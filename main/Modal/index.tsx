import React, { useState } from 'react';
import { Text, TextStyle, ViewStyle } from 'react-native';
import Modal from './Modal';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ModalOpenButton = styled.TouchableOpacity`
  width: 250;
  height: 70;
  background-color: #088edf;
  border-radius: 5;
  justify-content: center;
  align-items: center;
  z-index: -9;
  position: absolute;
`;

interface Props {
  style?: ViewStyle | undefined;
  textStyle?: TextStyle | undefined;
}

function ModalPage(props: Props): React.ReactElement {
  const { style, textStyle } = props;

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [value, setValue] = useState('DoobooLab');

  const openModal = (): void => {
    setModalVisible(true);
  };
  const closeModal = (): void => {
    setModalVisible(false);
  };

  const data = [
    { section: true, label: 'DoobooLab' },
    { label: 'Hyo' },
    { label: 'Daniel' },
    { label: 'Sarah' },
    { label: 'Clark' },
    { label: 'Dean' },
    { label: 'Rosie' },
    { label: 'Song' },
  ];

  return (
    <Container>
      <ModalOpenButton
        onPress={() => {
          setIsAnimated(true);
          openModal();
        }}>
        <Text
          style={[
            textStyle,
            { color: '#ffff', fontWeight: '600', fontSize: '17px' },
          ]}>
          {value}
        </Text>
      </ModalOpenButton>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          backDropClosable={true}
          onClose={closeModal}
          style={style}
          isAnimated={isAnimated}
          setIsAnimated={setIsAnimated}
          animationType={'default'}
          animationSpeed={700}
          mode={'modalPicker'}
          data={data}
          value={value}
          setValue={setValue}>
          <Text
            style={[
              textStyle,
              { color: '#088EDF', fontWeight: '600', textAlign: 'center' },
            ]}>
            Hello, I am Modal 🤘🏻
          </Text>
        </Modal>
      )}
    </Container>
  );
}

export default ModalPage;
