import { TextStyle, ViewStyle } from 'react-native';

import React from 'react';
import { THEME } from './theme';
import styled from 'styled-components/native';

interface Props {
  testID?: string;
  isDarkMode?: boolean; // dark mode
  activeOpacity?: number; // set the opacity of selected value
  containerHeight?: number; // fix the height of dropdown list
  value: string | number; // current selected value
  onSelectItem?:((param: string | number) => any) | undefined;
  customTextStyle?: TextStyle;
  customStyle?: ViewStyle;
  children?: string | number;
}
const ItemWrapper = styled.TouchableOpacity`
  width: 100%;
  padding: 14px 12px;
  justify-content: center;
  opacity: 0.9;
`;
const ItemText = styled.Text<{ dark: boolean | undefined }>`
  font-size: 12px;
  color: ${({ dark }): string =>
    dark ? THEME.DARK.fontColor : THEME.LIGHT.fontColor};
  opacity: 0.9;
`;
const Item: React.FC<Props> = (props): React.ReactElement => {
  // Init props
  const {
    testID = 'Item',
    children = '',
    onSelectItem = (value): string | number => value,
    containerHeight,
    activeOpacity = 1,
    value,
    isDarkMode = false,
    customTextStyle,
    customStyle,
  } = props;

  React.useEffect(() => {}, [value]);
  return (
    <ItemWrapper
      testID={`item-${testID}`}
      activeOpacity={activeOpacity}
      style={[{ height: containerHeight }, customStyle]}
      onPress={(): void => onSelectItem(value)}>
      <ItemText dark={isDarkMode} style={customTextStyle}>
        {children}
      </ItemText>
    </ItemWrapper>
  );
};

export default Item;
