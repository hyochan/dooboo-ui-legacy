
import React from 'react';
import { Accordion } from 'dooboo-ui';
import styled from 'styled-components/native';
import Arrow from 'dooboo-ui/Accordion/Arrow';

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

const Default = (): React.ReactElement => {
  const data = [
    {
      title: {
        name: <StyledTitle>Defualt-title-01</StyledTitle>,
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
        name: <StyledTitle>Defualt-title-02</StyledTitle>,
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
        name: <StyledTitle>Defualt-title-03</StyledTitle>,
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
        toggleElement={<Arrow />}
      />
    </Container>
  );
};

export default Default;