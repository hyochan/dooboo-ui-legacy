import { InputContainerProps, InputWrapper, OptionTextProps, OptionWrapperProps } from './types';

import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const inputMargin = 20;

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
  margin: ${({ focus }): string => (focus ? `5px ${inputMargin}px` : `0 ${inputMargin}px`)};
  border-radius: 6px;
  flex-direction: row;
  border: ${({ focus }): string => (focus ? '2px solid' : '1px solid')};
  border-color: ${({ focus }): string => (focus ? 'royalblue' : '#000000')};
`;

export const InputInnerContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
`;

export const Input = styled.TextInput<any>`
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
  width: 50px;
  height: 56px;
  justify-content: center;
  align-items: center;
`;

export const OptionWrapper = styled.TouchableHighlight.attrs((props) => ({
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

export const styles = StyleSheet.create({
  optionsWrapper: {
    flexGrow: 0,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 6,
    marginHorizontal: inputMargin,
    backgroundColor: 'whitesmoke',
  },
});

/** @namespace SearchInput Reset Button */

export const ResetContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px;
  justify-content: flex-end;
  align-items: center;
`;

export const ResetCircle = styled.View`
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

/** @end SearchInput Reset Button */
