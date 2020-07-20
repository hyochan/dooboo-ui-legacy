import React from 'react';
import { THEME } from './theme';
import styled from 'styled-components/native';

interface Props {
  testID?: string;
  dark?: boolean; // dark mode
  activeOpacity?: number; // set the opacity of selected value
  containerHeight?: number; // fix the height of dropdown list
  value: string | number; // current selected value
  onSelectItem?: (param: string | number) => any | undefined;
  style?: React.CSSProperties; // TextStyle | ViewStyle
  children?: string | number;
}
const ItemWrapper = styled.TouchableOpacity`
  width: 100%;
  padding: 14px 12px;
  justify-content: center;
  color: inherit;
`;
const ItemText = styled.Text<{ dark: boolean }>`
  font-size: 12px;
  color: ${({ dark }): string =>
    dark ? THEME.DARK.fontColor : THEME.LIGHT.fontColor};
`;
const Item: React.FC<Props> = (props): React.ReactElement => {
  // Init props
  const { children, onSelectItem, containerHeight, activeOpacity, value, dark } = props;

  React.useEffect(() => {}, [value]);
  return (
    <ItemWrapper
      testID={`item-${children}`}
      activeOpacity={activeOpacity}
      style={{ height: containerHeight }}
      onPress={(): any => onSelectItem(value)}>
      <ItemText dark={dark || false}>{children || ''}</ItemText>
    </ItemWrapper>
  );
};

export default Item;
