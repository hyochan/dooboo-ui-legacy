import React, { FC } from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 200;
  height: 6;
  border-radius: 3;
  background-color: gray;
`;

interface Props {}

const Rail: FC<Props> = () => {
  return <Container />;
};

export default Rail;
