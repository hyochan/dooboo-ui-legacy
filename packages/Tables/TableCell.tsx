import React, { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import styled from 'styled-components/native';

interface Props {
  children?: React.ReactNode;
  onPress?: () => void;
  cellStyle?: StyleProp<ViewStyle>;
  isShort?: boolean;
}

const Container = styled.View<{ isShort: boolean }>`
  width: ${({ isShort }): string => (isShort ? '50px' : '100px')};
  flex-direction: row;
  align-items: center;
`;
const StyledText = styled.Text`
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  align-items: center;
  text-align: center;
`;
function TableCell(props: Props): ReactElement {
  const { children, cellStyle, isShort } = props;
  return (
    <Container
      testID="table-cell-test-id"
      isShort={isShort}
      style={[{ paddingVertical: 12 }, cellStyle]}>
      <StyledText numberOfLines={2}>{children}</StyledText>
    </Container>
  );
}

export default TableCell;
