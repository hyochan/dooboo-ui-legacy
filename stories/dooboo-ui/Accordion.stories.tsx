import { ArrowDown, IC_FACEBOOK, IC_GOOGLE } from '../Icon';
import React, { ReactElement } from 'react';

import { Accordion } from '../../main';
import { ContainerDeco } from '../../storybook/decorators';
import { storiesOf } from '@storybook/react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const CustomStyledTitle = styled.Text`
  font-weight: bold;
  color: #ffffff;
  position: absolute;
  left: 50px;
`;

const CustomStyledItem = styled.Text`
  font-weight: bold;
  color: black;
  position: absolute;
  left: 50px;
`;

const LeftElement = styled.Image`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 20px;
`;

const RightElement = styled.Image`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 20px;
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
        toggleElement={<ArrowDown />}
      />
    </Container>
  );
};

const CustomStyle = (): React.ReactElement => {
  const customData = [
    {
      title: {
        leftElement: <LeftElement source={IC_FACEBOOK} />,
        name: <CustomStyledTitle>Title with both element</CustomStyledTitle>,
        rightElement: <RightElement source={IC_GOOGLE} />,
      },
      bodies: [
        {
          leftElement: <LeftElement source={IC_FACEBOOK} />,
          name: <CustomStyledItem>body with both element</CustomStyledItem>,
          rightElement: <RightElement source={IC_GOOGLE} />,
        },
        {
          leftElement: <LeftElement source={IC_FACEBOOK} />,
          name: <CustomStyledItem>body with left element</CustomStyledItem>,
        },
        {
          name: (
            <CustomStyledItem style={{ left: 20 }}>
              body with right element
            </CustomStyledItem>
          ),
          rightElement: <RightElement source={IC_GOOGLE} />,
        },
      ],
    },
    {
      title: {
        name: (
          <CustomStyledTitle style={{ left: 20 }}>
            Title with right element
          </CustomStyledTitle>
        ),
        rightElement: <RightElement source={IC_GOOGLE} />,
      },
      bodies: [
        {
          leftElement: <LeftElement source={IC_FACEBOOK} />,
          name: <CustomStyledItem>body with both element</CustomStyledItem>,
          rightElement: <RightElement source={IC_GOOGLE} />,
        },
        {
          leftElement: <LeftElement source={IC_FACEBOOK} />,
          name: <CustomStyledItem>body with left element</CustomStyledItem>,
        },
        {
          name: (
            <CustomStyledItem style={{ left: 20 }}>
              body with right element
            </CustomStyledItem>
          ),
          rightElement: <RightElement source={IC_GOOGLE} />,
        },
      ],
    },
    {
      title: {
        leftElement: <LeftElement source={IC_FACEBOOK} />,
        name: <CustomStyledTitle>Title with left element</CustomStyledTitle>,
      },
      bodies: [
        {
          leftElement: <LeftElement source={IC_FACEBOOK} />,
          name: <CustomStyledItem>body with both element</CustomStyledItem>,
          rightElement: <RightElement source={IC_GOOGLE} />,
        },
        {
          leftElement: <LeftElement source={IC_FACEBOOK} />,
          name: <CustomStyledItem>body with left element</CustomStyledItem>,
        },
        {
          name: (
            <CustomStyledItem style={{ left: 20 }}>
              body with right element
            </CustomStyledItem>
          ),
          rightElement: <RightElement source={IC_GOOGLE} />,
        },
      ],
    },
    {
      title: {
        name: (
          <CustomStyledTitle style={{ left: 20 }}>
            Custom title
          </CustomStyledTitle>
        ),
      },
      bodies: [
        {
          leftElement: <LeftElement source={IC_FACEBOOK} />,
          name: <CustomStyledItem>body with both element</CustomStyledItem>,
          rightElement: <RightElement source={IC_GOOGLE} />,
        },
        {
          leftElement: <LeftElement source={IC_FACEBOOK} />,
          name: <CustomStyledItem>body with left element</CustomStyledItem>,
        },
        {
          name: (
            <CustomStyledItem style={{ left: 20 }}>
              body with right element
            </CustomStyledItem>
          ),
          rightElement: <RightElement source={IC_GOOGLE} />,
        },
      ],
    },
  ];

  return (
    <Container>
      <Accordion
        data={customData}
        isAnimated={true}
        collapseOnStart={true}
        animDuration={300}
        activeOpacity={1}
        accordionItemStyle={{
          width: 400,
        }}
        titleStyle={{
          backgroundColor: 'gray',
        }}
        bodyStyle={{
          backgroundColor: 'lightgray',
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
        }}
        toggleElement={<ArrowDown />}
      />
    </Container>
  );
};

/**
 * Below are stories for web
 */
export default {
  title: 'Accordion',
};

export const toStorybook1 = (): ReactElement => <Default />;
export const toStorybook2 = (): ReactElement => <CustomStyle />;

toStorybook1.story = {
  name: 'default',
};

toStorybook2.story = {
  name: 'CustomStyle',
};

/**
 * Below are stories for app
 */
storiesOf('Accordion', module)
  .addDecorator(ContainerDeco)
  .add('default', () => <Default />, {
    notes: 'Simple explanation',
  })
  .add('CustomStyle', () => <CustomStyle />, {
    notes: 'Can custom component',
  });
