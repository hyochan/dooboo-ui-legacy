import React from 'react';
import styled from 'styled-components/native';

export const ContainerDeco = (storyFn) => <Container>{storyFn()}</Container>;

const Container = styled.View`
  flex: 1;
  background-color: #f5fcff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
