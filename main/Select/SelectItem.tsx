import {TextStyle, ViewStyle} from 'react-native';

import React from 'react';
import styled from '@emotion/native';

export interface SelectItemProps {
  testID?: string;
  value: string;
  onSelectItem?: ((param: string) => void) | undefined;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: string;
}

const ItemWrapper = styled.TouchableOpacity({
  width: 100,
  paddingHorizontal: 12,
  paddingVertical: 14,
  justifyContent: 'center',
});

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
      activeOpacity={0.9}
      style={style}
      onPress={(): void => onSelectItem(value)}>
      <ItemText style={textStyle}>{children}</ItemText>
    </ItemWrapper>
  );
};

export default SelectItem;
