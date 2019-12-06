import React, { FC } from 'react';
import styled from 'styled-components/native';

interface RailType {
  percent: number;
  color: string;
}

const Container = styled.View<RailType>`
  width: ${({ percent }): string => `${percent}%`};
  height: 100%;
  background-color: ${({ color }): string => color};
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

interface Props {
  percent: number;
  color: string;
}

const Rail: FC<Props> = ({ percent, color, children }) => {
  return (
    <Container percent={percent} color={color}>
      {children}
    </Container>
  );
};

export default Rail;
