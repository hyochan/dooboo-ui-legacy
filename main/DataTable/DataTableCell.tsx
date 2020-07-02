import React, { ReactElement } from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity, Text, View } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  children?: React.ReactNode;
  numeric?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  isShort?: boolean;
};

const StyledText = styled.Text`
    width: 100%;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    align-items: center;
    text-align:center;

`
function DataTableCell(props: Props): ReactElement {
  const { children, style, numeric, isShort, ...rest } = props;
  return (
    <View
      testID='table-cell-test-id'
      {...rest}
      style={[styles.container,
      numeric && styles.right,
        style]}
    >
      <StyledText numberOfLines={2}  >{children}</StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  right: {
    justifyContent: 'flex-start',
  },
});

export default DataTableCell;
