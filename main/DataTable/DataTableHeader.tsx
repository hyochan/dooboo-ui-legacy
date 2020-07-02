import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

type Props = React.ComponentPropsWithRef<typeof View> & {
  children: React.ReactNode;
  style?: ViewStyle;
};

const HeaderContainer = styled.View`
    flex-direction: row;
    height:48px;
    border-bottom-width: 1px;
    border-bottom-color: lightgray;
`
function DataTableHeader(props: Props) {
  const { children, style, ...rest } = props;

  return (
    <HeaderContainer {...rest} style={[style]} testID='table-header-test-id'>
      {children}
    </HeaderContainer>
  );
}

export default (DataTableHeader);

