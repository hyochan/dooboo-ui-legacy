import { Accordion } from 'dooboo-ui';
import { IC_ARR_DOWN } from '../../../icon';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  min-height: 600px;
`;

const StyledTitle = styled.Text`
  font-weight: bold;
  color: #ffffff;
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledItem = styled.Text`
  font-weight: bold;
  color: black;
`;

const Arrow = styled.Image`
  width: 20px;
  height: 20px;
`;

const Default = (): React.ReactElement => {
  const data = [
    {
      title: {
        name: <StyledTitle>Default-title-01</StyledTitle>,
      },
      bodies: [
        {
          name: <StyledItem>Default body01</StyledItem>,
        },
        {
          name: <StyledItem>Default body02</StyledItem>,
        },
      ],
    },
    {
      title: {
        name: <StyledTitle>Default-title-02</StyledTitle>,
      },
      bodies: [
        {
          name: <StyledItem>Default body01</StyledItem>,
        },
        {
          name: <StyledItem>Default body02</StyledItem>,
        },
      ],
    },
    {
      title: {
        name: <StyledTitle>Default-title-03</StyledTitle>,
      },
      bodies: [
        {
          name: <StyledItem>Default body01</StyledItem>,
        },
        {
          name: <StyledItem>Default body02</StyledItem>,
        },
      ],
    },
  ];

  return (
    <Container>
      <Accordion
        data={data}
        isAnimated={true}
        collapseOnStart={true}
        animDuration={400}
        activeOpacity={1}
        toggleElement={<Arrow style={{ tintColor: 'white' }} source={IC_ARR_DOWN} />}
      />
    </Container>
  );
};

export default Default;