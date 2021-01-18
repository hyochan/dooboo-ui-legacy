import {TextStyle, ViewStyle} from 'react-native';

import React from 'react';
import styled from 'styled-components/native';

export interface SelectItemProps {
  testID?: string;
  value: string;
  onSelectItem?: ((param: string) => void) | undefined;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: string;
}

const ItemWrapper = styled.TouchableOpacity.attrs({activeOpacity: 0.9})`
  width: 100%;
  padding: 14px 12px;
  justify-content: center;
`;

const ItemText = styled.Text`
  font-size: 12px;
  color: #2b2b2b;
`;

const SelectItem: React.FC<SelectItemProps> = (props): React.ReactElement => {
  const {
    testID,
    children = '',
    onSelectItem = (value): string => value,
    value,
    style,
    textStyle,
  } = props;

  return (
    <ItemWrapper
      testID={testID}
      style={style}
      onPress={(): void => onSelectItem(value)}>
      <ItemText style={textStyle}>{children}</ItemText>
    </ItemWrapper>
  );
};

export default SelectItem;
