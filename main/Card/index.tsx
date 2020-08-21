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
  
  width: 200px;
  height: 500px;
  border: 1px solid #000;
`;

const CardTitle = styled.View`
  width: 100%;
  height: 40px; 
`;

interface Props {
  testID?: string;
  containerStyle?: ViewStyle;
  children?: ReactNode | ReactNodeArray;
  title?: string;
  titleStyle?: ViewStyle;
}

const Card: FC<Props> = (props) => {
  const { containerStyle, children, title, titleStyle } = props;

  return (
    <Container style={[containerStyle]}>
      <CardTitle style={[titleStyle]}>
        {title}
      </CardTitle>
      {children}
    </Container>
  );
};

Card.defaultProps = {};

export { Card };
