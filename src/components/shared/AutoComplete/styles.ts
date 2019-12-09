import { FlatList, TouchableHighlight } from 'react-native';
import { InputContainerProps, OptionTextProps, OptionWrapperProps } from './types';

import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

export const InputContainer = styled.View<InputContainerProps>`
  min-width: 250px;
  background-color: #f3f5f7;
  height: 60px;
  margin: ${({ on }): string => (on ? '5px 20px' : '0 20px')};
  margin-right: 20px;
  border-radius: 6px;
  flex-direction: row;
  border: 2px solid royalblue;
`;

export const Input = styled.TextInput`
  flex-grow: 1;
  align-self: center;
  font-size: 16px;
  padding: 10px;
`;

export const StyledImage = styled.Image`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 16px;
`;

export const CaretContainer = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

export const OptionWrapper = styled(
  TouchableHighlight as new () => TouchableHighlight,
).attrs((props) => ({
  underlayColor: props.underlayColor ? props.underlayColor : '#DBDBDB',
})) <OptionWrapperProps>`
  width: 100%;
  justify-content: center;
  height: 42px;
  padding: 5px 20px;
  background-color: ${({ isSelected }): string => (isSelected ? '#EBEBEB' : 'transparent')};
`;

export const OptionText = styled.Text<OptionTextProps>`
  color: #666;
  font-weight: ${({ fontWeight }): string => fontWeight || 'bold'};
  font-size: ${({ fontSize }): number => fontSize || 16}px;
`;

export const OptionsContainer = styled(
  FlatList as new () => FlatList<any>,
).attrs(() => ({
  contentContainerStyle: { paddingVertical: 10 },
}))`
  flex-direction: column;
  border: 1px solid #ededed;
  border-radius: 6px;
  margin: 0 20px 20px;
  background-color: whitesmoke;
`;
