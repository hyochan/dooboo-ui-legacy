import { InputContainerProps, InputWrapper, OptionTextProps, OptionWrapperProps } from './types';

import { TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled.View<InputWrapper>`
  background-color: white;
  flex-direction: column;
  justify-content: center;
  top: ${({ on, inSets }): number => on ? inSets.top : 0}px;
  left: ${({ on, inSets }): number => on ? inSets.left : 0}px;
  bottom: ${({ on, inSets }): number => on ? inSets.bottom : 0}px;
  right: ${({ on, inSets }): number => on ? inSets.right : 0}px;
  width: ${({ on, width }): string => on ? `${width}px` : 'auto'};
  position: ${({ on }): string => on ? 'absolute' : 'relative'};
  z-index: ${({ on }): number => on ? 99 : 0};
`;

export const InputContainer = styled.View<InputContainerProps>`
  min-width: 250px;
  height: 60px;
  margin: ${({ on }): string => (on ? '5px 20px' : '0 20px')};
  margin-right: 20px;
  border-radius: 6px;
  flex-direction: row;
  border: ${({ on }): string => (on ? '2px solid' : '1px solid')};
  border-color: ${({ on }): string => (on ? 'royalblue' : '#000000')};
`;

export const Input = styled.TextInput`
  flex: 1;
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

export const OptionsContainer = styled.TouchableOpacity`
  flex-direction: column;
  border: 1px solid #ededed;
  border-radius: 6px;
  margin: 0 20px 20px;
  background-color: whitesmoke;
`;
