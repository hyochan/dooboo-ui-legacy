import React, { FC } from 'react';

import AccrordionItem from './AccordionItem';
import { ViewStyle } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex-direction: column;
  align-items: center;
`;

type TitleType = {
  leftElement?: React.ReactElement;
  name: React.ReactElement;
  rightElement?: React.ReactElement;
};

type BodyType = {
  leftElement?: React.ReactElement;
  name: React.ReactElement;
  rightElement?: React.ReactElement;
};

type DatumType = {
  title: TitleType;
  bodies: Array<BodyType>;
};

interface Props {
  data: Array<DatumType>;
  isAnimated?: boolean;
  collapseOnStart: boolean;
  animDuration?: number;
  activeOpacity?: number;
  toggleElement?: React.ReactElement;
  accordionItemStyle?: ViewStyle;
  titleStyle?: ViewStyle;
  bodyStyle?: ViewStyle;
}

const Accordion: FC<Props> = (props) => {
  const {
    data,
    isAnimated: shouldAnimate,
    collapseOnStart,
    animDuration,
    activeOpacity,
    toggleElement,
    accordionItemStyle,
    titleStyle,
    bodyStyle,
  } = props;

  return (
    <Container>
      {data.map((datum, titleKey) => {
        return (
          <AccrordionItem
            testID={`${titleKey}`}
            key={titleKey}
            datum={datum}
            shouldAnimate={shouldAnimate}
            collapseOnStart={collapseOnStart}
            animDuration={animDuration}
            activeOpacity={activeOpacity}
            toggleElement={toggleElement}
            accordionItemStyle={accordionItemStyle}
            titleStyle={titleStyle}
            bodyStyle={bodyStyle}
          />
        );
      })}
    </Container>
  );
};

export { Accordion };
