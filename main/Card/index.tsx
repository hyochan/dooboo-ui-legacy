import React, { FC, ReactNode, ReactNodeArray } from 'react';
import { ViewStyle } from 'react-native';

import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
`;

interface Props {
  testID?: string;
  containerStyle?: ViewStyle;
  children?: ReactNode | ReactNodeArray;
}

const Card: FC<Props> = (props) => {
  const { containerStyle, children } = props;
  return <Container style={[containerStyle]}>{children}</Container>;
};

Card.defaultProps = {};

export { Card };
