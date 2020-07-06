import React, { ReactElement } from 'react';
import { View, ViewStyle } from 'react-native';

import styled from 'styled-components/native';

type Props = React.ComponentPropsWithRef<typeof View> & {
  children: React.ReactNode;
  headerStyle?: ViewStyle;
};

const HeaderContainer = styled.View`
  flex-direction: row;
  height: 48px;
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
`;

function TableHeader(props: Props): ReactElement {
  const { children, headerStyle } = props;

  return (
    <HeaderContainer style={[headerStyle]} testID="table-header-test-id">
      {children}
    </HeaderContainer>
  );
}

export default TableHeader;
