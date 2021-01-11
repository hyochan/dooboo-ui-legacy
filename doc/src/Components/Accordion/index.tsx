import React, { Fragment, ReactElement } from 'react';

import { Accordion } from 'dooboo-ui';
import { IC_ARR_DOWN } from '../../icon';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  min-height: 600px;
`;

const CustomStyledTitle = styled.Text`
  position: absolute;
  left: 60px;
`;

const CustomStyledItem = styled.Text`
  padding-left: 10px;
  font-weight: bold;
  position: absolute;
  left: 40px;
`;

const Arrow = styled.Image`
  width: 20px;
  height: 20px;
`;

const data = [
  {
    title: 'Lists',
    bodies: ['user', 'mail', 'plan'],
  },
  {
    title: 'mail',
    bodies: ['mail list', 'category', 'bin'],
  },
  {
    title: 'Reports',
    bodies: ['report list', 'statistics'],
  },
];

export const Default = (): ReactElement => {
  return (
    <Container>
      <Accordion
        data={data}
        shouldAnimate={true}
        collapseOnStart={true}
        animDuration={400}
        activeOpacity={1}
        toggleElement={<Arrow style={{ tintColor: 'white' }} source={IC_ARR_DOWN} />}
      />
    </Container>
  );
};
