import React, { ReactElement, useState } from 'react';
import { ContainerDeco } from '../../storybook/decorators';
import Modal from '../../main/Modal/Modal';
import { Text } from 'react-native';
import { storiesOf } from '@storybook/react-native';

import styled from 'styled-components/native';

const Wrap = styled.View`
  background-color: transparent;
  width: 100%;
  height: 500px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

const Container = styled.View`
  width: 33%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ModalOpenButton = styled.TouchableOpacity`
  width: 180;
  height: 60;
  background-color: #088edf;
  border-radius: 5;
  justify-content: center;
  align-items: center;
  z-index: -9;
  position: absolute;
`;

const PickerContainer = styled.View`
  width: 100%;
  height: 500px;
  justify-content: center;
  align-items: center;
`;

function Default(props): React.ReactElement {
  const { style, textStyle } = props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [curIdx, setCurIdx] = useState(0);

  const openModal = (num) => {
    setCurIdx(num);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Wrap>
      <Container>
        <ModalOpenButton
          onPress={() => {
            setIsAnimated(true);
            openModal(1);
          }}>
          <Text
            style={[
              textStyle,
              { color: '#ffff', fontWeight: '600', fontSize: '17px' },
            ]}>
            Default
          </Text>
        </ModalOpenButton>
        {modalVisible && curIdx === 1 && (
          <Modal
            visible={modalVisible}
            closable={true}
            backDropClosable={true}
            onClose={closeModal}
            style={style}
            isAnimated={isAnimated}
            animationType={'default'}
            animationSpeed={700}>
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
      <Container>
        <ModalOpenButton
          onPress={(): void => {
            setIsAnimated(true);
            openModal(2);
          }}>
          <Text
            style={[
              textStyle,
              { color: '#ffff', fontWeight: '600', fontSize: '17px' },
            ]}>
            Fade In
          </Text>
        </ModalOpenButton>
        {modalVisible && curIdx === 2 && (
          <Modal
            visible={modalVisible}
            closable={true}
            backDropClosable={true}
            onClose={closeModal}
            style={style}
            isAnimated={isAnimated}
            animationType={'fadeIn'}
            animationSpeed={700}>
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
      <Container>
        <ModalOpenButton
          onPress={(): void => {
            setIsAnimated(true);
            openModal(3);
          }}>
          <Text
            style={[
              textStyle,
              { color: '#ffff', fontWeight: '600', fontSize: '17px' },
            ]}>
            Zoom In
          </Text>
        </ModalOpenButton>
        {modalVisible && curIdx === 3 && (
          <Modal
            visible={modalVisible}
            closable={true}
            backDropClosable={true}
            onClose={closeModal}
            style={style}
            isAnimated={isAnimated}
            animationType={'zoom'}
            animationSpeed={700}>
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
    </Wrap>
  );
}

function ModalPicker(props): React.ReactElement {
  const { style, textStyle } = props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [curIdx, setCurIdx] = useState(0);
  const [value, setValue] = useState('DoobooLab');

  const openModal = (num): void => {
    setCurIdx(num);
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
    <PickerContainer>
      <ModalOpenButton
        onPress={(): void => {
          setIsAnimated(true);
          openModal(1);
        }}>
        <Text
          style={[
            textStyle,
            { color: '#ffff', fontWeight: '600', fontSize: '17px' },
          ]}>
          {value}
        </Text>
      </ModalOpenButton>
      {modalVisible && curIdx === 1 && (
        <Modal
          visible={modalVisible}
          closable={true}
          backDropClosable={true}
          onClose={closeModal}
          style={style}
          isAnimated={isAnimated}
          animationType={'default'}
          animationSpeed={700}
          mode={'modalPicker'}
          data={data}
          value={value}
          setValue={setValue}></Modal>
      )}
    </PickerContainer>
  );
}

export default {
  title: 'Modal',
};

export const toStorybook = (): ReactElement => <Default />;
export const toStorybook2 = (): ReactElement => <ModalPicker />;

toStorybook.story = {
  name: 'Default',
};
toStorybook2.story = {
  name: 'ModalPicker',
};

storiesOf('Modal', module)
  .addDecorator(ContainerDeco)
  .add('Default', () => <Default />)
  .add('ModalPicker', () => <ModalPicker />);
