import {
  InputContainerProps,
  InputWrapper,
  MarginSpaceProps,
  OptionTextProps,
  OptionWrapperProps,
} from './types';

import { StyleSheet } from 'react-native';
import chroma from 'chroma-js';
import styled from 'styled-components/native';

export const INPUT_MARGIN = 20;

export const EXTRA_HEIGHT = 20;

export const DEFAULT_WIDTH = 240;

export const Wrapper = styled.View<InputWrapper>`
  flex: 1;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  width: ${({ focused, width }): string => focused ? `${width}px` : 'auto'};
  height: ${({ focused, height }): string => focused ? `${height}px` : 'auto'};
  position: ${({ focused }): string => focused ? 'absolute' : 'relative'};
  z-index: ${({ focused }): number => focused ? 99 : 0};
`;

export const InputContainer = styled.View<InputContainerProps>`
  height: 60px;
  margin: ${({ focus }): string => (focus ? `5px ${INPUT_MARGIN}px` : `0 ${INPUT_MARGIN}px`)};
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

// prop type any is due to the inconsistency of types between ReactNative.TextInput and Styled-component's ReactNative.TextInput.
// in this case, 'style' and 'ref' props' styles are not matching.
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

export const OptionWrapper = styled.TouchableHighlight.attrs(({ underlayColor }) => ({
  underlayColor: underlayColor || '#DBDBDB',
})) <OptionWrapperProps>`
  width: 100%;
  justify-content: center;
  height: 42px;
  padding: 5px 20px;
  background-color: ${({ isSelected, underlayColor }): string => (
    isSelected
      ? chroma(underlayColor).brighten(3).hex()
      : 'transparent'
  )};
`;

export const InnerOptionWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const MarginSpace = styled.View<MarginSpaceProps>`
  ${({ location }): string => (location === 'left' ? 'margin-left: 10px' : 'margin-right: 10px')}
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
    marginHorizontal: INPUT_MARGIN,
  },
});

/** @namespace SearchInput Reset Button modified */

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
