import React, { ReactElement, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import styled from 'styled-components/native';

interface Props {
  children: ReactNode;
  isChecked?: boolean;
  rowStyle?: StyleProp<ViewStyle>;
}

const Container = styled.View`
  width: 100%;
  height: 48px;
`;
const Content = styled.View<{ isChecked: boolean }>`
  height: 48px;
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
  flex-direction: row;
  background: ${({ isChecked }): string => (isChecked ? '#f2f9ff' : 'white')};
`;

function TableRow(props: Props): ReactElement {
  const { isChecked, rowStyle } = props;

  return (
    <Container testID="table-row-test-id" style={[rowStyle]}>
      <Content isChecked={isChecked}>{props.children}</Content>
    </Container>
  );
}

export default TableRow;
