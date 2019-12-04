import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #f3f5f7;
  height: 42;
  margin-left: 20;
  margin-right: 20;
  border-radius: 8;
  flex-direction: row;
`;

export const Input = styled.TextInput`
  flex-grow: 1;
  align-self: center;
  font-size: 16;
`;

export const ResetContainer = styled.View`
  height: 24;
  width: 24;
  margin-left: 2;
  margin-right: 11;
  margin-top: 9;
  margin-bottom: 9;
  justify-content: center;
  align-items: center;
`;

export const Reset = styled.TouchableOpacity`
  background-color: #c6ccd1;
  border-radius: 20;
  width: 20;
  height: 20;
  justify-content: center;
  align-items: center;
`;

export const ResetText = styled.Text`
  color: white;
`;
