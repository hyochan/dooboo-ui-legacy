import { TextStyle, ViewStyle } from 'react-native';

import React from 'react';
import styled from 'styled-components/native';

interface Props {
  testID?: string;
  activeOpacity?: number;
  containerHeight?: number;
  value: string | number;
  onSelectItem?:((param: string | number, param2: string | number) => string | number) | undefined;
  customStyle?: ViewStyle
  customTextStyle?: TextStyle;
  children?: string | number;
}
const ItemWrapper = styled.TouchableOpacity`
  width: 100%;
  padding: 14px 12px;
  justify-content: center;
`;
const ItemText = styled.Text`
  font-size: 12px;
  color: #2b2b2b;
`;
const Item: React.FC<Props> = (props): React.ReactElement => {
  const {
    testID,
    children = '',
    onSelectItem = (children, value): string | number => value,
    containerHeight,
    activeOpacity = 0.75,
    value,
    customStyle,
    customTextStyle,
  } = props;

  React.useEffect(() => {}, [value]);
  return (
    <ItemWrapper
      testID={testID}
      activeOpacity={activeOpacity}
      style={[{ height: containerHeight }, customStyle]}
      onPress={(): string | number => onSelectItem(children, value)}>
      <ItemText style={customTextStyle}>{children}</ItemText>
    </ItemWrapper>
  );
};

export default Item;
